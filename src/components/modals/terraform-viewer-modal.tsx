"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"

interface TerraformViewerModalProps {
  isOpen: boolean
  onClose: () => void
  templateName: string
}

export function TerraformViewerModal({
  isOpen,
  onClose,
  templateName,
}: TerraformViewerModalProps) {
  const [activeTab, setActiveTab] = useState<"main" | "variables" | "outputs">("main")

  if (!isOpen) return null

  // Mock Terraform code - in real app would fetch from template repository
  const terraformCode = {
    main: `# ${templateName}
# Main Terraform configuration

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

resource "aws_db_instance" "main" {
  identifier     = "\${var.project_name}-\${var.environment}-db"
  engine         = var.engine
  engine_version = var.engine_version
  instance_class = var.instance_class

  allocated_storage     = var.allocated_storage
  max_allocated_storage = var.max_allocated_storage
  storage_encrypted     = var.encryption_enabled
  kms_key_id           = var.encryption_enabled ? var.encryption_kms_key : null

  multi_az                = var.multi_az
  backup_retention_period = var.backup_retention_days
  backup_window          = var.backup_window
  maintenance_window     = var.maintenance_window

  db_subnet_group_name   = var.subnet_group
  vpc_security_group_ids = [aws_security_group.db_sg.id]

  publicly_accessible = var.publicly_accessible
  deletion_protection = var.deletion_protection
  skip_final_snapshot = var.skip_final_snapshot

  parameter_group_name = aws_db_parameter_group.main.name

  tags = merge(
    var.common_tags,
    {
      Name        = "\${var.project_name}-\${var.environment}-db"
      Component   = "database"
      ManagedBy   = "Terraform"
      Environment = var.environment
    }
  )
}

resource "aws_db_parameter_group" "main" {
  name   = "\${var.project_name}-\${var.environment}-pg"
  family = var.parameter_group_family

  tags = var.common_tags
}

resource "aws_security_group" "db_sg" {
  name        = "\${var.project_name}-\${var.environment}-db-sg"
  description = "Security group for \${var.project_name} database"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
    description = "PostgreSQL access from VPC"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound traffic"
  }

  tags = merge(
    var.common_tags,
    {
      Name = "\${var.project_name}-\${var.environment}-db-sg"
    }
  )
}`,

    variables: `# Input variables for ${templateName}

variable "project_name" {
  description = "Name of the project"
  type        = string

  validation {
    condition     = length(var.project_name) > 0 && length(var.project_name) <= 32
    error_message = "Project name must be between 1 and 32 characters"
  }
}

variable "environment" {
  description = "Environment name (dev, uat, prod, sandbox)"
  type        = string

  validation {
    condition     = contains(["dev", "uat", "prod", "sandbox"], var.environment)
    error_message = "Environment must be one of: dev, uat, prod, sandbox"
  }
}

variable "vpc_id" {
  description = "VPC ID where database will be deployed"
  type        = string
}

variable "vpc_cidr" {
  description = "VPC CIDR block for security group rules"
  type        = string
}

variable "subnet_group" {
  description = "DB subnet group name"
  type        = string
}

variable "engine" {
  description = "Database engine (postgres, mysql, etc.)"
  type        = string
  default     = "postgres"
}

variable "engine_version" {
  description = "Database engine version"
  type        = string
  default     = "15.3"
}

variable "instance_class" {
  description = "Database instance class"
  type        = string
  default     = "db.t4g.small"
}

variable "allocated_storage" {
  description = "Initial allocated storage in GB"
  type        = number
  default     = 20

  validation {
    condition     = var.allocated_storage >= 20 && var.allocated_storage <= 65536
    error_message = "Allocated storage must be between 20 and 65536 GB"
  }
}

variable "max_allocated_storage" {
  description = "Maximum storage for autoscaling in GB"
  type        = number
  default     = 100
}

variable "multi_az" {
  description = "Enable Multi-AZ deployment"
  type        = bool
  default     = false
}

variable "backup_retention_days" {
  description = "Number of days to retain automated backups"
  type        = number
  default     = 7

  validation {
    condition     = var.backup_retention_days >= 0 && var.backup_retention_days <= 35
    error_message = "Backup retention must be between 0 and 35 days"
  }
}

variable "backup_window" {
  description = "Preferred backup window"
  type        = string
  default     = "03:00-04:00"
}

variable "maintenance_window" {
  description = "Preferred maintenance window"
  type        = string
  default     = "sun:04:00-sun:05:00"
}

variable "encryption_enabled" {
  description = "Enable encryption at rest"
  type        = bool
  default     = true
}

variable "encryption_kms_key" {
  description = "KMS key ARN for encryption"
  type        = string
  default     = null
}

variable "publicly_accessible" {
  description = "Make database publicly accessible"
  type        = bool
  default     = false
}

variable "deletion_protection" {
  description = "Enable deletion protection"
  type        = bool
  default     = true
}

variable "skip_final_snapshot" {
  description = "Skip final snapshot on deletion"
  type        = bool
  default     = false
}

variable "parameter_group_family" {
  description = "DB parameter group family"
  type        = string
  default     = "postgres15"
}

variable "common_tags" {
  description = "Common tags to apply to all resources"
  type        = map(string)
  default     = {}
}`,

    outputs: `# Outputs for ${templateName}

output "db_instance_id" {
  description = "The RDS instance ID"
  value       = aws_db_instance.main.id
}

output "db_instance_arn" {
  description = "The ARN of the RDS instance"
  value       = aws_db_instance.main.arn
}

output "db_instance_endpoint" {
  description = "The connection endpoint"
  value       = aws_db_instance.main.endpoint
}

output "db_instance_address" {
  description = "The hostname of the RDS instance"
  value       = aws_db_instance.main.address
}

output "db_instance_port" {
  description = "The database port"
  value       = aws_db_instance.main.port
}

output "db_instance_name" {
  description = "The database name"
  value       = aws_db_instance.main.db_name
}

output "db_security_group_id" {
  description = "The security group ID of the database"
  value       = aws_security_group.db_sg.id
}

output "db_parameter_group_id" {
  description = "The db parameter group name"
  value       = aws_db_parameter_group.main.id
}

output "db_resource_tags" {
  description = "Tags applied to the database"
  value       = aws_db_instance.main.tags_all
}`,
  }

  const getCode = () => {
    switch (activeTab) {
      case "main":
        return terraformCode.main
      case "variables":
        return terraformCode.variables
      case "outputs":
        return terraformCode.outputs
      default:
        return terraformCode.main
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{templateName}</h2>
            <p className="text-xs text-gray-600">Terraform Configuration</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b bg-gray-50">
          <div className="flex gap-1 p-2">
            <button
              onClick={() => setActiveTab("main")}
              className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "main"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              main.tf
            </button>
            <button
              onClick={() => setActiveTab("variables")}
              className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "variables"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              variables.tf
            </button>
            <button
              onClick={() => setActiveTab("outputs")}
              className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "outputs"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              outputs.tf
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4">
          <Card className="bg-gray-900">
            <CardContent className="p-0">
              <pre className="overflow-x-auto p-4 text-sm">
                <code className="text-green-400 font-mono">{getCode()}</code>
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t bg-gray-50 p-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

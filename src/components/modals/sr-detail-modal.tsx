"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, CheckCircle2, Clock, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"

interface SRDetailModalProps {
  isOpen: boolean
  onClose: () => void
  sr: {
    id: string
    title: string
    category: string
    template?: string
    approval: string
    status: string
    executedAt?: string
    pendingOn?: string
    cost: number
    resources?: Record<string, string>
    configuration?: Record<string, any>
    tags?: Record<string, string>
    terraformCode?: string
    approvalWorkflow?: Array<{
      step: number
      role: string
      status: string
      approver?: string
      timestamp?: string
    }>
  }
}

export function SRDetailModal({ isOpen, onClose, sr }: SRDetailModalProps) {
  const [showTerraform, setShowTerraform] = useState(false)

  if (!isOpen) return null

  const getStatusIcon = () => {
    switch (sr.status) {
      case "completed":
        return <CheckCircle2 className="h-6 w-6 text-status-success" />
      case "pending":
        return <Clock className="h-6 w-6 text-status-warning" />
      case "failed":
        return <AlertCircle className="h-6 w-6 text-status-error" />
      default:
        return <Clock className="h-6 w-6 text-gray-400" />
    }
  }

  const getStatusBadge = () => {
    switch (sr.status) {
      case "completed":
        return <Badge variant="success">✅ Completed</Badge>
      case "pending":
        return <Badge variant="warning">⏸️ Pending Approval</Badge>
      case "failed":
        return <Badge variant="destructive">❌ Failed</Badge>
      default:
        return <Badge variant="outline">⏸️ {sr.status}</Badge>
    }
  }

  // Default mock data if not provided
  const configuration = sr.configuration || {
    database: {
      engine: "PostgreSQL",
      version: "15.3",
      size: "Production - Medium",
      multiAZ: true,
      backupRetention: "30 days",
      encryption: "AES-256",
    },
  }

  const tags = sr.tags || {
    Environment: "production",
    Project: "ecommerce-platform",
    ManagedBy: "Maruti-Portal",
    CostCenter: "IT-Infrastructure",
    Owner: "ishaan@maruti.com",
  }

  const approvalWorkflow = sr.approvalWorkflow || [
    {
      step: 1,
      role: "Infrastructure Team",
      status: "approved",
      approver: "system-auto",
      timestamp: "28 Dec 2025, 14:32:10",
    },
    {
      step: 2,
      role: "DBA Team",
      status: "pending",
      approver: "dba-team@maruti.com",
    },
    {
      step: 3,
      role: "Security Team",
      status: "not_started",
    },
  ]

  const terraformCode = sr.terraformCode || `resource "aws_db_instance" "ecommerce_db" {
  identifier     = "ecommerce-production-db"
  engine         = "postgres"
  engine_version = "15.3"
  instance_class = "db.t4g.medium"

  allocated_storage     = 100
  max_allocated_storage = 500
  storage_encrypted     = true

  multi_az               = true
  backup_retention_period = 30
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"

  vpc_security_group_ids = [aws_security_group.db_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.db.name

  tags = {
    Name        = "ecommerce-production-db"
    Environment = "production"
    ManagedBy   = "Maruti-Portal"
  }
}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-6">
          <div className="flex items-center gap-4">
            {getStatusIcon()}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-maruti-black">
                  {sr.id}: {sr.title}
                </h2>
                {getStatusBadge()}
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Category: <span className="font-semibold">{sr.category}</span>
                {sr.template && (
                  <>
                    {" "}• Template: <span className="font-mono text-xs">{sr.template}</span>
                  </>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Info */}
          {sr.status === "completed" && sr.executedAt && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <p className="text-sm text-green-800">
                  ✅ <span className="font-semibold">Executed successfully</span> on {sr.executedAt}
                </p>
              </CardContent>
            </Card>
          )}

          {sr.status === "pending" && sr.pendingOn && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="pt-6">
                <p className="text-sm text-yellow-800">
                  ⏸️ <span className="font-semibold">Pending approval from:</span> {sr.pendingOn}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Approval Workflow */}
          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg">📋 Approval Workflow</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {approvalWorkflow.map((step) => (
                  <div key={step.step} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-700">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{step.role}</p>
                        {step.status === "approved" && (
                          <Badge variant="success" className="text-xs">✅ Approved</Badge>
                        )}
                        {step.status === "pending" && (
                          <Badge variant="warning" className="text-xs">⏸️ Pending</Badge>
                        )}
                        {step.status === "not_started" && (
                          <Badge variant="outline" className="text-xs">⏳ Not Started</Badge>
                        )}
                      </div>
                      {step.approver && (
                        <p className="text-sm text-gray-600 mt-1">
                          {step.approver} {step.timestamp && `• ${step.timestamp}`}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cost Estimate */}
          <Card>
            <CardHeader className="bg-purple-50">
              <CardTitle className="text-lg">💰 Cost Estimate</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Cost</p>
                  <p className="text-3xl font-bold text-maruti-blue">₹{sr.cost.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Annual Estimate</p>
                  <p className="text-xl font-semibold text-gray-700">₹{(sr.cost * 12).toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-purple-50 p-3">
                <p className="text-xs text-purple-800">
                  ℹ️ Costs are estimates based on standard pricing. Actual costs may vary based on usage.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Details */}
          <Card>
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg">🔧 Configuration</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {Object.entries(configuration).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-sm font-semibold text-gray-700 capitalize mb-2">
                      {key}:
                    </p>
                    {typeof value === "object" ? (
                      <div className="ml-4 space-y-1">
                        {Object.entries(value as Record<string, any>).map(([subKey, subValue]) => (
                          <div key={subKey} className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 capitalize">
                              {subKey.replace(/([A-Z])/g, " $1").trim()}:
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {typeof subValue === "boolean" ? (subValue ? "Yes" : "No") : subValue}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm font-medium text-gray-900 ml-4">{value}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resource Tags */}
          <Card>
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg">🏷️ Resource Tags</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(tags).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <p className="text-xs font-semibold text-gray-500">{key}</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Created Resources (if completed) */}
          {sr.status === "completed" && sr.resources && (
            <Card>
              <CardHeader className="bg-green-50">
                <CardTitle className="text-lg">✅ Created Resources</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {Object.entries(sr.resources).map(([key, value]) => (
                    <div key={key} className="flex items-start gap-2">
                      <p className="text-sm font-semibold text-gray-700 capitalize min-w-[120px]">
                        {key}:
                      </p>
                      <p className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Terraform Code (Collapsible) */}
          <Card>
            <CardHeader className="bg-gray-50">
              <button
                onClick={() => setShowTerraform(!showTerraform)}
                className="flex w-full items-center justify-between text-left"
              >
                <CardTitle className="text-lg">📄 Terraform Code</CardTitle>
                {showTerraform ? (
                  <ChevronUp className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </CardHeader>
            {showTerraform && (
              <CardContent className="pt-6">
                <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">
                  <code>{terraformCode}</code>
                </pre>
              </CardContent>
            )}
          </Card>

          {/* Close Button */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {sr.status === "pending" && (
              <Button className="bg-maruti-blue hover:bg-maruti-blue/90">
                Approve Request
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

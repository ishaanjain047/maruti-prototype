export type EnvironmentType = "dev" | "qa" | "uat" | "prod"

export type ServiceRequestType =
  | "infrastructure"
  | "network"
  | "security"
  | "access"
  | "dns"
  | "ssl"
  | "vpn"
  | "firewall"
  | "ip_whitelist"
  | "storage"
  | "other"

export type ServiceRequestStatus =
  | "draft"
  | "pending"
  | "approved"
  | "rejected"
  | "in_progress"
  | "completed"
  | "failed"

export type EnvironmentStatus = "provisioning" | "active" | "failed" | "partial" | "paused"

export type Priority = "high" | "medium" | "low"

export interface ServiceRequest {
  id: string
  type: ServiceRequestType
  title: string
  description: string
  environment: string
  environmentType: EnvironmentType
  status: ServiceRequestStatus
  priority: Priority
  confidence: number
  createdBy: string
  createdAt: string
  updatedAt: string
  approvalChain: ApprovalStep[]
  details: Record<string, any>
  notes: string[]
  pendingOn?: string
}

export interface ApprovalStep {
  approver: string
  role: string
  status: "pending" | "approved" | "rejected"
  comments?: string
  timestamp?: string
}

export interface BOMItem {
  service: string
  serviceType: string
  resourceName: string
  region: string
  configuration: string
  estimatedCost: number
}

export interface BOM {
  id: string
  projectName: string
  environmentType: EnvironmentType
  items: BOMItem[]
  totalCost: number
  createdAt: string
  category: "infrastructure" | "network" | "access" | "integration"
}

export interface Template {
  id: string
  name: string
  description: string
  matchPercentage: number
  coverage: number
  costEstimate: number
  compliant: boolean
  items: BOMItem[]
}

export interface Environment {
  id: string
  name: string
  project: string
  type: EnvironmentType
  status: EnvironmentStatus
  resources: number
  cost: number
  health: number
  createdAt: string
  updatedAt: string
  bom?: BOM
  serviceRequests: string[]
}

export interface Architecture {
  id: string
  name: string
  project: string
  environmentType: EnvironmentType
  diagramUrl: string
  comments?: string
  analyzedAt?: string
  components: string[]
  serviceRequests: ServiceRequest[]
  bom?: BOM
}

export interface AIThinkingStep {
  step: number
  title: string
  description: string
  status: "pending" | "in_progress" | "completed"
  output?: any
}

export interface Integration {
  id: string
  name: string
  type: string
  endpoint: string
  port: number
  authMethod: string
  sla: string
  documentation: string
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  mslId: string
}

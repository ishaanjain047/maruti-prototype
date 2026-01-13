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

export type ServiceRequestCategory =
  | "network"
  | "database"
  | "compute"
  | "cache"
  | "firewall"
  | "iam"
  | "integration"
  | "storage"
  | "cdn"

export type ServiceRequestStatus =
  | "draft"
  | "pending"
  | "approved"
  | "rejected"
  | "in_progress"
  | "completed"
  | "failed"
  | "waiting"

export type EnvironmentStatus = "provisioning" | "active" | "failed" | "partial" | "paused"

export type Priority = "high" | "medium" | "low"

export interface ServiceRequest {
  id: string
  type: ServiceRequestType
  category: ServiceRequestCategory
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
  executedAt?: string
  approvalChain: ApprovalStep[]
  details: Record<string, any>
  notes: string[]
  pendingOn?: string
  template?: string
  templateVersion?: string
  cost: number
  dependencies?: string[]
  resourcesCreated?: Record<string, string>
  terraformCode?: string
  autoApproved?: boolean
  executionLevel?: number
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
  vpc?: VPCConfig
  completedSRs?: number
  totalSRs?: number
  deploymentProgress?: number
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

export interface TerraformTemplate {
  id: string
  name: string
  version: string
  category: ServiceRequestCategory
  description: string
  approvalRequired: boolean
  approvalRole?: string
  lastUpdated: string
  parameters: TemplateParameter[]
  sourceUrl: string
  documentationUrl?: string
}

export interface TemplateParameter {
  name: string
  type: string
  description: string
  required: boolean
  default?: any
}

export interface VPCConfig {
  cidr: string
  vpcId: number
  subnets: {
    public: string[]
    private: string[]
    database: string[]
    cache: string[]
  }
  availabilityZones: string[]
}

export interface Step1FormData {
  projectName: string
  environmentType: EnvironmentType
  expectedRequests: string
  expectedUsers: string
  comments?: string
  diagram?: File
}

export interface Step3ConfigData {
  vpc: VPCConfig
  database?: {
    engine: string
    instanceClass: string
    storage: number
    multiAZ: boolean
    backupRetention: number
  }
  application?: {
    technology: string
    port: number
    cpu: number
    memory: number
    minInstances: number
    maxInstances: number
  }
  cache?: {
    engine: string
    nodeType: string
  }
  cdn?: {
    enabled: boolean
    customDomain?: string
    sslCertificate: "auto" | "existing"
  }
  integrations: string[]
}

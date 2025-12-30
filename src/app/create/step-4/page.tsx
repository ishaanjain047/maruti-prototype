"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, Download, FileText, Eye } from "lucide-react"
import { BOMModal } from "@/components/modals/bom-modal"
import { SRDetailModal } from "@/components/modals/sr-detail-modal"

// Mock SR data
const serviceRequests = [
  {
    id: "SR-001",
    title: "VPC Creation",
    category: "Network Infrastructure",
    template: "maruti-standard-vpc-v2.0.0",
    approval: "Auto-Approved",
    status: "completed",
    executedAt: "14:32:15",
    cost: 46,
    details: {
      vpcCidr: "10.100.0.0/16",
      subnets: "8 (Public, Private, Database, Cache)",
      natGateways: "2 (Multi-AZ for HA)",
    },
    resources: {
      vpc: "vpc-0abc123def456",
      subnets: "subnet-0xyz789, subnet-0def456 (+ 6 more)",
    },
  },
  {
    id: "SR-002",
    title: "PostgreSQL Database",
    category: "Database",
    template: "maruti-rds-postgres-v3.1.0",
    approval: "Pending DBA Approval",
    status: "pending",
    cost: 160,
    details: {
      engine: "PostgreSQL 15.3",
      instance: "db.t4g.small",
      storage: "100 GB (Encrypted)",
      multiAZ: "Enabled",
      backups: "7 days retention",
    },
    pendingOn: "DBA Team",
    notified: "14:33:00",
  },
  {
    id: "SR-003",
    title: "Application Load Balancer",
    category: "Load Balancer",
    template: "maruti-alb-standard-v1.9.0",
    approval: "Auto-Approved",
    status: "completed",
    executedAt: "14:32:45",
    cost: 23,
    details: {
      type: "Application Load Balancer",
      scheme: "Internet-facing",
      ssl: "ACM Certificate (auto-generated)",
    },
    resources: {
      alb: "ecommerce-alb-abc123.ap-south-1.elb.amazonaws.com",
      targetGroup: "ecommerce-app-tg",
    },
  },
  {
    id: "SR-004",
    title: "ECS Container Cluster",
    category: "Compute - Containers",
    template: "maruti-ecs-fargate-v2.5.0",
    approval: "Auto-Approved",
    status: "completed",
    executedAt: "14:33:15",
    cost: 180,
    details: {
      platform: "ECS Fargate",
      tasks: "3-6 (Auto-scaling)",
      cpu: "512, Memory: 1024 MB",
      port: "8080",
    },
    resources: {
      cluster: "ecommerce-cluster",
      service: "ecommerce-app (3 running tasks)",
    },
  },
  {
    id: "SR-005",
    title: "Redis Cache",
    category: "Cache",
    template: "maruti-redis-v1.8.0",
    approval: "Auto-Approved",
    status: "completed",
    executedAt: "14:33:30",
    cost: 15,
    details: {
      engine: "Redis 7.0",
      nodeType: "cache.t4g.micro",
    },
    resources: {
      cluster: "ecommerce-redis.abc123.cache.amazonaws.com:6379",
    },
  },
  {
    id: "SR-006",
    title: "Firewall Rule - App to Database",
    category: "Firewall",
    template: "maruti-firewall-app-to-db-v1.0.0",
    approval: "Auto-Approved (Pre-Approved Pattern)",
    status: "completed",
    executedAt: "14:34:00",
    cost: 0,
    details: {
      connection: "ECS Containers → PostgreSQL Database",
      protocol: "TCP",
      port: "5432",
    },
  },
  {
    id: "SR-007",
    title: "Firewall Rule - App to Redis",
    category: "Firewall",
    template: "maruti-firewall-app-to-cache-v1.0.0",
    approval: "Auto-Approved (Pre-Approved Pattern)",
    status: "completed",
    executedAt: "14:34:05",
    cost: 0,
    details: {
      connection: "ECS Containers → Redis Cache",
      protocol: "TCP",
      port: "6379",
    },
  },
  {
    id: "SR-008",
    title: "IAM Policy - ECS Access to Secrets",
    category: "IAM",
    template: "maruti-iam-ecs-secrets-v1.2.0",
    approval: "Pending Security Team Approval",
    status: "pending",
    cost: 0,
    details: {
      policy: "Allow ECS to read database credentials",
      resource: "Secrets Manager (ecommerce/production/*)",
      principal: "ECS Task Execution Role",
    },
    pendingOn: "Security Team",
  },
  {
    id: "SR-009",
    title: "Razorpay Payment Gateway Integration",
    category: "External Integration",
    template: "maruti-razorpay-v1.2.0",
    approval: "Auto-Approved (Pre-Approved Integration)",
    status: "waiting",
    dependencies: ["SR-003", "SR-004"],
    cost: 0,
    details: {
      outbound: "App → Razorpay API (HTTPS/443)",
      inbound: "Razorpay Webhooks → ALB (HTTPS/443)",
      webhookPath: "/webhooks/razorpay",
      ips: "52.66.203.176/32, 13.232.115.82/32",
    },
  },
]

export default function Step4Page() {
  const [isBOMOpen, setIsBOMOpen] = useState(false)
  const [selectedSR, setSelectedSR] = useState<any>(null)

  const completedSRs = serviceRequests.filter((sr) => sr.status === "completed")
    .length
  const pendingSRs = serviceRequests.filter((sr) => sr.status === "pending")
    .length
  const waitingSRs = serviceRequests.filter((sr) => sr.status === "waiting")
    .length

  const totalCost = serviceRequests.reduce((sum, sr) => sum + sr.cost, 0)

  // Group SRs by category
  const srsByCategory = {
    network: serviceRequests.filter((sr) => sr.category.includes("Network")),
    database: serviceRequests.filter((sr) => sr.category === "Database"),
    compute: serviceRequests.filter((sr) => sr.category.includes("Compute") || sr.category.includes("Load Balancer")),
    cache: serviceRequests.filter((sr) => sr.category === "Cache"),
    firewall: serviceRequests.filter((sr) => sr.category === "Firewall"),
    iam: serviceRequests.filter((sr) => sr.category === "IAM"),
    integration: serviceRequests.filter((sr) => sr.category.includes("Integration")),
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>
      case "pending":
        return <Badge variant="warning">Pending Approval</Badge>
      case "waiting":
        return <Badge variant="info">Waiting</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-status-success" />
      case "pending":
      case "waiting":
        return <Clock className="h-5 w-5 text-status-warning" />
      default:
        return null
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-maruti-black">
          SERVICE REQUESTS GENERATED
        </h1>
        <p className="mt-2 text-gray-600">Step 4 of 4</p>
      </div>

      <div className="mx-auto max-w-6xl space-y-6">
        {/* Success Summary */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-green-800 mb-4">
              <CheckCircle2 className="h-6 w-6" />
              <span className="text-lg font-semibold">
                Successfully generated {serviceRequests.length} Service Requests
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <p className="text-sm text-gray-600">Environment</p>
                <p className="font-semibold">ecommerce-production</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Environment ID</p>
                <p className="font-semibold">ENV-2025-001</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Cost</p>
                <p className="font-semibold">₹{totalCost.toFixed(2)}/month</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Deployment Time</p>
                <p className="font-semibold">18-22 minutes</p>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBOMOpen(true)}
              >
                <FileText className="mr-2 h-4 w-4" />
                View Infrastructure BOM
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download All SRs
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Service Requests by Category */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-maruti-black">
            📋 SERVICE REQUESTS
          </h2>

          {/* Network */}
          {srsByCategory.network.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700 bg-gray-100 p-2 rounded">
                🌐 NETWORK INFRASTRUCTURE
              </h3>
              {srsByCategory.network.map((sr) => (
                <SRCard key={sr.id} sr={sr} getStatusBadge={getStatusBadge} getStatusIcon={getStatusIcon} onViewDetails={() => setSelectedSR(sr)} />
              ))}
            </div>
          )}

          {/* Database */}
          {srsByCategory.database.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700 bg-gray-100 p-2 rounded">
                💾 DATABASES
              </h3>
              {srsByCategory.database.map((sr) => (
                <SRCard key={sr.id} sr={sr} getStatusBadge={getStatusBadge} getStatusIcon={getStatusIcon} onViewDetails={() => setSelectedSR(sr)} />
              ))}
            </div>
          )}

          {/* Compute */}
          {srsByCategory.compute.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700 bg-gray-100 p-2 rounded">
                🖥️ COMPUTE RESOURCES
              </h3>
              {srsByCategory.compute.map((sr) => (
                <SRCard key={sr.id} sr={sr} getStatusBadge={getStatusBadge} getStatusIcon={getStatusIcon} onViewDetails={() => setSelectedSR(sr)} />
              ))}
            </div>
          )}

          {/* Cache */}
          {srsByCategory.cache.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700 bg-gray-100 p-2 rounded">
                🔄 CACHE
              </h3>
              {srsByCategory.cache.map((sr) => (
                <SRCard key={sr.id} sr={sr} getStatusBadge={getStatusBadge} getStatusIcon={getStatusIcon} onViewDetails={() => setSelectedSR(sr)} />
              ))}
            </div>
          )}

          {/* Firewall */}
          {srsByCategory.firewall.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700 bg-gray-100 p-2 rounded">
                🔥 FIREWALL RULES
              </h3>
              {srsByCategory.firewall.map((sr) => (
                <SRCard key={sr.id} sr={sr} getStatusBadge={getStatusBadge} getStatusIcon={getStatusIcon} onViewDetails={() => setSelectedSR(sr)} />
              ))}
            </div>
          )}

          {/* IAM */}
          {srsByCategory.iam.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700 bg-gray-100 p-2 rounded">
                🔐 IAM & SECURITY
              </h3>
              {srsByCategory.iam.map((sr) => (
                <SRCard key={sr.id} sr={sr} getStatusBadge={getStatusBadge} getStatusIcon={getStatusIcon} onViewDetails={() => setSelectedSR(sr)} />
              ))}
            </div>
          )}

          {/* Integration */}
          {srsByCategory.integration.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700 bg-gray-100 p-2 rounded">
                🔌 EXTERNAL INTEGRATIONS
              </h3>
              {srsByCategory.integration.map((sr) => (
                <SRCard key={sr.id} sr={sr} getStatusBadge={getStatusBadge} getStatusIcon={getStatusIcon} onViewDetails={() => setSelectedSR(sr)} />
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>SUMMARY</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-600">Total SRs: {serviceRequests.length}</p>
                <p className="text-sm text-gray-600">
                  ✅ Completed: {completedSRs}
                </p>
                <p className="text-sm text-gray-600">
                  ⏸️ Pending Approval: {pendingSRs}
                </p>
                <p className="text-sm text-gray-600">
                  🕐 Waiting: {waitingSRs}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Time Saved: 18-25 days (vs manual SR process)
                </p>
                <p className="text-sm text-gray-600">
                  Estimated Deployment: 18-22 minutes total
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-yellow-50 p-3">
              <p className="font-medium text-sm">Next Actions:</p>
              <ul className="ml-4 mt-1 space-y-1 text-sm text-gray-700">
                <li>• Approve SR-002 (Database) → DBA Team</li>
                <li>• Approve SR-008 (IAM Policy) → Security Team</li>
                <li>• Once approved, remaining SRs will auto-execute</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setIsBOMOpen(true)}
          >
            <FileText className="mr-2 h-4 w-4" />
            View Infrastructure BOM
          </Button>
          <Link href="/">
            <Button className="bg-maruti-blue hover:bg-maruti-blue/90">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* BOM Modal */}
      <BOMModal isOpen={isBOMOpen} onClose={() => setIsBOMOpen(false)} />

      {/* SR Detail Modal */}
      {selectedSR && (
        <SRDetailModal
          isOpen={!!selectedSR}
          onClose={() => setSelectedSR(null)}
          sr={selectedSR}
        />
      )}
    </div>
  )
}

function SRCard({ sr, getStatusBadge, getStatusIcon, onViewDetails }: any) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {getStatusIcon(sr.status)}
            <div>
              <CardTitle className="text-lg">{sr.id}: {sr.title}</CardTitle>
              <div className="mt-2 space-y-1 text-sm">
                <p className="text-gray-600">Category: {sr.category}</p>
                <p className="text-gray-600">Template: {sr.template}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            {getStatusBadge(sr.status)}
            <p className="mt-2 text-sm font-semibold">
              Cost: ₹{sr.cost}/month
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {sr.approval && (
          <p className="text-sm">
            <span className="font-medium">Approval:</span> {sr.approval}
          </p>
        )}

        {sr.status === "completed" && sr.executedAt && (
          <p className="text-sm text-status-success">
            ✅ Executed at {sr.executedAt}
          </p>
        )}

        {sr.status === "pending" && sr.pendingOn && (
          <div className="rounded-lg bg-yellow-50 p-3 text-sm">
            <p className="font-medium text-yellow-800">
              ⚠️ Requires {sr.pendingOn} Approval
            </p>
            <p className="text-yellow-700">
              Assigned to: {sr.pendingOn}
            </p>
            {sr.notified && (
              <p className="text-yellow-700">
                Notified: Yes (Email sent at {sr.notified})
              </p>
            )}
          </div>
        )}

        {sr.status === "waiting" && sr.dependencies && (
          <div className="rounded-lg bg-blue-50 p-3 text-sm">
            <p className="font-medium text-blue-800">
              🕐 Waiting (Depends on {sr.dependencies.join(", ")})
            </p>
          </div>
        )}

        {sr.details && (
          <div className="rounded-lg bg-gray-50 p-3 text-sm space-y-1">
            <p className="font-medium">Configuration:</p>
            {Object.entries(sr.details).map(([key, value]) => (
              <p key={key}>
                • {key.charAt(0).toUpperCase() + key.slice(1)}: {value as string}
              </p>
            ))}
          </div>
        )}

        {sr.resources && (
          <div className="rounded-lg bg-green-50 p-3 text-sm space-y-1">
            <p className="font-medium text-green-800">Resources Created:</p>
            {Object.entries(sr.resources).map(([key, value]) => (
              <p key={key} className="text-green-700">
                • {key.toUpperCase()}: {value as string}
              </p>
            ))}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onViewDetails}>
            <Eye className="mr-1 h-3 w-3" />
            View Details
          </Button>
          <Button variant="outline" size="sm">
            View Terraform
          </Button>
          <Button variant="outline" size="sm">
            Add to JIRA
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

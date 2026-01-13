"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, Download, FileText, Eye, ArrowLeft } from "lucide-react"
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
        return <Badge variant="warning">Pending</Badge>
      case "waiting":
        return <Badge variant="outline">Waiting</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="p-8">
      {/* Back Navigation */}
      <Link href="/create/step-3">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Configuration
        </Button>
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Service Requests Generated</h1>
        <p className="mt-1 text-sm text-gray-600">Step 4 of 4 • ecommerce-production</p>
      </div>

      <div className="mx-auto max-w-6xl space-y-6">
        {/* Success Summary */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-gray-600">Total SRs</p>
                  <p className="text-2xl font-semibold text-gray-900">{serviceRequests.length}</p>
                </div>
                <div className="h-10 w-px bg-gray-300" />
                <div>
                  <p className="text-sm text-gray-600">Environment ID</p>
                  <p className="text-sm font-medium text-gray-900">ENV-2025-001</p>
                </div>
                <div className="h-10 w-px bg-gray-300" />
                <div>
                  <p className="text-sm text-gray-600">Total Cost</p>
                  <p className="text-2xl font-semibold text-gray-900">₹{totalCost}/mo</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsBOMOpen(true)}>
                  <FileText className="mr-2 h-4 w-4" />
                  View BOM
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Requests by Category */}
        <div className="space-y-6">
          {/* Network */}
          {srsByCategory.network.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Network Infrastructure
              </h3>
              <div className="space-y-2">
                {srsByCategory.network.map((sr) => (
                  <SRCard key={sr.id} sr={sr} getStatusBadge={getStatusBadge} onViewDetails={() => setSelectedSR(sr)} />
                ))}
              </div>
            </div>
          )}

          {/* Database */}
          {srsByCategory.database.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Databases
              </h3>
              <div className="space-y-2">
                {srsByCategory.database.map((sr) => (
                  <SRCard key={sr.id} sr={sr} getStatusBadge={getStatusBadge} onViewDetails={() => setSelectedSR(sr)} />
                ))}
              </div>
            </div>
          )}

          {/* Compute */}
          {srsByCategory.compute.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Compute Resources
              </h3>
              <div className="space-y-2">
                {srsByCategory.compute.map((sr) => (
                  <SRCard key={sr.id} sr={sr} getStatusBadge={getStatusBadge} onViewDetails={() => setSelectedSR(sr)} />
                ))}
              </div>
            </div>
          )}

          {/* Cache */}
          {srsByCategory.cache.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Cache
              </h3>
              <div className="space-y-2">
                {srsByCategory.cache.map((sr) => (
                  <SRCard key={sr.id} sr={sr} getStatusBadge={getStatusBadge} onViewDetails={() => setSelectedSR(sr)} />
                ))}
              </div>
            </div>
          )}

          {/* Firewall */}
          {srsByCategory.firewall.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Firewall Rules
              </h3>
              <div className="space-y-2">
                {srsByCategory.firewall.map((sr) => (
                  <SRCard key={sr.id} sr={sr} getStatusBadge={getStatusBadge} onViewDetails={() => setSelectedSR(sr)} />
                ))}
              </div>
            </div>
          )}

          {/* IAM */}
          {srsByCategory.iam.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                IAM & Security
              </h3>
              <div className="space-y-2">
                {srsByCategory.iam.map((sr) => (
                  <SRCard key={sr.id} sr={sr} getStatusBadge={getStatusBadge} onViewDetails={() => setSelectedSR(sr)} />
                ))}
              </div>
            </div>
          )}

          {/* Integration */}
          {srsByCategory.integration.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                External Integrations
              </h3>
              <div className="space-y-2">
                {srsByCategory.integration.map((sr) => (
                  <SRCard key={sr.id} sr={sr} getStatusBadge={getStatusBadge} onViewDetails={() => setSelectedSR(sr)} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-gray-600">Completed:</span>{" "}
                  <span className="font-semibold text-gray-900">{completedSRs}</span>
                </div>
                <div>
                  <span className="text-gray-600">Pending:</span>{" "}
                  <span className="font-semibold text-gray-900">{pendingSRs}</span>
                </div>
                <div>
                  <span className="text-gray-600">Waiting:</span>{" "}
                  <span className="font-semibold text-gray-900">{waitingSRs}</span>
                </div>
              </div>
              <Link href="/">
                <Button className="bg-maruti-blue hover:bg-maruti-blue/90">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
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

function SRCard({ sr, getStatusBadge, onViewDetails }: any) {
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900">
                  {sr.id}: {sr.title}
                </p>
                <Badge variant="outline" className="text-xs flex-shrink-0">
                  {sr.category}
                </Badge>
                {getStatusBadge(sr.status)}
              </div>
              {sr.status === "pending" && sr.pendingOn && (
                <p className="mt-1 text-xs text-gray-600">
                  Pending: {sr.pendingOn}
                </p>
              )}
              {sr.status === "waiting" && sr.dependencies && (
                <p className="mt-1 text-xs text-gray-600">
                  Waiting on: {sr.dependencies.join(", ")}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <p className="text-sm font-semibold text-gray-900">₹{sr.cost}/mo</p>
            <Button variant="outline" size="sm" onClick={onViewDetails}>
              <Eye className="mr-1 h-3 w-3" />
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

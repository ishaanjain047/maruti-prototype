import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle2, Clock, XCircle } from "lucide-react"

// Generate static params for all SRs
export function generateStaticParams() {
  return [
    { srId: "SR-001" },
    { srId: "SR-002" },
    { srId: "SR-003" },
    { srId: "SR-004" },
    { srId: "SR-005" },
    { srId: "SR-006" },
    { srId: "SR-007" },
    { srId: "SR-008" },
    { srId: "SR-009" },
  ]
}

// Mock data - in real app would fetch based on srId
const getSRData = (srId: string) => {
  return {
    id: srId,
    title: "PostgreSQL Database",
    category: "database",
    status: "pending",
    environment: "ecommerce-production",
    environmentId: "ENV-2025-001",
    template: "maruti-rds-postgres-v3.1.0",
    tShirtSize: "Large",
    aiRecommended: true,
    createdAt: "28 Dec 2025, 14:32",
    createdBy: "Ishaan (Developer)",
    estimatedCost: 160,
    configuration: {
      project_name: "ecommerce",
      environment: "production",
      vpc_id: "100",
      engine: "postgres",
      engine_version: "15.3",
      instance_class: "db.m6g.large",
      allocated_storage: "200",
      max_allocated_storage: "1000",
      multi_az: "true",
      backup_retention_days: "14",
      backup_window: "03:00-04:00",
      maintenance_window: "sun:04:00-sun:05:00",
      encryption_enabled: "true",
      encryption_kms_key: "alias/maruti-rds-key",
      publicly_accessible: "false",
      deletion_protection: "true",
      skip_final_snapshot: "false",
      parameter_group_family: "postgres15",
      subnet_group: "ecommerce-production-db-subnet-group",
    },
    resourceTags: {
      Project: "ecommerce",
      Environment: "production",
      VpcId: "100",
      Component: "database",
      ResourceType: "rds",
      ResourceName: "ecommerce-txn-db",
      Engine: "postgres",
      ManagedBy: "SR-002",
      TShirtSize: "large",
      CreatedAt: "2025-12-28T14:32:15Z",
      CreatedBy: "ishaan@maruti.com",
      CostCenter: "IT-Infrastructure",
      Compliance: "PII-Data",
      BackupRequired: "true",
      MonitoringEnabled: "true",
    },
    dependsOn: [
      {
        srId: "SR-001",
        title: "VPC Creation",
        status: "completed",
        reason: "Required for network connectivity",
      },
    ],
    requiredBy: [
      {
        srId: "SR-006",
        title: "Firewall Rule - App to Database",
        status: "waiting",
      },
      {
        srId: "SR-007",
        title: "Firewall Rule - Analytics to Database",
        status: "waiting",
      },
    ],
    approvalWorkflow: [
      {
        step: 1,
        role: "Auto-Validation",
        status: "approved",
        approver: "System",
        timestamp: "28 Dec 2025, 14:32",
        notes: "Template validation passed",
      },
      {
        step: 2,
        role: "DBA Team",
        status: "pending",
        approver: "dba-team@maruti.com",
        notifiedAt: "28 Dec 2025, 14:33",
        notes: "Awaiting DBA approval for production database",
      },
      {
        step: 3,
        role: "Security Team",
        status: "not_started",
        approver: "security-team@maruti.com",
      },
      {
        step: 4,
        role: "IT Manager",
        status: "not_started",
        approver: "it-manager@maruti.com",
      },
    ],
  }
}

export default function SRDetailPage({ params }: { params: { srId: string } }) {
  const sr = getSRData(params.srId)

  const getStatusBadge = () => {
    switch (sr.status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>
      case "pending":
        return <Badge variant="warning">Pending Approval</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge>{sr.status}</Badge>
    }
  }

  const getApprovalStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "pending":
        return <Clock className="h-5 w-5 text-orange-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
    }
  }

  return (
    <div className="p-8">
      {/* Back Navigation */}
      <Link href="/service-requests">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Service Requests
        </Button>
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-900">
                {sr.id}: {sr.title}
              </h1>
              {getStatusBadge()}
            </div>
            <div className="mt-2 flex items-center gap-3 text-sm text-gray-600">
              <Badge variant="outline">{sr.category}</Badge>
              <span>•</span>
              <span>{sr.environment}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-6">
        {/* Overview */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-base">Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-gray-500">Environment</p>
                <p className="mt-1 text-sm text-gray-900">
                  {sr.environment} ({sr.environmentId})
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Template</p>
                <p className="mt-1 text-sm font-mono text-gray-900">{sr.template}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">T-Shirt Size</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="outline">{sr.tShirtSize}</Badge>
                  {sr.aiRecommended && (
                    <Badge variant="outline" className="text-xs">
                      AI Recommended
                    </Badge>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Created</p>
                <p className="mt-1 text-sm text-gray-900">{sr.createdAt}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Requested By</p>
                <p className="mt-1 text-sm text-gray-900">{sr.createdBy}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Estimated Cost</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  ₹{sr.estimatedCost}/month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration (Template Variables) */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-base">Configuration (Template Variables)</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-2">
              {Object.entries(sr.configuration).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between border-b pb-2 last:border-0"
                >
                  <p className="text-sm font-medium text-gray-700">{key}</p>
                  <p className="text-sm font-mono text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resource Tags */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-base">Resource Tags (Applied to AWS Resources)</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-3 md:grid-cols-2">
              {Object.entries(sr.resourceTags).map(([key, value]) => (
                <div key={key} className="rounded-lg border p-3">
                  <p className="text-xs font-medium text-gray-500">{key}</p>
                  <p className="mt-1 text-sm font-mono text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dependencies */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-base">Dependencies</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Depends On */}
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">Depends On:</p>
                {sr.dependsOn.length > 0 ? (
                  <div className="space-y-2">
                    {sr.dependsOn.map((dep) => (
                      <Link key={dep.srId} href={`/service-requests/${dep.srId}`}>
                        <div className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{dep.title}</p>
                            <p className="text-xs text-gray-600">{dep.reason}</p>
                          </div>
                          <Badge variant="success" className="text-xs">
                            {dep.status}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No dependencies</p>
                )}
              </div>

              {/* Required By */}
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">Required By:</p>
                {sr.requiredBy.length > 0 ? (
                  <div className="space-y-2">
                    {sr.requiredBy.map((dep) => (
                      <Link key={dep.srId} href={`/service-requests/${dep.srId}`}>
                        <div className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50">
                          <p className="text-sm font-medium text-gray-900">{dep.title}</p>
                          <Badge variant="outline" className="text-xs">
                            {dep.status}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No dependent requests</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Approval Workflow */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-base">Approval Workflow</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {sr.approvalWorkflow.map((step) => (
                <div key={step.step} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 bg-white font-semibold text-gray-700">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {getApprovalStatusIcon(step.status)}
                      <p className="text-sm font-semibold text-gray-900">{step.role}</p>
                      {step.status === "approved" && (
                        <Badge variant="success" className="text-xs">
                          Approved
                        </Badge>
                      )}
                      {step.status === "pending" && (
                        <Badge variant="warning" className="text-xs">
                          Pending
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 text-xs text-gray-600">
                      <p>Approver: {step.approver}</p>
                      {step.timestamp && <p>Timestamp: {step.timestamp}</p>}
                      {step.notifiedAt && <p>Notified: {step.notifiedAt}</p>}
                      {step.notes && <p className="mt-1 text-gray-700">{step.notes}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        {sr.status === "pending" && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-blue-900">
                  This request requires your approval
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Request Changes
                  </Button>
                  <Button variant="outline" size="sm">
                    Reject
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Approve
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

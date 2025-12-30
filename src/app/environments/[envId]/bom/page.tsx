import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, FileText, Mail } from "lucide-react"

// Generate static params
export function generateStaticParams() {
  return [
    { envId: "env-new" },
    { envId: "env-1" },
    { envId: "env-2" },
  ]
}

// Mock BOM data
const getBOMData = (envId: string) => {
  return {
    environment: "ecommerce-production",
    environmentId: "ENV-2025-001",
    generated: "28 Dec 2025, 14:32",
    categories: [
      {
        name: "Network Infrastructure",
        items: [
          {
            component: "VPC",
            region: "ap-south-1",
            configuration: "10.100.0.0/16",
            sr: "SR-001",
            status: "completed",
            cost: 0,
          },
          {
            component: "Subnets (8)",
            region: "ap-south-1",
            configuration: "Multi-tier, 2 AZs",
            sr: "SR-001",
            status: "completed",
            cost: 0,
          },
          {
            component: "NAT Gateway (2)",
            region: "ap-south-1",
            configuration: "Multi-AZ HA",
            sr: "SR-001",
            status: "completed",
            cost: 46,
          },
          {
            component: "Application Load Balancer",
            region: "ap-south-1",
            configuration: "Internet-facing, SSL",
            sr: "SR-003",
            status: "completed",
            cost: 23.29,
          },
          {
            component: "CloudFront CDN",
            region: "Global",
            configuration: "Standard distribution",
            sr: "SR-010",
            status: "pending",
            cost: 50,
          },
        ],
      },
      {
        name: "Databases & Storage",
        items: [
          {
            component: "PostgreSQL DB",
            region: "ap-south-1",
            configuration: "db.m6g.large, Multi-AZ",
            sr: "SR-002",
            status: "pending",
            cost: 160,
          },
          {
            component: "Redis Cache",
            region: "ap-south-1",
            configuration: "cache.t4g.medium",
            sr: "SR-005",
            status: "completed",
            cost: 15,
          },
          {
            component: "S3 Buckets",
            region: "ap-south-1",
            configuration: "Standard tier",
            sr: "SR-011",
            status: "completed",
            cost: 2,
          },
        ],
      },
      {
        name: "Compute & Application",
        items: [
          {
            component: "Application ECS",
            region: "ap-south-1",
            configuration: "Fargate (3-6 tasks)",
            sr: "SR-004",
            status: "completed",
            cost: 180,
          },
        ],
      },
      {
        name: "Security & IAM",
        items: [
          {
            component: "Firewall - App to DB",
            region: "ap-south-1",
            configuration: "TCP/5432",
            sr: "SR-006",
            status: "completed",
            cost: 0,
          },
          {
            component: "Firewall - App to Redis",
            region: "ap-south-1",
            configuration: "TCP/6379",
            sr: "SR-007",
            status: "completed",
            cost: 0,
          },
          {
            component: "IAM Policy - ECS Secrets",
            region: "ap-south-1",
            configuration: "Allow read secrets",
            sr: "SR-008",
            status: "pending",
            cost: 0,
          },
        ],
      },
      {
        name: "External Integrations",
        items: [
          {
            component: "Razorpay Gateway",
            region: "ap-south-1",
            configuration: "Pre-approved",
            sr: "SR-009",
            status: "waiting",
            cost: 0,
          },
        ],
      },
    ],
    executionOrder: [
      {
        phase: 1,
        name: "Network Foundation",
        parallel: false,
        canRunWith: [],
        srs: [
          {
            id: "SR-001",
            title: "VPC Creation",
            estimatedTime: "5 min",
            status: "completed",
          },
        ],
      },
      {
        phase: 2,
        name: "Core Infrastructure",
        parallel: true,
        canRunWith: [],
        srs: [
          {
            id: "SR-002",
            title: "PostgreSQL Database",
            estimatedTime: "8 min",
            status: "pending",
          },
          {
            id: "SR-005",
            title: "Redis Cache",
            estimatedTime: "5 min",
            status: "completed",
          },
          {
            id: "SR-011",
            title: "S3 Buckets",
            estimatedTime: "2 min",
            status: "completed",
          },
          {
            id: "SR-004",
            title: "Application Servers (ECS)",
            estimatedTime: "6 min",
            status: "completed",
          },
        ],
      },
      {
        phase: 3,
        name: "Network Connectivity",
        parallel: true,
        canRunWith: [],
        srs: [
          {
            id: "SR-006",
            title: "Firewall - App to Database",
            estimatedTime: "2 min",
            status: "completed",
          },
          {
            id: "SR-007",
            title: "Firewall - App to Redis",
            estimatedTime: "2 min",
            status: "completed",
          },
          {
            id: "SR-003",
            title: "Load Balancer",
            estimatedTime: "4 min",
            status: "completed",
          },
        ],
      },
      {
        phase: 4,
        name: "External Services",
        parallel: false,
        canRunWith: [],
        srs: [
          {
            id: "SR-009",
            title: "Razorpay Integration",
            estimatedTime: "3 min",
            status: "waiting",
          },
        ],
      },
      {
        phase: 5,
        name: "CDN & Performance",
        parallel: true,
        canRunWith: [2, 3, 4],
        srs: [
          {
            id: "SR-010",
            title: "CloudFront CDN",
            estimatedTime: "5 min",
            status: "pending",
          },
        ],
      },
    ],
  }
}

export default function BOMPage({ params }: { params: { envId: string } }) {
  const bom = getBOMData(params.envId)

  const totalCost = bom.categories.reduce(
    (sum, cat) => sum + cat.items.reduce((s, item) => s + item.cost, 0),
    0
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success" className="text-xs">Completed</Badge>
      case "pending":
        return <Badge variant="warning" className="text-xs">Pending</Badge>
      case "waiting":
        return <Badge variant="outline" className="text-xs">Waiting</Badge>
      default:
        return <Badge className="text-xs">{status}</Badge>
    }
  }

  return (
    <div className="p-8">
      {/* Back Navigation */}
      <Link href={`/environments/${params.envId}`}>
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Environment
        </Button>
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Infrastructure Bill of Materials
        </h1>
        <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
          <span>{bom.environment}</span>
          <span>•</span>
          <span>{bom.environmentId}</span>
          <span>•</span>
          <span>Generated: {bom.generated}</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-6">
        {/* Action Buttons */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download Excel
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* BOM Table */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-base">Resources by Category</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                      Component
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                      Region
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                      Configuration
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                      SR
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">
                      Cost/Month
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bom.categories.map((category, catIndex) => (
                    <React.Fragment key={catIndex}>
                      {/* Category Header */}
                      <tr className="bg-gray-100 border-b">
                        <td
                          colSpan={6}
                          className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-700"
                        >
                          {category.name}
                        </td>
                      </tr>
                      {/* Category Items */}
                      {category.items.map((item, itemIndex) => (
                        <tr key={itemIndex} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {item.component}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {item.region}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {item.configuration}
                          </td>
                          <td className="px-4 py-3">
                            <Link
                              href={`/service-requests/${item.sr}`}
                              className="text-sm text-maruti-blue hover:underline"
                            >
                              {item.sr}
                            </Link>
                          </td>
                          <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
                          <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                            ₹{item.cost.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                  {/* Total Row */}
                  <tr className="border-t-2 bg-gray-50">
                    <td colSpan={5} className="px-4 py-3 text-sm font-semibold text-gray-900">
                      Total Monthly Cost
                    </td>
                    <td className="px-4 py-3 text-right text-lg font-bold text-gray-900">
                      ₹{totalCost.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Execution Order */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-base">Execution Order & Timeline</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {bom.executionOrder.map((phase) => (
                <div key={phase.phase}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-maruti-blue text-sm font-semibold text-white">
                      {phase.phase}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{phase.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        {phase.parallel && (
                          <Badge variant="outline" className="text-xs">
                            Parallel Execution
                          </Badge>
                        )}
                        {phase.canRunWith.length > 0 && (
                          <span>Can run with Phase {phase.canRunWith.join(", ")}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="ml-11 space-y-2">
                    {phase.srs.map((sr) => (
                      <div
                        key={sr.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/service-requests/${sr.id}`}
                            className="text-sm font-medium text-maruti-blue hover:underline"
                          >
                            {sr.id}
                          </Link>
                          <span className="text-sm text-gray-700">{sr.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-600">{sr.estimatedTime}</span>
                          {getStatusBadge(sr.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Total Time Estimate */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-900">
                      Total Estimated Deployment Time
                    </p>
                    <p className="text-lg font-bold text-blue-900">18-22 minutes</p>
                  </div>
                  <p className="mt-1 text-xs text-blue-700">
                    Phases 2-5 can run partially in parallel, reducing total time
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Clock, CheckCircle2, AlertCircle, Building2, FileText } from "lucide-react"
import { mockEnvironments, mockServiceRequests } from "@/lib/mock-data"
import { formatCurrency, formatDateTime, getStatusColor } from "@/lib/utils"

export default function HomePage() {
  const pendingRequests = mockServiceRequests.filter(sr => sr.status === "pending").length
  const activeEnvironments = mockEnvironments.filter(env => env.status === "active").length
  const inProgressRequests = mockServiceRequests.filter(sr => sr.status === "in_progress").length

  // Recent activity
  const recentActivity = [
    ...mockEnvironments.map(env => ({
      type: "environment" as const,
      title: env.name,
      subtitle: `Status: ${env.status}`,
      timestamp: env.updatedAt,
      status: env.status,
    })),
    ...mockServiceRequests.map(sr => ({
      type: "service-request" as const,
      title: sr.title,
      subtitle: `${sr.type} • ${sr.environmentType.toUpperCase()}`,
      timestamp: sr.updatedAt,
      status: sr.status,
    })),
  ]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-maruti-black">Developer Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Manage your infrastructure and service requests.
        </p>
      </div>

      {/* Primary CTA */}
      <Card className="mb-8 border-2 border-maruti-red bg-gradient-to-br from-maruti-red/5 to-maruti-blue/5">
        <CardContent className="flex items-center justify-between p-8">
          <div>
            <h2 className="text-2xl font-bold text-maruti-black">
              Create New Environment
            </h2>
            <p className="mt-2 text-gray-600">
              Upload your architecture diagram and let AI generate complete infrastructure BOM
            </p>
          </div>
          <Link href="/upload-architecture">
            <Button size="lg" variant="maruti" className="gap-2">
              <Rocket className="h-5 w-5" />
              Get Started
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-status-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Environments</CardTitle>
            <Building2 className="h-4 w-4 text-status-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEnvironments}</div>
            <p className="text-xs text-muted-foreground">Running successfully</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <AlertCircle className="h-4 w-4 text-status-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressRequests}</div>
            <p className="text-xs text-muted-foreground">Being provisioned</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates on your environments and service requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  activity.type === "environment" ? "bg-maruti-blue/10 text-maruti-blue" : "bg-maruti-nexa/10 text-maruti-nexa"
                }`}>
                  {activity.type === "environment" ? (
                    <Building2 className="h-5 w-5" />
                  ) : (
                    <FileText className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-maruti-black">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.subtitle}</p>
                    </div>
                    <Badge variant={
                      activity.status === "active" || activity.status === "completed" || activity.status === "approved"
                        ? "success"
                        : activity.status === "pending"
                        ? "warning"
                        : activity.status === "in_progress" || activity.status === "provisioning"
                        ? "info"
                        : "error"
                    }>
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {formatDateTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

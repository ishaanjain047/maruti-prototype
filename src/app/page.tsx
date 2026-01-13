"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, TrendingUp, TrendingDown, ArrowRight, CheckCircle2, Clock } from "lucide-react"

export default function HomePage() {
  // Mock data - in real app would come from API
  const stats = {
    activeEnvironments: { value: 12, trend: "+2", trendUp: true, label: "new this month" },
    pendingSRs: { value: 8, urgent: 3, label: "urgent" },
    completedThisMonth: { value: 47, trend: "+12%", trendUp: true, label: "vs last month" },
    monthlyCost: { value: 3069, trend: "-245", trendUp: false, label: "saved this month" },
    totalResources: { value: 54, label: "across all environments" },
    avgDeployTime: { value: 22, trend: "-45%", trendUp: false, label: "faster" },
  }

  const pendingApprovals = [
    {
      id: "SR-002",
      title: "PostgreSQL Database",
      category: "database",
      environment: "ecommerce-production",
      cost: 160,
      age: "2 days ago",
    },
    {
      id: "SR-008",
      title: "IAM Policy - ECS Secrets",
      category: "iam",
      environment: "ecommerce-production",
      cost: 0,
      age: "1 day ago",
    },
    {
      id: "SR-015",
      title: "Redis Cache",
      category: "cache",
      environment: "dealer-portal-uat",
      cost: 50,
      age: "6 hours ago",
    },
  ]

  const recentActivity = [
    {
      id: "1",
      type: "completed",
      message: "SR-007 completed",
      environment: "ecommerce-production",
      time: "2 hours ago",
    },
    {
      id: "2",
      type: "deployed",
      message: "Project Gamma deployed",
      details: "24 resources",
      time: "5 hours ago",
    },
    {
      id: "3",
      type: "completed",
      message: "SR-006 completed",
      environment: "dealer-portal-uat",
      time: "1 day ago",
    },
  ]

  const activeEnvironments = [
    {
      id: "env-new",
      name: "ecommerce-production",
      type: "PROD",
      status: "provisioning",
      completedSRs: 6,
      totalSRs: 9,
      cost: 587,
    },
    {
      id: "env-1",
      name: "Project Alpha - Development",
      type: "DEV",
      status: "active",
      resources: 12,
      cost: 485,
    },
    {
      id: "env-2",
      name: "Project Beta - QA",
      type: "QA",
      status: "active",
      resources: 8,
      cost: 320,
    },
  ]

  const getCategoryBadge = (category: string) => {
    const badges: Record<string, string> = {
      database: "Database",
      iam: "IAM",
      cache: "Cache",
      network: "Network",
      compute: "Compute",
    }
    return badges[category] || category
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Maruti Infrastructure Automation Portal
        </h1>
        <p className="mt-1 text-sm text-gray-600">Welcome back, Ishaan!</p>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Active Environments */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Environments</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">
                    {stats.activeEnvironments.value}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="font-medium text-green-600">{stats.activeEnvironments.trend}</span>
                    <span className="text-gray-500">{stats.activeEnvironments.label}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending SRs */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending SRs</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.pendingSRs.value}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    <span className="font-medium text-orange-600">{stats.pendingSRs.urgent}</span>
                    <span className="text-gray-500">{stats.pendingSRs.label}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Completed This Month */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed This Month</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">
                    {stats.completedThisMonth.value}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="font-medium text-green-600">{stats.completedThisMonth.trend}</span>
                    <span className="text-gray-500">{stats.completedThisMonth.label}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Cost */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">
                    ₹{stats.monthlyCost.value.toLocaleString()}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    <TrendingDown className="h-3 w-3 text-green-600" />
                    <span className="font-medium text-green-600">₹{stats.monthlyCost.trend}</span>
                    <span className="text-gray-500">{stats.monthlyCost.label}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Resources */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Resources</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.totalResources.value}</p>
                  <p className="mt-1 text-xs text-gray-500">{stats.totalResources.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Avg Deploy Time */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Deployment</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.avgDeployTime.value} min</p>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    <TrendingDown className="h-3 w-3 text-green-600" />
                    <span className="font-medium text-green-600">{stats.avgDeployTime.trend}</span>
                    <span className="text-gray-500">{stats.avgDeployTime.label}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Primary CTA */}
        <Card className="border-2 border-maruti-blue">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Create New Environment</h2>
              <p className="mt-1 text-sm text-gray-600">
                Upload EA diagram and generate infrastructure automatically
              </p>
            </div>
            <Link href="/create/step-1">
              <Button size="lg" className="bg-maruti-blue hover:bg-maruti-blue/90">
                <Rocket className="mr-2 h-4 w-4" />
                Get Started
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">
              Pending Approvals ({pendingApprovals.length})
            </CardTitle>
            <Link href="/service-requests?status=pending">
              <Button variant="ghost" size="sm" className="text-xs">
                View All
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingApprovals.map((sr) => (
              <div
                key={sr.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">
                      {sr.id}: {sr.title}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {getCategoryBadge(sr.category)}
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-gray-600">
                    <span>{sr.environment}</span>
                    <span>•</span>
                    <span>₹{sr.cost}/mo</span>
                    <span>•</span>
                    <Clock className="h-3 w-3 inline" />
                    <span>{sr.age}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/service-requests/${sr.id}`}>
                    <Button variant="ghost" size="sm" className="text-xs">
                      View
                    </Button>
                  </Link>
                  <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700">
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Two Column Layout: Recent Activity + Active Environments */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
              <Link href="/activity">
                <Button variant="ghost" size="sm" className="text-xs">
                  View All
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 text-sm">
                  {activity.type === "completed" && (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600 flex-shrink-0" />
                  )}
                  {activity.type === "deployed" && (
                    <Rocket className="mt-0.5 h-4 w-4 text-blue-600 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900">{activity.message}</p>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-600">
                      {activity.environment && <span>{activity.environment}</span>}
                      {activity.details && <span>{activity.details}</span>}
                      <span>•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Environments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold">
                Active Environments ({activeEnvironments.length})
              </CardTitle>
              <Link href="/environments">
                <Button variant="ghost" size="sm" className="text-xs">
                  View All
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeEnvironments.map((env) => (
                <Link key={env.id} href={`/environments/${env.id}`}>
                  <div className="rounded-lg border border-gray-200 p-3 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900 truncate">{env.name}</p>
                          <Badge variant="outline" className="text-xs flex-shrink-0">
                            {env.type}
                          </Badge>
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-xs text-gray-600">
                          {env.status === "provisioning" ? (
                            <>
                              <Badge variant="warning" className="text-xs">
                                Deploying
                              </Badge>
                              <span>
                                {env.completedSRs}/{env.totalSRs} SRs
                              </span>
                            </>
                          ) : (
                            <>
                              <Badge variant="success" className="text-xs">
                                Active
                              </Badge>
                              <span>{env.resources} resources</span>
                            </>
                          )}
                          <span>•</span>
                          <span>₹{env.cost}/mo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

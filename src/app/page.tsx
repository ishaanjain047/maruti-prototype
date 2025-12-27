import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Building2, FileText, TrendingUp } from "lucide-react"

export default function HomePage() {
  // Mock data - in real app would come from API
  const activeEnvironments = 12
  const pendingSRs = 3
  const completedThisMonth = 47

  const recentEnvironments = [
    {
      id: "env-1",
      name: "ecommerce-production",
      status: "running" as const,
      cost: 587,
    },
    {
      id: "env-2",
      name: "dealer-portal-uat",
      status: "deploying" as const,
      progress: "SR-003/007",
    },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-maruti-black">
          Maruti Infrastructure Automation Portal
        </h1>
        <p className="mt-2 text-gray-600">
          Welcome back, Ishaan!
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Environments</CardTitle>
              <Building2 className="h-4 w-4 text-maruti-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeEnvironments}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending SRs</CardTitle>
              <FileText className="h-4 w-4 text-status-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingSRs}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-status-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedThisMonth}</div>
            </CardContent>
          </Card>
        </div>

        {/* Primary CTA */}
        <Card className="border-2 border-maruti-blue bg-gradient-to-br from-maruti-blue/5 to-maruti-nexa/5">
          <CardContent className="flex items-center justify-between p-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-maruti-black">
                CREATE NEW ENVIRONMENT
              </h2>
              <p className="mt-2 text-gray-600">
                Upload EA diagram and generate infrastructure automatically
              </p>
            </div>
            <Link href="/create/step-1">
              <Button size="lg" className="gap-2 bg-maruti-blue hover:bg-maruti-blue/90">
                <Rocket className="h-5 w-5" />
                Get Started
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Environments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Environments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentEnvironments.map((env) => (
              <div
                key={env.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-semibold text-maruti-black">{env.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm text-gray-600">Status:</span>
                    {env.status === "running" ? (
                      <>
                        <Badge variant="success">Running</Badge>
                        {env.cost && (
                          <span className="text-sm text-gray-600">
                            Cost: ₹{env.cost}/month
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <Badge variant="warning">Deploying ({env.progress})</Badge>
                      </>
                    )}
                  </div>
                </div>
                <Link href={`/environments/${env.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

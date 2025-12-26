"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Database, Network, ExternalLink } from "lucide-react"
import { mockIntegrations } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"

const mockArchitectures = [
  {
    id: "arch-1",
    name: "Full-Stack Web Application",
    project: "Project Alpha",
    components: ["Application Server", "Database", "Cache", "Load Balancer"],
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "arch-2",
    name: "Microservices Architecture",
    project: "Project Beta",
    components: ["API Gateway", "Services", "Message Queue", "Database"],
    createdAt: "2024-12-10T14:00:00Z",
  },
]

const mockBOMs = [
  {
    id: "bom-1",
    name: "Project Alpha - DEV",
    totalCost: 485.67,
    resources: 11,
    createdAt: "2025-01-15T11:00:00Z",
  },
  {
    id: "bom-2",
    name: "Project Beta - QA",
    totalCost: 320.45,
    resources: 8,
    createdAt: "2024-12-11T09:00:00Z",
  },
]

export default function KnowledgeBasePage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-maruti-black">Knowledge Base</h1>
        <p className="mt-2 text-gray-600">
          Browse stored architectures, BOMs, and integration catalog (Read-only)
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="architectures" className="space-y-6">
        <TabsList>
          <TabsTrigger value="architectures">Stored Architectures</TabsTrigger>
          <TabsTrigger value="boms">Stored BOMs</TabsTrigger>
          <TabsTrigger value="integrations">Integration Catalog</TabsTrigger>
        </TabsList>

        {/* Architectures */}
        <TabsContent value="architectures">
          <Card>
            <CardHeader>
              <CardTitle>Stored Architectures</CardTitle>
              <CardDescription>
                Previously analyzed architecture diagrams and their components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockArchitectures.map((arch) => (
                  <div key={arch.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-maruti-blue/10 text-maruti-blue">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-maruti-black">{arch.name}</h3>
                        <p className="text-sm text-gray-600">Project: {arch.project}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {arch.components.map((comp, idx) => (
                            <Badge key={idx} variant="outline">
                              {comp}
                            </Badge>
                          ))}
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          Created: {formatDate(arch.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BOMs */}
        <TabsContent value="boms">
          <Card>
            <CardHeader>
              <CardTitle>Stored BOMs</CardTitle>
              <CardDescription>
                Previously generated Bill of Materials for various projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBOMs.map((bom) => (
                  <div key={bom.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-maruti-nexa/10 text-maruti-nexa">
                        <Database className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-maruti-black">{bom.name}</h3>
                        <p className="text-sm text-gray-600">
                          {bom.resources} resources • ₹{bom.totalCost.toFixed(2)}/month
                        </p>
                        <p className="mt-2 text-xs text-gray-500">
                          Created: {formatDate(bom.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integration Catalog</CardTitle>
              <CardDescription>
                Available external integrations with endpoints and authentication details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockIntegrations.map((integration) => (
                  <div key={integration.id} className="rounded-lg border p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-status-premium/10 text-status-premium">
                        <Network className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-maruti-black">{integration.name}</h3>
                            <Badge variant="outline" className="mt-1">
                              {integration.type}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={integration.documentation} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500">Endpoint</div>
                            <div className="font-mono text-xs text-gray-900">{integration.endpoint}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Port</div>
                            <div className="text-gray-900">{integration.port}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Authentication</div>
                            <div className="text-gray-900">{integration.authMethod}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">SLA</div>
                            <div className="text-gray-900">{integration.sla}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

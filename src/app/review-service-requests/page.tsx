"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Check, X, Edit2, MessageSquare, Plus } from "lucide-react"
import { ServiceRequest } from "@/types"

// Mock generated SRs
const mockGeneratedSRs: ServiceRequest[] = [
  // Infrastructure SRs
  {
    id: "sr-gen-1",
    type: "infrastructure",
    title: "Provision ECS Cluster",
    description: "Create ECS cluster with m6g.large instances",
    environment: "Project Alpha",
    environmentType: "dev",
    status: "pending",
    priority: "high",
    confidence: 95,
    createdBy: "AI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    approvalChain: [],
    details: { instanceType: "m6g.large", count: 2 },
    notes: [],
  },
  {
    id: "sr-gen-2",
    type: "infrastructure",
    title: "Provision RDS PostgreSQL",
    description: "Database instance for application data",
    environment: "Project Alpha",
    environmentType: "dev",
    status: "pending",
    priority: "high",
    confidence: 96,
    createdBy: "AI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    approvalChain: [],
    details: { engine: "postgresql", instanceClass: "db.t4g.medium" },
    notes: [],
  },
  // Network & Security SRs
  {
    id: "sr-gen-3",
    type: "firewall",
    title: "Firewall: ALB to ECS",
    description: "Allow traffic from load balancer to application servers",
    environment: "Project Alpha",
    environmentType: "dev",
    status: "pending",
    priority: "high",
    confidence: 92,
    createdBy: "AI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    approvalChain: [],
    details: { port: 8080, protocol: "TCP" },
    notes: [],
  },
  {
    id: "sr-gen-4",
    type: "ip_whitelist",
    title: "IP Whitelist: Payment Gateway",
    description: "Whitelist Razorpay callback IPs",
    environment: "Project Alpha",
    environmentType: "dev",
    status: "pending",
    priority: "high",
    confidence: 89,
    createdBy: "AI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    approvalChain: [],
    details: { ip: "203.45.67.89" },
    notes: [],
  },
  // Access SRs
  {
    id: "sr-gen-5",
    type: "access",
    title: "AD Group: Developers",
    description: "Create AD group for developer access",
    environment: "Project Alpha",
    environmentType: "dev",
    status: "pending",
    priority: "medium",
    confidence: 91,
    createdBy: "AI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    approvalChain: [],
    details: { groupName: "SG-ProjectAlpha-Developers" },
    notes: [],
  },
]

export default function ReviewServiceRequestsPage() {
  const router = useRouter()
  const [srs, setSRs] = useState(mockGeneratedSRs)
  const [editingId, setEditingId] = useState<string | null>(null)

  const getSRsByCategory = (category: string) => {
    switch (category) {
      case "infrastructure":
        return srs.filter(sr => sr.type === "infrastructure")
      case "network":
        return srs.filter(sr => ["firewall", "network", "security", "ip_whitelist"].includes(sr.type))
      case "access":
        return srs.filter(sr => sr.type === "access")
      default:
        return []
    }
  }

  const approveSR = (id: string) => {
    setSRs(srs.map(sr => sr.id === id ? { ...sr, status: "approved" as const } : sr))
  }

  const rejectSR = (id: string) => {
    setSRs(srs.filter(sr => sr.id !== id))
  }

  const toggleEdit = (id: string) => {
    setEditingId(editingId === id ? null : id)
  }

  const approvedCount = srs.filter(sr => sr.status === "approved").length

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-maruti-black">Review Service Requests</h1>
          <p className="mt-2 text-gray-600">
            Review and approve AI-generated service requests
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-maruti-blue">{approvedCount}/{srs.length}</div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="infrastructure" className="space-y-6">
        <TabsList>
          <TabsTrigger value="infrastructure">
            Infrastructure ({getSRsByCategory("infrastructure").length})
          </TabsTrigger>
          <TabsTrigger value="network">
            Network & Security ({getSRsByCategory("network").length})
          </TabsTrigger>
          <TabsTrigger value="access">
            Access & Identity ({getSRsByCategory("access").length})
          </TabsTrigger>
        </TabsList>

        {["infrastructure", "network", "access"].map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-4">
              {getSRsByCategory(category).map((sr) => (
                <Card key={sr.id} className={
                  sr.status === "approved" ? "border-status-success bg-status-success/5" : ""
                }>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{sr.title}</CardTitle>
                          <Badge variant={sr.status === "approved" ? "success" : "warning"}>
                            Confidence: {sr.confidence}%
                          </Badge>
                        </div>
                        <CardDescription className="mt-2">{sr.description}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          sr.priority === "high" ? "error" : sr.priority === "medium" ? "warning" : "info"
                        }
                      >
                        {sr.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Details */}
                    <div className="mb-4 rounded-lg bg-gray-50 p-4">
                      <h4 className="mb-2 text-sm font-semibold text-gray-700">Configuration</h4>
                      <dl className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(sr.details).map(([key, value]) => (
                          <div key={key}>
                            <dt className="text-gray-500">{key}:</dt>
                            <dd className="font-medium text-gray-900">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {sr.status !== "approved" ? (
                        <>
                          <Button
                            size="sm"
                            variant="default"
                            className="bg-status-success hover:bg-status-success/90"
                            onClick={() => approveSR(sr.id)}
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleEdit(sr.id)}
                          >
                            <Edit2 className="mr-1 h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => rejectSR(sr.id)}
                          >
                            <X className="mr-1 h-4 w-4" />
                            Reject
                          </Button>
                        </>
                      ) : (
                        <Badge variant="success" className="px-3 py-1">
                          <Check className="mr-1 h-3 w-3" />
                          Approved
                        </Badge>
                      )}
                    </div>

                    {/* Edit Form */}
                    {editingId === sr.id && (
                      <div className="mt-4 space-y-3 border-t pt-4">
                        <Textarea
                          placeholder="Add notes or modifications..."
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => setEditingId(null)}>
                            Save Changes
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Bottom Actions */}
      <div className="mt-8 flex gap-4">
        <Button
          size="lg"
          className="flex-1 bg-maruti-blue hover:bg-maruti-blue/90"
          onClick={() => router.push("/bom-preview")}
          disabled={approvedCount === 0}
        >
          Generate Infrastructure BOM ({approvedCount} SRs)
        </Button>
        <Button size="lg" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Manual SR
        </Button>
      </div>
    </div>
  )
}

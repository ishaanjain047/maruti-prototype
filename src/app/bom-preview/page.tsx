"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Edit2, Sparkles } from "lucide-react"
import { mockBOMItems, mockBOM } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"

export default function BOMPreviewPage() {
  const router = useRouter()

  const totalCost = mockBOM.totalCost

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-maruti-black">Infrastructure BOM Preview</h1>
          <p className="mt-2 text-gray-600">
            Review your auto-generated Bill of Materials
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Excel
        </Button>
      </div>

      {/* Summary Card */}
      <Card className="mb-8 border-2 border-maruti-blue/20 bg-gradient-to-br from-maruti-blue/5 to-maruti-nexa/5">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <div className="text-sm font-medium text-gray-600">Estimated Monthly Cost</div>
            <div className="mt-1 text-3xl font-bold text-maruti-black">
              {formatCurrency(totalCost)}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {mockBOMItems.length} resources • Non-Production Environment
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-600">Region</div>
            <div className="mt-1 text-lg font-semibold text-maruti-blue">
              Asia Pacific (Mumbai)
            </div>
            <div className="text-sm text-gray-500">ap-south-1</div>
          </div>
        </CardContent>
      </Card>

      {/* BOM Table */}
      <Tabs defaultValue="infrastructure" className="space-y-6">
        <TabsList>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="network">Network & Security</TabsTrigger>
          <TabsTrigger value="access">Access & Identity</TabsTrigger>
          <TabsTrigger value="integration">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="infrastructure">
          <Card>
            <CardHeader>
              <CardTitle>Infrastructure Resources</CardTitle>
              <CardDescription>
                Compute, storage, and database resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="p-3 text-left text-sm font-semibold text-gray-700">Service</th>
                      <th className="p-3 text-left text-sm font-semibold text-gray-700">Service Type</th>
                      <th className="p-3 text-left text-sm font-semibold text-gray-700">Resource Name</th>
                      <th className="p-3 text-left text-sm font-semibold text-gray-700">Region</th>
                      <th className="p-3 text-left text-sm font-semibold text-gray-700">Configuration</th>
                      <th className="p-3 text-right text-sm font-semibold text-gray-700">Monthly Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBOMItems.map((item, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="p-3 text-sm">{item.service}</td>
                        <td className="p-3 text-sm text-gray-600">{item.serviceType}</td>
                        <td className="p-3 text-sm font-medium">{item.resourceName}</td>
                        <td className="p-3 text-sm text-gray-600">{item.region}</td>
                        <td className="p-3 text-sm font-mono text-xs text-gray-600">
                          {item.configuration}
                        </td>
                        <td className="p-3 text-right text-sm font-semibold">
                          {formatCurrency(item.estimatedCost)}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 bg-gray-50 font-semibold">
                      <td colSpan={5} className="p-3 text-sm text-right">
                        Total Estimated Monthly Cost:
                      </td>
                      <td className="p-3 text-right text-lg text-maruti-blue">
                        {formatCurrency(totalCost)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network">
          <Card>
            <CardHeader>
              <CardTitle>Network & Security</CardTitle>
              <CardDescription>
                Firewall rules, IP whitelisting, DNS, SSL certificates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rule: "ALB → ECS", source: "ALB", destination: "10.0.1.0/24", port: "8080", protocol: "TCP" },
                  { rule: "ECS → RDS", source: "10.0.1.0/24", destination: "10.0.2.0/24", port: "5432", protocol: "TCP" },
                  { rule: "ECS → ElastiCache", source: "10.0.1.0/24", destination: "10.0.2.0/24", port: "6379", protocol: "TCP" },
                  { rule: "ECS → Payment Gateway", source: "10.0.1.0/24", destination: "203.45.67.89", port: "443", protocol: "TCP" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <div className="font-semibold text-maruti-black">{item.rule}</div>
                      <div className="text-sm text-gray-600">
                        {item.source} → {item.destination} : {item.port} ({item.protocol})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access">
          <Card>
            <CardHeader>
              <CardTitle>Access & Identity</CardTitle>
              <CardDescription>
                AD groups, user access, and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { group: "SG-ProjectAlpha-Developers", users: 5, permissions: "Read/Write" },
                  { group: "SG-ProjectAlpha-Admins", users: 2, permissions: "Full Access" },
                  { group: "SG-ProjectAlpha-Viewers", users: 10, permissions: "Read Only" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <div className="font-semibold text-maruti-black">{item.group}</div>
                      <div className="text-sm text-gray-600">
                        {item.users} users • {item.permissions}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                External API endpoints and authentication methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Payment Gateway - Razorpay", endpoint: "https://api.razorpay.com", auth: "API Key" },
                  { name: "SMS Provider - Twilio", endpoint: "https://api.twilio.com", auth: "OAuth 2.0" },
                  { name: "Email Service - SendGrid", endpoint: "https://api.sendgrid.com", auth: "API Key" },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-lg border p-4">
                    <div className="font-semibold text-maruti-black">{item.name}</div>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Endpoint</div>
                        <div className="font-mono text-xs text-gray-900">{item.endpoint}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Authentication</div>
                        <div className="text-gray-900">{item.auth}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <Button
          size="lg"
          className="flex-1 bg-maruti-blue hover:bg-maruti-blue/90"
          onClick={() => router.push("/template-selection")}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Find Best Templates
        </Button>
        <Button size="lg" variant="outline" onClick={() => router.push("/review-service-requests")}>
          <Edit2 className="mr-2 h-4 w-4" />
          Edit BOM
        </Button>
      </div>
    </div>
  )
}

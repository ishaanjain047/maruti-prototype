"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, TrendingUp, Shield, Zap } from "lucide-react"
import { mockTemplates } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"

export default function TemplateSelectionPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-maruti-black">Select Template</h1>
        <p className="mt-2 text-gray-600">
          AI has matched your requirements with pre-approved templates
        </p>
      </div>

      {/* Templates */}
      <div className="grid gap-6 lg:grid-cols-3">
        {mockTemplates.map((template, idx) => {
          const isSelected = selectedTemplate === template.id
          const isRecommended = idx === 0

          return (
            <Card
              key={template.id}
              className={`relative cursor-pointer transition-all ${
                isSelected
                  ? "border-2 border-maruti-blue shadow-lg"
                  : "border hover:shadow-md"
              } ${isRecommended ? "ring-2 ring-maruti-nexa ring-offset-2" : ""}`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              {isRecommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-maruti-nexa px-3 py-1 text-white">
                    <Zap className="mr-1 h-3 w-3" />
                    Recommended
                  </Badge>
                </div>
              )}

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="mt-2">{template.description}</CardDescription>
                  </div>
                  {isSelected && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-maruti-blue text-white">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Match Percentage */}
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">Match Score</span>
                    <span className="font-bold text-maruti-blue">{template.matchPercentage}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-maruti-blue transition-all"
                      style={{ width: `${template.matchPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-2xl font-bold text-maruti-black">{template.coverage}%</div>
                    <div className="text-xs text-gray-600">Coverage</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-maruti-black">{template.items.length}</div>
                    <div className="text-xs text-gray-600">Resources</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center">
                      {template.compliant ? (
                        <Shield className="h-5 w-5 text-status-success" />
                      ) : (
                        <Shield className="h-5 w-5 text-status-error" />
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
                      {template.compliant ? "Compliant" : "Non-compliant"}
                    </div>
                  </div>
                </div>

                {/* Cost */}
                <div className="border-t pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-gray-600">Estimated Cost</span>
                    <div>
                      <span className="text-2xl font-bold text-maruti-black">
                        {formatCurrency(template.costEstimate)}
                      </span>
                      <span className="text-sm text-gray-600">/month</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 border-t pt-4">
                  <div className="text-xs font-semibold uppercase text-gray-500">Includes</div>
                  <ul className="space-y-1">
                    {template.items.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-status-success" />
                        <span className="text-gray-700">{item.service}</span>
                      </li>
                    ))}
                    {template.items.length > 3 && (
                      <li className="text-xs text-gray-500">
                        + {template.items.length - 3} more resources
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Comparison Table */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Detailed Comparison</CardTitle>
          <CardDescription>Compare features across all templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Feature</th>
                  {mockTemplates.map((template) => (
                    <th key={template.id} className="p-3 text-center text-sm font-semibold text-gray-700">
                      {template.name.split(" - ")[1] || template.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 text-sm font-medium">Match Score</td>
                  {mockTemplates.map((template) => (
                    <td key={template.id} className="p-3 text-center text-sm font-semibold text-maruti-blue">
                      {template.matchPercentage}%
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-sm font-medium">Monthly Cost</td>
                  {mockTemplates.map((template) => (
                    <td key={template.id} className="p-3 text-center text-sm">
                      {formatCurrency(template.costEstimate)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-sm font-medium">Resources</td>
                  {mockTemplates.map((template) => (
                    <td key={template.id} className="p-3 text-center text-sm">
                      {template.items.length}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-sm font-medium">Compliance</td>
                  {mockTemplates.map((template) => (
                    <td key={template.id} className="p-3 text-center">
                      {template.compliant ? (
                        <Check className="inline h-5 w-5 text-status-success" />
                      ) : (
                        <span className="text-status-error">✗</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <Button
          size="lg"
          className="flex-1 bg-maruti-blue hover:bg-maruti-blue/90"
          onClick={() => router.push("/provisioning")}
          disabled={!selectedTemplate}
        >
          Submit for Approval
        </Button>
        <Button size="lg" variant="outline" onClick={() => router.push("/bom-preview")}>
          Back to BOM
        </Button>
      </div>
    </div>
  )
}

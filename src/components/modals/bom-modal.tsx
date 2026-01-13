"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Download, Mail } from "lucide-react"

interface BOMModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BOMModal({ isOpen, onClose }: BOMModalProps) {
  if (!isOpen) return null

  const bomData = {
    environment: "ecommerce-production",
    environmentId: "ENV-2025-001",
    generated: "28 Dec 2025, 14:32",
    totalCost: 587.5,
    categories: [
      {
        name: "NETWORK INFRASTRUCTURE",
        level: 1,
        items: [
          { component: "VPC", region: "ap-south-1", config: "10.100.0.0/16", cost: 0, sr: "SR-001" },
          { component: "Subnets (8)", region: "ap-south-1", config: "Multi-tier layout", cost: 0, sr: "SR-001" },
          { component: "NAT Gateway (2)", region: "ap-south-1", config: "Multi-AZ HA", cost: 46, sr: "SR-001" },
          { component: "Route 53", region: "Global", config: "Hosted zone", cost: 0.5, sr: "SR-001" },
          { component: "CloudFront CDN", region: "Global", config: "Standard config", cost: 50, sr: "SR-001" },
        ],
      },
      {
        name: "DATABASES & STORAGE",
        level: 2,
        items: [
          { component: "PostgreSQL DB", region: "ap-south-1", config: "Production-Medium, Multi-AZ", cost: 160, sr: "SR-002", status: "pending" },
          { component: "Redis Cache", region: "ap-south-1", config: "Production-Small", cost: 15, sr: "SR-005" },
          { component: "S3 Buckets", region: "ap-south-1", config: "Standard tier", cost: 2, sr: "SR-001" },
        ],
      },
      {
        name: "COMPUTE & APPLICATION",
        level: 2,
        items: [
          { component: "Application ECS", region: "ap-south-1", config: "Production-Medium (3-6 tasks)", cost: 180, sr: "SR-004" },
          { component: "Load Balancer", region: "ap-south-1", config: "Application ALB", cost: 23.29, sr: "SR-003" },
        ],
      },
      {
        name: "DEVOPS STACK (STANDARD)",
        level: 2,
        items: [
          { component: "Jenkins", region: "ap-south-1", config: "t4g.medium, 100GB", cost: 27.08, sr: "SR-010" },
          { component: "Terraform", region: "ap-south-1", config: "t4g.small, 50GB", cost: 12.74, sr: "SR-011" },
          { component: "ELK", region: "ap-south-1", config: "t4g.medium, 100GB", cost: 22.52, sr: "SR-012" },
          { component: "Airflow", region: "ap-south-1", config: "t4g.medium, 50GB", cost: 17.96, sr: "SR-013" },
          { component: "Pritunl VPN", region: "ap-south-1", config: "t3a.micro, 50GB", cost: 9.09, sr: "SR-014" },
        ],
      },
    ],
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-6">
          <div>
            <h2 className="text-2xl font-bold text-maruti-black">
              📋 Infrastructure Bill of Materials (BOM)
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Environment: <span className="font-semibold">{bomData.environment}</span> • Generated: {bomData.generated}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Action Buttons */}
          <div className="mb-6 flex gap-3">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download Excel
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Email to Stakeholders
            </Button>
          </div>

          {/* BOM Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300 bg-gray-50">
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Component</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Region</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Configuration</th>
                  <th className="p-3 text-center text-sm font-semibold text-gray-700">SR</th>
                  <th className="p-3 text-center text-sm font-semibold text-gray-700">Status</th>
                  <th className="p-3 text-right text-sm font-semibold text-gray-700">Cost/Month</th>
                </tr>
              </thead>
              <tbody>
                {bomData.categories.map((category, catIdx) => (
                  <React.Fragment key={catIdx}>
                    {/* Category Header */}
                    <tr className="border-b border-gray-300 bg-blue-50">
                      <td colSpan={6} className="p-3 font-bold text-gray-900">
                        {catIdx + 1}️⃣ {category.name}
                      </td>
                    </tr>
                    {/* Category Items */}
                    {category.items.map((item, itemIdx) => (
                      <tr
                        key={itemIdx}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="p-3 text-sm text-gray-900">{item.component}</td>
                        <td className="p-3 text-sm text-gray-600">{item.region}</td>
                        <td className="p-3 text-sm text-gray-600">{item.config}</td>
                        <td className="p-3 text-center">
                          <Badge variant="outline" className="text-xs">
                            {item.sr}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          {item.status === "pending" ? (
                            <Badge variant="warning" className="text-xs">
                              ⏸️ Pending
                            </Badge>
                          ) : (
                            <Badge variant="success" className="text-xs">
                              ✅ Done
                            </Badge>
                          )}
                        </td>
                        <td className="p-3 text-right text-sm font-semibold text-gray-900">
                          ₹{item.cost.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
                {/* Total Row */}
                <tr className="border-t-2 border-gray-300 bg-blue-100">
                  <td colSpan={5} className="p-3 text-right font-bold text-gray-900">
                    TOTAL MONTHLY COST
                  </td>
                  <td className="p-3 text-right text-lg font-bold text-maruti-blue">
                    ₹{bomData.totalCost.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <Card className="mt-6 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-sm">SUMMARY</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-4 text-sm">
              <div>
                <p className="text-gray-600">Total Resources</p>
                <p className="text-xl font-bold text-maruti-black">15</p>
              </div>
              <div>
                <p className="text-gray-600">Total SRs</p>
                <p className="text-xl font-bold text-maruti-black">9</p>
              </div>
              <div>
                <p className="text-gray-600">Completed</p>
                <p className="text-xl font-bold text-status-success">6</p>
              </div>
              <div>
                <p className="text-gray-600">Pending</p>
                <p className="text-xl font-bold text-status-warning">3</p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 rounded-lg bg-yellow-50 p-4">
            <p className="text-sm font-medium text-yellow-800">
              ℹ️ Note: This BOM represents ALL Service Requests combined
            </p>
            <p className="text-sm text-yellow-700 mt-1">
              Each SR creates one or more infrastructure components. The cost breakdown matches the Excel format used in Maruti's standard infrastructure documentation.
            </p>
          </div>

          {/* Close Button */}
          <div className="mt-6 flex justify-end">
            <Button onClick={onClose} className="bg-maruti-blue hover:bg-maruti-blue/90">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

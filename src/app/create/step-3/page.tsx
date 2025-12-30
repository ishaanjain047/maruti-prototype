"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"

export default function Step3Page() {
  const router = useRouter()
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = () => {
    router.push("/create/step-4")
  }

  const estimatedCost = 587.5

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/create/step-2"
          className="mb-2 inline-flex items-center text-sm text-gray-600 hover:text-maruti-blue"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Link>
        <h1 className="text-3xl font-bold text-maruti-black">
          CONFIGURATION REVIEW
        </h1>
        <p className="mt-2 text-gray-600">Step 3 of 4</p>
      </div>

      <div className="mx-auto max-w-5xl">
        {/* Success Message */}
        <div className="mb-6 rounded-lg border-2 border-green-200 bg-green-50 p-6">
          <div className="flex items-center gap-2 text-green-800 mb-2">
            <CheckCircle2 className="h-6 w-6" />
            <span className="text-lg font-semibold">Analysis Complete!</span>
          </div>
          <p className="text-sm text-green-700">
            AI has detected your architecture and auto-selected optimal resource sizes.
          </p>
        </div>

        {/* Detected Components Summary */}
        <div className="space-y-6 mb-6">
          <h2 className="text-xl font-bold text-maruti-black">📊 DETECTED COMPONENTS</h2>

          {/* Network Infrastructure */}
          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg">🌐 Network Infrastructure</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-maruti-blue">•</span>
                  <span>VPC with 8 subnets (Public, Private, Database, Cache)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-maruti-blue">•</span>
                  <span>2 Availability Zones for High Availability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-maruti-blue">•</span>
                  <span>NAT Gateway for internet access</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Databases */}
          <Card>
            <CardHeader className="bg-purple-50">
              <CardTitle className="text-lg">💾 Databases</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">PostgreSQL Database</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Size: <Badge variant="outline">Production - Medium</Badge>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Optimized for production workloads with high availability
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">₹160/month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Servers */}
          <Card>
            <CardHeader className="bg-green-50">
              <CardTitle className="text-lg">🚀 Application Servers</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Backend API (Java Spring Boot)</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Size: <Badge variant="outline">Production - Medium</Badge>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Auto-scaling: 3-6 instances based on load
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">₹180/month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cache & Performance */}
          <Card>
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-lg">⚡ Cache & Performance</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Redis Cache</p>
                    <p className="text-sm text-gray-600">
                      Size: <Badge variant="outline">Production - Small</Badge>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">₹15/month</p>
                  </div>
                </li>
                <li className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">CloudFront CDN</p>
                    <p className="text-sm text-gray-600">Global distribution</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">₹50/month</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* External Integrations */}
          <Card>
            <CardHeader className="bg-yellow-50">
              <CardTitle className="text-lg">🔌 External Integrations</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-status-success" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Razorpay Payment Gateway</p>
                  <p className="text-sm text-gray-600">
                    Status: Pre-Approved Integration
                  </p>
                  <p className="text-sm text-gray-600">
                    Firewall rules will be auto-configured
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cost Summary */}
        <Card className="mb-6 border-2 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">💰 ESTIMATED COST</p>
                <p className="text-3xl font-bold text-maruti-black mt-1">
                  ₹{estimatedCost.toFixed(2)}<span className="text-lg text-gray-600">/month</span>
                </p>
              </div>
              <Button variant="outline" size="sm">
                View Cost Breakdown
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Options (Collapsed by Default) */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex w-full items-center justify-between text-left"
            >
              <div>
                <p className="font-semibold text-gray-900">⚠️ Need to adjust sizing?</p>
                <p className="text-sm text-gray-600">
                  Click to show advanced configuration options
                </p>
              </div>
              {showAdvanced ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>

            {showAdvanced && (
              <div className="mt-6 space-y-6 border-t pt-6">
                <div className="rounded-lg bg-yellow-50 p-4">
                  <p className="text-sm font-medium text-yellow-800">
                    ⚠️ Advanced Configuration
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    These options are for power users only. The AI has already selected
                    optimal configurations based on your environment type.
                  </p>
                </div>

                {/* Database Sizing */}
                <div>
                  <p className="font-semibold text-gray-900 mb-3">
                    PostgreSQL Database Sizing
                  </p>
                  <div className="space-y-2">
                    {[
                      {
                        size: "Small",
                        desc: "For: Dev/Test, < 100 users",
                        cost: "₹80/month",
                        value: "small",
                      },
                      {
                        size: "Medium",
                        desc: "For: UAT/Staging, 100-1K users",
                        cost: "₹160/month",
                        value: "medium",
                        recommended: true,
                      },
                      {
                        size: "Large",
                        desc: "For: Production, 1K-10K users",
                        cost: "₹320/month",
                        value: "large",
                      },
                      {
                        size: "X-Large",
                        desc: "For: High-scale production",
                        cost: "₹640/month",
                        value: "xlarge",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors ${
                          option.recommended
                            ? "border-maruti-blue bg-maruti-blue/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="dbSize"
                          value={option.value}
                          defaultChecked={option.recommended}
                          className="h-4 w-4 text-maruti-blue"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              {option.size}
                            </span>
                            {option.recommended && (
                              <Badge variant="success" className="text-xs">
                                ⭐ AI Recommended
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{option.desc}</p>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {option.cost}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Application Sizing */}
                <div>
                  <p className="font-semibold text-gray-900 mb-3">
                    Application Server Sizing
                  </p>
                  <div className="space-y-2">
                    {[
                      {
                        size: "Small",
                        desc: "1-2 instances, suitable for dev/test",
                        cost: "₹60/month",
                        value: "small",
                      },
                      {
                        size: "Medium",
                        desc: "3-6 instances with auto-scaling",
                        cost: "₹180/month",
                        value: "medium",
                        recommended: true,
                      },
                      {
                        size: "Large",
                        desc: "6-12 instances with auto-scaling",
                        cost: "₹360/month",
                        value: "large",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors ${
                          option.recommended
                            ? "border-maruti-blue bg-maruti-blue/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="appSize"
                          value={option.value}
                          defaultChecked={option.recommended}
                          className="h-4 w-4 text-maruti-blue"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              {option.size}
                            </span>
                            {option.recommended && (
                              <Badge variant="success" className="text-xs">
                                ⭐ AI Recommended
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{option.desc}</p>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {option.cost}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Link href="/create/step-2" className="flex-1">
            <Button type="button" variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-maruti-blue hover:bg-maruti-blue/90"
          >
            Generate SRs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

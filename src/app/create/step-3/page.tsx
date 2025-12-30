"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"

export default function Step3Page() {
  const router = useRouter()
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = () => {
    router.push("/create/step-4")
  }

  const components = [
    {
      name: "Network Infrastructure",
      size: "Standard",
      description: "VPC with 8 subnets across 2 Availability Zones",
      cost: 46,
      aiRecommended: true,
    },
    {
      name: "PostgreSQL Database",
      size: "Medium",
      description: "Production-grade with Multi-AZ",
      cost: 160,
      aiRecommended: true,
    },
    {
      name: "Application Servers",
      size: "Medium",
      description: "ECS Fargate with auto-scaling (3-6 tasks)",
      cost: 180,
      aiRecommended: true,
    },
    {
      name: "Redis Cache",
      size: "Small",
      description: "In-memory caching layer",
      cost: 15,
      aiRecommended: true,
    },
    {
      name: "Application Load Balancer",
      size: "Standard",
      description: "Internet-facing with SSL",
      cost: 23,
      aiRecommended: true,
    },
    {
      name: "CloudFront CDN",
      size: "Standard",
      description: "Global content delivery",
      cost: 50,
      aiRecommended: true,
    },
    {
      name: "Razorpay Integration",
      size: "Standard",
      description: "Pre-approved payment gateway",
      cost: 0,
      aiRecommended: true,
    },
  ]

  const totalCost = components.reduce((sum, c) => sum + c.cost, 0)

  return (
    <div className="p-8">
      {/* Back Navigation */}
      <Link href="/create/step-2">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Analysis
        </Button>
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Configuration Review</h1>
        <p className="mt-1 text-sm text-gray-600">Step 3 of 4 • Review AI-generated configuration</p>
      </div>

      <div className="mx-auto max-w-5xl space-y-6">
        {/* Success Message */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">Analysis Complete</p>
                <p className="text-xs text-green-700">
                  AI has auto-selected optimal resource sizes based on your environment type
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Components List */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <p className="text-sm font-semibold text-gray-900">Component</p>
                <div className="flex items-center gap-8">
                  <p className="text-sm font-semibold text-gray-900">Size</p>
                  <p className="text-sm font-semibold text-gray-900 w-20 text-right">Cost/mo</p>
                </div>
              </div>

              {components.map((component, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">{component.name}</p>
                      {component.aiRecommended && (
                        <Badge variant="outline" className="text-xs">AI</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5">{component.description}</p>
                  </div>
                  <div className="flex items-center gap-8 flex-shrink-0">
                    <Badge variant="outline" className="text-xs">
                      {component.size}
                    </Badge>
                    <p className="text-sm font-semibold text-gray-900 w-20 text-right">
                      ₹{component.cost}
                    </p>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="flex items-center justify-between pt-3 border-t-2">
                <p className="text-sm font-semibold text-gray-900">Total Monthly Cost</p>
                <p className="text-xl font-bold text-gray-900">₹{totalCost}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Options (Collapsed by Default) */}
        <Card>
          <CardContent className="p-4">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex w-full items-center justify-between text-left"
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">Advanced Configuration</p>
                <p className="text-xs text-gray-600">
                  Adjust sizing if needed (for power users only)
                </p>
              </div>
              {showAdvanced ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </button>

            {showAdvanced && (
              <div className="mt-4 space-y-6 border-t pt-4">
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="p-3">
                    <p className="text-xs font-medium text-yellow-800">
                      Warning: Advanced Configuration
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      AI has already selected optimal configurations. Only change if you have specific requirements.
                    </p>
                  </CardContent>
                </Card>

                {/* Database Sizing */}
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    PostgreSQL Database Sizing
                  </p>
                  <div className="space-y-2">
                    {[
                      {
                        size: "Small",
                        desc: "Dev/Test, <100 users",
                        cost: 80,
                        value: "small",
                      },
                      {
                        size: "Medium",
                        desc: "UAT/Staging, 100-1K users",
                        cost: 160,
                        value: "medium",
                        recommended: true,
                      },
                      {
                        size: "Large",
                        desc: "Production, 1K-10K users",
                        cost: 320,
                        value: "large",
                      },
                      {
                        size: "X-Large",
                        desc: "High-scale production",
                        cost: 640,
                        value: "xlarge",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors text-sm ${
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
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">{option.desc}</p>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          ₹{option.cost}/mo
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Application Sizing */}
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    Application Server Sizing
                  </p>
                  <div className="space-y-2">
                    {[
                      {
                        size: "Small",
                        desc: "1-2 instances, dev/test",
                        cost: 60,
                        value: "small",
                      },
                      {
                        size: "Medium",
                        desc: "3-6 instances, auto-scaling",
                        cost: 180,
                        value: "medium",
                        recommended: true,
                      },
                      {
                        size: "Large",
                        desc: "6-12 instances, auto-scaling",
                        cost: 360,
                        value: "large",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors text-sm ${
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
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">{option.desc}</p>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          ₹{option.cost}/mo
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

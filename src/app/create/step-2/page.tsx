"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle, Loader2, ArrowLeft } from "lucide-react"
import type { AIThinkingStep } from "@/types"

const thinkingSteps: AIThinkingStep[] = [
  {
    step: 1,
    title: "VPC Allocation",
    description: "Allocating network ranges",
    status: "pending",
    output: {
      environment: "Production",
      vpcRange: "10.100.0.0/16",
      subnets: "8 subnets across 2 AZs",
    },
  },
  {
    step: 2,
    title: "Network Connections",
    description: "Detecting data flows",
    status: "pending",
    output: {
      connectionsDetected: 8,
      summary: "App, DB, Cache, External APIs",
    },
  },
  {
    step: 3,
    title: "Resource Sizing",
    description: "Determining component sizes",
    status: "pending",
    output: {
      environment: "Production",
      tier: "Medium tier (auto-scaling)",
      components: 7,
    },
  },
  {
    step: 4,
    title: "Database Detection",
    description: "Identifying data stores",
    status: "pending",
    output: {
      databases: "PostgreSQL 15.3",
      storage: "S3 Standard",
    },
  },
  {
    step: 5,
    title: "Compute Resources",
    description: "Analyzing application requirements",
    status: "pending",
    output: {
      technology: "Java Spring Boot",
      platform: "ECS Fargate (3-6 tasks)",
    },
  },
  {
    step: 6,
    title: "IAM & Security",
    description: "Configuring permissions",
    status: "pending",
    output: {
      roles: 2,
      permissions: "Secrets, Logs, Network",
    },
  },
]

export default function Step2Page() {
  const router = useRouter()
  const [steps, setSteps] = useState<AIThinkingStep[]>(thinkingSteps)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  useEffect(() => {
    // Simulate AI thinking process
    const stepDurations = [5000, 8000, 10000, 5000, 5000, 5000] // Total ~38 seconds

    let timeout: NodeJS.Timeout

    if (currentStepIndex < steps.length) {
      // Mark current step as in_progress
      setSteps((prev) =>
        prev.map((step, idx) =>
          idx === currentStepIndex
            ? { ...step, status: "in_progress" as const }
            : step
        )
      )

      // After duration, mark as completed and move to next
      timeout = setTimeout(() => {
        setSteps((prev) =>
          prev.map((step, idx) =>
            idx === currentStepIndex
              ? { ...step, status: "completed" as const }
              : step
          )
        )
        setCurrentStepIndex((prev) => prev + 1)
      }, stepDurations[currentStepIndex])
    } else {
      // All steps completed, navigate to next page
      timeout = setTimeout(() => {
        router.push("/create/step-3")
      }, 2000)
    }

    return () => clearTimeout(timeout)
  }, [currentStepIndex, router, steps.length])

  return (
    <div className="p-8">
      {/* Back Navigation */}
      <Link href="/create/step-1">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Upload
        </Button>
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Analyzing Architecture</h1>
        <p className="mt-1 text-sm text-gray-600">Step 2 of 4 • AI analyzing your diagram</p>
      </div>

      <div className="mx-auto max-w-4xl space-y-6">
        {/* Analysis Progress */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-base">Analysis Progress</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.step} className="flex items-start gap-4">
                  {/* Status Icon */}
                  <div className="mt-0.5 flex-shrink-0">
                    {step.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : step.status === "in_progress" ? (
                      <Loader2 className="h-5 w-5 animate-spin text-maruti-blue" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900">
                        Step {step.step}: {step.title}
                      </p>
                      {step.status === "completed" && (
                        <span className="text-xs text-gray-500">Complete</span>
                      )}
                      {step.status === "in_progress" && (
                        <span className="text-xs text-maruti-blue">Processing...</span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-gray-600">{step.description}</p>

                    {/* Output (shown when completed or in progress) */}
                    {(step.status === "completed" || step.status === "in_progress") &&
                      step.output && (
                        <div className="mt-2 rounded-lg bg-gray-50 p-3 text-xs space-y-1">
                          {step.step === 1 && (
                            <>
                              <p>
                                <span className="font-medium">Environment:</span>{" "}
                                {step.output.environment} → {step.output.vpcRange}
                              </p>
                              <p>
                                <span className="font-medium">Subnets:</span>{" "}
                                {step.output.subnets}
                              </p>
                            </>
                          )}

                          {step.step === 2 && (
                            <>
                              <p>
                                <span className="font-medium">Connections:</span>{" "}
                                {step.output.connectionsDetected} detected
                              </p>
                              <p>
                                <span className="font-medium">Types:</span> {step.output.summary}
                              </p>
                            </>
                          )}

                          {step.step === 3 && (
                            <>
                              <p>
                                <span className="font-medium">Environment:</span>{" "}
                                {step.output.environment}
                              </p>
                              <p>
                                <span className="font-medium">Sizing:</span> {step.output.tier}
                              </p>
                              <p>
                                <span className="font-medium">Components:</span>{" "}
                                {step.output.components} configured
                              </p>
                            </>
                          )}

                          {step.step === 4 && (
                            <>
                              <p>
                                <span className="font-medium">Database:</span>{" "}
                                {step.output.databases}
                              </p>
                              <p>
                                <span className="font-medium">Storage:</span>{" "}
                                {step.output.storage}
                              </p>
                            </>
                          )}

                          {step.step === 5 && (
                            <>
                              <p>
                                <span className="font-medium">Technology:</span>{" "}
                                {step.output.technology}
                              </p>
                              <p>
                                <span className="font-medium">Platform:</span>{" "}
                                {step.output.platform}
                              </p>
                            </>
                          )}

                          {step.step === 6 && (
                            <>
                              <p>
                                <span className="font-medium">IAM Roles:</span> {step.output.roles}{" "}
                                created
                              </p>
                              <p>
                                <span className="font-medium">Permissions:</span>{" "}
                                {step.output.permissions}
                              </p>
                            </>
                          )}
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        {currentStepIndex < steps.length ? (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <p className="text-sm text-blue-900">
                Processing step {currentStepIndex + 1} of {steps.length}...
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <p className="text-sm font-medium text-green-900">
                  Analysis complete! Redirecting to configuration...
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

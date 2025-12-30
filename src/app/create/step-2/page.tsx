"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle, Loader2, ImageIcon } from "lucide-react"
import type { AIThinkingStep } from "@/types"

const thinkingSteps: AIThinkingStep[] = [
  {
    step: 1,
    title: "Determining IP Distribution",
    description: "Analyzing environment type and allocating VPC ranges",
    status: "pending",
    output: {
      environment: "Production",
      vpcRange: "10.100.0.0/16",
      subnets: {
        public: "10.100.1.x",
        private: "10.100.2.x",
        database: "10.100.3.x",
        cache: "10.100.4.x",
      },
    },
  },
  {
    step: 2,
    title: "Identifying Network Connections",
    description: "Detecting connections and data flows",
    status: "pending",
    output: {
      connectionsDetected: 8,
      connections: [
        "Internet → CloudFront → Load Balancer",
        "Load Balancer → Application Servers (3 instances)",
        "Application → PostgreSQL Database",
        "Application → Redis Cache",
        "Application → SQS Queue",
        "Application → Razorpay API (External)",
        "Razorpay Webhooks → Load Balancer",
      ],
    },
  },
  {
    step: 3,
    title: "Deciding Adequate Resources",
    description: "Analyzing environment type and component requirements",
    status: "pending",
    output: {
      environment: "Production",
      tier: "Medium tier resources",
      recommendations: [
        "Application: ECS Fargate (3-6 tasks, auto-scaling)",
        "Database: Production-grade, Multi-AZ",
        "Cache: Production-grade Redis",
      ],
    },
  },
  {
    step: 4,
    title: "Identifying Databases & Storage",
    description: "Detecting database requirements",
    status: "pending",
    output: {
      databases: ["PostgreSQL 15.3"],
      storage: ["S3 for static assets"],
    },
  },
  {
    step: 5,
    title: "Detecting Application Servers",
    description: "Identifying compute requirements",
    status: "pending",
    output: {
      technology: "Java Spring Boot",
      containerCount: 3,
      platform: "ECS Fargate",
    },
  },
  {
    step: 6,
    title: "Determining IAM Roles & Permissions",
    description: "Identifying required permissions",
    status: "pending",
    output: {
      roles: ["ECS Task Execution Role", "ECS Task Role"],
      permissions: ["Secrets Manager Read", "CloudWatch Logs Write"],
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-maruti-black">
          ANALYZING ARCHITECTURE
        </h1>
        <p className="mt-2 text-gray-600">Step 2 of 4</p>
      </div>

      <div className="mx-auto max-w-5xl space-y-6">
        {/* Diagram Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-maruti-blue" />
              AI Agent Thinking...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12">
              <div className="text-center">
                <ImageIcon className="mx-auto h-24 w-24 text-gray-400" />
                <p className="mt-4 text-sm text-gray-500">
                  Architecture Diagram Preview
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Analysis Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {steps.map((step) => (
              <div key={step.step}>
                <div className="flex items-start gap-4">
                  {/* Status Icon */}
                  <div className="mt-1">
                    {step.status === "completed" ? (
                      <CheckCircle2 className="h-6 w-6 text-status-success" />
                    ) : step.status === "in_progress" ? (
                      <Loader2 className="h-6 w-6 animate-spin text-maruti-blue" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-300" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-maruti-black">
                        {step.status === "completed" ? "✅" : step.status === "in_progress" ? "🔄" : "⏸️ "}{" "}
                        Step {step.step}: {step.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {step.description}
                    </p>

                    {/* Output (shown when completed or in progress) */}
                    {(step.status === "completed" ||
                      step.status === "in_progress") &&
                      step.output && (
                        <div className="mt-3 rounded-lg bg-gray-50 p-4 text-sm">
                          {step.step === 1 && (
                            <div className="space-y-1">
                              <p>
                                Environment: {step.output.environment} → VPC
                                Range {step.output.vpcRange}
                              </p>
                              <p className="font-medium">
                                Next Available: {step.output.vpcRange} →
                                Allocated
                              </p>
                              <p className="mt-2 font-medium">
                                Subnet Strategy: Maruti Standard Layout
                              </p>
                              <ul className="ml-4 mt-1 space-y-1">
                                <li>
                                  • {step.output.subnets.public}: Public (Load
                                  Balancers)
                                </li>
                                <li>
                                  • {step.output.subnets.private}: Private
                                  (Application Servers)
                                </li>
                                <li>
                                  • {step.output.subnets.database}: Database
                                  Tier
                                </li>
                                <li>
                                  • {step.output.subnets.cache}: Cache Tier
                                </li>
                              </ul>
                            </div>
                          )}

                          {step.step === 2 && (
                            <div className="space-y-1">
                              <p className="font-medium">
                                Detected {step.output.connectionsDetected}{" "}
                                connections:
                              </p>
                              <ul className="ml-4 mt-2 space-y-1">
                                {step.output.connections.map(
                                  (conn: string, idx: number) => (
                                    <li key={idx}>• {conn}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                          {step.step === 3 && (
                            <div className="space-y-1">
                              <p>
                                Environment: {step.output.environment} → High availability required
                              </p>
                              <p className="mt-2 font-medium">
                                Recommendation: {step.output.tier}
                              </p>
                              <ul className="ml-4 mt-1 space-y-1">
                                {step.output.recommendations.map(
                                  (rec: string, idx: number) => (
                                    <li key={idx}>• {rec}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                          {step.step === 4 && (
                            <div className="space-y-1">
                              <p className="font-medium">Databases detected:</p>
                              <ul className="ml-4 space-y-1">
                                {step.output.databases.map(
                                  (db: string, idx: number) => (
                                    <li key={idx}>• {db}</li>
                                  )
                                )}
                              </ul>
                              <p className="mt-2 font-medium">Storage:</p>
                              <ul className="ml-4 space-y-1">
                                {step.output.storage.map(
                                  (s: string, idx: number) => (
                                    <li key={idx}>• {s}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                          {step.step === 5 && (
                            <div className="space-y-1">
                              <p>Technology: {step.output.technology}</p>
                              <p>
                                Containers: {step.output.containerCount}{" "}
                                instances
                              </p>
                              <p>Platform: {step.output.platform}</p>
                            </div>
                          )}

                          {step.step === 6 && (
                            <div className="space-y-1">
                              <p className="font-medium">IAM Roles:</p>
                              <ul className="ml-4 space-y-1">
                                {step.output.roles.map(
                                  (role: string, idx: number) => (
                                    <li key={idx}>• {role}</li>
                                  )
                                )}
                              </ul>
                              <p className="mt-2 font-medium">Permissions:</p>
                              <ul className="ml-4 space-y-1">
                                {step.output.permissions.map(
                                  (perm: string, idx: number) => (
                                    <li key={idx}>• {perm}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="text-center text-sm text-gray-500">
          {currentStepIndex < steps.length ? (
            <p>
              Processing step {currentStepIndex + 1} of {steps.length}...
            </p>
          ) : (
            <p className="font-medium text-status-success">
              ✓ Analysis complete! Redirecting to configuration...
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

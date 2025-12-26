"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle2, Eye, BookOpen, Map, DollarSign, Shield, Network, Lock, Server } from "lucide-react"
import { AIThinkingStep } from "@/types"

const thinkingSteps: AIThinkingStep[] = [
  {
    step: 1,
    title: "Vision LLM Extracting Components",
    description: "Analyzing architecture diagram to identify all components and services",
    status: "pending",
    output: ["Application Server (Spring Boot)", "PostgreSQL Database", "Redis Cache", "Load Balancer", "S3 Storage"],
  },
  {
    step: 2,
    title: "Referring to Stored Knowledge",
    description: "Searching similar architectures and best practices from knowledge base",
    status: "pending",
    output: ["Found 3 similar architectures", "Matched: Full-stack web application pattern", "Compliance: AWS Well-Architected"],
  },
  {
    step: 3,
    title: "Mapping to AWS Services",
    description: "Converting components to specific AWS services",
    status: "pending",
    output: ["ECS Fargate → Application Server", "RDS PostgreSQL → Database", "ElastiCache → Redis", "ALB → Load Balancer"],
  },
  {
    step: 4,
    title: "Calculating Resource Sizing",
    description: "Determining optimal instance types and sizes based on requirements",
    status: "pending",
    output: ["ECS: m6g.large (4Core, 16GB)", "RDS: db.t4g.medium", "ElastiCache: cache.t4g.small", "Estimated capacity: 700 req/min"],
  },
  {
    step: 5,
    title: "Generating Firewall Rules",
    description: "Extracting network connections and creating firewall rules",
    status: "pending",
    output: ["5 firewall rules identified", "ALB → ECS: Port 8080", "ECS → RDS: Port 5432", "ECS → ElastiCache: Port 6379"],
  },
  {
    step: 6,
    title: "Looking Up Integration Endpoints",
    description: "Identifying external integrations from integration catalog",
    status: "pending",
    output: ["Payment Gateway: Razorpay (203.45.67.89:443)", "SMS Provider: Twilio", "Email: SendGrid"],
  },
  {
    step: 7,
    title: "Determining Access Requirements",
    description: "Generating AD groups and user access requirements",
    status: "pending",
    output: ["AD Group: SG-ProjectAlpha-Developers", "AD Group: SG-ProjectAlpha-Admins", "VPN Access: 5 users"],
  },
  {
    step: 8,
    title: "Adding Standard DevOps Stack",
    description: "Including required DevOps and monitoring tools",
    status: "pending",
    output: ["Jenkins (CI/CD)", "Terraform (IaC)", "ELK (Logging)", "Airflow (Orchestration)", "Prifunl VPN"],
  },
  {
    step: 9,
    title: "Generating Service Requests",
    description: "Creating comprehensive service requests across all categories",
    status: "pending",
    output: ["Infrastructure: 6 SRs", "Network & Security: 5 SRs", "Access & Identity: 3 SRs", "Integration: 2 SRs", "Total: 16 SRs"],
  },
]

const stepIcons = [
  Eye,
  BookOpen,
  Map,
  DollarSign,
  Shield,
  Network,
  Lock,
  Server,
  CheckCircle2,
]

export default function AIAnalysisPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<AIThinkingStep[]>(thinkingSteps)

  useEffect(() => {
    if (currentStep < steps.length) {
      // Mark current step as in progress
      const timer1 = setTimeout(() => {
        setSteps(prev =>
          prev.map((step, idx) =>
            idx === currentStep ? { ...step, status: "in_progress" } : step
          )
        )
      }, 100)

      // Mark current step as completed and move to next
      const timer2 = setTimeout(() => {
        setSteps(prev =>
          prev.map((step, idx) =>
            idx === currentStep ? { ...step, status: "completed" } : step
          )
        )
        setCurrentStep(currentStep + 1)
      }, 3000 + Math.random() * 2000) // Random time between 3-5 seconds per step

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    } else {
      // All steps completed, redirect to review page
      const timer = setTimeout(() => {
        router.push("/review-service-requests")
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentStep, router, steps.length])

  const completedSteps = steps.filter(s => s.status === "completed").length

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-maruti-black">AI Analysis in Progress</h1>
        <p className="mt-2 text-gray-600">
          Our AI is analyzing your architecture diagram. This typically takes 45-60 seconds.
        </p>
      </div>

      {/* Progress Bar */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Progress: {completedSteps} of {steps.length} steps completed
            </span>
            <span className="text-sm font-medium text-maruti-blue">
              {Math.round((completedSteps / steps.length) * 100)}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-maruti-blue transition-all duration-500"
              style={{ width: `${(completedSteps / steps.length) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Split View: Thinking + Output */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Thinking Steps */}
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-6 text-xl font-bold text-maruti-black">AI Thinking Process</h2>
            <div className="space-y-4">
              {steps.map((step, idx) => {
                const Icon = stepIcons[idx]
                return (
                  <div
                    key={step.step}
                    className={`flex gap-4 rounded-lg border p-4 transition-all ${
                      step.status === "in_progress"
                        ? "border-maruti-blue bg-maruti-blue/5"
                        : step.status === "completed"
                        ? "border-status-success/30 bg-status-success/5"
                        : "border-gray-200 bg-gray-50/50"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {step.status === "in_progress" ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-maruti-blue text-white">
                          <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                      ) : step.status === "completed" ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-status-success text-white">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-400">
                          <Icon className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500">
                          Step {step.step}
                        </span>
                        {step.status === "in_progress" && (
                          <Badge variant="info" className="text-xs">Processing</Badge>
                        )}
                        {step.status === "completed" && (
                          <Badge variant="success" className="text-xs">Completed</Badge>
                        )}
                      </div>
                      <h3 className="mt-1 font-semibold text-maruti-black">{step.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Right: Output */}
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-6 text-xl font-bold text-maruti-black">Analysis Output</h2>
            <div className="space-y-6">
              {steps
                .filter(step => step.status === "completed")
                .map((step) => (
                  <div key={step.step} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-status-success" />
                      <h3 className="font-semibold text-maruti-black">{step.title}</h3>
                    </div>
                    <ul className="ml-6 space-y-1">
                      {step.output?.map((item: string, idx: number) => (
                        <li key={idx} className="text-sm text-gray-600">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              {steps.some(s => s.status === "in_progress") && (
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Analyzing...</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Completion Message */}
      {currentStep >= steps.length && (
        <Card className="mt-6 border-status-success/30 bg-status-success/5">
          <CardContent className="flex items-center gap-4 p-6">
            <CheckCircle2 className="h-8 w-8 text-status-success" />
            <div>
              <h3 className="font-semibold text-maruti-black">Analysis Complete!</h3>
              <p className="text-sm text-gray-600">
                Redirecting you to review the generated service requests...
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

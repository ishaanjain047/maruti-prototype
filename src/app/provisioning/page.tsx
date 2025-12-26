"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Loader2, Clock, AlertCircle } from "lucide-react"

const provisioningSteps = [
  { category: "Infrastructure", total: 6, completed: 0 },
  { category: "Network & Security", total: 5, completed: 0 },
  { category: "Access & Identity", total: 3, completed: 0 },
  { category: "Integrations", total: 2, completed: 0 },
]

export default function ProvisioningPage() {
  const router = useRouter()
  const [steps, setSteps] = useState(provisioningSteps)
  const [overallProgress, setOverallProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Simulate provisioning progress
    const interval = setInterval(() => {
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps]
        let updated = false

        for (let i = 0; i < newSteps.length; i++) {
          if (newSteps[i].completed < newSteps[i].total) {
            newSteps[i].completed++
            updated = true
            break
          }
        }

        if (!updated) {
          clearInterval(interval)
          setIsComplete(true)
        }

        return newSteps
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const totalTasks = steps.reduce((sum, step) => sum + step.total, 0)
    const completedTasks = steps.reduce((sum, step) => sum + step.completed, 0)
    setOverallProgress(Math.round((completedTasks / totalTasks) * 100))
  }, [steps])

  const totalTasks = steps.reduce((sum, step) => sum + step.total, 0)
  const completedTasks = steps.reduce((sum, step) => sum + step.completed, 0)
  const eta = Math.max(0, Math.ceil((totalTasks - completedTasks) * 1.5))

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-maruti-black">Provisioning Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Your infrastructure is being provisioned. This typically takes 15-20 minutes.
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="mb-8 border-2 border-maruti-blue/20 bg-gradient-to-br from-maruti-blue/5 to-maruti-nexa/5">
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-600">Overall Progress</div>
              <div className="mt-1 text-4xl font-bold text-maruti-blue">{overallProgress}%</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-600">ETA</div>
              <div className="mt-1 flex items-center gap-2 text-2xl font-bold text-maruti-black">
                <Clock className="h-6 w-6" />
                {eta} mins
              </div>
            </div>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-maruti-blue transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>{completedTasks} of {totalTasks} tasks completed</span>
            <span>Live updates every 5 seconds</span>
          </div>
        </CardContent>
      </Card>

      {/* Progress by Category */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Progress by Category</CardTitle>
          <CardDescription>Detailed breakdown of provisioning tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {steps.map((step, idx) => {
              const progress = Math.round((step.completed / step.total) * 100)
              const isInProgress = step.completed > 0 && step.completed < step.total
              const isCompleted = step.completed === step.total

              return (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-status-success" />
                      ) : isInProgress ? (
                        <Loader2 className="h-5 w-5 animate-spin text-maruti-blue" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="font-semibold text-maruti-black">{step.category}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        {step.completed}/{step.total}
                      </span>
                      <Badge
                        variant={
                          isCompleted ? "success" : isInProgress ? "info" : "default"
                        }
                        className="w-16"
                      >
                        {progress}%
                      </Badge>
                    </div>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isCompleted
                          ? "bg-status-success"
                          : isInProgress
                          ? "bg-maruti-blue"
                          : "bg-gray-300"
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Completion Message */}
      {isComplete && (
        <Card className="border-2 border-status-success/30 bg-status-success/5">
          <CardContent className="flex items-start gap-4 p-6">
            <CheckCircle2 className="h-8 w-8 flex-shrink-0 text-status-success" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-maruti-black">Provisioning Complete!</h3>
              <p className="mt-2 text-gray-600">
                Your environment has been successfully provisioned and is now active.
                All {totalTasks} tasks completed successfully.
              </p>
              <div className="mt-4 flex gap-3">
                <Button
                  onClick={() => router.push("/environments")}
                  className="bg-maruti-blue hover:bg-maruti-blue/90"
                >
                  View Environment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/")}
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity Log */}
      {!isComplete && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Live provisioning logs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 font-mono text-sm">
              {steps.map((step, idx) => {
                if (step.completed > 0) {
                  return (
                    <div key={idx} className="flex items-start gap-3 text-gray-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-status-success" />
                      <span>
                        [{new Date().toLocaleTimeString()}] {step.category}: {step.completed}/{step.total} tasks completed
                      </span>
                    </div>
                  )
                }
                return null
              })}
              <div className="flex items-start gap-3 text-gray-600">
                <Loader2 className="mt-0.5 h-4 w-4 flex-shrink-0 animate-spin text-maruti-blue" />
                <span>
                  [{new Date().toLocaleTimeString()}] Provisioning in progress...
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

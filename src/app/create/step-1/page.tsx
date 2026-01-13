"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileImage, ArrowLeft, ArrowRight } from "lucide-react"
import type { Step1FormData } from "@/types"

export default function Step1Page() {
  const router = useRouter()
  const [formData, setFormData] = useState<Step1FormData>({
    projectName: "",
    environmentType: "prod",
    expectedRequests: "",
    expectedUsers: "",
    comments: "",
  })
  const [fileName, setFileName] = useState<string>("")
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (file: File | null) => {
    if (file) {
      setFormData({ ...formData, diagram: file })
      setFileName(file.name)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store form data in sessionStorage for next step
    sessionStorage.setItem("step1Data", JSON.stringify(formData))
    router.push("/create/step-2")
  }

  const isFormValid =
    formData.projectName &&
    formData.environmentType &&
    formData.expectedRequests &&
    formData.expectedUsers &&
    formData.diagram

  const getVPCRange = (envType: string) => {
    switch (envType) {
      case "dev":
        return "10.200-249.x"
      case "qa":
      case "uat":
        return "10.150-199.x"
      case "prod":
        return "10.100-149.x"
      default:
        return "10.250-255.x"
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="mb-2 inline-flex items-center text-sm text-gray-600 hover:text-maruti-blue"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-maruti-black">
            CREATE NEW ENVIRONMENT
          </h1>
          <p className="mt-2 text-gray-600">Step 1 of 4</p>
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Enterprise Architecture Diagram</CardTitle>
              <CardDescription>
                Upload your EA diagram for AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
                  dragActive
                    ? "border-maruti-blue bg-maruti-blue/5"
                    : "border-gray-300 hover:border-maruti-blue"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="diagram"
                  accept=".png,.jpg,.jpeg,.pdf,.vsd,.vsdx"
                  className="hidden"
                  onChange={(e) =>
                    handleFileChange(e.target.files?.[0] || null)
                  }
                />
                <label htmlFor="diagram" className="cursor-pointer">
                  {fileName ? (
                    <div className="space-y-2">
                      <FileImage className="mx-auto h-16 w-16 text-maruti-blue" />
                      <p className="text-lg font-medium text-maruti-black">
                        {fileName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Click to change file
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="mx-auto h-16 w-16 text-gray-400" />
                      <p className="text-lg font-medium text-gray-700">
                        Drag & Drop EA Diagram Here
                      </p>
                      <p className="text-sm text-gray-500">
                        or click to browse
                      </p>
                      <p className="text-xs text-gray-400">
                        Supported formats: PNG, JPG, PDF, Visio • Max size: 10
                        MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Environment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Environment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Project Name */}
              <div className="space-y-2">
                <Label htmlFor="projectName">
                  Project Name <span className="text-maruti-red">*</span>
                </Label>
                <Input
                  id="projectName"
                  placeholder="e.g., ecommerce"
                  value={formData.projectName}
                  onChange={(e) =>
                    setFormData({ ...formData, projectName: e.target.value })
                  }
                  required
                />
              </div>

              {/* Environment Type */}
              <div className="space-y-3">
                <Label>
                  Environment Type <span className="text-maruti-red">*</span>
                </Label>
                <div className="space-y-2">
                  {[
                    { value: "dev", label: "Development", range: "10.200-249.x" },
                    { value: "qa", label: "QA/UAT", range: "10.150-199.x" },
                    { value: "prod", label: "Production", range: "10.100-149.x" },
                    { value: "sandbox", label: "Sandbox", range: "10.250-255.x" },
                  ].map((env) => (
                    <label
                      key={env.value}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3 transition-colors ${
                        formData.environmentType === env.value
                          ? "border-maruti-blue bg-maruti-blue/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="environmentType"
                        value={env.value}
                        checked={formData.environmentType === env.value}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            environmentType: e.target.value as any,
                          })
                        }
                        className="h-4 w-4 text-maruti-blue"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-maruti-black">
                          {env.label}
                        </div>
                        <div className="text-sm text-gray-500">
                          VPC Range: {env.range}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Expected Traffic */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="expectedRequests">
                    Requests/Day <span className="text-maruti-red">*</span>
                  </Label>
                  <Input
                    id="expectedRequests"
                    type="number"
                    placeholder="e.g., 10000"
                    value={formData.expectedRequests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expectedRequests: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedUsers">
                    Concurrent Users <span className="text-maruti-red">*</span>
                  </Label>
                  <Input
                    id="expectedUsers"
                    type="number"
                    placeholder="e.g., 500"
                    value={formData.expectedUsers}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expectedUsers: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              {/* Additional Comments */}
              <div className="space-y-2">
                <Label htmlFor="comments">Additional Comments (Optional)</Label>
                <Textarea
                  id="comments"
                  placeholder="e.g., Payment gateway integration with Razorpay required"
                  rows={4}
                  value={formData.comments}
                  onChange={(e) =>
                    setFormData({ ...formData, comments: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Link href="/" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="flex-1 bg-maruti-blue hover:bg-maruti-blue/90"
              disabled={!isFormValid}
            >
              Analyze Diagram
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

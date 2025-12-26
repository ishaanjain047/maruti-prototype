"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, Loader2 } from "lucide-react"

export default function UploadArchitecturePage() {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    projectName: "",
    environmentType: "",
    file: null as File | null,
    comments: "",
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload and processing
    setTimeout(() => {
      router.push("/ai-analysis")
    }, 1500)
  }

  const isFormValid = formData.projectName && formData.environmentType && formData.file

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-maruti-black">Upload Architecture Diagram</h1>
        <p className="mt-2 text-gray-600">
          Upload your architecture diagram and AI will analyze it to generate a complete infrastructure BOM
        </p>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Architecture Details</CardTitle>
            <CardDescription>
              Provide information about your architecture and upload the diagram
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Name */}
              <div className="space-y-2">
                <Label htmlFor="projectName">
                  Project Name <span className="text-maruti-red">*</span>
                </Label>
                <Input
                  id="projectName"
                  placeholder="e.g., Project Alpha"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  required
                />
              </div>

              {/* Environment Type */}
              <div className="space-y-2">
                <Label htmlFor="environmentType">
                  Environment Type <span className="text-maruti-red">*</span>
                </Label>
                <Select
                  value={formData.environmentType}
                  onValueChange={(value) => setFormData({ ...formData, environmentType: value })}
                >
                  <SelectTrigger id="environmentType">
                    <SelectValue placeholder="Select environment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dev">Development</SelectItem>
                    <SelectItem value="qa">QA</SelectItem>
                    <SelectItem value="uat">UAT</SelectItem>
                    <SelectItem value="prod">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="file">
                  Architecture Diagram <span className="text-maruti-red">*</span>
                </Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                  {formData.file && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText className="h-4 w-4" />
                      {formData.file.name}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Supported formats: PDF, PNG, JPG (Max 10MB)
                </p>
              </div>

              {/* Additional Comments */}
              <div className="space-y-2">
                <Label htmlFor="comments">Additional Comments (Optional)</Label>
                <Textarea
                  id="comments"
                  placeholder="Any specific requirements or notes about your architecture..."
                  rows={4}
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-maruti-blue hover:bg-maruti-blue/90"
                  disabled={!isFormValid || isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Analyze Architecture
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/")}
                  disabled={isUploading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 border-maruti-nexa/20 bg-maruti-nexa/5">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-maruti-black">What happens next?</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-maruti-nexa">•</span>
                <span>AI will analyze your architecture diagram using computer vision</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-maruti-nexa">•</span>
                <span>Extract all components, connections, and integration requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-maruti-nexa">•</span>
                <span>Generate service requests for infrastructure, network, security, and access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-maruti-nexa">•</span>
                <span>Create a comprehensive BOM with cost estimates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-maruti-nexa">•</span>
                <span>Process typically takes 45-60 seconds</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

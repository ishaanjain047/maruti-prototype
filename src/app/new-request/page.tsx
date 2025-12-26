"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, MessageSquare, FileEdit } from "lucide-react"

export default function NewRequestPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-maruti-black">Create New Request</h1>
        <p className="mt-2 text-gray-600">
          Choose how you want to create your infrastructure request
        </p>
      </div>

      {/* Request Methods */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Upload Architecture */}
        <Link href="/upload-architecture">
          <Card className="h-full cursor-pointer border-2 transition-all hover:border-maruti-blue hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-maruti-blue/10 text-maruti-blue">
                <Upload className="h-8 w-8" />
              </div>
              <CardTitle>Upload Architecture</CardTitle>
              <CardDescription>
                Upload your architecture diagram and let AI generate complete infrastructure BOM
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• AI-powered analysis</li>
                <li>• Complete infrastructure BOM</li>
                <li>• Network & security requirements</li>
                <li>• Fastest method (45-60 seconds)</li>
              </ul>
              <Button className="mt-6 w-full bg-maruti-blue hover:bg-maruti-blue/90">
                Get Started
              </Button>
            </CardContent>
          </Card>
        </Link>

        {/* AI Assistant */}
        <Card className="h-full border-2 transition-all hover:border-maruti-nexa hover:shadow-lg">
          <CardHeader>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-maruti-nexa/10 text-maruti-nexa">
              <MessageSquare className="h-8 w-8" />
            </div>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>
              Chat with AI to describe your requirements and generate service requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Conversational interface</li>
              <li>• AI asks clarifying questions</li>
              <li>• Natural language input</li>
              <li>• Guided experience</li>
            </ul>
            <Button className="mt-6 w-full" variant="outline">
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        {/* Manual Forms */}
        <Card className="h-full border-2 transition-all hover:border-maruti-black hover:shadow-lg">
          <CardHeader>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-maruti-black">
              <FileEdit className="h-8 w-8" />
            </div>
            <CardTitle>Manual Forms</CardTitle>
            <CardDescription>
              Fill out traditional forms for specific service request types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• IP Whitelisting</li>
              <li>• Firewall Rules</li>
              <li>• User Access</li>
              <li>• DNS/SSL certificates</li>
            </ul>
            <Button className="mt-6 w-full" variant="outline">
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Info Section */}
      <Card className="mt-8 border-maruti-nexa/20 bg-maruti-nexa/5">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-maruti-black">Recommended: Upload Architecture</h3>
          <p className="mt-2 text-sm text-gray-600">
            For the best experience and fastest results, we recommend uploading your architecture diagram.
            Our AI will analyze it and generate a complete infrastructure BOM including all network, security,
            and access requirements - eliminating the need for incremental service requests during development.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

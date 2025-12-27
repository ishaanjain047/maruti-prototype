"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react"

export default function Step3Page() {
  const router = useRouter()
  const [config, setConfig] = useState({
    // Network
    vpcCidr: "10.100.0.0/16",
    availabilityZones: "ap-south-1a, ap-south-1b",
    environment: "Production",

    // Database
    dbEngine: "PostgreSQL 15.3",
    dbInstanceClass: "db.t4g.small",
    dbStorage: "100",
    dbMultiAZ: true,
    dbBackupRetention: "7",

    // Application
    appTechnology: "Java Spring Boot",
    appPort: "8080",
    appCpu: "512",
    appMemory: "1024",
    appMinInstances: "3",
    appMaxInstances: "6",

    // Cache
    cacheEngine: "Redis 7.0",
    cacheNodeType: "cache.t4g.micro",

    // CDN
    cdnEnabled: true,
    cdnDomain: "ecommerce.maruti.com",
    cdnSslCertificate: "auto",

    // Integrations
    integrations: ["razorpay"],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sessionStorage.setItem("step3Data", JSON.stringify(config))
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
        <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Analysis Complete!</span>
          </div>
          <p className="mt-1 text-sm text-green-700">
            AI has detected your architecture and pre-filled configurations.
            Please review and adjust if needed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Network Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>🌐 NETWORK CONFIGURATION</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>VPC CIDR</Label>
                  <Input value={config.vpcCidr} disabled />
                  <p className="text-xs text-gray-500">(Auto-allocated)</p>
                </div>
                <div className="space-y-2">
                  <Label>Environment</Label>
                  <Input value={config.environment} disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Availability Zones</Label>
                <Input value={config.availabilityZones} disabled />
              </div>
            </CardContent>
          </Card>

          {/* Database Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>💾 DATABASE CONFIGURATION</CardTitle>
              <p className="text-sm text-gray-500">(PostgreSQL Detected)</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Engine</Label>
                <Select value={config.dbEngine} onValueChange={(value) => setConfig({ ...config, dbEngine: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PostgreSQL 15.3">PostgreSQL 15.3</SelectItem>
                    <SelectItem value="PostgreSQL 14.7">PostgreSQL 14.7</SelectItem>
                    <SelectItem value="MySQL 8.0">MySQL 8.0</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Instance Class</Label>
                <div className="space-y-2">
                  {[
                    { value: "db.t4g.micro", label: "db.t4g.micro" },
                    { value: "db.t4g.small", label: "db.t4g.small (Recommended for Production)" },
                    { value: "db.t4g.medium", label: "db.t4g.medium" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 ${
                        config.dbInstanceClass === option.value
                          ? "border-maruti-blue bg-maruti-blue/5"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="dbInstanceClass"
                        value={option.value}
                        checked={config.dbInstanceClass === option.value}
                        onChange={(e) =>
                          setConfig({ ...config, dbInstanceClass: e.target.value })
                        }
                        className="h-4 w-4 text-maruti-blue"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Storage (GB)</Label>
                  <Input
                    type="number"
                    value={config.dbStorage}
                    onChange={(e) =>
                      setConfig({ ...config, dbStorage: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Backup Retention (days)</Label>
                  <Input value={config.dbBackupRetention} disabled />
                  <p className="text-xs text-gray-500">(Auto-configured)</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="success">Multi-AZ Enabled</Badge>
                <span className="text-xs text-gray-500">
                  (Auto-selected for Production)
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Application Servers */}
          <Card>
            <CardHeader>
              <CardTitle>🖥️ APPLICATION SERVERS</CardTitle>
              <p className="text-sm text-gray-500">(3 Containers Detected)</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Technology</Label>
                  <Input value={config.appTechnology} disabled />
                  <p className="text-xs text-gray-500">
                    (Detected from diagram)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Application Port</Label>
                  <Input
                    type="number"
                    value={config.appPort}
                    onChange={(e) =>
                      setConfig({ ...config, appPort: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>CPU (vCPU units)</Label>
                  <Input
                    type="number"
                    value={config.appCpu}
                    onChange={(e) =>
                      setConfig({ ...config, appCpu: e.target.value })
                    }
                  />
                  <p className="text-xs text-gray-500">512 = 0.5 vCPU</p>
                </div>
                <div className="space-y-2">
                  <Label>Memory (MB)</Label>
                  <Input
                    type="number"
                    value={config.appMemory}
                    onChange={(e) =>
                      setConfig({ ...config, appMemory: e.target.value })
                    }
                  />
                  <p className="text-xs text-gray-500">1024 = 1 GB</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Min Instances</Label>
                  <Input
                    type="number"
                    value={config.appMinInstances}
                    onChange={(e) =>
                      setConfig({ ...config, appMinInstances: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Instances</Label>
                  <Input
                    type="number"
                    value={config.appMaxInstances}
                    onChange={(e) =>
                      setConfig({ ...config, appMaxInstances: e.target.value })
                    }
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">(Auto-scaling enabled)</p>
            </CardContent>
          </Card>

          {/* Cache */}
          <Card>
            <CardHeader>
              <CardTitle>🔄 CACHE</CardTitle>
              <p className="text-sm text-gray-500">(Redis Detected)</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Engine</Label>
                  <Input value={config.cacheEngine} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Node Type</Label>
                  <Select
                    value={config.cacheNodeType}
                    onValueChange={(value) =>
                      setConfig({ ...config, cacheNodeType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cache.t4g.micro">
                        cache.t4g.micro
                      </SelectItem>
                      <SelectItem value="cache.t4g.small">
                        cache.t4g.small
                      </SelectItem>
                      <SelectItem value="cache.t4g.medium">
                        cache.t4g.medium
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CDN */}
          <Card>
            <CardHeader>
              <CardTitle>🌐 CDN & STATIC HOSTING</CardTitle>
              <p className="text-sm text-gray-500">
                (CloudFront + S3 Detected)
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="success">CloudFront Enabled</Badge>
                <Badge variant="success">S3 Bucket Created</Badge>
              </div>

              <div className="space-y-2">
                <Label>Custom Domain</Label>
                <Input
                  value={config.cdnDomain}
                  onChange={(e) =>
                    setConfig({ ...config, cdnDomain: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>SSL Certificate</Label>
                <div className="space-y-2">
                  {[
                    { value: "auto", label: "Auto-generate (AWS ACM)" },
                    { value: "existing", label: "Use existing" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex cursor-pointer items-center gap-3"
                    >
                      <input
                        type="radio"
                        name="cdnSslCertificate"
                        value={option.value}
                        checked={config.cdnSslCertificate === option.value}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            cdnSslCertificate: e.target.value,
                          })
                        }
                        className="h-4 w-4 text-maruti-blue"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* External Integrations */}
          <Card>
            <CardHeader>
              <CardTitle>🔌 EXTERNAL INTEGRATIONS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-status-success" />
                  <span className="font-medium">Razorpay Payment Gateway</span>
                </div>
                <p className="text-sm text-gray-600 ml-6">
                  Status: Pre-Approved Integration
                </p>
                <p className="text-sm text-gray-600 ml-6">
                  Firewall rules will be auto-configured
                </p>
              </div>

              <div className="space-y-2">
                <Label>Additional Integrations:</Label>
                <div className="space-y-2">
                  {[
                    { id: "twilio", label: "SMS Provider (Twilio)" },
                    { id: "sendgrid", label: "Email Provider (SendGrid)" },
                    { id: "salesforce", label: "CRM (Salesforce)" },
                  ].map((integration) => (
                    <label
                      key={integration.id}
                      className="flex cursor-pointer items-center gap-3"
                    >
                      <input
                        type="checkbox"
                        checked={config.integrations.includes(integration.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setConfig({
                              ...config,
                              integrations: [
                                ...config.integrations,
                                integration.id,
                              ],
                            })
                          } else {
                            setConfig({
                              ...config,
                              integrations: config.integrations.filter(
                                (i) => i !== integration.id
                              ),
                            })
                          }
                        }}
                        className="h-4 w-4 text-maruti-blue"
                      />
                      <span>{integration.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Summary */}
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-lg font-semibold text-maruti-black">
              Estimated Monthly Cost: ₹{estimatedCost.toFixed(2)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Link href="/create/step-2" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <Button
              type="submit"
              className="flex-1 bg-maruti-blue hover:bg-maruti-blue/90"
            >
              Generate SRs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

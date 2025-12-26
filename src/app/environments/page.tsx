"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, ExternalLink } from "lucide-react"
import { mockEnvironments } from "@/lib/mock-data"
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils"

export default function EnvironmentsPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredEnvs = mockEnvironments.filter((env) => {
    if (statusFilter !== "all" && env.status !== statusFilter) return false
    if (typeFilter !== "all" && env.type !== typeFilter) return false
    return true
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-maruti-black">All Environments</h1>
          <p className="mt-2 text-gray-600">
            Manage and monitor your infrastructure environments
          </p>
        </div>
        <Link href="/upload-architecture">
          <Button className="bg-maruti-red hover:bg-maruti-red/90">
            Create New Environment
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="flex gap-4 pt-6">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="provisioning">Provisioning</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-gray-700">Type</label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="dev">Development</SelectItem>
                <SelectItem value="qa">QA</SelectItem>
                <SelectItem value="uat">UAT</SelectItem>
                <SelectItem value="prod">Production</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={() => {
                setStatusFilter("all")
                setTypeFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-maruti-black">
              {mockEnvironments.filter(e => e.status === "active").length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-maruti-black">
              {mockEnvironments.filter(e => e.status === "provisioning").length}
            </div>
            <div className="text-sm text-gray-600">Provisioning</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-maruti-black">
              {mockEnvironments.reduce((sum, e) => sum + e.resources, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Resources</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-maruti-black">
              {formatCurrency(mockEnvironments.reduce((sum, e) => sum + e.cost, 0))}
            </div>
            <div className="text-sm text-gray-600">Total Cost/Month</div>
          </CardContent>
        </Card>
      </div>

      {/* Environments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Environments ({filteredEnvs.length})</CardTitle>
          <CardDescription>All your infrastructure environments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Project</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="p-3 text-right text-sm font-semibold text-gray-700">Resources</th>
                  <th className="p-3 text-right text-sm font-semibold text-gray-700">Cost/Month</th>
                  <th className="p-3 text-center text-sm font-semibold text-gray-700">Health</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Created</th>
                  <th className="p-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnvs.map((env) => (
                  <tr key={env.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-maruti-blue" />
                        <span className="font-medium text-maruti-black">{env.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-600">{env.project}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="uppercase">
                        {env.type}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          env.status === "active"
                            ? "success"
                            : env.status === "provisioning"
                            ? "info"
                            : env.status === "partial"
                            ? "warning"
                            : "error"
                        }
                      >
                        {env.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-right text-sm">{env.resources}</td>
                    <td className="p-3 text-right text-sm font-semibold">
                      {formatCurrency(env.cost)}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={`h-full ${
                              env.health >= 95
                                ? "bg-status-success"
                                : env.health >= 80
                                ? "bg-status-warning"
                                : "bg-status-error"
                            }`}
                            style={{ width: `${env.health}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{env.health}%</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-600">{formatDate(env.createdAt)}</td>
                    <td className="p-3 text-center">
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEnvs.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No environments found matching your filters
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

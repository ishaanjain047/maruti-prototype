"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Plus, ExternalLink } from "lucide-react"
import { mockServiceRequests } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"

export default function ServiceRequestsPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredSRs = mockServiceRequests.filter((sr) => {
    if (statusFilter !== "all" && sr.status !== statusFilter) return false
    if (typeFilter !== "all" && sr.type !== typeFilter) return false
    if (priorityFilter !== "all" && sr.priority !== priorityFilter) return false
    return true
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-maruti-black">All Service Requests</h1>
          <p className="mt-2 text-gray-600">
            Track and manage your infrastructure service requests
          </p>
        </div>
        <Link href="/new-request">
          <Button className="bg-maruti-red hover:bg-maruti-red/90">
            <Plus className="mr-2 h-4 w-4" />
            New Request
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
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
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
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                <SelectItem value="network">Network</SelectItem>
                <SelectItem value="firewall">Firewall</SelectItem>
                <SelectItem value="access">Access</SelectItem>
                <SelectItem value="ip_whitelist">IP Whitelist</SelectItem>
                <SelectItem value="dns">DNS</SelectItem>
                <SelectItem value="ssl">SSL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-gray-700">Priority</label>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={() => {
                setStatusFilter("all")
                setTypeFilter("all")
                setPriorityFilter("all")
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
            <div className="text-2xl font-bold text-status-warning">
              {mockServiceRequests.filter(sr => sr.status === "pending").length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-status-success">
              {mockServiceRequests.filter(sr => sr.status === "approved").length}
            </div>
            <div className="text-sm text-gray-600">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-status-info">
              {mockServiceRequests.filter(sr => sr.status === "in_progress").length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-maruti-black">
              {mockServiceRequests.filter(sr => sr.status === "completed").length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Service Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Service Requests ({filteredSRs.length})</CardTitle>
          <CardDescription>All your infrastructure service requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Priority</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Pending On</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Created</th>
                  <th className="p-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSRs.map((sr) => (
                  <tr key={sr.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-maruti-blue" />
                        <span className="font-mono text-xs text-gray-600">{sr.id}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="capitalize">
                        {sr.type.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm font-medium text-maruti-black">{sr.title}</td>
                    <td className="p-3">
                      <Badge
                        variant={
                          sr.status === "completed" || sr.status === "approved"
                            ? "success"
                            : sr.status === "pending"
                            ? "warning"
                            : sr.status === "in_progress"
                            ? "info"
                            : sr.status === "rejected" || sr.status === "failed"
                            ? "error"
                            : "default"
                        }
                      >
                        {sr.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          sr.priority === "high"
                            ? "error"
                            : sr.priority === "medium"
                            ? "warning"
                            : "info"
                        }
                      >
                        {sr.priority}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm text-gray-600">{sr.pendingOn || "-"}</td>
                    <td className="p-3 text-sm text-gray-600">{formatDate(sr.createdAt)}</td>
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

          {filteredSRs.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No service requests found matching your filters
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

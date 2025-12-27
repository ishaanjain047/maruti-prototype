"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Eye } from "lucide-react"

// Mock data with new SR structure
const mockSRs = [
  {
    id: "SR-002",
    title: "PostgreSQL Database",
    environment: "ecommerce-production",
    category: "database",
    status: "pending",
    createdAt: "2025-12-28 14:32",
    cost: 160,
  },
  {
    id: "SR-008",
    title: "IAM Policy - ECS Secrets",
    environment: "ecommerce-production",
    category: "iam",
    status: "pending",
    createdAt: "2025-12-28 14:34",
    cost: 0,
  },
  {
    id: "SR-009",
    title: "Razorpay Integration",
    environment: "ecommerce-production",
    category: "integration",
    status: "waiting",
    createdAt: "2025-12-28 14:34",
    cost: 0,
  },
  {
    id: "SR-007",
    title: "Firewall - App to Redis",
    environment: "ecommerce-production",
    category: "firewall",
    status: "completed",
    createdAt: "2025-12-28 14:34",
    cost: 0,
  },
  {
    id: "SR-006",
    title: "Firewall - App to Database",
    environment: "ecommerce-production",
    category: "firewall",
    status: "completed",
    createdAt: "2025-12-28 14:34",
    cost: 0,
  },
  {
    id: "SR-005",
    title: "Redis Cache",
    environment: "ecommerce-production",
    category: "cache",
    status: "completed",
    createdAt: "2025-12-28 14:33",
    cost: 15,
  },
  {
    id: "SR-004",
    title: "ECS Container Cluster",
    environment: "ecommerce-production",
    category: "compute",
    status: "completed",
    createdAt: "2025-12-28 14:33",
    cost: 180,
  },
  {
    id: "SR-003",
    title: "Application Load Balancer",
    environment: "ecommerce-production",
    category: "compute",
    status: "completed",
    createdAt: "2025-12-28 14:32",
    cost: 23,
  },
  {
    id: "SR-001",
    title: "VPC Creation",
    environment: "ecommerce-production",
    category: "network",
    status: "completed",
    createdAt: "2025-12-28 14:32",
    cost: 46,
  },
]

export default function ServiceRequestsPage() {
  const [environmentFilter, setEnvironmentFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSRs = mockSRs.filter((sr) => {
    if (environmentFilter !== "all" && sr.environment !== environmentFilter)
      return false
    if (categoryFilter !== "all" && sr.category !== categoryFilter) return false
    if (statusFilter !== "all" && sr.status !== statusFilter) return false
    if (
      searchQuery &&
      !sr.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !sr.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false
    return true
  })

  const activeSRs = filteredSRs.filter((sr) => sr.status !== "completed")
  const completedSRs = filteredSRs.filter((sr) => sr.status === "completed")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">✅ Completed</Badge>
      case "pending":
        return <Badge variant="warning">⏸️ Pending Approval</Badge>
      case "waiting":
        return <Badge variant="info">🕐 Waiting</Badge>
      case "in_progress":
        return <Badge variant="info">🔄 In Progress</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-maruti-black">
          SERVICE REQUESTS
        </h1>
        <p className="mt-2 text-gray-600">
          Track and manage all infrastructure service requests
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <Select
            value={environmentFilter}
            onValueChange={setEnvironmentFilter}
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="All Environments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Environments</SelectItem>
              <SelectItem value="ecommerce-production">
                ecommerce-production
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="network">Network</SelectItem>
              <SelectItem value="database">Database</SelectItem>
              <SelectItem value="compute">Compute</SelectItem>
              <SelectItem value="cache">Cache</SelectItem>
              <SelectItem value="firewall">Firewall</SelectItem>
              <SelectItem value="iam">IAM</SelectItem>
              <SelectItem value="integration">Integration</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="waiting">Waiting</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by SR ID or title..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Active SRs */}
      {activeSRs.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Active SRs ({activeSRs.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeSRs.map((sr) => (
              <div
                key={sr.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-maruti-black">
                      {sr.id}
                    </span>
                    <span className="text-gray-600">|</span>
                    <span className="font-medium">{sr.title}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                    <span>Environment: {sr.environment}</span>
                    <span>Category: {sr.category}</span>
                    <span>Created: {sr.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(sr.status)}
                  <Button variant="outline" size="sm">
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>
                  {sr.status === "pending" && (
                    <Button size="sm" className="bg-maruti-blue">
                      Approve
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Completed SRs */}
      {completedSRs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Completed SRs ({completedSRs.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {completedSRs.map((sr) => (
              <div
                key={sr.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-700">{sr.id}</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-sm text-gray-700">{sr.title}</span>
                  <Badge variant="success" className="text-xs">
                    ✅
                  </Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            ))}
            {completedSRs.length > 6 && (
              <Button variant="link" className="w-full">
                Show All
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* No results */}
      {filteredSRs.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            No service requests found matching your filters
          </CardContent>
        </Card>
      )}
    </div>
  )
}

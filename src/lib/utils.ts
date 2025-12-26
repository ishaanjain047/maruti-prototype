import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    active: "text-status-success bg-status-success/10",
    approved: "text-status-success bg-status-success/10",
    completed: "text-status-success bg-status-success/10",
    pending: "text-status-warning bg-status-warning/10",
    "in_progress": "text-status-info bg-status-info/10",
    provisioning: "text-status-info bg-status-info/10",
    failed: "text-status-error bg-status-error/10",
    rejected: "text-status-error bg-status-error/10",
    partial: "text-status-warning bg-status-warning/10",
  }
  return statusColors[status.toLowerCase()] || "text-gray-600 bg-gray-100"
}

export function getPriorityColor(priority: string): string {
  const priorityColors: Record<string, string> = {
    high: "text-status-error bg-status-error/10",
    medium: "text-status-warning bg-status-warning/10",
    low: "text-status-info bg-status-info/10",
  }
  return priorityColors[priority.toLowerCase()] || "text-gray-600 bg-gray-100"
}

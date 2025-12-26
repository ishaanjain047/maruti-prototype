"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Building2, FileText, Plus, BookOpen, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "All Environments",
    href: "/environments",
    icon: Building2,
  },
  {
    name: "All Service Requests",
    href: "/service-requests",
    icon: FileText,
  },
  {
    name: "New Request",
    href: "/new-request",
    icon: Plus,
  },
  {
    name: "Knowledge Base",
    href: "/knowledge-base",
    icon: BookOpen,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-maruti-blue">
            <span className="text-xl font-bold text-white">M</span>
          </div>
          <div>
            <div className="text-sm font-bold text-maruti-black">Maruti Suzuki</div>
            <div className="text-xs text-gray-500">Infrastructure Portal</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-maruti-blue text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Info */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-maruti-blue text-white">
            RK
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-maruti-black">Rajesh Kumar</div>
            <div className="text-xs text-gray-500">Developer</div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

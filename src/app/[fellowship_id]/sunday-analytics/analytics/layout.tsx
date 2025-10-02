"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart3, Calendar, DotIcon as Counter, Home, Menu, X, TrendingUp, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    name: "Overview",
    href: "/sunday-analytics/analytics",
    icon: BarChart3,
  },
  {
    name: "Attendance",
    href: "/sunday-analytics/analytics/attendance",
    icon: TrendingUp,
  },
  {
    name: "Monthly",
    href: "/sunday-analytics/analytics/monthly",
    icon: Calendar,
  },
  {
    name: "Live Counter",
    href: "/sunday-analytics/analytics/counter",
    icon: Counter,
  },
]

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const params = useParams()
  const fellowship = params.fellowship as string

  const fellowshipName = fellowship?.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()) || "Fellowship"

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
            <div>
              <h2 className="text-lg font-bold text-sidebar-foreground">{fellowshipName}</h2>
              <p className="text-sm text-sidebar-foreground/70">Analytics Dashboard</p>
            </div>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="h-4 w-4 mr-3" />
                Back to Home
              </Button>
            </Link>

            <div className="pt-4">
              <p className="text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider mb-3">Analytics</p>
              {navigationItems.map((item) => {
                const href = `/${fellowship}${item.href}`
                const isActive = pathname === href

                return (
                  <Link key={item.name} href={href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        isActive && "bg-sidebar-primary text-sidebar-primary-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.name}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="bg-card border-b border-border">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">{fellowshipName} Analytics</h1>
                <p className="text-sm text-muted-foreground">Sunday attendance tracking and insights</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Last updated: Today</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

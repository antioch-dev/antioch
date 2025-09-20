"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Church, Home, Users, Calendar, Settings, BarChart3, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole?: "user" | "admin" | "pastor" | "leader" | "member" | "super_admin" | "tenure_manager" | "department_head";
  fellowshipId?: string
  userId?: string
}

export function DashboardLayout({ children, userRole = "member", fellowshipId, userId }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const getNavItems = () => {
    if (userRole === "admin") {
      return [
        { name: "Dashboard", href: "/admin/dashboard", icon: Home },
        { name: "Fellowships", href: "/admin/fellowships", icon: Church },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
        { name: "Settings", href: "/admin/settings", icon: Settings },
      ]
    } else if (fellowshipId) {
      return [
        { name: "Dashboard", href: `/${fellowshipId}/dashboard`, icon: Home },
        { name: "Members", href: `/${fellowshipId}/members`, icon: Users },
        { name: "Events", href: `/${fellowshipId}/events`, icon: Calendar },
        { name: "Analytics", href: `/${fellowshipId}/analytics`, icon: BarChart3 },
        { name: "Settings", href: `/${fellowshipId}/settings`, icon: Settings },
      ]
    } else if (userId) {
      return [
        { name: "Dashboard", href: `/${userId}/dashboard`, icon: Home },
        { name: "My Fellowship", href: `/${userId}/fellowship`, icon: Church },
        { name: "Events", href: `/${userId}/events`, icon: Calendar },
        { name: "Profile", href: `/${userId}/profile`, icon: User },
        { name: "Account", href: `/${userId}/account`, icon: Settings },
      ]
    }
    return []
  }

  const navItems = getNavItems()

  const Sidebar = ({ className }: { className?: string }) => (
    <div className={cn("pb-12 w-64", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-6">
            <Church className="h-8 w-8 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Fellowship Platform</h2>
          </div>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900",
                  pathname === item.href ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600" : "text-gray-700",
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r bg-white border-gray-200">
          <Sidebar />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 md:pl-64">
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}

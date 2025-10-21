"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Mail, Send, Bell, Settings, User, Plus, ArrowLeft, Shield } from "lucide-react"

interface FellowshipNavProps {
  fellowshipId: string
  userRole?: "admin" | "user" | "platform-admin"
}

export function FellowshipNav({ fellowshipId, userRole = "user" }: FellowshipNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      href: `/${fellowshipId}/emails/notifications`,
      label: "Notifications",
      icon: Bell,
      roles: ["admin", "user", "platform-admin"],
    },
    {
      href: `/${fellowshipId}/emails/send`,
      label: "Send Email",
      icon: Send,
      roles: ["admin", "platform-admin"],
    },
    {
      href: `/${fellowshipId}/emails/manage`,
      label: "Manage Accounts",
      icon: Settings,
      roles: ["admin", "platform-admin"],
    },
    {
      href: `/${fellowshipId}/emails/my-email`,
      label: "My Email",
      icon: User,
      roles: ["user"],
    },
    {
      href: `/${fellowshipId}/emails/apply`,
      label: "Apply for Email",
      icon: Plus,
      roles: ["user"],
    },
    {
      href: `/admin/emails/dashboard`,
      label: "Platform Admin",
      icon: Shield,
      roles: ["platform-admin"],
    },
  ]

  const visibleItems = navItems.filter((item) => item.roles.includes(userRole))

  return (
    <div className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href={`/${fellowshipId}`}>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-muted/50 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to Fellowship
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-md">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <h1 className="text-lg font-semibold">Email Management</h1>
            </div>
          </div>

          <nav className="flex space-x-1">
            {visibleItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center gap-2 transition-all duration-200 ${
                      isActive ? "shadow-sm" : "hover:bg-muted/50 hover:-translate-y-0.5"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

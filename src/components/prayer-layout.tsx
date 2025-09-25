"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Home, Heart, Calendar, Users, Building, Sparkles, Plus, Share } from "lucide-react"

interface PrayerLayoutProps {
  children: React.ReactNode
  fellowshipName: string
}

export default function PrayerLayout({ children, fellowshipName }: PrayerLayoutProps) {
  const pathname = usePathname()

 
  const safeFellowshipName = fellowshipName || "fellowship-home";

  const navigationItems = [
    {
      href: `/${safeFellowshipName}/Prayer-system/prayer`,
      label: "Prayer Home",
      icon: Heart,
      active: pathname === `/${safeFellowshipName}/Prayer-system/prayer`,
    },
    {
      href: `/${safeFellowshipName}/Prayer-system/prayer/requests`,
      label: "Prayer Requests",
      icon: Heart,
      active: pathname === `/${safeFellowshipName}/Prayer-system/prayer/requests`,
    },
    {
      href: `/${safeFellowshipName}/Prayer-system/prayer/meetings`,
      label: "Prayer Meetings",
      icon: Calendar,
      active: pathname === `/${safeFellowshipName}/Prayer-system/prayer/meetings`,
    },
    {
      href: `/${safeFellowshipName}/Prayer-system/prayer/meetings/create`,
      label: "Create Meeting",
      icon: Plus,
      active: pathname === `/${safeFellowshipName}/Prayer-system/prayer/meetings/create`,
    },
    {
      href: `/${safeFellowshipName}/Prayer-system/prayer/assignments`,
      label: "Assignments",
      icon: Users,
      active: pathname === `/${safeFellowshipName}/Prayer-system/prayer/assignments`,
    },
    {
      href: `/${safeFellowshipName}/Prayer-system/prayer/ministries`,
      label: "Ministry Coverage",
      icon: Building,
      active: pathname === `/${safeFellowshipName}/Prayer-system/prayer/ministries`,
    },
  ]

  
  const formattedFellowshipName = safeFellowshipName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen spiritual-gradient relative">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-purple-200/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05)_0%,transparent_50%)]"></div>
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-purple-100/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2 prayer-button hover:bg-purple-50">
                  <Home className="h-4 w-4" />
                  Platform Home
                </Button>
              </Link>
              <div className="h-6 w-px bg-purple-200" />
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <h1 className="text-lg font-serif font-semibold text-gray-900">
                  {formattedFellowshipName}{" "}
                  - Prayer Ministry
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/fellowship-home/Prayer-system/prayer/submit">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-white/80 prayer-button hover:bg-green-50 border-green-200 text-green-700"
                >
                  <Share className="h-4 w-4" />
                  Public Submit
                </Button>
              </Link>
              <Link href={`/${safeFellowshipName}/prayer`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-white/80 prayer-button hover:bg-purple-50 border-purple-200"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Prayer Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <Card className="p-6 prayer-card-glow bg-white/95 backdrop-blur-sm border-purple-100">
              <div className="mb-4">
                <h2 className="font-serif font-semibold text-gray-900 text-lg">Navigation</h2>
                <p className="text-sm text-gray-600 mt-1">Elevate your spiritual journey</p>
              </div>
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={item.active ? "default" : "ghost"}
                        className={`w-full justify-start gap-3 prayer-button transition-all duration-300 ${
                          item.active
                            ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
                            : "hover:bg-purple-50 hover:text-purple-700"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Button>
                    </Link>
                  )
                })}
              </nav>

              <div className="mt-6 pt-6 border-t border-purple-100">
                <h3 className="font-medium text-gray-900 text-sm mb-3">Quick Access</h3>
                <Link href="/fellowship-home/Prayer-system/prayer/submit">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    <Share className="h-4 w-4" />
                    Public Submission
                  </Button>
                </Link>
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  )
}

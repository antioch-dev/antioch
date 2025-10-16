"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import { Church, Grid3x3, Menu, Search, User, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { getFellowshipApps, CATEGORY_LABELS, type FellowshipApp } from "@/config/fellowship-apps"

interface FellowshipNavigationProps {
  fellowshipId: string
  fellowshipName?: string
}

export function FellowshipNavigation({ fellowshipId, fellowshipName = "Fellowship" }: FellowshipNavigationProps) {
  const [appSwitcherOpen, setAppSwitcherOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  const apps = getFellowshipApps(fellowshipId)

  // Filter apps based on search query
  const filteredApps = useMemo(() => {
    if (!searchQuery) return apps
    const query = searchQuery.toLowerCase()
    return apps.filter(
      (app) =>
        app.name.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query) ||
        app.category.toLowerCase().includes(query)
    )
  }, [apps, searchQuery])

  // Group apps by category
  const appsByCategory = useMemo(() => {
    const grouped: Record<FellowshipApp["category"], FellowshipApp[]> = {
      ministry: [],
      management: [],
      communication: [],
      analytics: [],
    }
    filteredApps.forEach((app) => {
      if (grouped[app.category]) {
        grouped[app.category].push(app)
      }
    })
    return grouped
  }, [filteredApps])

  // Generate breadcrumbs from pathname
  const breadcrumbs = useMemo(() => {
    const paths = pathname.split("/").filter(Boolean)
    const crumbs: { label: string; href: string }[] = []

    if (paths.length === 0) return crumbs

    // Add fellowship home
    crumbs.push({
      label: fellowshipName,
      href: `/${fellowshipId}`,
    })

    // Skip fellowship_id and build remaining crumbs
    for (let i = 1; i < paths.length; i++) {
      const segment = paths[i]
      if (!segment) continue
      
      const href = `/${paths.slice(0, i + 1).join("/")}`

      // Find app name from config
      const app = apps.find((a) => a.href === href || segment === a.id)
      const label = app
        ? app.name
        : segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")

      crumbs.push({ label, href })
    }

    return crumbs
  }, [pathname, fellowshipId, fellowshipName, apps])

  const currentApp = useMemo(() => {
    return apps.find((app) => pathname?.startsWith(app.href))
  }, [pathname, apps])

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-4 md:px-6">
          {/* Mobile Menu Toggle */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <div className="flex flex-col gap-6 py-6">
                <div className="flex items-center gap-2">
                  <Church className="h-6 w-6 text-primary" />
                  <span className="text-lg font-semibold">{fellowshipName}</span>
                </div>

                {/* Mobile App Grid */}
                <div className="space-y-6">
                  {Object.entries(appsByCategory).map(([category, categoryApps]) => {
                    if (categoryApps.length === 0) return null
                    return (
                      <div key={category}>
                        <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                          {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
                        </h3>
                        <div className="space-y-1">
                          {categoryApps.map((app) => (
                            <Link
                              key={app.id}
                              href={app.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                pathname.startsWith(app.href)
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-accent hover:text-accent-foreground"
                              )}
                            >
                              <div
                                className={cn(
                                  "flex h-8 w-8 items-center justify-center rounded-lg text-white",
                                  app.color
                                )}
                              >
                                <app.icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <div className="font-medium">{app.name}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Fellowship Branding */}
          <Link href={`/${fellowshipId}`} className="flex items-center gap-2 md:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Church className="h-5 w-5" />
            </div>
            <span className="hidden font-semibold text-lg md:inline-block">{fellowshipName}</span>
          </Link>

          {/* Current App Indicator (Desktop) */}
          {currentApp && (
            <div className="hidden lg:flex items-center gap-2 ml-2 px-3 py-1.5 rounded-lg bg-accent">
              <currentApp.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{currentApp.name}</span>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* App Switcher */}
            <Dialog open={appSwitcherOpen} onOpenChange={setAppSwitcherOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                  <Grid3x3 className="h-5 w-5" />
                  <span className="sr-only">Switch apps</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Fellowship Apps</DialogTitle>
                </DialogHeader>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search apps..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {/* App Grid by Category */}
                <div className="space-y-6">
                  {Object.entries(appsByCategory).map(([category, categoryApps]) => {
                    if (categoryApps.length === 0) return null
                    return (
                      <div key={category}>
                        <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                          {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
                        </h3>
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                          {categoryApps.map((app) => (
                            <Link
                              key={app.id}
                              href={app.href}
                              onClick={() => {
                                setAppSwitcherOpen(false)
                                setSearchQuery("")
                              }}
                              className={cn(
                                "group flex flex-col items-center gap-3 rounded-lg border p-4 transition-all hover:border-primary hover:shadow-md",
                                pathname.startsWith(app.href) && "border-primary bg-primary/5"
                              )}
                            >
                              <div
                                className={cn(
                                  "flex h-12 w-12 items-center justify-center rounded-lg text-white transition-transform group-hover:scale-110",
                                  app.color
                                )}
                              >
                                <app.icon className="h-6 w-6" />
                              </div>
                              <div className="text-center">
                                <div className="font-medium text-sm">{app.name}</div>
                                <div className="text-xs text-muted-foreground line-clamp-2">{app.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                  {filteredApps.length === 0 && (
                    <div className="py-8 text-center text-sm text-muted-foreground">No apps found</div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* Mode Toggle */}
            <ModeToggle />

            {/* User Menu */}
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        {breadcrumbs.length > 0 && (
          <div className="border-t">
            <div className="flex h-10 items-center gap-2 px-4 md:px-6">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={`/${fellowshipId}`}>
                        <Home className="h-3.5 w-3.5" />
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {breadcrumbs.slice(1).map((crumb, index) => (
                    <div key={crumb.href} className="flex items-center gap-1.5">
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {index === breadcrumbs.length - 2 ? (
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={crumb.href}>{crumb.label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

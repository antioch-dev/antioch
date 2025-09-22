"use client"

import { use } from "react" // Add 'use' import
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getTenureStats, getActiveTenure } from "@/lib/data-utils"
import Link from "next/link"
import {
  Users,
  Calendar,
  UserCheck,
  Clock,
  ArrowRight,
  Shield,
  Building2,
  UserPlus,
  Eye,
  Settings,
  ChevronRight,
} from "lucide-react"

interface LeadershipDashboardProps {
  params: Promise<{ fellowship_id: string }> // Change to Promise
}

export default function LeadershipDashboard({ params }: LeadershipDashboardProps) {
  // Use the 'use' hook to unwrap the Promise
  const resolvedParams = use(params)
  const stats = getTenureStats(resolvedParams.fellowship_id) // Use resolvedParams
  const activeTenure = getActiveTenure(resolvedParams.fellowship_id) // Use resolvedParams

  return (
    <div className="space-y-10">
      {/* Welcome Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="relative z-10 px-8 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Leadership Management System</h1>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
           {`   Streamline your fellowship's leadership structure with comprehensive tenure management, position
              assignments, and appointment tracking.`}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${resolvedParams.fellowship_id}/leadership/public`}> {/* Use resolvedParams */}
                <Button size="lg" variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100">
                  <Eye className="mr-2 h-5 w-5" />
                  View Public Directory
                </Button>
              </Link>
              <Link href={`/${resolvedParams.fellowship_id}/leadership/tenures/new`}> {/* Use resolvedParams */}
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-400 text-white hover:bg-slate-800 bg-transparent hover:border-slate-300"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Create New Tenure
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Tenures</CardTitle>
            <div className="p-2 bg-blue-200 dark:bg-blue-800 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.totalTenures}</div>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{stats.activeTenures} currently active</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              Active Positions
            </CardTitle>
            <div className="p-2 bg-emerald-200 dark:bg-emerald-800 rounded-lg">
              <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">{stats.totalPositions}</div>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">Leadership positions available</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-purple-700 dark:text-purple-300">
              Total Appointments
            </CardTitle>
            <div className="p-2 bg-purple-200 dark:bg-purple-800 rounded-lg">
              <UserCheck className="h-5 w-5 text-purple-600 dark:text-purple-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.totalAppointments}</div>
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">Leaders appointed</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-amber-700 dark:text-amber-300">Pending Invites</CardTitle>
            <div className="p-2 bg-amber-200 dark:bg-amber-800 rounded-lg">
              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-900 dark:text-amber-100">{stats.pendingAppointments}</div>
            <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">Awaiting response</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Active Tenure Info */}
      {activeTenure && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {activeTenure.title}
                  </CardTitle>
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100"
                  >
                    Active Tenure
                  </Badge>
                </div>
                <CardDescription className="text-base text-slate-600 dark:text-slate-400">
                  <Calendar className="inline mr-2 h-4 w-4" />
                  {new Date(activeTenure.startDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(activeTenure.endDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </div>
              <Link href={`/${resolvedParams.fellowship_id}/leadership/public`}> {/* Use resolvedParams */}
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800 bg-transparent"
                >
                  <Eye className="mr-2 h-5 w-5" />
                  View Public Directory
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Enhanced Quick Actions */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Management Tools</h2>
          <p className="text-slate-600 dark:text-slate-400">Access key leadership management functions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Primary Management Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center">
              <Shield className="mr-2 h-5 w-5 text-blue-600" />
              Core Management
            </h3>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                      <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Tenure Management</CardTitle>
                      <CardDescription className="text-base">
                        Create and manage leadership tenure periods
                      </CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href={`/${resolvedParams.fellowship_id}/leadership/tenures`}> {/* Use resolvedParams */}
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                    Manage Tenures
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-xl">
                      <UserPlus className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Appointments</CardTitle>
                      <CardDescription className="text-base">
                        Assign leaders to positions and manage invitations
                      </CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href={`/${resolvedParams.fellowship_id}/leadership/appointments`}> {/* Use resolvedParams */}
                  <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Manage Appointments
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Structure Management Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center">
              <Building2 className="mr-2 h-5 w-5 text-purple-600" />
              Structure & Settings
            </h3>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                      <Users className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Positions & Departments</CardTitle>
                      <CardDescription className="text-base">
                        Define leadership positions and ministry departments
                      </CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <Link href={`/${resolvedParams.fellowship_id}/leadership/positions`}> {/* Use resolvedParams */}
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-950 bg-transparent"
                  >
                    Manage Positions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/${resolvedParams.fellowship_id}/leadership/departments`}> {/* Use resolvedParams */}
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-950 bg-transparent"
                  >
                    Manage Departments
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                      <Settings className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Permissions & Access</CardTitle>
                      <CardDescription className="text-base">Manage user roles and system permissions</CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href={`/${resolvedParams.fellowship_id}/leadership/permissions`}> {/* Use resolvedParams */}
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 bg-transparent"
                  >
                    Manage Permissions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { use, useState } from "react" // Add 'use' import
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAppointmentsWithDetails, getTenures } from "@/lib/data-utils"
import type { Appointment } from "@/lib/mock-data"
import Link from "next/link"
import {
  Plus,
  Search,
  MoreHorizontal,
  UserCheck,
  Send,
  Copy,
  RotateCcw,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

interface AppointmentsPageProps {
  params: Promise<{ fellowship_id: string }> // Change to Promise
}

export default function AppointmentsPage({ params }: AppointmentsPageProps) {
  // Use the 'use' hook to unwrap the Promise
  const resolvedParams = use(params)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "accepted" | "declined" | "revoked">("all")
  const [tenureFilter, setTenureFilter] = useState<string>("all")

  const allAppointments = getAppointmentsWithDetails(resolvedParams.fellowship_id) // Use resolvedParams
  const tenures = getTenures(resolvedParams.fellowship_id) // Use resolvedParams

  const filteredAppointments = allAppointments.filter((appointment) => {
    const matchesSearch =
      appointment.person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.position.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (appointment.department?.name.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    const matchesTenure = tenureFilter === "all" || appointment.tenureId === tenureFilter

    return matchesSearch && matchesStatus && matchesTenure
  })

  const getStatusBadgeVariant = (status: Appointment["status"]) => {
    switch (status) {
      case "accepted":
        return "default"
      case "pending":
        return "secondary"
      case "declined":
        return "destructive"
      case "revoked":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: Appointment["status"]) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "declined":
        return <XCircle className="h-4 w-4" />
      case "revoked":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const copyInviteLink = async (inviteLink: string) => {
    const fullUrl = `${window.location.origin}${inviteLink}`
    await navigator.clipboard.writeText(fullUrl)
    // In a real app, you'd show a toast notification here
    console.log("Invite link copied:", fullUrl)
  }

  const resendInvite = (appointmentId: string) => {
    // Mock resend functionality
    console.log("Resending invite for appointment:", appointmentId)
  }

  const revokeAppointment = (appointmentId: string) => {
    // Mock revoke functionality
    console.log("Revoking appointment:", appointmentId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Appointment Management</h2>
          <p className="text-muted-foreground">Manage leadership appointments and invitations</p>
        </div>
        <Link href={`/${resolvedParams.fellowship_id}/leadership/appointments/new`}> {/* Use resolvedParams */}
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Appointment
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-600" />
              <div>
                <div className="text-2xl font-bold">{allAppointments.filter((a) => a.status === "pending").length}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-2xl font-bold">
                  {allAppointments.filter((a) => a.status === "accepted").length}
                </div>
                <div className="text-sm text-muted-foreground">Accepted</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <div>
                <div className="text-2xl font-bold">
                  {allAppointments.filter((a) => a.status === "declined").length}
                </div>
                <div className="text-sm text-muted-foreground">Declined</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{allAppointments.length}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by person, position, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={(value: "all" | "pending" | "accepted" | "declined" | "revoked") => setStatusFilter(value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                  <SelectItem value="revoked">Revoked</SelectItem>
                </SelectContent>
              </Select>
              <Select value={tenureFilter} onValueChange={setTenureFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Tenures" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tenures</SelectItem>
                  {tenures.map((tenure) => (
                    <SelectItem key={tenure.id} value={tenure.id}>
                      {tenure.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Appointments ({filteredAppointments.length})
          </CardTitle>
          <CardDescription>Leadership appointments and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-8">
              <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No appointments found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all" || tenureFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Get started by creating your first appointment"}
              </p>
              {!searchTerm && statusFilter === "all" && tenureFilter === "all" && (
                <Link href={`/${resolvedParams.fellowship_id}/leadership/appointments/new`}> {/* Use resolvedParams */}
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Appointment
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Person</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Tenure</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Appointed</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {appointment.person.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{appointment.person.name}</div>
                          <div className="text-sm text-muted-foreground">{appointment.person.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{appointment.position.name}</div>
                        {appointment.department && (
                          <div className="text-sm text-muted-foreground">{appointment.department.name}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{appointment.tenure.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(appointment.tenure.startDate)} - {formatDate(appointment.tenure.endDate)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(appointment.status)}
                        <Badge variant={getStatusBadgeVariant(appointment.status)}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm text-foreground">{formatDate(appointment.appointedAt)}</div>
                        {appointment.respondedAt && (
                          <div className="text-sm text-muted-foreground">
                            Responded {formatDate(appointment.respondedAt)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => copyInviteLink(appointment.inviteLink)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Invite Link
                          </DropdownMenuItem>
                          {appointment.status === "pending" && (
                            <>
                              <DropdownMenuItem onClick={() => resendInvite(appointment.id)}>
                                <Send className="h-4 w-4 mr-2" />
                                Resend Invite
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => revokeAppointment(appointment.id)}>
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Revoke
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
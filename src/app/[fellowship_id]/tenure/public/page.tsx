"use client"

import { use, useState } from "react" // Add 'use' import
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getActiveTenure, getAppointmentsWithDetails, getDepartments } from "@/lib/data-utils"
import type { AppointmentWithDetails } from "@/lib/mock-data"
import { Calendar, User, Building2, Mail, Phone, Clock } from "lucide-react"
import Image from "next/image"

interface PublicLeadershipPageProps {
  params: Promise<{ fellowship_id: string }> // Change to Promise
}

export default function PublicLeadershipPage({ params }: PublicLeadershipPageProps) {
  // Use the 'use' hook to unwrap the Promise
  const resolvedParams = use(params)
  const [selectedLeader, setSelectedLeader] = useState<AppointmentWithDetails | null>(null)

  const activeTenure = getActiveTenure(resolvedParams.fellowship_id) // Use resolvedParams
  const allAppointments = getAppointmentsWithDetails(resolvedParams.fellowship_id) // Use resolvedParams
  const departments = getDepartments(resolvedParams.fellowship_id) // Use resolvedParams

  // Filter to only accepted appointments for the active tenure
  const activeAppointments = allAppointments.filter(
    (appointment) => appointment.tenureId === activeTenure?.id && appointment.status === "accepted",
  )

  // Separate standalone and department positions
  const standaloneAppointments = activeAppointments.filter((appointment) => !appointment.position.departmentId)
  const departmentAppointments = activeAppointments.filter((appointment) => appointment.position.departmentId)

  // Group department appointments by department
  const appointmentsByDepartment = departments.reduce(
    (acc, department) => {
      acc[department.id] = departmentAppointments.filter(
        (appointment) => appointment.position.departmentId === department.id,
      )
      return acc
    },
    {} as Record<string, AppointmentWithDetails[]>,
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const LeaderCard = ({
    appointment,
    size = "default",
  }: { appointment: AppointmentWithDetails; size?: "default" | "large" }) => {
    const cardSize = size === "large" ? "p-6" : "p-4"
    const imageSize = size === "large" ? "w-20 h-20" : "w-16 h-16"
    const titleSize = size === "large" ? "text-xl" : "text-lg"

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Card className={`cursor-pointer hover:shadow-md transition-shadow ${cardSize}`}>
            <CardContent className="p-0">
              <div className="flex items-center gap-4">
                <div className={`${imageSize} bg-muted rounded-full flex items-center justify-center overflow-hidden`}>
                  {appointment.person.photoUrl ? (
                    <Image
                      src={appointment.person.photoUrl || "/placeholder.svg"}
                      alt={appointment.person.name}
                      width={size === "large" ? 80 : 64}
                      height={size === "large" ? 80 : 64}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className={`${size === "large" ? "text-2xl" : "text-xl"} font-medium text-muted-foreground`}>
                      {appointment.person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`${titleSize} font-semibold text-foreground truncate`}>{appointment.person.name}</h3>
                  <p className="text-sm font-medium text-primary truncate">{appointment.position.name}</p>
                  {appointment.department && (
                    <p className="text-sm text-muted-foreground truncate">{appointment.department.name}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                {appointment.person.photoUrl ? (
                  <Image
                    src={appointment.person.photoUrl || "/placeholder.svg"}
                    alt={appointment.person.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-medium text-muted-foreground">
                    {appointment.person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                )}
              </div>
              <div>
                <div className="text-xl font-semibold">{appointment.person.name}</div>
                <div className="text-sm text-primary font-medium">{appointment.position.name}</div>
              </div>
            </DialogTitle>
            <DialogDescription>Leadership profile and contact information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Position & Department */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Position</span>
              </div>
              <div className="pl-6">
                <div className="font-medium">{appointment.position.name}</div>
                <div className="text-sm text-muted-foreground">{appointment.position.description}</div>
              </div>
            </div>

            {appointment.department && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Ministry</span>
                </div>
                <div className="pl-6">
                  <div className="font-medium">{appointment.department.name}</div>
                  <div className="text-sm text-muted-foreground">{appointment.department.description}</div>
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Contact</span>
              </div>
              <div className="pl-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{appointment.person.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{appointment.person.phone}</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            {appointment.person.bio && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">About</span>
                </div>
                <div className="pl-6">
                  <p className="text-sm text-muted-foreground">{appointment.person.bio}</p>
                </div>
              </div>
            )}

            {/* Tenure Information */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Tenure</span>
              </div>
              <div className="pl-6">
                <div className="font-medium">{appointment.tenure.title}</div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(appointment.tenure.startDate)} - {formatDate(appointment.tenure.endDate)}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!activeTenure) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">No Active Leadership Tenure</h2>
            <p className="text-muted-foreground">
              There is currently no active leadership tenure. Please check back later.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Leadership Directory</h1>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Badge variant="default" className="text-base px-4 py-2">
              {activeTenure.title}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            {formatDate(activeTenure.startDate)} - {formatDate(activeTenure.endDate)}
          </p>
        </div>

        {activeAppointments.length === 0 ? (
          <div className="text-center py-12">
            <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">No Leadership Appointments</h2>
            <p className="text-muted-foreground">Leadership appointments for this tenure are still being finalized.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Executive Leadership (Standalone Positions) */}
            {standaloneAppointments.length > 0 && (
              <section>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Executive Leadership</h2>
                  <p className="text-muted-foreground">Core leadership positions</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {standaloneAppointments.map((appointment) => (
                    <LeaderCard key={appointment.id} appointment={appointment} size="large" />
                  ))}
                </div>
            </section>
            )}

            {/* Ministry Departments */}
            {departments.map((department) => {
              const deptAppointments = appointmentsByDepartment[department.id]
              if (!deptAppointments || deptAppointments.length === 0) return null

              return (
                <section key={department.id}>
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Building2 className="h-8 w-8 text-primary" />
                      <h2 className="text-3xl font-bold text-foreground">{department.name}</h2>
                    </div>
                    <p className="text-muted-foreground max-w-2xl mx-auto">{department.description}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {deptAppointments.map((appointment: AppointmentWithDetails) => (
                      <LeaderCard key={appointment.id} appointment={appointment} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t">
          <p className="text-muted-foreground">
            For questions about leadership or to get involved, please contact our fellowship administrators.
          </p>
        </div>
      </div>
    </div>
  )
}
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getAppointmentByToken, updateAppointmentStatus } from "@/lib/data-utils"
import type { AppointmentWithDetails } from "@/lib/types"
import { CheckCircle, XCircle, Calendar, User, Building2, Clock } from "lucide-react"

interface InvitePageProps {
  params: { fellowship_id: string; token: string }
}

export default function InvitePage({ params }: InvitePageProps) {
  const [appointment, setAppointment] = useState<AppointmentWithDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasResponded, setHasResponded] = useState(false)

  useEffect(() => {
    const appointmentData = getAppointmentByToken(params.token)
    setAppointment(appointmentData || null)
    setHasResponded(appointmentData?.status !== "pending")
  }, [params.token])

  const handleResponse = async (response: "accepted" | "declined") => {
    if (!appointment) return

    setIsLoading(true)
    try {
      await updateAppointmentStatus(appointment.id, response)
      setAppointment((prev) => (prev ? { ...prev, status: response, respondedAt: new Date().toISOString() } : null))
      setHasResponded(true)
    } catch (error) {
      console.error("Failed to update appointment:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Invalid Invitation</h3>
            <p className="text-muted-foreground">
              This invitation link is invalid or has expired. Please contact your fellowship administrator.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Leadership Appointment</h1>
          <p className="text-muted-foreground">You have been invited to serve in a leadership position</p>
        </div>

        {/* Appointment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Appointment Details
            </CardTitle>
            <CardDescription>Please review the details of your leadership appointment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Person Info */}
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-lg font-medium text-primary">
                  {appointment.person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-foreground">{appointment.person.name}</h3>
                <p className="text-sm text-muted-foreground">{appointment.person.email}</p>
              </div>
            </div>

            {/* Position & Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Position</Label>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-foreground">{appointment.position.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">{appointment.position.description}</div>
                </div>
              </div>

              {appointment.department && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Department</Label>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <div className="font-medium text-foreground">{appointment.department.name}</div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{appointment.department.description}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Tenure Info */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Tenure Period</Label>
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <div className="font-medium text-foreground">{appointment.tenure.title}</div>
                  <Badge variant={appointment.tenure.status === "active" ? "default" : "secondary"}>
                    {appointment.tenure.status.charAt(0).toUpperCase() + appointment.tenure.status.slice(1)}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(appointment.tenure.startDate)} - {formatDate(appointment.tenure.endDate)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {hasResponded ? (
                appointment.status === "accepted" ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )
              ) : (
                <Clock className="h-5 w-5 text-amber-600" />
              )}
              {hasResponded ? "Response Recorded" : "Your Response"}
            </CardTitle>
            <CardDescription>
              {hasResponded
                ? `You ${appointment.status} this appointment on ${formatDate(appointment.respondedAt!)}`
                : "Please accept or decline this leadership appointment"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasResponded ? (
              <div className="text-center py-6">
                <Badge
                  variant={appointment.status === "accepted" ? "default" : "destructive"}
                  className="text-base px-4 py-2"
                >
                  {appointment.status === "accepted" ? "Appointment Accepted" : "Appointment Declined"}
                </Badge>
                <p className="text-sm text-muted-foreground mt-4">
                  {appointment.status === "accepted"
                    ? "Thank you for accepting this leadership position. You will be contacted with next steps."
                    : "Thank you for your response. The fellowship leadership has been notified."}
                </p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => handleResponse("accepted")} disabled={isLoading} className="flex-1" size="lg">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept Appointment
                </Button>
                <Button
                  onClick={() => handleResponse("declined")}
                  disabled={isLoading}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Decline Appointment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>This invitation was sent by the leadership team of Fellowship {params.fellowship_id}</p>
        </div>
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

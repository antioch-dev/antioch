"use client"

import { useState, useEffect } from "react"
import { RegistrationApproval } from "@/components/admin/registration-approval"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Download, Mail, Calendar, UserPlus, Send } from "lucide-react"
import { type Event, type Registration, mockAPI, mockFellowships } from "@/lib/mock-data"
import { notFound } from "next/navigation"

type RegistrationsPageProps = {
  params: {
    fellowship: string
    id: string
  }
}

export default function RegistrationsPage({ params }: RegistrationsPageProps) {
  const [event, setEvent] = useState<Event | null>(null)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [isManualDialogOpen, setIsManualDialogOpen] = useState(false)
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [selectedRegistrations, setSelectedRegistrations] = useState<string[]>([])

  const [manualForm, setManualForm] = useState({
    memberName: "",
    email: "",
    phone: "",
    fellowship: params.fellowship,
    notes: "",
    approvalStatus: "approved" as Registration["approvalStatus"],
  })

  const fellowship = mockFellowships.find((f) => f.slug === params.fellowship)

  if (!fellowship) {
    notFound()
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedEvent, fetchedRegistrations] = await Promise.all([
          mockAPI.getEventById(params.id),
          mockAPI.getRegistrationsByEvent(params.id),
        ])

        if (!fetchedEvent || fetchedEvent.fellowship !== params.fellowship) {
          notFound()
        }

        setEvent(fetchedEvent)
        setRegistrations(fetchedRegistrations)
      } catch (error) {
        console.error("Failed to load data:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }
    void loadData()
  }, [params.id, params.fellowship])

  const handleUpdateStatus = async (
    registrationId: string,
    status: Registration["approvalStatus"],
    message?: string,
  ) => {
    try {
      await mockAPI.updateRegistrationStatus(registrationId, status)
      setRegistrations((prev) =>
        prev.map((reg) =>
          reg.id === registrationId ? { ...reg, approvalStatus: status, approved: status === "approved" } : reg,
        ),
      )

      // Mock notification
      if (message) {
        console.log(`Notification sent to registration ${registrationId}: ${message}`)
      }
    } catch (error) {
      console.error("Failed to update registration status:", error)
    }
  }

  const handleExportRegistrations = () => {
    // Mock export functionality
    const csvData = registrations
      .map((reg) => [reg.memberName, reg.email, reg.phone, reg.approvalStatus, reg.registrationDate].join(","))
      .join("\n")
    const header = "Name,Email,Phone,Status,Registration Date\n"
    const blob = new Blob([header + csvData], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${event?.title}-registrations.csv`
    a.click()
  }

  const handleSendBulkEmail = () => {
    // Mock bulk email functionality
    const approvedEmails = registrations.filter((reg) => reg.approved).map((reg) => reg.email)
    alert(
      `Mock: Bulk email would be sent to ${approvedEmails.length} approved registrants:\n${approvedEmails.join("\n")}`,
    )
  }

  const handleManualRegistration = async () => {
    try {
      const newRegistration: Registration = {
        id: `manual-${Date.now()}`,
        eventId: params.id,
        memberName: manualForm.memberName,
        email: manualForm.email,
        phone: manualForm.phone,
        fellowship: manualForm.fellowship,
        notes: manualForm.notes,
        registrationDate: new Date().toISOString(),
        approvalStatus: manualForm.approvalStatus,
        approved: manualForm.approvalStatus === "approved",
        paymentProof: null,
        checkedIn: false,
        checkedInAt: null,
        manuallyAdded: true,
      }

      // Mock API call
      await mockAPI.createRegistration(newRegistration)
      setRegistrations((prev) => [...prev, newRegistration])

      // Reset form and close dialog
      setManualForm({
        memberName: "",
        email: "",
        phone: "",
        fellowship: params.fellowship,
        notes: "",
        approvalStatus: "approved",
      })
      setIsManualDialogOpen(false)

      alert(`Successfully added ${newRegistration.memberName} to the event!`)
    } catch (error) {
      console.error("Failed to add manual registration:", error)
      alert("Failed to add registration. Please try again.")
    }
  }

  const handleSendInviteLinks = () => {
    const selectedRegs = registrations.filter((reg) => selectedRegistrations.includes(reg.id))
    const inviteEmails = selectedRegs.map((reg) => reg.email)

    // Mock invite link sending
    alert(
      `Mock: Invite links would be sent to ${inviteEmails.length} registrants:\n${inviteEmails.join("\n")}\n\nInvite link: ${window.location.origin}/${params.fellowship}/events/${params.id}/live`,
    )

    setSelectedRegistrations([])
    setIsInviteDialogOpen(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  if (!event) {
    return notFound()
  }

  const approvedCount = registrations.filter((reg) => reg.approved).length
  const pendingCount = registrations.filter((reg) => reg.approvalStatus === "pending").length

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Registration Management</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage registrations for {event.title}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Dialog open={isManualDialogOpen} onOpenChange={setIsManualDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Manually
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Manual Registration</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="memberName">Full Name *</Label>
                    <Input
                      id="memberName"
                      value={manualForm.memberName}
                      onChange={(e) => setManualForm((prev) => ({ ...prev, memberName: e.target.value }))}
                      placeholder="Enter full name"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={manualForm.email}
                      onChange={(e) => setManualForm((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email address"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={manualForm.phone}
                      onChange={(e) => setManualForm((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter phone number"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Approval Status</Label>
                    <Select
                      value={manualForm.approvalStatus}
                      onValueChange={(value: Registration["approvalStatus"]) =>
                        setManualForm((prev) => ({ ...prev, approvalStatus: value }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={manualForm.notes}
                      onChange={(e) => setManualForm((prev) => ({ ...prev, notes: e.target.value }))}
                      placeholder="Add any notes about this registration"
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsManualDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleManualRegistration}
                      disabled={!manualForm.memberName || !manualForm.email}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      Add Registration
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900 dark:hover:to-indigo-900"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Invites
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Send Invite Links</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Select registrations to send invite links to:
                  </p>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {registrations.map((reg) => (
                      <div key={reg.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`reg-${reg.id}`}
                          checked={selectedRegistrations.includes(reg.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedRegistrations((prev) => [...prev, reg.id])
                            } else {
                              setSelectedRegistrations((prev) => prev.filter((id) => id !== reg.id))
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor={`reg-${reg.id}`} className="text-sm flex-1">
                          {reg.memberName} ({reg.email})
                          <Badge variant="outline" className="ml-2 text-xs">
                            {reg.approvalStatus}
                          </Badge>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSendInviteLinks}
                      disabled={selectedRegistrations.length === 0}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      Send Invites ({selectedRegistrations.length})
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" onClick={handleExportRegistrations} className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={handleSendBulkEmail} className="bg-transparent">
              <Mail className="w-4 h-4 mr-2" />
              Email All
            </Button>
          </div>
        </div>
      </div>

      {/* Event Summary */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Event Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Event Details</h3>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Date:</span> {formatDate(event.startDate)}
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Time:</span> {formatTime(event.startDate)} -{" "}
                  {formatTime(event.endDate)}
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Location:</span> {event.location}
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Registration Stats</h3>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Total:</span> {registrations.length}
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Approved:</span> {approvedCount}
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Pending:</span> {pendingCount}
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Event Type</h3>
              <div className="flex flex-wrap gap-2">
                {event.isHybrid && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    Hybrid Event
                  </Badge>
                )}
                {event.paymentRequired && (
                  <Badge
                    variant="outline"
                    className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                  >
                    Payment Required
                  </Badge>
                )}
                <Badge
                  variant={event.registrationEnabled ? "default" : "secondary"}
                  className={
                    event.registrationEnabled
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }
                >
                  Registration {event.registrationEnabled ? "Open" : "Closed"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registration Approval Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Registration Approvals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RegistrationApproval registrations={registrations} onUpdateStatus={handleUpdateStatus} />
        </CardContent>
      </Card>
    </div>
  )
}
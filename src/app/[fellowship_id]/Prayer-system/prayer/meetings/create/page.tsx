"use client"

import React, { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, X, Users, Mail, CheckCircle, Search, ArrowLeft } from "lucide-react"

const mockUsers = [
  { id: "1", name: "John Doe", email: "john.doe@example.com" },
  { id: "2", name: "Jane Smith", email: "jane.smith@example.com" },
  { id: "3", name: "Alex Johnson", email: "alex.johnson@example.com" },
  { id: "4", name: "Emily White", email: "emily.white@example.com" },
  { id: "5", name: "Michael Brown", email: "michael.brown@example.com" },
]

interface PrayerLayoutProps {
  children: React.ReactNode
  fellowshipName: string
}

const PrayerLayout = ({ children, fellowshipName }: PrayerLayoutProps) => (
  <div className="min-h-screen bg-gray-50 p-6 md:p-12">
    <div className="container mx-auto max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">{fellowshipName}</h1>
      </div>
      {children}
    </div>
  </div>
)

export default function CreateMeeting() {
  const params = useParams<{
    fellowship_id: string
  }>()

  const fellowship_id = params?.fellowship_id || ""

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [externalEmails, setExternalEmails] = useState<string[]>([])
  const [newEmail, setNewEmail] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    type: "",
    link: "",
    description: "",
    selectedAttendees: [] as typeof mockUsers,
  })

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAttendeeToggle = (user: (typeof mockUsers)[0]) => {
    const isSelected = formData.selectedAttendees.some((a) => a.id === user.id)
    if (isSelected) {
      setFormData({
        ...formData,
        selectedAttendees: formData.selectedAttendees.filter((a) => a.id !== user.id),
      })
    } else {
      setFormData({
        ...formData,
        selectedAttendees: [...formData.selectedAttendees, user],
      })
    }
  }

  const handleAddExternalEmail = () => {
    if (newEmail && !externalEmails.includes(newEmail)) {
      setExternalEmails([...externalEmails, newEmail])
      setNewEmail("")
    }
  }

  const handleRemoveExternalEmail = (email: string) => {
    setExternalEmails(externalEmails.filter((e) => e !== email))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log("[v0] Creating prayer meeting:", {
      ...formData,
      externalEmails,
    })

    const allAttendees = [
      ...formData.selectedAttendees.map((a) => ({ name: a.name, email: a.email, type: "member" })),
      ...externalEmails.map((email) => ({ name: email, email, type: "external" })),
    ]

    console.log("[v0] Sending email invitations to:", allAttendees)

    // Mock email content
    const emailContent = {
      subject: `Prayer Meeting Invitation: ${formData.title}`,
      body: `
        You're invited to join us for prayer!
        
        Meeting: ${formData.title}
        Date: ${new Date(formData.date).toLocaleDateString()}
        Time: ${formData.time}
        Location: ${formData.location}
        
        ${formData.description}
        
        ${formData.link ? `Join online: ${formData.link}` : ""}
        
        Please add this to your calendar and join us in prayer.
        
        Blessings,
        ${fellowship_id} Prayer Team
      `,
    }

    console.log("[v0] Email content:", emailContent)

    setIsConfirmationOpen(true)

    // Reset form
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      type: "",
      link: "",
      description: "",
      selectedAttendees: [],
    })
    setExternalEmails([])
  }

  return (
    <PrayerLayout fellowshipName={fellowship_id}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Prayer Meeting</h1>
            <p className="text-gray-600 mt-2">Schedule a new prayer meeting and invite attendees</p>
          </div>
        </div>

        <Card className="prayer-card-glow">
          <CardHeader>
            <CardTitle className="font-serif">Meeting Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Meeting Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Weekly Fellowship Prayer"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Fellowship Hall or Online - Zoom"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Meeting Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meeting type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Fellowship Prayer">General Fellowship Prayer</SelectItem>
                    <SelectItem value="Ministry-specific Prayer">Ministry-specific Prayer</SelectItem>
                    <SelectItem value="Special Event Prayer">Special Event Prayer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="link">Online Meeting Link (Optional)</Label>
                <Input
                  id="link"
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://zoom.us/j/123456789"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the purpose and focus of this prayer meeting..."
                  rows={3}
                  required
                />
              </div>

              {/* Attendee Selection */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Select Attendees</Label>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search members by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Member Selection */}
                <div className="max-h-48 overflow-y-auto border rounded-lg p-4 space-y-2">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={`user-${user.id}`}
                        checked={formData.selectedAttendees.some((a) => a.id === user.id)}
                        onCheckedChange={() => handleAttendeeToggle(user)}
                      />
                      <Label htmlFor={`user-${user.id}`} className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-sm text-gray-500">{user.email}</span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>

                {/* Selected Attendees Summary */}
                {formData.selectedAttendees.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Selected Members ({formData.selectedAttendees.length})
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.selectedAttendees.map((attendee) => (
                        <Badge key={attendee.id} variant="secondary" className="gap-1">
                          <Users className="h-3 w-3" />
                          {attendee.name}
                          <button
                            type="button"
                            onClick={() => handleAttendeeToggle(attendee)}
                            className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* External Email Input */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Add External Participants</Label>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="external@email.com"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddExternalEmail())}
                    />
                    <Button type="button" onClick={handleAddExternalEmail} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {externalEmails.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {externalEmails.map((email) => (
                        <Badge key={email} variant="outline" className="gap-1">
                          <Mail className="h-3 w-3" />
                          {email}
                          <button
                            type="button"
                            onClick={() => handleRemoveExternalEmail(email)}
                            className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 prayer-button">
                  Create Meeting & Send Invitations
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                Prayer Meeting Created
              </DialogTitle>
              <DialogDescription className="space-y-2">
                <p>
                  Prayer meeting created successfully! Email invitations have been sent to{" "}
                  {formData.selectedAttendees.length + externalEmails.length} participants.
                </p>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                  <p className="font-medium text-blue-900 mb-2">📧 Email notifications sent to:</p>
                  <ul className="space-y-1 text-blue-800">
                    {formData.selectedAttendees.map((attendee) => (
                      <li key={attendee.id}>
                        • {attendee.name} ({attendee.email})
                      </li>
                    ))}
                    {externalEmails.map((email) => (
                      <li key={email}>• {email}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-blue-700">📅 Calendar invites included with meeting details and location</p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end">
              <Button onClick={() => setIsConfirmationOpen(false)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PrayerLayout>
  )
}

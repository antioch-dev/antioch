"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ArrowLeft, Clock, User, Phone, Mail } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

export default function ScheduleFollowUpPage() {
  const [followUpDate, setFollowUpDate] = useState<Date>()
  const [selectedContact, setSelectedContact] = useState("")

  const contacts = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 123-4567",
      status: "New Visitor",
      stage: "Day 1-3",
      lastContact: "2024-01-15",
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike.chen@email.com",
      phone: "(555) 234-5678",
      status: "New Believer",
      stage: "Week 1-2",
      lastContact: "2024-01-10",
    },
    {
      id: "3",
      name: "Lisa Rodriguez",
      email: "lisa.r@email.com",
      phone: "(555) 345-6789",
      status: "Active Member",
      stage: "Month 1-3",
      lastContact: "2024-01-05",
    },
  ]

  const volunteers = [
    { id: "sarah-wilson", name: "Sarah Wilson", role: "Follow-up Team" },
    { id: "mike-johnson", name: "Mike Johnson", role: "Discipleship Coach" },
    { id: "lisa-davis", name: "Lisa Davis", role: "Follow-up Team" },
    { id: "john-smith", name: "John Smith", role: "Greeter" },
  ]

  const selectedContactData = contacts.find((c) => c.id === selectedContact)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Follow-up scheduled")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link href="/follow-up">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Follow-up
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Schedule Follow-up</h1>
              <p className="text-gray-600">Plan and assign follow-up activities</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Select Contact
              </CardTitle>
              <CardDescription>Choose the person for follow-up</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Person *</Label>
                <Select value={selectedContact} onValueChange={setSelectedContact}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a contact" />
                  </SelectTrigger>
                  <SelectContent>
                    {contacts.map((contact) => (
                      <SelectItem key={contact.id} value={contact.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{contact.name}</span>
                          <Badge variant="outline" className="ml-2">
                            {contact.status}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedContactData && (
                <Card className="bg-gray-50">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">{selectedContactData.name}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {selectedContactData.email}
                          </p>
                          <p className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {selectedContactData.phone}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Status:</span>
                            <Badge variant="secondary">{selectedContactData.status}</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Stage:</span>
                            <Badge variant="outline">{selectedContactData.stage}</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Last Contact:</span>
                            <span className="text-sm">{selectedContactData.lastContact}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Follow-up Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Follow-up Details
              </CardTitle>
              <CardDescription>Specify the follow-up activity and timing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="followupType">Follow-up Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phone-call">Phone Call</SelectItem>
                      <SelectItem value="text-message">Text Message</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="home-visit">Home Visit</SelectItem>
                      <SelectItem value="coffee-meeting">Coffee Meeting</SelectItem>
                      <SelectItem value="gift-delivery">Gift Delivery</SelectItem>
                      <SelectItem value="invitation">Event Invitation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High - Urgent</SelectItem>
                      <SelectItem value="medium">Medium - Normal</SelectItem>
                      <SelectItem value="low">Low - When Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Follow-up Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {followUpDate ? format(followUpDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={followUpDate} onSelect={setFollowUpDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="followupTime">Preferred Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8-12 PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12-5 PM)</SelectItem>
                      <SelectItem value="evening">Evening (5-8 PM)</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose/Goal</Label>
                <Textarea id="purpose" placeholder="What do you hope to accomplish with this follow-up?" rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Any special instructions or context..." rows={3} />
              </div>
            </CardContent>
          </Card>

          {/* Assignment */}
          <Card>
            <CardHeader>
              <CardTitle>Assignment</CardTitle>
              <CardDescription>Assign the follow-up to a volunteer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="assignedVolunteer">Assigned Volunteer *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select volunteer" />
                    </SelectTrigger>
                    <SelectContent>
                      {volunteers.map((volunteer) => (
                        <SelectItem key={volunteer.id} value={volunteer.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{volunteer.name}</span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {volunteer.role}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Select due date
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions for Volunteer</Label>
                <Textarea
                  id="instructions"
                  placeholder="Specific instructions or talking points for the volunteer..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Automation Options */}
          <Card>
            <CardHeader>
              <CardTitle>Automation & Reminders</CardTitle>
              <CardDescription>Set up automatic reminders and follow-up sequences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="reminderTime">Reminder for Volunteer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reminder time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-hour">1 hour before</SelectItem>
                      <SelectItem value="2-hours">2 hours before</SelectItem>
                      <SelectItem value="1-day">1 day before</SelectItem>
                      <SelectItem value="2-days">2 days before</SelectItem>
                      <SelectItem value="none">No reminder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="autoFollowUp">Auto Follow-up if No Response</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-days">After 3 days</SelectItem>
                      <SelectItem value="1-week">After 1 week</SelectItem>
                      <SelectItem value="2-weeks">After 2 weeks</SelectItem>
                      <SelectItem value="none">No auto follow-up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <Link href="/follow-up">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit">
              <Clock className="h-4 w-4 mr-2" />
              Schedule Follow-up
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

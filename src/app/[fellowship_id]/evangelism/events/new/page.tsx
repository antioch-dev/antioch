"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ArrowLeft, Plus, X, MapPin, Users } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

export default function CreateEventPage() {
  const [eventDate, setEventDate] = useState<Date>()
  const [materials, setMaterials] = useState<string[]>([])
  const [customMaterial, setCustomMaterial] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const eventTemplates = [
    {
      id: "car-wash",
      name: "Community Car Wash",
      type: "Service-Based",
      duration: "5 hours",
      volunteers: "10-15",
      materials: ["Soap", "Towels", "Gospel tracts", "QR codes", "Water hoses", "Buckets"],
      description: "Free car wash for the community with gospel conversations",
    },
    {
      id: "parenting-seminar",
      name: "Parenting Seminar",
      type: "Educational",
      duration: "2 hours",
      volunteers: "5-8",
      materials: ["Workbooks", "Childcare", "Refreshments", "Name tags", "Pens"],
      description: "Practical parenting workshop with biblical principles",
    },
    {
      id: "street-evangelism",
      name: "Street Evangelism",
      type: "Direct Outreach",
      duration: "3 hours",
      volunteers: "8-12",
      materials: ["Training materials", "Conversation guides", "Tracts", "Water bottles"],
      description: "Conversational evangelism in public spaces",
    },
    {
      id: "grocery-giveaway",
      name: "Grocery Giveaway",
      type: "Service-Based",
      duration: "4 hours",
      volunteers: "15-20",
      materials: ["Groceries", "Bags", "Tables", "Prayer cards", "Volunteers shirts"],
      description: "Free groceries for families in need with prayer opportunities",
    },
  ]

  const handleTemplateSelect = (templateId: string) => {
    const template = eventTemplates.find((t) => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setMaterials(template.materials)
    }
  }

  const addCustomMaterial = () => {
    if (customMaterial && !materials.includes(customMaterial)) {
      setMaterials((prev) => [...prev, customMaterial])
      setCustomMaterial("")
    }
  }

  const removeMaterial = (material: string) => {
    setMaterials((prev) => prev.filter((m) => m !== material))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Event created")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link href="/events">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
              <p className="text-gray-600">Plan your next evangelism outreach activity</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Event Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Event Template (Optional)</CardTitle>
              <CardDescription>Start with a pre-configured event template or create from scratch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eventTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedTemplate === template.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium">{template.name}</h3>
                      <Badge variant="outline">{template.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="space-y-1 text-xs text-gray-500">
                      <p>Duration: {template.duration}</p>
                      <p>Volunteers: {template.volunteers}</p>
                    </div>
                  </div>
                ))}
              </div>
              {selectedTemplate && (
                <div className="mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedTemplate("")
                      setMaterials([])
                    }}
                  >
                    Clear Template
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Basic Event Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Event Information
              </CardTitle>
              <CardDescription>Basic details about your event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="eventName">Event Name *</Label>
                  <Input
                    id="eventName"
                    placeholder="Enter event name"
                    defaultValue={selectedTemplate ? eventTemplates.find((t) => t.id === selectedTemplate)?.name : ""}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type *</Label>
                  <Select
                    defaultValue={selectedTemplate ? eventTemplates.find((t) => t.id === selectedTemplate)?.type : ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Service-Based">Service-Based Evangelism</SelectItem>
                      <SelectItem value="Educational">Community Seminar</SelectItem>
                      <SelectItem value="Direct Outreach">Direct Outreach</SelectItem>
                      <SelectItem value="Training">Training Event</SelectItem>
                      <SelectItem value="Social">Social Event</SelectItem>
                      <SelectItem value="Special">Special Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Event Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the event and its purpose..."
                  defaultValue={
                    selectedTemplate ? eventTemplates.find((t) => t.id === selectedTemplate)?.description : ""
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Event Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {eventDate ? format(eventDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={eventDate} onSelect={setEventDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input id="startTime" type="time" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time *</Label>
                  <Input id="endTime" type="time" required />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & Logistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Location & Logistics
              </CardTitle>
              <CardDescription>Where and how the event will take place</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="venue">Venue *</Label>
                  <Input id="venue" placeholder="Event location" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Expected Capacity</Label>
                  <Input id="capacity" type="number" placeholder="Number of attendees" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Textarea id="address" placeholder="Complete address with directions if needed" rows={2} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="parking">Parking Information</Label>
                  <Textarea id="parking" placeholder="Parking instructions..." rows={2} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accessibility">Accessibility Notes</Label>
                  <Textarea id="accessibility" placeholder="Accessibility information..." rows={2} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Volunteer Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Volunteer Requirements
              </CardTitle>
              <CardDescription>Staffing needs for the event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="volunteersNeeded">Volunteers Needed</Label>
                  <Input
                    id="volunteersNeeded"
                    type="number"
                    placeholder="Number of volunteers"
                    defaultValue={
                      selectedTemplate
                        ? eventTemplates.find((t) => t.id === selectedTemplate)?.volunteers.split("-")[0]
                        : ""
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="setupTime">Setup Time</Label>
                  <Input id="setupTime" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cleanupTime">Cleanup Time</Label>
                  <Input id="cleanupTime" type="time" />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Volunteer Roles Needed</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "Event Coordinator",
                    "Setup Team",
                    "Greeters",
                    "Registration",
                    "Evangelism Team",
                    "Prayer Team",
                    "Cleanup Team",
                    "Childcare",
                    "Security",
                    "Photography",
                    "Sound/Tech",
                    "Refreshments",
                  ].map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox id={role} />
                      <Label htmlFor={role} className="text-sm">
                        {role}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="volunteerInstructions">Special Instructions for Volunteers</Label>
                <Textarea
                  id="volunteerInstructions"
                  placeholder="Any special instructions, dress code, or requirements..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Materials & Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Materials & Resources</CardTitle>
              <CardDescription>Items needed for the event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Materials Needed</Label>
                <div className="flex space-x-2">
                  <Input
                    value={customMaterial}
                    onChange={(e) => setCustomMaterial(e.target.value)}
                    placeholder="Add material or resource..."
                  />
                  <Button type="button" onClick={addCustomMaterial} variant="outline">
                    Add
                  </Button>
                </div>
              </div>

              {materials.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Materials</Label>
                  <div className="flex flex-wrap gap-2">
                    {materials.map((material) => (
                      <Badge key={material} variant="secondary" className="flex items-center gap-1">
                        {material}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeMaterial(material)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="budget">Estimated Budget</Label>
                  <Input id="budget" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fundingSource">Funding Source</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select funding source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="church-budget">Church Budget</SelectItem>
                      <SelectItem value="evangelism-fund">Evangelism Fund</SelectItem>
                      <SelectItem value="donations">Donations</SelectItem>
                      <SelectItem value="fundraising">Fundraising</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Follow-up Planning */}
          <Card>
            <CardHeader>
              <CardTitle>Follow-up Planning</CardTitle>
              <CardDescription>Plan how to follow up with event attendees</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Follow-up Methods</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "Visitor Cards",
                    "QR Code Sign-ups",
                    "Email Collection",
                    "Phone Numbers",
                    "Social Media",
                    "Personal Invitations",
                  ].map((method) => (
                    <div key={method} className="flex items-center space-x-2">
                      <Checkbox id={method} />
                      <Label htmlFor={method} className="text-sm">
                        {method}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="followupTimeline">Follow-up Timeline</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="When to follow up" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="same-day">Same Day</SelectItem>
                      <SelectItem value="next-day">Next Day</SelectItem>
                      <SelectItem value="within-week">Within a Week</SelectItem>
                      <SelectItem value="custom">Custom Timeline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="followupAssignee">Follow-up Coordinator</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign coordinator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah-wilson">Sarah Wilson</SelectItem>
                      <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                      <SelectItem value="lisa-davis">Lisa Davis</SelectItem>
                      <SelectItem value="john-smith">John Smith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="followupNotes">Follow-up Strategy Notes</Label>
                <Textarea id="followupNotes" placeholder="Describe the follow-up strategy and goals..." rows={3} />
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <Link href="/events">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

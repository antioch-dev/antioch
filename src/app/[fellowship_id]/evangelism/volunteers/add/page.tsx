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
import { CalendarIcon, ArrowLeft, UserPlus, X } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

export default function AddVolunteerPage() {
  const [joinDate, setJoinDate] = useState<Date>()
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [customSkill, setCustomSkill] = useState("")

  const availableRoles = [
    {
      role: "Greeter",
      description: "Welcome visitors and collect information",
      training: "Basic hospitality training",
    },
    {
      role: "Follow-Up Team",
      description: "Make calls and write personal notes",
      training: "Communication skills & confidentiality",
    },
    {
      role: "Discipleship Coach",
      description: "Mentor new believers",
      training: "Discipleship principles & mentoring",
    },
    {
      role: "Event Coordinator",
      description: "Plan and execute evangelism events",
      training: "Event planning & logistics",
    },
    {
      role: "Prayer Team",
      description: "Provide prayer support for outreach",
      training: "Prayer ministry basics",
    },
    {
      role: "Digital Outreach",
      description: "Manage social media and online presence",
      training: "Digital evangelism tools",
    },
  ]

  const availableSkills = [
    "Public Speaking",
    "Event Planning",
    "Social Media",
    "Photography",
    "Graphic Design",
    "Music/Worship",
    "Counseling",
    "Teaching",
    "Administration",
    "Technology",
    "Languages",
    "Healthcare",
  ]

  const handleRoleToggle = (role: string) => {
    setSelectedRoles((prev) => (prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]))
  }

  const handleSkillToggle = (skill: string) => {
    setSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const addCustomSkill = () => {
    if (customSkill && !skills.includes(customSkill)) {
      setSkills((prev) => [...prev, customSkill])
      setCustomSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Volunteer added")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link href="/volunteers">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Volunteers
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Volunteer</h1>
              <p className="text-gray-600">Register a new team member for evangelism ministry</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
              <CardDescription>Basic contact details and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" placeholder="Enter first name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" placeholder="Enter last name" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="Enter email address" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" placeholder="(555) 123-4567" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Enter full address" rows={3} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age">Age Range</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-25">18-25</SelectItem>
                      <SelectItem value="26-35">26-35</SelectItem>
                      <SelectItem value="36-45">36-45</SelectItem>
                      <SelectItem value="46-55">46-55</SelectItem>
                      <SelectItem value="56-65">56-65</SelectItem>
                      <SelectItem value="over-65">Over 65</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="membershipStatus">Membership Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Church Member</SelectItem>
                      <SelectItem value="regular-attender">Regular Attender</SelectItem>
                      <SelectItem value="new-attender">New Attender</SelectItem>
                      <SelectItem value="visitor">Visitor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Join Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {joinDate ? format(joinDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={joinDate} onSelect={setJoinDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Volunteer Roles */}
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Roles</CardTitle>
              <CardDescription>Select the roles this volunteer is interested in or qualified for</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {availableRoles.map((roleInfo) => (
                  <div key={roleInfo.role} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={roleInfo.role}
                        checked={selectedRoles.includes(roleInfo.role)}
                        onCheckedChange={() => handleRoleToggle(roleInfo.role)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={roleInfo.role} className="font-medium cursor-pointer">
                          {roleInfo.role}
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">{roleInfo.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          <strong>Training Required:</strong> {roleInfo.training}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedRoles.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Roles</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoles.map((role) => (
                      <Badge key={role} variant="secondary">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills & Experience */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Experience</CardTitle>
              <CardDescription>Relevant skills and ministry experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Skills & Talents</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableSkills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        checked={skills.includes(skill)}
                        onCheckedChange={() => handleSkillToggle(skill)}
                      />
                      <Label htmlFor={skill} className="text-sm">
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Custom Skill</Label>
                <div className="flex space-x-2">
                  <Input
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    placeholder="Add custom skill..."
                  />
                  <Button type="button" onClick={addCustomSkill} variant="outline">
                    Add
                  </Button>
                </div>
              </div>

              {skills.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="experience">Ministry Experience</Label>
                <Textarea
                  id="experience"
                  placeholder="Describe any previous ministry or volunteer experience..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="testimony">Personal Testimony (Optional)</Label>
                <Textarea id="testimony" placeholder="Brief personal testimony or faith story..." rows={4} />
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
              <CardDescription>When is this volunteer available to serve?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Days Available</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    "Sunday Morning",
                    "Sunday Evening",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox id={day} />
                      <Label htmlFor={day} className="text-sm">
                        {day}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timePreference">Time Preference</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8-12 PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12-5 PM)</SelectItem>
                      <SelectItem value="evening">Evening (5-8 PM)</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="How often?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="as-needed">As Needed</SelectItem>
                      <SelectItem value="special-events">Special Events Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="limitations">Schedule Limitations</Label>
                <Textarea id="limitations" placeholder="Any schedule constraints or limitations..." rows={3} />
              </div>
            </CardContent>
          </Card>

          {/* Training & Background */}
          <Card>
            <CardHeader>
              <CardTitle>Training & Background Check</CardTitle>
              <CardDescription>Training requirements and background verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="trainingStatus">Training Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-started">Not Started</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backgroundCheck">Background Check</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-required">Not Required</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Training Modules Needed</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Evangelism Conversations",
                    "Confidentiality & Boundaries",
                    "Discipleship Principles",
                    "Digital Outreach Tools",
                    "Event Planning",
                    "Prayer Ministry",
                  ].map((module) => (
                    <div key={module} className="flex items-center space-x-2">
                      <Checkbox id={module} />
                      <Label htmlFor={module} className="text-sm">
                        {module}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input id="emergencyContact" placeholder="Name and phone number" />
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Any other relevant information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="motivation">Why do you want to volunteer?</Label>
                <Textarea id="motivation" placeholder="Share your heart for evangelism and ministry..." rows={4} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals">Ministry Goals</Label>
                <Textarea id="goals" placeholder="What do you hope to accomplish through this ministry?" rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialNeeds">Special Accommodations</Label>
                <Textarea
                  id="specialNeeds"
                  placeholder="Any accommodations or special needs we should be aware of..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea id="additionalNotes" placeholder="Any other information you'd like to share..." rows={3} />
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <Link href="/volunteers">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          
            <Button type="submit">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Volunteer
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

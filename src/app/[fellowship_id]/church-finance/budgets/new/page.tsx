"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const ministryDepartments = [
  "Youth Ministry",
  "Children's Ministry",
  "Worship Ministry",
  "Outreach Ministry",
  "Missions",
  "Administration",
  "Facilities",
  "Education",
  "Small Groups",
  "Other",
]

export default function NewBudgetRequestPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requestedAmount: "",
    ministryDepartment: "",
    purpose: "",
    timelineStart: "",
    timelineEnd: "",
    justification: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In real app, this would submit to API
    console.log("Budget request:", formData)
    alert("Budget request submitted successfully!")
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="font-serif font-black text-xl text-gray-900">Church Finance</h1>
              </Link>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/income" className="text-gray-600 hover:text-primary font-medium">
                Income
              </Link>
              <Link href="/expenses" className="text-gray-600 hover:text-primary font-medium">
                Expenses
              </Link>
              <Link href="/budgets" className="text-primary font-medium">
                Budgets
              </Link>
              <Link href="/reports" className="text-gray-600 hover:text-primary font-medium">
                Reports
              </Link>
              <Link href="/assets" className="text-gray-600 hover:text-primary font-medium">
                Assets
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/budgets">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Budgets
            </Link>
          </Button>
          <div>
            <h1 className="font-serif font-black text-3xl text-gray-900">Submit Budget Request</h1>
            <p className="text-gray-600">Request funding for ministry projects and activities</p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif font-bold">Budget Request Details</CardTitle>
            <CardDescription>Provide detailed information about your funding request</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Request Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief title for your budget request"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="requestedAmount">Requested Amount *</Label>
                  <Input
                    id="requestedAmount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.requestedAmount}
                    onChange={(e) => setFormData({ ...formData, requestedAmount: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ministryDepartment">Ministry Department *</Label>
                  <Select
                    value={formData.ministryDepartment}
                    onValueChange={(value) => setFormData({ ...formData, ministryDepartment: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {ministryDepartments.map((department) => (
                        <SelectItem key={department} value={department}>
                          {department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the project or activity"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose & Goals *</Label>
                <Textarea
                  id="purpose"
                  placeholder="Explain the purpose and expected outcomes of this request"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timelineStart">Start Date</Label>
                  <Input
                    id="timelineStart"
                    type="date"
                    value={formData.timelineStart}
                    onChange={(e) => setFormData({ ...formData, timelineStart: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timelineEnd">End Date</Label>
                  <Input
                    id="timelineEnd"
                    type="date"
                    value={formData.timelineEnd}
                    onChange={(e) => setFormData({ ...formData, timelineEnd: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="justification">Budget Justification</Label>
                <Textarea
                  id="justification"
                  placeholder="Provide a detailed breakdown of how the funds will be used"
                  value={formData.justification}
                  onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Submission Guidelines</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Budget requests are reviewed monthly by the Finance Committee</li>
                  <li>• Requests over $5,000 require additional approval from the Board</li>
                  <li>• Please allow 2-4 weeks for review and approval</li>
                  <li>• You will be notified via email once a decision is made</li>
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  Submit Request
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/budgets">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

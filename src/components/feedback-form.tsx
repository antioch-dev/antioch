"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, MessageSquare, Users, Bug } from "lucide-react"

type FeedbackCategory = "general" | "fellowship" | "bugs"

interface FormData {
  subject: string
  description: string
  category: FeedbackCategory
  contactEmail: string
  contactName: string
  stepsToReproduce: string
}

const categoryOptions = [
  {
    value: "general" as const,
    label: "General Feedback",
    description: "Comments, suggestions, or praise",
    icon: MessageSquare,
  },
  {
    value: "fellowship" as const,
    label: "Fellowship Program",
    description: "Questions about the fellowship program",
    icon: Users,
  },
  {
    value: "bugs" as const,
    label: "Bug Report",
    description: "Technical issues or errors",
    icon: Bug,
  },
]

export function FeedbackForm() {
  const [formData, setFormData] = useState<FormData>({
    subject: "",
    description: "",
    category: "general",
    contactEmail: "",
    contactName: "",
    stepsToReproduce: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit feedback")
      }

      setSubmitStatus("success")
      // Reset form
      setFormData({
        subject: "",
        description: "",
        category: "general",
        contactEmail: "",
        contactName: "",
        stepsToReproduce: "",
      })
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const selectedCategory = categoryOptions.find((opt) => opt.value === formData.category)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {selectedCategory && <selectedCategory.icon className="h-5 w-5 text-primary" />}
          Submit Feedback
        </CardTitle>
        <CardDescription>
          All fields marked with * are required. We'll get back to you if you provide contact information.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category">Feedback Type *</Label>
            <Select
              value={formData.category}
              onValueChange={(value: FeedbackCategory) => updateFormData("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select feedback type" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <option.icon className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => updateFormData("subject", e.target.value)}
              placeholder="Brief summary of your feedback"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description *
              {formData.category === "bugs" && (
                <span className="text-sm text-muted-foreground ml-2">Please describe the issue in detail</span>
              )}
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
              placeholder={
                formData.category === "bugs"
                  ? "Describe what happened, what you expected, and any error messages you saw..."
                  : "Share your thoughts, suggestions, or questions..."
              }
              rows={4}
              required
            />
          </div>

          {/* Steps to Reproduce (for bugs only) */}
          {formData.category === "bugs" && (
            <div className="space-y-2">
              <Label htmlFor="stepsToReproduce">Steps to Reproduce</Label>
              <Textarea
                id="stepsToReproduce"
                value={formData.stepsToReproduce}
                onChange={(e) => updateFormData("stepsToReproduce", e.target.value)}
                placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                rows={3}
              />
              <p className="text-sm text-muted-foreground">Help us reproduce the issue by listing the steps you took</p>
            </div>
          )}

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="border-t border-border pt-4">
              <h3 className="font-medium text-foreground mb-2">Contact Information (Optional)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Provide your contact details if you'd like us to follow up with you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Your Name</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => updateFormData("contactName", e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email Address</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => updateFormData("contactEmail", e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </div>

          {/* Submit Status */}
          {submitStatus === "success" && (
            <Alert className="border-primary/20 bg-primary/5">
              <CheckCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary">
                Thank you! Your feedback has been submitted successfully. We'll review it and get back to you if needed.
              </AlertDescription>
            </Alert>
          )}

          {submitStatus === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {errorMessage || "There was an error submitting your feedback. Please try again."}
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !formData.subject || !formData.description}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

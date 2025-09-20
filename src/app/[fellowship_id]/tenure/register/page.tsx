"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UserPlus, Save, User } from "lucide-react"

interface RegisterPageProps {
  params: { fellowship_id: string }
}

export default function RegisterPage({ params }: RegisterPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock registration - in real app, this would call an API
      const newPerson = {
        ...formData,
        fellowshipId: params.fellowship_id,
        photoUrl: null,
        id: `person_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      console.log("Registering new person:", newPerson)

      // Redirect to a success page or back to the appointment if there's a token
      router.push(`/${params.fellowship_id}/leadership/register/success`)
    } catch (error) {
      console.error("Failed to register:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = formData.name && formData.email && formData.phone

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Leadership Registration</h1>
          <p className="text-muted-foreground">Complete your profile to join the leadership team</p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Please provide your details to complete your leadership registration</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Your name as it will appear in the directory</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Primary contact email</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">Contact phone number</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio (Optional)</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us a bit about yourself, your experience, and your heart for ministry..."
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  rows={4}
                />
                <p className="text-sm text-muted-foreground">
                  This will be displayed on your leadership profile (optional)
                </p>
              </div>

              {/* Preview */}
              {isFormValid && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile Preview
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Name:</span>
                      <span className="text-sm font-medium">{formData.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Email:</span>
                      <span className="text-sm font-medium">{formData.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Phone:</span>
                      <span className="text-sm font-medium">{formData.phone}</span>
                    </div>
                    {formData.bio && (
                      <div className="pt-2 border-t">
                        <span className="text-sm text-muted-foreground">Bio:</span>
                        <p className="text-sm mt-1">{formData.bio}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-center pt-6 border-t">
                <Button type="submit" disabled={isLoading || !isFormValid} size="lg">
                  {isLoading ? (
                    "Registering..."
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Complete Registration
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What happens next?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Your profile will be created and linked to any pending appointments
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                You can accept or decline leadership positions using invitation links
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Your profile will appear on the public leadership directory when appointed
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                You can update your information anytime through the fellowship administrators
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Registration for Fellowship {params.fellowship_id} Leadership Team</p>
        </div>
      </div>
    </div>
  )
}

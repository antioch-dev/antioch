"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { CheckCircle, Church, Users, FileText, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  fellowshipName: string
  country: string
  city: string
  leaderName: string
  leaderEmail: string
  leaderPhone: string
  description: string
  website: string
  establishedYear: string
  memberCount: string
  meetingAddress: string
  serviceLanguages: string[]
  ministryFocus: string[]
  agreeToTerms: boolean
  agreeToDataProcessing: boolean
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    fellowshipName: "",
    country: "",
    city: "",
    leaderName: "",
    leaderEmail: "",
    leaderPhone: "",
    description: "",
    website: "",
    establishedYear: "",
    memberCount: "",
    meetingAddress: "",
    serviceLanguages: [],
    ministryFocus: [],
    agreeToTerms: false,
    agreeToDataProcessing: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { toast } = useToast()

  const countries = [
    "China",
    "Singapore",
    "Japan",
    "South Korea",
    "Malaysia",
    "Thailand",
    "Philippines",
    "Indonesia",
    "Vietnam",
    "India",
    "Australia",
    "New Zealand",
    "Hong Kong",
    "Taiwan",
    "Myanmar",
    "Cambodia",
    "Laos",
    "Brunei",
  ]

  const languages = [
    "English",
    "Chinese (Mandarin)",
    "Chinese (Cantonese)",
    "Japanese",
    "Korean",
    "Malay",
    "Thai",
    "Vietnamese",
    "Filipino",
    "Indonesian",
    "Tamil",
    "Hindi",
  ]

  const ministryAreas = [
    "Youth Ministry",
    "Family Ministry",
    "Missions",
    "Community Outreach",
    "Worship & Music",
    "Bible Study",
    "Prayer Ministry",
    "Counseling",
    "Children's Ministry",
    "Senior Ministry",
    "International Ministry",
  ]

  const handleInputChange = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLanguageChange = (language: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      serviceLanguages: checked
        ? [...prev.serviceLanguages, language]
        : prev.serviceLanguages.filter((l) => l !== language),
    }))
  }

  const handleMinistryChange = (ministry: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      ministryFocus: checked ? [...prev.ministryFocus, ministry] : prev.ministryFocus.filter((m) => m !== ministry),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate required fields
    const requiredFields = ["fellowshipName", "country", "city", "leaderName", "leaderEmail", "description"]

    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        toast({
          title: "Missing Information",
          description: `Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.`,
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }
    }

    if (!formData.agreeToTerms || !formData.agreeToDataProcessing) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the terms and conditions and data processing policy.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Mock API submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setShowConfirmation(true)

      // Reset form
      setFormData({
        fellowshipName: "",
        country: "",
        city: "",
        leaderName: "",
        leaderEmail: "",
        leaderPhone: "",
        description: "",
        website: "",
        establishedYear: "",
        memberCount: "",
        meetingAddress: "",
        serviceLanguages: [],
        ministryFocus: [],
        agreeToTerms: false,
        agreeToDataProcessing: false,
      })
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Register Your Fellowship</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join the Antioch platform and connect your fellowship with a global community of believers. Fill out the
            form below to get started.
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-3xl">
            <CardTitle className="flex items-center text-xl">
              <Church className="h-6 w-6 mr-2" />
              Fellowship Registration Form
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fellowshipName">Fellowship Name *</Label>
                    <Input
                      id="fellowshipName"
                      value={formData.fellowshipName}
                      onChange={(e) => handleInputChange("fellowshipName", e.target.value)}
                      placeholder="e.g., Grace Fellowship Beijing"
                      required
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://your-fellowship.org"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="e.g., Beijing"
                      required
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="establishedYear">Year Established</Label>
                    <Input
                      id="establishedYear"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={formData.establishedYear}
                      onChange={(e) => handleInputChange("establishedYear", e.target.value)}
                      placeholder="2020"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="memberCount">Approximate Member Count</Label>
                    <Select
                      value={formData.memberCount}
                      onValueChange={(value) => handleInputChange("memberCount", value)}
                    >
                      <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-25">1-25 members</SelectItem>
                        <SelectItem value="26-50">26-50 members</SelectItem>
                        <SelectItem value="51-100">51-100 members</SelectItem>
                        <SelectItem value="101-200">101-200 members</SelectItem>
                        <SelectItem value="201-500">201-500 members</SelectItem>
                        <SelectItem value="500+">500+ members</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-6">
                  <Label htmlFor="meetingAddress">Meeting Address</Label>
                  <Textarea
                    id="meetingAddress"
                    value={formData.meetingAddress}
                    onChange={(e) => handleInputChange("meetingAddress", e.target.value)}
                    placeholder="Full address where your fellowship meets"
                    rows={2}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                  />
                </div>

                <div className="mt-6">
                  <Label htmlFor="description">Fellowship Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Tell us about your fellowship, its mission, vision, and community..."
                    rows={4}
                    required
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                  />
                </div>
              </div>

              {/* Leadership Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Leadership Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="leaderName">Primary Leader's Name *</Label>
                    <Input
                      id="leaderName"
                      value={formData.leaderName}
                      onChange={(e) => handleInputChange("leaderName", e.target.value)}
                      placeholder="Full name"
                      required
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="leaderPhone">Phone Number</Label>
                    <Input
                      id="leaderPhone"
                      type="tel"
                      value={formData.leaderPhone}
                      onChange={(e) => handleInputChange("leaderPhone", e.target.value)}
                      placeholder="+86 138 0013 8000"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="leaderEmail">Primary Contact Email *</Label>
                    <Input
                      id="leaderEmail"
                      type="email"
                      value={formData.leaderEmail}
                      onChange={(e) => handleInputChange("leaderEmail", e.target.value)}
                      placeholder="leader@fellowship.org"
                      required
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Service Languages */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Languages</h3>
                <p className="text-sm text-gray-600 mb-4">Select all languages used in your services:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {languages.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={`lang-${language}`}
                        checked={formData.serviceLanguages.includes(language)}
                        onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                      />
                      <Label htmlFor={`lang-${language}`} className="text-sm">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ministry Focus */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ministry Focus Areas</h3>
                <p className="text-sm text-gray-600 mb-4">Select your primary ministry areas:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {ministryAreas.map((ministry) => (
                    <div key={ministry} className="flex items-center space-x-2">
                      <Checkbox
                        id={`ministry-${ministry}`}
                        checked={formData.ministryFocus.includes(ministry)}
                        onCheckedChange={(checked) => handleMinistryChange(ministry, checked as boolean)}
                      />
                      <Label htmlFor={`ministry-${ministry}`} className="text-sm">
                        {ministry}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Terms and Agreements
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <a href="/terms" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                        Terms and Conditions
                      </a>{" "}
                      and understand that my fellowship application will be reviewed before approval.
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToDataProcessing"
                      checked={formData.agreeToDataProcessing}
                      onCheckedChange={(checked) => handleInputChange("agreeToDataProcessing", checked as boolean)}
                    />
                    <Label htmlFor="agreeToDataProcessing" className="text-sm leading-relaxed">
                      I consent to the processing of the provided data according to the{" "}
                      <a href="/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                        Privacy Policy
                      </a>{" "}
                      for the purpose of fellowship registration and platform services.
                    </Label>
                  </div>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="bg-blue-50 p-6 rounded-2xl">
                <h3 className="font-semibold text-blue-900 mb-3">What happens after submission?</h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li className="flex items-start">
                    <span className="font-medium mr-2">1.</span>
                    Your application will be reviewed by our verification team within 2-3 business days
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">2.</span>
                    We may contact you for additional information or clarification
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">3.</span>
                    Upon approval, you'll receive setup instructions and your custom subdomain
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">4.</span>
                    Your fellowship will be listed in our directory and gain access to all platform features
                  </li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting Application..." : "Submit Fellowship Registration"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Confirmation Modal */}
        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <DialogTitle className="text-center text-xl">Application Submitted Successfully!</DialogTitle>
              <DialogDescription className="text-center">
                Thank you for registering your fellowship with Antioch. We've received your application and will review
                it within 2-3 business days. You'll receive email updates on the status of your application.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => setShowConfirmation(false)}
                className="px-8 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Continue
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, HeadphonesIcon, Globe, Users, Shield, Heart } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { ScrollAnimation } from "@/components/scroll-animation"

interface ContactFormData {
  name: string
  email: string
  fellowship: string
  subject: string
  category: string
  message: string
}

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email within 24 hours",
    contact: "support@antiochplatform.org",
    action: "Send Email",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our support team",
    contact: "+65 6123 4567",
    action: "Call Now",
    color: "from-green-500 to-green-600",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with us in real-time",
    contact: "Available 9 AM - 6 PM SGT",
    action: "Start Chat",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: HeadphonesIcon,
    title: "Technical Support",
    description: "Specialized technical assistance",
    contact: "tech@antiochplatform.org",
    action: "Get Help",
    color: "from-orange-500 to-orange-600",
  },
]

const offices = [
  {
    city: "Singapore",
    address: "123 Faith Street, Suite 456",
    postal: "Singapore 123456",
    phone: "+65 6123 4567",
    email: "singapore@antiochplatform.org",
    hours: "Mon-Fri: 9 AM - 6 PM SGT",
    isHeadquarters: true,
  },
  {
    city: "Hong Kong",
    address: "789 Hope Avenue, Floor 12",
    postal: "Hong Kong",
    phone: "+852 2345 6789",
    email: "hongkong@antiochplatform.org",
    hours: "Mon-Fri: 9 AM - 6 PM HKT",
    isHeadquarters: false,
  },
  {
    city: "Seoul",
    address: "456 Grace Road, Building B",
    postal: "Seoul 12345, South Korea",
    phone: "+82 2 1234 5678",
    email: "seoul@antiochplatform.org",
    hours: "Mon-Fri: 9 AM - 6 PM KST",
    isHeadquarters: false,
  },
]

const categories = [
  "General Inquiry",
  "Technical Support",
  "Fellowship Registration",
  "Billing & Payments",
  "Feature Request",
  "Bug Report",
  "Partnership Inquiry",
  "Media & Press",
  "Other",
]

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    fellowship: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate required fields
    const requiredFields = ["name", "email", "subject", "category", "message"]

    for (const field of requiredFields) {
      if (!formData[field as keyof ContactFormData]) {
        toast({
          title: "Missing Information",
          description: `Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.`,
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }
    }

    // Mock API submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setShowConfirmation(true)

      // Reset form
      setFormData({
        name: "",
        email: "",
        fellowship: "",
        subject: "",
        category: "",
        message: "",
      })
    } catch{
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <ScrollAnimation animation="fade-up">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Get in{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {`We're here to help you succeed. Reach out to our team for support, questions, or just to say hello.`}
            </p>
          </div>
        </ScrollAnimation>

        {/* Contact Methods */}
        <ScrollAnimation animation="fade-up" delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl hover:scale-105 text-center"
              >
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                  <p className="text-sm font-medium text-gray-800 mb-4">{method.contact}</p>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ScrollAnimation animation="fade-right">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-3xl">
                <CardTitle className="flex items-center text-xl">
                  <Send className="h-6 w-6 mr-2" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="fellowship">Fellowship Name (Optional)</Label>
                    <Input
                      id="fellowship"
                      value={formData.fellowship}
                      onChange={(e) => handleInputChange("fellowship", e.target.value)}
                      placeholder="Your fellowship name"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief subject line"
                        required
                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl resize-none"
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-2xl">
                    <p className="text-sm text-blue-800">
                      <strong>Response Time:</strong> We typically respond within 24 hours during business days. For urgent technical issues, please use our live chat or phone support.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                        Sending Message...
                      </div>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollAnimation>

          {/* Office Locations */}
          <div className="space-y-8">
            <ScrollAnimation animation="fade-left">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Offices</h2>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <Card
                      key={index}
                      className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl hover:scale-105"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                              {office.city}
                              {office.isHeadquarters && (
                                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                  Headquarters
                                </span>
                              )}
                            </h3>
                          </div>
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>

                        <div className="space-y-3 text-sm text-gray-600">
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                            <div>
                              <p>{office.address}</p>
                              <p>{office.postal}</p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                            <p>{office.phone}</p>
                          </div>

                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                            <p>{office.email}</p>
                          </div>

                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                            <p>{office.hours}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            {/* FAQ Section */}
            <ScrollAnimation animation="fade-left" delay={200}>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">How quickly do you respond to inquiries?</h4>
                      <p className="text-sm text-gray-600">We respond to all inquiries within 24 hours during business days. Urgent technical issues are prioritized.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Do you offer phone support?</h4>
                      <p className="text-sm text-gray-600">Yes, phone support is available during business hours. You can also schedule a call for complex technical discussions.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Can I visit your offices?</h4>
                      <p className="text-sm text-gray-600">Office visits are by appointment only. Please contact us in advance to schedule a meeting.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>

        {/* Additional Support Options */}
        <ScrollAnimation animation="fade-up" delay={400}>
          <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">More Ways to Get Help</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our self-service options and community resources for quick answers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center border-2 border-blue-100 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl">
                <CardContent className="p-6">
                  <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Knowledge Base</h3>
                  <p className="text-sm text-gray-600 mb-4">Browse our comprehensive help articles</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full hover:scale-105 transition-all duration-300 bg-transparent"
                  >
                    Browse Articles
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center border-2 border-green-100 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Community Forum</h3>
                  <p className="text-sm text-gray-600 mb-4">Connect with other fellowship leaders</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full hover:scale-105 transition-all duration-300 bg-transparent"
                  >
                    Join Forum
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center border-2 border-purple-100 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">System Status</h3>
                  <p className="text-sm text-gray-600 mb-4">Check our platform status and updates</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full hover:scale-105 transition-all duration-300 bg-transparent"
                  >
                    View Status
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center border-2 border-orange-100 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl">
                <CardContent className="p-6">
                  <Heart className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Feature Requests</h3>
                  <p className="text-sm text-gray-600 mb-4">Suggest new features for the platform</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full hover:scale-105 transition-all duration-300 bg-transparent"
                  >
                    Submit Idea
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollAnimation>

        {/* Confirmation Modal */}
        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent className="sm:max-w-md rounded-3xl border-0 bg-white/95 backdrop-blur-sm mx-4">
            <DialogHeader>
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-4 sm:mb-6">
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <DialogTitle className="text-center text-xl sm:text-2xl font-bold text-gray-900">
                Message Sent Successfully!
              </DialogTitle>
              <DialogDescription className="text-center text-gray-600 leading-relaxed text-sm sm:text-base px-2">
               {`Thank you for contacting us. We've received your message and will respond within 24 hours during business days. For urgent matters, please use our live chat or phone support.`}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center mt-6 sm:mt-8">
              <Button
                onClick={() => setShowConfirmation(false)}
                className="px-8 sm:px-12 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full transition-all duration-300 hover:scale-105"
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

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Upload, CheckCircle, CreditCard, DollarSign, Calendar, MapPin, Users } from "lucide-react"
import { type Event, mockAPI, mockFellowships } from "@/lib/mock-data"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import Image from "next/image"

type RegistrationPageProps = {
  params: {
    fellowship: string
    id: string
  }
}

export default function RegistrationPage({ params }: RegistrationPageProps) {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    memberName: "",
    email: "",
    fellowship: params.fellowship,
    phone: "",
    notes: "",
    paymentProofURL: "",
  })

  const router = useRouter()
  const fellowship = mockFellowships.find((f) => f.slug === params.fellowship)

  if (!fellowship) {
    notFound()
  }

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const fetchedEvent = await mockAPI.getEventById(params.id)
        if (!fetchedEvent || fetchedEvent.fellowship !== params.fellowship) {
          notFound()
        }
        setEvent(fetchedEvent)
      } catch (error) {
        console.error("Failed to load event:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }
    void loadEvent()
  }, [params.id, params.fellowship])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = () => {
    // Mock file upload
    const mockFileURL = "/mock-payment-proof.png"
    setFormData((prev) => ({ ...prev, paymentProofURL: mockFileURL }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await mockAPI.createRegistration({
        ...formData,
        eventId: params.id,
      })
      setSubmitted(true)
    } catch (error) {
      console.error("Failed to submit registration:", error)
      alert("Failed to submit registration. Please try again.")
    } finally {
      setSubmitting(false)
    }
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
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  if (!event) {
    return notFound()
  }

  if (!event.registrationEnabled) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Registration Closed</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Registration for this event is currently not available.
            </p>
            <Button
              onClick={() => router.push(`/${params.fellowship}/events-management/events/${params.id}`)}
              variant="outline"
              className="bg-transparent"
            >
              Back to Event Details
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Registration Submitted!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for registering for **{event.title}**. Your registration has been received and is
              pending approval.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Next Steps:</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 text-left">
                <li>• You will receive an email confirmation shortly</li>
                {event.paymentRequired && <li>• Admin will review your payment proof and approve your registration</li>}
                <li>• Check your email for event updates and materials</li>
                {event.isHybrid && <li>• Live stream access will be provided upon approval</li>}
                <li>• Arrive early on event day for check-in</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => router.push(`/${params.fellowship}/events-management/events/${params.id}`)}
                variant="outline"
                className="bg-transparent"
              >
                Back to Event
              </Button>
              <Button
                onClick={() => router.push(`/${params.fellowship}/events-management/events`)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                View All Events
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Event Registration</h1>
        <p className="text-gray-600 dark:text-gray-300">Register for {event.title}</p>
      </div>

      {/* Event Summary */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Event Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <Calendar className="w-4 h-4 text-gray-400 mt-1" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{formatDate(event.startDate)}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {formatTime(event.startDate)} - {formatTime(event.endDate)}
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="w-4 h-4 text-gray-400 mt-1" />
            <div className="text-sm text-gray-600 dark:text-gray-300">{event.location}</div>
          </div>
          {event.paymentRequired && (
            <div className="flex items-start space-x-3">
              <DollarSign className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">¥{event.price} CNY</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Registration fee required</div>
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-2 pt-2">
            {event.isHybrid && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
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
          </div>
        </CardContent>
      </Card>

      {/* Registration Form */}
      <Card>
        <CardHeader>
          <CardTitle>Registration Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="memberName">Full Name *</Label>
                <Input
                  id="memberName"
                  value={formData.memberName}
                  onChange={(e) => handleInputChange("memberName", e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fellowship">Fellowship</Label>
                <Input id="fellowship" value={fellowship.name} disabled className="bg-gray-50 dark:bg-gray-800" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+86 138 0000 0000"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Any special requirements, dietary restrictions, or questions..."
                rows={3}
              />
            </div>

            {event.paymentRequired && (
              <>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Information</h3>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Payment Required</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                      Please complete payment of ¥{event.price} CNY before submitting your registration.
                    </p>

                    {event.bankDetails && (
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Account Name:</span> {event.bankDetails.accountName}
                        </div>
                        <div>
                          <span className="font-medium">Account Number:</span> {event.bankDetails.accountNumber}
                        </div>
                        <div>
                          <span className="font-medium">Bank:</span> {event.bankDetails.bankName}
                        </div>
                      </div>
                    )}

                    {(event.wechatQR || event.alipayQR) && (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {event.wechatQR && (
                          <div className="text-center">
                            <div className="text-sm font-medium mb-2">WeChat Pay</div>
                            <div className="relative w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded">
                              <Image
                                src={event.wechatQR || "/placeholder.svg"}
                                alt="WeChat QR"
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                          </div>
                        )}
                        {event.alipayQR && (
                          <div className="text-center">
                            <div className="text-sm font-medium mb-2">Alipay</div>
                            <div className="relative w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded">
                              <Image
                                src={event.alipayQR || "/placeholder.svg"}
                                alt="Alipay QR"
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentProof">Payment Proof *</Label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      {formData.paymentProofURL ? (
                        <div className="space-y-3">
                          <CheckCircle className="w-8 h-8 text-green-500 mx-auto" />
                          <p className="text-sm text-green-600 dark:text-green-400">
                            Payment proof uploaded successfully
                          </p>
                          <Button type="button" variant="outline" onClick={handleFileUpload} className="bg-transparent">
                            Replace File
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Upload a screenshot or photo of your payment receipt
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Supported formats: JPG, PNG, PDF (Max 5MB)
                            </p>
                          </div>
                          <Button type="button" variant="outline" onClick={handleFileUpload} className="bg-transparent">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Payment Proof
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/${params.fellowship}/events-management/events/${params.id}`)}
                className="bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting || (event.paymentRequired && !formData.paymentProofURL)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {submitting ? "Submitting..." : "Submit Registration"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
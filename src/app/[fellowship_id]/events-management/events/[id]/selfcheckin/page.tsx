"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle, Clock, Users, QrCode } from "lucide-react"
import { type Event, type Registration, mockAPI, mockFellowships } from "@/lib/mock-data"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"

type SelfCheckinPageProps = {
  params: {
    fellowship: string
    id: string
  }
}

export default function SelfCheckinPage({ params }: SelfCheckinPageProps) {
  const [event, setEvent] = useState<Event | null>(null)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [checkedIn, setCheckedIn] = useState(false)
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null)
  const [checkingIn, setCheckingIn] = useState(false)
  const router = useRouter()

  const fellowship = mockFellowships.find((f) => f.slug === params.fellowship)

  if (!fellowship) {
    notFound()
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedEvent, fetchedRegistrations] = await Promise.all([
          mockAPI.getEventById(params.id),
          mockAPI.getRegistrationsByEvent(params.id),
        ])

        if (!fetchedEvent || fetchedEvent.fellowship !== params.fellowship) {
          notFound()
        }

        setEvent(fetchedEvent)
        setRegistrations(fetchedRegistrations.filter((reg) => reg.approved))
      } catch (error) {
        console.error("Failed to load data:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }
    void loadData()
  }, [params.id, params.fellowship])

  const filteredRegistrations = registrations.filter(
    (reg) =>
      reg.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCheckIn = async (registration: Registration) => {
    setCheckingIn(true)
    try {
      // Mock check-in API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setRegistrations((prev) => prev.map((reg) => (reg.id === registration.id ? { ...reg, checkedIn: true } : reg)))
      setSelectedRegistration({ ...registration, checkedIn: true })
      setCheckedIn(true)
    } catch (error) {
      console.error("Failed to check in:", error)
      alert("Failed to check in. Please try again or contact an admin.")
    } finally {
      setCheckingIn(false)
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

  if (checkedIn && selectedRegistration) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Welcome!</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              <strong>{selectedRegistration.memberName}</strong>
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              You have successfully checked in to <strong>{event.title}</strong>
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">Event Information</h3>
              <div className="space-y-2 text-sm text-green-800 dark:text-green-200">
                <div>
                  <strong>Date:</strong> {formatDate(event.startDate)}
                </div>
                <div>
                  <strong>Time:</strong> {formatTime(event.startDate)} - {formatTime(event.endDate)}
                </div>
                <div>
                  <strong>Location:</strong> {event.location}
                </div>
                {event.isHybrid && (
                  <div>
                    <strong>Online Access:</strong> Available for approved members
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => router.push(`/${params.fellowship}/events-management/events/${params.id}`)}
                variant="outline"
                className="bg-transparent"
              >
                View Event Details
              </Button>
              {event.isHybrid && (
                <Button
                  onClick={() => router.push(`/${params.fellowship}/events-management/events/${params.id}/live`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Join Live Stream
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Event Check-in</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{event.title}</p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {formatDate(event.startDate)}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {registrations.length} registered
          </div>
        </div>
      </div>

      {/* QR Code Scanner Mock */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">
            <QrCode className="w-5 h-5 mr-2" />
            Scan QR Code
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 mb-4">
            <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Position your QR code within the frame to check in automatically
            </p>
            <Button variant="outline" className="bg-transparent">
              Enable Camera
            </Button>
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-500">Don&apos;t have a QR code? Search for your name below</p>
        </CardContent>
      </Card>

      {/* Manual Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Find Your Registration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name, email, or phone number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-lg py-3"
            />
          </div>

          {searchTerm && (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {filteredRegistrations.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No matching registrations found.</p>
                  <p className="text-sm mt-1">Please check your spelling or contact an admin for help.</p>
                </div>
              ) : (
                filteredRegistrations.map((registration) => (
                  <Card
                    key={registration.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      registration.checkedIn
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                        : "hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white">{registration.memberName}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{registration.email}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{registration.phone}</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {registration.checkedIn ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Checked In
                            </Badge>
                          ) : (
                            <Button
                              onClick={() => void handleCheckIn(registration)} 
                              disabled={checkingIn}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              {checkingIn ? "Checking In..." : "Check In"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {!searchTerm && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Start typing your name, email, or phone number to find your registration.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="mt-6">
        <CardContent className="text-center py-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Can&apos;t find your registration or having trouble checking in?
          </p>
          <Button variant="outline" className="bg-transparent">
            Contact Event Staff
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
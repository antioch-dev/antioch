"use client"

import { useState, useEffect } from "react"
import { CheckinInterface } from "@/components/admin/checkin-interface"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Download, BarChart3, Clock, Calendar, MapPin } from "lucide-react"
import { type Event, type Registration, mockAPI, mockFellowships } from "@/lib/mock-data"
import { useRouter } from "next/navigation"


export default function CheckinPage({ params }: { params: { fellowship_id: string; id: string } }) {
  const [event, setEvent] = useState<Event | null>(null)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("checkin")
  const router = useRouter()
  const fellowship = mockFellowships.find((f) => f.slug === params.fellowship_id)
  
  useEffect(() => {
    if (!fellowship) {
      router.replace("/404")
    }
  }, [fellowship, router])

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedEvent, fetchedRegistrations] = await Promise.all([
          mockAPI.getEventById(params.id),
          mockAPI.getRegistrationsByEvent(params.id),
        ])

        if (!fetchedEvent || fetchedEvent.fellowship !== params.fellowship_id) {
          router.replace("/404")
          return
        }

        setEvent(fetchedEvent)
        setRegistrations(fetchedRegistrations.filter((reg) => reg.approved))
      } catch (error) {
        console.error("Failed to load data:", error)
        router.replace("/404")
      } finally {
        setLoading(false)
      }
    }
    if (params?.id) {
      void loadData()
    }
  }, [params.id, params.fellowship_id, router])

  const handleCheckIn = async (registrationId: string) => {
    try {
      // Mock check-in API call
      await new Promise((resolve) => setTimeout(resolve, 300))
      setRegistrations((prev) => prev.map((reg) => (reg.id === registrationId ? { ...reg, checkedIn: true } : reg)))
    } catch (error) {
      console.error("Failed to check in:", error)
    }
  }

  const handleCheckOut = async (registrationId: string) => {
    try {
      // Mock check-out API call
      await new Promise((resolve) => setTimeout(resolve, 300))
      setRegistrations((prev) => prev.map((reg) => (reg.id === registrationId ? { ...reg, checkedIn: false } : reg)))
    } catch (error) {
      console.error("Failed to check out:", error)
    }
  }

  const handleExportAttendance = () => {
    const csvData = registrations
      .map((reg) => [reg.memberName, reg.email, reg.phone, reg.checkedIn ? "Present" : "Absent"].join(","))
      .join("\n")
    const header = "Name,Email,Phone,Attendance\n"
    const blob = new Blob([header + csvData], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${event?.title ?? "event"}-attendance.csv`
    a.click()
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold">Event not found</h2>
        <p className="text-gray-600">The event you&apos;re looking for could not be found.</p>
      </div>
    )
  }

  const stats = {
    total: registrations.length,
    checkedIn: registrations.filter((reg) => reg.checkedIn).length,
    notCheckedIn: registrations.filter((reg) => !reg.checkedIn).length,
  }

  const attendanceRate = stats.total > 0 ? Math.round((stats.checkedIn / stats.total) * 100) : 0
  const hourlyData = Array.from({ length: 12 }, (_, i) => ({
    hour: `${9 + i}:00`,
    checkins: Math.floor(Math.random() * 15) + 1,
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header - Tablet Optimized */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Check-in Management</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">{event.title}</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              onClick={() => router.push(`/${params.fellowship_id}/events-management/events/${params.id}/selfcheckin`)}
              className="bg-transparent"
            >
              Self Check-in Page
            </Button>
            <Button variant="outline" onClick={handleExportAttendance} className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-12 text-lg">
          <TabsTrigger value="checkin" className="py-3">
            Check-in
          </TabsTrigger>
          <TabsTrigger value="overview" className="py-3">
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="py-3">
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="checkin" className="space-y-6">
          <CheckinInterface registrations={registrations} onCheckIn={handleCheckIn} onCheckOut={handleCheckOut} />
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          {/* Event Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Calendar className="w-6 h-6 mr-2" />
                Event Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Event Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(event.startDate)}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>
                        {formatTime(event.startDate)} - {formatTime(event.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Attendance Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Total Registered:</span>
                      <span className="font-semibold">{stats.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Checked In:</span>
                      <span className="font-semibold text-green-600">{stats.checkedIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Attendance Rate:</span>
                      <span className="font-semibold text-blue-600">{attendanceRate}%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Event Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.isHybrid && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      >
                        Hybrid Event
                      </Badge>
                    )}
                    {event.paymentRequired && (
                      <Badge
                        variant="outline"
                        className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                      >
                        Paid Event
                      </Badge>
                    )}
                    <Badge
                      variant={event.registrationEnabled ? "default" : "secondary"}
                      className={
                        event.registrationEnabled
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }
                    >
                      Registration {event.registrationEnabled ? "Open" : "Closed"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => setActiveTab("checkin")}
              size="lg"
              className="py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Users className="w-6 h-6 mr-2" />
              Manage Check-ins
            </Button>
            <Button
              onClick={() => router.push(`/${params.fellowship_id}/events-management/events/${params.id}/registrations`)}
              variant="outline"
              size="lg"
              className="py-6 text-lg bg-transparent"
            >
              <Users className="w-6 h-6 mr-2" />
              View Registrations
            </Button>
            <Button
              variant="outline"
              onClick={handleExportAttendance}
              size="lg"
              className="py-6 text-lg bg-transparent"
            >
              <Download className="w-6 h-6 mr-2" />
              Export Attendance
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Registered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Approved registrations</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Present</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{stats.checkedIn}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Currently checked in</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Absent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{stats.notCheckedIn}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Not yet checked in</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Attendance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{attendanceRate}%</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Overall attendance</p>
              </CardContent>
            </Card>
          </div>

          {/* Mock Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Check-in Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Check-ins throughout the day (mock data for demonstration)
                </p>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                  {hourlyData.map((data, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="bg-blue-500 rounded-t"
                        style={{ height: `${(data.checkins / 15) * 100}px`, minHeight: "4px" }}
                      ></div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{data.hour}</div>
                      <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">{data.checkins}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
import { DashboardLayout } from "@/app/_components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { getUserById, getFellowshipById, getEventsByFellowshipId } from "@/lib/mock-data"
import { Search, Calendar, Clock, MapPin, Users, Filter, CheckCircle, XCircle } from "lucide-react"
import { notFound } from "next/navigation"

interface UserEventsProps {
  params: Promise<{ user_id: string }>
}

export default async function UserEvents({ params }: UserEventsProps) {
  const { user_id } = await params
  const user = getUserById(user_id)

  if (!user) {
    notFound()
  }

  const fellowship = user.fellowshipId ? getFellowshipById(user.fellowshipId) : null
  const allEvents = user.fellowshipId ? getEventsByFellowshipId(user.fellowshipId) : []
  const upcomingEvents = allEvents.filter((e) => new Date(e.date) > new Date())
  const pastEvents = allEvents.filter((e) => new Date(e.date) <= new Date())

  // Mock RSVP data
  const userRSVPs = {
    "event-1": "attending",
    "event-2": "attending",
    "event-3": "not-attending",
  }

  const getRSVPStatus = (eventId: string) => {
    return userRSVPs[eventId as keyof typeof userRSVPs] || "no-response"
  }

  const getRSVPBadge = (status: string) => {
    switch (status) {
      case "attending":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Attending
          </Badge>
        )
      case "not-attending":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="mr-1 h-3 w-3" />
            Not Attending
          </Badge>
        )
      default:
        return <Badge variant="outline">No Response</Badge>
    }
  }

  return (
    <DashboardLayout userRole={user.role} userId={user_id}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
            <p className="text-gray-600">
              {fellowship ? `Events from ${fellowship.name}` : "No fellowship events available"}
            </p>
          </div>
        </div>

        {!fellowship ? (
          <Card className="bg-white border-gray-200">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Fellowship Assigned</h3>
                <p className="text-gray-600">You need to be assigned to a fellowship to view events.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4 mb-6">
              <Card className="bg-white border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-900">Total Events</CardTitle>
                  <Calendar className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{allEvents.length}</div>
                  <p className="text-xs text-gray-500">All time</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-900">Upcoming</CardTitle>
                  <Clock className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</div>
                  <p className="text-xs text-gray-500">This month</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-900">Attending</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {Object.values(userRSVPs).filter((status) => status === "attending").length}
                  </div>
                  {/* Line 116: Changed 'RSVP'd yes' to 'RSVP&apos;d yes' */}
                  <p className="text-xs text-gray-500">RSVP&apos;d yes</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-900">Attendance Rate</CardTitle>
                  <Users className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">85%</div>
                  <p className="text-xs text-gray-500">Average attendance</p>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card className="mb-6 bg-white border-gray-200">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search events..." className="pl-10 bg-white border-gray-300 text-gray-900" />
                  </div>
                  <Button variant="outline" className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="mb-6 bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Upcoming Events</CardTitle>
                <CardDescription className="text-gray-600">Events you can attend</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event) => (
                      <div key={event.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{event.title}</h3>
                            <p className="text-gray-600 mb-2">{event.description}</p>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {event.type}
                            </Badge>
                            {getRSVPBadge(getRSVPStatus(event.id))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            {event.attendees} attending
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            RSVP Yes
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <XCircle className="mr-1 h-3 w-3" />
                            RSVP No
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-center py-8">No upcoming events scheduled</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Past Events */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Past Events</CardTitle>
                {/* Line 225: Changed 'Events you've attended' to 'Events you&apos;ve attended' */}
                <CardDescription className="text-gray-600">Events you&apos;ve attended</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pastEvents.length > 0 ? (
                    pastEvents.map((event) => (
                      <div key={event.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 opacity-75">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{event.title}</h3>
                            <p className="text-gray-600 text-sm">{event.description}</p>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                              Completed
                            </Badge>
                            {getRSVPBadge(getRSVPStatus(event.id))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            {event.attendees} attended
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                        >
                          View Event Details
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-center py-8">No past events found</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
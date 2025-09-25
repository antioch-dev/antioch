import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getUserById, getEventsByFellowshipId, getFellowshipById } from "@/lib/mock-data"
import { MapPin, Users, Calendar, Clock, Church, Mail, Phone, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface UserFellowshipProps {
  params: Promise<{ user_id: string }>
}

export default async function UserFellowship({ params }: UserFellowshipProps) {
  const { user_id } = await params
  const user = getUserById(user_id)

  if (!user) {
    notFound()
  }

  const fellowship = user.fellowshipId ? getFellowshipById(user.fellowshipId) : null
  const upcomingEvents = user.fellowshipId
    ? getEventsByFellowshipId(user.fellowshipId)
        .filter((e) => new Date(e.date) > new Date())
        .slice(0, 4)
    : []

  if (!fellowship) {
    return (
      <DashboardLayout userRole={user.role} userId={user_id}>
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="text-center py-12">
            <Church className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">No Fellowship Assigned</h1>
            <p className="text-gray-600 mb-6">
              You haven&apos;t been assigned to a fellowship yet. Contact your administrator to join a fellowship.
            </p>
            <Button asChild>
              <Link href={`/${user_id}/dashboard`}>Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole={user.role} userId={user_id}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Fellowship</h1>
          <p className="text-gray-600">Information about your fellowship community</p>
        </div>

        {/* Fellowship Header */}
        <Card className="mb-6 bg-white border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Church className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{fellowship.name}</h2>
                <p className="text-gray-600">{fellowship.description}</p>
                <Badge variant={fellowship.status === "active" ? "default" : "secondary"} className="mt-2">
                  {fellowship.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Fellowship Details */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Fellowship Information</CardTitle>
              <CardDescription className="text-gray-600">Basic details about your fellowship</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Leadership</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Church className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{fellowship.pastor}</p>
                      <p className="text-sm text-gray-600">Lead Pastor</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-gray-900">{fellowship.location.address}</p>
                      <p className="text-gray-600">
                        {fellowship.location.city}, {fellowship.location.state} {fellowship.location.zipCode}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900">{fellowship.memberCount} active members</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900">Established in {fellowship.established}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a href={`mailto:${fellowship.contactEmail}`} className="text-blue-600 hover:underline">
                        {fellowship.contactEmail}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <a href={`tel:${fellowship.contactPhone}`} className="text-blue-600 hover:underline">
                        {fellowship.contactPhone}
                      </a>
                    </div>
                    {fellowship.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <a
                          href={fellowship.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Upcoming Events</CardTitle>
              <CardDescription className="text-gray-600">Don&apos;t miss these fellowship activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {event.time}
                        </div>
                        <div className="flex items-center col-span-2">
                          <MapPin className="mr-1 h-3 w-3" />
                          {event.location}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-200">
                        <span className="text-xs text-gray-500">{event.attendees} attending</span>
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          RSVP
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center py-6">No upcoming events scheduled</p>
                )}

                <Button
                  variant="outline"
                  className="w-full bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                  asChild
                >
                  <Link href={`/${user_id}/events`}>
                    View All Events
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Role */}
        <Card className="mt-6 bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">My Role & Involvement</CardTitle>
            <CardDescription className="text-gray-600">Your participation in the fellowship</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Current Role</h3>
                <Badge className="bg-blue-100 text-blue-800 text-sm">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
                <p className="text-sm text-gray-600 mt-2">
                  Member since {new Date(user.joinDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Attendance</h3>
                <p className="text-2xl font-bold text-gray-900">85%</p>
                <p className="text-sm text-gray-600">Average attendance rate</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Involvement</h3>
                <div className="space-y-1">
                  <p className="text-sm text-gray-900">• Regular attendee</p>
                  <p className="text-sm text-gray-900">• Event participant</p>
                  {user.role === "leader" && <p className="text-sm text-gray-900">• Ministry leader</p>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

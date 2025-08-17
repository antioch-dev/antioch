import { DashboardLayout } from "@/app/_components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getUserById, getEventsByFellowshipId, getFellowshipById } from "@/lib/mock-data"
import { Calendar, Church, Users, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface UserDashboardProps {
  params: Promise<{ user_id: string }>
}

export default async function UserDashboard({ params }: UserDashboardProps) {
  const { user_id } = await params
  const user = getUserById(user_id)

  if (!user) {
    notFound()
  }

  const fellowship = user.fellowshipId ? getFellowshipById(user.fellowshipId) : null
  const upcomingEvents = user.fellowshipId ? getEventsByFellowshipId(user.fellowshipId).slice(0, 3) : []

  return (
    <DashboardLayout userRole={user.role} userId={user_id}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Here&apos;s what&apos;s happening in your fellowship</p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">My Fellowship</CardTitle>
              <Church className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{fellowship?.name || "Not Assigned"}</div>
              <p className="text-xs text-gray-500">
                {fellowship ? `${fellowship.memberCount} members` : "Contact admin to join"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</div>
              <p className="text-xs text-gray-500">This week</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Member Since</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{new Date(user.joinDate).getFullYear()}</div>
              <p className="text-xs text-gray-500">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Fellowship Info */}
          {fellowship && (
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">My Fellowship</CardTitle>
                <CardDescription className="text-gray-600">Fellowship information and details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{fellowship.name}</h3>
                    <p className="text-gray-600">{fellowship.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                      {fellowship.location.address}, {fellowship.location.city}, {fellowship.location.state}{" "}
                      {fellowship.location.zipCode}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="mr-2 h-4 w-4 text-gray-500" />
                      {fellowship.memberCount} members
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Church className="mr-2 h-4 w-4 text-gray-500" />
                      {fellowship.pastor}
                    </div>
                  </div>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href={`/${user_id}/fellowship`}>View Fellowship Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upcoming Events */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Upcoming Events</CardTitle>
              <CardDescription className="text-gray-600">Don&apos;t miss these upcoming activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <Badge variant="outline">{event.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center py-4">No upcoming events scheduled</p>
                )}
                <Button variant="outline" className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href={`/${user_id}/events`}>View All Events</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
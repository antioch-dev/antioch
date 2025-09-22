import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PrayerLayout from "@/components/prayer-layout"
import { mockPrayerRequests, mockPrayerMeetings, mockPrayerAssignments } from "@/lib/mock-data"
import { Heart, Calendar, Users, Building, Plus, Sparkles, Star } from "lucide-react"

interface PrayerHomeProps {
  params: {
    fellowship: string
  }
}

export default function PrayerHome({ params }: PrayerHomeProps) {
  
  const fellowship = params?.fellowship || 'default-fellowship';

  // Calculate stats
  const totalRequests = mockPrayerRequests.length
  const activeRequests = mockPrayerRequests.filter((r) => r.status === "Pending" || r.status === "In Progress").length
  const answeredRequests = mockPrayerRequests.filter((r) => r.status === "Completed").length
  const upcomingMeetings = mockPrayerMeetings.filter((m) => new Date(m.date) >= new Date()).length
  const pendingAssignments = mockPrayerAssignments.filter((a) => a.status === "Pending").length

  return (
    <PrayerLayout fellowshipName={fellowship}>
      <div className="space-y-10">
        {/* Welcome Section */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-serif font-bold text-gray-900">Elevate Your Spiritual Journey</h1>
            <Sparkles className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Manage your prayers, connect with the community, and grow in faith through our comprehensive prayer ministry
            platform.
          </p>
          <div className="mt-6">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 px-4 py-2 text-sm font-medium">
              Your prayer is powerful. Let's enhance your spiritual experience together.
            </Badge>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="prayer-card-glow bg-gradient-to-br from-purple-50 to-white border-purple-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total Requests</CardTitle>
              <Heart className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold text-purple-900">{totalRequests}</div>
              <p className="text-xs text-purple-600 mt-1">{activeRequests} active requests</p>
            </CardContent>
          </Card>

          <Card className="prayer-card-glow bg-gradient-to-br from-green-50 to-white border-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Answered Prayers</CardTitle>
              <Star className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold text-green-900">{answeredRequests}</div>
              <p className="text-xs text-green-600 mt-1">God is faithful!</p>
            </CardContent>
          </Card>

          <Card className="prayer-card-glow bg-gradient-to-br from-blue-50 to-white border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Upcoming Meetings</CardTitle>
              <Calendar className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold text-blue-900">{upcomingMeetings}</div>
              <p className="text-xs text-blue-600 mt-1">This week</p>
            </CardContent>
          </Card>

          <Card className="prayer-card-glow bg-gradient-to-br from-orange-50 to-white border-orange-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Pending Tasks</CardTitle>
              <Users className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold text-orange-900">{pendingAssignments}</div>
              <p className="text-xs text-orange-600 mt-1">Assignments waiting</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href={`/${fellowship}/prayer/requests`}>
            <Card className="prayer-card-glow cursor-pointer group bg-gradient-to-br from-purple-50 via-white to-purple-50 border-purple-200">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-full w-fit group-hover:bg-purple-200 transition-colors">
                  <Plus className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="font-serif text-xl text-gray-900">Prayer Requests</CardTitle>
                <CardDescription className="text-gray-600">
                  Submit and view prayer requests from your community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full gap-2 prayer-button bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4" />
                  Start a Prayer Request
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href={"/fellowship1/Prayer-system/prayer/meetings"}>
            <Card className="prayer-card-glow cursor-pointer group bg-gradient-to-br from-green-50 via-white to-green-50 border-green-200">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit group-hover:bg-green-200 transition-colors">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="font-serif text-xl text-gray-900">Prayer Meetings</CardTitle>
                <CardDescription className="text-gray-600">Schedule and join prayer gatherings</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full gap-2 prayer-button bg-green-600 hover:bg-green-700">
                  <Calendar className="h-4 w-4" />
                  Join a Meeting
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href={"/fellowship1/Prayer-system/prayer/assignments"}>
            <Card className="prayer-card-glow cursor-pointer group bg-gradient-to-br from-blue-50 via-white to-blue-50 border-blue-200">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit group-hover:bg-blue-200 transition-colors">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="font-serif text-xl text-gray-900">Prayer Assignments</CardTitle>
                <CardDescription className="text-gray-600">
                  Assign specific prayer requests to team members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full gap-2 prayer-button bg-blue-600 hover:bg-blue-700">
                  <Users className="h-4 w-4" />
                  Manage Tasks
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href={"/fellowship1/Prayer-system/prayer/ministries"}>
            <Card className="prayer-card-glow cursor-pointer group bg-gradient-to-br from-orange-50 via-white to-orange-50 border-orange-200">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-orange-100 rounded-full w-fit group-hover:bg-orange-200 transition-colors">
                  <Building className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="font-serif text-xl text-gray-900">Ministry Coverage</CardTitle>
                <CardDescription className="text-gray-600">
                  Organize ongoing prayer support for ministries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full gap-2 prayer-button bg-orange-600 hover:bg-orange-700">
                  <Building className="h-4 w-4" />
                  View Ministries
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card className="prayer-card-glow bg-white/95 backdrop-blur-sm border-purple-100">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <CardTitle className="font-serif text-xl">Recent Prayer Activity</CardTitle>
            </div>
            <CardDescription>Latest updates from your prayer ministry</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-25 rounded-xl border border-green-100">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-900">Prayer Answered!</p>
                  <p className="text-sm text-green-700">David's youth ministry request has been answered</p>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">Answered</Badge>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-25 rounded-xl border border-purple-100">
                <div className="h-3 w-3 bg-purple-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-purple-900">New Prayer Request</p>
                  <p className="text-sm text-purple-700">Sarah submitted a request for her mother's healing</p>
                </div>
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  New
                </Badge>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-25 rounded-xl border border-blue-100">
                <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-900">Prayer Meeting Scheduled</p>
                  <p className="text-sm text-blue-700">Weekly fellowship prayer this Saturday at 7 PM</p>
                </div>
                <Badge variant="outline" className="border-blue-200 text-blue-700">
                  Upcoming
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PrayerLayout>
  )
}

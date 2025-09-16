import { DashboardLayout } from '@/components/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { mockFellowships, mockUsers } from '@/lib/mock-data'
import { Church, Users, TrendingUp, AlertCircle, Plus, Activity, DollarSign, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const totalFellowships = mockFellowships.length
  const activeFellowships = mockFellowships.filter((f) => f.status === 'active').length
  const totalMembers = mockFellowships.reduce((acc, f) => acc + f.memberCount, 0)
  const totalUsers = mockUsers.length

  // Mock additional data for enhanced dashboard
  const monthlyGrowth = 12
  const platformRevenue = 24500
  const activeEvents = 15
  const systemHealth = 98

  return (
    <DashboardLayout userRole="admin">
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Platform Administration</h1>
            <p className="text-gray-600">Comprehensive overview and management of the fellowship platform</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50" asChild>
              <Link href="/admin/analytics">
                <Activity className="mr-2 h-4 w-4" />
                View Analytics
              </Link>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <Link href="/admin/fellowships/applications">
                <Plus className="mr-2 h-4 w-4" />
                Add Fellowship
              </Link>
            </Button>
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Total Fellowships</CardTitle>
              <Church className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalFellowships}</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-600">+2</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Total Members</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalMembers.toLocaleString()}</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-600">+{monthlyGrowth}%</span> growth this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Platform Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${platformRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-500">
                <span className="text-green-600">+8%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">System Health</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{systemHealth}%</div>
              <p className="text-xs text-gray-500">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Active Fellowships</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{activeFellowships}</div>
              <Progress value={(activeFellowships / totalFellowships) * 100} className="mt-2" />
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((activeFellowships / totalFellowships) * 100)}% of total fellowships
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Platform Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalUsers}</div>
              <Progress value={75} className="mt-2" />
              <p className="text-xs text-gray-500 mt-1">75% active in last 30 days</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Active Events</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{activeEvents}</div>
              <Progress value={60} className="mt-2" />
              <p className="text-xs text-gray-500 mt-1">Scheduled this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Fellowships */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Recent Fellowships</CardTitle>
              <CardDescription className="text-gray-600">Latest fellowship registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFellowships.slice(0, 4).map((fellowship) => (
                  <div key={fellowship.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{fellowship.name}</p>

                      <p className="text-sm text-gray-500">
                        {fellowship.location.city}, {fellowship.location.state}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={fellowship.status === 'active' ? 'default' : 'secondary'}
                        className={fellowship.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {fellowship.status}
                      </Badge>
                      <p className="text-sm text-gray-500">{fellowship.memberCount} members</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                asChild
              >
                <Link href="/admin/fellowships">View All Fellowships</Link>
              </Button>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">System Alerts</CardTitle>
              <CardDescription className="text-gray-600">Important notifications and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Fellowship Renewal Due</p>
                    <p className="text-sm text-gray-600">Unity Methodist Fellowship renewal expires in 7 days</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Growth Milestone</p>
                    <p className="text-sm text-gray-600">New Life Assembly reached 200+ members</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">New User Registrations</p>
                    <p className="text-sm text-gray-600">15 new users joined this week</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 bg-white text-gray-900 border-gray-300 hover:bg-gray-50">
                View All Alerts
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Quick Actions</CardTitle>
              <CardDescription className="text-gray-600">Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href="/admin/fellowships/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Fellowship
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                  asChild
                >
                  <Link href="/admin/users">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Users
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                  asChild
                >
                  <Link href="/admin/analytics">
                    <Activity className="mr-2 h-4 w-4" />
                    View Analytics
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                  asChild
                >
                  <Link href="/admin/settings">
                    <Activity className="mr-2 h-4 w-4" />
                    Platform Settings
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

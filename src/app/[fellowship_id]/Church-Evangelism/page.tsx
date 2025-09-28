import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, Calendar, TrendingUp, Phone, Gift, BookOpen } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const stats = [
    { title: "Total Visitors", value: "247", change: "+12%", icon: Users },
    { title: "New Believers", value: "34", change: "+8%", icon: UserPlus },
    { title: "Baptisms This Month", value: "12", change: "+25%", icon: TrendingUp },
    { title: "Active Follow-ups", value: "89", change: "+5%", icon: Phone },
  ]

  const recentActivities = [
    { type: "visit", name: "Sarah Johnson", action: "First-time visitor", time: "2 hours ago", status: "pending" },
    { type: "followup", name: "Mike Chen", action: "Week 2 follow-up call", time: "4 hours ago", status: "completed" },
    { type: "baptism", name: "Lisa Rodriguez", action: "Baptism scheduled", time: "1 day ago", status: "scheduled" },
    { type: "gift", name: "David Kim", action: "Welcome gift delivered", time: "2 days ago", status: "completed" },
  ]

  const upcomingTasks = [
    { task: "Call new visitors from Sunday service", priority: "high", due: "Today" },
    { task: "Prepare welcome gifts for 5 new believers", priority: "medium", due: "Tomorrow" },
    { task: "Schedule discipleship meetings", priority: "medium", due: "This week" },
    { task: "Update CRM with recent interactions", priority: "low", due: "This week" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Church Evangelism & Follow-Up System</h1>
              <p className="text-gray-600">Engaging hearts, nurturing faith, building community</p>
            </div>
            <nav className="flex space-x-4">
              <Link href="/fellowship1/Church-Evangelism/visitors">
                <Button variant="ghost">Visitors</Button>
              </Link>
              <Link href="/fellowship1/Church-Evangelism//follow-up">
                <Button variant="ghost">Follow-Up</Button>
              </Link>
              <Link href="/fellowship1/Church-Evangelism//events">
                <Button variant="ghost">Events</Button>
              </Link>
              <Link href="/fellowship1/Church-Evangelism//volunteers">
                <Button variant="ghost">Volunteers</Button>
              </Link>
              <Link href="/fellowship1/Church-Evangelism//analytics">
                <Button variant="ghost">Analytics</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest evangelism and follow-up activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        {activity.type === "visit" && <Users className="h-4 w-4 text-blue-600" />}
                        {activity.type === "followup" && <Phone className="h-4 w-4 text-green-600" />}
                        {activity.type === "baptism" && <BookOpen className="h-4 w-4 text-purple-600" />}
                        {activity.type === "gift" && <Gift className="h-4 w-4 text-orange-600" />}
                      </div>
                      <div>
                        <p className="font-medium">{activity.name}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          activity.status === "completed"
                            ? "default"
                            : activity.status === "scheduled"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {activity.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Follow-up actions that need attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{task.task}</p>
                      <p className="text-sm text-gray-600">Due: {task.due}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          task.priority === "high"
                            ? "destructive"
                            : task.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {task.priority}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Complete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/fellowship1/Church-Evangelism//visitors/add">
                <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <UserPlus className="h-6 w-6" />
                  <span>Add Visitor</span>
                </Button>
              </Link>
              <Link href="/fellowship1/Church-Evangelism//follow-up/schedule">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-white text-gray-700"
                >
                  <Calendar className="h-6 w-6" />
                  <span>Schedule Follow-up</span>
                </Button>
              </Link>
              <Link href="/fellowship1/Church-Evangelism//events/new">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-white text-gray-700"
                >
                  <Calendar className="h-6 w-6" />
                  <span>Create Event</span>
                </Button>
              </Link>
              <Link href="/fellowship1/Church-Evangelism//analytics">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-white text-gray-700"
                >
                  <TrendingUp className="h-6 w-6" />
                  <span>View Reports</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

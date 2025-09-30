import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Users, UserPlus, Award, Download, Filter } from "lucide-react"

export default function AnalyticsPage() {
  const keyMetrics = [
    {
      title: "Total Salvations",
      value: "127",
      change: "+18%",
      trend: "up",
      period: "This Year",
    },
    {
      title: "Baptisms",
      value: "89",
      change: "+25%",
      trend: "up",
      period: "This Year",
    },
    {
      title: "Visitor to Member Rate",
      value: "34%",
      change: "+5%",
      trend: "up",
      period: "Last 6 Months",
    },
    {
      title: "Follow-up Completion",
      value: "78%",
      change: "-3%",
      trend: "down",
      period: "This Month",
    },
  ]

  const conversionFunnel = [
    { stage: "First-time Visitors", count: 247, percentage: 100 },
    { stage: "Return Visitors", count: 156, percentage: 63 },
    { stage: "Small Group Attendees", count: 98, percentage: 40 },
    { stage: "New Believers", count: 67, percentage: 27 },
    { stage: "Baptized", count: 45, percentage: 18 },
    { stage: "Active Members", count: 34, percentage: 14 },
  ]

  const evangelismMethods = [
    { method: "Service-Based Events", salvations: 45, baptisms: 32, effectiveness: 71 },
    { method: "Street Evangelism", salvations: 38, baptisms: 28, effectiveness: 74 },
    { method: "Digital Outreach", salvations: 28, baptisms: 18, effectiveness: 64 },
    { method: "Community Seminars", salvations: 16, baptisms: 11, effectiveness: 69 },
  ]

  const monthlyData = [
    { month: "Jan", visitors: 45, salvations: 12, baptisms: 8 },
    { month: "Feb", visitors: 52, salvations: 15, baptisms: 10 },
    { month: "Mar", visitors: 38, salvations: 9, baptisms: 7 },
    { month: "Apr", visitors: 61, salvations: 18, baptisms: 12 },
    { month: "May", visitors: 48, salvations: 14, baptisms: 9 },
    { month: "Jun", visitors: 55, salvations: 16, baptisms: 11 },
  ]

  const testimonies = [
    {
      name: "Sarah Johnson",
      story: "Found Christ through our community car wash event. Now actively serving in children's ministry.",
      date: "Dec 2023",
      method: "Service-Based",
    },
    {
      name: "Mike Chen",
      story: "Approached during street evangelism. Completed discipleship program and was baptized last month.",
      date: "Nov 2023",
      method: "Street Evangelism",
    },
    {
      name: "Lisa Rodriguez",
      story: "Connected through social media campaign. Now leading a small group for new believers.",
      date: "Oct 2023",
      method: "Digital Outreach",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
              <p className="text-gray-600">Track evangelism effectiveness and spiritual growth</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Period Selector */}
        <div className="mb-6">
          <Select defaultValue="year">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="conversion">Conversion Funnel</TabsTrigger>
            <TabsTrigger value="methods">Method Effectiveness</TabsTrigger>
            <TabsTrigger value="testimonies">Success Stories</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p
                      className={`text-xs flex items-center ${
                        metric.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {metric.change} from {metric.period.toLowerCase()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Monthly Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>Visitors, salvations, and baptisms over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium w-12">{data.month}</div>
                      <div className="flex-1 grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <p className="text-gray-600">Visitors</p>
                          <p className="font-medium">{data.visitors}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-600">Salvations</p>
                          <p className="font-medium text-green-600">{data.salvations}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-600">Baptisms</p>
                          <p className="font-medium text-blue-600">{data.baptisms}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>Track the journey from first visit to active membership</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionFunnel.map((stage, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{stage.stage}</span>
                        <div className="text-right">
                          <span className="font-bold">{stage.count}</span>
                          <span className="text-gray-500 ml-2">({stage.percentage}%)</span>
                        </div>
                      </div>
                      <Progress value={stage.percentage} className="h-3" />
                      {index < conversionFunnel.length - 1 && (
                        <div className="text-xs text-gray-500 text-right">
                          {Math.round((conversionFunnel[index + 1]!.count / stage.count) * 100)}% conversion to next
                          stage
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="methods" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Evangelism Method Effectiveness</CardTitle>
                <CardDescription>Compare the success rates of different outreach approaches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {evangelismMethods.map((method, index) => {
                    const currentSalvations = method.salvations ?? 0;
                    const currentBaptisms = method.baptisms ?? 0;
                    
                    const baptismRate = currentSalvations > 0
                      ? Math.round((currentBaptisms / currentSalvations) * 100)
                      : 0;

                    return (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-medium">{method.method}</h3>
                          <Badge variant="secondary">{method.effectiveness}% effective</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Salvations</p>
                            <p className="font-bold text-green-600">{currentSalvations}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Baptisms</p>
                            <p className="font-bold text-blue-600">{currentBaptisms}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Baptism Rate</p>
                            <p className="font-bold">
                              {`${baptismRate}%`}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Progress value={method.effectiveness} className="h-2" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Success Stories</CardTitle>
                <CardDescription>Testimonies of life change and spiritual growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {testimonies.map((testimony, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{testimony.name}</h3>
                          <p className="text-sm text-gray-600">{testimony.date}</p>
                        </div>
                        <Badge variant="outline">{testimony.method}</Badge>
                      </div>
                    
                      <p className="text-gray-700 italic">&ldquo;{testimony.story}&rdquo;</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    <Award className="h-4 w-4 mr-2" />
                    View All Testimonies
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Impact Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Kingdom Impact Summary</CardTitle>
                <CardDescription>Celebrating God&apos;s work through your evangelism efforts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-2xl">127</h3>
                    <p className="text-gray-600">Lives Transformed</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <UserPlus className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-2xl">89</h3>
                    <p className="text-gray-600">New Disciples</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-2xl">34</h3>
                    <p className="text-gray-600">Active Leaders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

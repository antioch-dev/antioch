"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, TrendingUp, Users, Target, Activity, BarChart2, PieChart } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Legend, AreaChart, Area } from "recharts"
import { mockAttendanceData, getLatestSundayStats, getAverageAttendance, getGrowthTrend } from "@/lib/mock-data"

export default function AttendanceAnalytics() {
  const [dateRange, setDateRange] = useState("6months")
  const [serviceFilter, setServiceFilter] = useState("all")

  const latestStats = getLatestSundayStats()
  const averageAttendance = getAverageAttendance()
  const growthTrend = getGrowthTrend()

  // Filter data based on selections
  const filteredData = mockAttendanceData.filter((record) => {
    const recordDate = new Date(record.date)
    const now = new Date()

    let dateFilter = true
    if (dateRange === "3months") {
      const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
      dateFilter = recordDate >= threeMonthsAgo
    } else if (dateRange === "1month") {
      const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
      dateFilter = recordDate >= oneMonthAgo
    }

    const serviceTypeFilter = serviceFilter === "all" || record.serviceType === serviceFilter

    return dateFilter && serviceTypeFilter
  })

  // Prepare chart data
  const chartData = filteredData.map((record) => ({
    date: new Date(record.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    fullDate: record.date,
    total: record.total,
    adults: record.adults,
    youth: record.youth,
    children: record.children,
    newVisitors: record.newVisitors,
    serviceType: record.serviceType,
  }))

  const chartConfig = {
    total: {
      label: "Total Attendance",
      color: "hsl(var(--chart-1))",
    },
    adults: {
      label: "Adults",
      color: "hsl(var(--chart-1))",
    },
    youth: {
      label: "Youth",
      color: "hsl(var(--chart-2))",
    },
    children: {
      label: "Children",
      color: "hsl(var(--chart-3))",
    },
  }

  const currentAverage =
    filteredData.length > 0 ? Math.round(filteredData.reduce((sum, r) => sum + r.total, 0) / filteredData.length) : 0
  const peakAttendance = filteredData.length > 0 ? Math.max(...filteredData.map((r) => r.total)) : 0
  const totalVisitors = filteredData.reduce((sum, r) => sum + r.newVisitors, 0)
  const consistencyScore = Math.round(85 + Math.random() * 10) // Mock consistency score

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-background p-8">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Attendance Analytics</h1>
            <p className="text-lg text-muted-foreground">
              Deep insights into attendance patterns, trends, and demographic engagement
            </p>
          </div>

          {/* Enhanced Filters */}
          <div className="flex gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
              </SelectContent>
            </Select>

            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="Morning">Morning Service</SelectItem>
                <SelectItem value="Evening">Evening Service</SelectItem>
                <SelectItem value="Special Service">Special Service</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-16 translate-x-16"></div>
      </div>

      {/* Enhanced Summary Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Average</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-full">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500 mb-1">{currentAverage}</div>
            <p className="text-xs text-muted-foreground mb-2">Based on {filteredData.length} services</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600 font-medium">{Math.abs(Math.round(growthTrend))}% trend</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Attendance</CardTitle>
            <div className="p-2 bg-green-500/10 rounded-full">
              <Target className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500 mb-1">{peakAttendance}</div>
            <p className="text-xs text-muted-foreground mb-2">Highest in selected period</p>
            <Progress value={peakAttendance > 0 ? (peakAttendance / 400) * 100 : 0} className="h-2" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <div className="p-2 bg-orange-500/10 rounded-full">
              <CalendarDays className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500 mb-1">{totalVisitors}</div>
            <p className="text-xs text-muted-foreground mb-2">New visitors in period</p>
            <div className="text-xs text-muted-foreground">
              Avg:{" "}
              <span className="font-medium">
                {filteredData.length > 0 ? Math.round(totalVisitors / filteredData.length) : 0}
              </span>{" "}
              per service
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consistency Score</CardTitle>
            <div className="p-2 bg-purple-500/10 rounded-full">
              <Activity className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-500 mb-1">{consistencyScore}%</div>
            <p className="text-xs text-muted-foreground mb-2">Attendance reliability</p>
            <Progress value={consistencyScore} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Attendance Trend Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary" />
              Attendance Trends
            </CardTitle>
            <CardDescription>Weekly attendance patterns and growth trajectory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] sm:h-[350px] lg:h-[400px]">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-total)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
                    <XAxis
                      dataKey="date"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="var(--color-total)"
                      fillOpacity={1}
                      fill="url(#colorTotal)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Demographic Breakdown Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Demographic Breakdown
            </CardTitle>
            <CardDescription>Attendance distribution by age groups over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] sm:h-[350px] lg:h-[400px]">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
                    <XAxis
                      dataKey="date"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                    />
                    <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="rect" />
                    <Bar
                      dataKey="adults"
                      stackId="demographics"
                      fill="var(--color-adults)"
                      name="Adults"
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                      dataKey="youth"
                      stackId="demographics"
                      fill="var(--color-youth)"
                      name="Youth"
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                      dataKey="children"
                      stackId="demographics"
                      fill="var(--color-children)"
                      name="Children"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Recent Services Table */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Recent Services Analysis
          </CardTitle>
          <CardDescription>Detailed breakdown of recent Sunday services with performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chartData
              .slice(-8)
              .reverse()
              .map((service, index) => {
                const isAboveAverage = service.total > currentAverage
                const visitorRate = service.total > 0 ? Math.round((service.newVisitors / service.total) * 100) : 0

                return (
                  <div
                    key={service.fullDate}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${isAboveAverage ? "bg-green-500/10" : "bg-muted"}`}>
                        <CalendarDays
                          className={`h-5 w-5 ${isAboveAverage ? "text-green-500" : "text-muted-foreground"}`}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">
                          {new Date(service.fullDate).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            Adults: {service.adults}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Youth: {service.youth}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Children: {service.children}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${isAboveAverage ? "text-green-500" : "text-primary"} mb-1`}>
                        {service.total}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {service.newVisitors} new visitors ({visitorRate}%)
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {service.serviceType}
                        </Badge>
                        {isAboveAverage && (
                          <Badge variant="default" className="text-xs bg-green-500">
                            Above Avg
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Users,
  UserPlus,
  Download,
  FileText,
  Target,
  Award,
} from "lucide-react"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, type TooltipProps } from "recharts"


interface AttendanceRecord {
  date: string;
  total: number;
  adults: number;
  youth: number;
  children: number;
  newVisitors: number;
  serviceType: 'Main' | 'Special' | 'Outreach';
}

interface MonthlyStat {
  month: string;
  totalAttendance: number;
  newVisitors: number;
  growthRate: number;
  averageWeekly: number;
}

const mockAttendanceData: AttendanceRecord[] = [
  { date: "2025-07-06", total: 250, adults: 150, youth: 60, children: 40, newVisitors: 15, serviceType: 'Main' },
  { date: "2025-07-13", total: 265, adults: 160, youth: 65, children: 40, newVisitors: 18, serviceType: 'Main' },
  { date: "2025-07-20", total: 280, adults: 170, youth: 70, children: 40, newVisitors: 25, serviceType: 'Special' },
  { date: "2025-07-27", total: 240, adults: 145, youth: 55, children: 40, newVisitors: 12, serviceType: 'Main' },
  { date: "2025-08-03", total: 300, adults: 180, youth: 75, children: 45, newVisitors: 30, serviceType: 'Main' },
  { date: "2025-08-10", total: 310, adults: 185, youth: 80, children: 45, newVisitors: 28, serviceType: 'Outreach' },
  { date: "2025-08-17", total: 325, adults: 195, youth: 85, children: 45, newVisitors: 35, serviceType: 'Special' },
  { date: "2025-08-24", total: 290, adults: 175, youth: 70, children: 45, newVisitors: 20, serviceType: 'Main' },
  { date: "2025-08-31", total: 305, adults: 180, youth: 80, children: 45, newVisitors: 25, serviceType: 'Main' },
  { date: "2025-09-07", total: 340, adults: 200, youth: 90, children: 50, newVisitors: 40, serviceType: 'Main' },
  { date: "2025-09-14", total: 330, adults: 195, youth: 85, children: 50, newVisitors: 32, serviceType: 'Main' },
  { date: "2025-09-21", total: 350, adults: 205, youth: 95, children: 50, newVisitors: 45, serviceType: 'Special' },
  { date: "2025-09-28", total: 335, adults: 198, youth: 87, children: 50, newVisitors: 38, serviceType: 'Main' },
];

const mockMonthlyStats: MonthlyStat[] = [
  { month: "2025-07", totalAttendance: 1035, newVisitors: 70, growthRate: -1.5, averageWeekly: 258.75 },
  { month: "2025-08", totalAttendance: 1530, newVisitors: 138, growthRate: 47.8, averageWeekly: 306 },
  { month: "2025-09", totalAttendance: 1355, newVisitors: 155, growthRate: -11.5, averageWeekly: 338.75 },
];

// --- Type Definitions to ensure type safety in Recharts Tooltip ---

// Define the data structure used for the Pie Chart
interface PieDataItem {
  name: string;
  value: number;
  color: string;
}


type CustomTooltipProps = TooltipProps<number, string>;


export default function MonthlyAnalytics() {
  const [selectedMonth, setSelectedMonth] = useState("2025-08")


  const monthlyData =
    mockMonthlyStats.find((month) => month.month === selectedMonth) ??
    mockMonthlyStats[mockMonthlyStats.length - 1] ??
    {
      totalAttendance: 0,
      newVisitors: 0,
      growthRate: 0,
      averageWeekly: 0,
      month: selectedMonth,
    }

  // Get individual Sunday data for the selected month
  const sundaysInMonth = mockAttendanceData.filter((record) => {
    const recordMonth = record.date.substring(0, 7)
    return recordMonth === selectedMonth
  })

  // Calculate pie chart data for demographic distribution
  const totalAdults = sundaysInMonth.reduce((sum, record) => sum + record.adults, 0)
  const totalYouth = sundaysInMonth.reduce((sum, record) => sum + record.youth, 0)
  const totalChildren = sundaysInMonth.reduce((sum, record) => sum + record.children, 0)

  const pieChartData: PieDataItem[] = [
    { name: "Adults", value: totalAdults, color: "hsl(var(--chart-1))" },
    { name: "Youth", value: totalYouth, color: "hsl(var(--chart-2))" },
    { name: "Children", value: totalChildren, color: "hsl(var(--chart-3))" },
  ]


  const comparisonData = mockMonthlyStats.slice(-6).map((month) => ({
    month: new Date(month.month + "-01").toLocaleDateString("en-US", { month: "short" }),
    attendance: month.totalAttendance,
    visitors: month.newVisitors,
    growth: month.growthRate,
    average: month.averageWeekly,
  }))

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleExportData = () => {
   
    const exportData = {
      month: selectedMonth,
      summary: monthlyData,
      sundays: sundaysInMonth,
      demographics: pieChartData,
    }

    console.log("Exporting data:", exportData)
    // Create a mock download
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `monthly-analytics-${selectedMonth}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const chartConfig = {
    attendance: {
      label: "Total Attendance",
      color: "hsl(var(--chart-1))",
    },
    visitors: {
      label: "New Visitors",
      color: "hsl(var(--chart-2))",
    },
    average: {
      label: "Weekly Average",
      color: "hsl(var(--chart-3))",
    },
  }

  const visitorConversionRate = Math.round(75 + Math.random() * 20) 
  const monthlyGoal = 1300 
  const goalProgress = (monthlyData.totalAttendance / monthlyGoal) * 100

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-green-500/10 via-green-500/5 to-background p-8 border border-border">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Monthly Analytics</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive monthly summaries, growth analysis, and performance insights
            </p>
          </div>

          <div className="flex gap-3">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                
                {mockMonthlyStats.map((month) => (
                  <SelectItem key={month.month} value={month.month}>
                    {new Date(month.month + "-01").toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={handleExportData}
              variant="outline"
              className="hover:shadow-lg transition-shadow bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -translate-y-16 translate-x-16"></div>
      </div>

      {/* Enhanced Monthly Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-l-4 border-l-primary hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attendance</CardTitle>
            <div className="p-2 bg-primary/10 rounded-full">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-1">{monthlyData.totalAttendance}</div>
            <p className="text-xs text-muted-foreground mb-2">{sundaysInMonth.length} services this month</p>
            <Progress value={goalProgress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{Math.round(goalProgress)}% of monthly goal</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Visitors</CardTitle>
            <div className="p-2 bg-orange-500/10 rounded-full">
              <UserPlus className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500 mb-1">{monthlyData.newVisitors}</div>
            <p className="text-xs text-muted-foreground mb-2">
              {Math.round(monthlyData.newVisitors / (sundaysInMonth.length || 1))} avg per service
            </p>
            <div className="text-xs text-muted-foreground">
              Conversion: <span className="font-medium text-orange-500">{visitorConversionRate}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <div className="p-2 bg-green-500/10 rounded-full">
              {monthlyData.growthRate > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={`text-3xl font-bold mb-1 ${monthlyData.growthRate > 0 ? "text-green-500" : "text-red-500"}`}
            >
              {monthlyData.growthRate > 0 ? "+" : ""}
              {monthlyData.growthRate}%
            </div>
            <p className="text-xs text-muted-foreground mb-2">vs previous month</p>
            <Progress
              value={Math.abs(monthlyData.growthRate) * 5}
              className={`h-2 ${monthlyData.growthRate > 0 ? "[&>div]:bg-green-500" : "[&>div]:bg-red-500"}`}
            />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Weekly Average</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-full">
              <CalendarDays className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500 mb-1">{monthlyData.averageWeekly}</div>
            <p className="text-xs text-muted-foreground mb-2">attendees per service</p>
            <div className="text-xs text-muted-foreground">
              Peak: <span className="font-medium">{Math.max(...sundaysInMonth.map((s) => s.total))}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Attendance Distribution
            </CardTitle>
            <CardDescription>
              Demographic breakdown for{" "}
              {new Date(selectedMonth + "-01").toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[280px] sm:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    // Using the correct imported type TooltipProps<number, string> via CustomTooltipProps
                    content={({ active, payload }: CustomTooltipProps) => {
                      if (!active || !payload || payload.length === 0) {
                        return null
                      }
      
                      const data = payload[0]?.payload as PieDataItem | undefined; 
                      const total = totalAdults + totalYouth + totalChildren
                      
                      return data?.name ? (
                        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{data.name}</p> 
                          <p className="text-sm text-muted-foreground">
                            {data.value} attendees ({total > 0 ? Math.round((data.value / total) * 100) : 0}%)
                          </p>
                        </div>
                      ) : null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4">
              {pieChartData.map((item) => {
                const total = totalAdults + totalYouth + totalChildren
                return (
                  <div key={item.name} className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
                    <div
                      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full mx-auto mb-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="font-semibold text-sm sm:text-lg">{item.value}</div>
                    <div className="text-xs text-muted-foreground">{item.name}</div>
                    <div className="text-xs font-medium text-primary">
                      {total > 0 ? Math.round((item.value / total) * 100) : 0}%
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Monthly Comparison Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              6-Month Performance
            </CardTitle>
            <CardDescription>Attendance trends, visitors, and weekly averages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[280px] sm:h-[320px]">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
                    <XAxis
                      dataKey="month"
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
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                    />
                    <Bar
                      dataKey="attendance"
                      fill="var(--color-attendance)"
                      name="Total Attendance"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar dataKey="visitors" fill="var(--color-visitors)" name="New Visitors" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Sunday Services Table */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Sunday Services Breakdown
          </CardTitle>
          <CardDescription>
            Detailed attendance analysis for each Sunday in{" "}
            {new Date(selectedMonth + "-01").toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sundaysInMonth.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <CalendarDays className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No services recorded</p>
              <p>No attendance data available for this month</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sundaysInMonth.map((service, index) => {
                const isHighPerformance = service.total > monthlyData.averageWeekly
                const visitorRate = Math.round((service.newVisitors / service.total) * 100)

                return (
                  <div
                    key={service.date}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full ${
                          isHighPerformance ? "bg-green-500/10 border-2 border-green-500/20" : "bg-primary/10"
                        }`}
                      >
                        <span className={`text-sm font-bold ${isHighPerformance ? "text-green-500" : "text-primary"}`}>
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{formatDate(service.date)}</p>
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
                      <div
                        className={`text-3xl font-bold mb-1 ${isHighPerformance ? "text-green-500" : "text-primary"}`}
                      >
                        {service.total}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {service.newVisitors} new visitors ({visitorRate}%)
                      </p>
                      <div className="flex items-center gap-2 mt-1 justify-end">
                        <Badge variant="outline" className="text-xs">
                          {service.serviceType}
                        </Badge>
                        {isHighPerformance && (
                          <Badge variant="default" className="text-xs bg-green-500">
                            High Performance
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Export Summary */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Export & Reporting Options
          </CardTitle>
          <CardDescription>Download comprehensive monthly reports and data for external analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button
              onClick={handleExportData}
              variant="outline"
              className="h-16 flex-col gap-2 hover:shadow-lg transition-shadow bg-transparent"
            >
              <Download className="h-5 w-5" />
              <span>Export JSON Data</span>
            </Button>
            <Button
              onClick={handleExportData}
              variant="outline"
              className="h-16 flex-col gap-2 hover:shadow-lg transition-shadow bg-transparent"
            >
              <FileText className="h-5 w-5" />
              <span>Export PDF Report</span>
            </Button>
            <Button
              onClick={handleExportData}
              variant="outline"
              className="h-16 flex-col gap-2 hover:shadow-lg transition-shadow bg-transparent"
            >
              <FileText className="h-5 w-5" />
              <span>Export CSV Data</span>
            </Button>
          </div>
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Export includes:</strong> Monthly summary statistics, individual service breakdowns, demographic
              analysis, growth trends, visitor conversion rates, and performance indicators for comprehensive reporting.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

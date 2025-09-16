"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockFellowships } from "@/lib/mock-data"
import { TrendingUp, TrendingDown, Users, Church, Calendar, Activity, Download, Filter, BarChart3 } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { useCallback } from "react"

export default function AdminAnalytics() {
  const analyticsData = {
    totalMembers: mockFellowships.reduce((acc, f) => acc + f.memberCount, 0),
    memberGrowth: 12.5,
    activeFellowships: mockFellowships.filter((f) => f.status === "active").length,
    fellowshipGrowth: 8.3,
    totalEvents: 45,
    eventGrowth: -2.1,
    avgAttendance: 78,
    attendanceGrowth: 5.7,
    userEngagement: 85,
    platformRevenue: 24500,
    revenueGrowth: 15.2,
  }

  const fellowshipStats = mockFellowships.map((fellowship) => ({
    ...fellowship,
    growth: Math.floor(Math.random() * 20) - 5,
    engagement: Math.floor(Math.random() * 30) + 70,
    events: Math.floor(Math.random() * 10) + 5,
  }))

  const handleExportPdf = useCallback(async () => {
    const input = document.getElementById("analytics-content") // Get the main content div by ID
    if (input) {
      // Use html2canvas to render the HTML content into a canvas
      const canvas = await html2canvas(input, { scale: 2 }) // Increase scale for better quality

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait", // Set orientation to portrait
        unit: "pt", // Unit in points
        format: "a4", // A4 size
      })

      const imgWidth = 595 // A4 width in points (approx)
      const pageHeight = 842 // A4 height in points (approx)
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Add new pages if content overflows
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save("platform_analytics_report.pdf") // Save the PDF with a filename
    }
  }, [])

  return (
    <DashboardLayout userRole="admin">
      <div id="analytics-content" className="p-6 bg-gray-50 min-h-screen">
        {" "}
        {/* Added ID for PDF export */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
            <p className="text-gray-600">Comprehensive insights and performance metrics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50">
              <Filter className="mr-2 h-4 w-4" />
              Filter Period
            </Button>
            <Button
              variant="outline"
              className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
              onClick={handleExportPdf} // Attach the export function to the button
            >
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Total Members</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{analyticsData.totalMembers.toLocaleString()}</div>
              <p className="text-xs text-gray-500 flex items-center">
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600">+{analyticsData.memberGrowth}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Active Fellowships</CardTitle>
              <Church className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{analyticsData.activeFellowships}</div>
              <p className="text-xs text-gray-500 flex items-center">
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600">+{analyticsData.fellowshipGrowth}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{analyticsData.totalEvents}</div>
              <p className="text-xs text-gray-500 flex items-center">
                <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                <span className="text-red-600">{analyticsData.eventGrowth}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Avg Attendance</CardTitle>
              <Activity className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{analyticsData.avgAttendance}%</div>
              <p className="text-xs text-gray-500 flex items-center">
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600">+{analyticsData.attendanceGrowth}%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>
        {/* Additional Metrics */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">User Engagement</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{analyticsData.userEngagement}%</div>
              <Progress value={analyticsData.userEngagement} className="mt-2" />
              <p className="text-xs text-gray-500 mt-1">Weekly active users</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Platform Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${analyticsData.platformRevenue.toLocaleString()}</div>
              <Progress value={75} className="mt-2" />
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-green-600">+{analyticsData.revenueGrowth}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">System Performance</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">99.8%</div>
              <Progress value={99.8} className="mt-2" />
              <p className="text-xs text-gray-500 mt-1">Uptime this month</p>
            </CardContent>
          </Card>
        </div>
        {/* Fellowship Performance */}
        <Card className="mb-6 bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Fellowship Performance</CardTitle>
            <CardDescription className="text-gray-600">Individual fellowship metrics and growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fellowshipStats.map((fellowship) => (
                <div key={fellowship.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{fellowship.name}</h3>

                      <p className="text-sm text-gray-600">
                        {fellowship.location.city}, {fellowship.location.state}
                      </p>
                    </div>
                    <Badge variant={fellowship.status === "active" ? "default" : "secondary"}>
                      {fellowship.status}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Members</p>
                      <p className="text-2xl font-bold text-gray-900">{fellowship.memberCount}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        {fellowship.growth >= 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                        )}
                        <span className={fellowship.growth >= 0 ? "text-green-600" : "text-red-600"}>
                          {fellowship.growth >= 0 ? "+" : ""}
                          {fellowship.growth}%
                        </span>
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900">Engagement</p>
                      <p className="text-2xl font-bold text-gray-900">{fellowship.engagement}%</p>
                      <Progress value={fellowship.engagement} className="mt-1" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900">Events</p>
                      <p className="text-2xl font-bold text-gray-900">{fellowship.events}</p>
                      <p className="text-xs text-gray-500">This month</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900">Pastor</p>
                      <p className="text-sm text-gray-900">{fellowship.pastor}</p>
                      <p className="text-xs text-gray-500">Est. {fellowship.established}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Quick Insights */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Growth Insights</CardTitle>
              <CardDescription className="text-gray-600">Key growth metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <p className="font-medium text-gray-900">Member Growth</p>
                    <p className="text-sm text-gray-600">Strong growth across all fellowships</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">+12.5%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <p className="font-medium text-gray-900">New Fellowships</p>
                    <p className="text-sm text-gray-600">2 new fellowships this month</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">+8.3%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div>
                    <p className="font-medium text-gray-900">Event Attendance</p>
                    <p className="text-sm text-gray-600">Improved attendance rates</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">+5.7%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Platform Health</CardTitle>
              <CardDescription className="text-gray-600">System performance and reliability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">Server Uptime</span>
                    <span className="text-sm text-gray-600">99.8%</span>
                  </div>
                  <Progress value={99.8} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">Response Time</span>
                    <span className="text-sm text-gray-600">145ms avg</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">User Satisfaction</span>
                    <span className="text-sm text-gray-600">4.8/5.0</span>
                  </div>
                  <Progress value={96} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">Data Security</span>
                    <span className="text-sm text-gray-600">100%</span>
                  </div>
                  <Progress value={100} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

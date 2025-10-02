"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Clock, CheckCircle, AlertTriangle, Bug } from "lucide-react"

interface FellowshipStats {
  fellowshipQuestions: {
    total: number
    new: number
    inProgress: number
    resolved: number
  }
  assignedBugs: {
    total: number
    high: number
    medium: number
    low: number
  }
  responseTime: {
    average: string
    target: string
  }
}

export function FellowshipStats() {
  const [stats, setStats] = useState<FellowshipStats>({
    fellowshipQuestions: { total: 0, new: 0, inProgress: 0, resolved: 0 },
    assignedBugs: { total: 0, high: 0, medium: 0, low: 0 },
    responseTime: { average: "0h", target: "24h" },
  })

  useEffect(() => {
    // TODO: Replace with actual API call
    // Simulated data for fellowship dashboard
    setStats({
      fellowshipQuestions: {
        total: 23,
        new: 5,
        inProgress: 3,
        resolved: 15,
      },
      assignedBugs: {
        total: 7,
        high: 1,
        medium: 4,
        low: 2,
      },
      responseTime: {
        average: "4.2h",
        target: "24h",
      },
    })
  }, [])

  const questionStats = [
    {
      title: "Total Questions",
      value: stats.fellowshipQuestions.total,
      description: "Fellowship inquiries",
      icon: MessageSquare,
      color: "text-primary",
    },
    {
      title: "New Questions",
      value: stats.fellowshipQuestions.new,
      description: "Awaiting response",
      icon: Clock,
      color: "text-orange-500",
    },
    {
      title: "In Progress",
      value: stats.fellowshipQuestions.inProgress,
      description: "Being addressed",
      icon: AlertTriangle,
      color: "text-blue-500",
    },
    {
      title: "Resolved",
      value: stats.fellowshipQuestions.resolved,
      description: "Successfully answered",
      icon: CheckCircle,
      color: "text-green-500",
    },
  ]

  return (
    <div className="space-y-4">
      {/* Fellowship Questions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {questionStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5 text-red-500" />
              Assigned Bug Reports
            </CardTitle>
            <CardDescription>Bug reports assigned to fellowship team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Assigned</span>
                <span className="font-bold text-lg">{stats.assignedBugs.total}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-red-600">High Priority</span>
                  <span className="font-medium">{stats.assignedBugs.high}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-orange-600">Medium Priority</span>
                  <span className="font-medium">{stats.assignedBugs.medium}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Low Priority</span>
                  <span className="font-medium">{stats.assignedBugs.low}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Response Performance
            </CardTitle>
            <CardDescription>Fellowship team response metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Response Time</span>
                <span className="font-bold text-lg text-green-600">{stats.responseTime.average}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Target Response Time</span>
                <span className="font-medium text-muted-foreground">{stats.responseTime.target}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "82%" }}></div>
              </div>
              <p className="text-xs text-muted-foreground">82% of responses within target time</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

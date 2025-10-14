"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Users, Bug, Clock, CheckCircle, AlertTriangle } from "lucide-react"

interface FeedbackStats {
  total: number
  new: number
  inProgress: number
  resolved: number
  byCategory: {
    general: number
    fellowship: number
    bugs: number
  }
}

export function FeedbackStats() {
  const [stats, setStats] = useState<FeedbackStats>({
    total: 0,
    new: 0,
    inProgress: 0,
    resolved: 0,
    byCategory: { general: 0, fellowship: 0, bugs: 0 },
  })

  useEffect(() => {
    // TODO: Replace with actual API call
    // Simulated data for now
    setStats({
      total: 47,
      new: 12,
      inProgress: 8,
      resolved: 27,
      byCategory: {
        general: 23,
        fellowship: 15,
        bugs: 9,
      },
    })
  }, [])

  const statCards = [
    {
      title: "Total Feedback",
      value: stats.total,
      description: "All time submissions",
      icon: MessageSquare,
      color: "text-primary",
    },
    {
      title: "New",
      value: stats.new,
      description: "Awaiting review",
      icon: Clock,
      color: "text-orange-500",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      description: "Being worked on",
      icon: AlertTriangle,
      color: "text-blue-500",
    },
    {
      title: "Resolved",
      value: stats.resolved,
      description: "Completed items",
      icon: CheckCircle,
      color: "text-green-500",
    },
  ]

  const categoryCards = [
    {
      title: "General Feedback",
      value: stats.byCategory.general,
      icon: MessageSquare,
      color: "text-primary",
    },
    {
      title: "Fellowship",
      value: stats.byCategory.fellowship,
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Bug Reports",
      value: stats.byCategory.bugs,
      icon: Bug,
      color: "text-red-500",
    },
  ]

  return (
    <div className="space-y-4">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
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

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback by Category</CardTitle>
          <CardDescription>Distribution of feedback types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categoryCards.map((category) => (
              <div key={category.title} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <category.icon className={`h-5 w-5 ${category.color}`} />
                <div>
                  <p className="text-sm font-medium">{category.title}</p>
                  <p className="text-2xl font-bold">{category.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

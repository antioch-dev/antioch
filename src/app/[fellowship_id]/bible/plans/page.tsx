"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, BookOpen, Play, Clock, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { readingPlans } from "@/lib/bible-data"
import { calculateProgress, initializeMockProgress, getPlanProgress, startPlan } from "@/lib/reading-plan-storage"

interface PlanProgress {
  completedDays: number
  percentage: number
  streak: number
}


export default function ReadingPlansPage() {
 const [planProgress, setPlanProgress] = useState<Record<string, PlanProgress>>({})


  useEffect(() => {
    initializeMockProgress()

    // Calculate progress for all plans
    const progress: Record<string, unknown> = {}
    readingPlans.forEach((plan) => {
      progress[plan.id] = calculateProgress(plan.id, plan.totalDays)
    })
    setPlanProgress(progress as Record<string, PlanProgress>)
  }, [])

  const handleStartPlan = (planId: string) => {
    startPlan(planId)
    // Recalculate progress
    const progress = { ...planProgress }
    const plan = readingPlans.find((p) => p.id === planId)
    if (plan) {
      progress[planId] = calculateProgress(planId, plan.totalDays)
    }
    setPlanProgress(progress)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadge = (planId: string) => {
    const userProgress = getPlanProgress(planId)
    const stats = planProgress[planId]

    if (!userProgress) {
      return <Badge variant="outline">Not Started</Badge>
    }

    if (stats?.percentage === 100) {
      return (
        <Badge variant="default" className="bg-green-500">
          Completed
        </Badge>
      )
    }

    if (stats?.completedDays ?? 0 > 0) {
      return <Badge variant="secondary">In Progress</Badge>
    }

    return <Badge variant="outline">Started</Badge>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Reading Plans</h1>
        <p className="text-muted-foreground">Structured Bible reading to deepen your faith journey</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {Object.values(planProgress).reduce((sum: number, p: PlanProgress) => sum + (p?.completedDays ?? 0), 0)}
              </p>
              <p className="text-sm text-muted-foreground">Days Completed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {Math.max(...Object.values(planProgress).map((p: PlanProgress) => p?.streak || 0))}
              </p>
              <p className="text-sm text-muted-foreground">Best Streak</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{readingPlans.length}</p>
              <p className="text-sm text-muted-foreground">Available Plans</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reading Plans */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Available Plans</h2>

        <div className="grid gap-6">
          {readingPlans.map((plan) => {
            const userProgress = getPlanProgress(plan.id)
            const stats = planProgress[plan.id] || { completedDays: 0, percentage: 0, streak: 0 }
            const isStarted = !!userProgress

            return (
              <Card key={plan.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{plan.title}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {plan.totalDays} days
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          ~15 min/day
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(plan.id)}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {isStarted && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">
                          {stats.completedDays} / {plan.totalDays} days ({stats.percentage}%)
                        </span>
                      </div>
                      <Progress value={stats.percentage} className="h-2" />

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Current Streak:</span>
                          <span className="ml-2 font-medium">{stats.streak} days</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Started:</span>
                          <span className="ml-2 font-medium">{formatDate(userProgress.startDate)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    {isStarted ? (
                      <>
                        <Button asChild className="flex-1">
                          <Link href={`/fellowship1/bible/plans/${plan.id}`}>
                            <BookOpen className="h-4 w-4 mr-2" />
                            Continue Reading
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href={`/fellowship1/bible/plans/${plan.id}`}>View Details</Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => handleStartPlan(plan.id)} className="flex-1">
                          <Play className="h-4 w-4 mr-2" />
                          Start Plan
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href={`/fellowship1/bible/plans/${plan.id}`}>Learn More</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle>Reading Plan Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Stay Consistent</h4>
              <p className="text-sm text-muted-foreground">
                Set aside the same time each day for reading. Consistency builds lasting habits.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Take Notes</h4>
              <p className="text-sm text-muted-foreground">
                Use the notes feature to capture insights and reflections as you read.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">{`Don't Rush`}</h4>
              <p className="text-sm text-muted-foreground">
             {`   It's better to read thoughtfully than to rush through passages.`}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Catch Up When Needed</h4>
              <p className="text-sm text-muted-foreground">
                {`If you miss a day, don't give up. Simply continue where you left off.`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

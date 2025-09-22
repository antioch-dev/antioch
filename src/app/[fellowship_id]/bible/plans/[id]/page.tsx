"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Calendar, BookOpen, CheckCircle, Play, ArrowLeft, Target, Clock, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { readingPlans } from "@/lib/bible-data"
import {
  calculateProgress,
  getPlanProgress,
  updatePlanProgress,
  startPlan,
  getNextUnreadDay,
  initializeMockProgress,
} from "@/lib/reading-plan-storage"

interface PlanProgress {
  completedDays: number
  percentage: number
  streak: number
  daysRemaining: number
}

interface UserProgress {
  startDate: string
  lastReadDate?: string
  completedDays: number[]
}

export default function ReadingPlanDetailPage() {
  const params = useParams()
  const { toast } = useToast()
  const planId = params.id as string

  const [plan] = useState(readingPlans.find((p) => p.id === planId))
  const [progress, setProgress] = useState<PlanProgress>({
    completedDays: 0,
    percentage: 0,
    streak: 0,
    daysRemaining: 0
  })
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [currentWeek, setCurrentWeek] = useState(1)

  useEffect(() => {
    initializeMockProgress()
    if (plan) {
      const stats = calculateProgress(planId, plan.totalDays)
      const userProg = getPlanProgress(planId)
      setProgress(stats)
      setUserProgress(userProg?? null)
    }
  }, [planId, plan])

  const handleStartPlan = () => {
    startPlan(planId)
    const userProg = getPlanProgress(planId)
    setUserProgress(userProg ?? null)
    toast({
      title: "Plan started!",
      description: "Your reading journey begins now. Happy reading!",
    })
  }

  const handleToggleDay = (dayNumber: number, completed: boolean) => {
    updatePlanProgress(planId, dayNumber, completed)

    // Refresh progress
    if (plan) {
      const stats = calculateProgress(planId, plan.totalDays)
      const userProg = getPlanProgress(planId)
      setProgress(stats)
      setUserProgress(userProg ?? null)
    }

    toast({
      title: completed ? "Day completed!" : "Day unmarked",
      description: completed ? `Great job completing day ${dayNumber}!` : `Day ${dayNumber} marked as incomplete.`,
    })
  }

  const handleContinueReading = () => {
    const nextDay = getNextUnreadDay(planId)
    if (nextDay) {
      // In a real app, this would navigate to the specific reading for that day
      toast({
        title: "Continue reading",
        description: `Opening day ${nextDay} reading...`,
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDaysForWeek = (weekNumber: number) => {
    const startDay = (weekNumber - 1) * 7 + 1
    const endDay = Math.min(startDay + 6, plan?.totalDays || 0)
    return Array.from({ length: endDay - startDay + 1 }, (_, i) => startDay + i)
  }

  const totalWeeks = plan ? Math.ceil(plan.totalDays / 7) : 0

  if (!plan) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Plan Not Found</h1>
        <p className="text-muted-foreground mb-6">The reading plan you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild>
          <Link href="/fellowship1/bible/plans">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Plans
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/fellowship1/bible/plans">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Plans
          </Link>
        </Button>
      </div>

      {/* Plan Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{plan.title}</CardTitle>
              <CardDescription className="text-base">{plan.description}</CardDescription>
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

            {userProgress ? (
              <Badge variant={progress.percentage === 100 ? "default" : "secondary"}>
                {progress.percentage === 100 ? "Completed" : "In Progress"}
              </Badge>
            ) : (
              <Badge variant="outline">Not Started</Badge>
            )}
          </div>
        </CardHeader>

        {userProgress && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{progress.completedDays}</div>
                <div className="text-sm text-muted-foreground">Days Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{progress.percentage}%</div>
                <div className="text-sm text-muted-foreground">Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{progress.streak}</div>
                <div className="text-sm text-muted-foreground">Current Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{progress.daysRemaining}</div>
                <div className="text-sm text-muted-foreground">Days Left</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Overall Progress</span>
                <span className="font-medium">{progress.percentage}%</span>
              </div>
              <Progress value={progress.percentage} className="h-3" />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleContinueReading} className="flex-1">
                <BookOpen className="h-4 w-4 mr-2" />
                Continue Reading
              </Button>
              <Button variant="outline">
                <Target className="h-4 w-4 mr-2" />
                Set Reminder
              </Button>
            </div>
          </CardContent>
        )}

        {!userProgress && (
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">Ready to begin your reading journey?</p>
              <Button onClick={handleStartPlan} size="lg">
                <Play className="h-4 w-4 mr-2" />
                Start This Plan
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Progress Tracking */}
      {userProgress && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Daily Progress</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
                  disabled={currentWeek === 1}
                >
                  Previous Week
                </Button>
                <span className="text-sm text-muted-foreground">
                  Week {currentWeek} of {totalWeeks}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentWeek(Math.min(totalWeeks, currentWeek + 1))}
                  disabled={currentWeek === totalWeeks}
                >
                  Next Week
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {getDaysForWeek(currentWeek).map((dayNumber) => {
                const isCompleted = userProgress.completedDays.includes(dayNumber)
                const dayReading = plan.days[dayNumber - 1]

                return (
                  <Card key={dayNumber} className={`p-4 ${isCompleted ? "bg-primary/5 border-primary/20" : ""}`}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Day {dayNumber}</span>
                        <Checkbox
                          checked={isCompleted}
                          onCheckedChange={(checked) => handleToggleDay(dayNumber, !!checked)}
                        />
                      </div>

                      <div className="space-y-1">
                        {dayReading?.readings.map((reading, index) => (
                          <div key={index} className="text-xs text-muted-foreground">
                            {reading}
                          </div>
                        ))}
                      </div>

                      {isCompleted && (
                        <div className="flex items-center gap-1 text-xs text-primary">
                          <CheckCircle className="h-3 w-3" />
                          Completed
                        </div>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plan Details */}
      <Card>
        <CardHeader>
          <CardTitle>About This Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">What You&apos;ll Gain</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Systematic Bible knowledge</li>
                <li>• Daily spiritual discipline</li>
                <li>• Deeper understanding of God&apos;s Word</li>
                <li>• Consistent reading habits</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Plan Features</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Progress tracking</li>
                <li>• Daily reading reminders</li>
                <li>• Note-taking integration</li>
                <li>• Flexible catch-up options</li>
              </ul>
            </div>
          </div>

          {userProgress && (
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Your Journey</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Started: {formatDate(userProgress.startDate)}</p>
                {userProgress.lastReadDate && <p>Last read: {formatDate(userProgress.lastReadDate)}</p>}
                {progress.percentage === 100 && (
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Award className="h-4 w-4" />
                    Congratulations! You&apos;ve completed this reading plan!
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
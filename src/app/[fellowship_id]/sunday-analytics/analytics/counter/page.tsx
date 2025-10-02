"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Minus, RotateCcw, Save, Users, Clock, Calendar, Activity, Target, Zap, Monitor } from "lucide-react"
import { useParams } from "next/navigation"

interface CounterState {
  adults: number
  youth: number
  children: number
  online: number // Added online attendance tracking
  lastSaved: Date | null
  isAutoSaving: boolean
}

export default function LiveCounter() {
  const params = useParams()
  const fellowship = params.fellowship as string

  const [counter, setCounter] = useState<CounterState>({
    adults: 0,
    youth: 0,
    children: 0,
    online: 0, // Initialize online counter
    lastSaved: null,
    isAutoSaving: false,
  })

  const [serviceStartTime] = useState(new Date())
  const [sessionDuration, setSessionDuration] = useState(0)

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionDuration(Math.floor((Date.now() - serviceStartTime.getTime()) / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [serviceStartTime])

  // Auto-save functionality (mock)
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (counter.adults > 0 || counter.youth > 0 || counter.children > 0 || counter.online > 0) {
        // Include online in auto-save check
        setCounter((prev) => ({ ...prev, isAutoSaving: true }))

        // Simulate API call
        setTimeout(() => {
          setCounter((prev) => ({
            ...prev,
            lastSaved: new Date(),
            isAutoSaving: false,
          }))
        }, 500)
      }
    }, 2000) // Auto-save 2 seconds after last change

    return () => clearTimeout(autoSaveTimer)
  }, [counter.adults, counter.youth, counter.children, counter.online]) // Added online to dependency array

  const incrementCounter = (
    category: keyof Pick<CounterState, "adults" | "youth" | "children" | "online">,
    amount = 1,
  ) => {
    // Added online to type
    setCounter((prev) => ({
      ...prev,
      [category]: prev[category] + amount,
    }))
  }

  const decrementCounter = (
    category: keyof Pick<CounterState, "adults" | "youth" | "children" | "online">,
    amount = 1,
  ) => {
    // Added online to type
    setCounter((prev) => ({
      ...prev,
      [category]: Math.max(0, prev[category] - amount),
    }))
  }

  const resetCounter = () => {
    setCounter({
      adults: 0,
      youth: 0,
      children: 0,
      online: 0, // Reset online counter
      lastSaved: null,
      isAutoSaving: false,
    })
  }

  const manualSave = () => {
    setCounter((prev) => ({ ...prev, isAutoSaving: true }))

    // Simulate API call
    setTimeout(() => {
      setCounter((prev) => ({
        ...prev,
        lastSaved: new Date(),
        isAutoSaving: false,
      }))
    }, 500)
  }

  const totalAttendance = counter.adults + counter.youth + counter.children + counter.online // Include online in total
  const fellowshipName = fellowship?.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()) || "Fellowship"

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  // Calculate percentages
  const adultPercentage = totalAttendance > 0 ? Math.round((counter.adults / totalAttendance) * 100) : 0
  const youthPercentage = totalAttendance > 0 ? Math.round((counter.youth / totalAttendance) * 100) : 0
  const childrenPercentage = totalAttendance > 0 ? Math.round((counter.children / totalAttendance) * 100) : 0
  const onlinePercentage = totalAttendance > 0 ? Math.round((counter.online / totalAttendance) * 100) : 0 // Added online percentage calculation

  return (
    <div className="min-h-screen bg-background p-2 sm:p-4">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* Enhanced Header */}
        <Card className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              {fellowshipName} Live Counter
            </CardTitle>
            <CardDescription className="text-base sm:text-lg">
              <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="font-medium text-xs sm:text-sm">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="font-medium text-xs sm:text-sm">Started at {formatTime(serviceStartTime)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="font-medium text-xs sm:text-sm">Duration: {formatDuration(sessionDuration)}</span>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-primary/5 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>
        </Card>

        {/* Enhanced Total Counter Display */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 shadow-xl">
          <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 sm:px-6">
            <div className="text-center">
              <div className="text-6xl sm:text-8xl md:text-9xl font-bold text-primary mb-4 tracking-tight">
                {totalAttendance}
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium mb-4 sm:mb-6">
                Total Attendance
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto">
                {" "}
                {/* Changed to 4 columns for online */}
                <div className="text-center p-2 sm:p-3 bg-background/50 rounded-lg border">
                  <div className="text-lg sm:text-2xl font-bold text-primary">{counter.adults}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Adults</div>
                  <div className="text-xs font-medium text-primary">{adultPercentage}%</div>
                </div>
                <div className="text-center p-2 sm:p-3 bg-background/50 rounded-lg border">
                  <div className="text-lg sm:text-2xl font-bold text-blue-500">{counter.youth}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Youth</div>
                  <div className="text-xs font-medium text-blue-500">{youthPercentage}%</div>
                </div>
                <div className="text-center p-2 sm:p-3 bg-background/50 rounded-lg border">
                  <div className="text-lg sm:text-2xl font-bold text-green-500">{counter.children}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Children</div>
                  <div className="text-xs font-medium text-green-500">{childrenPercentage}%</div>
                </div>
                <div className="text-center p-2 sm:p-3 bg-background/50 rounded-lg border">
                  <div className="text-lg sm:text-2xl font-bold text-purple-500">{counter.online}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Online</div>
                  <div className="text-xs font-medium text-purple-500">{onlinePercentage}%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Counter Controls */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {" "}
          {/* Changed to 4 columns for online */}
          {/* Adults Counter */}
          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary">
            <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl flex items-center justify-center gap-2">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                Adults
              </CardTitle>
              <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary mb-2">{counter.adults}</div>
              <Progress value={adultPercentage} className="h-2" />
              <p className="text-sm text-muted-foreground">{adultPercentage}% of total</p>
            </CardHeader>
            <CardContent className="space-y-4 px-4 sm:px-6">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  className="h-16 sm:h-20 text-xl sm:text-2xl font-bold hover:scale-105 transition-transform"
                  onClick={() => incrementCounter("adults")}
                  disabled={counter.isAutoSaving}
                >
                  <Plus className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-16 sm:h-20 text-xl sm:text-2xl font-bold bg-transparent hover:scale-105 transition-transform"
                  onClick={() => decrementCounter("adults")}
                  disabled={counter.adults === 0 || counter.isAutoSaving}
                >
                  <Minus className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 sm:h-12 font-semibold text-xs sm:text-sm"
                  onClick={() => incrementCounter("adults", 5)}
                  disabled={counter.isAutoSaving}
                >
                  +5
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 sm:h-12 font-semibold text-xs sm:text-sm"
                  onClick={() => incrementCounter("adults", 10)}
                  disabled={counter.isAutoSaving}
                >
                  +10
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 sm:h-12 font-semibold text-xs sm:text-sm"
                  onClick={() => decrementCounter("adults", 5)}
                  disabled={counter.adults < 5 || counter.isAutoSaving}
                >
                  -5
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* Youth Counter */}
          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
            <CardHeader className="text-center pb-4 px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl flex items-center justify-center gap-2">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                Youth
              </CardTitle>
              <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-500 mb-2">{counter.youth}</div>
              <Progress value={youthPercentage} className="h-2 [&>div]:bg-blue-500" />
              <p className="text-sm text-muted-foreground">{youthPercentage}% of total</p>
            </CardHeader>
            <CardContent className="space-y-4 px-4 sm:px-6">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  className="h-16 sm:h-20 text-xl sm:text-2xl font-bold bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-transform"
                  onClick={() => incrementCounter("youth")}
                  disabled={counter.isAutoSaving}
                >
                  <Plus className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-16 sm:h-20 text-xl sm:text-2xl font-bold bg-transparent border-blue-500 text-blue-500 hover:bg-blue-50 hover:scale-105 transition-transform"
                  onClick={() => decrementCounter("youth")}
                  disabled={counter.youth === 0 || counter.isAutoSaving}
                >
                  <Minus className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 sm:h-12 font-semibold text-xs sm:text-sm"
                  onClick={() => incrementCounter("youth", 5)}
                  disabled={counter.isAutoSaving}
                >
                  +5
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 sm:h-12 font-semibold text-xs sm:text-sm"
                  onClick={() => incrementCounter("youth", 10)}
                  disabled={counter.isAutoSaving}
                >
                  +10
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 sm:h-12 font-semibold text-xs sm:text-sm"
                  onClick={() => decrementCounter("youth", 5)}
                  disabled={counter.youth < 5 || counter.isAutoSaving}
                >
                  -5
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* Children Counter */}
          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
            <CardHeader className="text-center pb-4 px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl flex items-center justify-center gap-2">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                Children
              </CardTitle>
              <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-green-500 mb-2">{counter.children}</div>
              <Progress value={childrenPercentage} className="h-2 [&>div]:bg-green-500" />
              <p className="text-sm text-muted-foreground">{childrenPercentage}% of total</p>
            </CardHeader>
            <CardContent className="space-y-4 px-4 sm:px-6">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  className="h-16 sm:h-20 text-xl sm:text-2xl font-bold bg-green-500 hover:bg-green-600 hover:scale-105 transition-transform"
                  onClick={() => incrementCounter("children")}
                  disabled={counter.isAutoSaving}
                >
                  <Plus className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-16 sm:h-20 text-xl sm:text-2xl font-bold bg-transparent border-green-500 text-green-500 hover:bg-green-50 hover:scale-105 transition-transform"
                  onClick={() => decrementCounter("children")}
                  disabled={counter.children === 0 || counter.isAutoSaving}
                >
                  <Minus className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 sm:h-12 font-semibold text-xs sm:text-sm"
                  onClick={() => incrementCounter("children", 5)}
                  disabled={counter.isAutoSaving}
                >
                  +5
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 sm:h-12 font-semibold text-xs sm:text-sm"
                  onClick={() => incrementCounter("children", 10)}
                  disabled={counter.isAutoSaving}
                >
                  +10
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 sm:h-12 font-semibold text-xs sm:text-sm"
                  onClick={() => decrementCounter("children", 5)}
                  disabled={counter.children < 5 || counter.isAutoSaving}
                >
                  -5
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
            <CardHeader className="text-center pb-4 px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl flex items-center justify-center gap-2">
                <Monitor className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />
                Online
              </CardTitle>
              <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-purple-500 mb-2">{counter.online}</div>
              <Progress value={onlinePercentage} className="h-2 [&>div]:bg-purple-500" />
              <p className="text-sm text-muted-foreground">{onlinePercentage}% of total</p>
            </CardHeader>
            <CardContent className="space-y-4 px-4 sm:px-6">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  className="h-16 sm:h-20 text-xl sm:text-2xl font-bold bg-purple-500 hover:bg-purple-600 hover:scale-105 transition-transform"
                  onClick={() => incrementCounter("online")}
                  disabled={counter.isAutoSaving}
                >
                  <Plus className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-16 sm:h-20 text-xl sm:text-2xl font-bold bg-transparent border-purple-500 text-purple-500 hover:bg-purple-50 hover:scale-105 transition-transform"
                  onClick={() => decrementCounter("online")}
                  disabled={counter.online === 0 || counter.isAutoSaving}
                >
                  <Minus className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 sm:h-12 font-semibold text-xs sm:text-sm"
                  onClick={() => incrementCounter("online", 5)}
                  disabled={counter.isAutoSaving}
                >
                  +5
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 sm:h-12 font-semibold text-xs sm:text-sm"
                  onClick={() => incrementCounter("online", 10)}
                  disabled={counter.isAutoSaving}
                >
                  +10
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 sm:h-12 font-semibold text-xs sm:text-sm"
                  onClick={() => decrementCounter("online", 5)}
                  disabled={counter.online < 5 || counter.isAutoSaving}
                >
                  -5
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Action Buttons */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="pt-6 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={manualSave}
                disabled={counter.isAutoSaving}
                className="flex-1 sm:flex-none h-12 sm:h-14 text-base sm:text-lg hover:shadow-lg transition-shadow"
              >
                <Save className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                {counter.isAutoSaving ? "Saving..." : "Save Now"}
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="lg"
                    variant="destructive"
                    disabled={counter.isAutoSaving}
                    className="flex-1 sm:flex-none h-12 sm:h-14 text-base sm:text-lg hover:shadow-lg transition-shadow"
                  >
                    <RotateCcw className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                    Reset Counter
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="mx-4">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset Counter</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to reset the attendance counter? This will set all counts back to zero and
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={resetCounter} className="bg-destructive text-destructive-foreground">
                      Reset Counter
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* Enhanced Status Information */}
            <div className="mt-6 text-center space-y-3">
              {counter.isAutoSaving && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  Auto-saving attendance data...
                </div>
              )}

              {counter.lastSaved && !counter.isAutoSaving && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 text-green-500" />
                  <span>
                    Last saved: <span className="font-medium">{formatTime(counter.lastSaved)}</span>
                  </span>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs text-muted-foreground flex-wrap">
                <span>• Auto-saves every 2 seconds</span>
                <span>• Session: {formatDuration(sessionDuration)}</span>
                <span>• Total: {totalAttendance} attendees</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  targetDate: string
  title?: string
}

export function CountdownTimer({ targetDate, title = "Event starts in:" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
        setIsExpired(false)
      } else {
        setIsExpired(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (isExpired) {
    return (
      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-center space-x-2">
            <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-green-800 dark:text-green-200 font-semibold">Event is now live!</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
      <CardContent className="p-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-800 dark:text-blue-200 font-semibold">{title}</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{timeLeft.days}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{timeLeft.hours}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{timeLeft.minutes}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{timeLeft.seconds}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">Seconds</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

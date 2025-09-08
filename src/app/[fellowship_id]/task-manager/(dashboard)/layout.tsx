"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { TaskDetailPanel } from "@/components/tasks/task-detail-panel"
import { useStore } from "@/lib/store"
import { mockUser, mockTasks } from "@/lib/mock-data"

interface MockRecurrencePattern {
  type: string
  frequency?: "weekly" | "daily" | "biweekly" | "monthly" | "yearly"
  interval?: number
  day?: string
  time?: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const { setUser, setTasks } = useStore()

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log("Initializing app with mock data...")
        setUser(mockUser)
        setTasks(
          mockTasks.map((task) => {
            const recurrencePattern = task.recurrence_pattern as MockRecurrencePattern
            return {
              ...task,
              recurrence_pattern: recurrencePattern
                ? {
                    frequency: recurrencePattern.frequency ?? "weekly",
                    interval: recurrencePattern.interval ?? 1,
                    type: recurrencePattern.type,
                    day: recurrencePattern.day,
                    time: recurrencePattern.time,
                  }
                : null,
            }
          })
        )
        await new Promise((resolve) => setTimeout(resolve, 500))
      } catch (error) {
        console.error("Initialization error:", error)
      } finally {
        setLoading(false)
      }
    }
    void initializeApp()
  }, [setUser, setTasks])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-8 h-8 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading TaskFlow...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-950 p-6">{children}</main>
      </div>
      <TaskDetailPanel />
    </div>
  )
}
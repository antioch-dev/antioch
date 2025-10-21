"use client"

import { useState } from "react"
import { EventForm } from "@/components/admin/event-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles } from "lucide-react"
import { type Event, mockAPI, mockFellowships } from "@/lib/mock-data"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"

export default function CreateEventPage({ params }: { params: { fellowship: string } }) {
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const fellowship = mockFellowships.find((f) => f.slug === params.fellowship)

  if (!fellowship) {
    notFound()
  }

  const handleSaveEvent = async (eventData: Partial<Event>) => {
    setSaving(true)
    try {
      const newEvent = await mockAPI.createEvent({
        ...eventData,
        fellowship: params.fellowship,
      })

      router.push(`/${params.fellowship}/events`)
    } catch (error) {
      console.error("Failed to create event:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    router.push(`/${params.fellowship}/events-management/events`)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="relative mb-8 p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-100 dark:border-gray-700 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
        <div className="relative">
          <Button
            variant="ghost"
            onClick={handleCancel}
            className="mb-4 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl h-12 px-4 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>

          <div className="flex items-center">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mr-6 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Create New Event
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Create a new event for{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">{fellowship.name}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <EventForm onSave={handleSaveEvent} onCancel={handleCancel} isLoading={saving} />
    </div>
  )
}

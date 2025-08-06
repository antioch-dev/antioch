"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { LogIn, Save, CalendarIcon } from "lucide-react"
import { useStore } from "@/lib/store"
import { toast } from "sonner"

const checkinPrompts = [
  "What did you accomplish today?",
  "What challenges did you face?",
  "What are your priorities for tomorrow?",
  "How are you feeling about your progress?",
  "Any blockers or help needed?",
]

const moodOptions = [
  "Productive",
  "Collaborative",
  "Accomplished",
  "Focused",
  "Challenged",
  "Motivated",
  "Tired",
  "Excited",
]

export default function CheckinPage() {
  const { checkins, addCheckin } = useStore()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [checkinType, setCheckinType] = useState<"daily" | "weekly">("daily")
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [selectedMood, setSelectedMood] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleResponseChange = (prompt: string, value: string) => {
    setResponses((prev) => ({ ...prev, [prompt]: value }))
  }

  const handleSaveCheckin = async () => {
    // Validate that at least one response is filled
    const hasResponses = Object.values(responses).some((response) => response.trim().length > 0)

    if (!hasResponses) {
      toast.error("Please fill out at least one response")
      return
    }

    if (!selectedMood) {
      toast.error("Please select your mood")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const checkinData = {
        date: selectedDate || new Date(),
        type: checkinType,
        content: Object.entries(responses)
          .filter(([_, value]) => value.trim())
          .map(([prompt, value]) => `${prompt}: ${value}`)
          .join("\n\n"),
        mood: selectedMood,
        responses,
      }

      addCheckin(checkinData)
      toast.success(`${checkinType === "daily" ? "Daily" : "Weekly"} check-in saved successfully!`)

      // Reset form
      setResponses({})
      setSelectedMood("")
    } catch (_error) { // <- Resolved: Renamed to '_error'
      toast.error("Failed to save check-in. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getMoodColor = (mood: string) => {
    const moodColors: Record<string, string> = {
      Productive: "bg-green-600",
      Collaborative: "bg-blue-600",
      Accomplished: "bg-purple-600",
      Focused: "bg-indigo-600",
      Challenged: "bg-orange-600",
      Motivated: "bg-pink-600",
      Tired: "bg-gray-600",
      Excited: "bg-yellow-600",
    }
    return moodColors[mood] || "bg-gray-600"
  }

  const todaysCheckin = checkins.find(
    (checkin) => checkin.date.toDateString() === new Date().toDateString() && checkin.type === checkinType,
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Daily Check-in</h1>
          <p className="text-gray-400 mt-2">Reflect on your progress and plan ahead</p>
        </div>
        <div className="flex space-x-2">
          <Button variant={checkinType === "daily" ? "default" : "outline"} onClick={() => setCheckinType("daily")}>
            Daily
          </Button>
          <Button variant={checkinType === "weekly" ? "default" : "outline"} onClick={() => setCheckinType("weekly")}>
            Weekly
          </Button>
        </div>
      </div>

      {todaysCheckin && (
        <Card className="bg-green-900/20 border-green-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-600">Completed</Badge>
              <span className="text-green-400">You&apos;ve already completed your {checkinType} check-in for today!</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Check-in Form */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <LogIn className="w-5 h-5 mr-2" />
                {checkinType === "daily" ? "Daily" : "Weekly"} Check-in
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mood Selection */}
              <div className="space-y-2">
                <label className="text-gray-300 font-medium">How are you feeling today?</label>
                <div className="grid grid-cols-4 gap-2">
                  {moodOptions.map((mood) => (
                    <Button
                      key={mood}
                      variant={selectedMood === mood ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedMood(mood)}
                      className={selectedMood === mood ? getMoodColor(mood) : ""}
                    >
                      {mood}
                    </Button>
                  ))}
                </div>
              </div>

              {checkinPrompts.map((prompt, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-gray-300 font-medium">{prompt}</label>
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={responses[prompt] || ""}
                    onChange={(e) => handleResponseChange(prompt, e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white min-h-[100px] resize-none"
                  />
                </div>
              ))}

              <div className="flex justify-end">
                <Button onClick={handleSaveCheckin} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save Check-in"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border-gray-600"
              />
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Check-ins</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {checkins.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No check-ins yet</p>
              ) : (
                checkins.slice(0, 5).map((checkin) => (
                  <motion.div
                    key={checkin.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 bg-gray-700 rounded-lg border border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">{checkin.date.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {checkin.type}
                        </Badge>
                        <Badge className={`${getMoodColor(checkin.mood)} text-white text-xs`}>{checkin.mood}</Badge>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm line-clamp-3">{checkin.content}</p>
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Check-in Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">This Week</span>
                <span className="text-white font-medium">
                  {
                    checkins.filter((c) => {
                      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                      return c.date >= weekAgo && c.type === "daily"
                    }).length
                  }
                  /7 days
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">This Month</span>
                <span className="text-white font-medium">
                  {
                    checkins.filter((c) => {
                      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                      return c.date >= monthAgo && c.type === "daily"
                    }).length
                  }
                  /30 days
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Check-ins</span>
                <span className="text-green-400 font-medium">{checkins.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
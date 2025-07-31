"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogOut, Download, FileText, CheckCircle, ArrowLeft } from "lucide-react" 
import { useStore } from "@/lib/store"
import { toast } from "sonner"
import { useRouter } from "next/navigation" 

const checkoutPrompts = [
  "What did you accomplish today?",
  "What went well?",
  "What could be improved?",
  "Key learnings from today",
  "Tomorrow's priorities",
]

export default function CheckoutPage() {
  const router = useRouter() 

  const { tasks, checkouts, addCheckout } = useStore()
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [exportFormat, setExportFormat] = useState<"pdf" | "markdown">("pdf")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const completedTasks = tasks.filter((task:any) => task.status === "completed")
  const inProgressTasks = tasks.filter((task:any) => task.status === "in_progress")

  const handleTaskToggle = (taskId: string) => {
    setSelectedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  const handleResponseChange = (prompt: string, value: string) => {
    setResponses((prev) => ({ ...prev, [prompt]: value }))
  }

  const handleExport = () => {
    const checkoutData = {
      date: new Date().toISOString(),
      selectedTasks: tasks.filter((task:any) => selectedTasks.includes(task.id)),
      responses,
      format: exportFormat,
    }

    const dataStr = JSON.stringify(checkoutData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `checkout-${new Date().toISOString().split("T")[0]}.${exportFormat === "pdf" ? "json" : "md"}`
    link.click()
    URL.revokeObjectURL(url)

    toast.success(`Checkout summary exported as ${exportFormat.toUpperCase()}!`)
  }

  const handleSaveCheckout = async () => {
    const hasResponses = Object.values(responses).some((response) => response.trim().length > 0)

    if (!hasResponses && selectedTasks.length === 0) {
      toast.error("Please select tasks or fill out at least one response")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const checkoutData = {
        date: new Date(),
        selectedTasks,
        responses,
        exportFormat,
      }

      addCheckout(checkoutData)
      toast.success("Daily checkout saved successfully!")

      setResponses({})
      setSelectedTasks([])
    } catch (error) {
      toast.error("Failed to save checkout. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Ensure checkout dates are parsed if they come from the store as strings
  const checkoutsWithParsedDates = checkouts.map((checkout: any) => ({
    ...checkout,
    date: checkout.date instanceof Date ? checkout.date : new Date(checkout.date),
  }));

  const todaysCheckout = checkoutsWithParsedDates.find((checkout:any) => checkout.date.toDateString() === new Date().toDateString())

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center"> {/* Added a div for alignment */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()} // Back button functionality
            className="mr-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">End-of-Day Checkout</h1>
            <p className="text-gray-400 mt-2">Summarize your day and prepare for tomorrow</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Select value={exportFormat} onValueChange={(value: "pdf" | "markdown") => setExportFormat(value)}>
            <SelectTrigger className="w-32 bg-gray-700 border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="markdown">Markdown</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {todaysCheckout && (
        <Card className="bg-green-900/20 border-green-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-600">Completed</Badge>
              <span className="text-green-400">You've already completed your checkout for today!</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Checkout Form */}
        <div className="lg:col-span-2 space-y-4">
          {/* Task Summary */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Today's Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-gray-300 font-medium">Completed Tasks ({completedTasks.length})</h4>
                {completedTasks.length === 0 ? (
                  <p className="text-gray-400 text-sm">No completed tasks today</p>
                ) : (
                  completedTasks.map((task:any) => (
                    <div key={task.id} className="flex items-center space-x-3">
                      <Checkbox
                        checked={selectedTasks.includes(task.id)}
                        onCheckedChange={() => handleTaskToggle(task.id)}
                      />
                      <div className="flex-1">
                        <p className="text-white text-sm">{task.title}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {task.category}
                          </Badge>
                          <Badge className="bg-green-600 text-white text-xs">Completed</Badge>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-700">
                <h4 className="text-gray-300 font-medium">In Progress Tasks ({inProgressTasks.length})</h4>
                {inProgressTasks.length === 0 ? (
                  <p className="text-gray-400 text-sm">No tasks in progress</p>
                ) : (
                  inProgressTasks.map((task:any) => (
                    <div key={task.id} className="flex items-center space-x-3">
                      <Checkbox
                        checked={selectedTasks.includes(task.id)}
                        onCheckedChange={() => handleTaskToggle(task.id)}
                      />
                      <div className="flex-1">
                        <p className="text-white text-sm">{task.title}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {task.category}
                          </Badge>
                          <Badge className="bg-yellow-600 text-white text-xs">In Progress</Badge>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Reflection Questions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <LogOut className="w-5 h-5 mr-2" />
                Daily Reflection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {checkoutPrompts.map((prompt, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-gray-300 font-medium">{prompt}</label>
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={responses[prompt] || ""}
                    onChange={(e) => handleResponseChange(prompt, e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white min-h-[80px] resize-none"
                  />
                </div>
              ))}

              <div className="flex justify-end space-x-2">
                <Button onClick={handleSaveCheckout} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                  {isSubmitting ? "Saving..." : "Save Checkout"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Tasks Completed</span>
                <span className="text-green-400 font-medium">{completedTasks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">In Progress</span>
                <span className="text-yellow-400 font-medium">{inProgressTasks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Selected for Export</span>
                <span className="text-blue-400 font-medium">{selectedTasks.length}</span>
              </div>
              <div className="pt-2 border-t border-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-400">Productivity Score</span>
                  <span className="text-green-400 font-medium">
                    {tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Export Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-gray-300 text-sm">Export Format:</p>
                <Select value={exportFormat} onValueChange={(value: "pdf" | "markdown") => setExportFormat(value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        PDF Report
                      </div>
                    </SelectItem>
                    <SelectItem value="markdown">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Markdown File
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleExport} className="w-full bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Export Summary
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Checkouts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {checkoutsWithParsedDates.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No checkouts yet</p>
              ) : (
                checkoutsWithParsedDates.slice(0, 3).map((checkout:any) => (
                  <motion.div
                    key={checkout.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 bg-gray-700 rounded-lg border border-gray-600 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-400">{checkout.date.toLocaleDateString()}</span>
                      <Badge variant="outline" className="text-xs">
                        {checkout.selectedTasks.length} tasks
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-xs">Daily checkout completed</p>
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
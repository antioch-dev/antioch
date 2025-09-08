"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Clock, Calendar, Repeat, Edit, Trash2, Play, Pause } from "lucide-react"
import { useStore, type RecurringTask } from "@/lib/store"
import { toast } from "sonner"

const frequencyLabels = {
  daily: "Daily",
  weekly: "Weekly",
  biweekly: "Bi-weekly",
  monthly: "Monthly",
}

const categoryColors = {
  Meeting: "bg-blue-600",
  Development: "bg-green-600",
  Review: "bg-purple-600",
  Planning: "bg-orange-600",
  Admin: "bg-gray-600",
  Personal: "bg-pink-600",
}

export default function RecurringTasksPage() {
  const { recurringTasks, addRecurringTask, updateRecurringTask, toggleRecurringTask, deleteRecurringTask } = useStore()
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editingTask, setEditingTask] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    frequency: "daily" as RecurringTask["frequency"],
    time: "09:00",
    category: "Meeting",
    startDate: new Date().toISOString().split("T")[0],
  })

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      frequency: "daily",
      time: "09:00",
      category: "Meeting",
      startDate: new Date().toISOString().split("T")[0],
    })
    setEditingTask(null)
  }

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a task title")
      return
    }

    const taskData = {
      ...formData,
      isActive: true,
      nextOccurrence: new Date(formData.startDate ?? ""),
      startDate: new Date(formData.startDate ?? ""),
    }

    if (editingTask) {
      updateRecurringTask(editingTask, taskData)
      toast.success("Recurring task updated!")
    } else {
      addRecurringTask(taskData)
      toast.success("Recurring task created!")
    }

    setShowCreateDialog(false)
    resetForm()
  }

  const handleEdit = (task: RecurringTask) => {
    setFormData({
      title: task.title,
      description: task.description,
      frequency: task.frequency,
      time: task.time,
      category: task.category,
      startDate: new Date(task.startDate).toISOString().split("T")[0],
    })
    setEditingTask(task.id)
    setShowCreateDialog(true)
  }

  const handleDelete = (id: string) => {
    deleteRecurringTask(id)
    toast.success("Recurring task deleted!")
  }

  const handleToggle = (id: string) => {
    toggleRecurringTask(id)
    const task = recurringTasks.find((t) => t.id === id)
    toast.success(`Task ${task?.isActive ? "paused" : "activated"}!`)
  }

  const getNextOccurrenceText = (task: RecurringTask) => {
    const nextDate = task.nextOccurrence instanceof Date ? task.nextOccurrence : new Date(task.nextOccurrence)
    const startDate = task.startDate instanceof Date ? task.startDate : new Date(task.startDate)

    const isToday = nextDate.toDateString() === new Date().toDateString()
    const isTomorrow = nextDate.toDateString() === new Date(Date.now() + 86400000).toDateString()

    if (isToday) return "Today"
    if (isTomorrow) return "Tomorrow"
    return nextDate.toLocaleDateString()
  }

  const getStartDateText = (task: RecurringTask) => {
    const startDate = task.startDate instanceof Date ? task.startDate : new Date(task.startDate)
    return startDate.toLocaleDateString()
  }

  const activeCount = recurringTasks.filter((task) => task.isActive).length
  const inactiveCount = recurringTasks.filter((task) => !task.isActive).length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Recurring Tasks</h1>
          <p className="text-gray-400 mt-2">Manage your repeating tasks and schedules</p>
        </div>
        <Dialog
          open={showCreateDialog}
          onOpenChange={(open) => {
            setShowCreateDialog(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Recurring Task
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingTask ? "Edit Recurring Task" : "Create New Recurring Task"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-gray-300">
                  Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-gray-700 border-gray-600"
                  placeholder="e.g. Daily Standup Meeting"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-gray-700 border-gray-600"
                  placeholder="Brief description of the task..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="frequency" className="text-gray-300">
                    Frequency
                  </Label>
                  <Select
                    value={formData.frequency}
                    onValueChange={(value) => setFormData({ ...formData, frequency: value as RecurringTask["frequency"] })}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="time" className="text-gray-300">
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-gray-300">
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Meeting">Meeting</SelectItem>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Review">Review</SelectItem>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Personal">Personal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="startDate" className="text-gray-300">
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                  {editingTask ? "Update Task" : "Create Task"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Tasks</p>
                <p className="text-2xl font-bold text-white">{recurringTasks.length}</p>
              </div>
              <Repeat className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active</p>
                <p className="text-2xl font-bold text-green-400">{activeCount}</p>
              </div>
              <Play className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Paused</p>
                <p className="text-2xl font-bold text-yellow-400">{inactiveCount}</p>
              </div>
              <Pause className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Due Today</p>
                <p className="text-2xl font-bold text-purple-400">
                  {
                    recurringTasks.filter((task) => {
                      const nextDate =
                        task.nextOccurrence instanceof Date ? task.nextOccurrence : new Date(task.nextOccurrence)
                      return nextDate.toDateString() === new Date().toDateString() && task.isActive
                    }).length
                  }
                </p>
              </div>
              <Calendar className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recurringTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <Card
              className={`bg-gray-800 border-gray-700 transition-all ${task.isActive ? "ring-2 ring-green-500/20" : "opacity-75"}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg flex items-center">
                      {task.title}
                      <Badge
                        className={`ml-2 text-xs ${categoryColors[task.category as keyof typeof categoryColors] || "bg-gray-600"}`}
                      >
                        {task.category}
                      </Badge>
                    </CardTitle>
                    <p className="text-gray-400 text-sm mt-1">{task.description}</p>
                  </div>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(task)}
                      className="text-gray-400 hover:text-white p-1 h-8 w-8"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(task.id)}
                      className="text-gray-400 hover:text-red-400 p-1 h-8 w-8"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Frequency and Time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Repeat className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300 text-sm">{frequencyLabels[task.frequency]}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">{task.time}</span>
                  </div>
                </div>

                {/* Start Date and Next Occurrence */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Starts:</span>
                    <span className="text-gray-300">{getStartDateText(task)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Next:</span>
                    <span className="text-gray-300">{getNextOccurrenceText(task)}</span>
                  </div>
                </div>

                {/* Active Toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                  <span className="text-gray-300 text-sm">{task.isActive ? "Active" : "Paused"}</span>
                  <Switch
                    checked={task.isActive}
                    onCheckedChange={() => handleToggle(task.id)}
                    className="data-[state=checked]:bg-green-600"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Empty State */}
        {recurringTasks.length === 0 && (
          <div className="col-span-full">
            <Card className="bg-gray-800 border-gray-700 border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Repeat className="w-12 h-12 text-gray-600 mb-4" />
                <h3 className="text-gray-400 text-lg font-medium mb-2">No recurring tasks yet</h3>
                <p className="text-gray-500 text-sm mb-4">Create your first recurring task to get started</p>
                <Button onClick={() => setShowCreateDialog(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Recurring Task
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
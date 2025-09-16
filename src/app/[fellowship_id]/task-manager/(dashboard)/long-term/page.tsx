"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Calendar, Users, Clock, Edit, Trash2 } from "lucide-react"
import { useStore, type LongTermTask } from "@/lib/store"
import { toast } from "sonner"

const kanbanColumns = [
  { id: "backlog", title: "Backlog", color: "bg-gray-600" },
  { id: "planning", title: "Planning", color: "bg-blue-600" },
  { id: "in-progress", title: "In Progress", color: "bg-yellow-600" },
  { id: "blocked", title: "Blocked", color: "bg-red-600" },
  { id: "done", title: "Done", color: "bg-green-600" },
]

export default function LongTermTasksPage() {
  const { longTermTasks, addLongTermTask, updateLongTermTask, moveLongTermTask, deleteLongTermTask, teamMembers } =
    useStore()
  const [draggedTask, setDraggedTask] = useState<string | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editingTask, setEditingTask] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as LongTermTask["priority"],
    assignees: [] as string[],
    dueDate: "",
    tags: [] as string[],
    progress: 0,
  })

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      assignees: [],
      dueDate: "",
      tags: [],
      progress: 0,
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
      status: "backlog" as LongTermTask["status"],
      dueDate: formData.dueDate ? new Date(formData.dueDate) : new Date(Date.now() + 30 * 86400000),
    }

    if (editingTask) {
      updateLongTermTask(editingTask, taskData)
      toast.success("Long-term task updated!")
    } else {
      addLongTermTask(taskData)
      toast.success("Long-term task created!")
    }

    setShowCreateDialog(false)
    resetForm()
  }

  const handleEdit = (task: LongTermTask) => {
    // Ensure dueDate is a Date object
    const dueDate = task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate)

    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      assignees: task.assignees,
      dueDate: dueDate?.toISOString().split("T")[0] ?? "",
      tags: task.tags,
      progress: task.progress,
    })
    setEditingTask(task.id)
    setShowCreateDialog(true)
  }

  const handleDelete = (id: string) => {
    deleteLongTermTask(id)
    toast.success("Long-term task deleted!")
  }

  const getTasksByStatus = (status: string) => {
    return longTermTasks.filter((task) => task.status === status)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-600"
      case "high":
        return "bg-orange-600"
      case "medium":
        return "bg-yellow-600"
      case "low":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId)
  }

  const handleDragEnd = () => {
    setDraggedTask(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, newStatus: LongTermTask["status"]) => {
    e.preventDefault()
    if (draggedTask) {
      moveLongTermTask(draggedTask, newStatus)
      toast.success(`Task moved to ${newStatus.replace("-", " ")}!`)
      setDraggedTask(null)
    }
  }

  const handleTagInput = (value: string) => {
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
    setFormData({ ...formData, tags })
  }

  const handleAssigneeToggle = (memberId: string) => {
    const member = teamMembers.find((m) => m.id === memberId)
    if (!member) return

    const memberName = member.name
    setFormData((prev) => ({
      ...prev,
      assignees: prev.assignees.includes(memberName)
        ? prev.assignees.filter((name) => name !== memberName)
        : [...prev.assignees, memberName],
    }))
  }

  // Helper function to safely format dates
  const formatDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date)
    return dateObj.toLocaleDateString()
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Long Term Tasks</h1>
          <p className="text-gray-400 mt-2">Manage complex projects and multi-step tasks</p>
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
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingTask ? "Edit Long-term Task" : "Create New Long-term Task"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="text-gray-300">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div>
                  <Label htmlFor="priority" className="text-gray-300">
                    Priority
                  </Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: LongTermTask["priority"]) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dueDate" className="text-gray-300">
                    Due Date
                  </Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div>
                  <Label htmlFor="progress" className="text-gray-300">
                    Progress (%)
                  </Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => setFormData({ ...formData, progress: Number.parseInt(e.target.value) || 0 })}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-300">Tags (comma-separated)</Label>
                <Input
                  value={formData.tags.join(", ")}
                  onChange={(e) => handleTagInput(e.target.value)}
                  placeholder="e.g. Frontend, React, Mobile"
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label className="text-gray-300">Assignees</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.assignees.includes(member.name)}
                        onChange={() => handleAssigneeToggle(member.id)}
                        className="rounded"
                      />
                      <span className="text-gray-300 text-sm">{member.name}</span>
                    </div>
                  ))}
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
      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 min-h-[600px]">
        {kanbanColumns.map((column) => (
          <Card key={column.id} className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${column.color} mr-2`} />
                  {column.title}
                </div>
                <Badge variant="outline" className="text-xs">
                  {getTasksByStatus(column.id).length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent
              className="space-y-3 min-h-[500px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id as LongTermTask["status"])}
            >
              {getTasksByStatus(column.id).map((task) => (
                <motion.div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                  onDragEnd={handleDragEnd}
                  whileHover={{ scale: 1.02 }}
                  whileDrag={{ scale: 1.05, rotate: 2 }}
                  className="p-4 bg-gray-700 rounded-lg border border-gray-600 cursor-move hover:bg-gray-600 transition-colors"
                >
                  <div className="space-y-3">
                    {/* Task Header */}
                    <div className="flex items-start justify-between">
                      <h3 className="text-white font-medium text-sm leading-tight">{task.title}</h3>
                      <div className="flex items-center space-x-1 ml-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(task)}
                          className="text-gray-400 hover:text-white p-1 h-6 w-6"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(task.id)}
                          className="text-gray-400 hover:text-red-400 p-1 h-6 w-6"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getPriorityColor(task.priority)} text-white text-xs`}>{task.priority}</Badge>
                    </div>
                    {/* Description */}
                    <p className="text-gray-400 text-xs line-clamp-2">{task.description}</p>
                    {/* Progress Bar */}
                    {task.progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-gray-300">{task.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full transition-all"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {task.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {task.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{task.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-400">{formatDate(task.dueDate)}</span>
                      </div>
                      <div className="flex -space-x-1">
                        {task.assignees.slice(0, 2).map((assignee, index) => (
                          <Avatar key={index} className="w-6 h-6 border-2 border-gray-700">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback className="text-xs">
                              {assignee
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {task.assignees.length > 2 && (
                          <div className="w-6 h-6 rounded-full bg-gray-600 border-2 border-gray-700 flex items-center justify-center">
                            <span className="text-xs text-gray-300">+{task.assignees.length - 2}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {/* Add Task Button */}
              <Button
                variant="ghost"
                onClick={() => setShowCreateDialog(true)}
                className="w-full border-2 border-dashed border-gray-600 hover:border-gray-500 hover:bg-gray-700/50 text-gray-400 hover:text-gray-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Projects</p>
                <p className="text-2xl font-bold text-white">{longTermTasks.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-yellow-400">{getTasksByStatus("in-progress").length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-400">{getTasksByStatus("done").length}</p>
              </div>
              <Users className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Blocked</p>
                <p className="text-2xl font-bold text-red-400">{getTasksByStatus("blocked").length}</p>
              </div>
              <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">!</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

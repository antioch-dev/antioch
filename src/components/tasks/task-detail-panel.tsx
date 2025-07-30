"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Tag, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { useState } from "react"

const statusColors = {
  not_started: "bg-gray-500",
  in_progress: "bg-blue-500",
  completed: "bg-green-500",
  blocked: "bg-red-500",
}

const priorityColors = {
  low: "text-gray-400",
  medium: "text-yellow-400",
  high: "text-orange-400",
  urgent: "text-red-400",
}

export function TaskDetailPanel() {
  const { selectedTask, setSelectedTask, updateTask } = useStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(selectedTask)

  if (!selectedTask) return null

  const handleSave = () => {
    if (editedTask) {
      updateTask(selectedTask.id, editedTask)
      setSelectedTask(editedTask)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTask(selectedTask)
    setIsEditing(false)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-96 bg-gray-900 border-l border-gray-800 z-50 overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Task Details</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedTask(null)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label className="text-gray-300">Title</Label>
            {isEditing ? (
              <Input
                value={editedTask?.title || ""}
                onChange={(e) => setEditedTask((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                className="bg-gray-800 border-gray-700 text-white"
              />
            ) : (
              <h1 className="text-xl font-semibold text-white">{selectedTask.title}</h1>
            )}
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Status</Label>
              {isEditing ? (
                <Select
                  value={editedTask?.status}
                  onValueChange={(value) => setEditedTask((prev) => (prev ? { ...prev, status: value as any } : null))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="not_started">Not Started</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge className={cn("text-white border-0", statusColors[selectedTask.status])}>
                  {selectedTask.status.replace("_", " ")}
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Priority</Label>
              {isEditing ? (
                <Select
                  value={editedTask?.priority}
                  onValueChange={(value) =>
                    setEditedTask((prev) => (prev ? { ...prev, priority: value as any } : null))
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center space-x-2">
                  <AlertCircle className={cn("w-4 h-4", priorityColors[selectedTask.priority])} />
                  <span className={cn("capitalize", priorityColors[selectedTask.priority])}>
                    {selectedTask.priority}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-gray-300">Description</Label>
            {isEditing ? (
              <Textarea
                value={editedTask?.description || ""}
                onChange={(e) => setEditedTask((prev) => (prev ? { ...prev, description: e.target.value } : null))}
                className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                placeholder="Add a description..."
              />
            ) : (
              <p className="text-gray-400 text-sm">{selectedTask.description || "No description provided."}</p>
            )}
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label className="text-gray-300">Due Date</Label>
            {isEditing ? (
              <Input
                type="datetime-local"
                value={editedTask?.due_date ? new Date(editedTask.due_date).toISOString().slice(0, 16) : ""}
                onChange={(e) => setEditedTask((prev) => (prev ? { ...prev, due_date: e.target.value } : null))}
                className="bg-gray-800 border-gray-700 text-white"
              />
            ) : (
              <div className="flex items-center space-x-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {selectedTask.due_date ? new Date(selectedTask.due_date).toLocaleString() : "No due date set"}
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-gray-300">Tags</Label>
            {selectedTask.tags && selectedTask.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedTask.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-gray-400 border-gray-600">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No tags assigned</p>
            )}
          </div>

          {/* Timestamps */}
          <div className="space-y-3 pt-4 border-t border-gray-800">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>Created: {new Date(selectedTask.created_at).toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>Updated: {new Date(selectedTask.updated_at).toLocaleString()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="flex-1">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="flex-1">
                Edit Task
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

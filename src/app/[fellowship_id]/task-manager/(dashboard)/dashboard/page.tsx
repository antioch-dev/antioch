"use client"

import { motion } from "framer-motion"
import { CheckSquare, Users, RotateCcw, LogIn, LogOut, Calendar, ChevronDown, ChevronRight, Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TaskCard } from "@/components/tasks/task-card"
import { TaskForm } from "@/components/tasks/task-form"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const categories = [
  {
    id: "general",
    name: "Task CRUD",
    description: "Create, read, update, and delete tasks",
    icon: CheckSquare,
    color: "bg-blue-500",
  },
  {
    id: "assignment",
    name: "Assignments",
    description: "Tasks assigned to team members",
    icon: Users,
    color: "bg-green-500",
  },
  {
    id: "recurring",
    name: "Recurring Tasks",
    description: "Tasks that repeat on a schedule",
    icon: RotateCcw,
    color: "bg-purple-500",
  },
  {
    id: "long_term",
    name: "Long Term Tasks",
    description: "Complex, multi-step projects",
    icon: Calendar,
    color: "bg-orange-500",
  },
]

export default function DashboardPage() {
  const { tasks } = useStore()
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["general"])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const getTasksByCategory = (categoryId: string) => {
    return tasks.filter((task) => task.category === categoryId)
  }

  const getStatusCounts = () => {
    const counts = {
      not_started: 0,
      in_progress: 0,
      completed: 0,
      blocked: 0,
    }

    tasks.forEach((task) => {
      counts[task.status]++
    })

    return counts
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Manage your tasks and track progress across all categories</p>
        </div>
        <TaskForm />
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-gray-400 text-sm">Not Started</span>
            </div>
            <p className="text-2xl font-bold text-white mt-2">{statusCounts.not_started}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-400 text-sm">In Progress</span>
            </div>
            <p className="text-2xl font-bold text-white mt-2">{statusCounts.in_progress}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm">Completed</span>
            </div>
            <p className="text-2xl font-bold text-white mt-2">{statusCounts.completed}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-gray-400 text-sm">Blocked</span>
            </div>
            <p className="text-2xl font-bold text-white mt-2">{statusCounts.blocked}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Task Categories */}
      <div className="space-y-4">
        {categories.map((category, index) => {
          const categoryTasks = getTasksByCategory(category.id)
          const isExpanded = expandedCategories.includes(category.id)

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", category.color)}>
                        <category.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white">{category.name}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                        {categoryTasks.length} tasks
                      </Badge>
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent>
                    {categoryTasks.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryTasks.map((task) => (
                          <TaskCard key={task.id} task={task} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                          <category.icon className="w-8 h-8 text-gray-600" />
                        </div>
                        <p className="text-gray-400 mb-4">No tasks in this category yet</p>
                        <TaskForm
                          trigger={
                            <Button variant="outline" size="sm">
                              <Plus className="w-4 h-4 mr-2" />
                              Add Task
                            </Button>
                          }
                        />
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
          <CardContent className="p-4 text-center">
            <LogIn className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="text-white font-medium">Daily Check-in</h3>
            <p className="text-gray-400 text-sm">Log your daily progress</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
          <CardContent className="p-4 text-center">
            <LogOut className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="text-white font-medium">Daily Check-out</h3>
            <p className="text-gray-400 text-sm">End your day with notes</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h3 className="text-white font-medium">Team Assignments</h3>
            <p className="text-gray-400 text-sm">Manage team workload</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <h3 className="text-white font-medium">Long Term Planning</h3>
            <p className="text-gray-400 text-sm">Plan complex projects</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

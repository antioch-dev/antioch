"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Search, Filter, SortAsc, Grid, List, LogIn, LogOut, Users, Calendar, Plus, CheckSquare, RotateCcw, ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link" 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TaskCard } from "@/components/tasks/task-card"
import { TaskForm } from "@/components/tasks/task-form"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [sortBy, setSortBy] = useState("created_at")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredAndSortedTasks = tasks
    .filter((task:any) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || task.status === statusFilter
      const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
    .sort((a:any, b:any) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "due_date":
          if (!a.due_date && !b.due_date) return 0
          if (!a.due_date) return 1
          if (!b.due_date) return -1
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
        case "priority":
          const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }

          return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder]
        case "created_at":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Tasks</h1>
          <p className="text-gray-400 mt-1">Create, manage, and track all your tasks</p>
        </div>
        <TaskForm />
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
      >
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="not_started">Not Started</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-white">
                <SortAsc className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="created_at">Created Date</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="due_date">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="text-gray-400 hover:text-white"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
            className="text-gray-400 hover:text-white"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-400 text-sm"
      >
        Showing {filteredAndSortedTasks.length} of {tasks.length} tasks
      </motion.div>

      {/* Tasks Grid/List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={cn(
          "gap-4",
          viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col space-y-4",
        )}
      >
        {filteredAndSortedTasks.length > 0 ? (
          filteredAndSortedTasks.map((task:any, index:any) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <TaskCard task={task} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-white font-medium mb-2">No tasks found</h3>
            <p className="text-gray-400 mb-4">
              {searchQuery || statusFilter !== "all" || priorityFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Create your first task to get started"}
            </p>
            {!searchQuery && statusFilter === "all" && priorityFilter === "all" && (
              <TaskForm trigger={<Button>Create your first task</Button>} />
            )}
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Daily Check-in Card  */}
        <Link href="/task-manager/main/checkin" passHref>
          <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
            <CardContent className="p-4 text-center">
              <LogIn className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="text-white font-medium">Daily Check-in</h3>
              <p className="text-gray-400 text-sm">Log your daily progress</p>
            </CardContent>
          </Card>
        </Link>

        {/* Daily Check-out Card */}
        <Link href="/task-manager/main/checkout" passHref>
          <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
            <CardContent className="p-4 text-center">
              <LogOut className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="text-white font-medium">Daily Check-out</h3>
              <p className="text-gray-400 text-sm">End your day with notes</p>
            </CardContent>
          </Card>
        </Link>

        {/* Team Assignments Card  */}
        <Link href="/task-manager/main/assignments" passHref>
          <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h3 className="text-white font-medium">Team Assignments</h3>
              <p className="text-gray-400 text-sm">Manage team workload</p>
            </CardContent>
          </Card>
        </Link>

        {/* Long Term Planning Card  */}
        <Link href="/task-manager/main/long-term" passHref> 
          <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <h3 className="text-white font-medium">Long Term Planning</h3>
              <p className="text-gray-400 text-sm">Plan complex projects</p>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    </div>
  )
}

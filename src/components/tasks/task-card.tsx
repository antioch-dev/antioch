"use client"

import { motion } from "framer-motion"
import { Calendar, User, Tag, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { Database } from "@/lib/supabase"
import { useStore } from "@/lib/store"

type Task = Database["public"]["Tables"]["tasks"]["Row"]

interface TaskCardProps {
  task: Task
  onClick?: () => void
}

const statusColors = {
  not_started: "bg-gray-500",
  in_progress: "bg-blue-500",
  completed: "bg-green-500",
  blocked: "bg-red-500",
}

const priorityColors = {
  low: "border-l-gray-400",
  medium: "border-l-yellow-400",
  high: "border-l-orange-400",
  urgent: "border-l-red-400",
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const { setSelectedTask } = useStore()

  const handleClick = () => {
    setSelectedTask(task)
    onClick?.()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "bg-gray-800 border border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-750 transition-colors border-l-4",
        priorityColors[task.priority],
      )}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-white font-medium text-sm line-clamp-2">{task.title}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-400 hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 border-gray-700">
            <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-gray-700">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {task.description && <p className="text-gray-400 text-xs mb-3 line-clamp-2">{task.description}</p>}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className={cn("text-xs text-white border-0", statusColors[task.status])}>
            {task.status.replace("_", " ")}
          </Badge>
          <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
            {task.priority}
          </Badge>
        </div>

        <div className="flex items-center space-x-2 text-gray-400">
          {task.due_date && (
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span className="text-xs">{new Date(task.due_date).toLocaleDateString()}</span>
            </div>
          )}
          {task.assignee_id && <User className="w-3 h-3" />}
        </div>
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className="flex items-center space-x-1 mt-3">
          <Tag className="w-3 h-3 text-gray-400" />
          <div className="flex flex-wrap gap-1">
            {task.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs text-gray-400 border-gray-600 px-1 py-0">
                {tag}
              </Badge>
            ))}
            {task.tags.length > 3 && (
              <Badge variant="outline" className="text-xs text-gray-400 border-gray-600 px-1 py-0">
                +{task.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}

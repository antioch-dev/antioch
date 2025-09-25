"use client"

import { motion } from "framer-motion"
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  RotateCcw,
  LogIn,
  LogOut,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"

const basePath = "/fellowship1/task-manager"
const navigation = [
  { name: "Dashboard", href: `${basePath}/dashboard`, icon: LayoutDashboard },
  { name: "Task CRUD", href: `${basePath}/tasks`, icon: CheckSquare },
  { name: "Assignments", href: `${basePath}/assignments`, icon: Users },
  { name: "Recurring Tasks", href: `${basePath}/recurring`, icon: RotateCcw },
  { name: "Check-in", href: `${basePath}/checkin`, icon: LogIn },
  { name: "Check-out", href: `${basePath}/checkout`, icon: LogOut },
  { name: "Long Term Tasks", href: `${basePath}/long-term`, icon: Calendar },
  { name: "Settings", href: `${basePath}/settings`, icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen, setSidebarOpen } = useStore()

  return (
    <motion.div
      initial={false}
      animate={{ width: sidebarOpen ? 280 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative flex flex-col bg-gray-900 border-r border-gray-800 h-full flex-shrink-0"
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border border-gray-700 bg-gray-900 hover:bg-gray-800"
      >
        {sidebarOpen ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
      </Button>

      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-bold text-white"
            >
              TaskFlow
            </motion.span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white",
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="ml-3"
                  >
                    {item.name}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>
    </motion.div>
  )
}

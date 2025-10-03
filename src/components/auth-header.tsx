"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, User, Settings } from "lucide-react"

interface AuthUser {
  id: string
  email: string
  name?: string | null
  role: string
}

export function AuthHeader() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser({
        id: "1",
        email: "admin@example.com",
        name: "John Admin",
        role: "admin",
      })
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const handleLogout = () => {
    setUser(null)
    router.push("/login")
  }

  const handleSettingsClick = () => {
    router.push("/settings")
  }

  const getInitials = (name?: string | null, email?: string): string => {
    if (name?.trim()) {
      return name
        .trim()
        .split(/\s+/)
        .map((n) => n.charAt(0).toUpperCase())
        .slice(0, 2)
        .join("")
    }
    return email?.charAt(0)?.toUpperCase() ?? "U"
  }

  const getRoleLabel = (role: string): string => {
    const roleLabels: Record<string, string> = {
      admin: "System Admin",
      fellowship_manager: "Fellowship Manager",
      developer: "Developer",
    }
    return roleLabels[role] ?? "User"
  }

  if (isLoading || !user) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(user.name, user.email)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.name ?? "Admin User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {getRoleLabel(user.role)}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettingsClick}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
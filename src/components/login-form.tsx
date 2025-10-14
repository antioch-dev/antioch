"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertCircle, Eye, EyeOff } from "lucide-react"

interface AuthUser {
  id: string
  email: string
  name: string
  role: string
}

// Mock users data
const mockUsers = [
  {
    id: "1",
    email: "admin@example.com",
    name: "System Admin",
    role: "admin",
    password: "admin123",
  },
  {
    id: "2",
    email: "fellowship@example.com",
    name: "Fellowship Manager",
    role: "fellowship_manager",
    password: "fellowship123",
  },
  {
    id: "3",
    email: "dev@example.com",
    name: "Developer",
    role: "developer",
    password: "dev123",
  },
]

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock authentication - find user with matching credentials
      const user = mockUsers.find(u => u.email === email && u.password === password)

      if (!user) {
        throw new Error("Invalid email or password")
      }

      // Create user object without password
      const userData: AuthUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }

      // Store user in localStorage to simulate login state
      localStorage.setItem("currentUser", JSON.stringify(userData))

      // Redirect based on user role
      if (user.role === "fellowship_manager") {
        router.push("/fellowship1/Feedback/fellowship")
      } else {
        router.push("/fellowship1/Feedback/admin")
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // Optional: Pre-fill demo credentials for easier testing
  const fillDemoCredentials = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Enter your credentials to access the dashboard</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-2">Demo Credentials:</p>
            <div className="space-y-2 text-xs">
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <span>Admin:</span>
                  <button
                    type="button"
                    onClick={() => fillDemoCredentials("admin@example.com", "admin123")}
                    className="text-primary hover:underline"
                  >
                    admin@example.com / admin123
                  </button>
                </div>
                <div className="flex gap-2">
                  <span>Fellowship:</span>
                  <button
                    type="button"
                    onClick={() => fillDemoCredentials("fellowship@example.com", "fellowship123")}
                    className="text-primary hover:underline"
                  >
                    fellowship@example.com / fellowship123
                  </button>
                </div>
                <div className="flex gap-2">
                  <span>Developer:</span>
                  <button
                    type="button"
                    onClick={() => fillDemoCredentials("dev@example.com", "dev123")}
                    className="text-primary hover:underline"
                  >
                    dev@example.com / dev123
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
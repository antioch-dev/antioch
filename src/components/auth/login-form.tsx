"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const success = await signIn(email)
      if (!success) {
        setError("Invalid email address. Please contact your fellowship administrator.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto animate-scale-in card-animated hover:shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Fellowship Login
        </CardTitle>
        <CardDescription>Sign in to manage fellowship blog posts</CardDescription>
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
              placeholder="your.email@fellowship.org"
              required
              disabled={loading}
              className="input-animated focus:border-primary focus:ring-primary/20"
            />
          </div>

          {error && (
            <Alert variant="destructive" className="animate-slide-up">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full btn-animated bg-primary hover:bg-accent transition-all duration-200"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-muted rounded-lg transition-all duration-200 hover:bg-accent/10 hover:border-accent/20 border border-transparent">
          <p className="text-sm text-muted-foreground mb-2">Demo Account:</p>
          <p className="text-sm font-mono text-primary">admin@fellowship.org</p>
        </div>
      </CardContent>
    </Card>
  )
}

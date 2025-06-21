 "use client"
import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Mail, Lock, Facebook, Github, Cross } from "lucide-react"
import { BackgroundGallery } from "@/components/background-gallery"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  const galleryImages = [
    "https://maravianwebservices.com/images/wicf/20241231_crossover/thumbnails/tn_Cross%20over004.jpg",
    "https://maravianwebservices.com/images/wicf/20250222_relationship_conference/thumbnails/tn_IMG_0090.jpg",
    "https://maravianwebservices.com/images/wicf/20241130_worship_experience_1/thumbnails/tn_IMG_2925.JPG",
    "https://files.maravianwebservices.com/wicf/20250405_sof_championship_1/thumbnails/tn_IMG_8116.jpg",
    "https://maravianwebservices.com/images/wicf/20241130_worship_experience_2/thumbnails/tn_WICF-35.jpg",
    "https://maravianwebservices.com/images/wicf/20241130_worship_experience_2/thumbnails/tn_IMG_2941.JPG",
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      <BackgroundGallery images={galleryImages} />

      <div className="container py-8 z-10">
        <Link href="/" className="inline-flex items-center text-white hover:text-gray-200">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to home
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-12 z-10">
        <Card className="w-full max-w-md border-gray-200 shadow-lg bg-white/95">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <Cross className="h-10 w-10 text-black" />
            </div>
            <CardTitle className="text-2xl font-bold text-black">Welcome back</CardTitle>
            <CardDescription>Sign in to your Antioch fellowship account</CardDescription>
            <div className="pt-2">
              <p className="text-xs text-gray-500 italic">
                "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit."
                <span className="block mt-1">— John 15:5</span>
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10 border-gray-200 focus-visible:ring-black"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-black hover:text-gray-600 text-sm">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10 border-gray-200 focus-visible:ring-black"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Button variant="outline" className="border-gray-200">
                <Github className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Not yet part of our fellowship?{" "}
              <Link href="/register" className="text-black hover:text-gray-600 font-medium">
                Join us
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
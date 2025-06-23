"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Mail, CheckCircle, Cross } from "lucide-react"
import { BackgroundGallery } from "@/components/background-gallery"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate password reset process
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
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
        <Link href="/login" className="inline-flex items-center text-white hover:text-gray-200">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to login
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-12 z-10">
        <Card className="w-full max-w-md border-gray-200 shadow-lg bg-white/95">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <Cross className="h-10 w-10 text-black" />
            </div>
            <CardTitle className="text-2xl font-bold text-black">Forgot your password?</CardTitle>
            <CardDescription>
              {!isSubmitted
                ? "Enter your email and we&apos;ll send you a reset link" // FIX 2: Escaped ' in "we'll"
                : "Check your email for a password reset link"}
            </CardDescription>
            <div className="pt-2">
              <p className="text-xs text-gray-500 italic">
                {/* FIX 1: Escaped double quotes with &quot; */}
                &quot;Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.&quot;
                <span className="block mt-1">— Matthew 7:7</span>
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isSubmitted ? (
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
                <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <p className="text-gray-600">
                  We&apos;ve sent a password reset link to your email address. Please check your inbox and follow the {/* FIX 3: Escaped ' in "We've" */}
                  instructions.
                </p>
                <p className="text-sm text-gray-500">
                  If you don&apos;t see the email, check your spam folder or try again. {/* FIX 4: Escaped ' in "don't" */}
                </p>
                <Button onClick={() => setIsSubmitted(false)} className="mt-4 bg-black hover:bg-gray-800 text-white">
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Remember your password?{" "}
              <Link href="/login" className="text-black hover:text-gray-600 font-medium">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
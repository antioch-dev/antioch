"use client"

import React, { useState, useEffect } from "react"
// We are replacing next/link with a standard <a> tag to fix the compilation error.
// import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Heart, CheckCircle, ArrowLeft, Sparkles } from "lucide-react"

// Correctly type params as a Promise
interface PublicPrayerSubmitProps {
  params: Promise<{
    fellowship_id: string
  }>;
}

export default function PublicPrayerSubmit({ params }: PublicPrayerSubmitProps) {
  // Use React.use() to unwrap the params Promise, which ensures the value is the same on both the server and client
  const { fellowship_id } = React.use(params)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    fellowshipName: fellowship_id,
    contact: "",
    category: "",
    text: "",
    isPrivate: false,
  })

  // Use useEffect to get the window.location.href only on the client side after hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href)
    }
  }, [])

  const safeFellowshipName = fellowship_id || "fellowship"
  const formattedFellowshipName = safeFellowshipName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log("[v0] Submitting public prayer request:", formData)
    setIsConfirmationOpen(true)

    // Reset form
    setFormData({
      name: "",
      fellowshipName: fellowship_id,
      contact: "",
      category: "",
      text: "",
      isPrivate: false,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <a href={`/${fellowship_id}/Prayer-system/prayer`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Prayer System
              </Button>
            </a>
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <h1 className="text-xl font-serif font-bold text-gray-900">{formattedFellowshipName} Prayer Requests</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-purple-600" />
            <h2 className="text-3xl font-serif font-bold text-gray-900">Submit a Prayer Request</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            Share your prayer needs with our caring community. Your request will be lifted up in prayer by our dedicated
            prayer team.
          </p>
        </div>

        <Card className="prayer-card-glow bg-white/95 backdrop-blur-sm border-purple-100">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-center">Prayer Request Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name (Optional for anonymity)</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name or leave blank for anonymous"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fellowship">Fellowship</Label>
                  <Input
                    id="fellowship"
                    value={formData.fellowshipName}
                    onChange={(e) => setFormData({ ...formData, fellowshipName: e.target.value })}
                    placeholder="Fellowship name if known"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Contact Info (Optional)</Label>
                <Input
                  id="contact"
                  type="email"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="your.email@example.com (for follow-up if desired)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Healing">Healing</SelectItem>
                    <SelectItem value="Guidance">Guidance</SelectItem>
                    <SelectItem value="Thanksgiving">Thanksgiving</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="text">Prayer Request *</Label>
                <Textarea
                  id="text"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="Please share your prayer request. Be as specific or general as you feel comfortable..."
                  rows={5}
                  required
                />
              </div>

              <div className="flex items-center space-x-2 p-4 bg-purple-50 rounded-lg border border-purple-100">
                <Checkbox
                  id="private"
                  checked={formData.isPrivate}
                  onCheckedChange={(checked) => setFormData({ ...formData, isPrivate: checked as boolean })}
                />
                <Label htmlFor="private" className="text-sm">
                  Make this request private (visible only to prayer leaders)
                </Label>
              </div>

              <Button type="submit" className="w-full prayer-button bg-purple-600 hover:bg-purple-700 text-lg py-6">
                <Heart className="h-5 w-5 mr-2" />
                Submit Prayer Request
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Share URL Info */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold text-blue-900 mb-2">Share This Prayer Request Form</h3>
              <p className="text-sm text-blue-700 mb-3">
                Anyone can use this link to submit prayer requests to your fellowship:
              </p>
              <div className="bg-white p-3 rounded border border-blue-200 text-sm font-mono text-blue-800">
                {shareUrl ? shareUrl : `/${fellowship_id}/Prayer-system/prayer/submit`}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-center">
                <CheckCircle className="h-6 w-6 text-green-600 mx-auto" />
                Prayer Request Submitted
              </DialogTitle>
              <DialogDescription className="text-center">
                Thank you for sharing your prayer request. Our prayer team has been notified and will lift up your
                request in prayer. You are loved and not alone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center pt-4">
              <Button onClick={() => setIsConfirmationOpen(false)} className="bg-green-600 hover:bg-green-700">
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

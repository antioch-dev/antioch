"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { saveComment, generateId } from "@/lib/storage"
import type { Comment } from "@/lib/types"

interface CommentFormProps {
  postId: string
  onCommentSubmitted: () => void
}

export function CommentForm({ postId, onCommentSubmitted }: CommentFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSubmitting(true)

    try {
      if (!name.trim() || !email.trim() || !content.trim()) {
        setError("All fields are required")
        return
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email address")
        return
      }

      const comment: Comment = {
        id: generateId(),
        postId,
        authorName: name.trim(),
        authorEmail: email.trim(),
        content: content.trim(),
        status: "pending",
        createdAt: new Date().toISOString(),
      }

      saveComment(comment)

      // Reset form
      setName("")
      setEmail("")
      setContent("")
      setSubmitted(true)
      onCommentSubmitted()

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError("Failed to submit comment. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert>
            <AlertDescription>
              Thank you for your comment! It has been submitted for review and will appear once approved.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Comment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                disabled={submitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={submitting}
              />
              <p className="text-xs text-muted-foreground">Your email will not be published</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Comment *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts..."
              rows={4}
              required
              disabled={submitting}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Comment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

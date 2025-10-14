"use client"

import { useState } from "react"
import { CommentForm } from "./comment-form"
import { CommentList } from "./comment-list"

interface CommentsSectionProps {
  postId: string
}

export function CommentsSection({ postId }: CommentsSectionProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleCommentSubmitted = () => {
    // Trigger a refresh of the comments list
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <CommentList postId={postId} refreshTrigger={refreshTrigger} />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <CommentForm postId={postId} onCommentSubmitted={handleCommentSubmitted} />
      </div>
    </div>
  )
}

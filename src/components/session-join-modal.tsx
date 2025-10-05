"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Users, LinkIcon } from "lucide-react"

interface SessionJoinModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onJoinSession: (sessionId: string, userName: string) => void
}

export function SessionJoinModal({ open, onOpenChange, onJoinSession }: SessionJoinModalProps) {
  const [sessionLink, setSessionLink] = useState("")
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleJoin = async () => {
    if (!sessionLink || !userName) return

    setIsLoading(true)

    // Extract session ID from link
    const sessionId = sessionLink.split("/").pop() || ""

    // Simulate joining delay
    setTimeout(() => {
      onJoinSession(sessionId, userName)
      setIsLoading(false)
      onOpenChange(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Join Live Session
          </DialogTitle>
          <DialogDescription>Enter the session link and your name to join the live Bible study</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="session-link">Session Link</Label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="session-link"
                placeholder="https://biblestudy.app/session/..."
                value={sessionLink}
                onChange={(e) => setSessionLink(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-name">Your Name</Label>
            <Input
              id="user-name"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleJoin} disabled={!sessionLink || !userName || isLoading} className="flex-1">
              {isLoading ? "Joining..." : "Join Session"}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            Make sure you have the correct session link from the session leader
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

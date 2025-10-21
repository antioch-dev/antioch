"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Users, MessageCircle, Smile } from "lucide-react"
import type { ChatMessage } from "@/lib/mock-data"

interface ChatPanelProps {
  eventId: string
  messages: ChatMessage[]
  onSendMessage: (message: string) => void
  currentUser?: string
}

export function ChatPanel({ eventId, messages, onSendMessage, currentUser = "Anonymous User" }: ChatPanelProps) {
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Mock typing indicator
  useEffect(() => {
    if (messages.length > 0) {
      const interval = setInterval(() => {
        setIsTyping(Math.random() > 0.7)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim())
      setNewMessage("")
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getMessageColor = (user: string) => {
    // Simple hash function to generate consistent colors for users
    let hash = 0
    for (let i = 0; i < user.length; i++) {
      hash = user.charCodeAt(i) + ((hash << 5) - hash)
    }
    const colors = [
      "text-blue-600 dark:text-blue-400",
      "text-green-600 dark:text-green-400",
      "text-purple-600 dark:text-purple-400",
      "text-orange-600 dark:text-orange-400",
      "text-pink-600 dark:text-pink-400",
      "text-indigo-600 dark:text-indigo-400",
    ]
    return colors[Math.abs(hash) % colors.length]
  }

  const onlineCount = Math.floor(Math.random() * 50) + 25 // Mock online count

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Live Chat
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Users className="w-3 h-3 mr-1" />
            {onlineCount} online
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <div className="space-y-3 py-2">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No messages yet. Be the first to say hello!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="group">
                  <div className="flex items-start space-x-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`font-semibold text-sm ${getMessageColor(message.user)}`}>{message.user}</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 dark:text-gray-100 break-words">{message.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-sm">Someone is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="pr-10"
                maxLength={500}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              >
                <Smile className="w-4 h-4" />
              </Button>
            </div>
            <Button type="submit" disabled={!newMessage.trim()} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Chatting as {currentUser}</span>
            <span>{newMessage.length}/500</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageSquare, Users, Bug, Mail, User, Calendar, MoreHorizontal } from "lucide-react"

interface FeedbackItem {
  id: string
  subject: string
  description: string
  category: "general" | "fellowship" | "bugs"
  status: "new" | "in_progress" | "resolved" | "archived"
  priority?: "low" | "medium" | "high" | "critical"
  contactEmail?: string
  contactName?: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
}

interface FeedbackListProps {
  searchQuery: string
  statusFilter: string
  categoryFilter: string
  assigneeFilter: string
}

type FeedbackStatus =  "new" | "in_progress" | "resolved" | "archived" 

export function FeedbackList({ searchQuery, statusFilter, categoryFilter, assigneeFilter }: FeedbackListProps) {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([])
  const [, setSelectedItem] = useState<FeedbackItem | null>(null)
  const [replyText, setReplyText] = useState("")

  useEffect(() => {
    // TODO: Replace with actual API call
    // Simulated data for now
    const mockData: FeedbackItem[] = [
      {
        id: "1",
        subject: "Great platform!",
        description: "I love using this platform. The interface is very intuitive and user-friendly.",
        category: "general",
        status: "resolved",
        contactEmail: "user1@example.com",
        contactName: "John Doe",
        assignedTo: "admin@example.com",
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-16T14:20:00Z",
      },
      {
        id: "2",
        subject: "Fellowship application question",
        description: "I have a question about the fellowship application process. When is the deadline?",
        category: "fellowship",
        status: "new",
        contactEmail: "applicant@example.com",
        contactName: "Jane Smith",
        createdAt: "2024-01-20T09:15:00Z",
        updatedAt: "2024-01-20T09:15:00Z",
      },
      {
        id: "3",
        subject: "Login button not working",
        description: "The login button on the homepage is not responding when clicked. Using Chrome browser.",
        category: "bugs",
        status: "in_progress",
        priority: "high",
        contactEmail: "reporter@example.com",
        contactName: "Mike Johnson",
        assignedTo: "dev@example.com",
        createdAt: "2024-01-18T16:45:00Z",
        updatedAt: "2024-01-19T11:30:00Z",
      },
    ]
    setFeedbackItems(mockData)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "general":
        return MessageSquare
      case "fellowship":
        return Users
      case "bugs":
        return Bug
      default:
        return MessageSquare
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      case "archived":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return ""
    }
  }

 const handleStatusChange = (itemId: string, newStatus: FeedbackStatus) => {
  setFeedbackItems((items) =>
    items.map((item) =>
      item.id === itemId ? { ...item, status: newStatus, updatedAt: new Date().toISOString() } : item,
    ),
  )
}

  const handleAssigneeChange = (itemId: string, assignee: string) => {
    setFeedbackItems((items) =>
      items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              assignedTo: assignee === "unassigned" ? undefined : assignee,
              updatedAt: new Date().toISOString(),
            }
          : item,
      ),
    )
  }

  const handleSendReply = () => {
    // TODO: Implement email reply functionality
    console.log("Sending reply:", replyText)
    setReplyText("")
    setSelectedItem(null)
  }

  // Filter items based on search and filters
  const filteredItems = feedbackItems.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contactEmail?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesAssignee =
      assigneeFilter === "all" ||
      (assigneeFilter === "unassigned" && !item.assignedTo) ||
      item.assignedTo === assigneeFilter

    return matchesSearch && matchesStatus && matchesCategory && matchesAssignee
  })

  return (
    <div className="space-y-4">
      {filteredItems.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No feedback found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        filteredItems.map((item) => {
          const CategoryIcon = getCategoryIcon(item.category)
          return (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <CategoryIcon className="h-5 w-5 text-primary mt-1" />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.subject}</CardTitle>
                      <CardDescription className="mt-1">
                        {item.description.length > 150 ? `${item.description.substring(0, 150)}...` : item.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedItem(item)}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{item.subject}</DialogTitle>
                        <DialogDescription>Feedback Details & Actions</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Description</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>

                        {item.contactEmail && (
                          <div className="space-y-2">
                            <Label htmlFor="reply">Send Reply</Label>
                            <Textarea
                              id="reply"
                              placeholder="Type your reply here..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              rows={4}
                            />
                            <Button onClick={handleSendReply} disabled={!replyText.trim()}>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Reply
                            </Button>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(item.status)}>{item.status.replace("_", " ")}</Badge>

                    {item.priority && (
                      <Badge variant="outline" className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    )}

                    <Badge variant="outline">{item.category}</Badge>

                    {item.contactEmail && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-3 w-3 mr-1" />
                        {item.contactName || item.contactEmail}
                      </div>
                    )}

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Select value={item.status} onValueChange={(value:  "new" | "in_progress" | "resolved" | "archived") => handleStatusChange(item.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={item.assignedTo || "unassigned"}
                      onValueChange={(value) => handleAssigneeChange(item.id, value)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Assign to..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        <SelectItem value="admin@example.com">System Admin</SelectItem>
                        <SelectItem value="dev@example.com">Developer</SelectItem>
                        <SelectItem value="fellowship@example.com">Fellowship Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })
      )}
    </div>
  )
}

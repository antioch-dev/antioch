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
import { Users, Bug, Mail, User, Calendar, MessageSquare, Reply } from "lucide-react"

interface FeedbackItem {
  id: string
  subject: string
  description: string
  category: "fellowship" | "bugs"
  status: "new" | "in_progress" | "resolved"
  priority?: "low" | "medium" | "high" | "critical"
  contactEmail?: string
  contactName?: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
}

interface FellowshipFeedbackListProps {
  searchQuery: string
  statusFilter: string
  priorityFilter: string
  feedbackType: "fellowship" | "assigned_bugs" | "all_relevant"
}

export function FellowshipFeedbackList({
  searchQuery,
  statusFilter,
  priorityFilter,
  feedbackType,
}: FellowshipFeedbackListProps) {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([])
  const [selectedItem, setSelectedItem] = useState<FeedbackItem | null>(null)
  const [replyText, setReplyText] = useState("")

  useEffect(() => {
    // TODO: Replace with actual API call
    // Simulated data filtered for fellowship team
    const mockData: FeedbackItem[] = [
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
        id: "4",
        subject: "Fellowship program duration",
        description: "How long is the fellowship program? Is it full-time or part-time?",
        category: "fellowship",
        status: "resolved",
        contactEmail: "student@university.edu",
        contactName: "Alex Chen",
        assignedTo: "fellowship@example.com",
        createdAt: "2024-01-18T14:30:00Z",
        updatedAt: "2024-01-19T10:15:00Z",
      },
      {
        id: "5",
        subject: "Fellowship portal login issue",
        description: "Cannot access the fellowship portal. Getting 'access denied' error.",
        category: "bugs",
        status: "in_progress",
        priority: "high",
        contactEmail: "fellow@example.com",
        contactName: "Sarah Wilson",
        assignedTo: "fellowship@example.com",
        createdAt: "2024-01-19T11:20:00Z",
        updatedAt: "2024-01-20T08:45:00Z",
      },
      {
        id: "6",
        subject: "Fellowship mentorship program",
        description: "I'd like to know more about the mentorship opportunities available during the fellowship.",
        category: "fellowship",
        status: "new",
        contactEmail: "mentor@example.com",
        contactName: "David Kim",
        createdAt: "2024-01-21T16:00:00Z",
        updatedAt: "2024-01-21T16:00:00Z",
      },
    ]

    // Filter based on feedback type
    let filteredData = mockData
    if (feedbackType === "fellowship") {
      filteredData = mockData.filter((item) => item.category === "fellowship")
    } else if (feedbackType === "assigned_bugs") {
      filteredData = mockData.filter((item) => item.category === "bugs" && item.assignedTo === "fellowship@example.com")
    } else if (feedbackType === "all_relevant") {
      filteredData = mockData.filter(
        (item) =>
          item.category === "fellowship" || (item.category === "bugs" && item.assignedTo === "fellowship@example.com"),
      )
    }

    setFeedbackItems(filteredData)
  }, [feedbackType])

  const getCategoryIcon = (category: string) => {
    switch (category) {
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

  const handleStatusChange = (itemId: string, newStatus: string) => {
    setFeedbackItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, status: newStatus as any, updatedAt: new Date().toISOString() } : item,
      ),
    )
  }

  const handleSendReply = () => {
    // TODO: Implement email reply functionality
    console.log("Fellowship team sending reply:", replyText)
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
    const matchesPriority = priorityFilter === "all" || item.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="space-y-4">
      {filteredItems.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No fellowship feedback found</h3>
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
                      <Button variant="outline" size="sm" onClick={() => setSelectedItem(item)}>
                        <Reply className="h-4 w-4 mr-2" />
                        Respond
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <CategoryIcon className="h-5 w-5" />
                          {item.subject}
                        </DialogTitle>
                        <DialogDescription>
                          {item.category === "fellowship" ? "Fellowship Question" : "Bug Report"} - Respond to{" "}
                          {item.contactName}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Full Description</h4>
                          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">{item.description}</p>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {item.contactName}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {item.contactEmail}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(item.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        {item.contactEmail && (
                          <div className="space-y-2">
                            <Label htmlFor="reply">Your Response</Label>
                            <Textarea
                              id="reply"
                              placeholder="Type your helpful response here..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              rows={5}
                            />
                            <div className="flex gap-2">
                              <Button onClick={handleSendReply} disabled={!replyText.trim()}>
                                <Mail className="h-4 w-4 mr-2" />
                                Send Response
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => handleStatusChange(item.id, "resolved")}
                                disabled={item.status === "resolved"}
                              >
                                Mark as Resolved
                              </Button>
                            </div>
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
                        {item.priority} priority
                      </Badge>
                    )}

                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {item.category === "fellowship" ? "Fellowship" : "Bug Report"}
                    </Badge>

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
                    <Select value={item.status} onValueChange={(value) => handleStatusChange(item.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
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

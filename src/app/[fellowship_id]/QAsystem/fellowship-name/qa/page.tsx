"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockTopics, mockStats, type Topic } from "@/lib/mock-data"
import {
  Plus,
  MessageSquare,
  MessageCircle,
  Pin,
  Share2,
  Settings,
  Trash2,
  Users,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function AdminDashboard() {
  const [topics, setTopics] = useState<Topic[]>(mockTopics)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleCreateTopic = (formData: FormData) => {
    const newTopic: Topic = {
      id: Date.now().toString(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as "open" | "closed",
      answerSetting: formData.get("answerSetting") as "allow_all" | "require_review" | "not_allowed",
      questionsCount: 0,
      answersCount: 0,
      pinnedAnswersCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setTopics([newTopic, ...topics])
    setIsCreateDialogOpen(false)
  }

  const handleDeleteTopic = (topicId: string) => {
    setTopics(topics.filter((topic) => topic.id !== topicId))
  }

  const getStatusColor = (status: string) => {
    return status === "open" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const getAnswerSettingText = (setting: string) => {
    switch (setting) {
      case "allow_all":
        return "Allow All"
      case "require_review":
        return "Require Review"
      case "not_allowed":
        return "Not Allowed"
      default:
        return setting
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Q&A Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage topics, questions, and answers for your fellowship</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Link href="/fellowship_1/QAsystem/fellowship-name/qa/public">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Users className="w-4 h-4" />
                Public View
              </Button>
            </Link>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Topic
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Topic</DialogTitle>
                  <DialogDescription>Create a new Q&A topic for your fellowship</DialogDescription>
                </DialogHeader>
                <form action={handleCreateTopic} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Topic Title</Label>
                    <Input id="title" name="title" placeholder="Sunday Service Q&A" required />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" placeholder="Questions from today's service..." />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue="open">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="answerSetting">Answer Setting</Label>
                    <Select name="answerSetting" defaultValue="require_review">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="allow_all">Allow All</SelectItem>
                        <SelectItem value="require_review">Require Review</SelectItem>
                        <SelectItem value="not_allowed">Not Allowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      Create Topic
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{mockStats.totalQuestions}</p>
                  <p className="text-sm text-muted-foreground">Total Questions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{mockStats.totalAnswers}</p>
                  <p className="text-sm text-muted-foreground">Total Answers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-chart-2" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{mockStats.pendingQuestions}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{mockStats.answeredQuestions}</p>
                  <p className="text-sm text-muted-foreground">Answered</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Active Topics</h2>
          {topics.map((topic) => (
            <Card key={topic.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg">{topic.title}</CardTitle>
                      <Badge className={getStatusColor(topic.status)}>
                        {topic.status === "open" ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {topic.status}
                      </Badge>
                      <Badge variant="outline">{getAnswerSettingText(topic.answerSetting)}</Badge>
                    </div>
                    <CardDescription className="mb-3">{topic.description}</CardDescription>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {topic.questionsCount} questions
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {topic.answersCount} answers
                      </span>
                      <span className="flex items-center gap-1">
                        <Pin className="w-4 h-4" />
                        {topic.pinnedAnswersCount} pinned
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/fellowship_1/QAsystem/fellowship-name/qa/topic/${topic.id}`}>
                        <Settings className="w-4 h-4 mr-1" />
                        Manage
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/fellowship_1/QAsystem/fellowship-name/qa/projection/${topic.id}`}>
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Project
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteTopic(topic.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {topics.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Topics Yet</h3>
              <p className="text-muted-foreground mb-4">Create your first Q&A topic to get started</p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Topic
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

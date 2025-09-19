"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getTopicById, getQuestionsByTopicId, getAnswersByQuestionId, type Question } from "@/lib/mock-data"
import {
  ArrowLeft,
  MessageSquare,
  MessageCircle,
  Pin,
  ThumbsUp,
  Plus,
  Send,
  Clock,
  CheckCircle,
  User,
  Users,
} from "lucide-react"

export default function PublicTopicView() {
  const params = useParams()
  const topicId = params.id as string

  const topic = getTopicById(topicId)
  const questions = getQuestionsByTopicId(topicId)
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false)
  const [isAnswerDialogOpen, setIsAnswerDialogOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [sortBy, setSortBy] = useState<"newest" | "votes" | "answered">("newest")

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center">
        <Card className="text-center p-8">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Topic Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested topic could not be found.</p>
            <Button asChild>
              <Link href="/fellowship_1/QAsystem/fellowship-name/qa/public">Back to Topics</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSubmitQuestion = (formData: FormData) => {
    // Mock submission - in real app, this would call an API
    console.log("Submitting question:", {
      text: formData.get("question"),
      author: formData.get("name"),
      fellowship: formData.get("fellowship"),
    })
    setIsQuestionDialogOpen(false)
  }

  const handleSubmitAnswer = (formData: FormData) => {
    // Mock submission - in real app, this would call an API
    console.log("Submitting answer:", {
      questionId: selectedQuestion?.id,
      text: formData.get("answer"),
      author: formData.get("name"),
    })
    setIsAnswerDialogOpen(false)
    setSelectedQuestion(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "answered":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const sortedQuestions = [...questions].sort((a, b) => {
    switch (sortBy) {
      case "votes":
        return b.votes - a.votes
      case "answered":
        return (b.status === "answered" ? 1 : 0) - (a.status === "answered" ? 1 : 0)
      case "newest":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const approvedQuestions = sortedQuestions.filter((q) => q.status === "approved" || q.status === "answered")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" size="sm" className="mb-4 bg-transparent" asChild>
            <Link href="/fellowship_1/QAsystem/fellowship-name/qa/public">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Topics
            </Link>
          </Button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{topic.title}</h1>
              <p className="text-muted-foreground mb-3">{topic.description}</p>
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {topic.status}
                </Badge>
                <Badge variant="outline">
                  {topic.answerSetting === "allow_all" && "Everyone can answer"}
                  {topic.answerSetting === "require_review" && "Answers reviewed"}
                  {topic.answerSetting === "not_allowed" && "Church answers only"}
                </Badge>
              </div>
            </div>

            {topic.status === "open" && (
              <Dialog open={isQuestionDialogOpen} onOpenChange={setIsQuestionDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Ask Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Submit Your Question</DialogTitle>
                    <DialogDescription>Ask a question about this topic</DialogDescription>
                  </DialogHeader>
                  <form action={handleSubmitQuestion} className="space-y-4">
                    <div>
                      <Label htmlFor="question">Your Question *</Label>
                      <Textarea
                        id="question"
                        name="question"
                        placeholder="What would you like to know?"
                        required
                        className="min-h-[100px]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="name">Your Name (Optional)</Label>
                      <Input id="name" name="name" placeholder="Anonymous" />
                    </div>
                    <div>
                      <Label htmlFor="fellowship">Fellowship/Ministry</Label>
                      <Select name="fellowship">
                        <SelectTrigger>
                          <SelectValue placeholder="Select your fellowship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="young-adults">Young Adults</SelectItem>
                          <SelectItem value="mens-ministry">{`Men's Ministry`}</SelectItem>
                          <SelectItem value="womens-ministry">{`Women's Ministry`}</SelectItem>
                          <SelectItem value="youth">Youth Ministry</SelectItem>
                          <SelectItem value="bible-study">Bible Study Group</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="flex-1">
                        <Send className="w-4 h-4 mr-2" />
                        Submit Question
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setIsQuestionDialogOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Stats and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              {approvedQuestions.length} questions
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {topic.answersCount} answers
            </span>
          </div>

          <Select value={sortBy} onValueChange={(value: "newest" | "votes" | "answered") => setSortBy(value)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="votes">Most Voted</SelectItem>
              <SelectItem value="answered">Answered First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {approvedQuestions.map((question) => {
            const answers = getAnswersByQuestionId(question.id)
            const pinnedAnswer = answers.find((a) => a.isPinned && a.status === "approved")
            const approvedAnswers = answers.filter((a) => a.status === "approved")

            return (
              <Card key={question.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={getStatusColor(question.status)}>{question.status}</Badge>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <ThumbsUp className="w-3 h-3" />
                          {question.votes}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{question.text}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                        {question.author && (
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {question.author}
                          </span>
                        )}
                        {question.fellowship && (
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {question.fellowship}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(question.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pinned Answer */}
                  {pinnedAnswer && (
                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Pin className="w-4 h-4 text-accent" />
                        <span className="font-semibold text-accent">Official Answer</span>
                        {pinnedAnswer.isChurchOfficial && (
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            Church Staff
                          </Badge>
                        )}
                      </div>
                      <p className="text-foreground">{pinnedAnswer.text}</p>
                      {pinnedAnswer.author && (
                        <p className="text-sm text-muted-foreground mt-2">— {pinnedAnswer.author}</p>
                      )}
                    </div>
                  )}

                  {/* Other Answers */}
                  {approvedAnswers.filter((a) => !a.isPinned).length > 0 && (
                    <div className="space-y-3 mb-4">
                      <h4 className="font-medium text-foreground">Community Answers</h4>
                      {approvedAnswers
                        .filter((a) => !a.isPinned)
                        .slice(0, 2)
                        .map((answer) => (
                          <div key={answer.id} className="bg-muted/30 rounded-lg p-3">
                            <p className="text-foreground mb-1">{answer.text}</p>
                            {answer.author && <p className="text-sm text-muted-foreground">— {answer.author}</p>}
                          </div>
                        ))}
                      {approvedAnswers.filter((a) => !a.isPinned).length > 2 && (
                        <Button variant="outline" size="sm">
                          View {approvedAnswers.filter((a) => !a.isPinned).length - 2} more answers
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Answer Actions */}
                  {topic.answerSetting !== "not_allowed" && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedQuestion(question)
                          setIsAnswerDialogOpen(true)
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Add Answer
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {approvedQuestions.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Questions Yet</h3>
              <p className="text-muted-foreground mb-4">Be the first to ask a question about this topic!</p>
              {topic.status === "open" && (
                <Button onClick={() => setIsQuestionDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ask the First Question
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Answer Dialog */}
        <Dialog open={isAnswerDialogOpen} onOpenChange={setIsAnswerDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Submit Your Answer</DialogTitle>
              <DialogDescription>Share your insights about this question</DialogDescription>
            </DialogHeader>
            <form action={handleSubmitAnswer} className="space-y-4">
              <div>
                <Label htmlFor="answer">Your Answer *</Label>
                <Textarea
                  id="answer"
                  name="answer"
                  placeholder="Share your thoughts..."
                  required
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="answer-name">Your Name (Optional)</Label>
                <Input id="answer-name" name="name" placeholder="Anonymous" />
              </div>
              {topic.answerSetting === "require_review" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">Your answer will be reviewed before being published.</p>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Answer
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsAnswerDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

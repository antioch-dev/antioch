"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getTopicById, getQuestionsByTopicId, getAnswersByQuestionId } from "@/lib/mock-data"
import {
  ArrowLeft,
  MessageSquare,
  MessageCircle,
  Pin,
  Share2,
  QrCode,
  ThumbsUp,
  Clock,
  CheckCircle,
  Eye,
  EyeOff,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  MoreHorizontal,
  User,
  Users,
  Calendar,
} from "lucide-react"

export default function TopicManagement() {
  const params = useParams()
  const topicId = params.id as string

  const topic = getTopicById(topicId)
  const questions = getQuestionsByTopicId(topicId)
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [isAddQuestionDialogOpen, setIsAddQuestionDialogOpen] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    author: "",
    fellowship: "",
    status: "pending" as const,
  })
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [answerFilterStatus, setAnswerFilterStatus] = useState<string>("all")

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center">
        <Card className="text-center p-8">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Topic Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested topic could not be found.</p>
            <Button asChild>
              <Link href="/fellowship-name/qa">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "answered":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleBulkQuestionAction = (action: string) => {
    console.log(`Bulk ${action} for questions:`, selectedQuestions)
    setSelectedQuestions([])
  }

  const handleBulkAnswerAction = (action: string) => {
    console.log(`Bulk ${action} for answers:`, selectedAnswers)
    setSelectedAnswers([])
  }

  const handleQuestionAction = (questionId: string, action: string) => {
    console.log(`${action} question:`, questionId)
  }

  const handleAnswerAction = (answerId: string, action: string) => {
    console.log(`${action} answer:`, answerId)
  }

  const handleAddQuestion = () => {
    if (!newQuestion.text.trim()) return

    console.log("Adding new question:", {
      ...newQuestion,
      topicId,
      id: `q${Date.now()}`,
      createdAt: new Date().toISOString(),
      votes: 0,
      isDisplayed: false,
    })

    setNewQuestion({ text: "", author: "", fellowship: "", status: "pending" })
    setIsAddQuestionDialogOpen(false)

    alert("Question added successfully! (This is a UI demo)")
  }

  const shareUrl =
    typeof window !== "undefined" ? `${window.location.origin}/fellowship-name/qa/public?topic=${topicId}` : ""

  const filteredQuestions = questions.filter((question) => {
    if (filterStatus === "all") return true
    return question.status === filterStatus
  })

  const allAnswers = questions.flatMap((question) =>
    getAnswersByQuestionId(question.id).map((answer) => ({
      ...answer,
      questionText: question.text,
    })),
  )

  const filteredAnswers = allAnswers.filter((answer) => {
    if (answerFilterStatus === "all") return true
    return answer.status === answerFilterStatus
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link href="/fellowship-name/qa">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{topic.title}</h1>
            <p className="text-muted-foreground">{topic.description}</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Share2 className="w-4 h-4" />
                  Share Topic
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Share Topic</DialogTitle>
                  <DialogDescription>Share this Q&A topic with your congregation</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="share-url">Share URL</Label>
                    <div className="flex gap-2">
                      <Input id="share-url" value={shareUrl} readOnly />
                      <Button variant="outline" onClick={() => navigator.clipboard.writeText(shareUrl)}>
                        Copy
                      </Button>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg inline-block">
                      <QrCode className="w-32 h-32 text-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">QR Code for easy access</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isAddQuestionDialogOpen} onOpenChange={setIsAddQuestionDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Question</DialogTitle>
                  <DialogDescription>
                    Add a question to this topic. It will be marked as pending for review.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="question-text">Question *</Label>
                    <Textarea
                      id="question-text"
                      placeholder="Enter your question here..."
                      value={newQuestion.text}
                      onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="question-author">Author (Optional)</Label>
                      <Input
                        id="question-author"
                        placeholder="Name"
                        value={newQuestion.author}
                        onChange={(e) => setNewQuestion({ ...newQuestion, author: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="question-fellowship">Fellowship (Optional)</Label>
                      <Input
                        id="question-fellowship"
                        placeholder="Fellowship group"
                        value={newQuestion.fellowship}
                        onChange={(e) => setNewQuestion({ ...newQuestion, fellowship: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="question-status">Status</Label>
                    <Select
                      value={newQuestion.status}
                      onValueChange={(value: "pending" | "approved") =>
                        setNewQuestion({ ...newQuestion, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending Review</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsAddQuestionDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddQuestion} disabled={!newQuestion.text.trim()}>
                      Add Question
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button asChild>
              <Link href={`/fellowship-name/qa/projection/${topicId}`}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Projection
              </Link>
            </Button>
          </div>
        </div>

        {/* Topic Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xl font-bold">{questions.length}</p>
                  <p className="text-sm text-muted-foreground">Questions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-xl font-bold">{questions.filter((q) => q.status === "pending").length}</p>
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
                  <p className="text-xl font-bold">{questions.filter((q) => q.status === "answered").length}</p>
                  <p className="text-sm text-muted-foreground">Answered</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xl font-bold">{questions.filter((q) => q.isDisplayed).length}</p>
                  <p className="text-sm text-muted-foreground">Displayed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="questions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="answers">Answers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold">Questions ({filteredQuestions.length})</h3>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="answered">Answered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                {selectedQuestions.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Bulk Actions ({selectedQuestions.length})
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleBulkQuestionAction("approve")}>
                        <Check className="w-4 h-4 mr-2" />
                        Approve Selected
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleBulkQuestionAction("reject")}>
                        <X className="w-4 h-4 mr-2" />
                        Reject Selected
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleBulkQuestionAction("delete")} className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Selected
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {filteredQuestions.map((question) => {
                const answers = getAnswersByQuestionId(question.id)
                const pinnedAnswer = answers.find((a) => a.isPinned)

                return (
                  <Card key={question.id} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          checked={selectedQuestions.includes(question.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedQuestions([...selectedQuestions, question.id])
                            } else {
                              setSelectedQuestions(selectedQuestions.filter((id) => id !== question.id))
                            }
                          }}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getStatusColor(question.status)}>{question.status}</Badge>
                            {question.isDisplayed && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                <Eye className="w-3 h-3 mr-1" />
                                Displayed
                              </Badge>
                            )}
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                              <ThumbsUp className="w-3 h-3" />
                              {question.votes}
                            </span>
                          </div>
                          <p className="font-medium text-foreground mb-2">{question.text}</p>
                          <div className="flex gap-4 text-sm text-muted-foreground mb-3">
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
                              <Calendar className="w-3 h-3" />
                              {new Date(question.createdAt).toLocaleDateString()}
                            </span>
                            <span>{answers.length} answers</span>
                            {pinnedAnswer && (
                              <span className="flex items-center gap-1 text-accent">
                                <Pin className="w-3 h-3" />
                                Pinned answer
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            {question.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-green-700 border-green-200 hover:bg-green-50 bg-transparent"
                                  onClick={() => handleQuestionAction(question.id, "approve")}
                                >
                                  <Check className="w-3 h-3 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-700 border-red-200 hover:bg-red-50 bg-transparent"
                                  onClick={() => handleQuestionAction(question.id, "reject")}
                                >
                                  <X className="w-3 h-3 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuestionAction(question.id, "toggle-display")}
                            >
                              {question.isDisplayed ? (
                                <EyeOff className="w-3 h-3 mr-1" />
                              ) : (
                                <Eye className="w-3 h-3 mr-1" />
                              )}
                              {question.isDisplayed ? "Hide" : "Show"}
                            </Button>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleQuestionAction(question.id, "edit")}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Question
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleQuestionAction(question.id, "view-answers")}>
                              <MessageCircle className="w-4 h-4 mr-2" />
                              View Answers ({answers.length})
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleQuestionAction(question.id, "delete")}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Question
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredQuestions.length === 0 && (
              <Card className="text-center py-8">
                <CardContent>
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">
                    {filterStatus === "all" ? "No Questions Yet" : `No ${filterStatus} Questions`}
                  </h4>
                  <p className="text-muted-foreground">
                    {filterStatus === "all"
                      ? "Questions will appear here once submitted"
                      : `No questions with ${filterStatus} status found`}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="answers" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold">Answers ({filteredAnswers.length})</h3>
                <Select value={answerFilterStatus} onValueChange={setAnswerFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedAnswers.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Bulk Actions ({selectedAnswers.length})
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleBulkAnswerAction("approve")}>
                      <Check className="w-4 h-4 mr-2" />
                      Approve Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAnswerAction("reject")}>
                      <X className="w-4 h-4 mr-2" />
                      Reject Selected
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleBulkAnswerAction("delete")} className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <div className="space-y-3">
              {filteredAnswers.map((answer) => (
                <Card key={answer.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={selectedAnswers.includes(answer.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedAnswers([...selectedAnswers, answer.id])
                          } else {
                            setSelectedAnswers(selectedAnswers.filter((id) => id !== answer.id))
                          }
                        }}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getStatusColor(answer.status)}>{answer.status}</Badge>
                          {answer.isPinned && (
                            <Badge variant="outline" className="bg-accent/10 text-accent">
                              <Pin className="w-3 h-3 mr-1" />
                              Pinned
                            </Badge>
                          )}
                          {answer.isChurchOfficial && (
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                              Church Staff
                            </Badge>
                          )}
                        </div>

                        <div className="mb-2">
                          <p className="text-sm text-muted-foreground mb-1">Question:</p>
                          <p className="text-sm font-medium text-foreground">{answer.questionText}</p>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm text-muted-foreground mb-1">Answer:</p>
                          <p className="text-foreground">{answer.text}</p>
                        </div>

                        <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                          {answer.author && (
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {answer.author}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(answer.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          {answer.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-700 border-green-200 hover:bg-green-50 bg-transparent"
                                onClick={() => handleAnswerAction(answer.id, "approve")}
                              >
                                <Check className="w-3 h-3 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-700 border-red-200 hover:bg-red-50 bg-transparent"
                                onClick={() => handleAnswerAction(answer.id, "reject")}
                              >
                                <X className="w-3 h-3 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          {answer.status === "approved" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className={answer.isPinned ? "text-accent border-accent/20" : ""}
                              onClick={() => handleAnswerAction(answer.id, "toggle-pin")}
                            >
                              <Pin className="w-3 h-3 mr-1" />
                              {answer.isPinned ? "Unpin" : "Pin"}
                            </Button>
                          )}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleAnswerAction(answer.id, "edit")}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Answer
                          </DropdownMenuItem>
                          {answer.status === "approved" && (
                            <DropdownMenuItem onClick={() => handleAnswerAction(answer.id, "toggle-pin")}>
                              <Pin className="w-4 h-4 mr-2" />
                              {answer.isPinned ? "Unpin" : "Pin"} Answer
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleAnswerAction(answer.id, "delete")}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Answer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAnswers.length === 0 && (
              <Card className="text-center py-8">
                <CardContent>
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">
                    {answerFilterStatus === "all" ? "No Answers Yet" : `No ${answerFilterStatus} Answers`}
                  </h4>
                  <p className="text-muted-foreground">
                    {answerFilterStatus === "all"
                      ? "Answers will appear here once submitted"
                      : `No answers with ${answerFilterStatus} status found`}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Topic Settings */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Topic Settings</CardTitle>
                <CardDescription>Configure how this topic behaves</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Topic Status</Label>
                  <Select defaultValue={topic.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open - Accept new questions</SelectItem>
                      <SelectItem value="closed">Closed - No new questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Answer Settings</Label>
                  <Select defaultValue={topic.answerSetting}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="allow_all">Allow All - Anyone can answer</SelectItem>
                      <SelectItem value="require_review">Require Review - Answers need approval</SelectItem>
                      <SelectItem value="not_allowed">Not Allowed - Only church answers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

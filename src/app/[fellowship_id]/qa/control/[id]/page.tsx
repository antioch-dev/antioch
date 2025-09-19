"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getTopicById, getQuestionsByTopicId, getAnswersByQuestionId } from "@/lib/mock-data"
import {
  ArrowLeft,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Eye,
  EyeOff,
  Monitor,
  CheckCircle,
  MessageSquare,
  Pin,
  User,
  Users,
  Calendar,
  Zap,
  Settings,
  RefreshCw,
} from "lucide-react"

export default function ControlPanel() {
  const params = useParams()
  const topicId = params.id as string

  const topic = getTopicById(topicId)
  const allQuestions = getQuestionsByTopicId(topicId)
  const approvedQuestions = allQuestions.filter((q) => q.status === "approved" || q.status === "answered")

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isProjectionLive] = useState(true)
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(approvedQuestions[0]?.id || null)

  // Auto-advance functionality
  useEffect(() => {
    if (!isAutoPlay || approvedQuestions.length <= 1) return

    const interval = setInterval(() => {
      setCurrentQuestionIndex((prev) => (prev + 1) % approvedQuestions.length)
      setShowAnswer(false)
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [isAutoPlay, approvedQuestions.length])

  // Update selected question when index changes
  useEffect(() => {
    if (approvedQuestions[currentQuestionIndex]) {
      setSelectedQuestionId(approvedQuestions[currentQuestionIndex].id)
    }
  }, [currentQuestionIndex, approvedQuestions])

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center">
        <Card className="text-center p-8">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Topic Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested topic could not be found.</p>
            <Button asChild>
              <Link href="/QAsystem/fellowship-name/qa">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = approvedQuestions[currentQuestionIndex]
  const currentAnswers = currentQuestion ? getAnswersByQuestionId(currentQuestion.id) : []
  const pinnedAnswer = currentAnswers.find((a) => a.isPinned && a.status === "approved")

  const handlePrevious = () => {
    if (approvedQuestions.length > 1) {
      setCurrentQuestionIndex((prev) => (prev - 1 + approvedQuestions.length) % approvedQuestions.length)
      setShowAnswer(false)
    }
  }

  const handleNext = () => {
    if (approvedQuestions.length > 1) {
      setCurrentQuestionIndex((prev) => (prev + 1) % approvedQuestions.length)
      setShowAnswer(false)
    }
  }

  const handleSelectQuestion = (questionId: string) => {
    const index = approvedQuestions.findIndex((q) => q.id === questionId)
    if (index !== -1) {
      setCurrentQuestionIndex(index)
      setSelectedQuestionId(questionId)
      setShowAnswer(false)
    }
  }

  const handleMarkDisplayed = (questionId: string) => {
    console.log("Mark as displayed:", questionId)
    // In real app, this would update the question status
  }

  const handleMarkAnswered = (questionId: string) => {
    console.log("Mark as answered:", questionId)
    // In real app, this would update the question status
  }

  const stats = {
    total: allQuestions.length,
    pending: allQuestions.filter((q) => q.status === "pending").length,
    approved: allQuestions.filter((q) => q.status === "approved").length,
    answered: allQuestions.filter((q) => q.status === "answered").length,
    displayed: allQuestions.filter((q) => q.isDisplayed).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/fellowship1/qa">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Control Panel</h1>
              <p className="text-muted-foreground">{topic.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isProjectionLive ? "bg-green-500" : "bg-red-500"}`} />
              <span className="text-sm font-medium">{isProjectionLive ? "Projection Live" : "Projection Offline"}</span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/fellowship1/qa/projection/${topicId}`} target="_blank">
                <Monitor className="w-4 h-4 mr-2" />
                Open Projection
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Question Display */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Monitor className="w-5 h-5" />
                      Currently Displaying
                    </CardTitle>
                    <CardDescription>
                      Question {currentQuestionIndex + 1} of {approvedQuestions.length}
                    </CardDescription>
                  </div>
                  <Badge variant={currentQuestion?.isDisplayed ? "default" : "outline"}>
                    {currentQuestion?.isDisplayed ? "Live" : "Ready"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentQuestion ? (
                  <>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-3">{currentQuestion.text}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        {currentQuestion.author && (
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {currentQuestion.author}
                          </span>
                        )}
                        {currentQuestion.fellowship && (
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {currentQuestion.fellowship}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(currentQuestion.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {pinnedAnswer && (
                      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Pin className="w-4 h-4 text-accent" />
                          <span className="font-medium text-accent">Official Answer Available</span>
                        </div>
                        <p className="text-sm">{pinnedAnswer.text}</p>
                        {pinnedAnswer.author && (
                          <p className="text-xs text-muted-foreground mt-1">— {pinnedAnswer.author}</p>
                        )}
                      </div>
                    )}

                    {/* Navigation Controls */}
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handlePrevious} disabled={approvedQuestions.length <= 1}>
                        <SkipBack className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                      <Button variant="outline" onClick={handleNext} disabled={approvedQuestions.length <= 1}>
                        Next
                        <SkipForward className="w-4 h-4 ml-2" />
                      </Button>
                      {pinnedAnswer && (
                        <Button variant={showAnswer ? "default" : "outline"} onClick={() => setShowAnswer(!showAnswer)}>
                          {showAnswer ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                          {showAnswer ? "Hide" : "Show"} Answer
                        </Button>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <Separator />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkDisplayed(currentQuestion.id)}
                        className="text-blue-700 border-blue-200 hover:bg-blue-50"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Mark Displayed
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkAnswered(currentQuestion.id)}
                        className="text-green-700 border-green-200 hover:bg-green-50"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Mark Answered
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No Questions Available</h3>
                    <p className="text-muted-foreground">No approved questions to display</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Auto-Play Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Playback Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="auto-play">Auto-advance Questions</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically move to next question every 30 seconds
                    </p>
                  </div>
                  <Switch id="auto-play" checked={isAutoPlay} onCheckedChange={setIsAutoPlay} />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsAutoPlay(!isAutoPlay)}>
                    {isAutoPlay ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isAutoPlay ? "Pause" : "Start"} Auto-Play
                  </Button>
                  <Button variant="outline" onClick={() => setCurrentQuestionIndex(0)}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset to First
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Session Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Questions</span>
                  <Badge variant="outline">{stats.total}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pending Review</span>
                  <Badge className="bg-yellow-100 text-yellow-800">{stats.pending}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Approved</span>
                  <Badge className="bg-green-100 text-green-800">{stats.approved}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Answered</span>
                  <Badge className="bg-blue-100 text-blue-800">{stats.answered}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Displayed</span>
                  <Badge className="bg-purple-100 text-purple-800">{stats.displayed}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Question Queue */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Question Queue</CardTitle>
                <CardDescription>Click to jump to any question</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {approvedQuestions.map((question, index) => (
                      <div
                        key={question.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedQuestionId === question.id
                            ? "bg-primary/10 border-primary/20"
                            : "bg-muted/30 border-border hover:bg-muted/50"
                        }`}
                        onClick={() => handleSelectQuestion(question.id)}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-sm font-medium">#{index + 1}</span>
                          <div className="flex gap-1">
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                question.status === "answered"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {question.status}
                            </Badge>
                            {question.isDisplayed && (
                              <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">
                                <Eye className="w-2 h-2 mr-1" />
                                Live
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm line-clamp-2 mb-2">{question.text}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {question.author && <span>{question.author}</span>}
                          <span>•</span>
                          <span>{getAnswersByQuestionId(question.id).length} answers</span>
                          {getAnswersByQuestionId(question.id).some((a) => a.isPinned) && (
                            <>
                              <span>•</span>
                              <Pin className="w-3 h-3 text-accent" />
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                  <Link href={`/fellowship1/qa/topic/${topicId}`}>
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Questions
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                  <Link href={`/fellowship1/qa/public`}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Public Interface
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

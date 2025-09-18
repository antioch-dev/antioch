"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTopicById, getQuestionsByTopicId, getAnswersByQuestionId } from "@/lib/mock-data"
import { Pin, MessageSquare, User, Users, Clock } from "lucide-react"

export default function ProjectionView() {
  const params = useParams()
  const topicId = params.id as string
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const topic = getTopicById(topicId)
  const questions = getQuestionsByTopicId(topicId).filter((q) => q.status === "approved" || q.status === "answered")

  // Auto-advance questions every 30 seconds (can be controlled via control panel)
  useEffect(() => {
    const interval = setInterval(() => {
      if (questions.length > 1) {
        setCurrentQuestionIndex((prev) => (prev + 1) % questions.length)
        setShowAnswer(false)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [questions.length])

  // Keyboard controls for presentation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
        case " ":
          if (questions.length > 1) {
            setCurrentQuestionIndex((prev) => (prev + 1) % questions.length)
            setShowAnswer(false)
          }
          break
        case "ArrowLeft":
          if (questions.length > 1) {
            setCurrentQuestionIndex((prev) => (prev - 1 + questions.length) % questions.length)
            setShowAnswer(false)
          }
          break
        case "Enter":
          setShowAnswer(!showAnswer)
          break
        case "Escape":
          setShowAnswer(false)
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [questions.length, showAnswer])

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Topic Not Found</h1>
          <p className="text-xl text-gray-300">The requested topic could not be found.</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-8">
          <MessageSquare className="w-24 h-24 text-gray-400 mx-auto mb-8" />
          <h1 className="text-5xl font-bold mb-6">{topic.title}</h1>
          <p className="text-2xl text-gray-300 mb-8">{topic.description}</p>
          <div className="bg-gray-800/50 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold mb-4">No Questions Yet</h2>
            <p className="text-xl text-gray-400">Waiting for questions to be submitted...</p>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const answers = currentQuestion ? getAnswersByQuestionId(currentQuestion.id) : []
  const pinnedAnswer = answers.find((a) => a.isPinned && a.status === "approved")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700/50 px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">{topic.title}</h1>
            <p className="text-lg text-gray-300 mt-1">{topic.description}</p>
          </div>
          <div className="text-right">
            <div className="text-lg text-gray-300">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="flex gap-3 mt-2">
              <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30 text-sm">
                {currentQuestion?.status}
              </Badge>
              {currentQuestion?.isDisplayed && (
                <Badge className="bg-green-600/20 text-green-300 border-green-500/30 text-sm">Live</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="max-w-6xl mx-auto w-full">
          {/* Question Card */}
          <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 shadow-2xl">
            <CardContent className="p-12">
              {/* Question */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <MessageSquare className="w-8 h-8 text-blue-400" />
                  <span className="text-2xl font-semibold text-blue-300">Question</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white mb-8">{currentQuestion?.text}</h2>

                {/* Question Meta */}
                <div className="flex flex-wrap gap-6 text-lg text-gray-300">
                  {currentQuestion?.author && (
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      <span>{currentQuestion?.author}</span>
                    </div>
                  )}
                  {currentQuestion?.fellowship && (
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span>{currentQuestion?.fellowship}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{currentQuestion?.createdAt ? new Date(currentQuestion.createdAt).toLocaleDateString() : "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Answer Section */}
              {pinnedAnswer && (
                <div
                  className={`transition-all duration-500 ${showAnswer ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                >
                  <div className="border-t border-gray-600/50 pt-8">
                    <div className="flex items-center gap-4 mb-6">
                      <Pin className="w-8 h-8 text-yellow-400" />
                      <span className="text-2xl font-semibold text-yellow-300">Official Answer</span>
                      {pinnedAnswer.isChurchOfficial && (
                        <Badge className="bg-yellow-600/20 text-yellow-300 border-yellow-500/30 text-lg px-3 py-1">
                          Church Staff
                        </Badge>
                      )}
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-8">
                      <p className="text-2xl md:text-3xl leading-relaxed text-white font-medium">{pinnedAnswer.text}</p>
                      {pinnedAnswer.author && (
                        <p className="text-xl text-yellow-200 mt-6 font-semibold">— {pinnedAnswer.author}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Controls Hint */}
          <div className="mt-8 text-center">
            <div className="inline-flex gap-8 text-gray-400 text-lg">
              <span>← → Navigate Questions</span>
              {pinnedAnswer && <span>Enter: Toggle Answer</span>}
              <span>Esc: Hide Answer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800/30 backdrop-blur-sm border-t border-gray-700/50 px-8 py-4">
        <div className="flex justify-between items-center text-gray-300">
          <div className="text-lg">Fellowship Q&A System</div>
          <div className="flex gap-6 text-sm">
            <span>{questions.length} Total Questions</span>
            <span>{answers.filter((a) => a.status === "approved").length} Answers</span>
            {pinnedAnswer && <span>Official Answer Available</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

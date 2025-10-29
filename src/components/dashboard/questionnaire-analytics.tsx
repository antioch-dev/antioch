"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateMockResponses } from "@/lib/polling-mock"
import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import type { Question, Response } from "@/lib/polling-mock"

export interface Questionnaire {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  responses: Response[];
  createdAt: Date;
  updatedAt: Date;
}


interface QuestionnaireAnalyticsProps {
  questionnaire: Questionnaire;
}

export function QuestionnaireAnalytics({ questionnaire }: QuestionnaireAnalyticsProps) {
  const [responses, setResponses] = useState<Response[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Ensure questionnaire is defined and has necessary properties
    if (!questionnaire) {
      setLoading(false)
      return
    }

    // Initialize with empty arrays if they don't exist
    const safeQuestionnaire = {
      ...questionnaire,
      questions: Array.isArray(questionnaire.questions) ? questionnaire.questions : [],
      responses: Array.isArray(questionnaire.responses) ? questionnaire.responses : [],
    }

    // Generate mock responses if they don't exist
    if (!safeQuestionnaire.responses || safeQuestionnaire.responses.length === 0) {
      try {
        const mockResponses = generateMockResponses(safeQuestionnaire)
        setResponses(mockResponses || [])
      } catch (error) {
        console.error("Error generating mock responses:", error)
        setResponses([])
      }
    } else {
      setResponses(safeQuestionnaire.responses || [])
    }
    setLoading(false)
  }, [questionnaire])

  if (loading) {
    return <div>Loading analytics...</div>
  }

  // Handle case where questionnaire is undefined or null
  if (!questionnaire) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics Not Available</CardTitle>
          <CardDescription>Unable to load questionnaire data.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>The questionnaire data could not be loaded. Please try again later.</p>
        </CardContent>
      </Card>
    )
  }

  // Ensure questions array exists
  const questions = Array.isArray(questionnaire.questions) ? questionnaire.questions : []

  const getMultipleChoiceStats = (questionId: string) => {
    if (!questionId) return []

    const question = questions.find((q: Question) => q?.id === questionId)
    if (!question?.options || !Array.isArray(question.options)) return []

    const counts: Record<string, number> = {}
    // Initialize all options with zero count
    question.options.forEach((option: string) => {
      if (option) {
        counts[option] = 0
      }
    })

    // Count responses
    if (Array.isArray(responses)) {
      responses.forEach((response) => {
        if (response?.answers?.[questionId]) {
          const answer = response.answers[questionId]
          if (answer && counts[answer] !== undefined) {
            counts[answer] = (counts[answer] || 0) + 1
          }
        }
      })
    }

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }))
  }

  const getTextResponseCount = (questionId: string) => {
    if (!questionId || !Array.isArray(responses)) return 0
    return responses.filter((response) => response?.answers?.[questionId]).length
  }

  const getCompletionRate = () => {
    const totalQuestions = questions.length
    if (totalQuestions === 0) return 0

    let totalAnswered = 0

    if (Array.isArray(responses)) {
      responses.forEach((response) => {
        if (response?.answers) {
          const answeredCount = Object.keys(response.answers || {}).length
          totalAnswered += answeredCount
        }
      })
    }

    const possibleAnswers = (responses?.length || 0) * totalQuestions
    return possibleAnswers > 0 ? Math.round((totalAnswered / possibleAnswers) * 100) : 0
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

  // If there are no questions, show a message
  if (questions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Questions Available</CardTitle>
          <CardDescription>{`This questionnaire doesn't have any questions yet.`}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Add questions to your questionnaire to see analytics.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Summary of all responses to your questionnaire.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium text-muted-foreground">Total Responses</h3>
              <p className="mt-2 text-3xl font-bold">{responses?.length || 0}</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium text-muted-foreground">Completion Rate</h3>
              <p className="mt-2 text-3xl font-bold">{getCompletionRate()}%</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium text-muted-foreground">Average Time</h3>
              <p className="mt-2 text-3xl font-bold">2m 34s</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question Analytics</CardTitle>
          <CardDescription>Detailed analytics for each question.</CardDescription>
        </CardHeader>
        <CardContent>
          {questions.length > 0 ? (
            <Tabs defaultValue={questions[0]?.id || "tab-0"}>
              <TabsList className="mb-4 w-full overflow-x-auto">
                {questions.map((question: Question, index: number) => (
                  <TabsTrigger key={question?.id || `question-${index}`} value={question?.id || `tab-${index}`}>
                    Question {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
              {questions.map((question: Question, index: number) => {
                if (!question) return null

                const questionId = question.id || `question-${index}`
                const questionType = question.type || "text"
                const questionPrompt = question.prompt || "No prompt"

                return (
                  <TabsContent key={questionId} value={questionId} className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">{questionPrompt}</h3>
                      <p className="text-sm text-muted-foreground">
                        {questionType === "text" ? "Text Response" : "Multiple Choice"}
                      </p>
                    </div>

                    {questionType === "multiple-choice" ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Response Distribution</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[300px]">
                              <ChartContainer config={{}}>
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={getMultipleChoiceStats(questionId)}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip content={<ChartTooltip />} />
                                    <Bar dataKey="value" fill="#8884d8" />
                                  </BarChart>
                                </ResponsiveContainer>
                              </ChartContainer>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Percentage Breakdown</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[300px]">
                              <ChartContainer config={{}}>
                                <ResponsiveContainer width="100%" height="100%">
                                  <PieChart>
                                    <Pie
                                      data={getMultipleChoiceStats(questionId)}
                                      cx="50%"
                                      cy="50%"
                                      labelLine={false}
                                      outerRadius={80}
                                      fill="#8884d8"
                                      dataKey="value"
                                      label={({ name, percent }) =>
                                        `${name || ""}: ${((percent || 0) * 100).toFixed(0)}%`
                                      }
                                    >
                                      {getMultipleChoiceStats(questionId).map((_entry: unknown, i: number) => (
                                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                                      ))}
                                    </Pie>
                                    <Tooltip content={<ChartTooltip />} />
                                  </PieChart>
                                </ResponsiveContainer>
                              </ChartContainer>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Text Responses</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="rounded-lg border p-4">
                            <h3 className="text-sm font-medium text-muted-foreground">Total Responses</h3>
                            <p className="mt-2 text-3xl font-bold">{getTextResponseCount(questionId)}</p>
                          </div>
                          <div className="mt-4">
                            <h4 className="mb-2 text-sm font-medium">Sample Responses:</h4>
                            <div className="space-y-2">
                              {Array.isArray(responses) && responses.length > 0 ? (
                                responses
                                  .slice(0, 5)
                                  .filter((response) => response?.answers?.[questionId])
                                  .map((response, idx) => (
                                    <div key={idx} className="rounded-lg border p-3 text-sm">
                                      {response.answers[questionId]}
                                    </div>
                                  ))
                              ) : (
                                <div className="rounded-lg border p-3 text-sm text-muted-foreground">
                                  No responses yet
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                )
              })}
            </Tabs>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No questions available. Add questions to see analytics.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

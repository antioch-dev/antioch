"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Settings, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import type { Question, Response } from "@/lib/polling-mock"

// Ultra-minimal component with no complex object operations
export default function ProjectionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [title, setTitle] = useState<string>("Loading...")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [autoAdvance, setAutoAdvance] = useState(false)
  const [autoAdvanceInterval, setAutoAdvanceInterval] = useState(30)
  const [responseData, setResponseData] = useState<Response[]>([])
  const [textResponses, setTextResponses] = useState<string[]>([])

  // Safe colors array
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Loading data for projection:", params.id)

        // Simulate data loading without using the actual data service
        // This avoids any potential issues in the data service
        setTitle("Sample Questionnaire")

        // Create minimal sample questions
        const sampleQuestions: Question[] = [
          {
            id: "q1",
            type: "multiple-choice",
            prompt: "How satisfied are you with our service?",
            options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
            createdAt: new Date().toISOString()
          },
          {
            id: "q2",
            type: "text",
            prompt: "What improvements would you suggest?",
            createdAt: new Date().toISOString()
          },
        ]

        setQuestions(sampleQuestions)

        // Create sample response data for the first question
        const sampleResponseData: Response[] = [
          {
            name: "Very Satisfied", value: 15,
            id: "",
            answers: { a: "Very satisfied" },
            submittedAt: ""
          },
          {
            name: "Satisfied", value: 30,
            id: "",
            answers: { a: "Somewhat satisfied" },
            submittedAt: ""
          },
          {
            name: "Neutral", value: 20,
            id: "",
            answers: { a: "Neutral" },
            submittedAt: ""
          },
          {
            name: "Dissatisfied", value: 10,
            id: "",
            answers: { a: "Dissatisfied" },
            submittedAt: ""
          },
          {
            name: "Very Dissatisfied", value: 5,
            id: "",
            answers: { a: "Very dissatisfied" },
            submittedAt: ""
          }, 
        ]

        setResponseData(sampleResponseData)

        // Create sample text responses for the second question
        const sampleTextResponses = [
          "I would like to see more features.",
          "The service is great, but could be faster.",
          "I love the user interface, very intuitive!",
        ]

        setTextResponses(sampleTextResponses)

        setLoading(false)
      } catch (err) {
        console.error("Error loading data:", err)
        setError("Failed to load questionnaire data")
        setLoading(false)
      }
    }

   void loadData()
  }, [params.id])

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (autoAdvance && questions.length > 0) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length)
      }, autoAdvanceInterval * 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [autoAdvance, autoAdvanceInterval, questions])

  const handleNextQuestion = () => {
    if (questions.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length)
    }
  }

  const handlePreviousQuestion = () => {
    if (questions.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? questions.length - 1 : prevIndex - 1))
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white p-4">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin" />
          <h2 className="mt-4 text-xl font-semibold">Loading presentation...</h2>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white p-4">
        <div className="text-center max-w-md">
          <MessageSquare className="mx-auto h-12 w-12" />
          <h2 className="mt-4 text-xl font-semibold">Error Loading Questionnaire</h2>
          <p className="mt-2 text-gray-400">{error}</p>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/dashboard")}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  // No questions state
  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white p-4">
        <div className="text-center max-w-md">
          <MessageSquare className="mx-auto h-12 w-12" />
          <h2 className="mt-4 text-xl font-semibold">No Questions Available</h2>
          <p className="mt-2 text-gray-400">{`This questionnaire doesn't have any questions yet.`}</p>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/dashboard")}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  // Get current question safely
  const currentQuestion =
    currentIndex < questions.length
      ? questions[currentIndex]
      : {
          type: "text",
          prompt: "No question available",
          options: [],
        }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold">{title}</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)}>
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
      </header>

      {showSettings && (
        <div className="container py-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Presentation Settings</CardTitle>
              <CardDescription className="text-gray-400">Configure how questions are displayed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={autoAdvance}
                      onChange={(e) => setAutoAdvance(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-700 bg-gray-800"
                    />
                    <span>Auto-advance questions</span>
                  </label>
                </div>

                {autoAdvance && (
                  <div className="flex items-center gap-2">
                    <span>Interval:</span>
                    <select
                      value={autoAdvanceInterval}
                      onChange={(e) => setAutoAdvanceInterval(Number(e.target.value))}
                      className="rounded bg-gray-800 border-gray-700 px-2 py-1"
                    >
                      <option value="10">10 seconds</option>
                      <option value="20">20 seconds</option>
                      <option value="30">30 seconds</option>
                      <option value="60">1 minute</option>
                      <option value="120">2 minutes</option>
                    </select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <main className="flex-1 container py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Question {currentIndex + 1} of {questions.length}
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handlePreviousQuestion}>
              Previous
            </Button>
            <Button variant="outline" onClick={handleNextQuestion}>
              Next
            </Button>
          </div>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl">{currentQuestion?.prompt}</CardTitle>
            <CardDescription className="text-gray-400">
              {currentQuestion?.type === "text" ? "Text Response" : "Multiple Choice"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="results" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="responses">Responses</TabsTrigger>
              </TabsList>

              <TabsContent value="results">
                {currentQuestion?.type === "multiple-choice" ? (
                  <div className="h-[400px]">
                    {responseData.length > 0 ? (
                      <div className="p-4 text-center">
                        <h3 className="text-xl font-semibold mb-6">Response Distribution</h3>
                        <div className="space-y-4">
                          {responseData.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                              ></div>
                              <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                  <span>{item.name}</span>
                                  <span>{item.value} responses</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2.5">
                                  <div
                                    className="h-2.5 rounded-full"
                                    style={{
                                      width: `${Math.min(100, (item.value / 80) * 100)}%`,
                                      backgroundColor: COLORS[index % COLORS.length],
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <p className="text-gray-400">No responses yet</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <h3 className="text-xl font-semibold mb-2">Text Responses</h3>
                    <p className="text-gray-400">{textResponses.length} responses received</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="responses">
                {currentQuestion?.type === "text" ? (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                    {textResponses.length === 0 ? (
                      <p className="text-center py-8 text-gray-400">No responses yet</p>
                    ) : (
                      textResponses.map((response, index) => (
                        <div key={index} className="p-3 rounded bg-gray-800 border border-gray-700">
                          {response}
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {responseData.length > 0 ? (
                      responseData.map((stat, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span>{stat.name}</span>
                              <span>{stat.value} responses</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2.5">
                              <div
                                className="h-2.5 rounded-full"
                                style={{
                                  width: `${Math.min(100, (stat.value / 80) * 100)}%`,
                                  backgroundColor: COLORS[index % COLORS.length],
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-8 text-gray-400">No responses yet</p>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

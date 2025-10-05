"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { getQuestionnaireById, submitAnswers } from "@/lib/data"
import { CheckCircle, Loader2, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

// Use the actual Question type from your data source or create a compatible one
interface Question {
  id: string
  prompt: string
  type: "text" | "multiple_choice" | "multiple-choice"
  options?: string[]
  status: "active" | "inactive"
  moderationStatus: "approved" | "pending" | "rejected"
}

interface QuestionnaireSettings {
  allowQuestionSubmission?: boolean
}

interface Questionnaire {
  id: string
  title: string
  description?: string
  questions: Question[]
  settings?: QuestionnaireSettings
}

// Proper type definition for Next.js 14 App Router
interface AnswerPageProps {
  params: Promise<{ id: string }>
}

// Helper function to normalize question type
const normalizeQuestionType = (type: string): "text" | "multiple_choice" => {
  if (type === "multiple-choice") return "multiple_choice"
  return type as "text" | "multiple_choice"
}


const transformQuestion = (question: unknown): Question => {
  if (typeof question !== 'object' || question === null) {
    throw new Error('Invalid question data')
  }
const q = question as Record<string, unknown>;

return {
 id: typeof q.id === "string" || typeof q.id === "number"
  ? String(q.id)
  : "",
  prompt: typeof q.prompt === "string" ? q.prompt : "",
  type: normalizeQuestionType(
    typeof q.type === "string" ? q.type : "text"
  ),
  options: Array.isArray(q.options)
    ? q.options.map((opt) => (typeof opt === "string" ? opt : String(opt)))
    : undefined,
  status:
    q.status === "active"
      ? "active"
      : "inactive" as "active" | "inactive",
  moderationStatus:
    q.moderationStatus === "approved"
      ? "approved"
      : q.moderationStatus === "pending"
        ? "pending"
        : "rejected",
}
}

export default function AnswerPage({ params }: AnswerPageProps) {
  const router = useRouter()
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const loadQuestionnaire = async () => {
      try {
        // Await the params promise
        const resolvedParams = await params
        const data = getQuestionnaireById(resolvedParams.id)
        
        if (!data) {
          toast({
            title: "Error",
            description: "Questionnaire not found.",
            variant: "destructive",
          })
          router.push("/fellowship1/polling")
          return
        }

        // Filter out disabled or rejected questions and transform the data
        const activeQuestions = 
          (data.questions || [])
            .filter((q: unknown) => {
              try {
                const question = transformQuestion(q)
                return question.status === "active" && question.moderationStatus === "approved"
              } catch {
                return false // Skip invalid questions
              }
            })
            .map(transformQuestion)

        setQuestionnaire({
          id: String(data.id || ''),
          title: String(data.title || ''),
          description: data.description ? String(data.description) : undefined,
          questions: activeQuestions,
          settings: data.settings ? {
            allowQuestionSubmission: Boolean(data.settings.allowQuestionSubmission)
          } : undefined
        })
      } catch (error) {
        console.error("Error loading questionnaire:", error)
        toast({
          title: "Error",
          description: "Failed to load questionnaire.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    void loadQuestionnaire()
  }, [params, router])

  // Early return for loading and error states
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
            <CardDescription>Please wait while we load the questionnaire.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!questionnaire) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Questionnaire Not Found</CardTitle>
            <CardDescription>The questionnaire you are looking for does not exist or has expired.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/fellowship1/polling")} className="w-full">
              Return Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (!questionnaire.questions || questionnaire.questions.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{questionnaire.title}</CardTitle>
            <CardDescription>No questions are currently available.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This questionnaire doesn&apos;t have any active questions at the moment.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/fellowship1/polling")} className="w-full">
              Return Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const currentQuestion = questionnaire.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questionnaire.questions.length - 1

  // Early return if currentQuestion is undefined (shouldn't happen but TypeScript wants this check)
  if (!currentQuestion) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>Unable to load the current question.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/fellowship1/polling")} className="w-full">
              Return Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const handleNext = () => {
    if (isLastQuestion) {
      void handleSubmit()
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1)
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await submitAnswers(questionnaire.id, answers)
      setIsComplete(true)
    } catch (error) {
      console.error("Error submitting answers:", error)
      toast({
        title: "Error",
        description: "Failed to submit answers. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Safe value getter for answers
  const getCurrentAnswer = (): string => {
    return answers[currentQuestion.id] || ""
  }

  // Safe answer change handler
  const handleCurrentAnswerChange = (value: string) => {
    handleAnswerChange(currentQuestion.id, value)
  }

  if (isComplete) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-center">Thank You!</CardTitle>
            <CardDescription className="text-center">Your responses have been submitted successfully.</CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-4">
            <Button onClick={() => router.push("/fellowship1/polling")} variant="outline" className="w-full">
              Return Home
            </Button>
            {questionnaire.settings?.allowQuestionSubmission && (
              <Button asChild className="w-full">
                <Link href={`/submit-question/${questionnaire.id}`}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Submit Your Own Question
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{questionnaire.title}</CardTitle>
          <CardDescription>{questionnaire.description || "Please answer the following questions."}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Question {currentQuestionIndex + 1} of {questionnaire.questions.length}
              </span>
              <span>{Math.round(((currentQuestionIndex + 1) / questionnaire.questions.length) * 100)}% complete</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary"
                style={{
                  width: `${((currentQuestionIndex + 1) / questionnaire.questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-medium">{currentQuestion.prompt}</h3>
              {currentQuestion.type === "text" ? (
                <Textarea
                  placeholder="Type your answer here..."
                  value={getCurrentAnswer()}
                  onChange={(e) => handleCurrentAnswerChange(e.target.value)}
                  className="min-h-[120px]"
                />
              ) : (
                <RadioGroup
                  value={getCurrentAnswer()}
                  onValueChange={handleCurrentAnswerChange}
                  className="space-y-3"
                >
                  {currentQuestion.options?.map((option: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={!getCurrentAnswer() || isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLastQuestion ? "Submit" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
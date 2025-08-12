"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { getQuestionnaireByAnswerUrl, submitAnswers } from "@/lib/data"
import { CheckCircle, Loader2, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Label } from "@/components/ui/label"

export default function AnswerPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [questionnaire, setQuestionnaire] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const loadQuestionnaire = () => {
      try {
        const data = getQuestionnaireByAnswerUrl(params.id)
        if (!data) {
          toast({
            title: "Error",
            description: "Questionnaire not found.",
            variant: "destructive",
          })
          router.push("/")
          return
        }

        // Filter out disabled or rejected questions
        const activeQuestions =
          data.questions?.filter((q: any) => q.status === "active" && q.moderationStatus === "approved") || []

        setQuestionnaire({
          ...data,
          questions: activeQuestions,
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

    loadQuestionnaire()
  }, [params.id, router])

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
            <Button onClick={() => router.push("/")} className="w-full">
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
            <p>This questionnaire doesn't have any active questions at the moment.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/")} className="w-full">
              Return Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const currentQuestion = questionnaire.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questionnaire.questions.length - 1

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit()
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1)
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await submitAnswers(questionnaire.id, answers)
      setIsComplete(true)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit answers. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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
            <Button onClick={() => router.push("/")} variant="outline" className="w-full">
              Return Home
            </Button>
            {questionnaire.settings?.allowQuestionSubmission && (
              <Button asChild className="w-full">
                <Link href={`/submit-question/${params.id}`}>
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

          <Form>
            <form className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-medium">{currentQuestion.prompt}</h3>
                {currentQuestion.type === "text" ? (
                  <Textarea
                    placeholder="Type your answer here..."
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className="min-h-[120px]"
                  />
                ) : (
                  <RadioGroup
                    value={answers[currentQuestion.id] || ""}
                    onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
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
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={!answers[currentQuestion.id] || isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLastQuestion ? "Submit" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

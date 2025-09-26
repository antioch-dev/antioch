"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { getQuestionnaireByAnswerUrl, submitUserQuestion } from "@/lib/data"
import { CheckCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const questionSchema = z.object({
  type: z.enum(["text", "multiple-choice"]),
  prompt: z.string().min(2, {
    message: "Question prompt must be at least 2 characters.",
  }),
  options: z.array(z.string()).optional(),
  topicId: z.string().optional(),
})

export default function SubmitQuestionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [questionnaire, setQuestionnaire] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [options, setOptions] = useState<string[]>(["", ""])

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      type: "text",
      prompt: "",
    },
  })

  const questionType = form.watch("type")

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

        if (!data.settings?.allowQuestionSubmission) {
          toast({
            title: "Error",
            description: "Question submission is not enabled for this questionnaire.",
            variant: "destructive",
          })
          router.push(`/answer/${params.id}`)
          return
        }

        setQuestionnaire(data)
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

  const onSubmit = async (values: z.infer<typeof questionSchema>) => {
    if (values.type === "multiple-choice" && options.filter(Boolean).length < 2) {
      toast({
        title: "Error",
        description: "Multiple choice questions must have at least 2 options.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const questionData = {
        ...values,
        options: values.type === "multiple-choice" ? options.filter(Boolean) : undefined,
      }

       submitUserQuestion(questionnaire.id, questionData)
      setSubmitted(true)
      toast({
        title: "Success",
        description: "Your question has been submitted for moderation.",
      })
    } catch (error) {
      console.error("Error submitting question:", error)
      toast({
        title: "Error",
        description: "Failed to submit question.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const addOption = () => {
    setOptions([...options, ""])
  }

  const removeOption = (index: number) => {
    if (options.length <= 2) return
    const newOptions = [...options]
    newOptions.splice(index, 1)
    setOptions(newOptions)
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

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

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-center">Question Submitted!</CardTitle>
            <CardDescription className="text-center">
              Your question has been submitted for moderation. Once approved, it will be added to the questionnaire.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => router.push(`/answer/${params.id}`)}>
              Back to Questionnaire
            </Button>
            <Button
              onClick={() => {
                setSubmitted(false)
                form.reset()
                setOptions(["", ""])
              }}
            >
              Submit Another Question
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Submit a Question</CardTitle>
          <CardDescription>
            Submit your own question to be added to `{questionnaire.title}`. Your question will be reviewed before being
            added.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="text" id="text" />
                          <label
                            htmlFor="text"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Text (Open-ended)
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="multiple-choice" id="multiple-choice" />
                          <label
                            htmlFor="multiple-choice"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Multiple Choice
                          </label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your question here..." className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormDescription>Be clear and concise with your question.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {questionType === "multiple-choice" && (
                <div className="space-y-4">
                  <div className="mb-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Options
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Add at least 2 options for your multiple choice question.
                    </p>
                  </div>
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                      />
                      {options.length > 2 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeOption(index)}>
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addOption}>
                    Add Option
                  </Button>
                </div>
              )}

              {questionnaire.topics && questionnaire.topics.length > 0 && (
                <FormField
                  control={form.control}
                  name="topicId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {questionnaire.topics.map((topic: any) => (
                            <SelectItem key={topic.id} value={topic.id}>
                              {topic.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Select a topic that best fits your question.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push(`/answer/${params.id}`)}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={submitting}>
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Question
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

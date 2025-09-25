"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle, Trash2, X } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { v4 as uuidv4 } from "uuid"
import { Label } from "@/components/ui/label"

const questionSchema = z.object({
  type: z.enum(["text", "multiple-choice"]),
  prompt: z.string().min(2, {
    message: "Question prompt must be at least 2 characters.",
  }),
})

interface QuestionFormProps {
  onAddQuestion: (question: any) => void
  questions: any[]
  onRemoveQuestion: (index: number) => void
}

export function QuestionForm({ onAddQuestion, questions, onRemoveQuestion }: QuestionFormProps) {
  const [options, setOptions] = useState<string[]>([""])

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      type: "text",
      prompt: "",
    },
  })

  const questionType = form.watch("type")

  const onSubmit = (values: z.infer<typeof questionSchema>) => {
    if (values.type === "multiple-choice" && options.filter(Boolean).length < 2) {
      toast({
        title: "Error",
        description: "Multiple choice questions must have at least 2 options.",
        variant: "destructive",
      })
      return
    }

    const question = {
      id: uuidv4(),
      ...values,
      options: values.type === "multiple-choice" ? options.filter(Boolean) : undefined,
    }

    onAddQuestion(question)
    form.reset()
    setOptions([""])

    toast({
      title: "Question added",
      description: "Your question has been added to the questionnaire.",
    })
  }

  const addOption = () => {
    setOptions([...options, ""])
  }

  const removeOption = (index: number) => {
    const newOptions = [...options]
    newOptions.splice(index, 1)
    setOptions(newOptions)
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add Questions</CardTitle>
          <CardDescription>Create questions for your questionnaire.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <Label>Question Type</Label>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="text" id="text" />
                          <Label htmlFor="text">Text (Open-ended)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="multiple-choice" id="multiple-choice" />
                          <Label htmlFor="multiple-choice">Multiple Choice</Label>
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
                    <Label>Question</Label>
                    <FormControl>
                      <Textarea placeholder="How satisfied are you with our service?" {...field} />
                    </FormControl>
                    <FormDescription>The question you want to ask.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {questionType === "multiple-choice" && (
                <div className="space-y-4">
                  <div className="mb-1">
                    <Label>Options</Label>
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
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(index)}
                        disabled={options.length <= 1}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove option</span>
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addOption} className="mt-2">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Option
                  </Button>
                </div>
              )}

              <Button type="submit">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Question
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {questions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Questions ({questions.length})</CardTitle>
            <CardDescription>Review and manage your questions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          {question.type === "text" ? "Text" : "Multiple Choice"}
                        </span>
                      </div>
                      <h4 className="mt-1 font-medium">{question.prompt}</h4>
                      {question.options && (
                        <div className="mt-2 space-y-1">
                          {question.options.map((option: string, optIndex: number) => (
                            <div key={optIndex} className="text-sm">
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => onRemoveQuestion(index)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove question</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

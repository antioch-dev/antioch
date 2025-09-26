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
import type { FormState, FieldValues, FieldError, ErrorOption, SubmitHandler, SubmitErrorHandler, InternalFieldName, FieldArrayPath, FieldArray, FieldErrors, FieldName, ReadFormState, RegisterOptions, UseFormRegisterReturn, EventType } from "react-hook-form"

interface Question {
  id: string
  prompt: string
  type: "text" | "multiple_choice"
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

export default function AnswerPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const loadQuestionnaire =  () => {
      try {
        const data =  getQuestionnaireByAnswerUrl(params.id)
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
          data.questions?.filter((q: Question) => q.status === "active" && q.moderationStatus === "approved") || []

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

    void loadQuestionnaire()
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
            <p>This questionnaire doesn&apos;t have any active questions at the moment.</p>
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
      void handleSubmit()
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

          <Form children={undefined} watch={{}} getValues={{}} getFieldState={function <TFieldName extends string>(name: TFieldName, formState?: FormState<FieldValues> | undefined): { invalid: boolean; isDirty: boolean; isTouched: boolean; isValidating: boolean; error?: FieldError } {
            throw new Error("Function not implemented.")
          } } setError={function (name: string, error: ErrorOption, options?: { shouldFocus: boolean }): void {
            throw new Error("Function not implemented.")
          } } clearErrors={function (name?: string | string[] | readonly string[] | undefined): void {
            throw new Error("Function not implemented.")
          } } setValue={function <TFieldName extends string = string>(name: TFieldName, value: TFieldName extends `${infer K}.${infer R}` ? K extends string ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? /*elided*/ any : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? never : never : TFieldName extends string ? any : TFieldName extends `${number}` ? never : never, options?: Partial<{ shouldValidate: boolean; shouldDirty: boolean; shouldTouch: boolean }> | undefined): void {
            throw new Error("Function not implemented.")
          } } trigger={function (name?: string | string[] | readonly string[] | undefined, options?: Partial<{ shouldFocus: boolean }> | undefined): Promise<boolean> {
            throw new Error("Function not implemented.")
          } } formState={{
            isDirty: false,
            isLoading: false,
            isSubmitted: false,
            isSubmitSuccessful: false,
            isSubmitting: false,
            isValidating: false,
            isValid: false,
            disabled: false,
            submitCount: 0,
            defaultValues: undefined,
            dirtyFields: undefined,
            touchedFields: undefined,
            validatingFields: undefined,
            errors: undefined,
            isReady: false
          }} resetField={function <TFieldName extends string = string>(name: TFieldName, options?: Partial<{ keepDirty: boolean; keepTouched: boolean; keepError: boolean; defaultValue: TFieldName extends `${infer K}.${infer R}` ? K extends string ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? R extends `${infer K}.${infer R}` ? K extends string | number | symbol ? /*elided*/ any : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? /*elided*/ any : never : R extends string | number | symbol ? any : R extends `${number}` ? unknown : never : K extends `${number}` ? never : never : TFieldName extends string ? any : TFieldName extends `${number}` ? never : never }> | undefined): void {
            throw new Error("Function not implemented.")
          } } reset={function (values?: FieldValues | { [x: string]: any } | ((formValues: FieldValues) => FieldValues) | undefined, keepStateOptions?: Partial<{ keepDirtyValues: boolean; keepErrors: boolean; keepDirty: boolean; keepValues: boolean; keepDefaultValues: boolean; keepIsSubmitted: boolean; keepIsSubmitSuccessful: boolean; keepTouched: boolean; keepIsValidating: boolean; keepIsValid: boolean; keepSubmitCount: boolean; keepFieldsRef: boolean }> | undefined): void {
            throw new Error("Function not implemented.")
          } } handleSubmit={function (onValid: SubmitHandler<FieldValues>, onInvalid?: SubmitErrorHandler<FieldValues> | undefined): (e?: React.BaseSyntheticEvent) => Promise<void> {
            throw new Error("Function not implemented.")
          } } unregister={function (name?: string | string[] | readonly string[] | undefined, options?: (Omit<Partial<{ keepDirtyValues: boolean; keepErrors: boolean; keepDirty: boolean; keepValues: boolean; keepDefaultValues: boolean; keepIsSubmitted: boolean; keepIsSubmitSuccessful: boolean; keepTouched: boolean; keepIsValidating: boolean; keepIsValid: boolean; keepSubmitCount: boolean; keepFieldsRef: boolean }>, "keepErrors" | "keepValues" | "keepDefaultValues" | "keepIsSubmitted" | "keepSubmitCount"> & { keepValue?: boolean; keepDefaultValue?: boolean; keepError?: boolean }) | undefined): void {
            throw new Error("Function not implemented.")
          } } control={{
            _subjects: {
              array: undefined,
              state: undefined
            },
            _removeUnmounted: function (): void {
              throw new Error("Function not implemented.")
            },
            _names: {
              mount: undefined,
              unMount: undefined,
              disabled: undefined,
              array: undefined,
              watch: undefined,
              focus: undefined,
              watchAll: undefined
            },
            _state: {
              mount: false,
              action: false,
              watch: false
            },
            _reset: function (values?: FieldValues | { [x: string]: any } | ((formValues: FieldValues) => FieldValues) | undefined, keepStateOptions?: Partial<{ keepDirtyValues: boolean; keepErrors: boolean; keepDirty: boolean; keepValues: boolean; keepDefaultValues: boolean; keepIsSubmitted: boolean; keepIsSubmitSuccessful: boolean; keepTouched: boolean; keepIsValidating: boolean; keepIsValid: boolean; keepSubmitCount: boolean; keepFieldsRef: boolean }> | undefined): void {
              throw new Error("Function not implemented.")
            },
            _options: undefined,
            _getDirty: function <TName extends InternalFieldName, TData>(name?: TName, data?: TData): boolean {
              throw new Error("Function not implemented.")
            },
            _resetDefaultValues: function (): void {
              throw new Error("Function not implemented.")
            },
            _formState: {
              isDirty: false,
              isLoading: false,
              isSubmitted: false,
              isSubmitSuccessful: false,
              isSubmitting: false,
              isValidating: false,
              isValid: false,
              disabled: false,
              submitCount: 0,
              defaultValues: undefined,
              dirtyFields: undefined,
              touchedFields: undefined,
              validatingFields: undefined,
              errors: undefined,
              isReady: false
            },
            _setValid: function (shouldUpdateValid?: boolean): void {
              throw new Error("Function not implemented.")
            },
            _fields: undefined,
            _formValues: undefined,
            _proxyFormState: undefined,
            _defaultValues: undefined,
            _getWatch: function (fieldNames?: InternalFieldName | InternalFieldName[], defaultValue?: { [x: string]: any } | undefined, isMounted?: boolean, isGlobal?: boolean) {
              throw new Error("Function not implemented.")
            },
            _setFieldArray: function <T extends Function, TFieldValues extends FieldValues, TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>>(name: InternalFieldName, updatedFieldArrayValues?: Partial<FieldArray<TFieldValues, TFieldArrayName>>[], method?: T, args?: Partial<{ argA: unknown; argB: unknown }>, shouldSetValue?: boolean, shouldUpdateFieldsAndErrors?: boolean): void {
              throw new Error("Function not implemented.")
            },
            _getFieldArray: function <TFieldArrayValues>(name: InternalFieldName): Partial<TFieldArrayValues>[] {
              throw new Error("Function not implemented.")
            },
            _setErrors: function (errors: FieldErrors<FieldValues>): void {
              throw new Error("Function not implemented.")
            },
            _setDisabledField: function (props: { disabled?: boolean; name: FieldName<any> }): void {
              throw new Error("Function not implemented.")
            },
            _runSchema: function (names: InternalFieldName[]): Promise<{ errors: FieldErrors }> {
              throw new Error("Function not implemented.")
            },
            _focusError: function (): boolean | undefined {
              throw new Error("Function not implemented.")
            },
            _disableForm: function (disabled?: boolean): void {
              throw new Error("Function not implemented.")
            },
            _subscribe: function <TFieldNames extends readonly string[]>(payload: { name?: readonly [...TFieldNames] | TFieldNames[number] | undefined; formState?: Partial<ReadFormState>; callback: (data: Partial<FormState<FieldValues>> & { values: FieldValues; name?: InternalFieldName }) => void; exact?: boolean; reRenderRoot?: boolean }): () => void {
              throw new Error("Function not implemented.")
            },
            register: function <TFieldName extends string = string>(name: TFieldName, options?: RegisterOptions<FieldValues, TFieldName> | undefined): UseFormRegisterReturn<TFieldName> {
              throw new Error("Function not implemented.")
            },
            handleSubmit: function (onValid: SubmitHandler<FieldValues>, onInvalid?: SubmitErrorHandler<FieldValues> | undefined): (e?: React.BaseSyntheticEvent) => Promise<void> {
              throw new Error("Function not implemented.")
            },
            unregister: function (name?: string | string[] | readonly string[] | undefined, options?: (Omit<Partial<{ keepDirtyValues: boolean; keepErrors: boolean; keepDirty: boolean; keepValues: boolean; keepDefaultValues: boolean; keepIsSubmitted: boolean; keepIsSubmitSuccessful: boolean; keepTouched: boolean; keepIsValidating: boolean; keepIsValid: boolean; keepSubmitCount: boolean; keepFieldsRef: boolean }>, "keepErrors" | "keepValues" | "keepDefaultValues" | "keepIsSubmitted" | "keepSubmitCount"> & { keepValue?: boolean; keepDefaultValue?: boolean; keepError?: boolean }) | undefined): void {
              throw new Error("Function not implemented.")
            },
            getFieldState: function <TFieldName extends string>(name: TFieldName, formState?: FormState<FieldValues> | undefined): { invalid: boolean; isDirty: boolean; isTouched: boolean; isValidating: boolean; error?: FieldError } {
              throw new Error("Function not implemented.")
            },
            setError: function (name: string, error: ErrorOption, options?: { shouldFocus: boolean }): void {
              throw new Error("Function not implemented.")
            }
          }} register={function <TFieldName extends string = string>(name: TFieldName, options?: RegisterOptions<FieldValues, TFieldName> | undefined): UseFormRegisterReturn<TFieldName> {
            throw new Error("Function not implemented.")
          } } setFocus={function <TFieldName extends string = string>(name: TFieldName, options?: Partial<{ shouldSelect: boolean }> | undefined): void {
            throw new Error("Function not implemented.")
          } } subscribe={function <TFieldNames extends readonly string[]>(payload: { name?: readonly [...TFieldNames] | TFieldNames[number] | undefined; formState?: Partial<ReadFormState>; callback: (data: Partial<FormState<FieldValues>> & { values: FieldValues; name?: InternalFieldName; type?: EventType }) => void; exact?: boolean }): () => void {
            throw new Error("Function not implemented.")
          } }>
            <form className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-medium">{currentQuestion?.prompt}</h3>
                {currentQuestion?.type === "text" ? (
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
                    {currentQuestion?.options?.map((option: string, index: number) => (
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
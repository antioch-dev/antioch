"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, MessageSquare, BarChart3 } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface QuestionnaireDetailsProps {
  questionnaire: any
}

export function QuestionnaireDetails({ questionnaire }: QuestionnaireDetailsProps) {
  const router = useRouter()

  // Handle case where questionnaire is undefined or null
  if (!questionnaire) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Questionnaire Not Found</CardTitle>
            <CardDescription>The requested questionnaire could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/dashboard")}>Return to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(`${window.location.origin}${url}`)
    toast({
      title: "Link copied",
      description: "The link has been copied to your clipboard.",
    })
  }

  const getStatus = (questionnaire: any) => {
    if (!questionnaire) return "Unknown"

    const now = new Date()
    if (questionnaire.endDate && new Date(questionnaire.endDate) < now) {
      return "Closed"
    }
    if (questionnaire.startDate && new Date(questionnaire.startDate) > now) {
      return "Scheduled"
    }
    return "Active"
  }

  // Ensure questions array exists
  const questions = Array.isArray(questionnaire.questions) ? questionnaire.questions : []

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Questionnaire Information</CardTitle>
          <CardDescription>Basic information about your questionnaire.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Title</h3>
              <p className="mt-1">{questionnaire.title || "Untitled"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <div className="mt-1">
                <Badge
                  variant={
                    getStatus(questionnaire) === "Active"
                      ? "default"
                      : getStatus(questionnaire) === "Closed"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {getStatus(questionnaire)}
                </Badge>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
              <p className="mt-1">{new Date(questionnaire.createdAt || Date.now()).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Questions</h3>
              <p className="mt-1">{questions.length}</p>
            </div>
            {questionnaire.startDate && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
                <p className="mt-1">{new Date(questionnaire.startDate).toLocaleDateString()}</p>
              </div>
            )}
            {questionnaire.endDate && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">End Date</h3>
                <p className="mt-1">{new Date(questionnaire.endDate).toLocaleDateString()}</p>
              </div>
            )}
          </div>

          {questionnaire.description && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p className="mt-1">{questionnaire.description}</p>
            </div>
          )}

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Shareable Link</h3>
              <div className="mt-1 flex items-center gap-2">
                <code className="rounded bg-muted px-2 py-1 text-sm">
                  {`${typeof window !== "undefined" ? window.location.origin : ""}/answer/${
                    questionnaire.answererUrl || "link"
                  }`}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(`/answer/${questionnaire.answererUrl || ""}`)}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy link</span>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/answer/${questionnaire.answererUrl || ""}`} target="_blank">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Open</span>
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Projection Link</h3>
              <div className="mt-1 flex items-center gap-2">
                <code className="rounded bg-muted px-2 py-1 text-sm">
                  {`${typeof window !== "undefined" ? window.location.origin : ""}/projection/${
                    questionnaire.projectionUrl || "link"
                  }`}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(`/projection/${questionnaire.projectionUrl || ""}`)}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy link</span>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/projection/${questionnaire.projectionUrl || ""}`} target="_blank">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Open</span>
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Admin Link</h3>
              <div className="mt-1 flex items-center gap-2">
                <code className="rounded bg-muted px-2 py-1 text-sm">
                  {`${typeof window !== "undefined" ? window.location.origin : ""}/dashboard/questionnaire/${
                    questionnaire.id || "link"
                  }`}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(`/dashboard/questionnaire/${questionnaire.id || ""}`)}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy link</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => router.push(`/dashboard/manage-questions/${questionnaire.id}`)}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Manage Questions
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/projection/${questionnaire.projectionUrl || ""}`} target="_blank">
                <BarChart3 className="mr-2 h-4 w-4" />
                Open Projection View
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Questions</CardTitle>
          <CardDescription>All questions in this questionnaire.</CardDescription>
        </CardHeader>
        <CardContent>
          {questions.length > 0 ? (
            <div className="space-y-4">
              {questions.map((question: any, index: number) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Question {index + 1} • {question?.type === "text" ? "Text" : "Multiple Choice"}
                        </span>
                        {question?.status === "disabled" && <Badge variant="secondary">Disabled</Badge>}
                        {question?.moderationStatus === "pending" && (
                          <Badge variant="outline">Pending Moderation</Badge>
                        )}
                        {question?.moderationStatus === "rejected" && <Badge variant="destructive">Rejected</Badge>}
                      </div>
                      <h4 className="mt-1 font-medium">{question?.prompt || "No prompt"}</h4>
                      {question?.options && Array.isArray(question.options) && question.options.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {question.options.map((option: string, optIndex: number) => (
                            <div key={optIndex} className="text-sm">
                              • {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No questions found. Add questions to your questionnaire.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

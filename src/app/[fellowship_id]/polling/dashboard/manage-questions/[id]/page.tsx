"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { getQuestionnaireById, updateQuestion, deleteQuestion, getAllTopics } from "@/lib/data"
import type { Question, Topic } from "@/lib/polling-mock"
import { useRouter } from "next/navigation"
import { CheckCircle, XCircle, AlertCircle, Trash2, Search, Filter } from "lucide-react"

export default function ManageQuestionsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [questionnaire, setQuestionnaire] = useState<any>(null)
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTopic, setFilterTopic] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [filterModeration, setFilterModeration] = useState<string | null>(null)

  useEffect(() => {
    const loadData = () => {
      try {
        const questionnaireData = getQuestionnaireById(params.id)
        const topicsData = getAllTopics()

        if (!questionnaireData) {
          toast({
            title: "Error",
            description: "Questionnaire not found.",
            variant: "destructive",
          })
          router.push("/dashboard")
          return
        }

        setQuestionnaire(questionnaireData)
        setTopics(topicsData)
      } catch (error) {
        console.error("Error loading data:", error)
        toast({
          title: "Error",
          description: "Failed to load questionnaire data.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params.id, router])

  const handleUpdateStatus = (questionId: string, status: "active" | "disabled") => {
    try {
      updateQuestion(questionnaire.id, questionId, { status })

      setQuestionnaire({
        ...questionnaire,
        questions: questionnaire.questions.map((q: Question) => (q.id === questionId ? { ...q, status } : q)),
      })

      toast({
        title: "Success",
        description: `Question ${status === "active" ? "enabled" : "disabled"} successfully.`,
      })
    } catch (error) {
      console.error("Error updating question status:", error)
      toast({
        title: "Error",
        description: "Failed to update question status.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateModeration = (questionId: string, moderationStatus: "approved" | "pending" | "rejected") => {
    try {
      updateQuestion(questionnaire.id, questionId, { moderationStatus })

      setQuestionnaire({
        ...questionnaire,
        questions: questionnaire.questions.map((q: Question) => (q.id === questionId ? { ...q, moderationStatus } : q)),
      })

      toast({
        title: "Success",
        description: `Question ${moderationStatus} successfully.`,
      })
    } catch (error) {
      console.error("Error updating moderation status:", error)
      toast({
        title: "Error",
        description: "Failed to update moderation status.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateTopic = (questionId: string, topicId: string) => {
    try {
      updateQuestion(questionnaire.id, questionId, { topicId })

      setQuestionnaire({
        ...questionnaire,
        questions: questionnaire.questions.map((q: Question) => (q.id === questionId ? { ...q, topicId } : q)),
      })

      toast({
        title: "Success",
        description: "Question topic updated successfully.",
      })
    } catch (error) {
      console.error("Error updating question topic:", error)
      toast({
        title: "Error",
        description: "Failed to update question topic.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteQuestion = (questionId: string) => {
    if (!confirm("Are you sure you want to delete this question? This action cannot be undone.")) {
      return
    }

    try {
      deleteQuestion(questionnaire.id, questionId)

      setQuestionnaire({
        ...questionnaire,
        questions: questionnaire.questions.filter((q: Question) => q.id !== questionId),
      })

      toast({
        title: "Success",
        description: "Question deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting question:", error)
      toast({
        title: "Error",
        description: "Failed to delete question.",
        variant: "destructive",
      })
    }
  }

  const filteredQuestions =
    questionnaire?.questions?.filter((question: Question) => {
      // Search filter
      const matchesSearch = searchTerm === "" || question.prompt.toLowerCase().includes(searchTerm.toLowerCase())

      // Topic filter
      const matchesTopic = filterTopic === null || question.topicId === filterTopic

      // Status filter
      const matchesStatus = filterStatus === null || question.status === filterStatus

      // Moderation filter
      const matchesModeration = filterModeration === null || question.moderationStatus === filterModeration

      return matchesSearch && matchesTopic && matchesStatus && matchesModeration
    }) || []

  const getTopicName = (topicId?: string) => {
    if (!topicId) return "No Topic"
    const topic = topics.find((t) => t.id === topicId)
    return topic ? topic.name : "Unknown Topic" 
  }

  const getTopicColor = (topicId?: string) => {
    if (!topicId) return "#6b7280" // gray-500
    const topic = topics.find((t) => t.id === topicId)
    return topic ? topic.color : "#6b7280"
  }

  if (loading) {
    return (
      <>
        <DashboardHeader heading="Manage Questions" text="Loading..." />
        <div className="container py-8">
          <div>Loading questionnaire data...</div>
        </div>
      </>
    )
  }

  if (!questionnaire) {
    return (
      <>
        <DashboardHeader heading="Error" text="Questionnaire not found" />
        <div className="container py-8">
          <Button onClick={() => router.push("/dashboard")}>Return to Dashboard</Button>
        </div>
      </>
    )
  }

  return (
    <>
      <DashboardHeader heading="Manage Questions" text={`Manage questions for "${questionnaire.title}"`}>
        <Button variant="outline" onClick={() => router.push(`/dashboard/questionnaire/${params.id}`)}>
          Back to Questionnaire
        </Button>
      </DashboardHeader>
      <div className="container py-8">
        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">All Questions</TabsTrigger>
              <TabsTrigger value="pending">Pending Moderation</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search questions..."
                  className="pl-8 w-[200px] md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Filters:</span>
            </div>

            <Select
              value={filterTopic || "none"}
              onValueChange={(value) => setFilterTopic(value === "none" ? null : value)}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue placeholder="Filter by Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">All Topics</SelectItem>
                {topics.map((topic) => (
                  <SelectItem key={topic.id} value={topic.id}>
                    {topic.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filterStatus || "none"}
              onValueChange={(value) => setFilterStatus(value === "none" ? null : value)}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("")
                setFilterTopic(null)
                setFilterStatus(null)
                setFilterModeration(null)
              }}
            >
              Clear Filters
            </Button>
          </div>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Questions ({filteredQuestions.length})</CardTitle>
                <CardDescription>Manage all questions in this questionnaire.</CardDescription>
              </CardHeader>
              <CardContent>{renderQuestionsList(filteredQuestions)}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Moderation</CardTitle>
                <CardDescription>Questions awaiting moderation approval.</CardDescription>
              </CardHeader>
              <CardContent>
                {renderQuestionsList(
                  questionnaire.questions?.filter((q: Question) => q.moderationStatus === "pending") || [],
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Approved Questions</CardTitle>
                <CardDescription>Questions that have been approved.</CardDescription>
              </CardHeader>
              <CardContent>
                {renderQuestionsList(
                  questionnaire.questions?.filter((q: Question) => q.moderationStatus === "approved") || [],
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rejected Questions</CardTitle>
                <CardDescription>Questions that have been rejected.</CardDescription>
              </CardHeader>
              <CardContent>
                {renderQuestionsList(
                  questionnaire.questions?.filter((q: Question) => q.moderationStatus === "rejected") || [],
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )

  function renderQuestionsList(questions: Question[]) {
    if (!Array.isArray(questions) || questions.length === 0) {
      return <div className="text-center py-8 text-muted-foreground">No questions found matching your criteria.</div>
    }

    return (
      <div className="space-y-4">
        {questions.map((question: Question) => (
          <div key={question.id} className="rounded-lg border p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant={question.status === "active" ? "default" : "secondary"}>
                      {question.status === "active" ? "Active" : "Disabled"}
                    </Badge>

                    <Badge
                      variant={
                        question.moderationStatus === "approved"
                          ? "outline"
                          : question.moderationStatus === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {question.moderationStatus === "approved"
                        ? "Approved"
                        : question.moderationStatus === "rejected"
                          ? "Rejected"
                          : "Pending"}
                    </Badge>

                    <div
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      style={{
                        backgroundColor: `${getTopicColor(question.topicId)}20`,
                        color: getTopicColor(question.topicId),
                        borderColor: `${getTopicColor(question.topicId)}40`,
                      }}
                    >
                      {getTopicName(question.topicId)}
                    </div>

                    <Badge variant="outline">{question.type === "text" ? "Text" : "Multiple Choice"}</Badge>
                  </div>

                  <h3 className="font-medium">{question.prompt}</h3>

                  {question.options && Array.isArray(question.options) && question.options.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {question.options.map((option: string, index: number) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          • {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteQuestion(question.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Button
                    variant={question.status === "active" ? "outline" : "default"}
                    size="sm"
                    onClick={() => handleUpdateStatus(question.id, "active")}
                  >
                    Enable
                  </Button>
                  <Button
                    variant={question.status === "disabled" ? "outline" : "secondary"}
                    size="sm"
                    onClick={() => handleUpdateStatus(question.id, "disabled")}
                  >
                    Disable
                  </Button>
                </div>

                <div className="flex items-center gap-2 ml-auto md:ml-4">
                  <span className="text-sm text-muted-foreground">Moderation:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
                    onClick={() => handleUpdateModeration(question.id, "approved")}
                  >
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => handleUpdateModeration(question.id, "rejected")}
                  >
                    <XCircle className="mr-1 h-3 w-3" />
                    Reject
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleUpdateModeration(question.id, "pending")}>
                    <AlertCircle className="mr-1 h-3 w-3" />
                    Pending
                  </Button>
                </div>

                <div className="w-full mt-2">
                  <span className="text-sm text-muted-foreground">Topic:</span>
                  <Select
                    value={question.topicId || "no-topic"}
                    onValueChange={(value) => handleUpdateTopic(question.id, value)}
                  >
                    <SelectTrigger className="h-8 mt-1">
                      <SelectValue placeholder="Select Topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-topic">No Topic</SelectItem>
                      {topics.map((topic) => (
                        <SelectItem key={topic.id} value={topic.id}>
                          {topic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { QuestionnaireDetails } from "@/components/dashboard/questionnaire-details"
import { QuestionnaireAnalytics } from "@/components/dashboard/questionnaire-analytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getQuestionnaireById } from "@/lib/data"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function QuestionnairePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [questionnaire, setQuestionnaire] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadQuestionnaire = () => {
      try {
        console.log("Loading questionnaire with ID:", params.id)
        const data = getQuestionnaireById(params.id)

        if (!data) {
          console.error("Questionnaire not found with ID:", params.id)
          setError("Questionnaire not found")
          setLoading(false)
          return
        }

        console.log("Questionnaire loaded successfully:", data.id)
        setQuestionnaire(data)
      } catch (err) {
        console.error("Error loading questionnaire:", err)
        setError("Failed to load questionnaire data")
      } finally {
        setLoading(false)
      }
    }

    loadQuestionnaire()
  }, [params.id])

  if (loading) {
    return (
      <>
        <DashboardHeader heading="Loading..." text="Please wait while we load the questionnaire data." />
        <div className="container py-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </>
    )
  }

  if (error || !questionnaire) {
    return (
      <>
        <DashboardHeader heading="Error" text={error || "An unknown error occurred"} />
        <div className="container py-8">
          <p>Unable to load questionnaire. Please return to the dashboard and try again.</p>
          <Button onClick={() => router.push("/dashboard")} className="mt-4">
            Return to Dashboard
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <DashboardHeader
        heading={questionnaire.title || "Untitled Questionnaire"}
        text={questionnaire.description || "View details and analytics for this questionnaire."}
      />
      <div className="container py-8">
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4 pt-4">
            <QuestionnaireDetails questionnaire={questionnaire} />
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4 pt-4">
            <QuestionnaireAnalytics questionnaire={questionnaire} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

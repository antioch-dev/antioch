"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { QuestionnaireDetails, type Questionnaire } from "@/components/dashboard/questionnaire-details"
import { QuestionnaireAnalytics } from "@/components/dashboard/questionnaire-analytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getQuestionnaireById } from "@/lib/data"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { QuestionGroup } from "@/lib/polling-mock"

// Update the props interface to handle Promise
interface QuestionnairePageProps {
  params: Promise<{ id: string }>
}

// Create a type conversion function
const convertQuestionGroupToQuestionnaire = (questionGroup: QuestionGroup): Questionnaire => {
  return {
    ...questionGroup,
    createdAt: new Date(questionGroup.createdAt),
    updatedAt: new Date(questionGroup.updatedAt),
    // Convert any response dates too if needed
    responses: questionGroup.responses?.map(response => ({
      ...response,
      submittedAt: new Date(response.submittedAt)
    })) || []
  }
}

export default function QuestionnairePage({ params }: QuestionnairePageProps) {
  const router = useRouter()
  const [questionnaire, setQuestionnaire] = useState<QuestionGroup | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)

  // Resolve the params promise
  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolved = await params
        setResolvedParams(resolved)
      } catch (error) {
        console.error("Error resolving params:", error)
        setError("Failed to load page parameters.")
      }
    }

   void resolveParams()
  }, [params])

  useEffect(() => {
    const loadQuestionnaire = () => {
      if (!resolvedParams) return

      try {
        console.log("Loading questionnaire with ID:", resolvedParams.id)
        const data = getQuestionnaireById(resolvedParams.id)

        if (!data) {
          console.error("Questionnaire not found with ID:", resolvedParams.id)
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
  }, [resolvedParams])

  if (loading || !resolvedParams) {
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
          <Button onClick={() => router.push("/fellowship1/polling/dashboard")} className="mt-4">
            Return to Dashboard
          </Button>
        </div>
      </>
    )
  }

  // Convert the questionnaire for the analytics component
  const analyticsQuestionnaire = convertQuestionGroupToQuestionnaire(questionnaire)

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
            <QuestionnaireDetails questionnaire={analyticsQuestionnaire} />
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4 pt-4">
            <QuestionnaireAnalytics questionnaire={analyticsQuestionnaire} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
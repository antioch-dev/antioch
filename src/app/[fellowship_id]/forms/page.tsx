"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, BarChart3, Plus } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function FormsPage() {
  const params = useParams<{
    fellowship_id: string
  }>()
  const { fellowship_id } = params

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Form Builder</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create, manage, and analyze forms with ease. Build custom forms, collect responses, and gain insights from
          your data.
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <Link href={`/${fellowship_id}/forms/builder/new`}>
          <Button size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Create New Form
          </Button>
        </Link>

        <Link href={`/${fellowship_id}/forms/manage`}>
          <Button variant="outline" size="lg">
            <FileText className="w-5 h-5 mr-2" />
            View My Forms
          </Button>
        </Link>

        <Link href={`/${fellowship_id}/forms/list`}>
          <Button variant="outline" size="lg">
            <Users className="w-5 h-5 mr-2" />
            Browse Public Forms
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Easy Form Building
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Drag and drop interface to create forms with various field types including text, numbers, selections, file
              uploads, and more.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Collaboration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Add co-administrators to your forms, manage permissions, and collaborate on form creation and response
              analysis.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Analytics & Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              View detailed statistics, analyze responses, and export data to make informed decisions based on your form
              submissions.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

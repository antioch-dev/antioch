import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { QuestionGroupList } from "@/components/dashboard/question-group-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader heading="Dashboard" text="Manage your questionnaires and view analytics.">
        <Link href="/polling_analytics/dashboard/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Questionnaire
          </Button>
        </Link>
      </DashboardHeader>
      <div className="container space-y-8 py-8">
        <Tabs defaultValue="groups">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="groups">Question Groups</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="groups" className="space-y-4 pt-4">
            <QuestionGroupList />
          </TabsContent>
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Questionnaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342</div>
                  <p className="text-xs text-muted-foreground">+24% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">+2% from last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

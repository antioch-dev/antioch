import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Phone, Mail, Gift, BookOpen, Users, CheckCircle } from "lucide-react"

export default function FollowUpPage() {
  const followUpPipeline = [
    {
      stage: "Day 1-3",
      title: "Immediate Response",
      description: "Welcome new visitors and begin relationship building",
      contacts: 15,
      tasks: [
        { task: "Send welcome text/email", completed: 12, total: 15 },
        { task: "Personal call from volunteer", completed: 8, total: 15 },
        { task: "Add to CRM system", completed: 15, total: 15 },
      ],
    },
    {
      stage: "Week 1-2",
      title: "Initial Engagement",
      description: "Deliver gifts and assess spiritual needs",
      contacts: 23,
      tasks: [
        { task: "Gift delivery (Bible, merch)", completed: 18, total: 23 },
        { task: "Invite to small groups", completed: 15, total: 23 },
        { task: "Spiritual assessment form", completed: 12, total: 23 },
      ],
    },
    {
      stage: "Month 1-3",
      title: "Discipleship Integration",
      description: "Pair with mentors and integrate into community",
      contacts: 34,
      tasks: [
        { task: "Assign discipleship mentor", completed: 28, total: 34 },
        { task: "Enroll in new believers class", completed: 22, total: 34 },
        { task: "Progress check-in calls", completed: 30, total: 34 },
      ],
    },
  ]

  const upcomingFollowUps = [
    {
      name: "Sarah Johnson",
      stage: "Day 1-3",
      nextAction: "Welcome call",
      dueDate: "Today",
      priority: "high",
      volunteer: "Pastor Mike",
    },
    {
      name: "Mike Chen",
      stage: "Week 1-2",
      nextAction: "Gift delivery",
      dueDate: "Tomorrow",
      priority: "medium",
      volunteer: "Lisa Smith",
    },
    {
      name: "David Kim",
      stage: "Month 1-3",
      nextAction: "Mentor meeting",
      dueDate: "This week",
      priority: "medium",
      volunteer: "John Davis",
    },
    {
      name: "Maria Garcia",
      stage: "Day 1-3",
      nextAction: "Spiritual assessment",
      dueDate: "Today",
      priority: "high",
      volunteer: "Sarah Wilson",
    },
  ]

  const automatedSequences = [
    {
      name: "New Visitor Welcome Series",
      type: "Email + SMS",
      triggers: "First-time visit",
      messages: 5,
      active: true,
      openRate: "78%",
    },
    {
      name: "New Believer Discipleship",
      type: "Email",
      triggers: "Salvation decision",
      messages: 8,
      active: true,
      openRate: "85%",
    },
    {
      name: "Re-engagement Campaign",
      type: "SMS",
      triggers: "3 weeks absent",
      messages: 3,
      active: true,
      openRate: "62%",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Follow-Up Management</h1>
              <p className="text-gray-600">Systematic nurturing and discipleship pipeline</p>
            </div>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Follow-up
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="pipeline" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pipeline">Follow-up Pipeline</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Tasks</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="space-y-6">
            {/* Pipeline Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {followUpPipeline.map((stage, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{stage.stage}</CardTitle>
                      <Badge variant="secondary">{stage.contacts} contacts</Badge>
                    </div>
                    <CardDescription>{stage.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{stage.description}</p>
                    <div className="space-y-3">
                      {stage.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{task.task}</span>
                            <span className="text-gray-500">
                              {task.completed}/{task.total}
                            </span>
                          </div>
                          <Progress value={(task.completed / task.total) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Follow-up Tasks</CardTitle>
                <CardDescription>Actions that need attention today and this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingFollowUps.map((followUp, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          {followUp.nextAction.includes("call") && <Phone className="h-5 w-5 text-blue-600" />}
                          {followUp.nextAction.includes("delivery") && <Gift className="h-5 w-5 text-green-600" />}
                          {followUp.nextAction.includes("meeting") && <Users className="h-5 w-5 text-purple-600" />}
                          {followUp.nextAction.includes("assessment") && (
                            <BookOpen className="h-5 w-5 text-orange-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{followUp.name}</p>
                          <p className="text-sm text-gray-600">{followUp.nextAction}</p>
                          <p className="text-xs text-gray-500">
                            Stage: {followUp.stage} • Assigned to: {followUp.volunteer}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <Badge variant={followUp.priority === "high" ? "destructive" : "default"}>
                            {followUp.priority}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">Due: {followUp.dueDate}</p>
                        </div>
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Complete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Automated Follow-up Sequences</CardTitle>
                <CardDescription>Manage automated email and SMS campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {automatedSequences.map((sequence, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          {sequence.type.includes("Email") && <Mail className="h-5 w-5 text-green-600" />}
                          {sequence.type.includes("SMS") && <Phone className="h-5 w-5 text-blue-600" />}
                        </div>
                        <div>
                          <p className="font-medium">{sequence.name}</p>
                          <p className="text-sm text-gray-600">
                            {sequence.type} • Triggers: {sequence.triggers}
                          </p>
                          <p className="text-xs text-gray-500">
                            {sequence.messages} messages • Open rate: {sequence.openRate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={sequence.active ? "default" : "secondary"}>
                          {sequence.active ? "Active" : "Inactive"}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          View Stats
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button>
                    <Mail className="h-4 w-4 mr-2" />
                    Create New Sequence
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

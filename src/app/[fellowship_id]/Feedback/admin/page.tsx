"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FeedbackList } from "@/components/feedback-list"
import { FeedbackStats } from "@/components/feedback-stats"
import { Search, Filter, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [assigneeFilter, setAssigneeFilter] = useState("all")
  const router = useRouter()

  const handleSettingsClick = () => {
    router.push("/fellowhip1/Feedback/settings")
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const  target = e.target as HTMLInputElement; 

  setSearchQuery(target.value);
};

  return (
  
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage feedback and bug reports</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSettingsClick}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="space-y-6">
          {/* Stats Overview */}
          <FeedbackStats />

          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search feedback by subject, description, or email..."
                      value={searchQuery}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="fellowship">Fellowship</SelectItem>
                      <SelectItem value="bugs">Bugs</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Assignees</SelectItem>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      <SelectItem value="admin@example.com">System Admin</SelectItem>
                      <SelectItem value="dev@example.com">Developer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Management Tabs */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Feedback</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <FeedbackList
                searchQuery={searchQuery}
                statusFilter={statusFilter}
                categoryFilter={categoryFilter}
                assigneeFilter={assigneeFilter}
              />
            </TabsContent>

            <TabsContent value="new">
              <FeedbackList
                searchQuery={searchQuery}
                statusFilter="new"
                categoryFilter={categoryFilter}
                assigneeFilter={assigneeFilter}
              />
            </TabsContent>

            <TabsContent value="in_progress">
              <FeedbackList
                searchQuery={searchQuery}
                statusFilter="in_progress"
                categoryFilter={categoryFilter}
                assigneeFilter={assigneeFilter}
              />
            </TabsContent>

            <TabsContent value="resolved">
              <FeedbackList
                searchQuery={searchQuery}
                statusFilter="resolved"
                categoryFilter={categoryFilter}
                assigneeFilter={assigneeFilter}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

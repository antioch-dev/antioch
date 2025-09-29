"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Plus, Trash2 } from "lucide-react"
import { getAllTopics, saveTopic, deleteTopic } from "@/lib/polling-data" // Import from separate file
import type { Topic } from "@/lib/polling-mock"

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [newTopicName, setNewTopicName] = useState("")
  const [newTopicDescription, setNewTopicDescription] = useState("")

  useEffect(() => {
    const loadTopics = () => {
      try {
        const topicsData = getAllTopics()
        setTopics(topicsData)
      } catch (error) {
        console.error("Error loading topics:", error)
        toast({
          title: "Error",
          description: "Failed to load topics.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadTopics()
  }, [])

  const handleCreateTopic = () => {
    if (!newTopicName.trim()) {
      toast({
        title: "Error",
        description: "Topic name is required.",
        variant: "destructive",
      })
      return
    }

    try {
      const newTopic = saveTopic({
        name: newTopicName,
        description: newTopicDescription,
      })

      if (newTopic) {
        setTopics([...topics, newTopic])
        setNewTopicName("")
        setNewTopicDescription("")
        toast({
          title: "Success",
          description: "Topic created successfully.",
        })
      }
    } catch (error) {
      console.error("Error creating topic:", error)
      toast({
        title: "Error",
        description: "Failed to create topic.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteTopic = (topicId: string) => {
    if (!confirm("Are you sure you want to delete this topic? This will remove it from all questions.")) {
      return
    }

    try {
      const success = deleteTopic(topicId)
      if (success) {
        setTopics(topics.filter(topic => topic.id !== topicId))
        toast({
          title: "Success",
          description: "Topic deleted successfully.",
        })
      }
    } catch (error) {
      console.error("Error deleting topic:", error)
      toast({
        title: "Error",
        description: "Failed to delete topic.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <>
        <DashboardHeader heading="Topics" text="Loading topics..." />
        <div className="container py-8">
          <div>Loading...</div>
        </div>
      </>
    )
  }

  return (
    <>
      <DashboardHeader
        heading="Topics"
        text="Manage question topics and categories"
      />
      <div className="container py-8">
        <div className="grid gap-6">
          {/* Create Topic Card */}
          <Card>
            <CardHeader>
              <CardTitle>Create New Topic</CardTitle>
              <CardDescription>Add a new topic category for questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Topic Name</label>
                <Input
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  placeholder="Enter topic name"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description (Optional)</label>
                <Input
                  value={newTopicDescription}
                  onChange={(e) => setNewTopicDescription(e.target.value)}
                  placeholder="Enter topic description"
                  className="mt-1"
                />
              </div>
              <Button onClick={handleCreateTopic}>
                <Plus className="mr-2 h-4 w-4" />
                Create Topic
              </Button>
            </CardContent>
          </Card>

          {/* Topics List */}
          <Card>
            <CardHeader>
              <CardTitle>All Topics ({topics.length})</CardTitle>
              <CardDescription>Manage existing topic categories</CardDescription>
            </CardHeader>
            <CardContent>
              {topics.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No topics created yet
                </div>
              ) : (
                <div className="space-y-3">
                  {topics.map((topic) => (
                    <div
                      key={topic.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium">{topic.name}</h3>
                        {topic.description && (
                          <p className="text-sm text-muted-foreground">
                            {topic.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTopic(topic.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
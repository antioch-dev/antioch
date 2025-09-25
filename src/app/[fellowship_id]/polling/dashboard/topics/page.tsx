"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { PlusCircle, Trash2, Edit, Check, X } from "lucide-react"
import { getAllTopics, saveTopic, deleteTopic } from "@/lib/data"
import type { Topic } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [editingTopic, setEditingTopic] = useState<string | null>(null)
  const [newTopic, setNewTopic] = useState<Partial<Topic>>({
    name: "",
    description: "",
    color: "#0ea5e9",
  })
  const [editForm, setEditForm] = useState<Topic | null>(null)

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
    if (!newTopic.name) {
      toast({
        title: "Error",
        description: "Topic name is required.",
        variant: "destructive",
      })
      return
    }

    try {
      const topic: Topic = {
        id: uuidv4(),
        name: newTopic.name,
        description: newTopic.description,
        color: newTopic.color || "#0ea5e9",
        createdAt: new Date().toISOString(),
      }

      saveTopic(topic)
      setTopics([...topics, topic])
      setNewTopic({
        name: "",
        description: "",
        color: "#0ea5e9",
      })

      toast({
        title: "Success",
        description: "Topic created successfully.",
      })
    } catch (error) {
      console.error("Error creating topic:", error)
      toast({
        title: "Error",
        description: "Failed to create topic.",
        variant: "destructive",
      })
    }
  }

  const handleEditTopic = (topic: Topic) => {
    setEditingTopic(topic.id)
    setEditForm({ ...topic })
  }

  const handleSaveEdit = () => {
    if (!editForm) return

    try {
      saveTopic(editForm)
      setTopics(topics.map((t) => (t.id === editForm.id ? editForm : t)))
      setEditingTopic(null)
      setEditForm(null)

      toast({
        title: "Success",
        description: "Topic updated successfully.",
      })
    } catch (error) {
      console.error("Error updating topic:", error)
      toast({
        title: "Error",
        description: "Failed to update topic.",
        variant: "destructive",
      })
    }
  }

  const handleCancelEdit = () => {
    setEditingTopic(null)
    setEditForm(null)
  }

  const handleDeleteTopic = (topicId: string) => {
    try {
      deleteTopic(topicId)
      setTopics(topics.filter((t) => t.id !== topicId))

      toast({
        title: "Success",
        description: "Topic deleted successfully.",
      })
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
        <DashboardHeader heading="Topics" text="Manage topics for your questionnaires." />
        <div className="container py-8">
          <div>Loading topics...</div>
        </div>
      </>
    )
  }

  return (
    <>
      <DashboardHeader heading="Topics" text="Manage topics for your questionnaires." />
      <div className="container py-8">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Topic</CardTitle>
              <CardDescription>Add a new topic to categorize your questions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Topic Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Product Feedback"
                    value={newTopic.name}
                    onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this topic is about"
                    value={newTopic.description || ""}
                    onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="color">Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="color"
                      type="color"
                      className="w-12 h-8 p-1"
                      value={newTopic.color || "#0ea5e9"}
                      onChange={(e) => setNewTopic({ ...newTopic, color: e.target.value })}
                    />
                    <span className="text-sm text-muted-foreground">{newTopic.color}</span>
                  </div>
                </div>
                <Button onClick={handleCreateTopic} className="mt-2">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Topic
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Topics</CardTitle>
              <CardDescription>View, edit, and delete your topics.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topics.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    No topics found. Create your first topic above.
                  </div>
                ) : (
                  topics.map((topic) => (
                    <div key={topic.id} className="rounded-lg border p-4">
                      {editingTopic === topic.id ? (
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <Label htmlFor={`edit-name-${topic.id}`}>Topic Name</Label>
                            <Input
                              id={`edit-name-${topic.id}`}
                              value={editForm?.name || ""}
                              onChange={(e) => setEditForm({ ...editForm!, name: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor={`edit-description-${topic.id}`}>Description</Label>
                            <Textarea
                              id={`edit-description-${topic.id}`}
                              value={editForm?.description || ""}
                              onChange={(e) => setEditForm({ ...editForm!, description: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor={`edit-color-${topic.id}`}>Color</Label>
                            <div className="flex items-center gap-2">
                              <Input
                                id={`edit-color-${topic.id}`}
                                type="color"
                                className="w-12 h-8 p-1"
                                value={editForm?.color || "#0ea5e9"}
                                onChange={(e) => setEditForm({ ...editForm!, color: e.target.value })}
                              />
                              <span className="text-sm text-muted-foreground">{editForm?.color}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 justify-end">
                            <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                              <X className="mr-2 h-4 w-4" />
                              Cancel
                            </Button>
                            <Button size="sm" onClick={handleSaveEdit}>
                              <Check className="mr-2 h-4 w-4" />
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: topic.color || "#0ea5e9" }}
                              ></div>
                              <h3 className="font-medium">{topic.name}</h3>
                            </div>
                            {topic.description && (
                              <p className="mt-1 text-sm text-muted-foreground">{topic.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditTopic(topic)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteTopic(topic.id)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

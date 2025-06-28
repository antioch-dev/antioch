"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Eye, Edit, Trash2, Share, BarChart3, Users, FileText } from "lucide-react"
import Link from "next/link"
import type { Form } from "../../types"

// Mock data - in a real app, this would come from an API
const mockForms: Form[] = [
  {
    id: "1",
    title: "Customer Feedback Survey",
    description: "Collect feedback from our customers about their experience",
    fields: [],
    settings: {
      isPublic: true,
      isOpen: true,
      requireLogin: false,
      successMessage: "Thank you for your feedback!",
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    createdBy: "user1",
    coAdmins: [],
    responses: Array(45)
      .fill(null)
      .map((_, i) => ({
        id: `resp-${i}`,
        formId: "1",
        responses: {},
        submittedAt: new Date(),
      })),
  },
  {
    id: "2",
    title: "Event Registration",
    description: "Register for our upcoming conference",
    fields: [],
    settings: {
      isPublic: false,
      isOpen: true,
      requireLogin: true,
      successMessage: "Registration successful!",
    },
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
    createdBy: "user1",
    coAdmins: ["user2"],
    responses: Array(23)
      .fill(null)
      .map((_, i) => ({
        id: `resp-${i}`,
        formId: "2",
        responses: {},
        submittedAt: new Date(),
      })),
  },
]

export default function FormsDashboard() {
  const [forms] = useState<Form[]>(mockForms)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Forms</h1>
          <p className="text-muted-foreground">Manage and analyze your forms</p>
        </div>
        <Link href="/forms/builder/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Form
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {forms.map((form) => (
          <Card key={form.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-2">
                    {form.title}
                    <div className="flex gap-1">
                      <Badge variant={form.settings.isOpen ? "default" : "secondary"}>
                        {form.settings.isOpen ? "Open" : "Closed"}
                      </Badge>
                      <Badge variant={form.settings.isPublic ? "outline" : "secondary"}>
                        {form.settings.isPublic ? "Public" : "Private"}
                      </Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>{form.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/forms/fill/${form.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/forms/builder/${form.id}`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/forms/responses/${form.id}`}>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Responses
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Users className="w-4 h-4 mr-2" />
                      Manage Co-admins
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex gap-4">
                  <span>{form.responses.length} responses</span>
                  <span>Created {form.createdAt.toLocaleDateString()}</span>
                  <span>Updated {form.updatedAt.toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/forms/fill/${form.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </Link>
                  <Link href={`/forms/builder/${form.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/forms/responses/${form.id}`}>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Responses ({form.responses.length})
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {forms.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No forms yet</h3>
            <p className="text-muted-foreground mb-4">Create your first form to get started</p>
            <Link href="/forms/builder/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Form
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

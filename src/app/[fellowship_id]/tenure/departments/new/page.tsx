"use client"

import type React from "react"

import { use, useState } from "react" // Add 'use' import
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Building2, Save } from "lucide-react"
import Link from "next/link"

interface NewDepartmentPageProps {
  params: Promise<{ fellowship_id: string }> // Change to Promise
}

export default function NewDepartmentPage({ params }: NewDepartmentPageProps) {
  // Use the 'use' hook to unwrap the Promise
  const resolvedParams = use(params)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock create - in real app, this would call an API
      console.log("Creating department:", {
        ...formData,
        fellowshipId: resolvedParams.fellowship_id, // Use resolvedParams
      })

      router.push(`/${resolvedParams.fellowship_id}/leadership/departments`) // Use resolvedParams
    } catch (error) {
      console.error("Failed to create department:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/${resolvedParams.fellowship_id}/leadership/departments`}> {/* Use resolvedParams */}
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Departments
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Create New Department</h2>
          <p className="text-muted-foreground">Set up a new ministry department</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Department Details
          </CardTitle>
          <CardDescription>Define the basic information for this ministry department</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Department Name</Label>
              <Input
                id="name"
                placeholder="e.g., Music Ministry, Children Ministry, Media Ministry"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">The official name of this ministry department</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the purpose, activities, and focus of this ministry department..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
                required
              />
              <p className="text-sm text-muted-foreground">
               {` Detailed description of the department's mission and activities`}
              </p>
            </div>

            {/* Preview */}
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Department Preview</h4>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Name:</span> {formData.name || "Department Name"}
                </p>
                {formData.description && (
                  <p className="text-sm">
                    <span className="font-medium">Description:</span> {formData.description}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t">
              <Link href={`/${resolvedParams.fellowship_id}/leadership/departments`}> {/* Use resolvedParams */}
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  "Creating..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Create Department
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Next Steps</CardTitle>
          <CardDescription>After creating this department, you can:</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              Create leadership positions linked to this department
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              Assign leaders to department positions
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              Display department structure on the public leadership page
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
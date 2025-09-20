"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getDepartments } from "@/lib/data-utils"
import { ArrowLeft, Users, Save } from "lucide-react"
import Link from "next/link"

// Update the interface to extend from PageProps or use the correct type
interface NewPositionPageProps {
  params: Promise<{ fellowship_id: string }>
}

export default function NewPositionPage({ params }: NewPositionPageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ fellowship_id: string } | null>(null)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    departmentId: "none",
    isActive: true,
  })

  // Resolve the params promise
  useState(() => {
    params.then((resolved) => {
      setResolvedParams(resolved)
    }).catch(() => {
      console.error("Failed to resolve params");
    })
  });

  // Show loading state while params are being resolved
  if (!resolvedParams) {
    return <div>Loading...</div>
  }

  const departments = getDepartments(resolvedParams.fellowship_id)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock create - in real app, this would call an API
      console.log("Creating position:", {
        ...formData,
        departmentId: formData.departmentId === "none" ? null : formData.departmentId,
        fellowshipId: resolvedParams.fellowship_id,
      })

      router.push(`/${resolvedParams.fellowship_id}/leadership/positions`)
    } catch (error) {
      console.error("Failed to create position:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/${resolvedParams.fellowship_id}/leadership/positions`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Positions
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Create New Position</h2>
          <p className="text-muted-foreground">Define a new leadership position</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Position Details
          </CardTitle>
          <CardDescription>Define the basic information for this leadership position</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Position Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., President, Secretary, Music Leader"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">The official title of this leadership position</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department (Optional)</Label>
                <Select
                  value={formData.departmentId}
                  onValueChange={(value) => handleInputChange("departmentId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department or leave standalone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Department (Standalone)</SelectItem>
                    {departments.map((department) => (
                      <SelectItem key={department.id} value={department.id}>
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Link this position to a specific ministry department</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the responsibilities and duties of this position..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
                required
              />
              <p className="text-sm text-muted-foreground">Detailed description of the role and responsibilities</p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => handleInputChange("isActive", checked)}
              />
              <Label htmlFor="isActive">Active Position</Label>
              <p className="text-sm text-muted-foreground ml-2">
                Whether this position is currently available for appointments
              </p>
            </div>

            {/* Preview */}
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Position Preview</h4>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Name:</span> {formData.name || "Position Name"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Type:</span>{" "}
                  {formData.departmentId
                    ? `Department Position (${departments.find((d) => d.id === formData.departmentId)?.name})`
                    : "Standalone Position"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Status:</span> {formData.isActive ? "Active" : "Inactive"}
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
              <Link href={`/${resolvedParams.fellowship_id}/leadership/positions`}>
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
                    Create Position
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
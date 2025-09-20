"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createTenure } from "@/lib/data-utils"
import { ArrowLeft, Calendar, Save } from "lucide-react"
import Link from "next/link"

interface NewTenurePageProps {
  params: { fellowship_id: string }
}

export default function NewTenurePage({ params }: NewTenurePageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    status: "upcoming" as "active" | "past" | "upcoming",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createTenure({
        ...formData,
        fellowshipId: params.fellowship_id,
      })

      router.push(`/${params.fellowship_id}/leadership/tenures`)
    } catch (error) {
      console.error("Failed to create tenure:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Auto-generate title based on start date
  const handleStartDateChange = (value: string) => {
    handleInputChange("startDate", value)

    if (value && !formData.title) {
      const year = new Date(value).getFullYear()
      handleInputChange("title", `${year} Leadership Tenure`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/${params.fellowship_id}/leadership/tenures`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tenures
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Create New Tenure</h2>
          <p className="text-muted-foreground">Set up a new leadership tenure period</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Tenure Details
          </CardTitle>
          <CardDescription>Define the basic information for this leadership tenure period</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Tenure Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., 2024 Leadership Tenure"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">A descriptive name for this tenure period</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="past">Past</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Current status of this tenure period</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">When this tenure period begins</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  min={formData.startDate}
                  required
                />
                <p className="text-sm text-muted-foreground">When this tenure period ends</p>
              </div>
            </div>

            {/* Duration Preview */}
            {formData.startDate && formData.endDate && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Duration Preview</h4>
                <p className="text-sm text-muted-foreground">
                  This tenure will run for approximately{" "}
                  {Math.round(
                    (new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) /
                      (1000 * 60 * 60 * 24 * 30),
                  )}{" "}
                  months, from {new Date(formData.startDate).toLocaleDateString()} to{" "}
                  {new Date(formData.endDate).toLocaleDateString()}.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t">
              <Link href={`/${params.fellowship_id}/leadership/tenures`}>
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
                    Create Tenure
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

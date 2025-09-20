"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getTenureById, getAppointmentsByTenure } from "@/lib/data-utils"
import type { Tenure } from "@/lib/types"
import { ArrowLeft, Calendar, Save, Trash2, Users } from "lucide-react"
import Link from "next/link"

interface EditTenurePageProps {
  params: { fellowship_id: string; tenure_id: string }
}

export default function EditTenurePage({ params }: EditTenurePageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [tenure, setTenure] = useState<Tenure | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    status: "upcoming" as "active" | "past" | "upcoming",
  })

  useEffect(() => {
    const tenureData = getTenureById(params.tenure_id)
    if (tenureData) {
      setTenure(tenureData)
      setFormData({
        title: tenureData.title,
        startDate: tenureData.startDate,
        endDate: tenureData.endDate,
        status: tenureData.status,
      })
    }
  }, [params.tenure_id])

  const appointments = tenure ? getAppointmentsByTenure(tenure.id) : []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock update - in real app, this would call an API
      console.log("Updating tenure:", { ...formData, id: params.tenure_id })

      router.push(`/${params.fellowship_id}/leadership/tenures`)
    } catch (error) {
      console.error("Failed to update tenure:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      // Mock delete - in real app, this would call an API
      console.log("Deleting tenure:", params.tenure_id)

      router.push(`/${params.fellowship_id}/leadership/tenures`)
    } catch (error) {
      console.error("Failed to delete tenure:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getStatusBadgeVariant = (status: Tenure["status"]) => {
    switch (status) {
      case "active":
        return "default"
      case "past":
        return "secondary"
      case "upcoming":
        return "outline"
      default:
        return "secondary"
    }
  }

  if (!tenure) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-foreground mb-2">Tenure not found</h3>
          <p className="text-muted-foreground mb-4">The requested tenure could not be found.</p>
          <Link href={`/${params.fellowship_id}/leadership/tenures`}>
            <Button>Back to Tenures</Button>
          </Link>
        </div>
      </div>
    )
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
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-foreground">Edit Tenure</h2>
            <Badge variant={getStatusBadgeVariant(tenure.status)}>
              {tenure.status.charAt(0).toUpperCase() + tenure.status.slice(1)}
            </Badge>
          </div>
          <p className="text-muted-foreground">Modify tenure details and settings</p>
        </div>
      </div>

      {/* Appointments Warning */}
      {appointments.length > 0 && (
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
              <Users className="h-5 w-5" />
              Active Appointments
            </CardTitle>
            <CardDescription className="text-amber-700 dark:text-amber-300">
              This tenure has {appointments.length} appointment(s). Changes to dates may affect existing appointments.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Tenure Details
          </CardTitle>
          <CardDescription>Update the information for this leadership tenure period</CardDescription>
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
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  required
                />
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
            <div className="flex items-center justify-between pt-6 border-t">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" type="button">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Tenure
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Tenure</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this tenure? This action cannot be undone and will remove all
                      associated appointments.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <div className="flex items-center gap-4">
                <Link href={`/${params.fellowship_id}/leadership/tenures`}>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

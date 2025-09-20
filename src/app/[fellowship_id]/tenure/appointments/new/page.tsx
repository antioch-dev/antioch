"use client"

import type React from "react"
import { use, useState } from "react" // Add the 'use' hook import
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getTenures, getPositionsWithDepartments, getPersons } from "@/lib/data-utils"
import { ArrowLeft, UserCheck, Send } from "lucide-react"
import Link from "next/link"

interface NewAppointmentPageProps {
  params: Promise<{ fellowship_id: string }> // Change to Promise
}

export default function NewAppointmentPage({ params }: NewAppointmentPageProps) {
  // Use the 'use' hook to unwrap the Promise
  const resolvedParams = use(params)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    tenureId: "",
    positionId: "",
    personId: "",
  })

  const tenures = getTenures(resolvedParams.fellowship_id) // Use resolvedParams
  const positions = getPositionsWithDepartments(resolvedParams.fellowship_id).filter((p) => p.isActive) // Use resolvedParams
  const persons = getPersons(resolvedParams.fellowship_id) // Use resolvedParams

  const selectedTenure = tenures.find((t) => t.id === formData.tenureId)
  const selectedPosition = positions.find((p) => p.id === formData.positionId)
  const selectedPerson = persons.find((p) => p.id === formData.personId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock create appointment - in real app, this would call an API
      const inviteToken = `token_${Date.now()}`
      const appointment = {
        ...formData,
        fellowshipId: resolvedParams.fellowship_id, // Use resolvedParams
        status: "pending",
        inviteLink: `/${resolvedParams.fellowship_id}/leadership/invite/${inviteToken}`, // Use resolvedParams
        inviteToken,
        appointedBy: "admin_1", // Mock admin ID
        appointedAt: new Date().toISOString(),
      }

      console.log("Creating appointment:", appointment)

      router.push(`/${resolvedParams.fellowship_id}/leadership/appointments`) // Use resolvedParams
    } catch (error) {
      console.error("Failed to create appointment:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = formData.tenureId && formData.positionId && formData.personId

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/${resolvedParams.fellowship_id}/leadership/appointments`}> {/* Use resolvedParams */}
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Appointments
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Create New Appointment</h2>
          <p className="text-muted-foreground">Assign a person to a leadership position</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Appointment Details
          </CardTitle>
          <CardDescription>Select the tenure, position, and person for this appointment</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tenure">Tenure Period</Label>
                <Select value={formData.tenureId} onValueChange={(value) => handleInputChange("tenureId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tenure" />
                  </SelectTrigger>
                  <SelectContent>
                    {tenures.map((tenure) => (
                      <SelectItem key={tenure.id} value={tenure.id}>
                        <div>
                          <div className="font-medium">{tenure.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(tenure.startDate).getFullYear()} - {new Date(tenure.endDate).getFullYear()}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">The tenure period for this appointment</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select value={formData.positionId} onValueChange={(value) => handleInputChange("positionId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position.id} value={position.id}>
                        <div>
                          <div className="font-medium">{position.name}</div>
                          {position.department && (
                            <div className="text-sm text-muted-foreground">{position.department.name}</div>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">The leadership position to fill</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="person">Person</Label>
                <Select value={formData.personId} onValueChange={(value) => handleInputChange("personId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select person" />
                  </SelectTrigger>
                  <SelectContent>
                    {persons.map((person) => (
                      <SelectItem key={person.id} value={person.id}>
                        <div>
                          <div className="font-medium">{person.name}</div>
                          <div className="text-sm text-muted-foreground">{person.email}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">The person to appoint to this position</p>
              </div>
            </div>

            {/* Preview */}
            {isFormValid && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium text-foreground mb-3">Appointment Preview</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Person:</span>
                    <span className="text-sm font-medium">{selectedPerson?.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Position:</span>
                    <span className="text-sm font-medium">{selectedPosition?.name}</span>
                  </div>
                  {selectedPosition?.department && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Department:</span>
                      <span className="text-sm font-medium">{selectedPosition.department.name}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tenure:</span>
                    <span className="text-sm font-medium">{selectedTenure?.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Duration:</span>
                    <span className="text-sm font-medium">
                      {selectedTenure &&
                        `${new Date(selectedTenure.startDate).toLocaleDateString()} - ${new Date(selectedTenure.endDate).toLocaleDateString()}`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t">
              <Link href={`/${resolvedParams.fellowship_id}/leadership/appointments`}> {/* Use resolvedParams */}
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isLoading || !isFormValid}>
                {isLoading ? (
                  "Creating..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Create & Send Invite
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
          <CardTitle className="text-lg">What happens next?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              An invitation link will be generated for the selected person
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              The person can use the link to accept or decline the appointment
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              You can track the appointment status and resend invites if needed
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              Accepted appointments will appear on the public leadership page
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
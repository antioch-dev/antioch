"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  getDepartmentById,
  getPersons,
  getPositionsWithDepartments,
  getAppointmentsByDepartment,
  createAppointment,
} from "@/lib/data-utils"
import { mockPersons, mockPositions } from "@/lib/mock-data"
import Link from "next/link"
import { ArrowLeft, Users, Plus, Search, MoreHorizontal, UserPlus, Crown, Trash2, Mail, Phone } from "lucide-react"
import Image from "next/image"

interface DepartmentMembersPageProps {
  params: { fellowship_id: string; department_id: string }
}

export default function DepartmentMembersPage({ params }: DepartmentMembersPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPersonId, setSelectedPersonId] = useState("")
  const [selectedPositionId, setSelectedPositionId] = useState("")
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [isElevateOpen, setIsElevateOpen] = useState(false)
  const [selectedMemberId, setSelectedMemberId] = useState("")

  const department = getDepartmentById(params.fellowship_id, params.department_id)
  const allPersons = getPersons(params.fellowship_id)
  const departmentPositions = getPositionsWithDepartments(params.fellowship_id).filter(
    (p) => p.departmentId === params.department_id && p.isActive,
  )
  const departmentAppointments = getAppointmentsByDepartment(params.fellowship_id, params.department_id)

  console.log("[v0] Department:", department)
  console.log("[v0] All Persons Count:", allPersons?.length || 0)
  console.log("[v0] All Persons Sample:", allPersons?.slice(0, 2))
  console.log("[v0] Department Positions Count:", departmentPositions?.length || 0)
  console.log("[v0] Department Positions Sample:", departmentPositions?.slice(0, 2))
  console.log("[v0] Mock Persons Count:", mockPersons?.length || 0)
  console.log("[v0] Mock Positions Count:", mockPositions?.length || 0)

  // Get current members (people with appointments in this department)
  const currentMembers = departmentAppointments
    .filter((apt) => apt.status === "accepted")
    .map((apt) => {
      const person = allPersons.find((p) => p.id === apt.personId)
      const position = departmentPositions.find((p) => p.id === apt.positionId)
      return { ...person, appointment: apt, position }
    })
    .filter((member) => member.id) // Filter out any null persons

  const availablePersons =
    allPersons?.filter((person) => {
      // Ensure person has required fields - using 'name' instead of firstName/lastName
      if (!person.name) return false
      // Check if person is not already in this department
      return !currentMembers.some((member) => member.id === person.id)
    }) || []

  const filteredMembers = currentMembers.filter((member) => {
    if (!member.name) return false
    const fullName = member.name.toLowerCase()
    const positionName = member.position?.name?.toLowerCase() || ""
    return fullName.includes(searchTerm.toLowerCase()) || positionName.includes(searchTerm.toLowerCase())
  })

  const handleAddMember = async () => {
    if (!selectedPersonId || !selectedPositionId) return

    try {
      // Create a new appointment using the mock API
      const activeTenure = mockPositions.find((p) => p.fellowshipId === params.fellowship_id)
      if (activeTenure) {
        await createAppointment(
          "tenure_2024_2026", // Use the active tenure ID from mock data
          selectedPositionId,
          selectedPersonId,
          "admin_user_1", // Mock admin user
        )
        console.log("[v0] Successfully added member:", { personId: selectedPersonId, positionId: selectedPositionId })
      }
    } catch (error) {
      console.error("[v0] Error adding member:", error)
    }

    setIsAddMemberOpen(false)
    setSelectedPersonId("")
    setSelectedPositionId("")
    // In a real app, you would refresh the data here
  }

  const handleElevateMember = () => {
    if (!selectedMemberId || !selectedPositionId) return

    // Mock elevate member - in real app, this would update the appointment
    console.log("Elevating member:", { memberId: selectedMemberId, newPositionId: selectedPositionId })
    setIsElevateOpen(false)
    setSelectedMemberId("")
    setSelectedPositionId("")
  }

  const handleRemoveMember = (memberId: string) => {
    // Mock remove member - in real app, this would revoke the appointment
    console.log("Removing member:", memberId)
  }

  if (!department) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="text-center py-8">
            <h3 className="text-lg font-medium text-foreground mb-2">Department not found</h3>
            <p className="text-muted-foreground mb-4">The requested department could not be found.</p>
            <Link href={`/${params.fellowship_id}/leadership/departments`}>
              <Button>Back to Departments</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/${params.fellowship_id}/leadership/departments`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Departments
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{department.name} Members</h2>
            <p className="text-muted-foreground">Manage department members and their positions</p>
          </div>
        </div>

        <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Department Member</DialogTitle>
              <DialogDescription>Assign a person to a position in {department.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Person</Label>
                <Select value={selectedPersonId} onValueChange={setSelectedPersonId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a person..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePersons.length > 0 ? (
                      availablePersons.map((person) => (
                        <SelectItem key={person.id} value={person.id}>
                          <div className="flex items-center gap-2">
                            <span>{person.name}</span>
                            {person.email && <span className="text-xs text-muted-foreground">({person.email})</span>}
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-persons" disabled>
                        No available persons found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {availablePersons.length} available persons | Total persons: {allPersons?.length || 0} | Current
                  members: {currentMembers.length}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Select Position</Label>
                <Select value={selectedPositionId} onValueChange={setSelectedPositionId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a position..." />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentPositions.length > 0 ? (
                      departmentPositions.map((position) => (
                        <SelectItem key={position.id} value={position.id}>
                          <div className="flex flex-col">
                            <span>{position.name}</span>
                            {position.description && (
                              <span className="text-xs text-muted-foreground">{position.description}</span>
                            )}
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-positions" disabled>
                        No available positions found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {departmentPositions.length} available positions in this department
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMember} disabled={!selectedPersonId || !selectedPositionId}>
                  Add Member
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Department Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Department Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{currentMembers.length}</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{departmentPositions.length}</div>
              <div className="text-sm text-muted-foreground">Available Positions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {Math.max(0, departmentPositions.length - currentMembers.length)}
              </div>
              <div className="text-sm text-muted-foreground">Open Positions</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Debug Info:</p>
              <p>• Total persons in system: {allPersons?.length || 0}</p>
              <p>• Available persons: {availablePersons.length}</p>
              <p>• Department positions: {departmentPositions.length}</p>
              <p>• Current members: {currentMembers.length}</p>
              <p>
                • Mock data loaded: {mockPersons?.length || 0} persons, {mockPositions?.length || 0} positions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members by name or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Members List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {searchTerm ? "No members found" : "No members yet"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Start building your department by adding members to positions"}
                </p>
                {!searchTerm && (
                  <Button onClick={() => setIsAddMemberOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Member
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredMembers.map((member) => (
            <Card key={member.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {/* Using 'photoUrl' field from mock data */}
                      <Image
                        src={member.photoUrl || "/placeholder.svg?height=40&width=40"}
                        alt={member.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                      {member.position?.name?.toLowerCase().includes("leader") && (
                        <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {member.position?.name}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedMemberId(member.id!)
                          setIsElevateOpen(true)
                        }}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Change Position
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleRemoveMember(member.id!)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove from Department
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {member.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {member.email}
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {member.phone}
                    </div>
                  )}
                  <div className="pt-2 border-t">
                    <div className="text-xs text-muted-foreground">
                      Appointed: {new Date(member.appointment.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Elevate Member Dialog */}
      <Dialog open={isElevateOpen} onOpenChange={setIsElevateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Member Position</DialogTitle>
            <DialogDescription>Assign this member to a different position in {department.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>New Position</Label>
              <Select value={selectedPositionId} onValueChange={setSelectedPositionId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a new position..." />
                </SelectTrigger>
                <SelectContent>
                  {departmentPositions.map((position) => (
                    <SelectItem key={position.id} value={position.id}>
                      {position.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsElevateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleElevateMember} disabled={!selectedPositionId}>
                Update Position
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

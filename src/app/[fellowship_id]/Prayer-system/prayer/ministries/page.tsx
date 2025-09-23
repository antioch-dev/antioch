"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PrayerLayout from "@/components/prayer-layout"
import { mockMinistryAssignments, type MinistryAssignment } from "@/lib/mock-data"
import {
  Plus,
  Building,
  Users,
  RotateCcw,
  Calendar,
  UserPlus,
  UserMinus,
  Settings,
  Heart,
  Music,
  Baby,
  Handshake,
  BookOpen,
} from "lucide-react"

interface MinistryAssignmentsProps {
  params: {
    fellowship: string
  }
}

export default function MinistryAssignments({ params }: MinistryAssignmentsProps) {
  const { fellowship } = params
  const [ministries, setMinistries] = useState<MinistryAssignment[]>(mockMinistryAssignments)
  const [selectedMinistry, setSelectedMinistry] = useState<MinistryAssignment | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Form state for creating ministries
  const [formData, setFormData] = useState({
    ministryName: "",
    description: "",
    rotationSchedule: "",
  })

  // Form state for adding members
  const [memberData, setMemberData] = useState({
    selectedMembers: [] as string[],
  })

  // Available team members
  const availableMembers = [
    "Pastor James",
    "Elder Mary",
    "Counselor Tom",
    "Mentor Susan",
    "Deacon John",
    "Prayer Leader Sarah",
    "Youth Pastor Mark",
    "Teacher Anna",
    "Helper Bob",
    "Grace Wilson",
    "Community Volunteers",
    "Parent Volunteers",
    "Outreach Team",
    "Youth Team",
    "Deacon Team",
  ]

  const handleCreateMinistry = (e: React.FormEvent) => {
    e.preventDefault()

    const newMinistry: MinistryAssignment = {
      id: (ministries.length + 1).toString(),
      ministryName: formData.ministryName,
      members: [],
      description: formData.description,
      rotationSchedule: formData.rotationSchedule,
    }

    setMinistries([...ministries, newMinistry])
    setFormData({ ministryName: "", description: "", rotationSchedule: "" })
    setIsCreateDialogOpen(false)
  }

  const handleAddMembers = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedMinistry) {
      const updatedMinistries = ministries.map((ministry) =>
        ministry.id === selectedMinistry.id
          ? {
              ...ministry,
              members: [...new Set([...ministry.members, ...memberData.selectedMembers])].filter(
                (m): m is string => typeof m === "string"
              ),
            }
          : ministry,
      );

      setMinistries(updatedMinistries);
      setMemberData({ selectedMembers: [] });
      setSelectedMinistry(null);
      setIsAddMemberDialogOpen(false);
    }
  };

  const handleRemoveMember = (ministryId: string, memberToRemove: string) => {
    const updatedMinistries = ministries.map((ministry) =>
      ministry.id === ministryId
        ? {
            ...ministry,
            members: ministry.members.filter((member) => member !== memberToRemove),
          }
        : ministry,
    )

    setMinistries(updatedMinistries)
  }

 const handleRotateAssignments = (ministryId: string) => {
  const ministry = ministries.find((m) => m.id === ministryId);
  if (ministry && ministry.members.length > 1) {
    const rotatedMembers = [...ministry.members.slice(1), ministry.members[0]] as string[];
    const updatedMinistries = ministries.map((m) => (m.id === ministryId ? { ...m, members: rotatedMembers } : m));
    setMinistries(updatedMinistries);
  }
};

  const getMinistryIcon = (ministryName: string) => {
    if (ministryName.toLowerCase().includes("worship")) return <Music className="h-5 w-5 text-blue-600" />
    if (ministryName.toLowerCase().includes("youth")) return <Users className="h-5 w-5 text-green-600" />
    if (ministryName.toLowerCase().includes("children")) return <Baby className="h-5 w-5 text-pink-600" />
    if (ministryName.toLowerCase().includes("outreach")) return <Handshake className="h-5 w-5 text-orange-600" />
    if (ministryName.toLowerCase().includes("pastoral")) return <BookOpen className="h-5 w-5 text-purple-600" />
    return <Building className="h-5 w-5 text-gray-600" />
  }

  const getRotationColor = (schedule?: string) => {
    switch (schedule) {
      case "Weekly":
        return "bg-green-100 text-green-800"
      case "Bi-weekly":
        return "bg-blue-100 text-blue-800"
      case "Monthly":
        return "bg-purple-100 text-purple-800"
      case "As needed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalMembers = ministries.reduce((sum, ministry) => sum + ministry.members.length, 0)
  const averageMembersPerMinistry = ministries.length > 0 ? Math.round(totalMembers / ministries.length) : 0

  return (
    <PrayerLayout fellowshipName={fellowship}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ministry Prayer Coverage</h1>
            <p className="text-gray-600 mt-2">Organize ongoing prayer support for all fellowship ministries</p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4" />
                Add Ministry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Ministry</DialogTitle>
                <DialogDescription>
                  Create a new ministry and assign prayer team members to provide coverage.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateMinistry} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="ministryName">Ministry Name *</Label>
                  <Input
                    id="ministryName"
                    value={formData.ministryName}
                    onChange={(e) => setFormData({ ...formData, ministryName: e.target.value })}
                    placeholder="e.g., Worship Team, Children's Ministry"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what this ministry does and specific prayer needs..."
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rotationSchedule">Rotation Schedule</Label>
                  <Select
                    value={formData.rotationSchedule}
                    onValueChange={(value) => setFormData({ ...formData, rotationSchedule: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rotation schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="As needed">As needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    Create Ministry
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Ministries</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ministries.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prayer Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMembers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Members/Ministry</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageMembersPerMinistry}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Rotations</CardTitle>
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {ministries.filter((m) => m.rotationSchedule && m.rotationSchedule !== "As needed").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Ministry Overview</TabsTrigger>
            <TabsTrigger value="management">Team Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Ministry Cards */}
            <div className="grid gap-6">
              {ministries.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No ministries yet</h3>
                    <p className="text-gray-600 mb-4">
                      Create your first ministry to organize prayer coverage for your fellowship activities.
                    </p>
                    <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add First Ministry
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                ministries.map((ministry) => (
                  <Card key={ministry.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {getMinistryIcon(ministry.ministryName)}
                          <div>
                            <CardTitle className="text-xl">{ministry.ministryName}</CardTitle>
                            <p className="text-gray-600 mt-1">{ministry.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {ministry.rotationSchedule && (
                            <Badge className={getRotationColor(ministry.rotationSchedule)}>
                              {ministry.rotationSchedule}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Prayer Team Members */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Prayer Team ({ministry.members.length})
                            </h4>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedMinistry(ministry)
                                setIsAddMemberDialogOpen(true)
                              }}
                              className="gap-2"
                            >
                              <UserPlus className="h-4 w-4" />
                              Add Member
                            </Button>
                          </div>

                          {ministry.members.length === 0 ? (
                            <div className="text-center py-6 bg-gray-50 rounded-lg">
                              <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">No prayer team members assigned yet</p>
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {ministry.members.map((member, index) => (
                                <div key={index} className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                                  <span className="text-sm font-medium text-blue-800">{member}</span>
                                  <button
                                    onClick={() => handleRemoveMember(ministry.id, member)}
                                    className="text-blue-600 hover:text-blue-800 transition-colors"
                                  >
                                    <UserMinus className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center pt-4 border-t">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            {ministry.rotationSchedule
                              ? `Rotates ${ministry.rotationSchedule.toLowerCase()}`
                              : "No rotation"}
                          </div>
                          <div className="flex gap-2">
                            {ministry.members.length > 1 && ministry.rotationSchedule !== "As needed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRotateAssignments(ministry.id)}
                                className="gap-2"
                              >
                                <RotateCcw className="h-4 w-4" />
                                Rotate Now
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedMinistry(ministry)
                                setFormData({
                                  ministryName: ministry.ministryName,
                                  description: ministry.description,
                                  rotationSchedule: ministry.rotationSchedule || "",
                                })
                                setIsEditDialogOpen(true)
                              }}
                              className="gap-2"
                            >
                              <Settings className="h-4 w-4" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="management" className="space-y-6">
            {/* Team Management Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Prayer Team Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableMembers.map((member) => {
                    const assignedMinistries = ministries.filter((ministry) => ministry.members.includes(member))
                    return (
                      <div key={member} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{member}</p>
                          <p className="text-sm text-gray-600">
                            {assignedMinistries.length === 0
                              ? "Not assigned to any ministries"
                              : `Assigned to: ${assignedMinistries.map((m) => m.ministryName).join(", ")}`}
                          </p>
                        </div>
                        <Badge variant={assignedMinistries.length > 0 ? "default" : "secondary"}>
                          {assignedMinistries.length} ministries
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Members Dialog */}
        <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Prayer Team Members</DialogTitle>
              <DialogDescription>
                Select members to add to the {selectedMinistry?.ministryName} prayer team.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddMembers} className="space-y-6">
              <div className="space-y-3">
                <Label>Available Members</Label>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {availableMembers
                    .filter((member) => !selectedMinistry?.members.includes(member))
                    .map((member) => (
                      <div key={member} className="flex items-center space-x-2">
                        <Checkbox
                          id={member}
                          checked={memberData.selectedMembers.includes(member)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setMemberData({
                                selectedMembers: [...memberData.selectedMembers, member],
                              })
                            } else {
                              setMemberData({
                                selectedMembers: memberData.selectedMembers.filter((m) => m !== member),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={member} className="text-sm">
                          {member}
                        </Label>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1" disabled={memberData.selectedMembers.length === 0}>
                  Add Selected Members
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsAddMemberDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Ministry Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Ministry</DialogTitle>
              <DialogDescription>Update ministry information and settings.</DialogDescription>
            </DialogHeader>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (selectedMinistry) {
                  const updatedMinistries = ministries.map((ministry) =>
                    ministry.id === selectedMinistry.id
                      ? {
                          ...ministry,
                          ministryName: formData.ministryName,
                          description: formData.description,
                          rotationSchedule: formData.rotationSchedule,
                        }
                      : ministry,
                  )
                  setMinistries(updatedMinistries)
                  setIsEditDialogOpen(false)
                }
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="editMinistryName">Ministry Name *</Label>
                <Input
                  id="editMinistryName"
                  value={formData.ministryName}
                  onChange={(e) => setFormData({ ...formData, ministryName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editDescription">Description *</Label>
                <Textarea
                  id="editDescription"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editRotationSchedule">Rotation Schedule</Label>
                <Select
                  value={formData.rotationSchedule}
                  onValueChange={(value) => setFormData({ ...formData, rotationSchedule: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rotation schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="As needed">As needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Update Ministry
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </PrayerLayout>
  )
}
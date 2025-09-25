'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { type PrayerAssignment, type PrayerRequest, getPrayerRequestById } from '@/lib/mock-data'
import {
  Plus,
  UserCheck,
  Clock,
  CheckCircle,
  User,
  Calendar,
  MessageSquare,
  Bell,
  Heart,
  AlertCircle,
  Edit,
} from 'lucide-react'




const teamMembers = [
  'Pastor James',
  'Elder Mary',
  'Counselor Tom',
  'Mentor Susan',
  'Deacon John',
  'Prayer Leader Sarah',
  'Youth Pastor Mark',
]


export default function AssignmentList() {
  const [assignments, setAssignments] = useState<PrayerAssignment[]>([])
  const [initialRequests, setInitialRequests] = useState<PrayerRequest[]>([])
  const [selectedAssignment, setSelectedAssignment] = useState<PrayerAssignment | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false)
  const [isStatusUpdateDialogOpen, setIsStatusUpdateDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const [formData, setFormData] = useState({
    requestId: '',
    assignedMember: '',
  })

  const [completionData, setCompletionData] = useState({
    notes: '',
  })

  const [statusUpdateData, setStatusUpdateData] = useState({
    status: '',
    notes: '',
  })

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault()
    const newAssignment: PrayerAssignment = {
      id: (assignments.length + 1).toString(),
      requestId: formData.requestId,
      assignedMember: formData.assignedMember,
      status: 'Pending',
      dateAssigned: new Date().toISOString(),
    }
    setAssignments([...assignments, newAssignment])
    setFormData({ requestId: '', assignedMember: '' })
    setIsCreateDialogOpen(false)
  }

  const handleCompleteAssignment = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedAssignment) {
      const updatedAssignments = assignments.map((assignment) =>
        assignment.id === selectedAssignment.id
          ? {
              ...assignment,
              status: 'Completed' as const,
              notes: completionData.notes,
              dateCompleted: new Date().toISOString(),
            }
          : assignment,
      )
      setAssignments(updatedAssignments)
      setCompletionData({ notes: '' })
      setSelectedAssignment(null)
      setIsCompleteDialogOpen(false)
    }
  }

  const handleStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedAssignment) {
      const updatedAssignments = assignments.map((assignment) =>
        assignment.id === selectedAssignment.id
          ? {
              ...assignment,
              status: statusUpdateData.status as PrayerAssignment['status'],
              notes: statusUpdateData.notes || assignment.notes,
              ...(statusUpdateData.status === 'Completed' && { dateCompleted: new Date().toISOString() }),
            }
          : assignment,
      )
      setAssignments(updatedAssignments)
      setStatusUpdateData({ status: '', notes: '' })
      setSelectedAssignment(null)
      setIsStatusUpdateDialogOpen(false)
    }
  }

  const getStatusIcon = (status: PrayerAssignment['status']) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  const getStatusColor = (status: PrayerAssignment['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Completed':
        return 'bg-green-100 text-green-800'
    }
  }

  const pendingAssignments = assignments.filter((a) => a.status === 'Pending')
  const completedAssignments = assignments.filter((a) => a.status === 'Completed')
  const unassignedRequests = initialRequests.filter(
    (request) => !assignments.some((assignment) => assignment.requestId === assignment.id),
  )

  const currentUser = 'Pastor James'
  const myAssignments = assignments.filter((a) => a.assignedMember === currentUser)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prayer Assignments</h1>
          <p className="text-gray-600 mt-2">Assign specific prayer requests to team members for focused prayer</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4" />
              Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Prayer Assignment</DialogTitle>
              <DialogDescription>
                Assign a specific prayer request to a team member for focused prayer and follow-up.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateAssignment} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="request">Prayer Request *</Label>
                <Select
                  value={formData.requestId}
                  onValueChange={(value) => setFormData({ ...formData, requestId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a prayer request" />
                  </SelectTrigger>
                  <SelectContent>
                    {unassignedRequests.map((request) => (
                      <SelectItem key={request.id} value={request.id}>
                        {request.name} - {request.category} ({request.text.substring(0, 50)}...)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="member">Assign to Member *</Label>
                <Select
                  value={formData.assignedMember}
                  onValueChange={(value) => setFormData({ ...formData, assignedMember: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member} value={member}>
                        {member}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Create Assignment
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAssignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedAssignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Assignments</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myAssignments.length}</div>
          </CardContent>
        </Card>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="my-assignments">My Assignments</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Assignment Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.slice(0, 5).map((assignment) => {
                  const request = getPrayerRequestById(assignment.requestId)
                  return (
                    <div key={assignment.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      {getStatusIcon(assignment.status)}
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {assignment.status === 'Completed' ? 'Assignment Completed' : 'New Assignment'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {request?.name}&apos;s {request?.category.toLowerCase()} request assigned to{' '}
                          {assignment.assignedMember}
                        </p>
                      </div>
                      <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
          {unassignedRequests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Unassigned Prayer Requests ({unassignedRequests.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {unassignedRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{request.name}</p>
                        <p className="text-sm text-gray-600">
                          {request.category} - {request.text.substring(0, 60)}...
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          setFormData({ ...formData, requestId: request.id })
                          setIsCreateDialogOpen(true)
                        }}
                      >
                        Assign
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="my-assignments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">My Prayer Assignments ({myAssignments.length})</h2>
          </div>
          {myAssignments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments yet</h3>
                <p className="text-gray-600">You don&apos;t have any prayer assignments at the moment.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {myAssignments.map((assignment) => {
                const request = getPrayerRequestById(assignment.requestId)
                return (
                  <Card key={assignment.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">Prayer for {request?.name}</CardTitle>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Assigned {new Date(assignment.dateAssigned).toLocaleDateString()}
                            </div>
                            <Badge variant="outline">{request?.category}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(assignment.status)}
                          <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{request?.text}</p>
                      {assignment.notes && (
                        <div className="bg-green-50 p-3 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Prayer Notes</span>
                          </div>
                          <p className="text-sm text-green-700">{assignment.notes}</p>
                        </div>
                      )}
                      <div className="flex justify-end gap-2">
                        {assignment.status === 'Pending' && (
                          <>
                            <Button
                              onClick={() => {
                                setSelectedAssignment(assignment)
                                setIsCompleteDialogOpen(true)
                              }}
                              className="gap-2"
                            >
                              <CheckCircle className="h-4 w-4" />
                              Mark as Prayed For
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSelectedAssignment(assignment)
                                setStatusUpdateData({
                                  status: assignment.status,
                                  notes: assignment.notes || '',
                                })
                                setIsStatusUpdateDialogOpen(true)
                              }}
                              className="gap-2"
                            >
                              <Edit className="h-4 w-4" />
                              Update Status
                            </Button>
                          </>
                        )}
                        {assignment.status === 'Completed' && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedAssignment(assignment)
                              setStatusUpdateData({
                                status: assignment.status,
                                notes: assignment.notes || '',
                              })
                              setIsStatusUpdateDialogOpen(true)
                            }}
                            className="gap-2"
                          >
                            <Edit className="h-4 w-4" />
                            Update Status
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
      <Dialog open={isCompleteDialogOpen} onOpenChange={setIsCompleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark Assignment as Complete</DialogTitle>
            <DialogDescription>
              Share any notes or encouragement from your prayer time for this request.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCompleteAssignment} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="notes">Prayer Notes & Encouragement (Optional)</Label>
              <Textarea
                id="notes"
                value={completionData.notes}
                onChange={(e) => setCompletionData({ ...completionData, notes: e.target.value })}
                placeholder="Share any insights, encouragement, or updates from your prayer time..."
                rows={4}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                Complete Assignment
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsCompleteDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={isStatusUpdateDialogOpen} onOpenChange={setIsStatusUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Assignment Status</DialogTitle>
            <DialogDescription>
              Update the status of this prayer assignment and add any additional notes.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleStatusUpdate} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={statusUpdateData.status}
                onValueChange={(value) => setStatusUpdateData({ ...statusUpdateData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status-notes">Prayer Notes & Updates (Optional)</Label>
              <Textarea
                id="status-notes"
                value={statusUpdateData.notes}
                onChange={(e) => setStatusUpdateData({ ...statusUpdateData, notes: e.target.value })}
                placeholder="Add any updates, insights, or encouragement from your prayer time..."
                rows={4}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                Update Status
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsStatusUpdateDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
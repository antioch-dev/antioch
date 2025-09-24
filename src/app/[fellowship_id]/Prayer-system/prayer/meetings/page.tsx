'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
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
} from '@/components/ui/alert-dialog'
import PrayerLayout from '@/components/prayer-layout'
import { mockPrayerMeetings, type PrayerMeeting } from '@/lib/mock-data'
import {
  Plus,
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  ExternalLink,
  CalendarPlus,
  Edit,
  Trash2,
  MoreVertical,
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useParams } from 'next/navigation'

export default function PrayerMeetings() {
  const params = useParams<{
    fellowship_id: string
  }>()
  const { fellowship_id } = params
  const [meetings, setMeetings] = useState<PrayerMeeting[]>(mockPrayerMeetings)
  const [selectedMeeting, setSelectedMeeting] = useState<PrayerMeeting | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingMeeting, setEditingMeeting] = useState<PrayerMeeting | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list')

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    type: '',
    link: '',
    description: '',
  })

  const [editFormData, setEditFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    type: '',
    link: '',
    description: '',
  })

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault()

    const newMeeting: PrayerMeeting = {
      id: (meetings.length + 1).toString(),
      title: formData.title,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      type: formData.type as PrayerMeeting['type'],
      link: formData.link || undefined,
      description: formData.description,
      attendees: [{ id: '1', name: 'You', email: 'you@example.com' }],
    }

    setMeetings([...meetings, newMeeting])
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      type: '',
      link: '',
      description: '',
    })
    setIsCreateDialogOpen(false)
  }

  const handleEditMeeting = (meeting: PrayerMeeting) => {
    setEditingMeeting(meeting)
    setEditFormData({
      title: meeting.title,
      date: meeting.date,
      time: meeting.time,
      location: meeting.location,
      type: meeting.type,
      link: meeting.link || '',
      description: meeting.description,
    })
    setIsEditDialogOpen(true)
  }

  const handleSaveEditedMeeting = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingMeeting) return

    const updatedMeeting: PrayerMeeting = {
      ...editingMeeting,
      title: editFormData.title,
      date: editFormData.date,
      time: editFormData.time,
      location: editFormData.location,
      type: editFormData.type as PrayerMeeting['type'],
      link: editFormData.link || undefined,
      description: editFormData.description,
    }

    setMeetings(meetings.map((meeting) => (meeting.id === editingMeeting.id ? updatedMeeting : meeting)))
    setIsEditDialogOpen(false)
    setEditingMeeting(null)
  }

  const handleDeleteMeeting = (meetingId: string) => {
    setMeetings(meetings.filter((meeting) => meeting.id !== meetingId))
  }

  const handleJoinMeeting = (meeting: PrayerMeeting) => {
    if (meeting.link) {
      window.open(meeting.link, '_blank')
    }
  }

  const handleAddToCalendar = (meeting: PrayerMeeting) => {
    const startDate = new Date(`${meeting.date}T${meeting.time}`)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000)

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      meeting.title,
    )}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${
      endDate.toISOString().replace(/[-:]/g, '').split('.')[0]
    }Z&details=${encodeURIComponent(meeting.description)}&location=${encodeURIComponent(meeting.location)}`

    window.open(calendarUrl, '_blank')
  }

  const getMeetingTypeColor = (type: PrayerMeeting['type']) => {
    switch (type) {
      case 'General Fellowship Prayer':
        return 'bg-blue-100 text-blue-800'
      case 'Ministry-specific Prayer':
        return 'bg-purple-100 text-purple-800'
      case 'Special Event Prayer':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getMeetingTypeIcon = (type: PrayerMeeting['type']) => {
    switch (type) {
      case 'General Fellowship Prayer':
        return <Users className="h-4 w-4" />
      case 'Ministry-specific Prayer':
        return <Calendar className="h-4 w-4" />
      case 'Special Event Prayer':
        return <CalendarPlus className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const upcomingMeetings = meetings
    .filter((meeting) => new Date(meeting.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pastMeetings = meetings
    .filter((meeting) => new Date(meeting.date) < new Date())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <PrayerLayout fellowshipName={fellowship_id}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Prayer Meetings</h1>
            <p className="text-gray-600 mt-2">Schedule and join prayer gatherings for your community</p>
          </div>

          <div className="flex gap-3">
            <div className="flex rounded-lg border">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-r-none"
              >
                List
              </Button>
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('calendar')}
                className="rounded-l-none"
              >
                Calendar
              </Button>
            </div>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4" />
                  Schedule Meeting
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Schedule Prayer Meeting</DialogTitle>
                  <DialogDescription>Create a new prayer meeting for your fellowship community.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleCreateMeeting} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Meeting Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Weekly Fellowship Prayer"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Time *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Fellowship Hall or Online - Zoom"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Meeting Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select meeting type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Fellowship Prayer">General Fellowship Prayer</SelectItem>
                        <SelectItem value="Ministry-specific Prayer">Ministry-specific Prayer</SelectItem>
                        <SelectItem value="Special Event Prayer">Special Event Prayer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="link">Online Meeting Link (Optional)</Label>
                    <Input
                      id="link"
                      type="url"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      placeholder="https://zoom.us/j/123456789"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the purpose and focus of this prayer meeting..."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1">
                      Schedule Meeting
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Upcoming Meetings ({upcomingMeetings.length})</h2>
          </div>

          {upcomingMeetings.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming meetings</h3>
                <p className="text-gray-600 mb-4">
                  Schedule your first prayer meeting to bring the community together.
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Schedule First Meeting
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {upcomingMeetings.map((meeting) => (
                <Card key={meeting.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{meeting.title}</CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(meeting.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {meeting.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {meeting.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getMeetingTypeIcon(meeting.type)}
                        <Badge className={getMeetingTypeColor(meeting.type)}>{meeting.type}</Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditMeeting(meeting)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Meeting
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Meeting
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Prayer Meeting</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete &quot;{meeting.title}&quot;? This action cannot be
                                    undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteMeeting(meeting.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{meeting.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        {meeting.attendees.length} attendees
                      </div>
                      <div className="flex gap-2">
                        {meeting.link && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleJoinMeeting(meeting)}
                            className="gap-2 bg-blue-600 hover:bg-blue-700"
                          >
                            <Video className="h-4 w-4" />
                            Join Online
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddToCalendar(meeting)}
                          className="gap-2"
                        >
                          <CalendarPlus className="h-4 w-4" />
                          Add to Calendar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedMeeting(meeting)
                            setIsDetailsDialogOpen(true)
                          }}
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Past Meetings */}
        {pastMeetings.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Past Meetings ({pastMeetings.length})</h2>
            <div className="grid gap-4">
              {pastMeetings.slice(0, 3).map((meeting) => (
                <Card key={meeting.id} className="opacity-75">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{meeting.title}</CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(meeting.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {meeting.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {meeting.attendees.length} attended
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Meeting Details Dialog */}
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          {selectedMeeting && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getMeetingTypeIcon(selectedMeeting.type)}
                  {selectedMeeting.title}
                </DialogTitle>
                <DialogDescription>Meeting details and information</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Date & Time</Label>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      {new Date(selectedMeeting.date).toLocaleDateString()} at {selectedMeeting.time}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Location</Label>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      {selectedMeeting.location}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Meeting Type</Label>
                  <Badge className={getMeetingTypeColor(selectedMeeting.type)}>{selectedMeeting.type}</Badge>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-gray-700">{selectedMeeting.description}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Expected Attendees</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedMeeting.attendees.map((attendee, index) => (
                      <Badge key={index} variant="outline">
                        {attendee.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedMeeting.link && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Online Meeting Link</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleJoinMeeting(selectedMeeting)}
                      className="gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Join Meeting
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                  Close
                </Button>
                {selectedMeeting.link && (
                  <Button onClick={() => handleJoinMeeting(selectedMeeting)} className="gap-2">
                    <Video className="h-4 w-4" />
                    Join Now
                  </Button>
                )}
              </div>
            </DialogContent>
          )}
        </Dialog>

        {/* Edit Meeting Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Prayer Meeting</DialogTitle>
              <DialogDescription>Update the details for this prayer meeting.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSaveEditedMeeting} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Meeting Title *</Label>
                <Input
                  id="edit-title"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  placeholder="Weekly Fellowship Prayer"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Date *</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={editFormData.date}
                    onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-time">Time *</Label>
                  <Input
                    id="edit-time"
                    type="time"
                    value={editFormData.time}
                    onChange={(e) => setEditFormData({ ...editFormData, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-location">Location *</Label>
                <Input
                  id="edit-location"
                  value={editFormData.location}
                  onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                  placeholder="Fellowship Hall or Online - Zoom"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-type">Meeting Type *</Label>
                <Select
                  value={editFormData.type}
                  onValueChange={(value) => setEditFormData({ ...editFormData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select meeting type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Fellowship Prayer">General Fellowship Prayer</SelectItem>
                    <SelectItem value="Ministry-specific Prayer">Ministry-specific Prayer</SelectItem>
                    <SelectItem value="Special Event Prayer">Special Event Prayer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-link">Online Meeting Link (Optional)</Label>
                <Input
                  id="edit-link"
                  type="url"
                  value={editFormData.link}
                  onChange={(e) => setEditFormData({ ...editFormData, link: e.target.value })}
                  placeholder="https://zoom.us/j/123456789"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description *</Label>
                <Textarea
                  id="edit-description"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  placeholder="Describe the purpose and focus of this prayer meeting..."
                  rows={3}
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Save Changes
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
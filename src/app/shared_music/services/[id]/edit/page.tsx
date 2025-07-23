"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Save,
  X,
  Users,
  Music,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Search,
  UserPlus,
  AlertTriangle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Song {
  id: number;
  title: string;
  artist: string;
  type: string;
  order: number;
}

// Mock data
const mockService = {
  id: 1,
  title: "Sunday Morning Worship",
  description: "Regular Sunday morning worship service with communion",
  date: "2024-12-15",
  time: "10:00",
  duration: 90,
  location: "Main Sanctuary",
  expectedAttendees: 150,
  notes: "Remember to prepare communion elements. Sound check at 9:30 AM.",
  songs: [
    { id: 1, title: "Amazing Grace", artist: "Traditional", type: "Opening", order: 1 },
    { id: 2, title: "How Great Thou Art", artist: "Carl Boberg", type: "Worship", order: 2 },
    { id: 3, title: "10,000 Reasons", artist: "Matt Redman", type: "Praise", order: 3 },
    { id: 4, title: "Holy, Holy, Holy", artist: "Reginald Heber", type: "Worship", order: 4 },
  ],
  team: [
    { id: 1, name: "Pastor John", role: "Lead Pastor", email: "john@church.com", avatar: "/placeholder-user.jpg" },
    { id: 2, name: "Sarah Wilson", role: "Worship Leader", email: "sarah@church.com", avatar: "/placeholder-user.jpg" },
    { id: 3, name: "Mike Chen", role: "Sound Tech", email: "mike@church.com", avatar: "/placeholder-user.jpg" },
  ],
}

const availableSongs = [
  { id: 5, title: "Blessed Be Your Name", artist: "Matt Redman" },
  { id: 6, title: "Cornerstone", artist: "Hillsong" },
  { id: 7, title: "Great Is Thy Faithfulness", artist: "Thomas Chisholm" },
  { id: 8, title: "In Christ Alone", artist: "Keith Getty" },
  { id: 9, title: "Mighty to Save", artist: "Hillsong" },
]

const availableTeam = [
  { id: 4, name: "David Chen", role: "Pianist", email: "david@church.com", avatar: "/placeholder-user.jpg" },
  { id: 5, name: "Lisa Park", role: "Vocalist", email: "lisa@church.com", avatar: "/placeholder-user.jpg" },
  { id: 6, name: "Tom Wilson", role: "Guitarist", email: "tom@church.com", avatar: "/placeholder-user.jpg" },
]

const songTypes = ["Opening", "Worship", "Praise", "Offering", "Communion", "Closing", "Special"]

export default function EditServicePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("details")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Service details state
  const [serviceData, setServiceData] = useState(mockService)
  const [songSearch, setSongSearch] = useState("")
  const [teamSearch, setTeamSearch] = useState("")
  const [showAddSongDialog, setShowAddSongDialog] = useState(false)
  const [showAddTeamDialog, setShowAddTeamDialog] = useState(false)

  const filteredAvailableSongs = availableSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(songSearch.toLowerCase()) ||
      song.artist.toLowerCase().includes(songSearch.toLowerCase()),
  )

  const filteredAvailableTeam = availableTeam.filter(
    (member) =>
      member.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
      member.role.toLowerCase().includes(teamSearch.toLowerCase()),
  )

  const handleServiceDataChange = (field: string, value: any) => {
    setServiceData((prev) => ({ ...prev, [field]: value }))
    setHasUnsavedChanges(true)
  }

  const handleAddSong = (song: (typeof availableSongs)[0], type = "Worship") => {
    const newSong = {
      ...song,
      type,
      order: serviceData.songs.length + 1,
    }
    setServiceData((prev) => ({
      ...prev,
      songs: [...prev.songs, newSong],
    }))
    setHasUnsavedChanges(true)
    setShowAddSongDialog(false)
    toast({
      title: "Song Added",
      description: `"${song.title}" has been added to the service.`,
    })
  }

  const handleRemoveSong = (songId: number) => {
    setServiceData((prev) => ({
      ...prev,
      songs: prev.songs
        .filter((s) => s.id !== songId)
        .map((song, index) => ({
          ...song,
          order: index + 1,
        })),
    }))
    setHasUnsavedChanges(true)
    toast({
      title: "Song Removed",
      description: "Song has been removed from the service.",
    })
  }

  const handleMoveSong = (songId: number, direction: "up" | "down") => {
    const songs = [...serviceData.songs]
    const currentIndex = songs.findIndex((s) => s.id === songId)


if (
  direction === "up" && currentIndex > 0 && songs[currentIndex] !== undefined && songs[currentIndex - 1] !== undefined) {
  const temp = songs[currentIndex] as Song;
  songs[currentIndex] = songs[currentIndex - 1] as Song;
  songs[currentIndex - 1] = temp;
} else if (direction === "down" && currentIndex < songs.length - 1 && songs[currentIndex] !== undefined && songs[currentIndex + 1] !== undefined
) {const temp = songs[currentIndex] as Song; songs[currentIndex] = songs[currentIndex + 1] as Song;
  songs[currentIndex + 1] = temp;
}


    // Update order numbers
    const reorderedSongs = songs.map((song, index) => ({ ...song, order: index + 1 }))

    setServiceData((prev) => ({ ...prev, songs: reorderedSongs }))
    setHasUnsavedChanges(true)
  }

  const handleSongTypeChange = (songId: number, newType: string) => {
    setServiceData((prev) => ({
      ...prev,
      songs: prev.songs.map((song) => (song.id === songId ? { ...song, type: newType } : song)),
    }))
    setHasUnsavedChanges(true)
  }

  const handleAddTeamMember = (member: (typeof availableTeam)[0]) => {
    setServiceData((prev) => ({
      ...prev,
      team: [...prev.team, member],
    }))
    setHasUnsavedChanges(true)
    setShowAddTeamDialog(false)
    toast({
      title: "Team Member Added",
      description: `${member.name} has been added to the service team.`,
    })
  }

  const handleRemoveTeamMember = (memberId: number) => {
    setServiceData((prev) => ({
      ...prev,
      team: prev.team.filter((m) => m.id !== memberId),
    }))
    setHasUnsavedChanges(true)
    toast({
      title: "Team Member Removed",
      description: "Team member has been removed from the service.",
    })
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setHasUnsavedChanges(false)
    setIsLoading(false)
    toast({
      title: "Service Updated",
      description: "Your changes have been saved successfully.",
    })
  }

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      // Show confirmation dialog
      return
    }
    router.push(`/shared_music/services/${params.id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-slide-in-left">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="hover-lift transition-all-smooth">
            <Link href={`/shared_music/services/${params.id}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit Service</h1>
            <p className="text-muted-foreground">Modify service details, songs, and team</p>
          </div>
        </div>
        <div className="flex gap-2">
          {hasUnsavedChanges && (
            <Badge variant="outline" className="animate-pulse-soft">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Unsaved Changes
            </Badge>
          )}
          <Button variant="outline" onClick={handleCancel} className="hover-lift transition-all-smooth bg-transparent">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasUnsavedChanges || isLoading}
            className="hover-lift transition-all-smooth"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-slide-in-up">
        <TabsList className="mb-6 transition-all-smooth">
          <TabsTrigger value="details" className="transition-all-smooth hover:scale-105 data-[state=active]:scale-105">
            Service Details
          </TabsTrigger>
          <TabsTrigger value="songs" className="transition-all-smooth hover:scale-105 data-[state=active]:scale-105">
            Songs ({serviceData.songs.length})
          </TabsTrigger>
          <TabsTrigger value="team" className="transition-all-smooth hover:scale-105 data-[state=active]:scale-105">
            Team ({serviceData.team.length})
          </TabsTrigger>
          <TabsTrigger value="settings" className="transition-all-smooth hover:scale-105 data-[state=active]:scale-105">
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Service Details Tab */}
        <TabsContent value="details" className="animate-fade-in-up">
          <Card className="hover:shadow-lg transition-all-smooth">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Edit the main details of your service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 animate-slide-in-left">
                  <Label htmlFor="title">Service Title</Label>
                  <Input
                    id="title"
                    value={serviceData.title}
                    onChange={(e) => handleServiceDataChange("title", e.target.value)}
                    className="transition-all-smooth focus:scale-[1.02]"
                  />
                </div>
                <div className="space-y-2 animate-slide-in-right">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={serviceData.location}
                    onChange={(e) => handleServiceDataChange("location", e.target.value)}
                    className="transition-all-smooth focus:scale-[1.02]"
                  />
                </div>
              </div>

              <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={serviceData.description}
                  onChange={(e) => handleServiceDataChange("description", e.target.value)}
                  className="transition-all-smooth focus:scale-[1.01]"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={serviceData.date}
                    onChange={(e) => handleServiceDataChange("date", e.target.value)}
                    className="transition-all-smooth focus:scale-[1.02]"
                  />
                </div>
                <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={serviceData.time}
                    onChange={(e) => handleServiceDataChange("time", e.target.value)}
                    className="transition-all-smooth focus:scale-[1.02]"
                  />
                </div>
                <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: "0.5s" }}>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={serviceData.duration}
                    onChange={(e) => handleServiceDataChange("duration", Number.parseInt(e.target.value))}
                    className="transition-all-smooth focus:scale-[1.02]"
                  />
                </div>
              </div>

              <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "0.6s" }}>
                <Label htmlFor="attendees">Expected Attendees</Label>
                <Input
                  id="attendees"
                  type="number"
                  value={serviceData.expectedAttendees}
                  onChange={(e) => handleServiceDataChange("expectedAttendees", Number.parseInt(e.target.value))}
                  className="transition-all-smooth focus:scale-[1.02]"
                />
              </div>

              <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.7s" }}>
                <Label htmlFor="notes">Service Notes</Label>
                <Textarea
                  id="notes"
                  value={serviceData.notes}
                  onChange={(e) => handleServiceDataChange("notes", e.target.value)}
                  placeholder="Add any special notes or reminders for this service..."
                  className="transition-all-smooth focus:scale-[1.01]"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Songs Tab */}
        <TabsContent value="songs" className="animate-fade-in-up">
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-all-smooth">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Service Songs</CardTitle>
                    <CardDescription>Manage the songs for this service</CardDescription>
                  </div>
                  <Dialog open={showAddSongDialog} onOpenChange={setShowAddSongDialog}>
                    <DialogTrigger asChild>
                      <Button className="hover-lift transition-all-smooth group">
                        <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        Add Song
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl animate-scale-in">
                      <DialogHeader>
                        <DialogTitle>Add Song to Service</DialogTitle>
                        <DialogDescription>Search and select a song to add to your service</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search songs..."
                            value={songSearch}
                            onChange={(e) => setSongSearch(e.target.value)}
                            className="pl-10 transition-all-smooth focus:scale-[1.02]"
                          />
                        </div>
                        <div className="max-h-96 overflow-y-auto space-y-2">
                          {filteredAvailableSongs.map((song, index) => (
                            <Card
                              key={song.id}
                              className="p-4 hover:shadow-md transition-all-smooth cursor-pointer hover-lift animate-fade-in-up"
                              style={{ animationDelay: `${index * 0.1}s` }}
                              onClick={() => handleAddSong(song)}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-medium">{song.title}</h4>
                                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                                </div>
                                <Button size="sm" className="hover-lift transition-all-smooth">
                                  Add
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceData.songs.map((song, index) => (
                    <Card
                      key={song.id}
                      className="p-4 hover:shadow-md transition-all-smooth animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleMoveSong(song.id, "up")}
                              disabled={index === 0}
                              className="h-6 w-6 hover-lift transition-all-smooth"
                            >
                              <ChevronUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleMoveSong(song.id, "down")}
                              disabled={index === serviceData.songs.length - 1}
                              className="h-6 w-6 hover-lift transition-all-smooth"
                            >
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                            {song.order}
                          </div>
                          <div>
                            <h4 className="font-medium">{song.title}</h4>
                            <p className="text-sm text-muted-foreground">{song.artist}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Select value={song.type} onValueChange={(value) => handleSongTypeChange(song.id, value)}>
                            <SelectTrigger className="w-32 transition-all-smooth hover:scale-105">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {songTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="hover-lift transition-all-smooth text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="animate-scale-in">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remove Song</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove "{song.title}" from this service?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleRemoveSong(song.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {serviceData.songs.length === 0 && (
                    <div className="text-center py-12 animate-fade-in">
                      <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-bounce-gentle" />
                      <h3 className="text-lg font-medium mb-2">No songs added yet</h3>
                      <p className="text-muted-foreground">Add songs to create your service playlist</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="animate-fade-in-up">
          <Card className="hover:shadow-lg transition-all-smooth">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Service Team</CardTitle>
                  <CardDescription>Manage the team members for this service</CardDescription>
                </div>
                <Dialog open={showAddTeamDialog} onOpenChange={setShowAddTeamDialog}>
                  <DialogTrigger asChild>
                    <Button className="hover-lift transition-all-smooth group">
                      <UserPlus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      Add Team Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl animate-scale-in">
                    <DialogHeader>
                      <DialogTitle>Add Team Member</DialogTitle>
                      <DialogDescription>Search and select a team member to add to this service</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search team members..."
                          value={teamSearch}
                          onChange={(e) => setTeamSearch(e.target.value)}
                          className="pl-10 transition-all-smooth focus:scale-[1.02]"
                        />
                      </div>
                      <div className="max-h-96 overflow-y-auto space-y-2">
                        {filteredAvailableTeam.map((member, index) => (
                          <Card
                            key={member.id}
                            className="p-4 hover:shadow-md transition-all-smooth cursor-pointer hover-lift animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => handleAddTeamMember(member)}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 transition-transform duration-300 hover:scale-110">
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                  <AvatarFallback>
                                    {member.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{member.name}</h4>
                                  <p className="text-sm text-muted-foreground">{member.role}</p>
                                </div>
                              </div>
                              <Button size="sm" className="hover-lift transition-all-smooth">
                                Add
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceData.team.map((member, index) => (
                  <Card
                    key={member.id}
                    className="p-4 hover:shadow-md transition-all-smooth animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 transition-transform duration-300 hover:scale-110">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover-lift transition-all-smooth text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="animate-scale-in">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove {member.name} from this service team?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRemoveTeamMember(member.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </Card>
                ))}
                {serviceData.team.length === 0 && (
                  <div className="text-center py-12 animate-fade-in">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-bounce-gentle" />
                    <h3 className="text-lg font-medium mb-2">No team members added yet</h3>
                    <p className="text-muted-foreground">Add team members to organize your service</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="animate-fade-in-up">
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-all-smooth">
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
                <CardDescription>Configure how the service will be presented</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 animate-slide-in-left">
                    <Label>Default Font Size</Label>
                    <Select defaultValue="large">
                      <SelectTrigger className="transition-all-smooth hover:scale-105">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="extra-large">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 animate-slide-in-right">
                    <Label>Theme</Label>
                    <Select defaultValue="dark">
                      <SelectTrigger className="transition-all-smooth hover:scale-105">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="sepia">Sepia</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all-smooth">
              <CardHeader>
                <CardTitle>Service Flow</CardTitle>
                <CardDescription>Configure timing and transitions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                    <Label>Auto-advance slides (seconds)</Label>
                    <Input
                      type="number"
                      defaultValue="0"
                      placeholder="0 = manual"
                      className="transition-all-smooth focus:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
                    <Label>Transition Duration (ms)</Label>
                    <Input type="number" defaultValue="300" className="transition-all-smooth focus:scale-[1.02]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all-smooth">
              <CardHeader>
                <CardTitle>Advanced Options</CardTitle>
                <CardDescription>Additional service configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: "0.4s" }}>
                    <div>
                      <Label className="text-base">Enable Recording</Label>
                      <p className="text-sm text-muted-foreground">Record this service for later viewing</p>
                    </div>
                    <input type="checkbox" className="toggle" />
                  </div>
                  <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <div>
                      <Label className="text-base">Live Streaming</Label>
                      <p className="text-sm text-muted-foreground">Stream this service live online</p>
                    </div>
                    <input type="checkbox" className="toggle" />
                  </div>
                  <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: "0.6s" }}>
                    <div>
                      <Label className="text-base">Show Song Credits</Label>
                      <p className="text-sm text-muted-foreground">Display artist and copyright information</p>
                    </div>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

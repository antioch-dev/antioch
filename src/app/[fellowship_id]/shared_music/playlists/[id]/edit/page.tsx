"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { ArrowLeft, Save, Eye, Music, Users, Plus, X, GripVertical } from "lucide-react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"

// Mock playlist data
const initialPlaylistData = {
  id: 1,
  title: "Sunday Morning Worship",
  description:
    "Our regular Sunday morning service playlist with a mix of traditional hymns and contemporary worship songs",
  category: "Service",
  isPublic: true,
  songs: [
    { id: 1, title: "Amazing Grace", artist: "Traditional", duration: "4:32", key: "G", tempo: "Slow" },
    { id: 2, title: "How Great Thou Art", artist: "Carl Boberg", duration: "3:45", key: "C", tempo: "Medium" },
    { id: 3, title: "10,000 Reasons", artist: "Matt Redman", duration: "4:03", key: "G", tempo: "Medium" },
  ],
}

export default function EditPlaylistPage() {
  const params = useParams<{ id?: string }>()
  const router = useRouter()
  const [playlistData, setPlaylistData] = useState(initialPlaylistData)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    router.push(`/fellowship1/shared_music/playlists/${params.id}`)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setPlaylistData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const removeSong = (songId: number) => {
    setPlaylistData((prev) => ({
      ...prev,
      songs: prev.songs.filter((song) => song.id !== songId),
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild className="hover-lift transition-all-smooth">
          <Link href={`/fellowship1/shared_music/playlists/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Edit Playlist</h1>
          <p className="text-muted-foreground">Update playlist information and manage songs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild className="hover-lift transition-all-smooth bg-transparent">
            <Link href={`shared_music/playlists/${params.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Link>
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="hover-scale transition-all-smooth">
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="hover-lift transition-all-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                Playlist Information
              </CardTitle>
              <CardDescription>{`Update the playlist's basic details`}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Playlist Title</Label>
                <Input
                  id="title"
                  value={playlistData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="transition-all-smooth focus:ring-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={playlistData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="transition-all-smooth focus:ring-2"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={playlistData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="transition-all-smooth">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Service">Service</SelectItem>
                    <SelectItem value="Worship">Worship</SelectItem>
                    <SelectItem value="Youth">Youth</SelectItem>
                    <SelectItem value="Special Event">Special Event</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="public"
                  checked={playlistData.isPublic}
                  onCheckedChange={(checked) => handleInputChange("isPublic", checked)}
                />
                <Label htmlFor="public">Make this playlist public</Label>
              </div>
            </CardContent>
          </Card>

          {/* Songs List */}
          <Card className="hover-lift transition-all-smooth">
            <CardHeader>
              <CardTitle>Songs ({playlistData.songs.length})</CardTitle>
              <CardDescription>Manage the songs in this playlist</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {playlistData.songs.map((song, index) => (
                  <div
                    key={song.id}
                    className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 group transition-all-smooth"
                  >
                    <Button variant="ghost" size="icon" className="h-6 w-6 cursor-grab hover:cursor-grabbing">
                      <GripVertical className="h-4 w-4" />
                    </Button>

                    <div className="w-8 text-center">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{song.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                      <Badge variant="outline" className="text-xs hover-scale transition-all-smooth">
                        Key: {song.key}
                      </Badge>
                      <Badge variant="outline" className="text-xs hover-scale transition-all-smooth">
                        {song.tempo}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{song.duration}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSong(song.id)}
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:text-destructive transition-all-smooth"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <Button variant="outline" className="w-full hover-lift transition-all-smooth bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add Songs
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Playlist Stats */}
          <Card className="hover-lift transition-all-smooth">
            <CardHeader>
              <CardTitle>Playlist Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Songs:</span>
                <span>{playlistData.songs.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Duration:</span>
                <span>32 minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Category:</span>
                <Badge variant="outline" className="hover-scale transition-all-smooth">
                  {playlistData.category}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Visibility:</span>
                <Badge variant="outline" className="hover-scale transition-all-smooth">
                  <Users className="h-3 w-3 mr-1" />
                  {playlistData.isPublic ? "Public" : "Private"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="hover-lift transition-all-smooth">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full hover-lift transition-all-smooth bg-transparent" asChild>
                <Link href={`/fellowship1/shared_music/playlists/${params.id}/present`}>
                  <Eye className="h-4 w-4 mr-2" />
                  Start Presentation
                </Link>
              </Button>
              <Button variant="outline" className="w-full hover-lift transition-all-smooth bg-transparent">
                <Music className="h-4 w-4 mr-2" />
                Duplicate Playlist
              </Button>
              <Button variant="outline" className="w-full hover-lift transition-all-smooth bg-transparent">
                <Users className="h-4 w-4 mr-2" />
                Share Playlist
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

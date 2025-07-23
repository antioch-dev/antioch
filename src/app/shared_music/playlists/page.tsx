"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { Search, Plus, Heart, Music, Users, Calendar, Play } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock playlists data
const playlists = [
  {
    id: 1,
    title: "Sunday Morning Worship",
    description: "Our regular Sunday morning service playlist",
    creator: "Pastor John",
    creatorAvatar: "/placeholder-user.jpg",
    songCount: 8,
    duration: "32 minutes",
    isPublic: true,
    category: "Service",
    lastUpdated: "2024-12-10",
    plays: 45,
    songs: ["Amazing Grace", "How Great Thou Art", "10,000 Reasons"],
    isFavorited: false,
  },
  {
    id: 2,
    title: "Christmas Celebration",
    description: "Special Christmas service songs",
    creator: "Music Team",
    creatorAvatar: "/placeholder-user.jpg",
    songCount: 12,
    duration: "48 minutes",
    isPublic: true,
    category: "Holiday",
    lastUpdated: "2024-12-08",
    plays: 23,
    songs: ["Silent Night", "O Holy Night", "Joy to the World"],
    isFavorited: true,
  },
  {
    id: 3,
    title: "Youth Service Favorites",
    description: "Contemporary songs for youth gatherings",
    creator: "Sarah Wilson",
    creatorAvatar: "/placeholder-user.jpg",
    songCount: 15,
    duration: "58 minutes",
    isPublic: true,
    category: "Youth",
    lastUpdated: "2024-12-05",
    plays: 67,
    songs: ["Cornerstone", "Blessed Be Your Name", "10,000 Reasons"],
    isFavorited: false,
  },
  {
    id: 4,
    title: "Traditional Hymns",
    description: "Classic hymns for traditional services",
    creator: "Elder Mary",
    creatorAvatar: "/placeholder-user.jpg",
    songCount: 20,
    duration: "75 minutes",
    isPublic: true,
    category: "Traditional",
    lastUpdated: "2024-12-03",
    plays: 34,
    songs: ["Amazing Grace", "Holy, Holy, Holy", "Great Is Thy Faithfulness"],
    isFavorited: true,
  },
  {
    id: 5,
    title: "Evening Prayer",
    description: "Peaceful songs for evening services",
    creator: "David Chen",
    creatorAvatar: "/placeholder-user.jpg",
    songCount: 6,
    duration: "24 minutes",
    isPublic: false,
    category: "Prayer",
    lastUpdated: "2024-12-01",
    plays: 12,
    songs: ["Be Thou My Vision", "Amazing Grace", "How Great Thou Art"],
    isFavorited: false,
  },
  {
    id: 6,
    title: "Baptism Service",
    description: "Songs for baptism ceremonies",
    creator: "Pastor John",
    creatorAvatar: "/placeholder-user.jpg",
    songCount: 5,
    duration: "20 minutes",
    isPublic: true,
    category: "Ceremony",
    lastUpdated: "2024-11-28",
    plays: 8,
    songs: ["Amazing Grace", "I Have Decided", "Just As I Am"],
    isFavorited: false,
  },
]

export default function PlaylistsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  type PlaylistState = { isFavorited: boolean }
  const [playlistStates, setPlaylistStates] = useState<Record<number, PlaylistState>>(
    playlists.reduce(
      (acc, playlist) => ({
        ...acc,
        [playlist.id]: { isFavorited: playlist.isFavorited },
      }),
      {} as Record<number, PlaylistState>,
    ),
  )
  const { toast } = useToast()

  const filteredPlaylists = playlists.filter(
    (playlist) =>
      playlist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      playlist.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      playlist.creator.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleFavoriteToggle = (playlistId: number, playlistTitle: string) => {
    setPlaylistStates((prev) => ({
      ...prev,
      [playlistId]: {
        ...prev[playlistId],
        isFavorited: !prev[playlistId]?.isFavorited,
      },
    }))

    const isFavorited = !playlistStates[playlistId]?.isFavorited
    toast({
      title: isFavorited ? "Added to Favorites" : "Removed from Favorites",
      description: `"${playlistTitle}" has been ${isFavorited ? "added to" : "removed from"} your favorites.`,
    })
  }

  const handleScheduleService = (playlistId: number, playlistTitle: string) => {
    toast({
      title: "Service Scheduled",
      description: `A new service has been scheduled with "${playlistTitle}" playlist.`,
    })
  }

  const handleShare = async (playlist: (typeof playlists)[0]) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: playlist.title,
          text: playlist.description,
          url: `${window.location.origin}/shared_music/playlists/${playlist.id}`,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${window.location.origin}/shared_music/playlists/${playlist.id}`)
      toast({
        title: "Link Copied",
        description: "Playlist link has been copied to clipboard.",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-slide-in-left">
        <div>
          <h1 className="text-3xl font-bold mb-2">Playlists</h1>
          <p className="text-muted-foreground">Organize and share your worship song collections</p>
        </div>
        <Button asChild className="hover-lift transition-all-smooth group">
          <Link href="/shared_music/playlists/create">
            <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
            Create Playlist
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-8 animate-slide-in-right">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors duration-300" />
        <Input
          placeholder="Search playlists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 transition-all-smooth focus:scale-[1.02] focus:shadow-lg"
        />
      </div>

      {/* Playlists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaylists.map((playlist, index) => (
          <Card
            key={playlist.id}
            className="hover:shadow-lg transition-all-smooth hover-lift group animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">
                    <Link
                      href={`/shared_music/playlists/${playlist.id}`}
                      className="hover:underline transition-all-smooth hover:text-primary"
                    >
                      {playlist.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="mt-1">{playlist.description}</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleFavoriteToggle(playlist.id, playlist.title)}
                  className="hover-lift transition-all-smooth group/heart"
                >
                  <Heart
                    className={`h-4 w-4 transition-all duration-300 group-hover/heart:scale-110 ${
                      playlistStates[playlist.id]?.isFavorited
                        ? "fill-red-500 text-red-500"
                        : "group-hover/heart:text-red-500"
                    }`}
                  />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className="flex items-center gap-2 mb-4 animate-slide-in-left"
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <Avatar className="h-6 w-6 transition-transform duration-300 hover:scale-110">
                  <AvatarImage src={playlist.creatorAvatar || "/placeholder.svg"} alt={playlist.creator} />
                  <AvatarFallback>
                    {playlist.creator
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{playlist.creator}</span>
              </div>

              <div
                className="flex flex-wrap gap-2 mb-4 animate-slide-in-right"
                style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
              >
                <Badge variant="secondary" className="transition-all-smooth hover:scale-105">
                  {playlist.category}
                </Badge>
                {playlist.isPublic ? (
                  <Badge variant="outline" className="transition-all-smooth hover:scale-105">
                    <Users className="h-3 w-3 mr-1" />
                    Public
                  </Badge>
                ) : (
                  <Badge variant="outline" className="transition-all-smooth hover:scale-105">
                    Private
                  </Badge>
                )}
              </div>

              <div
                className="space-y-2 text-sm text-muted-foreground mb-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
              >
                <div className="flex justify-between">
                  <span>{playlist.songCount} songs</span>
                  <span>{playlist.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>{playlist.plays} plays</span>
                  <span>Updated {new Date(playlist.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Preview songs */}
              <div className="mb-4 animate-slide-in-up" style={{ animationDelay: `${index * 0.1 + 0.5}s` }}>
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <div className="space-y-1">
                  {playlist.songs.slice(0, 3).map((song, songIndex) => (
                    <div
                      key={songIndex}
                      className="text-xs text-muted-foreground flex items-center gap-1 animate-slide-in-left"
                      style={{ animationDelay: `${index * 0.1 + 0.6 + songIndex * 0.1}s` }}
                    >
                      <Music className="h-3 w-3 transition-transform duration-300 hover:scale-110" />
                      {song}
                    </div>
                  ))}
                  {playlist.songs.length > 3 && (
                    <div
                      className="text-xs text-muted-foreground animate-fade-in"
                      style={{ animationDelay: `${index * 0.1 + 0.9}s` }}
                    >
                      +{playlist.songs.length - 3} more songs
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 animate-slide-in-up" style={{ animationDelay: `${index * 0.1 + 0.7}s` }}>
                <Button asChild size="sm" className="flex-1 hover-lift transition-all-smooth group/play">
                  <Link href={`/shared_music/playlists/${playlist.id}`}>
                    <Play className="h-4 w-4 mr-2 group-hover/play:scale-110 transition-transform duration-300" />
                    View Playlist
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleScheduleService(playlist.id, playlist.title)}
                  className="hover-lift transition-all-smooth group/calendar"
                >
                  <Calendar className="h-4 w-4 group-hover/calendar:scale-110 group-hover/calendar:rotate-12 transition-all duration-300" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlaylists.length === 0 && (
        <div className="text-center py-12 animate-fade-in">
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-bounce-gentle" />
          <h3 className="text-lg font-medium mb-2">No playlists found</h3>
          <p className="text-muted-foreground">Try adjusting your search or create a new playlist</p>
        </div>
      )}
    </div>
  )
}

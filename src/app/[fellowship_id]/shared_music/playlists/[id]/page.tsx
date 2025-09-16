"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { ArrowLeft, Heart, Share2, MoreHorizontal, Play, Edit, Copy, Calendar, Users, Eye } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

// Mock playlist data
const playlistData = {
  id: 1,
  title: "Sunday Morning Worship",
  description:
    "Our regular Sunday morning service playlist with a mix of traditional hymns and contemporary worship songs",
  creator: "Pastor John",
  creatorAvatar: "/placeholder-user.jpg",
  createdDate: "2024-01-15",
  lastUpdated: "2024-12-10",
  isPublic: true,
  category: "Service",
  plays: 45,
  followers: 23,
  songs: [
    {
      id: 1,
      title: "Amazing Grace",
      artist: "Traditional",
      duration: "4:32",
      key: "G",
      tempo: "Slow",
      addedDate: "2024-01-15",
    },
    {
      id: 2,
      title: "How Great Thou Art",
      artist: "Carl Boberg",
      duration: "3:45",
      key: "C",
      tempo: "Medium",
      addedDate: "2024-01-20",
    },
    {
      id: 3,
      title: "10,000 Reasons",
      artist: "Matt Redman",
      duration: "4:03",
      key: "G",
      tempo: "Medium",
      addedDate: "2024-02-01",
    },
    {
      id: 4,
      title: "Blessed Be Your Name",
      artist: "Matt Redman",
      duration: "4:12",
      key: "D",
      tempo: "Medium",
      addedDate: "2024-02-05",
    },
    {
      id: 5,
      title: "Holy, Holy, Holy",
      artist: "Reginald Heber",
      duration: "3:28",
      key: "F",
      tempo: "Slow",
      addedDate: "2024-02-10",
    },
    {
      id: 6,
      title: "Cornerstone",
      artist: "Hillsong",
      duration: "5:02",
      key: "E",
      tempo: "Medium",
      addedDate: "2024-02-15",
    },
    {
      id: 7,
      title: "Great Is Thy Faithfulness",
      artist: "Thomas Chisholm",
      duration: "4:15",
      key: "Bb",
      tempo: "Slow",
      addedDate: "2024-02-20",
    },
    {
      id: 8,
      title: "Be Thou My Vision",
      artist: "Traditional Irish",
      duration: "3:52",
      key: "D",
      tempo: "Slow",
      addedDate: "2024-02-25",
    },
  ],
}

export default function PlaylistDetailPage() {
  const params = useParams<{ id: string }>()
  const [isFollowing, setIsFollowing] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: playlistData.title,
          text: `Check out this playlist: ${playlistData.title}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          console.log("Link copied to clipboard")
        })
        .catch((error) => {
          console.error("Failed to copy link:", error)
        })
    }
  }

  const handleDuplicate = () => {
    console.log("Duplicating playlist...")

    router.push(`/fellowship1/shared_music/playlists/create?duplicate=${params.id}`)
  }

  const handleScheduleService = () => {
    console.log("Scheduling service...")

    router.push(`/fellowship1/shared_music/services/create?playlist=${params.id}`)
  }

  const handleViewAnalytics = () => {
    console.log("Viewing analytics...")

    router.push(`/fellowship1/shared_music/playlists/${params.id}/analytics`)
  }

  const handleAddToFavorites = (songId: number) => {
    console.log(`Adding song ${songId} to favorites`)
  }

  const handleRemoveFromPlaylist = (songId: number) => {
    console.log(`Removing song ${songId} from playlist`)
  }

  const router = useRouter()

  const startPlaylistPresentation = () => {
    router.push(`/fellowship1/shared_music/playlists/${params.id}/present`)
  }
  const totalDuration = playlistData.songs.reduce((total, song) => {
    const parts = song.duration.split(":")

    const minutes = Number(parts[0]) || 0
    const seconds = Number(parts[1]) || 0

    return total + minutes * 60 + seconds
  }, 0)

  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins} minutes`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild className="hover-lift transition-all-smooth">
          <Link href="/fellowship1/shared_music/playlists">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Playlist Info */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <div className="lg:col-span-1">
          <Card className="hover-lift transition-all-smooth">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={playlistData.creatorAvatar || "/placeholder.svg"} alt={playlistData.creator} />
                  <AvatarFallback>
                    {playlistData.creator
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{playlistData.creator}</p>
                  <p className="text-sm text-muted-foreground">Creator</p>
                </div>
              </div>

              <CardTitle className="text-2xl mb-2">{playlistData.title}</CardTitle>
              <CardDescription className="mb-4">{playlistData.description}</CardDescription>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="hover-scale transition-all-smooth">
                  {playlistData.category}
                </Badge>
                {playlistData.isPublic ? (
                  <Badge variant="outline" className="hover-scale transition-all-smooth">
                    <Users className="h-3 w-3 mr-1" />
                    Public
                  </Badge>
                ) : (
                  <Badge variant="outline" className="hover-scale transition-all-smooth">
                    Private
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Songs:</span>
                  <span>{playlistData.songs.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{formatTotalDuration(totalDuration)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Plays:</span>
                  <span>{playlistData.plays}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Followers:</span>
                  <span>{playlistData.followers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Updated:</span>
                  <span>{new Date(playlistData.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Button className="w-full hover-scale transition-all-smooth" onClick={startPlaylistPresentation}>
                  <Play className="h-4 w-4 mr-2" />
                  Start Presentation
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent hover-lift transition-all-smooth"
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isFollowing ? "fill-current" : ""}`} />
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover-scale transition-all-smooth bg-transparent"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover-scale transition-all-smooth bg-transparent"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/fellowship1/shared_music/playlists/${params.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Playlist
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleDuplicate}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleScheduleService}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Service
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleViewAnalytics}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Analytics
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Songs List */}
        <div className="lg:col-span-3">
          <Card className="hover-lift transition-all-smooth">
            <CardHeader>
              <CardTitle>Songs</CardTitle>
              <CardDescription>
                {playlistData.songs.length} songs • {formatTotalDuration(totalDuration)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {playlistData.songs.map((song, index) => (
                  <div
                    key={song.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 group transition-all-smooth"
                  >
                    <div className="w-8 text-center">
                      <span className="text-sm text-muted-foreground group-hover:hidden">{index + 1}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hidden group-hover:flex hover-scale transition-all-smooth"
                      >
                        <Play className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/fellowship1/shared_music/songs/${song.id}`}
                        className="font-medium hover:underline block truncate transition-all-smooth"
                      >
                        {song.title}
                      </Link>
                      <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                    </div>

                    <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
                      <Badge variant="outline" className="text-xs hover-scale transition-all-smooth">
                        Key: {song.key}
                      </Badge>
                      <Badge variant="outline" className="text-xs hover-scale transition-all-smooth">
                        {song.tempo}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{song.duration}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 hover-scale transition-all-smooth"
                          >
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/fellowship1/shared_music/songs/${song.id}`}>
                              <Play className="h-4 w-4 mr-2" />
                              View Song
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAddToFavorites(song.id)}>
                            <Heart className="h-4 w-4 mr-2" />
                            Add to Favorites
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleRemoveFromPlaylist(song.id)}
                          >
                            Remove from Playlist
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

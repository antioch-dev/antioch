'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import Link from 'next/link'
import { ArrowLeft, Plus, X, Search, Music } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface AvailableSong {
  id: number
  title: string
  artist: string
  duration: string
}

const availableSongs: AvailableSong[] = [
  { id: 1, title: 'Amazing Grace', artist: 'Traditional', duration: '4:32' },
  { id: 2, title: 'How Great Thou Art', artist: 'Carl Boberg', duration: '3:45' },
  { id: 3, title: 'Blessed Be Your Name', artist: 'Matt Redman', duration: '4:12' },
  { id: 4, title: 'Holy, Holy, Holy', artist: 'Reginald Heber', duration: '3:28' },
  { id: 5, title: '10,000 Reasons', artist: 'Matt Redman', duration: '4:03' },
  { id: 6, title: 'Great Is Thy Faithfulness', artist: 'Thomas Chisholm', duration: '4:15' },
  { id: 7, title: 'Cornerstone', artist: 'Hillsong', duration: '5:02' },
  { id: 8, title: 'Be Thou My Vision', artist: 'Traditional Irish', duration: '3:52' },
]

export default function CreatePlaylistPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [selectedSongs, setSelectedSongs] = useState<AvailableSong[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const filteredSongs = availableSongs
    .filter(
      (song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((song) => !selectedSongs.find((s) => s.id === song.id))

  const addSong = (song: AvailableSong) => {
    setSelectedSongs([...selectedSongs, song])
  }

  const removeSong = (songId: number) => {
    setSelectedSongs(selectedSongs.filter((song) => song.id !== songId))
  }

  // const moveSong = (fromIndex: number, toIndex: number) => {
  //   const newSongs = [...selectedSongs]
  //   const [movedSong] = newSongs.splice(fromIndex, 1)
  //   if (movedSong !== undefined) {
  //     newSongs.splice(toIndex, 0, movedSong)
  //   }
  //   setSelectedSongs(newSongs)
  // }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const totalDuration = selectedSongs.reduce((acc, song) => {
    const parts = song.duration.split(':')
    const mins = Number(parts[0]) || 0
    const secs = Number(parts[1]) || 0
    return acc + (mins * 60 + secs)
  }, 0)

  const handleSubmit = async () => {
    if (!title || selectedSongs.length === 0) {
      console.log('Please fill in required fields')
      return
    }

    console.log('Creating playlist...', {
      title,
      description,
      category,
      isPublic,
      songs: selectedSongs,
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    router.push('/shared_music/playlists/1')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/shared_music/playlists">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create New Playlist</h1>
          <p className="text-muted-foreground">Organize songs for your worship service</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Playlist Details</CardTitle>
              <CardDescription>Basic information about your playlist</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter playlist title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your playlist..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="youth">Youth</SelectItem>
                    <SelectItem value="traditional">Traditional</SelectItem>
                    <SelectItem value="contemporary">Contemporary</SelectItem>
                    <SelectItem value="holiday">Holiday</SelectItem>
                    <SelectItem value="prayer">Prayer</SelectItem>
                    <SelectItem value="ceremony">Ceremony</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
                <Label htmlFor="public">Make playlist public</Label>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Selected Songs ({selectedSongs.length})</CardTitle>
              <CardDescription>Total duration: {formatDuration(totalDuration)}</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedSongs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Music className="h-8 w-8 mx-auto mb-2" />
                  <p>No songs selected yet</p>
                  <p className="text-sm">Add songs from the library on the right</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedSongs.map((song, index) => (
                    <div key={song.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-6">{index + 1}</span>
                        <div>
                          <p className="font-medium">{song.title}</p>
                          <p className="text-sm text-muted-foreground">{song.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{song.duration}</span>
                        <Button variant="ghost" size="icon" onClick={() => removeSong(song.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add Songs</CardTitle>
              <CardDescription>Search and add songs to your playlist</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search songs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredSongs.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{song.title}</p>
                      <p className="text-sm text-muted-foreground">{song.artist}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{song.duration}</span>
                      <Button variant="outline" size="icon" onClick={() => addSong(song)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredSongs.length === 0 && searchTerm && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>{`No songs found matching "${searchTerm}"`}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline" asChild>
          <Link href="/shared_music/playlists">Cancel</Link>
        </Button>
        <Button disabled={!title || selectedSongs.length === 0} onClick={handleSubmit}>
          Create Playlist
        </Button>
      </div>
    </div>
  )
}

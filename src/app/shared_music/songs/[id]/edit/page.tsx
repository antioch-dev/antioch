'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Music, Tag, Clock, Key, Youtube } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

// Mock song data with YouTube
const initialSongData = {
  id: 1,
  title: 'Amazing Grace',
  artist: 'Traditional',
  category: 'Hymn',
  key: 'G',
  tempo: 'Slow',
  duration: '4:32',
  youtubeUrl: 'https://www.youtube.com/watch?v=CDdvReNKKuk',
  tags: ['Classic', 'Traditional', 'Grace'],
  lyrics: `Amazing grace! How sweet the sound
That saved a wretch like me!
I once was lost, but now am found;
Was blind, but now I see.

'Twas grace that taught my heart to fear,
And grace my fears relieved;
How precious did that grace appear
The hour I first believed.

Through many dangers, toils, and snares,
I have already come;
'Tis grace hath brought me safe thus far,
And grace will lead me home.

The Lord has promised good to me,
His Word my hope secures;
He will my Shield and Portion be,
As long as life endures.

Yea, when this flesh and heart shall fail,
And mortal life shall cease,
I shall possess, within the veil,
A life of joy and peace.

When we've been there ten thousand years,
Bright shining as the sun,
We've no less days to sing God's praise
Than when we'd first begun.`,
}

export default function EditSongPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [songData, setSongData] = useState(initialSongData)
  const [newTag, setNewTag] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const extractYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    const match = regex.exec(url)
    return match ? match[1] : null
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    router.push(`/shared_music/songs/${params.id}`)
  }

  const addTag = () => {
    if (newTag.trim() && !songData.tags.includes(newTag.trim())) {
      setSongData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setSongData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleInputChange = (field: string, value: string) => {
    setSongData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild className="hover-lift transition-all-smooth">
          <Link href={`/shared_music/songs/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Edit Song</h1>
          <p className="text-muted-foreground">Update song information and lyrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild className="hover-lift transition-all-smooth bg-transparent">
            <Link href={`/shared_music/songs/${params.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Link>
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="hover-scale transition-all-smooth">
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
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
                Basic Information
              </CardTitle>
              <CardDescription>{`Update the song's basic details`}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Song Title</Label>
                  <Input
                    id="title"
                    value={songData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="transition-all-smooth focus:ring-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artist">Artist</Label>
                  <Input
                    id="artist"
                    value={songData.artist}
                    onChange={(e) => handleInputChange('artist', e.target.value)}
                    className="transition-all-smooth focus:ring-2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube-url" className="flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-red-500" />
                  YouTube URL
                </Label>
                <Input
                  id="youtube-url"
                  value={songData.youtubeUrl}
                  onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="transition-all-smooth focus:ring-2"
                />
                {songData.youtubeUrl && extractYouTubeId(songData.youtubeUrl) && (
                  <p className="text-xs text-green-600">✓ Valid YouTube URL detected</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={songData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="transition-all-smooth">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hymn">Hymn</SelectItem>
                      <SelectItem value="Contemporary">Contemporary</SelectItem>
                      <SelectItem value="Gospel">Gospel</SelectItem>
                      <SelectItem value="Praise">Praise</SelectItem>
                      <SelectItem value="Worship">Worship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="key">Key</Label>
                  <Select value={songData.key} onValueChange={(value) => handleInputChange('key', value)}>
                    <SelectTrigger className="transition-all-smooth">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="C#">C#</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="D#">D#</SelectItem>
                      <SelectItem value="E">E</SelectItem>
                      <SelectItem value="F">F</SelectItem>
                      <SelectItem value="F#">F#</SelectItem>
                      <SelectItem value="G">G</SelectItem>
                      <SelectItem value="G#">G#</SelectItem>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="A#">A#</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="Bb">Bb</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tempo">Tempo</Label>
                  <Select value={songData.tempo} onValueChange={(value) => handleInputChange('tempo', value)}>
                    <SelectTrigger className="transition-all-smooth">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Slow">Slow</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Fast">Fast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lyrics */}
          <Card className="hover-lift transition-all-smooth">
            <CardHeader>
              <CardTitle>Lyrics</CardTitle>
              <CardDescription>Enter the complete song lyrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={songData.lyrics}
                onChange={(e) => handleInputChange('lyrics', e.target.value)}
                placeholder="Enter song lyrics here..."
                className="min-h-[400px] font-mono transition-all-smooth focus:ring-2"
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* YouTube Preview */}
          {songData.youtubeUrl && extractYouTubeId(songData.youtubeUrl) && (
            <Card className="hover-lift transition-all-smooth">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Youtube className="h-5 w-5 text-red-500" />
                  YouTube Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${extractYouTubeId(songData.youtubeUrl)}?rel=0`}
                    title={songData.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          <Card className="hover-lift transition-all-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Tags
              </CardTitle>
              <CardDescription>Add tags to help categorize this song</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag..."
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  className="transition-all-smooth focus:ring-2"
                />
                <Button onClick={addTag} size="sm" className="hover-scale transition-all-smooth">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {songData.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover-scale transition-all-smooth"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Song Info */}
          <Card className="hover-lift transition-all-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Song Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Duration:</span>
                <Input
                  value={songData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-20 text-sm transition-all-smooth focus:ring-2"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Category:</span>
                <Badge variant="outline" className="hover-scale transition-all-smooth">
                  {songData.category}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Key:</span>
                <Badge variant="outline" className="hover-scale transition-all-smooth">
                  <Key className="h-3 w-3 mr-1" />
                  {songData.key}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tempo:</span>
                <Badge variant="outline" className="hover-scale transition-all-smooth">
                  {songData.tempo}
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
                <Link href={`/shared_music/songs/${params.id}/present`}>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Presentation
                </Link>
              </Button>
              <Button variant="outline" className="w-full hover-lift transition-all-smooth bg-transparent">
                <Music className="h-4 w-4 mr-2" />
                Add to Playlist
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

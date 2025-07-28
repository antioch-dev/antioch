'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Youtube } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AddSongPage() {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [category, setCategory] = useState('')
  const [key, setKey] = useState('')
  const [tempo, setTempo] = useState('')
  const [lyrics, setLyrics] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')

  const router = useRouter()

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const extractYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    const match = regex.exec(url)
    return match ? match[1] : null
  }

  const handleSubmit = async () => {
    if (!title || !lyrics) {
      console.log('Please fill in required fields')
      return
    }

    const youtubeId = youtubeUrl ? extractYouTubeId(youtubeUrl) : null

    console.log('Adding song...', {
      title,
      artist,
      category,
      key,
      tempo,
      lyrics,
      youtubeUrl,
      youtubeId,
      tags,
    })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Navigate to the new song
    router.push('/fellowships/fellowship1/shared_music/songs/1') // In real app, use the actual created song ID
  }

  const handlePreview = () => {
    console.log('Opening preview...')
    // Could open a modal or navigate to preview page
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/fellowships/fellowship1/shared_music/songs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add New Song</h1>
          <p className="text-muted-foreground">Add a new song to the library</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Song Details Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Song Information</CardTitle>
              <CardDescription>Basic details about the song</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter song title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="artist">Artist/Composer</Label>
                <Input
                  id="artist"
                  placeholder="Enter artist or composer name..."
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="youtube-url" className="flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-red-500" />
                  YouTube URL
                </Label>
                <Input
                  id="youtube-url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                />
                {youtubeUrl && extractYouTubeId(youtubeUrl) && (
                  <p className="text-xs text-green-600 mt-1">✓ Valid YouTube URL detected</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hymn">Hymn</SelectItem>
                      <SelectItem value="contemporary">Contemporary</SelectItem>
                      <SelectItem value="worship">Worship</SelectItem>
                      <SelectItem value="praise">Praise</SelectItem>
                      <SelectItem value="gospel">Gospel</SelectItem>
                      <SelectItem value="traditional">Traditional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="key">Key</Label>
                  <Select value={key} onValueChange={setKey}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select key" />
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
              </div>

              <div>
                <Label htmlFor="tempo">Tempo</Label>
                <Select value={tempo} onValueChange={setTempo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slow">Slow</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="fast">Fast</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tags */}
              <div>
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    id="tags"
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button type="button" onClick={addTag}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lyrics *</CardTitle>
              <CardDescription>Enter the complete song lyrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter song lyrics here...

Verse 1:
Amazing grace! How sweet the sound
That saved a wretch like me!

Chorus:
..."
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                className="min-h-96 font-mono"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Separate verses, choruses, and bridges with blank lines
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>How your song will appear</CardDescription>
            </CardHeader>
            <CardContent>
              {title ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">{title}</h3>
                    {artist && <p className="text-muted-foreground">{artist}</p>}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category && <Badge variant="secondary">{category}</Badge>}
                    {key && <Badge variant="outline">Key: {key}</Badge>}
                    {tempo && <Badge variant="outline">{tempo}</Badge>}
                    {tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {youtubeUrl && extractYouTubeId(youtubeUrl) && (
                    <div className="border rounded-lg p-4 bg-muted/50">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Youtube className="h-4 w-4 text-red-500" />
                        YouTube Preview:
                      </h4>
                      <div className="aspect-video bg-black rounded">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${extractYouTubeId(youtubeUrl)}?rel=0`}
                          title={title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded"
                        />
                      </div>
                    </div>
                  )}

                  {lyrics && (
                    <div className="border rounded-lg p-4 bg-muted/50">
                      <h4 className="font-medium mb-2">Lyrics Preview:</h4>
                      <div className="whitespace-pre-line text-sm max-h-64 overflow-y-auto">
                        {lyrics.substring(0, 200)}
                        {lyrics.length > 200 && '...'}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Fill in the song details to see preview</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Make public</p>
                  <p className="text-sm text-muted-foreground">Allow others to use this song</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Add to featured</p>
                  <p className="text-sm text-muted-foreground">Show in featured songs list</p>
                </div>
                <input type="checkbox" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline" asChild>
          <Link href="/songs">Cancel</Link>
        </Button>
        <Button variant="outline" onClick={handlePreview}>
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button disabled={!title || !lyrics} onClick={handleSubmit}>
          <Save className="h-4 w-4 mr-2" />
          Save Song
        </Button>
      </div>
    </div>
  )
}

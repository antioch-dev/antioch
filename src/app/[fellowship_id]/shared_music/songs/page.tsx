'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import {
  ArrowLeft,
  Heart,
  Share2,
  Plus,
  Music,
  Volume2,
  Type,
  Palette,
  Edit,
  Youtube,
  Play,
  ExternalLink,
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

// Mock song data with YouTube link
const songData = {
  id: 1,
  title: 'Amazing Grace',
  artist: 'Traditional',
  category: 'Hymn',
  key: 'G',
  tempo: 'Slow',
  plays: 1250,
  duration: '4:32',
  addedDate: '2024-01-15',
  youtubeUrl: 'https://www.youtube.com/watch?v=CDdvReNKKuk',
  youtubeId: 'CDdvReNKKuk',
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

export default function SongDetailPage() {
  const params = useParams<{ id: string }>()
  const [fontSize, setFontSize] = useState([18])
  const [fontFamily, setFontFamily] = useState('serif')
  const [theme, setTheme] = useState('light')
  const [isFavorited, setIsFavorited] = useState(false)
  const [showPlaylistDialog, setShowPlaylistDialog] = useState(false)
  const [showDisplaySettings, setShowDisplaySettings] = useState(false)
  const [showYouTubePlayer, setShowYouTubePlayer] = useState(false)

  const router = useRouter()

  const startPresentation = () => {
    router.push(`/fellowship1/shared_music/songs/${params.id}/present`)
  }

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited)
    console.log(isFavorited ? 'Removed from favorites' : 'Added to favorites')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: songData.title,
          text: `Check out this song: ${songData.title} by ${songData.artist}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      void navigator.clipboard.writeText(window.location.href)
      console.log('Link copied to clipboard')
    }
  }

  const handleAddToPlaylist = () => {
    setShowPlaylistDialog(true)
    console.log('Opening playlist selection dialog', showPlaylistDialog)
  }

  const openYouTubeExternal = () => {
    window.open(songData.youtubeUrl, '_blank')
  }

  const toggleYouTubePlayer = () => {
    setShowYouTubePlayer(!showYouTubePlayer)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild className="hover-lift transition-all-smooth">
          <Link href="/fellowship1/shared_music/songs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{songData.title}</h1>
          <p className="text-muted-foreground">{songData.artist}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="hover-scale transition-all-smooth bg-transparent"
            onClick={toggleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current text-red-500' : ''}`} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hover-scale transition-all-smooth bg-transparent"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" asChild className="hover-lift transition-all-smooth bg-transparent">
            <Link href={`/fellowship1/shared_music/songs/${params.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          <Button
            variant="outline"
            className="hover-lift transition-all-smooth bg-transparent"
            onClick={handleAddToPlaylist}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add to Playlist
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Song Info Sidebar */}
        <div className="lg:col-span-1">
          <Card className="hover-lift transition-all-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                Song Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="hover-scale transition-all-smooth">
                  {songData.category}
                </Badge>
                <Badge variant="outline" className="hover-scale transition-all-smooth">
                  Key: {songData.key}
                </Badge>
                <Badge variant="outline" className="hover-scale transition-all-smooth">
                  {songData.tempo}
                </Badge>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{songData.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plays:</span>
                  <span>{songData.plays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Added:</span>
                  <span>{new Date(songData.addedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* YouTube Integration */}
          <Card className="mt-6 hover-lift transition-all-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-500" />
                Listen on YouTube
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full hover-lift transition-all-smooth bg-transparent"
                onClick={toggleYouTubePlayer}
              >
                <Play className="h-4 w-4 mr-2" />
                Play Here
              </Button>
              <Button
                variant="outline"
                className="w-full hover-lift transition-all-smooth bg-transparent"
                onClick={openYouTubeExternal}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in YouTube
              </Button>
            </CardContent>
          </Card>

          {/* Display Controls */}
          <Card className="mt-6 hover-lift transition-all-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Display Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Font Size</label>
                <Slider value={fontSize} onValueChange={setFontSize} max={32} min={12} step={2} className="w-full" />
                <div className="text-xs text-muted-foreground mt-1">{fontSize[0]}px</div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Font Family</label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger className="transition-all-smooth">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="sans">Sans Serif</SelectItem>
                    <SelectItem value="mono">Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Theme</label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="transition-all-smooth">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="sepia">Sepia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* YouTube Player */}
          {showYouTubePlayer && (
            <Card className="mb-6 hover-lift transition-all-smooth">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Youtube className="h-5 w-5 text-red-500" />
                    YouTube Player
                  </span>
                  <Button variant="ghost" size="sm" onClick={toggleYouTubePlayer}>
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${songData.youtubeId}?rel=0`}
                    title={`${songData.title} - ${songData.artist}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lyrics Display */}
          <Card
            className={`hover-lift transition-all-smooth ${theme === 'dark' ? 'bg-slate-900 text-white' : theme === 'sepia' ? 'bg-amber-50 text-amber-900' : 'bg-white'}`}
          >
            <CardHeader>
              <CardTitle>Lyrics</CardTitle>
              <CardDescription>Click to start presentation mode for congregation display</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`whitespace-pre-line leading-relaxed ${
                  fontFamily === 'serif' ? 'font-serif' : fontFamily === 'sans' ? 'font-sans' : 'font-mono'
                }`}
                style={{ fontSize: `${fontSize[0]}px` }}
              >
                {songData.lyrics}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <Button size="lg" className="flex-1 hover-scale transition-all-smooth" onClick={startPresentation}>
              <Volume2 className="h-4 w-4 mr-2" />
              Start Presentation
            </Button>
            <Dialog open={showDisplaySettings} onOpenChange={setShowDisplaySettings}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="hover-lift transition-all-smooth bg-transparent">
                  <Palette className="h-4 w-4 mr-2" />
                  Customize Display
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Display Settings</DialogTitle>
                  <DialogDescription>Customize how the lyrics appear in presentation mode</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="presentation-font-size">Presentation Font Size</Label>
                    <Slider
                      id="presentation-font-size"
                      defaultValue={[48]}
                      max={72}
                      min={24}
                      step={4}
                      className="w-full mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="presentation-theme">Presentation Theme</Label>
                    <Select defaultValue="dark">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="sepia">Sepia</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="background-opacity">Background Opacity</Label>
                    <Slider
                      id="background-opacity"
                      defaultValue={[80]}
                      max={100}
                      min={0}
                      step={10}
                      className="w-full mt-2"
                    />
                  </div>
                  <Button className="w-full" onClick={() => setShowDisplaySettings(false)}>
                    Apply Settings
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

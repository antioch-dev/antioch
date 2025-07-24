'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Music,
  Play,
  Edit,
  Share2,
  Download,
  Eye,
  Settings,
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

// Mock service data
const serviceData = {
  id: 1,
  title: 'Sunday Morning Worship',
  date: '2024-12-15',
  time: '10:00 AM',
  duration: '90 minutes',
  location: 'Main Sanctuary',
  organizer: 'Pastor John',
  organizerAvatar: '/placeholder-user.jpg',
  organizerEmail: 'pastor.john@church.com',
  playlistId: 1,
  playlistTitle: 'Sunday Morning Worship',
  songCount: 8,
  attendees: 150,
  status: 'scheduled',
  description:
    'Regular Sunday morning worship service with communion. Join us for a time of praise, worship, and fellowship as we gather to honor God together.',
  notes: 'Please ensure all microphones are tested before service. Communion will be served after the sermon.',
  songs: [
    {
      id: 1,
      title: 'Amazing Grace',
      artist: 'Traditional',
      duration: '4:32',
      key: 'G',
      tempo: 'Slow',
      order: 1,
      type: 'Opening',
    },
    {
      id: 2,
      title: 'How Great Thou Art',
      artist: 'Carl Boberg',
      duration: '3:45',
      key: 'C',
      tempo: 'Medium',
      order: 2,
      type: 'Worship',
    },
    {
      id: 3,
      title: '10,000 Reasons',
      artist: 'Matt Redman',
      duration: '4:03',
      key: 'G',
      tempo: 'Medium',
      order: 3,
      type: 'Worship',
    },
    {
      id: 4,
      title: 'Blessed Be Your Name',
      artist: 'Matt Redman',
      duration: '4:12',
      key: 'D',
      tempo: 'Medium',
      order: 4,
      type: 'Praise',
    },
    {
      id: 5,
      title: 'Holy, Holy, Holy',
      artist: 'Reginald Heber',
      duration: '3:28',
      key: 'F',
      tempo: 'Slow',
      order: 5,
      type: 'Communion',
    },
    {
      id: 6,
      title: 'Cornerstone',
      artist: 'Hillsong',
      duration: '5:02',
      key: 'E',
      tempo: 'Medium',
      order: 6,
      type: 'Response',
    },
    {
      id: 7,
      title: 'Great Is Thy Faithfulness',
      artist: 'Thomas Chisholm',
      duration: '4:15',
      key: 'Bb',
      tempo: 'Slow',
      order: 7,
      type: 'Closing',
    },
    {
      id: 8,
      title: 'Be Thou My Vision',
      artist: 'Traditional Irish',
      duration: '3:52',
      key: 'D',
      tempo: 'Slow',
      order: 8,
      type: 'Benediction',
    },
  ],
  team: [
    {
      name: 'Pastor John',
      role: 'Service Leader',
      avatar: '/placeholder-user.jpg',
      email: 'pastor.john@church.com',
    },
    {
      name: 'Sarah Wilson',
      role: 'Worship Leader',
      avatar: '/placeholder-user.jpg',
      email: 'sarah@church.com',
    },
    {
      name: 'Mike Johnson',
      role: 'Sound Engineer',
      avatar: '/placeholder-user.jpg',
      email: 'mike@church.com',
    },
    {
      name: 'Lisa Chen',
      role: 'Pianist',
      avatar: '/placeholder-user.jpg',
      email: 'lisa@church.com',
    },
  ],
}

export default function ServiceDetailPage() {
  const params = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()

  const startServicePresentation = () => {
    router.push(`/shared_music/services/${params.id}/present`)
  }

  const totalDuration = serviceData.songs.reduce((total, song) => {
    if (typeof song.duration !== 'string') {
      console.warn(`Invalid duration format for song:`, song)
      return total
    }

    const parts = song.duration.split(':')

    if (parts.length < 2) {
      console.warn(`Unexpected duration format for song: ${song.duration}. Expected "MM:SS".`)
      return total
    }

    const minutes = Number(parts[0]) || 0
    const seconds = Number(parts[1]) || 0

    if (isNaN(minutes) || isNaN(seconds)) {
      console.warn(`Could not parse minutes or seconds for song: ${song.duration}`)
      return total
    }

    return total + minutes * 60 + seconds
  }, 0)

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${mins}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleExportPlaylist = () => {
    console.log('Exporting playlist...')
    // Generate and download playlist file
  }

  const handleDisplaySettings = () => {
    console.log('Opening display settings...')
    // Navigate to display settings
    router.push(`/services/${params.id}/settings`)
  }

  const handleShareService = () => {
    console.log('Sharing service...')
    // Share service details
  }

  const handleSetTransitionTiming = () => {
    console.log('Setting transition timing...')
  }

  const handleUploadBackgrounds = () => {
    console.log('Uploading background images...')
  }

  const handleConfigureAutoAdvance = () => {
    console.log('Configuring auto-advance...')
  }

  const handleAdjustFontSize = () => {
    console.log('Adjusting font size...')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/shared_music/services">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{serviceData.title}</h1>
          <p className="text-muted-foreground">{serviceData.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/shared_music/services/${params.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          {serviceData.status === 'scheduled' && (
            <Button onClick={startServicePresentation}>
              <Play className="h-4 w-4 mr-2" />
              Start Service
            </Button>
          )}
        </div>
      </div>

      {/* Service Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Date & Time</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Date(serviceData.date).toLocaleDateString()}</div>
            <p className="text-xs text-muted-foreground">{serviceData.time}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceData.duration}</div>
            <p className="text-xs text-muted-foreground">{formatDuration(totalDuration)} music</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Location</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceData.location}</div>
            <p className="text-xs text-muted-foreground">Main venue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceData.attendees}</div>
            <p className="text-xs text-muted-foreground">
              {serviceData.status === 'scheduled' ? 'Expected' : 'Attended'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="songs">Songs ({serviceData.songCount})</TabsTrigger>
          <TabsTrigger value="team">Team ({serviceData.team.length})</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Service Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Service Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-muted-foreground">{serviceData.description}</p>
                  </div>

                  {serviceData.notes && (
                    <div>
                      <h4 className="font-medium mb-2">Service Notes</h4>
                      <p className="text-muted-foreground">{serviceData.notes}</p>
                    </div>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={serviceData.status === 'scheduled' ? 'default' : 'secondary'}>
                        {serviceData.status === 'scheduled' ? 'Scheduled' : 'Completed'}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleExportPlaylist}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-transparent"
                      onClick={startServicePresentation}
                    >
                      <Play className="h-6 w-6 mb-2" />
                      Start Presentation
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent" onClick={handleDisplaySettings}>
                      <Settings className="h-6 w-6 mb-2" />
                      Display Settings
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <Download className="h-6 w-6 mb-2" />
                      Export Playlist
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent" onClick={handleShareService}>
                      <Share2 className="h-6 w-6 mb-2" />
                      Share Service
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Organizer */}
              <Card>
                <CardHeader>
                  <CardTitle>Organizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={serviceData.organizerAvatar || '/placeholder.svg'}
                        alt={serviceData.organizer}
                      />
                      <AvatarFallback>
                        {serviceData.organizer
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{serviceData.organizer}</p>
                      <p className="text-sm text-muted-foreground">{serviceData.organizerEmail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Playlist */}
              <Card>
                <CardHeader>
                  <CardTitle>Playlist</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link
                    href={`/shared_music/playlists/${serviceData.playlistId}`}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50"
                  >
                    <Music className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{serviceData.playlistTitle}</p>
                      <p className="text-sm text-muted-foreground">
                        {serviceData.songCount} songs • {formatDuration(totalDuration)}
                      </p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="songs">
          <Card>
            <CardHeader>
              <CardTitle>Service Songs</CardTitle>
              <CardDescription>
                {serviceData.songCount} songs • Total duration: {formatDuration(totalDuration)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {serviceData.songs.map((song) => (
                  <div key={song.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="w-8 text-center">
                      <span className="text-sm font-medium">{song.order}</span>
                    </div>

                    <div className="flex-1">
                      <Link href={`/shared_music/songs/${song.id}`} className="font-medium hover:underline block">
                        {song.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">{song.artist}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {song.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Key: {song.key}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{song.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Service Team</CardTitle>
              <CardDescription>People involved in this service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceData.team.map((member, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <Avatar>
                      <AvatarImage src={member.avatar || '/placeholder.svg'} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Service Settings</CardTitle>
              <CardDescription>Configure service preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Display Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-advance slides</p>
                        <p className="text-sm text-muted-foreground">Automatically move to next verse</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleConfigureAutoAdvance}>
                        Configure
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Font size</p>
                        <p className="text-sm text-muted-foreground">Adjust text size for projection</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleAdjustFontSize}>
                        Adjust
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">Service Flow</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Transition timing</p>
                        <p className="text-sm text-muted-foreground">Time between songs</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleSetTransitionTiming}>
                        Set
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Background images</p>
                        <p className="text-sm text-muted-foreground">Custom backgrounds for slides</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleUploadBackgrounds}>
                        Upload
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

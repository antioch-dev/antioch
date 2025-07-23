"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Maximize,
  Minimize,
  ChevronLeft,
  ChevronRight,
  Music,
  SkipForward,
  SkipBack,
  Clock,
  Users,
} from "lucide-react"

// Mock service data
const serviceData = {
  id: 1,
  title: "Sunday Morning Worship",
  date: "2024-12-15",
  time: "10:00 AM",
  songs: [
    {
      id: 1,
      title: "Amazing Grace",
      artist: "Traditional",
      type: "Opening",
      lyrics: `Amazing grace! How sweet the sound
That saved a wretch like me!
I once was lost, but now am found;
Was blind, but now I see.

'Twas grace that taught my heart to fear,
And grace my fears relieved;
How precious did that grace appear
The hour I first believed.`,
    },
    {
      id: 2,
      title: "How Great Thou Art",
      artist: "Carl Boberg",
      type: "Worship",
      lyrics: `O Lord my God, when I in awesome wonder
Consider all the worlds Thy hands have made
I see the stars, I hear the rolling thunder
Thy power throughout the universe displayed

Then sings my soul, my Savior God, to Thee
How great Thou art, how great Thou art
Then sings my soul, my Savior God, to Thee
How great Thou art, how great Thou art`,
    },
    {
      id: 3,
      title: "10,000 Reasons",
      artist: "Matt Redman",
      type: "Praise",
      lyrics: `Bless the Lord, O my soul, O my soul
Worship His holy name
Sing like never before, O my soul
I'll worship Your holy name

The sun comes up, it's a new day dawning
It's time to sing Your song again
Whatever may pass and whatever lies before me
Let me be singing when the evening comes`,
    },
  ],
}

export default function ServicePresentationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fontSize, setFontSize] = useState(48)
  const [serviceStartTime] = useState(new Date())

  const currentSong = serviceData.songs[currentSongIndex]

  // Create slides for current song
  const createSlides = (song: typeof currentSong) => {
    if (!song) return []
    const titleSlide = `${song.title}\n\n${song.artist}\n\n${song.type}`
    const lyricsSlides = song.lyrics.split("\n\n").filter((slide) => slide.trim())
    return [titleSlide, ...lyricsSlides]
  }

  const currentSlides = createSlides(currentSong)

  // Calculate service duration
  const [serviceDuration, setServiceDuration] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const duration = Math.floor((now.getTime() - serviceStartTime.getTime()) / 1000)
      setServiceDuration(duration)
    }, 1000)

    return () => clearInterval(interval)
  }, [serviceStartTime])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          nextSlide()
          break
        case "ArrowLeft":
          prevSlide()
          break
        case "ArrowUp":
          prevSong()
          break
        case "ArrowDown":
          nextSong()
          break
        case "Escape":
          exitPresentation()
          break
        case "f":
        case "F":
          toggleFullscreen()
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentSlide, currentSongIndex])

  const nextSlide = () => {
    if (currentSlide < currentSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      nextSong()
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    } else if (currentSongIndex > 0) {
      prevSong()
    }
  }

  const nextSong = () => {
    if (currentSongIndex < serviceData.songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1)
      setCurrentSlide(0)
    }
  }

  const prevSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1)
      setCurrentSlide(0)
    }
  }

  const exitPresentation = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
    router.back()
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white relative">
      {/* Control Bar */}
      {!isFullscreen && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={exitPresentation} className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="text-white">
                <h2 className="font-bold">{serviceData.title}</h2>
                <p className="text-sm text-white/70">
                  {new Date(serviceData.date).toLocaleDateString()} • {serviceData.time}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(serviceDuration)}</span>
              </div>
              <Badge variant="outline" className="text-white border-white/30">
                Song {currentSongIndex + 1} of {serviceData.songs.length}
              </Badge>
              <Badge variant="outline" className="text-white border-white/30">
                {currentSlide + 1} / {currentSlides.length}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSong}
                disabled={currentSongIndex === 0}
                className="text-white hover:bg-white/20"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={prevSlide} className="text-white hover:bg-white/20">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={nextSlide} className="text-white hover:bg-white/20">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSong}
                disabled={currentSongIndex === serviceData.songs.length - 1}
                className="text-white hover:bg-white/20"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Presentation Area */}
      <div
        className="flex items-center justify-center min-h-screen p-8"
        style={{ paddingTop: isFullscreen ? "2rem" : "6rem" }}
      >
        <div className="text-center max-w-5xl w-full">
          <div
            className="whitespace-pre-line leading-relaxed font-bold text-center drop-shadow-lg"
            style={{ fontSize: `${fontSize}px`, textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
          >
            {currentSlides[currentSlide]}
          </div>
        </div>
      </div>

      {/* Service Progress */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
            <Button variant="ghost" size="icon" onClick={prevSlide} className="text-white hover:bg-white/20 h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-1 mx-4">
              {currentSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            <Button variant="ghost" size="icon" onClick={nextSlide} className="text-white hover:bg-white/20 h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Song Progress */}
        <div className="flex justify-center">
          <div className="flex gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
            {serviceData.songs.map((song, index) => (
              <button
                key={song.id}
                onClick={() => {
                  setCurrentSongIndex(index)
                  setCurrentSlide(0)
                }}
                className={`px-3 py-1 rounded-full text-xs transition-all flex items-center gap-1 ${
                  index === currentSongIndex
                    ? "bg-white text-black"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Music className="h-3 w-3" />
                {song.title}
                <Badge variant={index === currentSongIndex ? "secondary" : "outline"} className="text-xs ml-1">
                  {song.type}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Service Info */}
      {!isFullscreen && (
        <div className="absolute top-20 right-4 text-white/70 text-sm bg-black/30 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4" />
            <span>Service Duration: {formatDuration(serviceDuration)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Live Presentation Mode</span>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      {!isFullscreen && (
        <div className="absolute bottom-4 right-4 text-white/50 text-xs">
          <div>← → Slides • ↑ ↓ Songs • Space Next • F Fullscreen • Esc Exit</div>
        </div>
      )}
    </div>
  )
}

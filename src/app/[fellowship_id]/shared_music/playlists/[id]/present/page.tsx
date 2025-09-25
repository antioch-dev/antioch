"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { ArrowLeft, Maximize, Minimize, ChevronLeft, ChevronRight, SkipForward, SkipBack } from "lucide-react"

type Song = {
  id: number
  title: string
  artist: string
  lyrics: string
}

// Mock playlist data with full lyrics
const playlistData = {
  id: 1,
  title: "Sunday Morning Worship",
  songs: [
    {
      id: 1,
      title: "Amazing Grace",
      artist: "Traditional",
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

export default function PlaylistPresentationPage() {
  const router = useRouter()
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fontSize] = useState(48)

  const currentSong = playlistData.songs[currentSongIndex]

  // Create slides for current song
  const createSlides = (song: Song | undefined) => {
    if (!song) {
      return []
    }
    const titleSlide = `${song.title}\n\n${song.artist}`
    const lyricsSlides = song.lyrics.split("\n\n").filter((slide: string) => slide.trim())
    return [titleSlide, ...lyricsSlides]
  }

  const currentSlides = createSlides(currentSong)

  const nextSong = useCallback(() => {
    if (currentSongIndex < playlistData.songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1)
      setCurrentSlide(0)
    }
  }, [currentSongIndex])

  const nextSlide = useCallback(() => {
    if (currentSlide < currentSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      nextSong()
    }
  }, [currentSlide, currentSlides.length, nextSong])

  const prevSong = useCallback(() => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1)
      setCurrentSlide(0)
    }
  }, [currentSongIndex])
  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    } else if (currentSongIndex > 0) {
      prevSong()
    }
  }, [currentSlide, currentSongIndex, prevSong])

  const exitPresentation = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    }
    router.back()
  }, [router])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true)
        })
        .catch((err) => {
          console.error(`Error attempting to enable full-screen mode:`, err)
        })
    } else {
      void document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false)
        })
        .catch((err) => {
          console.error(`Error attempting to disable full-screen mode:}`, err)
        })
    }
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
  }, [currentSlide, currentSongIndex, exitPresentation, nextSlide, nextSong, prevSlide, prevSong])

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Control Bar */}
      {!isFullscreen && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={exitPresentation} className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="text-white">
                <h2 className="font-bold">{playlistData.title}</h2>
                <p className="text-sm text-white/70">
                  Song {currentSongIndex + 1} of {playlistData.songs.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-white border-white/30">
                {currentSlide + 1} / {currentSlides.length}
              </Badge>
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
                disabled={currentSongIndex === playlistData.songs.length - 1}
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
        <div className="text-center max-w-4xl w-full">
          <div
            className="whitespace-pre-line leading-relaxed font-bold text-center"
            style={{ fontSize: `${fontSize}px` }}
          >
            {currentSlides[currentSlide]}
          </div>
        </div>
      </div>

      {/* Song Navigation */}
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

        {/* Song List */}
        <div className="flex justify-center">
          <div className="flex gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
            {playlistData.songs.map((song, index) => (
              <button
                key={song.id}
                onClick={() => {
                  setCurrentSongIndex(index)
                  setCurrentSlide(0)
                }}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  index === currentSongIndex
                    ? "bg-white text-black"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {song.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      {!isFullscreen && (
        <div className="absolute bottom-4 right-4 text-white/50 text-xs">
          <div>← → Slides • ↑ ↓ Songs • Space Next • F Fullscreen • Esc Exit</div>
        </div>
      )}
    </div>
  )
}

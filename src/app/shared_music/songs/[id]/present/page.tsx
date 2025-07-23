"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Maximize,
  Minimize,
  Settings,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Type,
  Palette,
} from "lucide-react"

// Mock song data
const mockSong = {
  id: 1,
  title: "Amazing Grace",
  artist: "Traditional",
  category: "Hymn",
  key: "G",
  youtubeId: "CDdvReNKKuk",
  lyrics: [
    {
      section: "Verse 1",
      text: "Amazing grace! How sweet the sound\nThat saved a wretch like me!\nI once was lost, but now am found;\nWas blind, but now I see.",
    },
    {
      section: "Verse 2",
      text: "'Twas grace that taught my heart to fear,\nAnd grace my fears relieved;\nHow precious did that grace appear\nThe hour I first believed.",
    },
    {
      section: "Verse 3",
      text: "Through many dangers, toils, and snares,\nI have already come;\n'Tis grace hath brought me safe thus far,\nAnd grace will lead me home.",
    },
    {
      section: "Verse 4",
      text: "The Lord has promised good to me,\nHis Word my hope secures;\nHe will my Shield and Portion be,\nAs long as life endures.",
    },
    {
      section: "Verse 5",
      text: "When we've been there ten thousand years,\nBright shining as the sun,\nWe've no less days to sing God's praise\nThan when we'd first begun.",
    },
  ],
}

export default function SongPresentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [fontSize, setFontSize] = useState(48)
  const [theme, setTheme] = useState("dark")

  const totalSlides = mockSong.lyrics.length

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const exitPresentation = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
    router.push(`/songs/${params.id}`)
  }, [router, params.id])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const getThemeClasses = () => {
    switch (theme) {
      case "light":
        return "bg-white text-black"
      case "sepia":
        return "bg-amber-50 text-amber-900"
      case "blue":
        return "bg-blue-900 text-blue-50"
      case "green":
        return "bg-green-900 text-green-50"
      default:
        return "bg-gray-900 text-white"
    }
  }

  const getControlsTheme = () => {
    switch (theme) {
      case "light":
        return "bg-black/20 text-black"
      case "sepia":
        return "bg-amber-900/20 text-amber-900"
      case "blue":
        return "bg-blue-950/40 text-blue-100"
      case "green":
        return "bg-green-950/40 text-green-100"
      default:
        return "bg-white/20 text-white"
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault()
          nextSlide()
          break
        case "ArrowLeft":
          e.preventDefault()
          prevSlide()
          break
        case "f":
        case "F":
          e.preventDefault()
          toggleFullscreen()
          break
        case "Escape":
          e.preventDefault()
          exitPresentation()
          break
        case "p":
        case "P":
          e.preventDefault()
          setIsPlaying(!isPlaying)
          break
        case "m":
        case "M":
          e.preventDefault()
          setIsMuted(!isMuted)
          break
        case "+":
        case "=":
          e.preventDefault()
          setFontSize((prev) => Math.min(prev + 4, 72))
          break
        case "-":
          e.preventDefault()
          setFontSize((prev) => Math.max(prev - 4, 24))
          break
        case "t":
        case "T":
          e.preventDefault()
          const themes = ["dark", "light", "sepia", "blue", "green"]
          const currentIndex = themes.indexOf(theme)
          setTheme(themes[(currentIndex + 1) % themes.length] ?? "dark")
          break
      }
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("keydown", handleKeyPress)
    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [nextSlide, prevSlide, exitPresentation, isPlaying, isMuted, theme])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (showControls) {
      timeout = setTimeout(() => setShowControls(false), 3000)
    }
    return () => clearTimeout(timeout)
  }, [showControls, currentSlide])

  const handleMouseMove = () => {
    setShowControls(true)
  }

  return (
    <div className={`fixed inset-0 flex flex-col overflow-hidden ${getThemeClasses()}`} onMouseMove={handleMouseMove}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-slow-reverse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse-gentle"></div>
      </div>

      {/* Header Controls */}
      <div
        className={`relative z-10 p-6 transition-all duration-500 ${getControlsTheme()} backdrop-blur-sm ${showControls ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={exitPresentation}
              className="hover:bg-current/20 transition-all-smooth group"
            >
              <X className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Exit
            </Button>
            <div>
              <h1 className="text-xl font-bold">{mockSong.title}</h1>
              <p className="text-sm opacity-70">{mockSong.artist}</p>
            </div>
            <Badge variant="secondary" className="bg-current/20 border-current/30">
              {mockSong.category}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="hover:bg-current/20 transition-all-smooth group"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <Play className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="hover:bg-current/20 transition-all-smooth group"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <Volume2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="hover:bg-current/20 transition-all-smooth group"
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <Maximize className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const themes = ["dark", "light", "sepia", "blue", "green"]
                const currentIndex = themes.indexOf(theme)
                setTheme(themes[(currentIndex + 1) % themes.length] ?? "dark")
              }}
              className="hover:bg-current/20 transition-all-smooth group"
            >
              <Palette className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-current/20 transition-all-smooth group">
              <Settings className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-8 relative">
        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="lg"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`absolute left-8 hover:bg-current/20 transition-all duration-500 group ${
            showControls ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
          }`}
        >
          <ArrowLeft className="h-8 w-8 group-hover:scale-110 group-hover:-translate-x-1 transition-all duration-300" />
        </Button>

        <Button
          variant="ghost"
          size="lg"
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className={`absolute right-8 hover:bg-current/20 transition-all duration-500 group ${
            showControls ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
          }`}
        >
          <ArrowRight className="h-8 w-8 group-hover:scale-110 group-hover:translate-x-1 transition-all duration-300" />
        </Button>

        {/* Lyrics Display */}
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <div className="mb-8 animate-fade-in-scale">
            <h2 className="text-2xl font-semibold mb-6 opacity-80">{mockSong.lyrics?.[currentSlide]?.section}</h2>
            <div
              className="leading-relaxed font-light tracking-wide drop-shadow-lg"
              style={{ fontSize: `${fontSize}px` }}
            >
              {mockSong.lyrics?.[currentSlide]?.text?.split("\n").map((line, index) => (
                <div key={index} className="mb-4 animate-slide-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div
        className={`relative z-10 p-6 transition-all duration-500 ${getControlsTheme()} backdrop-blur-sm ${showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}`}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Progress */}
          <div className="w-full max-w-md">
            <Progress value={((currentSlide + 1) / totalSlides) * 100} className="h-2 bg-current/20" />
            <div className="flex justify-between text-sm opacity-70 mt-2">
              <span>Slide {currentSlide + 1}</span>
              <span>{totalSlides} total</span>
            </div>
          </div>

          {/* Slide Dots */}
          <div className="flex gap-2">
            {mockSong.lyrics.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentSlide ? "bg-current shadow-lg" : "bg-current/40 hover:bg-current/60"
                }`}
              />
            ))}
          </div>

          {/* Font Size Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFontSize((prev) => Math.max(prev - 4, 24))}
              className="hover:bg-current/20"
            >
              <Type className="h-3 w-3" />
            </Button>
            <span className="text-xs opacity-70 min-w-[3rem] text-center">{fontSize}px</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFontSize((prev) => Math.min(prev + 4, 72))}
              className="hover:bg-current/20"
            >
              <Type className="h-5 w-5" />
            </Button>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="text-xs opacity-50 text-center">
            <p>
              Use ← → arrow keys or spacebar to navigate • Press F for fullscreen • ESC to exit • T for theme • +/- for
              font size
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

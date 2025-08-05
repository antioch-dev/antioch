"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Play, ChevronDown } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"

interface HeroData {
  title: string
  subtitle: string
  description: string
  primaryButton: { text: string; href: string }
  secondaryButton: { text: string; href: string }
  backgroundImage: string
}

export function HeroSection() {
  const [heroData, setHeroData] = useState<HeroData | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchHeroData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const mockData: HeroData = {
        title: "Unite Fellowships Worldwide",
        subtitle: "One Platform, Endless Possibilities",
        description:
          "Empowering Christian communities with shared tools, secure data management, and collaborative features that strengthen fellowship connections across the globe.",
        primaryButton: { text: "Find Fellowships", href: "/search" },
        secondaryButton: { text: "Watch Demo", href: "#demo" },
        backgroundImage:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80",
      }

      setHeroData(mockData)
      setIsLoaded(true)
    }

   void fetchHeroData()
  }, [])

  if (!heroData) {
    return (
      <div className="relative h-screen bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full flex items-center justify-center">
          <div className="animate-pulse-slow">
            <div className="w-16 h-16 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen h-screen overflow-hidden">
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-110 transition-transform duration-1000 ease-out"
        style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />

      {/* Floating elements */}
      <div className="absolute top-32 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full animate-float"></div>
      <div className="absolute top-40 sm:top-48 right-4 sm:right-20 w-10 h-10 sm:w-12 sm:h-12 bg-blue-400/20 rounded-full animate-pulse-slow"></div>
      <div
        className="absolute bottom-32 sm:bottom-40 left-4 sm:left-20 w-12 h-12 sm:w-16 sm:h-16 bg-purple-400/20 rounded-full animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Main content - Added proper top padding to avoid navbar collision */}
      <div className="relative h-full flex items-center pt-24 md:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text content */}
            <div className="text-white space-y-6 sm:space-y-8 text-center lg:text-left">
              <ScrollAnimation animation="fade-up" delay={200}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="block">{heroData.title.split(" ").slice(0, 2).join(" ")}</span>
                  <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {heroData.title.split(" ").slice(2).join(" ")}
                  </span>
                </h1>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={400}>
                <p className="text-lg sm:text-xl md:text-2xl text-blue-100 font-light">{heroData.subtitle}</p>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={600}>
                <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {heroData.description}
                </p>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-up" delay={800}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl group shadow-lg"
                  >
                    <Link href={heroData.primaryButton.href}>
                      {heroData.primaryButton.text}
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 bg-transparent px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 group shadow-lg backdrop-blur-sm"
                  >
                    <Link href={heroData.secondaryButton.href}>
                      <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110" />
                      {heroData.secondaryButton.text}
                    </Link>
                  </Button>
                </div>
              </ScrollAnimation>
            </div>

            {/* Visual element */}
            <div className="hidden lg:block">
              <ScrollAnimation animation="fade-left" delay={600}>
                <div className="relative flex justify-center">
                  <div className="w-80 h-80 xl:w-96 xl:h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
                  <div className="absolute inset-0 w-64 h-64 xl:w-80 xl:h-80 bg-gradient-to-tr from-white/10 to-blue-400/10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center m-8 xl:m-8">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 xl:w-20 xl:h-20 bg-white/20 rounded-full mx-auto flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <Play className="h-6 w-6 xl:h-8 xl:w-8 text-white" />
                      </div>
                      <p className="text-white/80 text-sm">Watch Our Story</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollAnimation animation="fade-up" delay={1200}>
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 text-white/60">
            <span className="text-xs sm:text-sm">Scroll to explore</span>
            <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 animate-bounce" />
          </div>
        </div>
      </ScrollAnimation>
    </div>
  )
}

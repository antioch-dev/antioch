"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Users, Calendar, Video, MessageSquare } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"

const videoFeatures = [
  {
    icon: Video,
    title: "Live Streaming",
    description: "Broadcast your services to members worldwide",
  },
  {
    icon: Users,
    title: "Interactive Chat",
    description: "Real-time engagement during live sessions",
  },
  {
    icon: Calendar,
    title: "Scheduled Events",
    description: "Plan and promote upcoming live streams",
  },
  {
    icon: MessageSquare,
    title: "Prayer Requests",
    description: "Collect and manage prayer requests during streams",
  },
]

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-tl from-purple-200/30 to-indigo-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Video Player */}
          <div className="relative">
            <ScrollAnimation animation="fade-right">
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-105">
                <div className="aspect-video bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center relative overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.1%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
                  </div>

                  {!isPlaying ? (
                    <Button
                      onClick={() => setIsPlaying(true)}
                      size="lg"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/30 transition-all duration-300 hover:scale-110 group"
                    >
                      <Play className="h-8 w-8 sm:h-10 sm:w-10 text-white ml-1 transition-transform group-hover:scale-110" />
                    </Button>
                  ) : (
                    <div className="w-full h-full bg-black/20 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="animate-pulse mb-4">
                          <div className="w-16 h-16 bg-white/20 rounded-full mx-auto"></div>
                        </div>
                        <p className="text-lg">Loading video...</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">See Antioch in Action</h3>
                  <p className="text-gray-600">
                    Watch how fellowships around the world are using Antioch to strengthen their communities and reach
                    more people.
                  </p>
                </div>
              </div>
            </ScrollAnimation>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full animate-pulse-slow"></div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <ScrollAnimation animation="fade-left">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Powerful{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Video Features
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  Engage your community with professional-grade live streaming and video management tools designed
                  specifically for fellowships.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {videoFeatures.map((feature, index) => (
                <ScrollAnimation key={index} animation="fade-left" delay={index * 150}>
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                            <feature.icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>

            <ScrollAnimation animation="fade-left" delay={600}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-white/20">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Go Live?</h3>
                  <p className="text-gray-600 mb-6">
                    Start streaming your services and events to reach members wherever they are.
                  </p>
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
                    <Video className="mr-2 h-4 w-4" />
                    Start Streaming
                  </Button>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}

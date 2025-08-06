"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Camera, Play, MapPin, Eye, TrendingUp, Activity, Video, ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { CountUp } from "@/components/count-up"
import { ScrollAnimation } from "@/components/scroll-animation"

interface Event {
  id: string
  title: string
  date: string
  time: string
  fellowship: string
  location: string
  attendees: number
  image: string
}

interface Fellowship {
  id: string
  name: string
  location: string
  memberCount: number
  joinedDate: string
  image: string
}

interface Gallery {
  id: string
  title: string
  fellowship: string
  imageCount: number
  coverImage: string
}

interface LiveStream {
  id: string
  title: string
  fellowship: string
  viewers: number
  thumbnail: string
  isLive: boolean
}

interface Stats {
  totalEvents: number
  totalFellowships: number
  totalLiveStreams: number
  totalMembers: number
}

export function HighlightsSection() {
  const [events, setEvents] = useState<Event[]>([])
  const [fellowships, setFellowships] = useState<Fellowship[]>([])
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const mockEvents: Event[] = [
        {
          id: "1",
          title: "Sunday Worship Service",
          date: "2024-01-14",
          time: "10:00 AM",
          fellowship: "Grace Fellowship Beijing",
          location: "Beijing, China",
          attendees: 120,
          image:
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
        },
        {
          id: "2",
          title: "Youth Bible Study",
          date: "2024-01-15",
          time: "7:00 PM",
          fellowship: "Hope Church Shanghai",
          location: "Shanghai, China",
          attendees: 45,
          image:
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
        },
        {
          id: "3",
          title: "Community Outreach",
          date: "2024-01-16",
          time: "2:00 PM",
          fellowship: "Living Waters Guangzhou",
          location: "Guangzhou, China",
          attendees: 80,
          image:
            "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
        },
      ]

      const mockFellowships: Fellowship[] = [
        {
          id: "1",
          name: "Cornerstone Church Tokyo",
          location: "Tokyo, Japan",
          memberCount: 95,
          joinedDate: "2024-01-10",
          image:
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80",
        },
        {
          id: "2",
          name: "New Life Fellowship Singapore",
          location: "Singapore",
          memberCount: 180,
          joinedDate: "2024-01-08",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80",
        },
      ]

      const mockGalleries: Gallery[] = [
        {
          id: "1",
          title: "Christmas Celebration 2023",
          fellowship: "Grace Fellowship Beijing",
          imageCount: 24,
          coverImage:
            "https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
        },
        {
          id: "2",
          title: "Baptism Service",
          fellowship: "Hope Church Shanghai",
          imageCount: 18,
          coverImage:
            "https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
        },
      ]

      const mockLiveStreams: LiveStream[] = [
        {
          id: "1",
          title: "Sunday Morning Service",
          fellowship: "Grace Fellowship Beijing",
          viewers: 234,
          thumbnail:
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80",
          isLive: true,
        },
        {
          id: "2",
          title: "Evening Prayer Meeting",
          fellowship: "New Life Fellowship Singapore",
          viewers: 89,
          thumbnail:
            "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80",
          isLive: true,
        },
      ]

      const mockStats: Stats = {
        totalEvents: 156,
        totalFellowships: 23,
        totalLiveStreams: 8,
        totalMembers: 3420,
      }

      setEvents(mockEvents)
      setFellowships(mockFellowships)
      setGalleries(mockGalleries)
      setLiveStreams(mockLiveStreams)
      setStats(mockStats)
      setIsLoading(false)
    }

    void fetchData()
  }, [])

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-tl from-blue-200/30 to-green-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Platform Stats */}
        {stats && (
          <div className="mb-16 sm:mb-20">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Platform{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Statistics
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 px-4">Growing together as a global community</p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  icon: Users,
                  value: stats.totalFellowships,
                  label: "Active Fellowships",
                  color: "from-blue-500 to-blue-600",
                  delay: 0,
                },
                {
                  icon: Calendar,
                  value: stats.totalEvents,
                  label: "Events This Month",
                  color: "from-green-500 to-green-600",
                  delay: 100,
                },
                {
                  icon: Video,
                  value: stats.totalLiveStreams,
                  label: "Live Streams",
                  color: "from-purple-500 to-purple-600",
                  delay: 200,
                },
                {
                  icon: TrendingUp,
                  value: stats.totalMembers,
                  label: "Community Members",
                  color: "from-orange-500 to-orange-600",
                  delay: 300,
                },
              ].map((stat, index) => (
                <ScrollAnimation key={index} animation="fade-up" delay={stat.delay}>
                  <div className="text-center group">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${stat.color} rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                      <CountUp end={stat.value} duration={2000} />
                      {index === 3 ? "+" : ""}
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium px-2">{stat.label}</div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        )}

        {/* Featured Events */}
        <div className="mb-16 sm:mb-20">
          <ScrollAnimation animation="fade-up">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 sm:mb-12 gap-4">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                  Featured Events
                </h2>
                <p className="text-base sm:text-lg text-gray-600 px-4 lg:px-0">
                  Discover upcoming events in our global fellowship community
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="rounded-full hover:scale-105 transition-all duration-300 bg-transparent mx-auto lg:mx-0"
              >
                <Link href="/events">View All Events</Link>
              </Button>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {events.map((event, index) => (
              <ScrollAnimation key={event.id} animation="fade-up" delay={index * 150}>
                <Card className="group hover-lift bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      width={300}
                      height={200}
                      className="w-full h-40 sm:h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-xs font-semibold text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {event.attendees} attending
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="space-y-3 text-sm text-gray-600 flex-1">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
                        <span className="truncate">
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                        <span className="truncate">{event.fellowship}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-purple-500 flex-shrink-0" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        {/* New Fellowships */}
        <div className="mb-16 sm:mb-20">
          <ScrollAnimation animation="fade-up">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 sm:mb-12 gap-4">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                  New Fellowships
                </h2>
                <p className="text-base sm:text-lg text-gray-600 px-4 lg:px-0">Welcome our newest community members</p>
              </div>
              <Button
                asChild
                variant="outline"
                className="rounded-full hover:scale-105 transition-all duration-300 bg-transparent mx-auto lg:mx-0"
              >
                <Link href="/search">Explore All</Link>
              </Button>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {fellowships.map((fellowship, index) => (
              <ScrollAnimation key={fellowship.id} animation="fade-right" delay={index * 200}>
                <Card className="group hover-lift bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0">
                        <Image
                          src={fellowship.image || "/placeholder.svg"}
                          alt={fellowship.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                          {fellowship.name}
                        </h3>
                        <p className="text-gray-600 mb-3 flex items-center text-sm sm:text-base">
                          <MapPin className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
                          <span className="truncate">{fellowship.location}</span>
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <span className="text-sm text-gray-500 flex items-center">
                            <Users className="h-4 w-4 mr-1 text-green-500 flex-shrink-0" />
                            {fellowship.memberCount} members
                          </span>
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors text-xs w-fit"
                          >
                            Joined {new Date(fellowship.joinedDate).toLocaleDateString()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        {/* Live Streams */}
        <div className="mb-16 sm:mb-20">
          <ScrollAnimation animation="fade-up">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 sm:mb-12 gap-4">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Live Streams</h2>
                <p className="text-base sm:text-lg text-gray-600 px-4 lg:px-0">
                  Join live worship and fellowship sessions
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="rounded-full hover:scale-105 transition-all duration-300 bg-transparent mx-auto lg:mx-0"
              >
                <Link href="/live">View All Streams</Link>
              </Button>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {liveStreams.map((stream, index) => (
              <ScrollAnimation key={stream.id} animation="fade-left" delay={index * 200}>
                <Card className="group hover-lift bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden cursor-pointer">
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <Image
                      src={stream.thumbnail || "/placeholder.svg"}
                      alt={stream.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play className="h-6 w-6 sm:h-8 sm:w-8 text-gray-800 ml-1" />
                      </div>
                    </div>
                    {stream.isLive && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-600 hover:bg-red-700 text-white animate-pulse text-xs">
                          <Activity className="h-3 w-3 mr-1" />
                          LIVE
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="font-bold text-base sm:text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {stream.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 truncate">{stream.fellowship}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="h-4 w-4 mr-2 text-red-500 flex-shrink-0" />
                      <span>{stream.viewers} viewers</span>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        {/* Featured Galleries */}
        <div>
          <ScrollAnimation animation="fade-up">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 sm:mb-12 gap-4">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                  Featured Galleries
                </h2>
                <p className="text-base sm:text-lg text-gray-600 px-4 lg:px-0">
                  Moments captured from our fellowship activities
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="rounded-full hover:scale-105 transition-all duration-300 bg-transparent mx-auto lg:mx-0"
              >
                <Link href="/galleries">View All Galleries</Link>
              </Button>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {galleries.map((gallery, index) => (
              <ScrollAnimation key={gallery.id} animation="fade-up" delay={index * 200}>
                <Card className="group hover-lift bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden cursor-pointer">
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={gallery.coverImage || "/placeholder.svg"}
                      alt={gallery.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Camera className="h-6 w-6 sm:h-8 sm:w-8 text-gray-800" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full flex items-center">
                      <ImageIcon className="h-3 w-3 mr-1" />
                      {gallery.imageCount} photos
                    </div>
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="font-bold text-base sm:text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {gallery.title}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">{gallery.fellowship}</p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

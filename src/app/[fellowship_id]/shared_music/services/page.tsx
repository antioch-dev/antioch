"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Search, Plus, Calendar, Clock, Users, Music, Play, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock services data
const upcomingServices = [
  {
    id: 1,
    title: "Sunday Morning Worship",
    date: "2024-12-15",
    time: "10:00 AM",
    duration: "90 minutes",
    location: "Main Sanctuary",
    organizer: "Pastor John",
    organizerAvatar: "/placeholder-user.jpg",
    playlistId: 1,
    playlistTitle: "Sunday Morning Worship",
    songCount: 8,
    attendees: 150,
    status: "scheduled",
    description: "Regular Sunday morning worship service with communion",
  },
  {
    id: 2,
    title: "Christmas Eve Service",
    date: "2024-12-24",
    time: "7:00 PM",
    duration: "75 minutes",
    location: "Main Sanctuary",
    organizer: "Music Team",
    organizerAvatar: "/placeholder-user.jpg",
    playlistId: 2,
    playlistTitle: "Christmas Celebration",
    songCount: 12,
    attendees: 200,
    status: "scheduled",
    description: "Special Christmas Eve candlelight service",
  },
  {
    id: 3,
    title: "Youth Service",
    date: "2024-12-16",
    time: "6:00 PM",
    duration: "60 minutes",
    location: "Youth Hall",
    organizer: "Sarah Wilson",
    organizerAvatar: "/placeholder-user.jpg",
    playlistId: 3,
    playlistTitle: "Youth Service Favorites",
    songCount: 10,
    attendees: 45,
    status: "scheduled",
    description: "Weekly youth gathering with contemporary worship",
  },
]

const pastServices = [
  {
    id: 4,
    title: "Sunday Morning Worship",
    date: "2024-12-08",
    time: "10:00 AM",
    duration: "85 minutes",
    location: "Main Sanctuary",
    organizer: "Pastor John",
    organizerAvatar: "/placeholder-user.jpg",
    playlistId: 1,
    playlistTitle: "Sunday Morning Worship",
    songCount: 7,
    attendees: 145,
    status: "completed",
    description: "Regular Sunday morning worship service",
  },
  {
    id: 5,
    title: "Thanksgiving Service",
    date: "2024-11-28",
    time: "7:00 PM",
    duration: "60 minutes",
    location: "Main Sanctuary",
    organizer: "Pastor John",
    organizerAvatar: "/placeholder-user.jpg",
    playlistId: 4,
    playlistTitle: "Thanksgiving Praise",
    songCount: 6,
    attendees: 120,
    status: "completed",
    description: "Special Thanksgiving evening service",
  },
]

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("upcoming")
  const { toast } = useToast()

  const filterServices = (services: typeof upcomingServices) => {
    return services.filter(
      (service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  const filteredUpcoming = filterServices(upcomingServices)
  const filteredPast = filterServices(pastServices)

  const handleStartService = (serviceId: number, serviceTitle: string) => {
    toast({
      title: "Service Started",
      description: `"${serviceTitle}" presentation mode is now active.`,
    })
  }

  const handleViewDetails = (serviceId: number, serviceTitle: string) => {
    toast({
      title: "Loading Service Details",
      description: `Opening details for "${serviceTitle}".`,
    })
  }

  const ServiceCard = ({ service, index = 0 }: { service: (typeof upcomingServices)[0]; index?: number }) => (
    <Card
      className="hover:shadow-lg transition-all-smooth hover-lift group animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">
              <Link
                href={`/fellowship1/shared_music/services/${service.id}`}
                className="hover:underline transition-all-smooth hover:text-primary"
                onClick={() => handleViewDetails(service.id, service.title)}
              >
                {service.title}
              </Link>
            </CardTitle>
            <CardDescription className="mt-1">{service.description}</CardDescription>
          </div>
          <Badge
            variant={service.status === "scheduled" ? "default" : "secondary"}
            className="transition-all-smooth hover:scale-105"
          >
            {service.status === "scheduled" ? "Upcoming" : "Completed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Date and Time */}
          <div
            className="flex items-center gap-4 text-sm animate-slide-in-left"
            style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
          >
            <div className="flex items-center gap-2 group/date">
              <Calendar className="h-4 w-4 text-muted-foreground group-hover/date:scale-110 transition-transform duration-300" />
              <span>{new Date(service.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 group/time">
              <Clock className="h-4 w-4 text-muted-foreground group-hover/time:scale-110 transition-transform duration-300" />
              <span>{service.time}</span>
            </div>
          </div>

          {/* Location and Duration */}
          <div
            className="flex items-center gap-4 text-sm text-muted-foreground animate-slide-in-right"
            style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
          >
            <span>{service.location}</span>
            <span>•</span>
            <span>{service.duration}</span>
          </div>

          {/* Organizer */}
          <div
            className="flex items-center gap-2 animate-slide-in-left"
            style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
          >
            <Avatar className="h-6 w-6 transition-transform duration-300 hover:scale-110">
              <AvatarImage src={service.organizerAvatar || "/placeholder.svg"} alt={service.organizer} />
              <AvatarFallback>
                {service.organizer
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">Organized by {service.organizer}</span>
          </div>

          {/* Stats */}
          <div
            className="flex items-center gap-4 text-sm animate-fade-in"
            style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
          >
            <div className="flex items-center gap-1 group/music">
              <Music className="h-4 w-4 text-muted-foreground group-hover/music:scale-110 transition-transform duration-300" />
              <span>{service.songCount} songs</span>
            </div>
            <div className="flex items-center gap-1 group/users">
              <Users className="h-4 w-4 text-muted-foreground group-hover/users:scale-110 transition-transform duration-300" />
              <span>
                {service.attendees} {service.status === "scheduled" ? "expected" : "attended"}
              </span>
            </div>
          </div>

          {/* Playlist Link */}
          <div
            className="p-3 bg-muted/50 rounded-lg animate-slide-in-up"
            style={{ animationDelay: `${index * 0.1 + 0.6}s` }}
          >
            <Link
              href={`/fellowship1/shared_music/playlists/${service.playlistId}`}
              className="text-sm font-medium hover:underline flex items-center gap-2 transition-all-smooth hover:text-primary group/playlist"
            >
              <Music className="h-4 w-4 group-hover/playlist:scale-110 transition-transform duration-300" />
              {service.playlistTitle}
            </Link>
          </div>

          {/* Actions */}
          <div className="flex gap-2 animate-slide-in-up" style={{ animationDelay: `${index * 0.1 + 0.7}s` }}>
            <Button
              asChild
              size="sm"
              className="flex-1 hover-lift transition-all-smooth group/view"
              onClick={() => handleViewDetails(service.id, service.title)}
            >
              <Link href={`/fellowship1/shared_music/services/${service.id}`}>
                <Eye className="h-4 w-4 mr-2 group-hover/view:scale-110 transition-transform duration-300" />
                View Details
              </Link>
            </Button>
            {service.status === "scheduled" && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="hover-lift transition-all-smooth group/start bg-transparent"
                onClick={() => handleStartService(service.id, service.title)}
              >
                <Link href={`/fellowship1/shared_music/services/${service.id}/present`}>
                  <Play className="h-4 w-4 mr-2 group-hover/start:scale-110 transition-transform duration-300" />
                  Start Service
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-slide-in-left">
        <div>
          <h1 className="text-3xl font-bold mb-2">Services</h1>
          <p className="text-muted-foreground">Manage and coordinate worship services</p>
        </div>
        <Button asChild className="hover-lift transition-all-smooth group">
          <Link href="/fellowship1/shared_music/services/create">
            <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
            Schedule Service
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-8 animate-slide-in-right">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors duration-300" />
        <Input
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 transition-all-smooth focus:scale-[1.02] focus:shadow-lg"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-slide-in-up">
        <TabsList className="mb-6 transition-all-smooth">
          <TabsTrigger value="upcoming" className="transition-all-smooth hover:scale-105 data-[state=active]:scale-105">
            Upcoming ({filteredUpcoming.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="transition-all-smooth hover:scale-105 data-[state=active]:scale-105">
            Past ({filteredPast.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpcoming.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
          {filteredUpcoming.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-bounce-gentle" />
              <h3 className="text-lg font-medium mb-2">No upcoming services found</h3>
              <p className="text-muted-foreground">Schedule a new service to get started</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPast.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
          {filteredPast.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-bounce-gentle" />
              <h3 className="text-lg font-medium mb-2">No past services found</h3>
              <p className="text-muted-foreground">Past services will appear here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

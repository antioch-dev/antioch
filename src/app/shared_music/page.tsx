import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Music, Users, Calendar, Heart, TrendingUp, Clock, Star } from "lucide-react"

// Mock data for recent songs and upcoming services
const recentSongs = [
  { id: 1, title: "Amazing Grace", artist: "Traditional", category: "Hymn", plays: 1250 },
  { id: 2, title: "How Great Thou Art", artist: "Carl Boberg", category: "Worship", plays: 980 },
  { id: 3, title: "Blessed Be Your Name", artist: "Matt Redman", category: "Contemporary", plays: 756 },
  { id: 4, title: "Holy, Holy, Holy", artist: "Reginald Heber", category: "Hymn", plays: 654 },
]

const upcomingServices = [
  { id: 1, title: "Sunday Morning Worship", date: "Dec 15, 2024", time: "10:00 AM", songsCount: 8 },
  { id: 2, title: "Christmas Eve Service", date: "Dec 24, 2024", time: "7:00 PM", songsCount: 12 },
  { id: 3, title: "New Year Service", date: "Dec 31, 2024", time: "11:00 PM", songsCount: 6 },
]

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to ChurchSong
        </h1>
        <p className="text-xl text-muted-foreground mb-8 animate-slide-in-right">
          Your platform for sharing and coordinating worship songs
        </p>
        <div className="flex gap-4 justify-center animate-slide-in-left">
          <Button asChild size="lg" className="hover-lift transition-all-smooth group">
            <Link href="/songs">
              <Music className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Browse Songs
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="hover-lift transition-all-smooth group bg-transparent">
            <Link href="/playlists/create">
              <Heart className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Create Playlist
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card className="hover-lift transition-all-smooth stagger-item group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Songs</CardTitle>
            <Music className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:text-blue-600 transition-colors duration-300">1,247</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +12 this week
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift transition-all-smooth stagger-item group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground group-hover:text-green-500 group-hover:scale-110 transition-all duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:text-green-600 transition-colors duration-300">342</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +23 this month
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift transition-all-smooth stagger-item group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Playlists</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground group-hover:text-red-500 group-hover:scale-110 transition-all duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:text-red-600 transition-colors duration-300">89</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +5 this week
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift transition-all-smooth stagger-item group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground group-hover:text-purple-500 group-hover:scale-110 transition-all duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:text-purple-600 transition-colors duration-300">24</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3 text-blue-500" />
              this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Songs */}
        <Card className="hover-scale transition-all-smooth animate-slide-in-left">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Popular Songs
            </CardTitle>
            <CardDescription>Most played songs this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSongs.map((song, index) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all-smooth group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-1">
                    <Link
                      href={`/songs/${song.id}`}
                      className="font-medium hover:underline group-hover:text-blue-600 transition-colors"
                    >
                      {song.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">{song.artist}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="group-hover:scale-105 transition-transform">
                      {song.category}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                      <Music className="h-3 w-3" />
                      {song.plays} plays
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              asChild
              variant="outline"
              className="w-full mt-4 bg-transparent hover-lift transition-all-smooth group"
            >
              <Link href="/songs">
                <Music className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                View All Songs
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Services */}
        <Card className="hover-scale transition-all-smooth animate-slide-in-right">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Upcoming Services
            </CardTitle>
            <CardDescription>Scheduled worship services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingServices.map((service, index) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all-smooth group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-1">
                    <Link
                      href={`/services/${service.id}`}
                      className="font-medium hover:underline group-hover:text-blue-600 transition-colors"
                    >
                      {service.title}
                    </Link>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {service.date} at {service.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className="group-hover:scale-105 transition-transform">{service.songsCount} songs</Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button
              asChild
              variant="outline"
              className="w-full mt-4 bg-transparent hover-lift transition-all-smooth group"
            >
              <Link href="/services">
                <Calendar className="h-4 w-4 mr-2 group-hover:bounce-gentle transition-transform duration-300" />
                View All Services
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

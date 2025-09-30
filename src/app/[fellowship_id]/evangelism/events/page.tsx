import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Plus, BookOpen, Heart } from "lucide-react"
import Link from "next/link"

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Community Car Wash",
      type: "Service-Based Evangelism",
      date: "2024-01-20",
      time: "9:00 AM - 2:00 PM",
      location: "Church Parking Lot",
      volunteers: 12,
      expectedAttendees: 50,
      status: "confirmed",
      description: "Free car wash for the community with gospel conversations",
    },
    {
      id: 2,
      title: "Parenting with Purpose Seminar",
      type: "Community Seminar",
      date: "2024-01-25",
      time: "7:00 PM - 9:00 PM",
      location: "Fellowship Hall",
      volunteers: 8,
      expectedAttendees: 30,
      status: "confirmed",
      description: "Practical parenting workshop with biblical principles",
    },
    {
      id: 3,
      title: "Street Evangelism Training",
      type: "Training",
      date: "2024-01-22",
      time: "6:00 PM - 8:00 PM",
      location: "Main Sanctuary",
      volunteers: 15,
      expectedAttendees: 25,
      status: "planning",
      description: "Equip members with conversational evangelism tools",
    },
    {
      id: 4,
      title: "Grocery Giveaway",
      type: "Service-Based Evangelism",
      date: "2024-01-27",
      time: "10:00 AM - 1:00 PM",
      location: "Community Center",
      volunteers: 20,
      expectedAttendees: 100,
      status: "confirmed",
      description: "Free groceries for families in need with prayer opportunities",
    },
  ]

  const evangelismMethods = [
    {
      method: "Street Evangelism",
      description: "Conversational tools like '3 Circles' and 'Knowing God Personally'",
      icon: Users,
      nextTraining: "Jan 22, 2024",
      volunteers: 15,
    },
    {
      method: "Service-Based Outreach",
      description: "Car washes, grocery giveaways, community seminars",
      icon: Heart,
      nextEvent: "Jan 20, 2024",
      volunteers: 32,
    },
    {
      method: "Digital Outreach",
      description: "Social media campaigns, YouTube testimonies, podcasts",
      icon: BookOpen,
      activecampaigns: 3,
      volunteers: 8,
    },
  ]

  const eventTemplates = [
    {
      name: "Community Car Wash",
      type: "Service-Based",
      duration: "5 hours",
      volunteers: "10-15",
      materials: ["Soap", "Towels", "Gospel tracts", "QR codes"],
    },
    {
      name: "Parenting Seminar",
      type: "Educational",
      duration: "2 hours",
      volunteers: "5-8",
      materials: ["Workbooks", "Childcare", "Refreshments"],
    },
    {
      name: "Street Evangelism",
      type: "Direct Outreach",
      duration: "3 hours",
      volunteers: "8-12",
      materials: ["Training materials", "Conversation guides", "Tracts"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Evangelism Events</h1>
              <p className="text-gray-600">Plan and manage community outreach activities</p>
            </div>
            <Link href="/events/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="methods">Evangelism Methods</TabsTrigger>
            <TabsTrigger value="templates">Event Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription>{event.type}</CardDescription>
                      </div>
                      <Badge variant={event.status === "confirmed" ? "default" : "secondary"}>{event.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{event.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        {event.volunteers} volunteers • {event.expectedAttendees} expected attendees
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Manage Volunteers
                      </Button>
                      <Button size="sm">Edit Event</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="methods" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {evangelismMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg">{method.method}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{method.description}</p>

                      <div className="space-y-2 mb-4">
                        {method.nextTraining && (
                          <p className="text-sm">
                            <strong>Next Training:</strong> {method.nextTraining}
                          </p>
                        )}
                        {method.nextEvent && (
                          <p className="text-sm">
                            <strong>Next Event:</strong> {method.nextEvent}
                          </p>
                        )}
                        {method.activecampaigns && (
                          <p className="text-sm">
                            <strong>Active Campaigns:</strong> {method.activecampaigns}
                          </p>
                        )}
                        <p className="text-sm">
                          <strong>Volunteers:</strong> {method.volunteers}
                        </p>
                      </div>

                      <Button size="sm" className="w-full">
                        Manage Method
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Templates</CardTitle>
                <CardDescription>Pre-configured event types for quick setup</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {eventTemplates.map((template, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">{template.name}</h3>
                      <div className="space-y-1 text-sm text-gray-600 mb-4">
                        <p>
                          <strong>Type:</strong> {template.type}
                        </p>
                        <p>
                          <strong>Duration:</strong> {template.duration}
                        </p>
                        <p>
                          <strong>Volunteers:</strong> {template.volunteers}
                        </p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1">Materials needed:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.materials.map((material, materialIndex) => (
                            <Badge key={materialIndex} variant="secondary" className="text-xs">
                              {material}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button size="sm" className="w-full">
                        Use Template
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

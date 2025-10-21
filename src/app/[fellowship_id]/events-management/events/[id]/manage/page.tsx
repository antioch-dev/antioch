"use client"

import { useState, useEffect } from "react"
import { EventForm } from "@/components/admin/event-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventsTable } from "@/components/admin/events-table"
import { Badge } from "@/components/ui/badge"
import { Settings, Users, BarChart3, Plus, ArrowLeft, Sparkles, TrendingUp, Calendar, CheckCircle } from "lucide-react"
import { type Event, mockAPI, mockFellowships } from "@/lib/mock-data"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"

type NewEventRequiredFields = 'title' | 'description' | 'startDate' | 'endDate' | 'location' | 'coverImage' | 'isHybrid' | 'onlineLinks' | 'paymentRequired' | 'price' | 'bankDetails' | 'registrationEnabled';
type EventCreateData = Pick<Event, NewEventRequiredFields> & Partial<Event>
type EventManagePageProps = {
    params: {
        fellowship: string
        id: string
    }
}

export default function EventManagePage({ params }: EventManagePageProps) {
    const [event, setEvent] = useState<Event | null>(null)
    const [allEvents, setAllEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [activeTab, setActiveTab] = useState("overview")
    const [showEventForm, setShowEventForm] = useState(false)
    const [editingEvent, setEditingEvent] = useState<Event | null>(null)
    const router = useRouter()
    const fellowship = mockFellowships.find((f) => f.slug === params.fellowship)

    if (!fellowship) {
        notFound()
    }
    useEffect(() => {
        const loadData = async () => {
            try {
                const [rawEvent, rawEvents] = await Promise.all([
                    mockAPI.getEventById(params.id),
                    mockAPI.getEventsByFellowship(params.fellowship),
                ])
                const fetchedEvent = (rawEvent && typeof rawEvent === "object") ? (rawEvent as Event) : null
                const fetchedEvents = Array.isArray(rawEvents) ? (rawEvents as Event[]) : []

                if (!fetchedEvent || fetchedEvent.fellowship !== params.fellowship) {
                    if (params.id === 'create' && !fetchedEvent) {
                        setLoading(false);
                        return; 
                    }
                    notFound()
                }
                setEvent(fetchedEvent)
                setAllEvents(fetchedEvents)
            } catch (error) {
                console.error("Failed to load data:", error)
                notFound()
            } finally {
                setLoading(false)
            }
        }
        void loadData()
    }, [params.id, params.fellowship])

    const handleSaveEvent = async (eventData: Partial<Event>) => {
        setSaving(true)
        try {
            // Mock save operation
            await new Promise((resolve) => setTimeout(resolve, 1000))
            let newId = params.id 
            if (editingEvent) {
                const updatedEvent = { ...editingEvent, ...eventData } as Event
                setAllEvents((prev: Event[]) => prev.map((e) => (e.id === editingEvent.id ? updatedEvent : e))) 
                if (event?.id === editingEvent.id) {
                    setEvent(updatedEvent)
                }
            } else {
                // CREATE NEW EVENT LOGIC
                newId = Date.now().toString()
                const newEvent: Event = Object.assign(
                    {
                        fellowship: params.fellowship,
                        status: "upcoming",
                        materials: [], // Always initialize to an empty array if not in eventData
                        id: newId,
                        title: '',
                        description: '',
                        startDate: '',
                        endDate: '',
                        location: '',
                        coverImage: '',
                        isHybrid: false,
                        onlineLinks: '',
                        paymentRequired: false,
                        price: 0,
                        bankDetails: '',
                        registrationEnabled: false,
                    },
                    eventData // 2. Overwrite with user-provided partial data
                ) as Event;

                setAllEvents((prev: Event[]) => [newEvent, ...prev])
                router.push(`/${params.fellowship}/events-management/events/${newId}/manage`)
            }
            setShowEventForm(false)
            setEditingEvent(null)
        } catch (error) {
            console.error("Failed to save event:", error)
        } finally {
            setSaving(false)
        }
    }
    const handleEditEvent = (eventToEdit: Event) => {
        setEditingEvent(eventToEdit)
        setShowEventForm(true)
    }
    const handleDeleteEvent = async (eventId: string) => {
        if (confirm("Are you sure you want to delete this event?")) {
            try {
                // Mock delete operation
                await new Promise((resolve) => setTimeout(resolve, 500))
                setAllEvents((prev: Event[]) => prev.filter((e) => e.id !== eventId))
                if (event?.id === eventId) {
                    router.push(`/${params.fellowship}/events-management/events`)
                }
            } catch (error) {
                console.error("Failed to delete event:", error)
            }
        }
    }
    const handleCreateEvent = () => {
        setEditingEvent(null)
        setShowEventForm(true)
    }
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="animate-pulse space-y-6">

                    <div className="h-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-2xl"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="h-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-xl"
                            ></div>
                        ))}
                    </div>
                    <div className="h-96 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-2xl"></div>
                </div>
            </div>
        )
    }
    if (!event && params.id !== 'create') {
        return notFound()
    }
    if (showEventForm) {
       return (
        <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => setShowEventForm(false)}
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl h-12 px-4 transition-all duration-200"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Management
                    </Button>
                </div>
                <EventForm
                    event={editingEvent || undefined} 
                    onSave={handleSaveEvent}
                    onCancel={() => setShowEventForm(false)}
                    isLoading={saving}
                />
            </div>
        )
    }

    const registrationCount = 12 // Mock data
    const checkedInCount = 8 // Mock data
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="relative mb-8 p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-100 dark:border-gray-700 shadow-lg">
                <div className="relative">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex items-center">
                            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mr-6 shadow-lg">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                    Event Management
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 text-lg">
                                    Manage events for{" "}
                                    <span className="font-semibold text-blue-600 dark:text-blue-400">{fellowship.name}</span>
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={handleCreateEvent}
                            className="h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Create Event
                        </Button>
                    </div>
                </div>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-2 shadow-lg">
                    <TabsTrigger
                        value="overview"
                        className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-200"
                    >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Overview
                    </TabsTrigger>
                    <TabsTrigger
                        value="current"
                        className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-200"
                    >
                        <Calendar className="w-4 h-4 mr-2" />
                        Current Event
                    </TabsTrigger>
                    <TabsTrigger
                        value="all"
                        className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-200"
                    >
                        <Settings className="w-4 h-4 mr-2" />
                        All Events
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Total Events
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">{allEvents.length}</div>
                                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">All time</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-semibold text-green-600 dark:text-green-400 flex items-center">
                                    <TrendingUp className="w-4 h-4 mr-2" />
                                    Upcoming
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                                    {allEvents.filter((e) => e.status === "upcoming").length}
                                </div>
                                <p className="text-xs text-green-600 dark:text-green-400 mt-1">Ready to go</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-semibold text-red-600 dark:text-red-400 flex items-center">
                                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                                    Live Now
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-red-700 dark:text-red-300">
                                    {allEvents.filter((e) => e.status === "live").length}
                                </div>
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">In progress</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Completed
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                                    {allEvents.filter((e) => e.status === "ended").length}
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Finished</p>
                            </CardContent>
                        </Card>
                    </div>
                    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <CardHeader className="pb-6">
                            <CardTitle className="flex items-center text-xl">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
                                    <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                Recent Events
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <EventsTable
                                events={allEvents.slice(0, 5)}
                                fellowshipSlug={params.fellowship}
                                onEdit={handleEditEvent}
                                onDelete={handleDeleteEvent}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="current" className="space-y-6">
                    {/* Current Event Details */}
                    {!event ? (
                        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Settings className="w-5 h-5 mr-2" />
                                        No current event selected
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button onClick={handleCreateEvent} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-xl h-10 px-4">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create Event
                                        </Button>
                                    </div>

                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 dark:text-gray-400">There is no event loaded for this tab. Create a new event or open an existing one to view details.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Settings className="w-5 h-5 mr-2" />
                                        {event.title}

                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge
                                            variant={event.status === "live" ? "destructive" : "secondary"}
                                            className={
                                                event.status === "live"
                                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                    : event.status === "upcoming"
                                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                            }
                                        >
                                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                        </Badge>
                                        <Button variant="outline" onClick={() => handleEditEvent(event)} className="bg-transparent">
                                            <Settings className="w-4 h-4 mr-2" />
                                            Edit Event
                                        </Button>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                Registrations
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{registrationCount}</div>

                                            <p className="text-sm text-gray-500 dark:text-gray-400">Total registered</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Checked In</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-green-600">{checkedInCount}</div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Present at event</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Attendance</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-blue-600">
                                                {Math.round((checkedInCount / registrationCount) * 100)}%
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Attendance rate</p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push(`/${params.fellowship}/events-management/events/${event.id}/registrations`)}
                                        className="bg-transparent"
                                    >
                                        <Users className="w-4 h-4 mr-2" />
                                        Manage Registrations
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push(`/${params.fellowship}/events-management/events/${event.id}/checkin`)}
                                        className="bg-transparent"
                                    >
                                        <Settings className="w-4 h-4 mr-2" />
                                        Check-in Management
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
                <TabsContent value="all" className="space-y-6">
                    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <BarChart3 className="w-5 h-5 mr-2" />
                                    All Events
                                </div>
                                <Button
                                    onClick={handleCreateEvent} 
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-xl h-12 px-6"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Event
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <EventsTable
                                events={allEvents}
                                fellowshipSlug={params.fellowship}
                                onEdit={handleEditEvent}
                                onDelete={handleDeleteEvent}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
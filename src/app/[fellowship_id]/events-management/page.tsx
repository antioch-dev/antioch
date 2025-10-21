"use client"

import { useState, useEffect, type SetStateAction } from "react"
import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus, Calendar } from "lucide-react"
import { type Event, mockFellowships } from "@/lib/mock-data"
import { notFound } from "next/navigation"

const mockAPI = {
  getEventsByFellowship: async (fellowshipSlug: string): Promise<Event[]> => {

    await new Promise((res) => setTimeout(res, 200))
    interface Fellowship {
      slug: string
      events?: Event[]
    }

    await new Promise<void>((res) => setTimeout(res, 200))
    return ((mockFellowships as Fellowship[]).find((f) => f.slug === fellowshipSlug)?.events ?? [])
  },
}

interface EventsPageProps {
  params: { fellowship: string }
}

export default function EventsPage({ params }: EventsPageProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  interface Fellowship {
    id: string
    name: string
    slug: string
    events?: Event[]
  }

  const fellowship: Fellowship | undefined = (mockFellowships as Fellowship[]).find(
    (f) => f.slug === params.fellowship,
  )

  if (!fellowship) {
    notFound()
  }

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await mockAPI.getEventsByFellowship(params.fellowship)
        setEvents(fetchedEvents)
        setFilteredEvents(fetchedEvents)
      } catch (error) {
        console.error("Failed to load events:", error)
      } finally {
        setLoading(false)
      }
    }

    void loadEvents()
  }, [params.fellowship])

  useEffect(() => {
    let filtered = events

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((event) => event.status === statusFilter)
    }

    setFilteredEvents(filtered)
  }, [events, searchTerm, statusFilter])

  const eventCounts = {
    all: events.length,
    upcoming: events.filter((e) => e.status === "upcoming").length,
    live: events.filter((e) => e.status === "live").length,
    ended: events.filter((e) => e.status === "ended").length,
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(null).map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Events</h1>
          <p className="text-gray-600 dark:text-gray-300">Discover and join upcoming events at {fellowship.name}</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            onClick={() => (window.location.href = `/${params.fellowship}/events/create`)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-xl h-12 px-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{eventCounts.all}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Events</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600">{eventCounts.upcoming}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Upcoming</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-red-600">{eventCounts.live}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Live Now</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-600">{eventCounts.ended}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Ended</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e: { target: { value: SetStateAction<string> } }) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white dark:bg-gray-800"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-white dark:bg-gray-800">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events ({eventCounts.all})</SelectItem>
            <SelectItem value="upcoming">Upcoming ({eventCounts.upcoming})</SelectItem>
            <SelectItem value="live">Live ({eventCounts.live})</SelectItem>
            <SelectItem value="ended">Ended ({eventCounts.ended})</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No events found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "There are no events scheduled at the moment."}
          </p>
          {!searchTerm && statusFilter === "all" && (
            <Button
              onClick={() => (window.location.href = `/${params.fellowship}/events-management/events/create`)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-xl h-12 px-6"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Event
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} fellowshipSlug={params.fellowship} />
          ))}
        </div>
      )}
    </div>
  )
}
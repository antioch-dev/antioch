"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { EventStatusBadge } from "@/components/event-status-badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Edit, Trash2, Eye, Users, Settings, Filter, SortAsc } from "lucide-react"
import type { Event } from "@/lib/mock-data"
import { useRouter } from "next/navigation"

interface EventsTableProps {
  events: Event[]
  fellowshipSlug: string
  onEdit: (event: Event) => void
  onDelete: (eventId: string) => void
}

export function EventsTable({ events, fellowshipSlug, onEdit, onDelete }: EventsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "title" | "status">("date")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const router = useRouter()

  const filteredAndSortedEvents = events
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterStatus === "all" || event.status === filterStatus
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        case "title":
          return a.title.localeCompare(b.title)
        case "status":
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleViewEvent = (eventId: string) => {
    router.push(`/${fellowshipSlug}/events/${eventId}`)
  }

  const handleManageRegistrations = (eventId: string) => {
    router.push(`/${fellowshipSlug}/events/${eventId}/registrations`)
  }

  const handleManageCheckin = (eventId: string) => {
    router.push(`/${fellowshipSlug}/events/${eventId}/checkin`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search events by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-white dark:bg-gray-800 transition-all duration-200"
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-12 px-4 border-2 border-gray-200 hover:border-gray-300 rounded-xl bg-white dark:bg-gray-800 transition-all duration-200"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => setFilterStatus("all")}
                className={filterStatus === "all" ? "bg-blue-50 dark:bg-blue-900/20" : ""}
              >
                All Events
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilterStatus("upcoming")}
                className={filterStatus === "upcoming" ? "bg-blue-50 dark:bg-blue-900/20" : ""}
              >
                Upcoming
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilterStatus("live")}
                className={filterStatus === "live" ? "bg-blue-50 dark:bg-blue-900/20" : ""}
              >
                Live
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilterStatus("ended")}
                className={filterStatus === "ended" ? "bg-blue-50 dark:bg-blue-900/20" : ""}
              >
                Ended
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-12 px-4 border-2 border-gray-200 hover:border-gray-300 rounded-xl bg-white dark:bg-gray-800 transition-all duration-200"
              >
                <SortAsc className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => setSortBy("date")}
                className={sortBy === "date" ? "bg-blue-50 dark:bg-blue-900/20" : ""}
              >
                Sort by Date
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("title")}
                className={sortBy === "title" ? "bg-blue-50 dark:bg-blue-900/20" : ""}
              >
                Sort by Title
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("status")}
                className={sortBy === "status" ? "bg-blue-50 dark:bg-blue-900/20" : ""}
              >
                Sort by Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="border-0 rounded-2xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <TableHead className="font-semibold text-gray-700 dark:text-gray-300 py-4">Event</TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-gray-300 py-4">Date & Time</TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-gray-300 py-4">Location</TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-gray-300 py-4">Status</TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-gray-300 py-4">Type</TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-gray-300 py-4">Registration</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300 py-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                      {searchTerm || filterStatus !== "all"
                        ? "No events found matching your criteria."
                        : "No events created yet."}
                    </p>
                    {(searchTerm || filterStatus !== "all") && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchTerm("")
                          setFilterStatus("all")
                        }}
                        className="mt-2"
                      >
                        Clear filters
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedEvents.map((event, index) => (
                <TableRow
                  key={event.id}
                  className="hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-200 group border-b border-gray-100 dark:border-gray-700"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="py-4">
                    <div className="space-y-1">
                      <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {event.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{event.description}</div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="text-sm space-y-1">
                      <div className="font-medium text-gray-900 dark:text-white">{formatDate(event.startDate)}</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {formatTime(event.startDate)} - {formatTime(event.endDate)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">{event.location}</div>
                  </TableCell>
                  <TableCell className="py-4">
                    <EventStatusBadge status={event.status} />
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col space-y-1">
                      {event.isHybrid && (
                        <Badge
                          variant="secondary"
                          className="text-xs w-fit bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                        >
                          Hybrid
                        </Badge>
                      )}
                      {event.paymentRequired && (
                        <Badge
                          variant="outline"
                          className="text-xs w-fit border-yellow-300 text-yellow-700 dark:border-yellow-600 dark:text-yellow-400"
                        >
                          Paid
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      variant={event.registrationEnabled ? "default" : "secondary"}
                      className={`text-xs font-medium ${
                        event.registrationEnabled
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {event.registrationEnabled ? "Open" : "Closed"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem
                          onClick={() => handleViewEvent(event.id)}
                          className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <Eye className="w-4 h-4 mr-2 text-blue-500" />
                          View Event
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onEdit(event)}
                          className="hover:bg-green-50 dark:hover:bg-green-900/20"
                        >
                          <Edit className="w-4 h-4 mr-2 text-green-500" />
                          Edit Event
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleManageRegistrations(event.id)}
                          className="hover:bg-purple-50 dark:hover:bg-purple-900/20"
                        >
                          <Users className="w-4 h-4 mr-2 text-purple-500" />
                          Manage Registrations
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleManageCheckin(event.id)}
                          className="hover:bg-orange-50 dark:hover:bg-orange-900/20"
                        >
                          <Settings className="w-4 h-4 mr-2 text-orange-500" />
                          Check-in Management
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(event.id)}
                          className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Event
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {filteredAndSortedEvents.length > 0 && (
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Showing {filteredAndSortedEvents.length} of {events.length} events
        </div>
      )}
    </div>
  )
}

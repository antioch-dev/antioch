"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EventStatusBadge } from "@/components/event-status-badge"
import { Calendar, MapPin, Users, DollarSign, Wifi } from "lucide-react"
import type { Event } from "@/lib/mock-data"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface EventCardProps {
  event: Event
  fellowshipSlug: string
}

export function EventCard({ event, fellowshipSlug }: EventCardProps) {
  const router = useRouter()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleViewDetails = () => {
    router.push(`/${fellowshipSlug}/events/${event.id}`)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer border hover:border-blue-300 dark:hover:border-blue-600">
      <CardHeader className="p-0">
        {event.coverImage && (
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
            <Image
              src={event.coverImage || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4">
              <EventStatusBadge status={event.status} />
            </div>
            {event.isHybrid && (
              <div className="absolute top-4 right-4">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  <Wifi className="w-3 h-3 mr-1" />
                  Hybrid
                </Badge>
              </div>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {event.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">{event.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4 mr-2" />
              <span>
                {formatDate(event.startDate)} at {formatTime(event.startDate)}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{event.location}</span>
            </div>
            {event.paymentRequired && (
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <DollarSign className="w-4 h-4 mr-2" />
                <span>¥{event.price} CNY</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2">
              {event.materials.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  {event.materials.length} Materials
                </Badge>
              )}
              {event.registrationEnabled && (
                <Badge variant="outline" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  Registration Open
                </Badge>
              )}
            </div>
            <Button
              onClick={handleViewDetails}
              variant="outline"
              size="sm"
              className="group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all duration-300 bg-transparent"
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

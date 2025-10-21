"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { EventStatusBadge } from "@/components/event-status-badge"
import { CountdownTimer } from "@/components/countdown-timer"
import { Calendar, MapPin, Users, DollarSign, Wifi, FileText, Download, CreditCard } from "lucide-react"
import { type Event, mockAPI, mockFellowships } from "@/lib/mock-data"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import Image from "next/image"

interface EventDetailsPageProps {
  params: { fellowship: string; id: string }
}

export default function EventDetailsPage({ params }: EventDetailsPageProps) {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fellowship = mockFellowships.find((f) => f.slug === params.fellowship)

  if (!fellowship) {
    notFound()
  }

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const fetchedEvent = await mockAPI.getEventById(params.id)
        if (!fetchedEvent || fetchedEvent.fellowship !== params.fellowship) {
          notFound()
        }
        setEvent(fetchedEvent)
      } catch (error) {
        console.error("Failed to load event:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }
    void loadEvent()
  }, [params.id, params.fellowship])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
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

  const handleRegister = () => {
    router.push(`/${params.fellowship}/events-management/events/${params.id}/register`)
  }

  const handleJoinLive = () => {
    router.push(`/${params.fellowship}/events-management/events/${params.id}/live`)
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  if (!event) {
    return notFound()
  }

  const isEventLive = event.status === "live"
  const isEventUpcoming = event.status === "upcoming"
  const showCountdown = isEventUpcoming && event.isHybrid

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Event Header */}
      <div className="mb-8">
        {event.coverImage && (
          <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-lg mb-6">
            <Image src={event.coverImage || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-6 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <EventStatusBadge status={event.status} />
                  {event.isHybrid && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <Wifi className="w-3 h-3 mr-1" />
                      Hybrid Event
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
                <p className="text-lg opacity-90">{event.description}</p>
              </div>
            </div>
          </div>
        )}

        {!event.coverImage && (
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <EventStatusBadge status={event.status} />
              {event.isHybrid && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  <Wifi className="w-3 h-3 mr-1" />
                  Hybrid Event
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{event.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">{event.description}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Countdown Timer */}
          {showCountdown && <CountdownTimer targetDate={event.startDate} title="Event starts in:" />}

          {/* Event Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Event Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{formatDate(event.startDate)}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {formatTime(event.startDate)} - {formatTime(event.endDate)}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Location</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{event.location}</div>
                </div>
              </div>

              {event.paymentRequired && (
                <div className="flex items-start space-x-3">
                  <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Registration Fee</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">¥{event.price} CNY</div>
                  </div>
                </div>
              )}

              {event.isHybrid && (
                <div className="flex items-start space-x-3">
                  <Wifi className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Online Access</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Live stream available for registered members
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Event Materials */}
          {event.materials.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Event Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {event.materials.map((material) => (
                    <div
                      key={material.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{material.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {material.type.toUpperCase()}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  Materials are available to registered and approved members only.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Registration Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Registration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {event.registrationEnabled ? (
                <>
                  {isEventLive && event.isHybrid ? (
                    <Button onClick={handleJoinLive} className="w-full bg-red-600 hover:bg-red-700 text-white">
                      Join Live Stream
                    </Button>
                  ) : isEventUpcoming ? (
                    <Button onClick={handleRegister} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Register Now
                    </Button>
                  ) : (
                    <Button disabled className="w-full">
                      Registration Closed
                    </Button>
                  )}

                  {event.paymentRequired && (
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <p className="font-medium mb-2">Registration includes:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Access to all sessions</li>
                        <li>Event materials</li>
                        {event.isHybrid && <li>Online live stream access</li>}
                        <li>Refreshments and meals</li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 dark:text-gray-400">Registration is currently closed</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Information */}
          {event.paymentRequired && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">¥{event.price}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Registration Fee</div>
                </div>

                <Separator />

                {event.bankDetails && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">Bank Transfer</h4>
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Account Name:</span>{" "}
                        {event.bankDetails.accountName}
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Account Number:</span>{" "}
                        {event.bankDetails.accountNumber}
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Bank:</span> {event.bankDetails.bankName}
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {event.wechatQR && (
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">WeChat Pay</div>
                      <div className="relative w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-800 rounded">
                        <Image
                          src={event.wechatQR || "/placeholder.svg"}
                          alt="WeChat QR"
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    </div>
                  )}
                  {event.alipayQR && (
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Alipay</div>
                      <div className="relative w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-800 rounded">
                        <Image
                          src={event.alipayQR || "/placeholder.svg"}
                          alt="Alipay QR"
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  After payment, please upload your receipt during registration for approval.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
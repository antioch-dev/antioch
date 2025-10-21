"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChatPanel } from "@/components/live-stream/chat-panel"
import { MaterialsPanel } from "@/components/live-stream/materials-panel"
import { Radio, MessageCircle, FileText, ExternalLink, AlertCircle, CheckCircle } from "lucide-react"
import {
    type Event,
    type ChatMessage,
    type EventMaterial,
    type Registration,
    mockAPI,
    mockFellowships,
} from "@/lib/mock-data"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"


export default function LiveStreamPage({ params }: { params: { fellowship: string; id: string } }) {
    const [event, setEvent] = useState<Event | null>(null)
    const [registration, setRegistration] = useState<Registration | null>(null)
    const [loading, setLoading] = useState(true)
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
    const [activeTab, setActiveTab] = useState("chat")
    const [previewMaterial, setPreviewMaterial] = useState<EventMaterial | null>(null)
    const [hasAccess, setHasAccess] = useState(false)
    const router = useRouter()

    const fellowship = mockFellowships.find((f) => f.slug === params.fellowship)

    if (!fellowship) {
        notFound()
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const [fetchedEvent, registrations, messages] = await Promise.all([
                    mockAPI.getEventById(params.id),
                    mockAPI.getRegistrationsByEvent(params.id),
                    mockAPI.getChatMessages(params.id),
                ])

                if (!fetchedEvent || fetchedEvent.fellowship !== params.fellowship) {
                    notFound()
                }

                setEvent(fetchedEvent)
                setChatMessages(messages)
                const userRegistration = registrations.find((reg) => reg.approved && reg.memberName === "John Smith") // Mock current user
                setRegistration(userRegistration || null)

                const hasValidAccess =
                    userRegistration &&
                    userRegistration.approved &&
                    (!fetchedEvent.paymentRequired || userRegistration.paymentProofURL)
                setHasAccess(!!hasValidAccess)
            } catch (error) {
                console.error("Failed to load data:", error)
                notFound()
            } finally {
                setLoading(false)
            }
        }
        void loadData()
    }, [params.id, params.fellowship])

    // Mock real-time chat updates
    useEffect(() => {
        if (!hasAccess) return

        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const mockUsers = ["Pastor David", "Mary Wilson", "James Lee", "Lisa Zhang", "Sarah Johnson", "Michael Chen"]
                const mockMessages = [
                    "Amen to that!",
                    "Thank you for this message",
                    "Praying for everyone here",
                    "God bless you all",
                    "This is so encouraging",
                    "Can we get the slides?",
                    "Beautiful worship today",
                    "Grateful to be here",
                ]

                const newMessage: ChatMessage = {
                    id: Date.now().toString(),
                    user: mockUsers[Math.floor(Math.random() * mockUsers.length)] ?? "Anonymous",
                    message: mockMessages[Math.floor(Math.random() * mockMessages.length)] ?? "",
                    timestamp: new Date().toISOString(),
                    eventId: params.id,
                }

                setChatMessages((prev) => [...prev, newMessage])
            }
        }, 5000) 

        return () => clearInterval(interval)
    }, [hasAccess, params.id])

    const handleSendMessage = async (message: string) => {
        try {
            const newMessage = await mockAPI.sendChatMessage(params.id, registration?.memberName || "Anonymous", message)
            setChatMessages((prev) => [...prev, newMessage])
        } catch (error) {
            console.error("Failed to send message:", error)
        }
    }

    const handleDownloadMaterial = (material: EventMaterial) => {
        // Mock download functionality
        const link = document.createElement("a")
        link.href = material.url
        link.download = material.name
        link.click()
        alert(`Downloading: ${material.name}`)
    }

    const handlePreviewMaterial = (material: EventMaterial) => {
        setPreviewMaterial(material)
    }

    const getStreamUrl = () => {
        const url = event?.onlineLinks?.[0]
        if (!url || typeof url !== "string") return null
        let videoId: string | null = null
        if (url.includes("youtube.com/watch?v=")) {
            videoId = url.split("v=")[1]?.split("&")[0] ?? null
        } else if (url.includes("youtu.be/")) {
            videoId = url.split("youtu.be/")[1]?.split("?")[0] ?? null
        }

        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : url
    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                    <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
        )
    }

    if (!event) {
        return notFound()
    }

    if (!hasAccess) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-8">
                <Card>
                    <CardContent className="text-center py-12">
                        <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Access Restricted</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            You need to be registered and approved to access the live stream for this event.
                        </p>

                        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Requirements:</h3>
                            <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1 text-left">
                                <li>• Must be registered for the event</li>
                                <li>• Registration must be approved by admin</li>
                                {event.paymentRequired && <li>• Payment must be completed and verified</li>}
                                <li>• Event must be currently live</li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button
                                onClick={() => router.push(`/${params.fellowship}/events-management/events/${params.id}/register`)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Register for Event
                            </Button>
                            <Button
                                onClick={() => router.push(`/${params.fellowship}/events-management/events/${params.id}`)}
                                variant="outline"
                                className="bg-transparent"
                            >
                                Back to Event Details
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const streamUrl = getStreamUrl()

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h1>
                        <div className="flex items-center space-x-4">
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 animate-pulse">
                                <Radio className="w-3 h-3 mr-1" />
                                LIVE
                            </Badge>
                            <span className="text-gray-600 dark:text-gray-300">Welcome, {registration?.memberName}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 md:mt-0">
                        <Button
                            onClick={() => router.push(`/${params.fellowship}/events-management/events`)}
                            variant="outline"
                            className="bg-transparent"
                        >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Back to Events
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Stream Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Video Player */}
                    <Card>
                        <CardContent className="p-0">
                            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                                {streamUrl ? (
                                    <iframe
                                        src={streamUrl}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Live Stream"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-white">
                                        <div className="text-center">
                                            <Radio className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                            <h3 className="text-xl font-semibold mb-2">Stream Not Available</h3>
                                            <p className="text-gray-300">The live stream will begin shortly.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stream Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                                You&apos;re Connected 
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500 dark:text-gray-400">Status:</span>
                                    <div className="font-semibold text-green-600">Live & Connected</div>
                                </div>
                                <div>
                                    <span className="text-gray-500 dark:text-gray-400">Quality:</span>
                                    <div className="font-semibold">HD 1080p</div>
                                </div>
                                <div>
                                    <span className="text-gray-500 dark:text-gray-400">Viewers:</span>
                                    <div className="font-semibold">{Math.floor(Math.random() * 200) + 50} watching</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[600px] flex flex-col">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="chat" className="flex items-center">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Chat
                            </TabsTrigger>
                            <TabsTrigger value="materials" className="flex items-center">
                                <FileText className="w-4 h-4 mr-2" />
                                Materials ({event.materials.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="chat" className="flex-1 mt-4">
                            <ChatPanel
                                eventId={params.id}
                                messages={chatMessages}
                                onSendMessage={handleSendMessage}
                                currentUser={registration?.memberName}
                            />
                        </TabsContent>

                        <TabsContent value="materials" className="flex-1 mt-4">
                            <MaterialsPanel
                                materials={event.materials}
                                onDownload={handleDownloadMaterial}
                                onPreview={handlePreviewMaterial}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Material Preview Dialog */}
            <Dialog open={!!previewMaterial} onOpenChange={() => setPreviewMaterial(null)}>
                <DialogContent className="max-w-4xl max-h-[80vh]">
                    <DialogHeader>
                        <DialogTitle>{previewMaterial?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded">
                        <div className="text-center">
                            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 dark:text-gray-300">Preview not available</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Click download to access the file</p>
                            <Button
                                onClick={() => previewMaterial && handleDownloadMaterial(previewMaterial)}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Download File
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
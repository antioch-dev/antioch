"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Users, Heart, MessageCircle, ThumbsUp, BookOpen, Calendar, Share2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSharedVerses, fellowships, type SharedVerse } from "@/lib/fellowship-data"

export default function FellowshipPage() {
  const [sharedVerses, setSharedVerses] = useState<SharedVerse[]>([])

  useEffect(() => {
    setSharedVerses(getSharedVerses())
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "prayer":
        return <Heart className="h-4 w-4" />
      case "discussion":
        return <BookOpen className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "prayer":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            Prayer
          </Badge>
        )
      case "discussion":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Discussion
          </Badge>
        )
      case "event":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Event
          </Badge>
        )
      default:
        return <Badge variant="secondary">Post</Badge>
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Fellowship</h1>
          <p className="text-muted-foreground">Shared verses and community discussions</p>
        </div>

        <Button asChild>
          <Link href="/bible/read">
            <Plus className="h-4 w-4 mr-2" />
            Share a Verse
          </Link>
        </Button>
      </div>

      {/* Fellowship Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{fellowships.reduce((sum, f) => sum + f.memberCount, 0)}</p>
              <p className="text-sm text-muted-foreground">Total Members</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{sharedVerses.length}</p>
              <p className="text-sm text-muted-foreground">Shared Verses</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{sharedVerses.reduce((sum, v) => sum + v.likes, 0)}</p>
              <p className="text-sm text-muted-foreground">Total Likes</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{sharedVerses.reduce((sum, v) => sum + v.comments.length, 0)}</p>
              <p className="text-sm text-muted-foreground">Comments</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent">Recent Shares</TabsTrigger>
          <TabsTrigger value="fellowships">Fellowships</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>

        {/* Recent Shares */}
        <TabsContent value="recent" className="space-y-4">
          {sharedVerses.length > 0 ? (
            <div className="space-y-4">
              {sharedVerses.map((share) => (
                <Card key={share.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{getInitials(share.sharedBy)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{share.sharedBy}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              {getTypeIcon(share.sharedTo.type)}
                              <span>shared to {share.sharedTo.title}</span>
                              <span>•</span>
                              <span>{formatDate(share.dateShared)}</span>
                            </div>
                          </div>
                        </div>
                        {getTypeBadge(share.sharedTo.type)}
                      </div>

                      {/* Verse */}
                      <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                        <Badge variant="outline">{share.verseRef}</Badge>
                        <blockquote className="italic leading-relaxed">"{share.verseText}"</blockquote>
                      </div>

                      {/* Note */}
                      {share.note && (
                        <div className="space-y-2">
                          <p className="text-sm leading-relaxed">{share.note}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {share.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {share.comments.length}
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/bible/read?ref=${encodeURIComponent(share.verseRef)}`}>
                            <BookOpen className="h-4 w-4 mr-1" />
                            Read
                          </Link>
                        </Button>
                      </div>

                      {/* Comments */}
                      {share.comments.length > 0 && (
                        <div className="space-y-3 pt-2 border-t">
                          {share.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">{getInitials(comment.author)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">{comment.author}</span>
                                  <span className="text-xs text-muted-foreground">{formatDate(comment.dateAdded)}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{comment.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Share2 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No shared verses yet</h3>
                <p className="text-muted-foreground mb-4">Be the first to share a verse with your fellowship!</p>
                <Button asChild>
                  <Link href="/bible/read">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Reading & Sharing
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Fellowships */}
        <TabsContent value="fellowships" className="space-y-4">
          <div className="grid gap-4">
            {fellowships.map((fellowship) => (
              <Card key={fellowship.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{fellowship.name}</CardTitle>
                      <CardDescription>{fellowship.description}</CardDescription>
                    </div>
                    <Badge variant={fellowship.isActive ? "default" : "secondary"}>
                      {fellowship.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {fellowship.memberCount} members
                    </div>
                    <Button variant="outline" size="sm">
                      View Fellowship
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Popular */}
        <TabsContent value="popular" className="space-y-4">
          <div className="space-y-4">
            {sharedVerses
              .sort((a, b) => b.likes + b.comments.length - (a.likes + a.comments.length))
              .slice(0, 5)
              .map((share) => (
                <Card key={share.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{getInitials(share.sharedBy)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{share.sharedBy}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline">{share.verseRef}</Badge>
                              <span>•</span>
                              <span>{formatDate(share.dateShared)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{share.likes + share.comments.length} interactions</Badge>
                        </div>
                      </div>

                      <blockquote className="italic leading-relaxed bg-muted/50 p-4 rounded-lg">
                        "{share.verseText}"
                      </blockquote>

                      {share.note && <p className="text-sm text-muted-foreground">{share.note}</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, ChevronLeft, ChevronRight, BookOpen, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { dailyVerses } from "@/lib/bible-data"
import { useToast } from "@/hooks/use-toast"

export default function DailyVersePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { toast } = useToast()

  const currentVerse = dailyVerses[currentIndex]

  const handlePrevious = () => {
    if (currentIndex < dailyVerses.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleShare = async () => {
    const shareText = `"${currentVerse?.text}" - ${currentVerse?.verseRef} (${currentVerse?.translation})`
    await navigator.clipboard.writeText(shareText)
    toast({
      title: "Verse copied!",
      description: "Daily verse copied to clipboard",
    })
  }

  const handleSave = () => {
    toast({
      title: "Verse saved!",
      description: "Added to your bookmarks",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Daily Verses</h1>
        <p className="text-muted-foreground">{`Discover God's Word through daily inspiration`}</p>
      </div>

      {/* Current Daily Verse */}
      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-primary" />
            <Badge variant="secondary">{currentIndex === 0 ? "Today" : formatDate(currentVerse?.date ?? "")}</Badge>
          </div>
          <CardTitle className="text-2xl">{currentVerse?.verseRef}</CardTitle>
          <CardDescription>{currentVerse?.translation}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <blockquote className="text-xl leading-relaxed text-center italic font-medium px-4">
            `{currentVerse?.text}`
          </blockquote>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="default" asChild>
              <Link href={`/bible/read?ref=${encodeURIComponent(currentVerse?.verseRef ?? "")}`}>
                <BookOpen className="h-4 w-4 mr-2" />
                Read Chapter
              </Link>
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Verse
            </Button>
            <Button variant="outline" onClick={handleSave}>
              <Heart className="h-4 w-4 mr-2" />
              Save to Notes
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentIndex >= dailyVerses.length - 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous Day
            </Button>

            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {dailyVerses.length}
            </span>

            <Button
              variant="ghost"
              onClick={handleNext}
              disabled={currentIndex <= 0}
              className="flex items-center gap-2"
            >
              Next Day
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Past Daily Verses */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Daily Verses</CardTitle>
          <CardDescription>Browse previous daily verses for continued inspiration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {dailyVerses.map((verse, index) => (
              <div
                key={verse.date}
                className={`p-4 rounded-lg border transition-colors cursor-pointer hover:bg-muted/50 ${
                  index === currentIndex ? "bg-primary/5 border-primary/20" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={index === 0 ? "default" : "outline"}>
                        {index === 0 ? "Today" : formatDate(verse.date)}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {verse.verseRef}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">`{verse.text}`</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/bible/read?ref=${encodeURIComponent(verse.verseRef)}`}>
                      <BookOpen className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Devotional Section */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Reflection</CardTitle>
          <CardDescription>{`Thoughts on today's verse`}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p>
             {` Today's verse reminds us of the incredible depth of God's love for humanity. The word "world" in this
              passage encompasses all of creation, showing that God's love knows no boundaries or limitations.`}
            </p>
            <p>
              {`Consider how this verse speaks to both God's character and His plan for salvation. The gift of His Son
              represents the ultimate sacrifice, demonstrating love in action rather than just words.`}
            </p>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Reflection Questions:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {`How does knowing about God's love change your perspective today?`}</li>
              <li>• {`In what ways can you share this love with others?`}</li>
              <li>• {`What does "eternal life" mean to you personally?`}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

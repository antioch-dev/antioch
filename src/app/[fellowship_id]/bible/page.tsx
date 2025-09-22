"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, BookOpen, Calendar, Heart, ArrowRight, Quote, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { dailyVerses } from "@/lib/bible-data"

export default function BibleHomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const todayVerse = dailyVerses[0] // Mock today's verse

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/fellowship1/bible/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Welcome to the Bible</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
         {` Read, study, and grow in God's Word. Access multiple translations, take notes, and follow reading plans.`}
        </p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search verses, keywords, or references (e.g., John 3:16)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      {/* Daily Verse */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Quote className="h-5 w-5" />
            Verse of the Day
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <blockquote className="text-lg italic leading-relaxed">`{todayVerse?.text}`</blockquote>
          <div className="flex items-center justify-between">
            <cite className="text-sm font-medium text-muted-foreground">
              — {todayVerse?.verseRef} ({todayVerse?.translation})
            </cite>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/fellowship1/bible/daily">
                  <Sun className="h-4 w-4 mr-2" />
                  View Daily
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/fellowship1/bible/read?ref=${encodeURIComponent(todayVerse?.verseRef ?? "")}`}>Read Chapter</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/fellowship1/bible/read">
            <CardContent className="flex flex-col items-center text-center p-6 space-y-3">
              <div className="p-3 rounded-full bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Start Reading</h3>
                <p className="text-sm text-muted-foreground">Browse books and chapters</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/fellowship1/bible/plans">
            <CardContent className="flex flex-col items-center text-center p-6 space-y-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Reading Plans</h3>
                <p className="text-sm text-muted-foreground">Structured Bible reading</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" >
          <Link href="/fellowship1/bible/notes">
            <CardContent className="flex flex-col items-center text-center p-6 space-y-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">My Notes</h3>
                <p className="text-sm text-muted-foreground">Bookmarks and reflections</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/fellowship1/bible/search">
            <CardContent className="flex flex-col items-center text-center p-6 space-y-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Advanced Search</h3>
                <p className="text-sm text-muted-foreground">Find specific passages</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Popular Passages */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Passages</CardTitle>
          <CardDescription>Start with these beloved Bible passages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { ref: "John 3:16", title: "God's Love" },
              { ref: "Psalms 23", title: "The Lord's Shepherd" },
              { ref: "Romans 8:28", title: "All Things Work Together" },
              { ref: "1 Corinthians 13", title: "Love Chapter" },
              { ref: "Philippians 4:13", title: "I Can Do All Things" },
              { ref: "Jeremiah 29:11", title: "Plans to Prosper" },
            ].map((passage) => (
              <Button key={passage.ref} variant="outline" className="justify-start h-auto p-3 bg-transparent" asChild>
                <Link href={`/fellowship1/bible/read?ref=${encodeURIComponent(passage.ref)}`}>
                  <div className="text-left">
                    <div className="font-medium">{passage.ref}</div>
                    <div className="text-sm text-muted-foreground">{passage.title}</div>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

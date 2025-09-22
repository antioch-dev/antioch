"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { searchVerses, translations, books } from "@/lib/bible-data"

interface SearchResult {
  book: string
  chapter: number
  verse: number
  text: string
  ref: string
}

type SearchType = "keyword" | "phrase" | "reference"
type TestamentType = "old" | "new" | "all"

export default function BibleSearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [query, setQuery] = useState("")
  const [searchType, setSearchType] = useState<SearchType>("keyword")
  const [selectedTranslation, setSelectedTranslation] = useState("KJV")
  const [selectedTestament, setSelectedTestament] = useState<TestamentType>("all")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setHasSearched(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    let searchResults: SearchResult[] = []

    if (searchType === "reference") {
      // Handle reference search (e.g., "John 3:16")
      const refMatch = /^(\d?\s?\w+)\s+(\d+)(?::(\d+))?$/.exec(searchQuery)
      if (refMatch) {
        const [, bookName, chapter, verse] = refMatch
        // In a real app, this would fetch the specific verse
        searchResults = searchVerses(bookName ?? "").filter((result) => {
          return result.chapter === Number.parseInt(chapter ?? "") && (!verse || result.verse === Number.parseInt(verse))
        })
      }
    } else {
      // Keyword or phrase search
      searchResults = searchVerses(searchQuery)
    }

    // Filter by testament
    if (selectedTestament !== "all") {
      const testamentBooks = books.filter((book) => book.testament === selectedTestament).map((book) => book.name)
      searchResults = searchResults.filter((result) => testamentBooks.includes(result.book))
    }

    setResults(searchResults)
    setIsSearching(false)

    // Update URL
    const params = new URLSearchParams()
    params.set("q", searchQuery)
    if (searchType !== "keyword") params.set("type", searchType)
    if (selectedTranslation !== "KJV") params.set("translation", selectedTranslation)
    if (selectedTestament !== "all") params.set("testament", selectedTestament)
    router.replace(`/fellowship1/bible/search?${params.toString()}`)
  }, [searchType, selectedTestament, selectedTranslation, router])

  // Load search query from URL params
  useEffect(() => {
    const urlQuery = searchParams.get("q")
    if (urlQuery) {
      setQuery(urlQuery)
      void performSearch(urlQuery)
    }
  }, [searchParams, performSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    void performSearch(query)
  }

  const handleVerseClick = (result: SearchResult) => {
    router.push(`/fellowship1/bible/read?ref=${encodeURIComponent(result.ref)}`)
  }

  const highlightText = (text: string, searchQuery: string) => {
    if (!searchQuery.trim() || searchType === "reference") return text

    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Search the Bible</h1>
        <p className="text-muted-foreground">Find verses, keywords, and references across all translations</p>
      </div>

      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter keywords, phrases, or references (e.g., John 3:16)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isSearching}>
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>

            {/* Search Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Type</label>
                <Select value={searchType} onValueChange={(value: SearchType) => setSearchType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="keyword">Keywords</SelectItem>
                    <SelectItem value="phrase">Exact Phrase</SelectItem>
                    <SelectItem value="reference">Verse Reference</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Translation</label>
                <Select value={selectedTranslation} onValueChange={setSelectedTranslation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {translations.map((translation) => (
                      <SelectItem key={translation.code} value={translation.code}>
                        {translation.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Testament</label>
                <Select value={selectedTestament} onValueChange={(value: TestamentType) => setSelectedTestament(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Books</SelectItem>
                    <SelectItem value="old">Old Testament</SelectItem>
                    <SelectItem value="new">New Testament</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Search Results</span>
              {results.length > 0 && (
                <Badge variant="secondary">
                  {results.length} result{results.length !== 1 ? "s" : ""} found
                </Badge>
              )}
            </CardTitle>
            {query && (
              <CardDescription>
                Results for &ldquo;{query}&rdquo; in {selectedTranslation}
                {selectedTestament !== "all" && ` (${selectedTestament === "old" ? "Old" : "New"} Testament)`}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {isSearching ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground mt-2">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => handleVerseClick(result)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{result.ref}</Badge>
                          <Badge variant="secondary" className="text-xs">
                            {selectedTranslation}
                          </Badge>
                        </div>
                        <p className="text-base leading-relaxed">{highlightText(result.text, query)}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No results found</p>
                <p className="text-sm">
                  Try different keywords or check your spelling. Remember that this is mock data with limited content.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Search Tips */}
      {!hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle>Search Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Keyword Search</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>&bull; Search for &ldquo;love&rdquo; to find verses about love</li>
                  <li>&bull; Use &ldquo;faith hope&rdquo; to find verses with both words</li>
                  <li>&bull; Try &ldquo;eternal life&rdquo; for specific concepts</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Reference Search</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>&bull; &ldquo;John 3:16&rdquo; for a specific verse</li>
                  <li>&bull; &ldquo;John 3&rdquo; for an entire chapter</li>
                  <li>&bull; &ldquo;1 John 4:8&rdquo; for numbered books</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
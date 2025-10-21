"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { BlogCard } from "@/components/blog/blog-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getAllPosts } from "@/lib/storage"
import type { BlogPost } from "@/lib/types"

function parseDate(value: unknown): Date {
  if (!value) return new Date(0)
  if (value instanceof Date) return value
  if (typeof value === "number") return new Date(value)
  if (typeof value === "string") {
    const d = new Date(value)
    // Check if the date conversion was successful
    return isNaN(d.getTime()) ? new Date(0) : d
  }
  return new Date(0)
}

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const publishedPosts = getAllPosts()
      .filter((p) => p.status === "published")
      .sort((a: BlogPost, b: BlogPost) => {
        const aDate = parseDate(a.publishedAt ?? a.createdAt)
        const bDate = parseDate(b.publishedAt ?? b.createdAt)
        return bDate.getTime() - aDate.getTime()
      })

    setPosts(publishedPosts)
    setFilteredPosts(publishedPosts)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = posts
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.content.toLowerCase().includes(q),
      )
    }

    // Filter by selected tag
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag))
    }

    setFilteredPosts(filtered)
  }, [posts, searchQuery, selectedTag])

  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort()

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading posts...</p>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Fellowship Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sharing insights, experiences, and knowledge from our fellowship community
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="max-w-md mx-auto">
              <Input
                type="search"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            {allTags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                <Badge
                  variant={selectedTag === null ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(null)}
                >
                  All Posts
                </Badge>
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">No Posts Yet</h2>
              <p className="text-muted-foreground">Check back soon for new content from our fellowship members.</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">No Posts Found</h2>
              <p className="text-muted-foreground">Try adjusting your search terms or selected tags.</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
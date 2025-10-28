"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { BlogContent } from "@/components/blog/blog-content"
import { CommentsSection } from "@/components/comments/comments-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft } from "lucide-react"


import type { BlogPost } from "@/lib/types" 
import { getPostBySlug } from "@/lib/storage" 

type BlogPostParams = {
    slug: string
    fellowship_id: string 
}

export interface BlogPostPageProps {
  params: BlogPostParams
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundPost = getPostBySlug(params.slug) as BlogPost | null
    if (!foundPost || foundPost.status !== "published") {
      setPost(null)
    } else {
      setPost(foundPost)
    }
    setLoading(false)
  }, [params.slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading post...</p>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  if (!post) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="pl-0">
              <Link href={`/${params.fellowship_id}/fellowship-blog`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Post Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-6 leading-tight">{post.title}</h1>

            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  Published on {formatDate(post.publishedAt || post.createdAt)}
                </p>
              </div>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {/* Post Content */}
          <div className="mb-12">
            <BlogContent content={post.content} />
          </div>

          {/* Post Footer */}
          <footer className="border-t pt-8 mb-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">Fellowship Member</p>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href={`/${params.fellowship_id}/fellowship-blog`}>View All Posts</Link>
              </Button>
            </div>
          </footer>

          <section className="border-t pt-8">
            <CommentsSection postId={post.id} />
          </section>
        </article>
      </main>
    </>
  )
}
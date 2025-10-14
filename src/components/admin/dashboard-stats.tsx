"use client"

import { useEffect, useState } from "react"
import type React from "react" 

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

interface IconPlaceholderProps extends ComponentProps {
  name: string;
}

type IconWrapperProps = {
  className?: string;
};
// --- End Type Definitions ---

// Mocked UI Components (Card components from shadcn/ui equivalent)
const Card = ({ children, className = "" }: ComponentProps) => <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}>{children}</div>;
const CardHeader = ({ children, className = "" }: ComponentProps) => <div className={`p-4 border-b border-gray-100 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = "" }: ComponentProps) => <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
const CardContent = ({ children, className = "" }: ComponentProps) => <div className={`p-4 ${className}`}>{children}</div>;

// Mocked Icons (Lucide icons equivalent)
const IconPlaceholder = ({ name, className = "" }: IconPlaceholderProps) => (
  <svg className={`h-4 w-4 text-gray-400 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {/* Generic path for placeholder */}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const FileText = (props: IconWrapperProps) => <IconPlaceholder name="FileText" {...props} />;
const MessageSquare = (props: IconWrapperProps) => <IconPlaceholder name="MessageSquare" {...props} />;
const Eye = (props: IconWrapperProps) => <IconPlaceholder name="Eye" {...props} />;
const Clock = (props: IconWrapperProps) => <IconPlaceholder name="Clock" {...props} />;

// Mock Data Types and Storage Function
type Post = { status: "published" | "draft" }
type Comment = { status: "pending" | "approved" }
type BlogData = { posts: Post[], comments: Comment[] }

// Mock the getBlogData function as it is an external dependency
const getBlogData = (): BlogData => ({
  posts: [
    { status: "published" },
    { status: "published" },
    { status: "draft" },
    { status: "published" },
  ],
  comments: [
    { status: "approved" },
    { status: "pending" },
    { status: "approved" },
    { status: "pending" },
    { status: "pending" },
  ]
})


// The main component
export function DashboardStats() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalComments: 0,
    pendingComments: 0,
    approvedComments: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      const data = getBlogData()

      const totalPosts = data.posts.length
      const publishedPosts = data.posts.filter((p) => p.status === "published").length
      const draftPosts = data.posts.filter((p) => p.status === "draft").length

      const totalComments = data.comments.length
      const pendingComments = data.comments.filter((c) => c.status === "pending").length
      const approvedComments = data.comments.filter((c) => c.status === "approved").length

      setStats({
        totalPosts,
        publishedPosts,
        draftPosts,
        totalComments,
        pendingComments,
        approvedComments,
      })
      setLoading(false)
    }, 500) 

    return () => clearTimeout(timer); 
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-300 rounded-lg w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const mutedForeground = "text-gray-500"

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          <FileText className={`h-4 w-4 ${mutedForeground}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPosts}</div>
          <p className={`text-xs ${mutedForeground}`}>
            {stats.publishedPosts} published, {stats.draftPosts} drafts
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Published Posts</CardTitle>
          <Eye className={`h-4 w-4 ${mutedForeground}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.publishedPosts}</div>
          <p className={`text-xs ${mutedForeground}`}>Live on the blog</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
          <MessageSquare className={`h-4 w-4 ${mutedForeground}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalComments}</div>
          <p className={`text-xs ${mutedForeground}`}>{stats.approvedComments} approved</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Comments</CardTitle>
          <Clock className={`h-4 w-4 ${mutedForeground}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingComments}</div>
          <p className={`text-xs ${mutedForeground}`}>Awaiting review</p>
        </CardContent>
      </Card>
    </div>
  )
}

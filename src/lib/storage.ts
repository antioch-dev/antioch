import type { BlogData, BlogPost, Comment } from "./types"

const STORAGE_KEY = "fellowship-blog-data"
const initialData: BlogData = {
  users: [
    {
      id: "1",
      name: "Fellowship Admin",
      email: "admin@fellowship.org",
      role: "admin",
      createdAt: new Date().toISOString(),
    },
  ],
  posts: [],
  comments: [],
}

export function getBlogData(): BlogData {
  if (typeof window === "undefined") return initialData

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
    return initialData
  }

  try {
    return JSON.parse(stored) as BlogData
  } catch {
    return initialData
  }
}

export function saveBlogData(data: BlogData): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// Blog post operations
export function getAllPosts(): BlogPost[] {
  return getBlogData().posts
}

export function getPublishedPosts(): BlogPost[] {
  return getBlogData().posts.filter((post) => post.status === "published")
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getBlogData().posts.find((post) => post.slug === slug)
}

export function savePost(post: BlogPost): void {
  const data = getBlogData()
  const existingIndex = data.posts.findIndex((p) => p.id === post.id)

  if (existingIndex >= 0) {
    data.posts[existingIndex] = post
  } else {
    data.posts.push(post)
  }

  saveBlogData(data)
}

export function deletePost(postId: string): void {
  const data = getBlogData()
  data.posts = data.posts.filter((post) => post.id !== postId)
  data.comments = data.comments.filter((comment) => comment.postId !== postId)
  saveBlogData(data)
}

export function getCommentsByPostId(postId: string): Comment[] {
  return getBlogData().comments.filter((comment) => comment.postId === postId)
}

export function getApprovedCommentsByPostId(postId: string): Comment[] {
  return getBlogData().comments.filter((comment) => comment.postId === postId && comment.status === "approved")
}

export function saveComment(comment: Comment): void {
  const data = getBlogData()
  const existingIndex = data.comments.findIndex((c) => c.id === comment.id)

  if (existingIndex >= 0) {
    data.comments[existingIndex] = comment
  } else {
    data.comments.push(comment)
  }

  saveBlogData(data)
}

export function deleteComment(commentId: string): void {
  const data = getBlogData()
  data.comments = data.comments.filter((comment) => comment.id !== commentId)
  saveBlogData(data)
}

// Utility functions
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
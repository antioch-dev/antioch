export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "member"
  avatar?: string
  createdAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  authorId: string
  author: User
  status: "draft" | "published"
  tags: string[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface Comment {
  id: string
  postId: string
  authorName: string
  authorEmail: string
  content: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

export interface BlogData {
  users: User[]
  posts: BlogPost[]
  comments: Comment[]
}

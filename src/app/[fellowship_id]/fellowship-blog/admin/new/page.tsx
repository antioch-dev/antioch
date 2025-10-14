"use client"

import { useRouter } from "next/navigation"
import { MarkdownEditor } from "@/components/editor/markdown-editor"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Header } from "@/components/layout/header"
import { savePost } from "@/lib/storage"
import type { BlogPost } from "@/lib/types"

export default function NewPostPage() {
  const router = useRouter()

  const handleSave = (post: BlogPost) => {
    savePost(post)
    router.push("/admin")
  }

  const handleCancel = () => {
    router.push("/admin")
  }

  return (
    <ProtectedRoute>
      <Header />
      <main className="min-h-screen bg-background">
        <MarkdownEditor onSave={handleSave} onCancel={handleCancel} />
      </main>
    </ProtectedRoute>
  )
}

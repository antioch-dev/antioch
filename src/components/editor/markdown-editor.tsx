"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { BlogPost } from "@/lib/types"
import { generateSlug, generateId } from "@/lib/storage"
import { useAuth } from "@/contexts/auth-context"

interface MarkdownEditorProps {
  post?: BlogPost
  onSave: (post: BlogPost) => void
  onCancel: () => void
}

export function MarkdownEditor({ post, onSave, onCancel }: MarkdownEditorProps) {
  const { user } = useAuth()
  const [title, setTitle] = useState(post?.title || "")
  const [content, setContent] = useState(post?.content || "")
  const [tags, setTags] = useState(post?.tags?.join(", ") || "")
  const [status, setStatus] = useState<"draft" | "published">(post?.status || "draft")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  // Auto-generate excerpt from content
  const generateExcerpt = (content: string): string => {
    const plainText = content.replace(/[#*`_~[\]()]/g, "").trim()
    return plainText.length > 150 ? plainText.substring(0, 150) + "..." : plainText
  }

  // Simple markdown to HTML converter for preview
  const markdownToHtml = (markdown: string): string => {
    return markdown
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br>")
      .replace(/^(.*)$/gim, "<p>$1</p>")
      .replace(/<p><\/p>/g, "")
      .replace(/<p><h([1-6])>/g, "<h$1>")
      .replace(/<\/h([1-6])><\/p>/g, "</h$1>")
  }

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Title is required")
      return
    }

    if (!user) {
      setError("You must be logged in to save posts")
      return
    }

    setSaving(true)
    setError("")

    try {
      const slug = post?.slug || generateSlug(title)
      const now = new Date().toISOString()
      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      const blogPost: BlogPost = {
        id: post?.id || generateId(),
        title: title.trim(),
        slug,
        content,
        excerpt: generateExcerpt(content),
        authorId: user.id,
        author: user,
        status,
        tags: tagArray,
        createdAt: post?.createdAt || now,
        updatedAt: now,
        publishedAt: status === "published" ? post?.publishedAt || now : undefined,
      }

      onSave(blogPost)
    } catch (err) {
      setError("Failed to save post. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const insertMarkdown = (before: string, after = "") => {
    const textarea = document.getElementById("content-textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end)

    setContent(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{post ? "Edit Post" : "Create New Post"}</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Post"}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog post title..."
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <div className="border rounded-lg">
              {/* Markdown Toolbar */}
              <div className="flex items-center space-x-2 p-2 border-b bg-muted/50">
                <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("**", "**")} title="Bold">
                  <strong>B</strong>
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("*", "*")} title="Italic">
                  <em>I</em>
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("# ")} title="Heading 1">
                  H1
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("## ")} title="Heading 2">
                  H2
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("- ")} title="List Item">
                  •
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("`", "`")} title="Code">
                  {"</>"}
                </Button>
              </div>

              <Tabs defaultValue="write" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="write" className="p-0">
                  <Textarea
                    id="content-textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your blog post content in Markdown..."
                    className="min-h-[400px] border-0 resize-none focus-visible:ring-0"
                  />
                </TabsContent>
                <TabsContent value="preview" className="p-4">
                  <div
                    className="prose prose-sm max-w-none min-h-[400px]"
                    dangerouslySetInnerHTML={{
                      __html: content
                        ? markdownToHtml(content)
                        : "<p class='text-muted-foreground'>Nothing to preview yet...</p>",
                    }}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(value: "draft" | "published") => setStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="tag1, tag2, tag3"
                />
                <p className="text-xs text-muted-foreground">Separate tags with commas</p>
              </div>

              {tags && (
                <div className="flex flex-wrap gap-1">
                  {tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag.length > 0)
                    .map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Markdown Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <code># Heading 1</code>
              </div>
              <div>
                <code>## Heading 2</code>
              </div>
              <div>
                <code>**bold text**</code>
              </div>
              <div>
                <code>*italic text*</code>
              </div>
              <div>
                <code>`code`</code>
              </div>
              <div>
                <code>- List item</code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

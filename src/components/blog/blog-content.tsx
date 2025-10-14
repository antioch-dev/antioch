"use client"

import { useEffect, useState } from "react"

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  const [htmlContent, setHtmlContent] = useState("")

  // Enhanced markdown to HTML converter
  const markdownToHtml = (markdown: string): string => {
    return (
      markdown
        // Headers
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-8 mb-4">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mt-10 mb-6">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-12 mb-8">$1</h1>')
        // Bold and italic
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        // Code
        .replace(/`(.*?)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
        // Lists
        .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
        .replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside space-y-2 my-4">$1</ul>')
        // Paragraphs
        .replace(/\n\n/g, "</p><p>")
        .replace(/\n/g, "<br>")
        .replace(/^(.*)$/gim, "<p>$1</p>")
        .replace(/<p><\/p>/g, "")
        // Fix headers in paragraphs
        .replace(/<p><h([1-6])>/g, "<h$1>")
        .replace(/<\/h([1-6])><\/p>/g, "</h$1>")
        // Fix lists in paragraphs
        .replace(/<p><ul>/g, "<ul>")
        .replace(/<\/ul><\/p>/g, "</ul>")
        .replace(/<p><li>/g, "<li>")
        .replace(/<\/li><\/p>/g, "</li>")
    )
  }

  useEffect(() => {
    setHtmlContent(markdownToHtml(content))
  }, [content])

  return (
    <div
      className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-code:text-foreground prose-li:text-foreground"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}

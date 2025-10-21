import type React from "react"
import { Navigation } from "@/components/navigation"
import { mockFellowships } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface FellowshipLayoutProps {
  children: React.ReactNode
  params: { fellowship: string }
}

export default function FellowshipLayout({ children, params }: FellowshipLayoutProps) {
  const fellowship = mockFellowships.find((f) => f.slug === params.fellowship)

  if (!fellowship) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation fellowshipSlug={params.fellowship} />
      {children}
    </div>
  )
}

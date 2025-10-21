import type React from "react"
import { mockAPI, mockFellowships } from "@/lib/mock-data"
import { notFound } from "next/navigation"

type EventLayoutProps = {
  children: React.ReactNode
  params: {
    fellowship: string
    id: string
  }
}

export default async function EventLayout({ children, params }: EventLayoutProps) {
  const fellowship = mockFellowships.find((f) => f.slug === params.fellowship)
  if (!fellowship) {
    notFound()
  }
  try {
    const event = await mockAPI.getEventById(params.id)
    if (!event || event.fellowship !== params.fellowship) {
      notFound()
    }
  } catch (error) {
    notFound()
  }

  return <>{children}</>
}

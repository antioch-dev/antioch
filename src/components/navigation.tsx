"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Plus } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { mockFellowships } from "@/lib/mock-data"

interface NavigationProps {
  fellowshipSlug?: string
  showBackToRoot?: boolean
}

export function Navigation({ fellowshipSlug, showBackToRoot = true }: NavigationProps) {
  const router = useRouter()
  const pathname = usePathname()

  const fellowship = fellowshipSlug ? mockFellowships.find((f) => f.slug === fellowshipSlug) : null

  const handleBack = () => {
    router.back()
  }

  const handleBackToRoot = () => {
    router.push("/")
  }

  const handleBackToEvents = () => {
    if (fellowshipSlug) {
      router.push(`/${fellowshipSlug}/events`)
    }
  }

  const handleCreateEvent = () => {
    if (fellowshipSlug) {
      router.push(`/${fellowshipSlug}/events/create`)
    }
  }

  const isOnEventsPage = pathname === `/${fellowshipSlug}/events`
  const isOnCreatePage = pathname === `/${fellowshipSlug}/events/create`

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {!isOnEventsPage && (
            <Button variant="ghost" size="sm" onClick={handleBack} className="hover:bg-gray-100 dark:hover:bg-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}

          {fellowship && (
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full ${fellowship.color} flex items-center justify-center`}>
                <span className="text-white text-sm font-semibold">{fellowship.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">{fellowship.name}</h2>
                {!isOnEventsPage && !isOnCreatePage && (
                  <button
                    onClick={handleBackToEvents}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Back to Events
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {fellowship && !isOnCreatePage && (
            <Button
              onClick={handleCreateEvent}
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          )}

          {showBackToRoot && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToRoot}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
            >
              <Home className="w-4 h-4 mr-2" />
              All Fellowships
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

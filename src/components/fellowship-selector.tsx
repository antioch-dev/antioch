"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockFellowships } from "@/lib/mock-data"
import { useRouter } from "next/navigation"
import { ChevronRight, Users } from "lucide-react"

export function FellowshipSelector() {
  const router = useRouter()

  const handleFellowshipSelect = (fellowshipSlug: string) => {
    router.push(`/${fellowshipSlug}/events`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Welcome to Antioch</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">Multi-Fellowship Event Management Platform</p>
          <p className="text-gray-500 dark:text-gray-400">
            Choose your fellowship to access events and community features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockFellowships.map((fellowship) => (
            <Card
              key={fellowship.id}
              className="group hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer border-2 hover:border-blue-300 dark:hover:border-blue-600"
              onClick={() => handleFellowshipSelect(fellowship.slug)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-full ${fellowship.color} flex items-center justify-center mb-3`}>
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {fellowship.name}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">{fellowship.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all duration-300 bg-transparent"
                >
                  View Events
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help? Contact your fellowship administrator or{" "}
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
              visit our support center
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

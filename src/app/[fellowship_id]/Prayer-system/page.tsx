import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Antioch Platform</h1>
          <p className="text-xl text-gray-600">Multi-fellowship hosting system for churches</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🏛️ Fellowship Demo</CardTitle>
              <CardDescription>Explore the Prayer System module for a sample fellowship</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/fellowship1/Prayer-system/prayer">
                <Button className="w-full">Enter Prayer System</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">⚙️ Platform Features</CardTitle>
              <CardDescription>Each fellowship gets independent modules</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Prayer Request Management</li>
                <li>• Meeting Scheduling</li>
                <li>• Prayer Assignments</li>
                <li>• Ministry Coverage</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

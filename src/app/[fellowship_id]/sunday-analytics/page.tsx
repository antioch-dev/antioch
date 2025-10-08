import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, Calendar, DotIcon as Counter } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Antioch Platform</h1>
          <p className="text-muted-foreground mt-2">Multi-fellowship hosting system for churches</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Sunday Analytics Dashboard</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track attendance, analyze trends, and manage your fellowship community with comprehensive analytics tools.
          </p>
        </div>

        {/* Fellowship Selection */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Grace Fellowship
              </CardTitle>
              <CardDescription>Main campus community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Sunday:</span>
                  <span className="font-medium">245 attendees</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Avg:</span>
                  <span className="font-medium">238 attendees</span>
                </div>
                <Link href="/fellowship1/sunday-analytics/analytics">
                  <Button className="w-full mt-4">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Youth Fellowship
              </CardTitle>
              <CardDescription>Young adults community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Sunday:</span>
                  <span className="font-medium">89 attendees</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Avg:</span>
                  <span className="font-medium">92 attendees</span>
                </div>
                <Link href="/fellowship1/youth-fellowship/analytics">
                  <Button className="w-full mt-4">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Children&apos;s Ministry
              </CardTitle>
              <CardDescription>Kids and families</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Sunday:</span>
                  <span className="font-medium">156 attendees</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Avg:</span>
                  <span className="font-medium">148 attendees</span>
                </div>
                <Link href="/fellowship1/childrens-ministry/analytics">
                  <Button className="w-full mt-4">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">Quick Actions</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/fellowship1/grace-fellowship/analytics/counter">
              <Button variant="outline" size="lg">
                <Counter className="h-5 w-5 mr-2" />
                Live Counter
              </Button>
            </Link>
            <Link href="/fellowship1/grace-fellowship/analytics/monthly">
              <Button variant="outline" size="lg">
                <Calendar className="h-5 w-5 mr-2" />
                Monthly Reports
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

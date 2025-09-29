import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, BarChart3, FileQuestion, Share2 } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold">
            <BarChart3 className="h-5 w-5" />
            <span>QuickPoll Analytics</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/fellowship1/polling/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Create, Share, and Analyze Questionnaires
            </h1>
            <p className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
              Build questionnaires in minutes, share them with a unique link, and get instant analytics.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="fellowship1/polling/dashboard/create">
                <Button size="lg">
                  Create Questionnaire
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="container py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 md:grid-cols-3">
            <Card>
              <CardHeader>
                <FileQuestion className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Create Questions</CardTitle>
                <CardDescription>Build questionnaires with text or multiple-choice questions</CardDescription>
              </CardHeader>
              <CardContent>
                Create question groups with titles, descriptions, and customizable questions in minutes.
              </CardContent>
              <CardFooter>
                <Link href="fellowship1/polling/dashboard/create" className="w-full">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Share2 className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Share Easily</CardTitle>
                <CardDescription>Distribute your questionnaire with a unique link</CardDescription>
              </CardHeader>
              <CardContent>
                Each questionnaire gets a shareable link for respondents and a private admin link for analytics.
              </CardContent>
              <CardFooter>
                <Link href="/fellowship1/polling/dashboard" className="w-full">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Instant Analytics</CardTitle>
                <CardDescription>View response data with beautiful visualizations</CardDescription>
              </CardHeader>
              <CardContent>
                Get instant insights with charts, statistics, and visualizations of your questionnaire responses.
              </CardContent>
              <CardFooter>
                <Link href="/fellowship1/polling/dashboard" className="w-full">
                  <Button variant="outline" className="w-full">
                    View Demo
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} QuickPoll Analytics. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

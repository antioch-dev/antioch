import { FeedbackForm } from "@/components/feedback-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Feedback Portal</h1>
              <p className="text-muted-foreground mt-1">Help us improve by sharing your thoughts</p>
            </div>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Share Your Feedback</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your input helps us build better experiences. Whether it's a suggestion, fellowship question, or bug
              report, we'd love to hear from you.
            </p>
          </div>

          <FeedbackForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>Thank you for helping us improve our platform</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

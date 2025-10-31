import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-muted-foreground mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </main>
    </>
  )
}

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center items-center">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Antioch Fellowships</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {/* <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
          <Link href="#events" className="text-sm font-medium transition-colors hover:text-primary">
            Events
          </Link>
          <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
            Praise Reports
          </Link>
          <Link href="#announcements" className="text-sm font-medium transition-colors hover:text-primary">
            Announcements
          </Link>
          <Link href="#donate" className="text-sm font-medium transition-colors hover:text-primary">
            Donate
          </Link>*/}
          <Link href="/fellowship1/task-manager" className="text-sm font-medium transition-colors hover:text-primary">
            Task Manager
          </Link>
          <Link href="/fellowship1/forms" className="text-sm font-medium transition-colors hover:text-primary">
            Forms
          </Link>
          <Link href="/fellowship1/shared_music" className="text-sm font-medium transition-colors hover:text-primary">
            Shared Music
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="flex items-center gap-1 text-sm font-medium">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Sign In</span>
          </Link>
          <Link href="/auth/register">
            <Button className="hidden md:flex">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

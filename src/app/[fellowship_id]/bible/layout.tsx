import type React from "react"
import { BibleNavigation } from "@/components/bible/bible-navigation"
import { ThemeProvider } from "@/components/theme-provider"

export default function BibleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <BibleNavigation />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </ThemeProvider>
  )
}

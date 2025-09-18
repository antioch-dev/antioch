import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Antioch Q&A System",
  description: "Interactive Q&A system for church services",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
 <main className="min-h-screen bg-background font-sans antialiased">
      {children}
    </main>
  )
}

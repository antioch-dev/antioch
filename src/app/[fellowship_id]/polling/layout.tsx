import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <div className="min-h-screen bg-background">
          {children}
        </div>
    </ThemeProvider>
  )
}
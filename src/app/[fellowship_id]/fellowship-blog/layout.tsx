import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { AuthProvider } from "@/contexts/auth-context"
// import { Header } from "@/components/layout/header"

export const metadata: Metadata = {
  title: "Fellowship Blog",
  description: "A blog platform for fellowship members",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
    {/* <Header /> */}
          <AuthProvider>
          {children}
        </AuthProvider>
    </>
  )
}
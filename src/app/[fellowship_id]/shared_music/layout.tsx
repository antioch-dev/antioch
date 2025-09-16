import type React from "react"
import type { Metadata } from "next"
// import { Inter } from 'next/font/google'
import "./styles.css"
import { Toaster } from "@/components/ui/toaster"
import Navigation from "./navigation"

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "ChurchSong - Worship Lyrics Platform",
  description: "Your platform for sharing and coordinating worship songs",
  generator: "v0.dev",
}

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
//           <Navigation />
//           <main className="min-h-screen bg-background">{children}</main>
//           <Toaster />
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">{children}</main>
      <Toaster />
    </>
  )
}

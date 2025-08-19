
import '@/styles/globals.css'
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { AOSProvider } from '@/components/aos-provider'
import { TRPCReactProvider } from '@/trpc/react'

// Load fonts
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

// Combined metadata
export const metadata: Metadata = {
  title: 'Antioch Platform - Uniting Fellowships Worldwide',
  description:
    'A comprehensive platform hosting multiple fellowships and churches under one umbrella with shared features and tools.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${geist.variable} ${inter.variable}`}>
      <body className={inter.className}>
        <AOSProvider>
          <TRPCReactProvider>
            <main>{children}</main>
            <Toaster />
          </TRPCReactProvider>
        </AOSProvider>
      </body>
    </html>
  )
}
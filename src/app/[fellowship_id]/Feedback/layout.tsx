import React from 'react'


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <main className="min-h-screen bg-background">
        {children}
      </main>
  )
}
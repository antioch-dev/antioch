"use client"

import type React from "react"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return <div className="animate-in fade-in duration-300">{children}</div>
}

"use client"

import type React from "react"

// Simple provider that doesn't need AOS library
export function AOSProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

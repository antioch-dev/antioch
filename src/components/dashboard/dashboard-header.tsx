import type React from "react"
import { cn } from "@/lib/utils"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  className?: string
}

export function DashboardHeader({ heading, text, children, className }: DashboardHeaderProps) {
  return (
    <div className="border-b">
      <div className="container flex flex-col items-start justify-between gap-4 py-4 md:flex-row md:items-center md:py-6">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
          {text && <p className="text-muted-foreground">{text}</p>}
        </div>
        {children && <div className={cn("flex items-center gap-2", className)}>{children}</div>}
      </div>
    </div>
  )
}

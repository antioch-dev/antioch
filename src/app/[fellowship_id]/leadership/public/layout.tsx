import type { ReactNode } from "react"
import { use } from "react" // Add 'use' import

interface PublicLeadershipLayoutProps {
  children: ReactNode
  params: Promise<{ fellowship_id: string }> // Change to Promise
}

export default function PublicLeadershipLayout({ children, params }: PublicLeadershipLayoutProps) {
  
  use(params) 
  
  return <div className="min-h-screen bg-background">{children}</div>
}
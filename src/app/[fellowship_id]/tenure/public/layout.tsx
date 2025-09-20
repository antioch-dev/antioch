import type { ReactNode } from "react"

interface PublicLeadershipLayoutProps {
  children: ReactNode
  params: { fellowship_id: string }
}

export default function PublicLeadershipLayout({ children }: PublicLeadershipLayoutProps) {
  return <div className="min-h-screen bg-background">{children}</div>
}

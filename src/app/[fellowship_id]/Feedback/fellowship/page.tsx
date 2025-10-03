import { FellowshipDashboard } from "@/components/fellowship-dashboard"
import { AuthHeader } from "@/components/auth-header"

export default function FellowshipPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-4 right-4 z-10">
        <AuthHeader />
      </div>
      <FellowshipDashboard />
    </div>
  )
}

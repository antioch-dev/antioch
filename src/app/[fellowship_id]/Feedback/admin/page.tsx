import { AdminDashboard } from "@/components/admin-dashboard"
import { AuthHeader } from "@/components/auth-header"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-4 right-4 z-10">
        <AuthHeader />
      </div>
      <AdminDashboard />
    </div>
  )
}

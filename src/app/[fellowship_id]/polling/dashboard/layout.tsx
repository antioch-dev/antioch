import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashboardSidebar />
      <SidebarInset>
        <div className="flex min-h-screen flex-col">{children}</div>
      </SidebarInset>
    </>
  )
}

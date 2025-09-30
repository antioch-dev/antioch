import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar - fixed width */}
        <div className="w-[250px] shrink-0 border-r bg-background">
          <DashboardSidebar />
        </div>

        {/* Content - fills the rest */}
        <SidebarInset className="flex flex-col flex-1">
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

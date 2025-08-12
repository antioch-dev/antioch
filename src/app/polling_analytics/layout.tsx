"use client"

import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar" 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col pl-64">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar" 
import { ThemeProvider } from "@/components/theme-provider" 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   
    <SidebarProvider>
     
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <div className="flex min-h-screen">
          {/* The sidebar will take its defined width and is likely fixed/absolute */}
          <DashboardSidebar />
          
          <SidebarInset>
           
            <div className="flex flex-1 flex-col pl-64"> {/* <-- MODIFIED LINE */}
              {children}
            </div>
          </SidebarInset>
        </div>
      </ThemeProvider>
    </SidebarProvider>
  )
}

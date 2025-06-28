import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { FormsSidebar } from "./components/forms-sidebar"
import { Toaster } from "sonner"

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <FormsSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}

import type React from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { FormsSidebar } from "./components/forms-sidebar"
import { Toaster } from "sonner"

export default function FormsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* <div
        className="flex min-h-screen w-full"
        // style={{
        //   paddingTop: 30,
        // }}
      > */}
      <FormsSidebar />
      <SidebarInset className="container mx-auto py-8">{children}</SidebarInset>
      {/* <main className="container mx-auto">{children}</main> */}
      {/* </div> */}
      <Toaster />
    </SidebarProvider>
  )
}

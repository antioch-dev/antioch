import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { BarChart3, FileQuestion, Home, PlusCircle, Settings, User, Tag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function DashboardSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <BarChart3 className="h-5 w-5" />
          <span>QuickPoll</span>
        </Link>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/polling_analytics/dashboard">
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/polling_analytics/dashboard/create">
                    <PlusCircle />
                    <span>Create Questionnaire</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/polling_analytics/dashboard">
                    <FileQuestion />
                    <span>My Questionnaires</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/polling_analytics/dashboard/topics">
                    <Tag />
                    <span>Topics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <span className="text-sm font-medium">Admin User</span>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BarChart3, FileQuestion, Home, PlusCircle, Settings, User, Tag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { getAllQuestionGroups } from "@/lib/polling-data" // adjust path

export function DashboardSidebar() {
  const questionnaires = getAllQuestionGroups()
  const firstQuestionnaireId = questionnaires[0]?.id

  return (
    <Sidebar
      variant="inset"
      className="flex h-[calc(100vh-64px)] w-[250px] flex-col border-r bg-background mt-[64px]"
    >
      {/* Header */}
      <SidebarHeader className="flex items-center justify-between">
        <Link href="/fellowship1/polling" className="flex items-center gap-2 font-bold">
          <BarChart3 className="h-5 w-5" />
          <span>QuickPoll</span>
        </Link>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="flex-1 overflow-y-auto flex flex-col items-center ">
        <SidebarGroup className="w-full">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/fellowship1/polling/dashboard">
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/fellowship1/polling/dashboard/create">
                    <PlusCircle />
                    <span>Create Questionnaire</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild disabled={!firstQuestionnaireId}>
                  <Link
                    href={
                      firstQuestionnaireId
                        ? `/fellowship1/polling/dashboard/questionnaire/${firstQuestionnaireId}`
                        : "#"
                    }
                  >
                    <FileQuestion />
                    <span>My Questionnaires</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/fellowship1/polling/dashboard/topics">
                    <Tag />
                    <span>Topics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer pinned at bottom */}
      <SidebarFooter className="flex items-center justify-between p-4 border-t">
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

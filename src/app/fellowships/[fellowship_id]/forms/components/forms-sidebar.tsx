'use client'

import { Home, FileText, List, Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'

const menuItems = [
  {
    title: 'Dashboard',
    url: '/forms', // This will become /fellowships/{fellowshipId}/forms
    icon: Home,
  },
  {
    title: 'My Forms',
    url: '/forms/manage', // This will become /fellowships/{fellowshipId}/forms/manage
    icon: FileText,
  },
  {
    title: 'Public Forms',
    url: '/forms/list', // This will become /fellowships/{fellowshipId}/forms/list
    icon: List,
  },
]

export function FormsSidebar() {
  const pathname = usePathname()
  const params = useParams<{
    fellowship_id?: string
  }>()
  // Default to 'fellowship' if fellowship_id is not present in params
  const fellowshipId = params.fellowship_id ?? 'fellowship'

  return (
    <Sidebar
      collapsible="icon"
      style={{
        paddingTop: 60,
      }}
    >
      <SidebarHeader className="p-4">
        {/* Link for the main "Form Builder" title */}
        <Link href={`/fellowships/${fellowshipId}/forms`}>
          <h2 className="text-xl font-bold">Form Builder</h2>
        </Link>
        {/* Link for the "Create Form" button */}
        <Link href={`/fellowships/${fellowshipId}/forms/builder/new`}>
          <Button className="w-full mt-2">
            <Plus className="w-4 h-4 mr-2" />
            Create Form
          </Button>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* Link for each navigation item */}
                  {/* The item.url is concatenated with the base path including fellowshipId */}
                  <SidebarMenuButton asChild isActive={pathname === `/fellowships/${fellowshipId}` + item.url}>
                    <Link href={`/fellowships/${fellowshipId}` + item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

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
    url: '/forms',
    icon: Home,
  },
  {
    title: 'My Forms',
    url: '/forms/manage',
    icon: FileText,
  },
  {
    title: 'Public Forms',
    url: '/forms/list',
    icon: List,
  },
]

export function FormsSidebar() {
  const pathname = usePathname()
  const params = useParams<{
    fellowship_id?: string
  }>()
  const fellowshipId = params.fellowship_id ?? 'fellowship'

  return (
    <Sidebar
      collapsible="icon"
      style={{
        paddingTop: 60,
      }}
    >
      <SidebarHeader className="p-4">
        <Link href={`/${fellowshipId}/forms`}>
          <h2 className="text-xl font-bold">Form Builder</h2>
        </Link>
        <Link href={`/${fellowshipId}/forms/builder/new`}>
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
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={`/${fellowshipId}` + item.url}>
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

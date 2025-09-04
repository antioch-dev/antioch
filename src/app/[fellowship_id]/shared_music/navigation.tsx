'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Music, Heart, Calendar, Home, Menu, Search, Bell, User, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

const url_prefix = '/fellowship1/shared_music'
const navigation = [
  { name: 'Home', href: `${url_prefix}`, icon: Home },
  { name: 'Songs', href: `${url_prefix}/songs`, icon: Music },
  { name: 'Playlists', href: `${url_prefix}/playlists`, icon: Heart },
  { name: 'Services', href: `${url_prefix}/services`, icon: Calendar },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-slide-in-left">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group m-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 group-hover:scale-110 transition-transform duration-300">
            <Music className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ChurchSong
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all-smooth group relative',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                )}
              >
                <item.icon
                  className={cn(
                    'h-4 w-4 transition-transform duration-300',
                    isActive ? 'scale-110' : 'group-hover:scale-110',
                  )}
                />
                <span>{item.name}</span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-foreground rounded-full animate-bounce-gentle" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <Button variant="ghost" size="icon" className="hidden md:flex hover-lift transition-all-smooth group">
            <Search className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex hover-lift transition-all-smooth group relative"
          >
            <Bell className="h-4 w-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse-soft">
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hover-lift transition-all-smooth group">
              <User className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
            </Button>
          </div>

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover-lift transition-all-smooth group">
                <Menu className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-2">
                  {navigation.map((item, index) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all-smooth group stagger-item',
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                        )}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <item.icon
                          className={cn(
                            'h-5 w-5 transition-transform duration-300',
                            isActive ? 'scale-110' : 'group-hover:scale-110',
                          )}
                        />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </nav>

                {/* Mobile Actions */}
                <div className="border-t pt-4 space-y-2">
                  <Button variant="ghost" className="w-full justify-start hover-lift transition-all-smooth group">
                    <Search className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Search
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover-lift transition-all-smooth group">
                    <Bell className="h-4 w-4 mr-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    Notifications
                    <Badge className="ml-auto animate-pulse-soft">3</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover-lift transition-all-smooth group">
                    <User className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover-lift transition-all-smooth group">
                    <Settings className="h-4 w-4 mr-3 group-hover:scale-110 group-hover:rotate-90 transition-all duration-300" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover-lift transition-all-smooth group text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

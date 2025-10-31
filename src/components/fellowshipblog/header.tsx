"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Header() {
  const { user, signOut, isAuthenticated } = useAuth()

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/fellowshipid" className="text-xl font-bold">
            FellowshipBlog
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/fellowshipid/fellowship-blog/admin" className="text-sm font-medium hover:text-primary">
              Admin
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/fellowshipid/fellowship-blog/admin" className="text-sm font-medium hover:text-primary">
                  Admin
                </Link>
                <Link href="/fellowshipid/fellowship-blog/admin/new" className="text-sm font-medium hover:text-primary">
                  New Post
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline">
              <Link href="/fellowshipid/fellowship-blog/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

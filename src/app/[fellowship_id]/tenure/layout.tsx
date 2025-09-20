import type { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, Users, Calendar, UserCheck, Settings, Eye } from "lucide-react"

interface LeadershipLayoutProps {
  children: ReactNode
  params: { fellowship_id: string }
}

export default function LeadershipLayout({ children, params }: LeadershipLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-900 dark:bg-slate-100 rounded-lg">
                  <Users className="h-6 w-6 text-white dark:text-slate-900" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Leadership Portal</h1>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      Fellowship {params.fellowship_id}
                    </Badge>
                  </div>
                </div>
              </div>

              <nav className="hidden md:flex items-center space-x-1 text-sm">
                <Link href={`/${params.fellowship_id}/leadership`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <span className="text-slate-400">/</span>
                <Link href={`/${params.fellowship_id}/leadership/tenures`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Tenures
                  </Button>
                </Link>
                <span className="text-slate-400">/</span>
                <Link href={`/${params.fellowship_id}/leadership/appointments`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  >
                    <UserCheck className="mr-2 h-4 w-4" />
                    Appointments
                  </Button>
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-3">
              <Link href={`/${params.fellowship_id}/leadership/public`}>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Public View
                </Button>
              </Link>
              <Link href={`/${params.fellowship_id}/leadership/permissions`}>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">{children}</main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
            <p>© 2024 Antioch Leadership Management System</p>
            <div className="flex items-center space-x-4">
              <span>Version 1.0</span>
              <Badge variant="secondary" className="text-xs">
                Active System
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

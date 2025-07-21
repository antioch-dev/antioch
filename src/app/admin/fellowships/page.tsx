import { DashboardLayout } from "@/app/_components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { mockFellowships, getFellowshipApplications } from "@/lib/mock-data"
import {
  Search,
  Plus,
  MapPin,
  Users,
  Calendar,
  Ban,
  Edit,
  Eye,
  AlertTriangle,
  Filter,
  Download,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function AdminFellowshipsPage() {
  const activeFellowships = mockFellowships.filter((f) => f.status === "active")
  const bannedFellowships = mockFellowships.filter((f) => f.status === "banned")
  const pendingApplications = getFellowshipApplications().filter((app) => app.status === "pending")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
      case "banned":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Banned</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>
    }
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="p-6 bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Fellowships</h1>
            <p className="text-gray-600">View and manage all fellowships on the platform</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100" asChild>
              <Link href="/admin/fellowships/applications">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Pending Applications ({pendingApplications.length})
              </Link>
            </Button>
           
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Total Fellowships</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{mockFellowships.length}</div>
              <p className="text-xs text-gray-600">All fellowships</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Active</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{activeFellowships.length}</div>
              <p className="text-xs text-gray-600">Currently active</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Banned</CardTitle>
              <Ban className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{bannedFellowships.length}</div>
              <p className="text-xs text-gray-600">Banned fellowships</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Pending</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{pendingApplications.length}</div>
              <p className="text-xs text-gray-600">Awaiting approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 bg-white border-gray-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search fellowships..." className="pl-10 bg-white border-gray-300 text-gray-900" />
              </div>
              <Button variant="outline" className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100">
                <Filter className="mr-2 h-4 w-4" />
                Filter by Status
              </Button>
              <Button variant="outline" className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100">
                <Download className="mr-2 h-4 w-4" />
                Export List
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Fellowships Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockFellowships.map((fellowship) => (
            <Card key={fellowship.id} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-gray-900">{fellowship.name}</CardTitle>
                    <CardDescription className="mt-1 text-gray-600">{fellowship.description}</CardDescription>
                  </div>
                  {getStatusBadge(fellowship.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="mr-2 h-4 w-4" />
                    {fellowship.location.address}, {fellowship.location.city}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="mr-2 h-4 w-4" />
                    {fellowship.memberCount} members
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    Est. {fellowship.established}
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Pastor: {fellowship.pastor}</p>
                    <p className="text-sm text-gray-600">{fellowship.contactEmail}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100"
                    asChild
                  >
                    <Link href={`/${fellowship.id}/dashboard`}>
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100"
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/fellowships/${fellowship.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Fellowship
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        Manage Members
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        View Events
                      </DropdownMenuItem>
                      {fellowship.status !== "banned" && (
                        <DropdownMenuItem className="text-red-600">
                          <Ban className="mr-2 h-4 w-4" />
                          Ban Fellowship
                        </DropdownMenuItem>
                      )}
                      {fellowship.status === "banned" && (
                        <DropdownMenuItem className="text-green-600">
                          <Users className="mr-2 h-4 w-4" />
                          Unban Fellowship
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {mockFellowships.length === 0 && (
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Fellowships Found</h3>
                <p className="text-gray-600 mb-6">Get started by adding your first fellowship to the platform.</p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Fellowship
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
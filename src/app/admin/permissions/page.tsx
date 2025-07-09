import { DashboardLayout } from "@/app/_components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockUsers, mockFellowships } from "@/lib/mock-data"
import { Search, Shield, Users, Settings, Save, RefreshCw, Edit, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AdminPermissionsPage() {
  const adminUsers = mockUsers.filter((u) => u.role === "admin")
  const pastorUsers = mockUsers.filter((u) => u.role === "pastor")
  const leaderUsers = mockUsers.filter((u) => u.role === "leader")

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200"
      case "pastor":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "leader":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="p-6 bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Permissions Management</h1>
            <p className="text-gray-600">Manage user roles and platform permissions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset to Defaults
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Total Users</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{mockUsers.length}</div>
              <p className="text-xs text-gray-600">Platform users</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Administrators</CardTitle>
              <Shield className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{adminUsers.length}</div>
              <p className="text-xs text-gray-600">Full access</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Pastors</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{pastorUsers.length}</div>
              <p className="text-xs text-gray-600">Fellowship leaders</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Leaders</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{leaderUsers.length}</div>
              <p className="text-xs text-gray-600">Ministry leaders</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* User Permissions */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                User Permissions
              </CardTitle>
              <CardDescription className="text-gray-600">Manage individual user permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search users..." className="pl-10 bg-white border-gray-300 text-gray-900" />
                </div>
              </div>

              <div className="space-y-4">
                {mockUsers.slice(0, 4).map((user) => (
                  <div key={user.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="bg-white border-gray-300">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm text-gray-900">Manage Fellowships</Label>
                        <Switch checked={user.permissions.canManageFellowships} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm text-gray-900">Manage Users</Label>
                        <Switch checked={user.permissions.canManageUsers} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm text-gray-900">View Analytics</Label>
                        <Switch checked={user.permissions.canViewAnalytics} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm text-gray-900">Manage Permissions</Label>
                        <Switch checked={user.permissions.canManagePermissions} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fellowship Permissions */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Fellowship Permissions
              </CardTitle>
              <CardDescription className="text-gray-600">Manage fellowship-level permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFellowships.slice(0, 3).map((fellowship) => (
                  <div key={fellowship.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{fellowship.name}</h3>
                        <p className="text-sm text-gray-600">{fellowship.pastor}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={fellowship.status === "active" ? "default" : "secondary"}
                          className={
                            fellowship.status === "active" ? "bg-green-100 text-green-800 border-green-200" : ""
                          }
                        >
                          {fellowship.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="bg-white border-gray-300">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              View Fellowship
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm text-gray-900">Create Events</Label>
                        <Switch checked={fellowship.permissions.canCreateEvents} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm text-gray-900">Manage Members</Label>
                        <Switch checked={fellowship.permissions.canManageMembers} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm text-gray-900">View Analytics</Label>
                        <Switch checked={fellowship.permissions.canViewAnalytics} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm text-gray-900">Edit Information</Label>
                        <Switch checked={fellowship.permissions.canEditInfo} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Role Templates */}
        <Card className="mt-6 bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">Permission Templates</CardTitle>
            <CardDescription className="text-gray-600">
              Pre-configured permission sets for different roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <h3 className="font-semibold text-gray-900 mb-2">Platform Admin</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Full platform access</li>
                  <li>• Manage all fellowships</li>
                  <li>• Manage all users</li>
                  <li>• View all analytics</li>
                  <li>• Manage permissions</li>
                </ul>
                <Button size="sm" className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white">
                  Apply Template
                </Button>
              </div>

              <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                <h3 className="font-semibold text-gray-900 mb-2">Pastor</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Manage own fellowship</li>
                  <li>• Create events</li>
                  <li>• Manage members</li>
                  <li>• View fellowship analytics</li>
                  <li>• Edit fellowship info</li>
                </ul>
                <Button size="sm" className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white">
                  Apply Template
                </Button>
              </div>

              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <h3 className="font-semibold text-gray-900 mb-2">Leader</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Create events</li>
                  <li>• View member list</li>
                  <li>• View basic analytics</li>
                  <li>• Assist with activities</li>
                </ul>
                <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white">
                  Apply Template
                </Button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-2">Member</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• View events</li>
                  <li>• RSVP to events</li>
                  <li>• Update own profile</li>
                  <li>• View fellowship info</li>
                </ul>
                <Button size="sm" className="w-full mt-3 bg-gray-600 hover:bg-gray-700 text-white">
                  Apply Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

"use client"

import { use, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getPermissions } from "@/lib/data-utils"
import type { Permission } from "@/lib/mock-data"
import { Shield, Plus, Search, MoreHorizontal, Edit, Trash2, UserCheck } from "lucide-react"

interface PermissionsPageProps {
  params: Promise<{ fellowship_id: string }>
}

export default function PermissionsPage({ params }: PermissionsPageProps) {
  const resolvedParams = use(params)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newPermission, setNewPermission] = useState({
    userId: "",
    userEmail: "",
    role: "department_head" as Permission["role"],
  })

  const permissions = getPermissions(resolvedParams.fellowship_id)

  const filteredPermissions = permissions.filter((permission) =>
    permission.userId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRoleBadgeVariant = (role: Permission["role"]) => {
    switch (role) {
      case "super_admin":
        return "destructive"
      case "tenure_manager":
        return "default"
      case "department_head":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getRoleDisplayName = (role: Permission["role"]) => {
    switch (role) {
      case "super_admin":
        return "Super Admin"
      case "tenure_manager":
        return "Tenure Manager"
      case "department_head":
        return "Department Head"
      default:
        return role
    }
  }

  const getActionDisplayNames = (actions: string[]) => {
    const actionMap: Record<string, string> = {
      create_tenure: "Create Tenures",
      edit_tenure: "Edit Tenures",
      delete_tenure: "Delete Tenures",
      manage_positions: "Manage Positions",
      manage_appointments: "Manage Appointments",
      manage_permissions: "Manage Permissions",
      view_appointments: "View Appointments",
      manage_department_positions: "Manage Department Positions",
    }

    return actions.map((action) => actionMap[action] || action)
  }

  const handleAddPermission = () => {
    console.log("Adding permission:", newPermission)
    setIsAddDialogOpen(false)
    setNewPermission({
      userId: "",
      userEmail: "",
      role: "department_head",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Permission Management</h2>
          <p className="text-muted-foreground">Manage user roles and access permissions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Permission
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Permission</DialogTitle>
              <DialogDescription>Grant permissions to a user for this fellowship</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userEmail">User Email</Label>
                <Input
                  id="userEmail"
                  placeholder="user@example.com"
                  value={newPermission.userEmail}
                  onChange={(e) => setNewPermission((prev) => ({ ...prev, userEmail: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  placeholder="user_123"
                  value={newPermission.userId}
                  onChange={(e) => setNewPermission((prev) => ({ ...prev, userId: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newPermission.role}
                  onValueChange={(value: Permission["role"]) => setNewPermission((prev) => ({ ...prev, role: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="department_head">Department Head</SelectItem>
                    <SelectItem value="tenure_manager">Tenure Manager</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPermission}>Add Permission</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Role Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-red-600" />
              Super Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Full system access</li>
              <li>• Manage all tenures</li>
              <li>• Manage all appointments</li>
              <li>• Manage permissions</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-blue-600" />
              Tenure Manager
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Create and edit tenures</li>
              <li>• Manage appointments</li>
              <li>• View all positions</li>
              <li>• Send invitations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-gray-600" />
              Department Head
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• View appointments</li>
              <li>• Manage department positions</li>
              <li>• Limited access</li>
              <li>• Department-specific</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by user ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Permissions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            User Permissions ({filteredPermissions.length})
          </CardTitle>
          <CardDescription>Current user roles and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPermissions.length === 0 ? (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No permissions found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Try adjusting your search terms" : "Get started by adding user permissions"}
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Permission
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Granted</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPermissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{permission.userId}</div>
                        <div className="text-sm text-muted-foreground">Fellowship Member</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(permission.role)}>
                        {getRoleDisplayName(permission.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getActionDisplayNames(permission.actions).map((action, index) => (
                          <div key={index} className="text-sm text-muted-foreground">
                            • {action}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{formatDate(permission.createdAt)}</span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove Permission
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
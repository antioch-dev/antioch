'use client'

import { useState, useCallback, useMemo } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { mockUsers, mockFellowships, type User } from '@/lib/mock-data'
import {
  Search,
  Plus,
  Mail,
  Shield,
  Users,
  UserCheck,
  Filter,
  Download,
  Edit,
  Trash2,
  MoreHorizontal,
  AlertCircle,
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

// In a real application, this would be fetched from a database or API
// and managed by a state management solution (e.g., React Query, Redux, Zustand)
let currentMockUsers = [...mockUsers]

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(currentMockUsers)
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'member',
    fellowshipId: '',
    username: '',
  })

  // State for managing permissions modal
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false)
  const [selectedUserForPermissions, setSelectedUserForPermissions] = useState<User | null>(null)
  const [currentPermissions, setCurrentPermissions] = useState({
    canManageFellowships: false,
    canManageUsers: false,
    canViewAnalytics: false,
    canManagePermissions: false,
  })

  // State for suspend/delete confirmation modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [actionType, setActionType] = useState<'suspend' | 'delete' | null>(null)
  const [userToActOn, setUserToActOn] = useState<User | null>(null)

  // State for filtering
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterFellowshipId, setFilterFellowshipId] = useState('all')

  const totalUsers = users.length
  const adminUsers = users.filter((u) => u.role === 'admin').length
  const pastorUsers = users.filter((u) => u.role === 'pastor').length
  const activeUsers = users.filter((u) => u.accountStatus === 'active').length

  const getFellowshipName = (fellowshipId?: string) => {
    if (!fellowshipId) return 'No Fellowship'
    // Fix: Removed unnecessary ! assertion
    const fellowship = mockFellowships.find((f) => f.id === fellowshipId)
    return fellowship?.name || 'Unknown Fellowship'
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'pastor':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'leader':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'suspended':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
  }

  // Handle input changes for the new user form
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setNewUserData((prev) => ({ ...prev, [id]: value }))
  }, [])

  // Handle select changes for role and fellowship
  const handleSelectChange = useCallback((value: string, field: string) => {
    setNewUserData((prev) => ({ ...prev, [field]: value }))
  }, [])

  // Handle adding a new user
  const handleAddUser = useCallback(() => {
    if (!newUserData.name || !newUserData.email || !newUserData.role || !newUserData.username) {
      alert('Please fill in all required fields: Name, Email, Role, Username.')
      return
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: newUserData.name,
      email: newUserData.email,
      phone: newUserData.phone || undefined,
      role: newUserData.role as 'admin' | 'pastor' | 'leader' | 'member',
      fellowshipId: newUserData.fellowshipId || undefined,
      // Fix: Use ! assertion to remove null/undefined from type more succinctly
      joinDate: new Date().toISOString().split('T')[0]!,
      avatar: undefined,
      isEmailVerified: false,
      isPhoneVerified: false,
      username: newUserData.username,
      accountStatus: 'active' as const,
      lastLogin: new Date().toISOString(),
      permissions: {
        canManageFellowships: newUserData.role === 'admin',
        canManageUsers: newUserData.role === 'admin',
        canViewAnalytics:
          newUserData.role === 'admin' || newUserData.role === 'pastor' || newUserData.role === 'leader',
        canManagePermissions: newUserData.role === 'admin',
      },
    }

    currentMockUsers.push(newUser)
    setUsers([...currentMockUsers])
    setIsAddUserModalOpen(false)
    setNewUserData({
      name: '',
      email: '',
      phone: '',
      role: 'member',
      fellowshipId: '',
      username: '',
    })
  }, [newUserData])

  // Handle opening the permissions modal
  const handleManagePermissions = useCallback((user: User) => {
    setSelectedUserForPermissions(user)
    setCurrentPermissions({ ...user.permissions }) // Load current permissions
    setIsPermissionsModalOpen(true)
  }, [])

  // Handle changes to permissions in the modal
  const handlePermissionChange = useCallback((permission: keyof User['permissions']) => {
    setCurrentPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }))
  }, [])

  // Handle saving permissions
  const handleSavePermissions = useCallback(() => {
    if (selectedUserForPermissions) {
      const updatedUsers = users.map((user) =>
        user.id === selectedUserForPermissions.id ? { ...user, permissions: { ...currentPermissions } } : user,
      )
      currentMockUsers = updatedUsers
      setUsers(updatedUsers)
      setIsPermissionsModalOpen(false)
      setSelectedUserForPermissions(null)
    }
  }, [selectedUserForPermissions, currentPermissions, users])

  // Handle initiating suspend action
  const confirmSuspendUser = useCallback((user: User) => {
    setUserToActOn(user)
    setActionType('suspend')
    setIsConfirmModalOpen(true)
  }, [])

  // Handle initiating delete action
  const confirmDeleteUser = useCallback((user: User) => {
    setUserToActOn(user)
    setActionType('delete')
    setIsConfirmModalOpen(true)
  }, [])

  // Execute suspend action
  const handleSuspendUser = useCallback(() => {
    if (userToActOn) {
      const updatedUsers = users.map((user) =>
        user.id === userToActOn.id ? { ...user, accountStatus: 'suspended' as const } : user,
      )
      currentMockUsers = updatedUsers
      setUsers(updatedUsers)
      setIsConfirmModalOpen(false)
      setUserToActOn(null)
      setActionType(null)
    }
  }, [userToActOn, users])

  // Execute delete action
  const handleDeleteUser = useCallback(() => {
    if (userToActOn) {
      const updatedUsers = users.filter((user) => user.id !== userToActOn.id)
      currentMockUsers = updatedUsers
      setUsers(updatedUsers)
      setIsConfirmModalOpen(false)
      setUserToActOn(null)
      setActionType(null)
    }
  }, [userToActOn, users])

  // Memoized filtered users list
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRole = filterRole === 'all' || user.role === filterRole

      const matchesFellowship = filterFellowshipId === 'all' || user.fellowshipId === filterFellowshipId

      return matchesSearch && matchesRole && matchesFellowship
    })
  }, [users, searchTerm, filterRole, filterFellowshipId])

  return (
    <DashboardLayout userRole="admin">
      <div className="p-6 bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage all platform users and their permissions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100">
              <Download className="mr-2 h-4 w-4" />
              Export Users
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsAddUserModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalUsers}</div>
              <p className="text-xs text-gray-500">Registered users</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{activeUsers}</div>
              <p className="text-xs text-gray-500">Currently active</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Administrators</CardTitle>
              <Shield className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{adminUsers}</div>
              <p className="text-xs text-gray-500">Platform admins</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Pastors</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{pastorUsers}</div>
              <p className="text-xs text-gray-500">Fellowship leaders</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 bg-white border-gray-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users by name or email..."
                  className="pl-10 bg-white border-gray-300 text-gray-900"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select onValueChange={setFilterRole} value={filterRole}>
                <SelectTrigger className="w-[180px] bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="pastor">Pastor</SelectItem>
                  <SelectItem value="leader">Leader</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={setFilterFellowshipId} value={filterFellowshipId}>
                <SelectTrigger className="w-[200px] bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by Fellowship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fellowships</SelectItem>
                  {mockFellowships.map((fellowship) => (
                    <SelectItem key={fellowship.id} value={fellowship.id}>
                      {fellowship.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">Platform Users</CardTitle>
            <CardDescription className="text-gray-600">Complete list of all registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Mail className="mr-1 h-3 w-3" />
                            {user.email}
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            {getFellowshipName(user.fellowshipId)}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Last login: {new Date(user.lastLogin).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right space-y-1">
                        <div className="flex gap-2">
                          <Badge className={getRoleBadgeColor(user.role)}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                          <Badge className={getStatusBadgeColor(user.accountStatus)}>
                            {user.accountStatus.replace('_', ' ').charAt(0).toUpperCase() +
                              user.accountStatus.replace('_', ' ').slice(1)}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">Joined {new Date(user.joinDate).toLocaleDateString()}</p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleManagePermissions(user)}>
                            <Shield className="mr-2 h-4 w-4" />
                            Manage Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          {user.role !== 'admin' && (
                            <DropdownMenuItem className="text-orange-600" onClick={() => confirmSuspendUser(user)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Suspend User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600" onClick={() => confirmDeleteUser(user)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 py-4">No users found matching your criteria.</p>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing 1-{filteredUsers.length} of {filteredUsers.length} users
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled className="bg-gray-50 text-gray-900 border-gray-300">
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled className="bg-gray-50 text-gray-900 border-gray-300">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add User Modal */}
      <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Add New User</DialogTitle>
            <DialogDescription className="text-gray-600">
              Fill in the details to add a new user to the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-gray-700">
                Name
              </Label>
              <Input
                id="name"
                value={newUserData.name}
                onChange={handleInputChange}
                className="col-span-3 bg-gray-50 border-gray-300 text-gray-900"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right text-gray-700">
                Username
              </Label>
              <Input
                id="username"
                value={newUserData.username}
                onChange={handleInputChange}
                className="col-span-3 bg-gray-50 border-gray-300 text-gray-900"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newUserData.email}
                onChange={handleInputChange}
                className="col-span-3 bg-gray-50 border-gray-300 text-gray-900"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right text-gray-700">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={newUserData.phone}
                onChange={handleInputChange}
                className="col-span-3 bg-gray-50 border-gray-300 text-gray-900"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right text-gray-700">
                Role
              </Label>
              <Select onValueChange={(value) => handleSelectChange(value, 'role')} value={newUserData.role}>
                <SelectTrigger className="col-span-3 bg-gray-50 border-gray-300 text-gray-900">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="leader">Leader</SelectItem>
                  <SelectItem value="pastor">Pastor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {newUserData.role !== 'admin' && ( // Only show fellowship selection if not an admin
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fellowshipId" className="text-right text-gray-700">
                  Fellowship
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange(value, 'fellowshipId')}
                  value={newUserData.fellowshipId}
                >
                  <SelectTrigger className="col-span-3 bg-gray-50 border-gray-300 text-gray-900">
                    <SelectValue placeholder="Select a fellowship" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockFellowships.map((fellowship) => (
                      <SelectItem key={fellowship.id} value={fellowship.id}>
                        {fellowship.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddUserModalOpen(false)}
              className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-700 text-white">
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Permissions Modal */}
      {selectedUserForPermissions && (
        <Dialog open={isPermissionsModalOpen} onOpenChange={setIsPermissionsModalOpen}>
          <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Manage Permissions for {selectedUserForPermissions.name}
              </DialogTitle>
              <DialogDescription className="text-gray-600">Adjust the permissions for this user.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {Object.keys(currentPermissions).map((key) => {
                const permissionKey = key as keyof User['permissions']
                return (
                  <div key={permissionKey} className="flex items-center space-x-2">
                    <Checkbox
                      id={permissionKey}
                      checked={currentPermissions[permissionKey]}
                      onCheckedChange={() => handlePermissionChange(permissionKey)}
                      disabled={selectedUserForPermissions.role === 'admin' && permissionKey === 'canManagePermissions'}
                    />
                    <Label htmlFor={permissionKey} className="text-gray-900">
                      {permissionKey.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    </Label>
                  </div>
                )
              })}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsPermissionsModalOpen(false)}
                className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button onClick={handleSavePermissions} className="bg-blue-600 hover:bg-blue-700 text-white">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Confirmation Modal for Suspend/Delete */}
      {userToActOn && (
        <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
          <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {actionType === 'suspend' ? 'Confirm Suspension' : 'Confirm Deletion'}
              </DialogTitle>
              {/* Changed DialogDescription to render as a div to avoid hydration error */}
              <DialogDescription asChild>
                <div>
                  <div className="flex items-center gap-2 text-red-500 mb-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>
                      Are you sure you want to {actionType === 'suspend' ? 'suspend' : 'delete'}
                      <span className="font-semibold"> {userToActOn.name}</span>?
                    </span>
                  </div>
                  <p className="text-gray-600">This action cannot be undone.</p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsConfirmModalOpen(false)}
                className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                className={
                  actionType === 'suspend'
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }
                onClick={actionType === 'suspend' ? handleSuspendUser : handleDeleteUser}
              >
                {actionType === 'suspend' ? 'Confirm Suspend' : 'Confirm Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  )
}

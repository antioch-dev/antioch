"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Users,
  MapPin,
  Edit,
  Plus,
  Trash2,
  UserCheck,
  Shield,
  Calendar,
  Clock,
  Phone,
  Mail,
  Globe,
  Save,
  MoreHorizontal,
  Info,
  Map,
  UserCog,
  ClipboardList,
  Church,
} from "lucide-react"

// Type definitions
type UserStatus = "active" | "pending" | "suspended"
type UserRole = "pastor" | "leader" | "member"

interface Fellowship {
  id: string
  name: string
  description: string
  pastor: string
  pastorEmail: string
  pastorPhone: string
  location: string
  address: string
  city: string
  state: string
  zipCode: string
  meetingDay: string
  meetingTime: string
  capacity: number
  currentMembers: number
  isActive: boolean
  hasChildcare: boolean
  hasParking: boolean
  isWheelchairAccessible: boolean
  website: string
  socialMedia: string
  specialPrograms: string
}

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  joinDate: string
  isAdmin: boolean
  lastLogin: string
}

interface Announcement {
  id: string
  title: string
  content: string
  date: string
  isActive: boolean
}

interface UpcomingEvent {
  id: string
  title: string
  date: string
  time: string
  description: string
}

interface ContactInfo {
  showPastor: boolean
  showPhone: boolean
  showEmail: boolean
  showAddress: boolean
}

interface HomePageContent {
  welcomeMessage: string
  announcements: Announcement[]
  upcomingEvents: UpcomingEvent[]
  contactInfo: ContactInfo
}

// Mock data
const mockFellowship: Fellowship = {
  id: "fellowship-1",
  name: "Grace Community Fellowship",
  description: "A vibrant community focused on worship and service",
  pastor: "John Smith",
  pastorEmail: "john@gracecommunity.org",
  pastorPhone: "+1 (555) 123-4567",
  location: "Downtown Campus",
  address: "123 Main Street",
  city: "Springfield",
  state: "IL",
  zipCode: "62701",
  meetingDay: "Sunday",
  meetingTime: "10:00 AM",
  capacity: 200,
  currentMembers: 150,
  isActive: true,
  hasChildcare: true,
  hasParking: true,
  isWheelchairAccessible: true,
  website: "https://gracecommunity.org",
  socialMedia: "@gracecommunity",
  specialPrograms: "Youth ministry, Bible study groups, community outreach",
}

const mockFellowshipUsers: User[] = [
  {
    id: "user-1",
    name: "John Smith",
    email: "john@example.com",
    role: "pastor",
    status: "active",
    joinDate: "2023-01-15",
    isAdmin: true,
    lastLogin: "2024-01-12T14:30:00Z",
  },
  {
    id: "user-2",
    name: "Jane Doe",
    email: "jane@example.com",
    role: "leader",
    status: "active",
    joinDate: "2023-02-20",
    isAdmin: true,
    lastLogin: "2024-01-11T16:45:00Z",
  },
  {
    id: "user-3",
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "member",
    status: "pending",
    joinDate: "2024-01-10",
    isAdmin: false,
    lastLogin: "2024-01-10T10:20:00Z",
  },
  {
    id: "user-4",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "member",
    status: "active",
    joinDate: "2023-08-05",
    isAdmin: false,
    lastLogin: "2024-01-08T08:15:00Z",
  },
  {
    id: "user-5",
    name: "Mike Davis",
    email: "mike@example.com",
    role: "leader",
    status: "pending",
    joinDate: "2024-01-08",
    isAdmin: false,
    lastLogin: "2024-01-08T12:30:00Z",
  },
]

const mockHomePageContent: HomePageContent = {
  welcomeMessage: "We&apos;re glad you&apos;re here.",
  announcements: [
    {
      id: "1",
      title: "Sunday Service Update",
      content: "Join us this Sunday at 10:00 AM for our weekly service.",
      date: "2024-01-15",
      isActive: true,
    },
    {
      id: "2",
      title: "Bible Study Group",
      content: "New Bible study group starting Wednesday evenings at 7:00 PM.",
      date: "2024-01-12",
      isActive: true,
    },
  ],
  upcomingEvents: [
    {
      id: "1",
      title: "Community Outreach",
      date: "2024-01-20",
      time: "9:00 AM",
      description: "Join us for community service at the local food bank.",
    },
    {
      id: "2",
      title: "Youth Ministry Meeting",
      date: "2024-01-18",
      time: "6:00 PM",
      description: "Monthly youth ministry planning meeting.",
    },
  ],
  contactInfo: {
    showPastor: true,
    showPhone: true,
    showEmail: true,
    showAddress: true,
  },
}

// Navigation items
const navigationItems = [
  {
    title: "Fellowship Info",
    icon: Info,
    value: "info",
  },
  {
    title: "Location",
    icon: Map,
    value: "location",
  },
  {
    title: "Admin Management",
    icon: UserCog,
    value: "admins",
  },
  {
    title: "Manage Users",
    icon: Users,
    value: "users",
  },
  {
    title: "Home Page",
    icon: ClipboardList,
    value: "homepage",
  },
]

export function FellowshipDashboard() {
  const [fellowship, setFellowship] = useState<Fellowship>(mockFellowship)
  const [users, setUsers] = useState<User[]>(mockFellowshipUsers)
  const [homePageContent, setHomePageContent] = useState<HomePageContent>(mockHomePageContent)
  const [activeView, setActiveView] = useState("info")
  const [isEditingInfo, setIsEditingInfo] = useState(false)
  const [isEditingLocation, setIsEditingLocation] = useState(false)
  const [isEditingHomePage, setIsEditingHomePage] = useState(false)
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false)
  const [newAdminEmail, setNewAdminEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alertDialog, setAlertDialog] = useState({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: () => {
      setAlertDialog({ ...alertDialog, isOpen: false })
    },
    showCancel: false,
  })

  const showAlert = (
    title: string,
    description: string,
    onConfirm: () => void = () => setAlertDialog({ ...alertDialog, isOpen: false }),
    showCancel = false,
  ) => {
    setAlertDialog({ isOpen: true, title, description, onConfirm, showCancel })
  }

  const activeUsers = users.filter((u) => u.status === "active").length
  const pendingUsers = users.filter((u) => u.status === "pending").length
  const adminUsers = users.filter((u) => u.isAdmin).length

  const handleUpdateFellowshipInfo = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsEditingInfo(false)
      showAlert("Success", "Fellowship information updated successfully!")
    } catch {
      showAlert("Error", "Failed to update fellowship information.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateLocationInfo = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsEditingLocation(false)
      showAlert("Success", "Location information updated successfully!")
    } catch {
      showAlert("Error", "Failed to update location information.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleApproveUser = async (userId: string) => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: "active" } : user)))
      showAlert("Success", "User approved successfully!")
    } catch {
      showAlert("Error", "Failed to approve user.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setUsers((prev) => prev.filter((user) => user.id !== userId))
      showAlert("Success", "User removed successfully!")
    } catch {
      showAlert("Error", "Failed to remove user.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleAdmin = async (userId: string) => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user)))
      showAlert("Success", "Admin status updated successfully!")
    } catch {
      showAlert("Error", "Failed to update admin status.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddAdmin = async () => {
    if (!newAdminEmail.trim() || !newAdminEmail.includes("@")) {
      showAlert("Validation Error", "Please enter a valid email address.")
      return
    }
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setNewAdminEmail("")
      setIsAddAdminOpen(false)
      showAlert("Success", "Admin invitation sent successfully!")
    } catch {
      showAlert("Error", "Failed to send admin invitation.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateHomePage = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsEditingHomePage(false)
      showAlert("Success", "Home page updated successfully!")
    } catch {
      showAlert("Error", "Failed to update home page.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "pastor":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "leader":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusBadgeColor = (status: UserStatus) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "suspended":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const renderContent = () => {
    switch (activeView) {
      case "info":
        return (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Fellowship Information</CardTitle>
                  <CardDescription>Basic information about your fellowship</CardDescription>
                </div>
                <Button variant="outline" onClick={() => setIsEditingInfo(!isEditingInfo)}>
                  <Edit className="mr-2 h-4 w-4" />
                  {isEditingInfo ? "Cancel" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditingInfo ? (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Fellowship Name</Label>
                      <Input
                        id="name"
                        value={fellowship.name}
                        onChange={(e) => setFellowship((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location Name</Label>
                      <Input
                        id="location"
                        value={fellowship.location}
                        onChange={(e) => setFellowship((prev) => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={fellowship.description}
                      onChange={(e) => setFellowship((prev) => ({ ...prev, description: e.target.value }))}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="pastor">Pastor Name</Label>
                      <Input
                        id="pastor"
                        value={fellowship.pastor}
                        onChange={(e) => setFellowship((prev) => ({ ...prev, pastor: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pastorEmail">Pastor Email</Label>
                      <Input
                        id="pastorEmail"
                        type="email"
                        value={fellowship.pastorEmail}
                        onChange={(e) => setFellowship((prev) => ({ ...prev, pastorEmail: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pastorPhone">Pastor Phone</Label>
                      <Input
                        id="pastorPhone"
                        value={fellowship.pastorPhone}
                        onChange={(e) => setFellowship((prev) => ({ ...prev, pastorPhone: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="meetingDay">Meeting Day</Label>
                      <Select
                        value={fellowship.meetingDay.toLowerCase()}
                        onValueChange={(value) =>
                          setFellowship((prev) => ({
                            ...prev,
                            meetingDay: value.charAt(0).toUpperCase() + value.slice(1),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sunday">Sunday</SelectItem>
                          <SelectItem value="monday">Monday</SelectItem>
                          <SelectItem value="tuesday">Tuesday</SelectItem>
                          <SelectItem value="wednesday">Wednesday</SelectItem>
                          <SelectItem value="thursday">Thursday</SelectItem>
                          <SelectItem value="friday">Friday</SelectItem>
                          <SelectItem value="saturday">Saturday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meetingTime">Meeting Time</Label>
                      <Input
                        id="meetingTime"
                        value={fellowship.meetingTime}
                        onChange={(e) => setFellowship((prev) => ({ ...prev, meetingTime: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={fellowship.capacity}
                        onChange={(e) => setFellowship((prev) => ({ ...prev, capacity: Number(e.target.value) }))}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditingInfo(false)} disabled={isSubmitting}>
                      Cancel
                    </Button>
                    <Button onClick={() => void handleUpdateFellowshipInfo()} disabled={isSubmitting}>
                      <Save className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-2">Basic Information</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Name:</span> {fellowship.name}
                        </p>
                        <p>
                          <span className="font-medium">Location:</span> {fellowship.location}
                        </p>
                        <p>
                          <span className="font-medium">Description:</span> {fellowship.description}
                        </p>
                        <p>
                          <span className="font-medium">Capacity:</span> {fellowship.capacity} members
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Leadership</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Pastor:</span> {fellowship.pastor}
                        </p>
                        <p className="flex items-center">
                          <Mail className="mr-1 h-3 w-3 text-gray-500" />
                          <span className="font-medium">Email:</span> {fellowship.pastorEmail}
                        </p>
                        <p className="flex items-center">
                          <Phone className="mr-1 h-3 w-3 text-gray-500" />
                          <span className="font-medium">Phone:</span> {fellowship.pastorPhone}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-2">Meeting Details</h3>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3 text-gray-500" />
                          <span className="font-medium">Day:</span> {fellowship.meetingDay}
                        </p>
                        <p className="flex items-center">
                          <Clock className="mr-1 h-3 w-3 text-gray-500" />
                          <span className="font-medium">Time:</span> {fellowship.meetingTime}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Programs & Online Presence</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Special Programs:</span> {fellowship.specialPrograms}
                        </p>
                        <p className="flex items-center">
                          <Globe className="mr-1 h-3 w-3 text-gray-500" />
                          <span className="font-medium">Website:</span>{" "}
                          <a
                            href={fellowship.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {fellowship.website}
                          </a>
                        </p>
                        <p>
                          <span className="font-medium">Social Media:</span> {fellowship.socialMedia}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )

      case "location":
        return (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Location Details</CardTitle>
                  <CardDescription>Physical address and accessibility information</CardDescription>
                </div>
                <Button variant="outline" onClick={() => setIsEditingLocation(!isEditingLocation)}>
                  <Edit className="mr-2 h-4 w-4" />
                  {isEditingLocation ? "Cancel" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditingLocation ? (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={fellowship.address}
                        onChange={(e) => setFellowship((prev) => ({ ...prev, address: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={fellowship.city}
                        onChange={(e) => setFellowship((prev) => ({ ...prev, city: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={fellowship.state}
                        onChange={(e) => setFellowship((prev) => ({ ...prev, state: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input
                        id="zipCode"
                        value={fellowship.zipCode}
                        onChange={(e) => setFellowship((prev) => ({ ...prev, zipCode: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3 pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasChildcare"
                        checked={fellowship.hasChildcare}
                        onCheckedChange={(checked) =>
                          setFellowship((prev) => ({ ...prev, hasChildcare: Boolean(checked) }))
                        }
                      />
                      <Label htmlFor="hasChildcare">Has Childcare</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasParking"
                        checked={fellowship.hasParking}
                        onCheckedChange={(checked) =>
                          setFellowship((prev) => ({ ...prev, hasParking: Boolean(checked) }))
                        }
                      />
                      <Label htmlFor="hasParking">Has Parking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isWheelchairAccessible"
                        checked={fellowship.isWheelchairAccessible}
                        onCheckedChange={(checked) =>
                          setFellowship((prev) => ({ ...prev, isWheelchairAccessible: Boolean(checked) }))
                        }
                      />
                      <Label htmlFor="isWheelchairAccessible">Wheelchair Accessible</Label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setIsEditingLocation(false)} disabled={isSubmitting}>
                      Cancel
                    </Button>
                    <Button onClick={() => void handleUpdateLocationInfo()} disabled={isSubmitting}>
                      <Save className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Address</h3>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3 text-gray-500" /> {fellowship.address}
                      </p>
                      <p>
                        {fellowship.city}, {fellowship.state} {fellowship.zipCode}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Amenities & Accessibility</h3>
                    <div className="flex flex-wrap gap-2">
                      {fellowship.hasChildcare && <Badge variant="secondary">Childcare Available</Badge>}
                      {fellowship.hasParking && <Badge variant="secondary">Parking Available</Badge>}
                      {fellowship.isWheelchairAccessible && <Badge variant="secondary">Wheelchair Accessible</Badge>}
                      {!fellowship.hasChildcare && !fellowship.hasParking && !fellowship.isWheelchairAccessible && (
                        <p className="text-sm text-gray-500">No specific amenities listed.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )

      case "admins":
        return (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Admin Management</CardTitle>
                  <CardDescription>Manage users with administrative privileges.</CardDescription>
                </div>
                <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Invite Admin
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Invite New Administrator</DialogTitle>
                      <DialogDescription>
                        Enter the email address of the user you want to invite as an administrator.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="adminEmail">Email Address</Label>
                        <Input
                          id="adminEmail"
                          type="email"
                          placeholder="user@example.com"
                          value={newAdminEmail}
                          onChange={(e) => setNewAdminEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddAdminOpen(false)} disabled={isSubmitting}>
                        Cancel
                      </Button>
                      <Button onClick={() => void handleAddAdmin()} disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Invitation"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.filter((u) => u.isAdmin).length === 0 ? (
                  <p className="text-gray-600">No administrators found.</p>
                ) : (
                  users
                    .filter((u) => u.isAdmin)
                    .map((user) => (
                      <Card key={user.id} className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                showAlert(
                                  "Confirm Removal",
                                  `Are you sure you want to remove ${user.name} as an admin? They will lose administrative privileges.`,
                                  () => void handleToggleAdmin(user.id),
                                  true,
                                )
                              }
                              className="text-red-600"
                            >
                              Remove Admin Access
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </Card>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        )

      case "users":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Manage Users</CardTitle>
              <CardDescription>Approve new members and manage existing user roles.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.length === 0 ? (
                  <p className="text-gray-600">No users found.</p>
                ) : (
                  users.map((user) => (
                    <Card key={user.id} className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
                            <Badge className={getStatusBadgeColor(user.status)}>{user.status}</Badge>
                            {user.isAdmin && (
                              <Badge className="bg-purple-100 text-purple-800 border-purple-200">Admin</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {user.status === "pending" && (
                          <Button onClick={() => void handleApproveUser(user.id)} size="sm" disabled={isSubmitting}>
                            Approve
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                showAlert(
                                  "Confirm Deletion",
                                  `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
                                  () => void handleDeleteUser(user.id),
                                  true,
                                )
                              }
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                showAlert(
                                  "Confirm Admin Status Change",
                                  `Are you sure you want to ${user.isAdmin ? "remove" : "grant"} admin access for ${user.name}?`,
                                  () => void handleToggleAdmin(user.id),
                                  true,
                                )
                              }
                            >
                              <Shield className="mr-2 h-4 w-4" /> {user.isAdmin ? "Remove Admin" : "Make Admin"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )

      case "homepage":
        return (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Home Page Content</CardTitle>
                  <CardDescription>
                    Customize the welcome message, announcements, and events displayed on your fellowship&apos;s public home
                    page.
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={() => setIsEditingHomePage(!isEditingHomePage)}>
                  <Edit className="mr-2 h-4 w-4" />
                  {isEditingHomePage ? "Cancel" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditingHomePage ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="welcomeMessage">Welcome Message</Label>
                    <Textarea
                      id="welcomeMessage"
                      value={homePageContent.welcomeMessage}
                      onChange={(e) => setHomePageContent((prev) => ({ ...prev, welcomeMessage: e.target.value }))}
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Announcements</h3>
                    {homePageContent.announcements.map((announcement, index) => (
                      <Card key={announcement.id} className="p-4 space-y-2">
                        <div className="space-y-2">
                          <Label htmlFor={`announcement-title-${index}`}>Title</Label>
                          <Input
                            id={`announcement-title-${index}`}
                            value={announcement.title}
                            onChange={(e) =>
                              setHomePageContent((prev) => ({
                                ...prev,
                                announcements: prev.announcements.map((a) =>
                                  a.id === announcement.id ? { ...a, title: e.target.value } : a,
                                ),
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`announcement-content-${index}`}>Content</Label>
                          <Textarea
                            id={`announcement-content-${index}`}
                            value={announcement.content}
                            onChange={(e) =>
                              setHomePageContent((prev) => ({
                                ...prev,
                                announcements: prev.announcements.map((a) =>
                                  a.id === announcement.id ? { ...a, content: e.target.value } : a,
                                ),
                              }))
                            }
                            className="min-h-[60px]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`announcement-date-${index}`}>Date (YYYY-MM-DD)</Label>
                          <Input
                            id={`announcement-date-${index}`}
                            type="date"
                            value={announcement.date}
                            onChange={(e) =>
                              setHomePageContent((prev) => ({
                                ...prev,
                                announcements: prev.announcements.map((a) =>
                                  a.id === announcement.id ? { ...a, date: e.target.value } : a,
                                ),
                              }))
                            }
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditingHomePage(false)} disabled={isSubmitting}>
                      Cancel
                    </Button>
                    <Button onClick={() => void handleUpdateHomePage()} disabled={isSubmitting}>
                      <Save className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Welcome Message</h3>
                    <p className="text-sm text-gray-600">{homePageContent.welcomeMessage}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Active Announcements</h3>
                    <div className="space-y-2">
                      {homePageContent.announcements
                        .filter((a) => a.isActive)
                        .map((announcement) => (
                          <Card key={announcement.id} className="p-3">
                            <h4 className="font-medium">{announcement.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                            <p className="text-xs text-gray-500 mt-2">{announcement.date}</p>
                          </Card>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Upcoming Events</h3>
                    <div className="space-y-2">
                      {homePageContent.upcomingEvents.map((event) => (
                        <Card key={event.id} className="p-3">
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {event.date} at {event.time}
                          </p>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative">
        <Sidebar className="border-r fixed left-0 top-0 h-full z-10" style={{ width: "240px" }}>
          <SidebarHeader className="border-b px-6 py-4">
            <div className="flex items-center space-x-2">
              <Church className="h-6 w-6" />
              <div>
                <h2 className="text-lg font-semibold">Fellowship Admin</h2>
                <p className="text-sm text-muted-foreground">{fellowship.name}</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.value}>
                      <SidebarMenuButton onClick={() => setActiveView(item.value)} isActive={activeView === item.value}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">Pastor</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex-1 flex flex-col ml-[240px]">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6 bg-background">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-semibold">{fellowship.name}</h1>
                  <p className="text-sm text-muted-foreground">Fellowship Management Dashboard</p>
                </div>
                <Badge variant={fellowship.isActive ? "default" : "secondary"}>
                  {fellowship.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {/* Overview Stats */}
            <div className="grid gap-4 md:grid-cols-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{fellowship.currentMembers}</div>
                  <p className="text-xs text-muted-foreground">of {fellowship.capacity} capacity</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeUsers}</div>
                  <p className="text-xs text-muted-foreground">Approved members</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingUsers}</div>
                  <p className="text-xs text-muted-foreground">Awaiting approval</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Administrators</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminUsers}</div>
                  <p className="text-xs text-muted-foreground">Fellowship admins</p>
                </CardContent>
              </Card>
            </div>
            {/* Main Content */}
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
      {/* Alert Dialog */}
      <AlertDialog open={alertDialog.isOpen} onOpenChange={(open) => setAlertDialog({ ...alertDialog, isOpen: open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertDialog.title}</AlertDialogTitle>
            <AlertDialogDescription>{alertDialog.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {alertDialog.showCancel && (
              <AlertDialogCancel onClick={() => setAlertDialog({ ...alertDialog, isOpen: false })}>
                Cancel
              </AlertDialogCancel>
            )}
            <AlertDialogAction onClick={alertDialog.onConfirm}>
              {alertDialog.showCancel ? "Confirm" : "OK"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  )
}
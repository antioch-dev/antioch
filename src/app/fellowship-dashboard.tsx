"use client"

import { useState } from "react"
import { DashboardLayout } from "@/app/_components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Users,
    MapPin,
    Edit,
    Plus,
    Trash2,
    UserCheck,
    Shield,
    Home,
    Calendar,
    Clock,
    Phone,
    Mail,
    Globe,
    Save,
    MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// --- Type Definitions ---
type UserStatus = "active" | "pending" | "suspended"
type UserRole = "pastor" | "leader" | "member"

interface Fellowship {
    id: string;
    name: string;
    description: string;
    pastor: string;
    pastorEmail: string;
    pastorPhone: string;
    location: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    meetingDay: string;
    meetingTime: string;
    capacity: number;
    currentMembers: number;
    isActive: boolean;
    hasChildcare: boolean;
    hasParking: boolean;
    isWheelchairAccessible: boolean;
    website: string;
    socialMedia: string;
    specialPrograms: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    joinDate: string;
    isAdmin: boolean;
    lastLogin: string;
}

interface Announcement {
    id: string;
    title: string;
    content: string;
    date: string | undefined; // MODIFIED: Allows date to be optional or undefined
    isActive: boolean;
}

interface UpcomingEvent {
    id: string;
    title: string;
    date: string;
    time: string;
    description: string;
}

interface ContactInfo {
    showPastor: boolean;
    showPhone: boolean;
    showEmail: boolean;
    showAddress: boolean;
}

interface HomePageContent {
    welcomeMessage: string;
    announcements: Announcement[];
    upcomingEvents: UpcomingEvent[];
    contactInfo: ContactInfo;
}

// Mock fellowship data
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

// Mock fellowship users
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

// Mock home page content
const mockHomePageContent: HomePageContent = {
    welcomeMessage: "Welcome to Grace Community Fellowship! We're glad you're here.",
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

export default function FellowshipDashboard() {
    const [fellowship, setFellowship] = useState<Fellowship>(mockFellowship)
    const [users, setUsers] = useState<User[]>(mockFellowshipUsers)
    const [homePageContent, setHomePageContent] = useState<HomePageContent>(mockHomePageContent)
    const [isEditingInfo, setIsEditingInfo] = useState(false)
    const [isEditingHomePage, setIsEditingHomePage] = useState(false)
    const [isAddAdminOpen, setIsAddAdminOpen] = useState(false)
    const [newAdminEmail, setNewAdminEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const activeUsers = users.filter((u) => u.status === "active").length
    const pendingUsers = users.filter((u) => u.status === "pending").length
    const adminUsers = users.filter((u) => u.isAdmin).length

    const handleUpdateFellowshipInfo = async () => {
        setIsSubmitting(true)
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setIsEditingInfo(false)
            alert("Fellowship information updated successfully!")
        } catch (_error) { // Changed 'error' to '_error'
            alert("Failed to update fellowship information.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleApproveUser = async (userId: string) => {
        setIsSubmitting(true)
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500))
            setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: "active" } : user)))
            alert("User approved successfully!")
        } catch (_error) { // Changed 'error' to '_error'
            alert("Failed to approve user.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteUser = async (userId: string) => {
        setIsSubmitting(true)
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500))
            setUsers((prev) => prev.filter((user) => user.id !== userId))
            alert("User removed successfully!")
        } catch (_error) { // Changed 'error' to '_error'
            alert("Failed to remove user.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleToggleAdmin = async (userId: string) => {
        setIsSubmitting(true)
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500))
            setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user)))
            alert("Admin status updated successfully!")
        } catch (_error) { // Changed 'error' to '_error'
            alert("Failed to update admin status.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleAddAdmin = async () => {
        if (!newAdminEmail.trim() || !newAdminEmail.includes("@")) {
            alert("Please enter a valid email address.")
            return
        }

        setIsSubmitting(true)
        try {
            // Simulate API call: In a real app, you'd send an invitation email
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setNewAdminEmail("")
            setIsAddAdminOpen(false)
            alert("Admin invitation sent successfully!")
        } catch (_error) { // Changed 'error' to '_error'
            alert("Failed to send admin invitation.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleUpdateHomePage = async () => {
        setIsSubmitting(true)
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setIsEditingHomePage(false)
            alert("Home page updated successfully!")
        } catch (_error) { // Changed 'error' to '_error'
            alert("Failed to update home page.")
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

    return (
        <DashboardLayout userRole="pastor">
            <div className="p-6 bg-white min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{fellowship.name}</h1>
                        <p className="text-gray-600">Fellowship Management Dashboard</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                        {fellowship.isActive ? "Active" : "Inactive"}
                    </Badge>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-4 mb-6">
                    <Card className="bg-white border-gray-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-900">Total Members</CardTitle>
                            <Users className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{fellowship.currentMembers}</div>
                            <p className="text-xs text-gray-500">of {fellowship.capacity} capacity</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-900">Active Users</CardTitle>
                            <UserCheck className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{activeUsers}</div>
                            <p className="text-xs text-gray-500">Approved members</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-900">Pending Approval</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{pendingUsers}</div>
                            <p className="text-xs text-gray-500">Awaiting approval</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-900">Administrators</CardTitle>
                            <Shield className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{adminUsers}</div>
                            <p className="text-xs text-gray-500">Fellowship admins</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="info" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="info">Fellowship Info</TabsTrigger>
                        <TabsTrigger value="location">Location</TabsTrigger>
                        <TabsTrigger value="admins">Admin Management</TabsTrigger>
                        <TabsTrigger value="users">Manage Users</TabsTrigger>
                        <TabsTrigger value="homepage">Home Page</TabsTrigger>
                    </TabsList>

                    {/* Fellowship Information Tab */}
                    <TabsContent value="info">
                        <Card className="bg-white border-gray-200 shadow-sm">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="text-gray-900">Fellowship Information</CardTitle>
                                        <CardDescription className="text-gray-600">Basic information about your fellowship</CardDescription>
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsEditingInfo(!isEditingInfo)}
                                        className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100"
                                    >
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
                                            <Button
                                                variant="outline"
                                                onClick={() => setIsEditingInfo(false)}
                                                disabled={isSubmitting}
                                                className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleUpdateFellowshipInfo}
                                                disabled={isSubmitting}
                                                className="bg-blue-600 hover:bg-blue-700"
                                            >
                                                <Save className="mr-2 h-4 w-4" />
                                                {isSubmitting ? "Saving..." : "Save Changes"}
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-2">Basic Information</h3>
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
                                                <h3 className="font-semibold text-gray-900 mb-2">Leadership</h3>
                                                <div className="space-y-2 text-sm">
                                                    <p>
                                                        <span className="font-medium">Pastor:</span> {fellowship.pastor}
                                                    </p>
                                                    <p className="flex items-center">
                                                        <Mail className="mr-1 h-3 w-3" />
                                                        {fellowship.pastorEmail}
                                                    </p>
                                                    <p className="flex items-center">
                                                        <Phone className="mr-1 h-3 w-3" />
                                                        {fellowship.pastorPhone}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Meeting Schedule</h3>
                                            <p className="text-sm flex items-center">
                                                <Calendar className="mr-1 h-3 w-3" />
                                                {fellowship.meetingDay}s at {fellowship.meetingTime}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Location Tab */}
                    <TabsContent value="location">
                        <Card className="bg-white border-gray-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-gray-900">
                                    <MapPin className="h-5 w-5" />
                                    Fellowship Location
                                </CardTitle>
                                <CardDescription className="text-gray-600">Physical address and location details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-3">Address Information</h3>
                                        <div className="space-y-2 text-sm">
                                            <p className="flex items-start">
                                                <MapPin className="mr-2 h-4 w-4 mt-0.5 text-gray-500" />
                                                <span>
                                                    {fellowship.address}
                                                    <br />
                                                    {fellowship.city}, {fellowship.state} {fellowship.zipCode}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center text-sm">
                                                <div
                                                    className={`w-2 h-2 rounded-full mr-2 ${fellowship.hasParking ? "bg-green-500" : "bg-red-500"}`}
                                                />
                                                Parking {fellowship.hasParking ? "Available" : "Not Available"}
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <div
                                                    className={`w-2 h-2 rounded-full mr-2 ${fellowship.hasChildcare ? "bg-green-500" : "bg-red-500"}`}
                                                />
                                                Childcare {fellowship.hasChildcare ? "Available" : "Not Available"}
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <div
                                                    className={`w-2 h-2 rounded-full mr-2 ${fellowship.isWheelchairAccessible ? "bg-green-500" : "bg-red-500"}`}
                                                />
                                                Wheelchair {fellowship.isWheelchairAccessible ? "Accessible" : "Not Accessible"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 border-t">
                                    <h3 className="font-semibold text-gray-900 mb-3">Online Presence</h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="flex items-center text-sm">
                                            <Globe className="mr-2 h-4 w-4 text-gray-500" />
                                            <a href={fellowship.website} className="text-blue-600 hover:underline">
                                                {fellowship.website}
                                            </a>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <span className="mr-2 text-gray-500">#</span>
                                            {fellowship.socialMedia}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Admin Management Tab */}
                    <TabsContent value="admins">
                        <Card className="bg-white border-gray-200 shadow-sm">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="flex items-center gap-2 text-gray-900">
                                            <Shield className="h-5 w-5" />
                                            Admin Management
                                        </CardTitle>
                                        <CardDescription className="text-gray-600">Manage fellowship administrators</CardDescription>
                                    </div>
                                    <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
                                        <DialogTrigger asChild>
                                            <Button className="bg-blue-600 hover:bg-blue-700">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Admin
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Add New Administrator</DialogTitle>
                                                <DialogDescription>
                                                    Send an admin invitation to a fellowship member or external user.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="adminEmail">Email Address</Label>
                                                    <Input
                                                        id="adminEmail"
                                                        type="email"
                                                        value={newAdminEmail}
                                                        onChange={(e) => setNewAdminEmail(e.target.value)}
                                                        placeholder="admin@example.com"
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setIsAddAdminOpen(false)} disabled={isSubmitting}>
                                                    Cancel
                                                </Button>
                                                <Button
                                                    onClick={handleAddAdmin}
                                                    disabled={isSubmitting}
                                                    className="bg-blue-600 hover:bg-blue-700"
                                                >
                                                    {isSubmitting ? "Sending..." : "Send Invitation"}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {users
                                        .filter((user) => user.isAdmin)
                                        .map((admin) => (
                                            <div
                                                key={admin.id}
                                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarFallback className="bg-blue-100 text-blue-600">
                                                            {admin.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")
                                                                .toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{admin.name}</p>
                                                        <p className="text-sm text-gray-600">{admin.email}</p>
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
                                                        <DropdownMenuItem onClick={() => handleToggleAdmin(admin.id)} disabled={isSubmitting}>
                                                            {admin.isAdmin ? "Revoke Admin" : "Make Admin"}
                                                        </DropdownMenuItem>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Remove User
                                                                </DropdownMenuItem>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This action cannot be undone. This will permanently remove {admin.name} from your
                                                                        fellowship.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleDeleteUser(admin.id)}
                                                                        disabled={isSubmitting}
                                                                        className="bg-red-600 hover:bg-red-700"
                                                                    >
                                                                        Continue
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        ))}
                                    {adminUsers === 0 && (
                                        <p className="text-center text-gray-500 py-8">No administrators found. Add one above.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Manage Users Tab */}
                    <TabsContent value="users">
                        <Card className="bg-white border-gray-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-gray-900">
                                    <Users className="h-5 w-5" />
                                    Manage Fellowship Users
                                </CardTitle>
                                <CardDescription className="text-gray-600">View and manage all members of your fellowship.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {users.length > 0 ? (
                                        users.map((user) => (
                                            <div
                                                key={user.id}
                                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarFallback className="bg-gray-200 text-gray-700">
                                                            {user.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")
                                                                .toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{user.name}</p>
                                                        <p className="text-sm text-gray-600">{user.email}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Badge variant="outline" className={`border ${getRoleBadgeColor(user.role)}`}>
                                                                {user.role}
                                                            </Badge>
                                                            <Badge variant="outline" className={`border ${getStatusBadgeColor(user.status)}`}>
                                                                {user.status}
                                                            </Badge>
                                                            {user.isAdmin && (
                                                                <Badge className="bg-red-100 text-red-800 border-red-200">Admin</Badge>
                                                            )}
                                                        </div>
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
                                                        {user.status === "pending" && (
                                                            <DropdownMenuItem onClick={() => handleApproveUser(user.id)} disabled={isSubmitting}>
                                                                <UserCheck className="mr-2 h-4 w-4" />
                                                                Approve User
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuItem onClick={() => handleToggleAdmin(user.id)} disabled={isSubmitting}>
                                                            <Shield className="mr-2 h-4 w-4" />
                                                            {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                                                        </DropdownMenuItem>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Remove User
                                                                </DropdownMenuItem>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This action cannot be undone. This will permanently remove {user.name} from your
                                                                        fellowship.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleDeleteUser(user.id)}
                                                                        disabled={isSubmitting}
                                                                        className="bg-red-600 hover:bg-red-700"
                                                                    >
                                                                        Continue
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500 py-8">No users found.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Home Page Tab */}
                    <TabsContent value="homepage">
                        <Card className="bg-white border-gray-200 shadow-sm">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="flex items-center gap-2 text-gray-900">
                                            <Home className="h-5 w-5" />
                                            Home Page Content
                                        </CardTitle>
                                        <CardDescription className="text-gray-600">Customize the content displayed on your fellowship&apos;s home page.</CardDescription> {/* Fixed unescaped apostrophe */}
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsEditingHomePage(!isEditingHomePage)}
                                        className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100"
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        {isEditingHomePage ? "Cancel" : "Edit"}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {isEditingHomePage ? (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="welcomeMessage">Welcome Message</Label>
                                            <Textarea
                                                id="welcomeMessage"
                                                value={homePageContent.welcomeMessage}
                                                onChange={(e) =>
                                                    setHomePageContent((prev) => ({ ...prev, welcomeMessage: e.target.value }))
                                                }
                                                className="min-h-[80px]"
                                            />
                                        </div>

                                        {/* Announcements */}
                                        <h3 className="font-semibold text-gray-900 mb-3">Announcements</h3>
                                        <div className="space-y-3">
                                            {homePageContent.announcements.map((announcement, index) => (
                                                <Card key={announcement.id} className="p-4 bg-white border-gray-200">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`announcement-title-${index}`}>Title</Label>
                                                            <Input
                                                                id={`announcement-title-${index}`}
                                                                value={announcement.title}
                                                                onChange={(e) =>
                                                                    setHomePageContent((prev) => ({
                                                                        ...prev,
                                                                        announcements: prev.announcements.map((a) =>
                                                                            a.id === announcement.id ? { ...a, title: e.target.value } : a
                                                                        ),
                                                                    }))
                                                                }
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`announcement-date-${index}`}>Date (YYYY-MM-DD)</Label>
                                                            <Input
                                                                id={`announcement-date-${index}`}
                                                                type="date"
                                                                value={announcement.date || ''} // Handle undefined gracefully for input
                                                                onChange={(e) =>
                                                                    setHomePageContent((prev) => ({
                                                                        ...prev,
                                                                        announcements: prev.announcements.map((a) =>
                                                                            a.id === announcement.id ? { ...a, date: e.target.value } : a
                                                                        ),
                                                                    }))
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2 mt-4">
                                                        <Label htmlFor={`announcement-content-${index}`}>Content</Label>
                                                        <Textarea
                                                            id={`announcement-content-${index}`}
                                                            value={announcement.content}
                                                            onChange={(e) =>
                                                                setHomePageContent((prev) => ({
                                                                    ...prev,
                                                                    announcements: prev.announcements.map((a) =>
                                                                        a.id === announcement.id ? { ...a, content: e.target.value } : a
                                                                    ),
                                                                }))
                                                            }
                                                            className="min-h-[60px]"
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-between mt-4">
                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`announcement-active-${index}`}
                                                                checked={announcement.isActive}
                                                                onCheckedChange={(checked) =>
                                                                    setHomePageContent((prev) => ({
                                                                        ...prev,
                                                                        announcements: prev.announcements.map((a) =>
                                                                            a.id === announcement.id ? { ...a, isActive: !!checked } : a
                                                                        ),
                                                                    }))
                                                                }
                                                            />
                                                            <label
                                                                htmlFor={`announcement-active-${index}`}
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                Active
                                                            </label>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-red-600 hover:bg-red-50"
                                                            onClick={() =>
                                                                setHomePageContent((prev) => ({
                                                                    ...prev,
                                                                    announcements: prev.announcements.filter((a) => a.id !== announcement.id),
                                                                }))
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </Card>
                                            ))}
                                            <Button
                                                variant="outline"
                                                className="w-full bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100"
                                                onClick={() =>
                                                    setHomePageContent((prev) => ({
                                                        ...prev,
                                                        announcements: [
                                                            ...prev.announcements,
                                                            {
                                                                id: `new-${Date.now()}`,
                                                                title: "",
                                                                content: "",
                                                                date: undefined, // New announcements start with undefined date
                                                                isActive: true,
                                                            },
                                                        ],
                                                    }))
                                                }
                                            >
                                                <Plus className="mr-2 h-4 w-4" /> Add Announcement
                                            </Button>
                                        </div>

                                        {/* Upcoming Events */}
                                        <h3 className="font-semibold text-gray-900 mt-6 mb-3">Upcoming Events</h3>
                                        <div className="space-y-3">
                                            {homePageContent.upcomingEvents.map((event, index) => (
                                                <Card key={event.id} className="p-4 bg-white border-gray-200">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`event-title-${index}`}>Title</Label>
                                                            <Input
                                                                id={`event-title-${index}`}
                                                                value={event.title}
                                                                onChange={(e) =>
                                                                    setHomePageContent((prev) => ({
                                                                        ...prev,
                                                                        upcomingEvents: prev.upcomingEvents.map((eItem) =>
                                                                            eItem.id === event.id ? { ...eItem, title: e.target.value } : eItem
                                                                        ),
                                                                    }))
                                                                }
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`event-date-${index}`}>Date (YYYY-MM-DD)</Label>
                                                            <Input
                                                                id={`event-date-${index}`}
                                                                type="date"
                                                                value={event.date}
                                                                onChange={(e) =>
                                                                    setHomePageContent((prev) => ({
                                                                        ...prev,
                                                                        upcomingEvents: prev.upcomingEvents.map((eItem) =>
                                                                            eItem.id === event.id ? { ...eItem, date: e.target.value } : eItem
                                                                        ),
                                                                    }))
                                                                }
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`event-time-${index}`}>Time</Label>
                                                            <Input
                                                                id={`event-time-${index}`}
                                                                type="time"
                                                                value={event.time}
                                                                onChange={(e) =>
                                                                    setHomePageContent((prev) => ({
                                                                        ...prev,
                                                                        upcomingEvents: prev.upcomingEvents.map((eItem) =>
                                                                            eItem.id === event.id ? { ...eItem, time: e.target.value } : eItem
                                                                        ),
                                                                    }))
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2 mt-4">
                                                        <Label htmlFor={`event-description-${index}`}>Description</Label>
                                                        <Textarea
                                                            id={`event-description-${index}`}
                                                            value={event.description}
                                                            onChange={(e) =>
                                                                setHomePageContent((prev) => ({
                                                                    ...prev,
                                                                    upcomingEvents: prev.upcomingEvents.map((eItem) =>
                                                                        eItem.id === event.id ? { ...eItem, description: e.target.value } : eItem
                                                                    ),
                                                                }))
                                                            }
                                                            className="min-h-[60px]"
                                                        />
                                                    </div>
                                                    <div className="flex justify-end mt-4">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-red-600 hover:bg-red-50"
                                                            onClick={() =>
                                                                setHomePageContent((prev) => ({
                                                                    ...prev,
                                                                    upcomingEvents: prev.upcomingEvents.filter((eItem) => eItem.id !== event.id),
                                                                }))
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </Card>
                                            ))}
                                            <Button
                                                variant="outline"
                                                className="w-full bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100"
                                                onClick={() =>
                                                    setHomePageContent((prev) => ({
                                                        ...prev,
                                                        upcomingEvents: [
                                                            ...prev.upcomingEvents,
                                                            {
                                                                id: `new-event-${Date.now()}`,
                                                                title: "",
                                                                date: "",
                                                                time: "",
                                                                description: "",
                                                            },
                                                        ],
                                                    }))
                                                }
                                            >
                                                <Plus className="mr-2 h-4 w-4" /> Add Event
                                            </Button>
                                        </div>

                                        {/* Contact Info Visibility */}
                                        <h3 className="font-semibold text-gray-900 mt-6 mb-3">Contact Information Visibility</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="showPastor"
                                                    checked={homePageContent.contactInfo.showPastor}
                                                    onCheckedChange={(checked) =>
                                                        setHomePageContent((prev) => ({
                                                            ...prev,
                                                            contactInfo: { ...prev.contactInfo, showPastor: !!checked },
                                                        }))
                                                    }
                                                />
                                                <label htmlFor="showPastor" className="text-sm font-medium leading-none">
                                                    Show Pastor Contact
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="showPhone"
                                                    checked={homePageContent.contactInfo.showPhone}
                                                    onCheckedChange={(checked) =>
                                                        setHomePageContent((prev) => ({
                                                            ...prev,
                                                            contactInfo: { ...prev.contactInfo, showPhone: !!checked },
                                                        }))
                                                    }
                                                />
                                                <label htmlFor="showPhone" className="text-sm font-medium leading-none">
                                                    Show Phone Number
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="showEmail"
                                                    checked={homePageContent.contactInfo.showEmail}
                                                    onCheckedChange={(checked) =>
                                                        setHomePageContent((prev) => ({
                                                            ...prev,
                                                            contactInfo: { ...prev.contactInfo, showEmail: !!checked },
                                                        }))
                                                    }
                                                />
                                                <label htmlFor="showEmail" className="text-sm font-medium leading-none">
                                                    Show Email Address
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="showAddress"
                                                    checked={homePageContent.contactInfo.showAddress}
                                                    onCheckedChange={(checked) =>
                                                        setHomePageContent((prev) => ({
                                                            ...prev,
                                                            contactInfo: { ...prev.contactInfo, showAddress: !!checked },
                                                        }))
                                                    }
                                                />
                                                <label htmlFor="showAddress" className="text-sm font-medium leading-none">
                                                    Show Physical Address
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                onClick={() => setIsEditingHomePage(false)}
                                                disabled={isSubmitting}
                                                className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleUpdateHomePage}
                                                disabled={isSubmitting}
                                                className="bg-blue-600 hover:bg-blue-700"
                                            >
                                                <Save className="mr-2 h-4 w-4" />
                                                {isSubmitting ? "Saving..." : "Save Changes"}
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                                <Home className="h-4 w-4 text-gray-700" />
                                                Welcome Message
                                            </h3>
                                            <p className="text-gray-700">{homePageContent.welcomeMessage}</p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-700" />
                                                Announcements
                                            </h3>
                                            {homePageContent.announcements.length > 0 ? (
                                                <ul className="space-y-3">
                                                    {homePageContent.announcements.map((announcement) => (
                                                        <li key={announcement.id} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                                                            <div className="flex items-center justify-between">
                                                                <p className="font-medium text-gray-900">{announcement.title}</p>
                                                                {announcement.isActive ? (
                                                                    <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                                                                ) : (
                                                                    <Badge className="bg-red-100 text-red-800 border-red-200">Inactive</Badge>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                                                            {announcement.date && (
                                                                <p className="text-xs text-gray-500 mt-2 flex items-center">
                                                                    <Clock className="mr-1 h-3 w-3" />
                                                                    Published: {announcement.date}
                                                                </p>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-500 italic">No announcements to display.</p>
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-700" />
                                                Upcoming Events
                                            </h3>
                                            {homePageContent.upcomingEvents.length > 0 ? (
                                                <ul className="space-y-3">
                                                    {homePageContent.upcomingEvents.map((event) => (
                                                        <li key={event.id} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                                                            <p className="font-medium text-gray-900">{event.title}</p>
                                                            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                                                            <p className="text-xs text-gray-500 mt-2 flex items-center">
                                                                <Calendar className="mr-1 h-3 w-3" />
                                                                {event.date} at {event.time}
                                                            </p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-500 italic">No upcoming events.</p>
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-gray-700" />
                                                Contact Information Visibility
                                            </h3>
                                            <div className="text-gray-700 space-y-1 text-sm">
                                                <p>Pastor Contact: {homePageContent.contactInfo.showPastor ? "Visible" : "Hidden"}</p>
                                                <p>Phone Number: {homePageContent.contactInfo.showPhone ? "Visible" : "Hidden"}</p>
                                                <p>Email Address: {homePageContent.contactInfo.showEmail ? "Visible" : "Hidden"}</p>
                                                <p>Physical Address: {homePageContent.contactInfo.showAddress ? "Visible" : "Hidden"}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}

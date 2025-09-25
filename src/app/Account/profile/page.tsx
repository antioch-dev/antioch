"use client"

import type React from "react"
import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getUserById, getFellowshipById, updateUser as mockUpdateUser } from "@/lib/mock-data"
import { User, Mail, Phone, Church, MapPin, Edit, Save, Camera } from "lucide-react"
import { useParams } from "next/navigation"

export default function UserProfile() {
  const params = useParams()
  const user_id = params.user_id as string

  const initialUser = getUserById(user_id)
  const initialFellowship = initialUser?.fellowshipId ? getFellowshipById(initialUser.fellowshipId) : null

  const [user, setUser] = useState(initialUser)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null)

  const [firstName, setFirstName] = useState(user?.name.split(" ")[0] || "")
  const [lastName, setLastName] = useState(user?.name.split(" ").slice(1).join(" ") || "")
  const [username, setUsername] = useState(user?.username || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [bio, setBio] = useState(user?.bio || "")

  // Destructure fellowship directly for use in JSX
  const fellowship = initialFellowship

  if (!user) {
    return (
      <DashboardLayout userRole="user" userId="fallback">
        <div className="p-6 text-center text-gray-700">
          <h1 className="text-3xl font-bold">User Not Found</h1>
          <p>The profile you are looking for does not exist.</p>
        </div>
      </DashboardLayout>
    )
  }

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveSuccess(null)

    const updatedUser = {
      ...user,
      name: `${firstName} ${lastName}`,
      username: username,
      phone: phone,
      bio: bio,
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      mockUpdateUser(user_id, updatedUser)

      setUser(updatedUser)
      setSaveSuccess(true)
    } catch {
      // Removed 'error' from here
      setSaveSuccess(false)
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveSuccess(null), 3000)
    }
  }

  return (
    <DashboardLayout userRole={user.role} userId={user_id}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving ? (
              "Saving..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </>
            )}
          </Button>
        </div>

        {saveSuccess === true && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">Profile saved successfully!</span>
          </div>
        )}
        {saveSuccess === false && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">Failed to save profile. Please try again.</span>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <User className="mr-2 h-5 w-5" />
                Profile Picture
              </CardTitle>
              <CardDescription className="text-gray-600">Update your profile photo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-4xl">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50">
                  <Camera className="mr-2 h-4 w-4" />
                  Change Photo
                </Button>
                <div className="text-center">
                  <h3 className="font-semibold text-lg text-gray-900">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <Badge className="mt-2 bg-blue-100 text-blue-800">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Edit className="mr-2 h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-gray-600">Update your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="first-name" className="text-gray-900">
                    First Name
                  </Label>
                  <Input
                    id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>
                <div>
                  <Label htmlFor="last-name" className="text-gray-900">
                    Last Name
                  </Label>
                  <Input
                    id="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>
                <div>
                  <Label htmlFor="username" className="text-gray-900">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-900">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user.email}
                    className="bg-white border-gray-300 text-gray-900"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">Contact support to change your email</p>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-900">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>
                <div>
                  <Label htmlFor="join-date" className="text-gray-900">
                    Member Since
                  </Label>
                  <Input
                    id="join-date"
                    defaultValue={new Date(user.joinDate).toLocaleDateString()}
                    className="bg-white border-gray-300 text-gray-900"
                    disabled
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="bio" className="text-gray-900">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us a little about yourself..."
                  className="bg-white border-gray-300 text-gray-900"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {fellowship && (
            <Card className="md:col-span-3 bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <Church className="mr-2 h-5 w-5" />
                  Fellowship Information
                </CardTitle>
                <CardDescription className="text-gray-600">Your fellowship membership details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Current Fellowship</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Church className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{fellowship.name}</p>
                          <p className="text-sm text-gray-600">{fellowship.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="mr-2 h-4 w-4" />
                        {fellowship.location.address}, {fellowship.location.city}, {fellowship.location.state}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="mr-2 h-4 w-4" />
                        {fellowship.contactEmail}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="mr-2 h-4 w-4" />
                        {fellowship.contactPhone}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Membership Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Role</span>
                        <Badge className="bg-blue-100 text-blue-800">
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Member Since</span>
                        <span className="text-sm text-gray-900">{new Date(user.joinDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Status</span>
                        <Badge variant={user.accountStatus === "active" ? "default" : "secondary"}>
                          {user.accountStatus.replace("_", " ").charAt(0).toUpperCase() +
                            user.accountStatus.replace("_", " ").slice(1)}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Last Login</span>
                        <span className="text-sm text-gray-900">{new Date(user.lastLogin).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="md:col-span-3 bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Preferences</CardTitle>
              <CardDescription className="text-gray-600">Customize your experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Notifications</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-900">Email notifications</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-900">Event reminders</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-900">SMS notifications</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Privacy</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-900">Show profile to members</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-900">Allow event invitations</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-900">Public attendance</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Communication</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-900">Fellowship updates</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-900">Prayer requests</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-900">Newsletter</span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

import { DashboardLayout } from "@/app/_components/dashboard-layout" 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getUserById } from "@/lib/mock-data"
import { Mail, Phone, User, Shield, AlertTriangle, Check, X, Edit, Trash2 } from "lucide-react"
import { notFound } from "next/navigation"

interface UserAccountProps {
  params: Promise<{ user_id: string }>
}

export default async function UserAccount({ params }: UserAccountProps) {
  const { user_id } = await params
  const user = getUserById(user_id)

  if (!user) {
    notFound()
  }

  return (
    <DashboardLayout userRole={user.role} userId={user_id}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Account Management</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Information */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <User className="mr-2 h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription className="text-gray-600">Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <Badge className="mt-1 bg-blue-100 text-blue-800">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="full-name" className="text-gray-900">
                    Full Name
                  </Label>
                  <Input id="full-name" defaultValue={user.name} className="bg-white border-gray-300 text-gray-900" />
                </div>
                <div>
                  <Label htmlFor="username" className="text-gray-900">
                    Username
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="username"
                      defaultValue={user.username}
                      className="bg-white border-gray-300 text-gray-900"
                    />
                    <Button variant="outline" className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Your username must be unique</p>
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
                    defaultValue={user.phone || ""}
                    placeholder="Enter your phone number"
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>
              </div>

              <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">Update Profile</Button>
            </CardContent>
          </Card>

          {/* Account Verification */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Account Verification
              </CardTitle>
              <CardDescription className="text-gray-600">Verify your email and phone number</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Email Verification */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-gray-600" />
                      <span className="font-medium text-gray-900">Email Verification</span>
                    </div>
                    {user.isEmailVerified ? (
                      <Badge className="bg-green-100 text-green-800">
                        <Check className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">
                        <X className="mr-1 h-3 w-3" />
                        Not Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{user.email}</p>
                  {!user.isEmailVerified && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Send Verification Email
                    </Button>
                  )}
                </div>

                {/* Phone Verification */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-gray-600" />
                      <span className="font-medium text-gray-900">Phone Verification</span>
                    </div>
                    {user.isPhoneVerified ? (
                      <Badge className="bg-green-100 text-green-800">
                        <Check className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">
                        <X className="mr-1 h-3 w-3" />
                        Not Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{user.phone || "No phone number added"}</p>
                  {user.phone && !user.isPhoneVerified && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Send Verification Code
                    </Button>
                  )}
                  {!user.phone && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                    >
                      Add Phone Number
                    </Button>
                  )}
                </div>

                {/* Account Status */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-gray-600" />
                      <span className="font-medium text-gray-900">Account Status</span>
                    </div>
                    <Badge variant={user.accountStatus === "active" ? "default" : "secondary"}>
                      {user.accountStatus.replace("_", " ").charAt(0).toUpperCase() +
                        user.accountStatus.replace("_", " ").slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Last login: {new Date(user.lastLogin).toLocaleDateString()} at{" "}
                    {new Date(user.lastLogin).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription className="text-gray-600">Manage your account security</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password" className="text-gray-900">
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Enter current password"
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>
                <div>
                  <Label htmlFor="new-password" className="text-gray-900">
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password" className="text-gray-900">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>
              </div>

              <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">Update Password</Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-white border-red-200">
            <CardHeader>
              <CardTitle className="text-red-900 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-red-600">Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-semibold text-red-900 mb-2">Delete Account</h3>
                  <p className="text-sm text-red-700 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="outline" className="bg-white text-red-600 border-red-300 hover:bg-red-50">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete My Account
                  </Button>
                </div>

                <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                  <h3 className="font-semibold text-yellow-900 mb-2">Deactivate Account</h3>
                  <p className="text-sm text-yellow-700 mb-4">
                    Temporarily disable your account. You can reactivate it later.
                  </p>
                  <Button variant="outline" className="bg-white text-yellow-600 border-yellow-300 hover:bg-yellow-50">
                    Deactivate Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

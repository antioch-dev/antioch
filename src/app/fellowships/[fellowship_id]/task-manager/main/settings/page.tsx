// src/app/fellowships/[fellowship_id]/task-manager/main/settings/page.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Bell, Shield, Palette, Save, Upload } from "lucide-react"
import { useStore, type Notifications, type SettingsProfile } from "@/lib/store"
import { toast } from "sonner"


export default function SettingsPage() {
  const { notifications, profile, updateNotifications, updateProfile, setTheme, theme } = useStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize the local profile state directly from the store's profile object
  const [localProfile, setLocalProfile] = useState<SettingsProfile>(profile)
  
  const [localNotifications, setLocalNotifications] = useState<Notifications>(notifications)
  const [selectedTheme, setSelectedTheme] = useState(theme)
  const [selectedAccent, setSelectedAccent] = useState("blue")

  const handleNotificationChange = (key: keyof Notifications, value: boolean) => {
    setLocalNotifications((prev) => ({ ...prev, [key]: value }))
  }

  // Corrected: Use the SettingsProfile type
  const handleProfileChange = (key: keyof SettingsProfile, value: string) => {
    setLocalProfile((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveProfile = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Now directly pass the localProfile, which has the correct type
      updateProfile(localProfile)
      toast.success("Profile updated successfully!")
    } catch (error) {
      console.error("Failed to update profile", error)
      toast.error("Failed to update profile")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveNotifications = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      updateNotifications(localNotifications)
      toast.success("Notification preferences saved!")
    } catch (error) {
      console.error("Failed to save preferences", error)
      toast.error("Failed to save preferences")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveAppearance = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setTheme(selectedTheme)
      toast.success("Appearance settings saved!")
    } catch (error) {
      console.error("Failed to save appearance", error)
      toast.error("Failed to save appearance")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAvatarUpload = () => {
    toast.success("Avatar upload feature coming soon!")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-2">Manage your account and application preferences</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-blue-600">
            <Palette className="w-4 h-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-blue-600">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={localProfile.avatar || "/placeholder-user.jpg"} />
                  <AvatarFallback>
                    {localProfile.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button onClick={handleAvatarUpload} variant="outline" className="mb-2 bg-transparent">
                    <Upload className="w-4 h-4 mr-2" />
                    Change Avatar
                  </Button>
                  <p className="text-sm text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={localProfile.name}
                    onChange={(e) => handleProfileChange("name", e.target.value)}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={localProfile.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-gray-300">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={localProfile.bio}
                  onChange={(e) => handleProfileChange("bio", e.target.value)}
                  className="bg-gray-700 border-gray-600"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-gray-300">
                    Timezone
                  </Label>
                  <Select
                    value={localProfile.timezone}
                    onValueChange={(value) => handleProfileChange("timezone", value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                      <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-gray-300">
                    Language
                  </Label>
                  <Select
                    value={localProfile.language}
                    onValueChange={(value) => handleProfileChange("language", value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Email Notifications</h4>
                    <p className="text-gray-400 text-sm">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={localNotifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Push Notifications</h4>
                    <p className="text-gray-400 text-sm">Receive push notifications on mobile</p>
                  </div>
                  <Switch
                    checked={localNotifications.push}
                    onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Desktop Notifications</h4>
                    <p className="text-gray-400 text-sm">Show notifications on desktop</p>
                  </div>
                  <Switch
                    checked={localNotifications.desktop}
                    onCheckedChange={(checked) => handleNotificationChange("desktop", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Task Reminders</h4>
                    <p className="text-gray-400 text-sm">Get reminded about upcoming tasks</p>
                  </div>
                  <Switch
                    checked={localNotifications.taskReminders}
                    onCheckedChange={(checked) => handleNotificationChange("taskReminders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Weekly Reports</h4>
                    <p className="text-gray-400 text-sm">Receive weekly progress summaries</p>
                  </div>
                  <Switch
                    checked={localNotifications.weeklyReports}
                    onCheckedChange={(checked) => handleNotificationChange("weeklyReports", checked)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSaveNotifications}
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save Preferences"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Appearance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
             <div className="space-y-4">
                <div>
                  <Label className="text-gray-300 text-base font-medium">Theme</Label>
                  <p className="text-gray-400 text-sm mb-3">Choose your preferred theme</p>
                  <div className="grid grid-cols-3 gap-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedTheme("dark")}
                      className={`p-4 bg-gray-700 rounded-lg border-2 cursor-pointer ${
                        selectedTheme === "dark" ? "border-blue-600" : "border-gray-600"
                      }`}
                    >
                      <div className="w-full h-12 bg-gray-900 rounded mb-2"></div>
                      <p className="text-white text-sm text-center">Dark</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedTheme("light")}
                      className={`p-4 bg-gray-700 rounded-lg border-2 cursor-pointer ${
                        selectedTheme === "light" ? "border-blue-600" : "border-gray-600"
                      }`}
                    >
                      <div className="w-full h-12 bg-white rounded mb-2"></div>
                      <p className="text-white text-sm text-center">Light</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gray-700 rounded-lg border-2 border-gray-600 cursor-pointer opacity-50"
                    >
                      <div className="w-full h-12 bg-gradient-to-r from-gray-900 to-white rounded mb-2"></div>
                      <p className="text-white text-sm text-center">Auto</p>
                    </motion.div>
                  </div>
                </div>
              </div>

                <div>
                  <Label className="text-gray-300 text-base font-medium">Accent Color</Label>
                  <p className="text-gray-400 text-sm mb-3">Choose your accent color</p>
                  <div className="flex space-x-2">
                    {[
                      { name: "blue", color: "bg-blue-600" },
                      { name: "purple", color: "bg-purple-600" },
                      { name: "green", color: "bg-green-600" },
                      { name: "red", color: "bg-red-600" },
                      { name: "yellow", color: "bg-yellow-600" },
                    ].map((accent) => (
                      <motion.div
                        key={accent.name}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setSelectedAccent(accent.name)}
                        className={`w-8 h-8 rounded-full cursor-pointer ${accent.color} ${
                          selectedAccent === accent.name ? "ring-2 ring-white" : ""
                        }`}
                      />
                    ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Compact Mode</h4>
                  <p className="text-gray-400 text-sm">Use smaller spacing and components</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Animations</h4>
                  <p className="text-gray-400 text-sm">Enable smooth transitions and animations</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleSaveAppearance}
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save Appearance"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password" className="text-gray-300">
                    Current Password
                  </Label>
                  <Input id="current-password" type="password" className="bg-gray-700 border-gray-600" />
                </div>
                <div>
                  <Label htmlFor="new-password" className="text-gray-300">
                    New Password
                  </Label>
                  <Input id="new-password" type="password" className="bg-gray-700 border-gray-600" />
                </div>
                <div>
                  <Label htmlFor="confirm-password" className="text-gray-300">
                    Confirm New Password
                  </Label>
                  <Input id="confirm-password" type="password" className="bg-gray-700 border-gray-600" />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                    <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" onClick={() => toast.success("2FA setup coming soon!")}>
                    Enable 2FA
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Login Notifications</h4>
                    <p className="text-gray-400 text-sm">Get notified of new login attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Session Timeout</h4>
                    <p className="text-gray-400 text-sm">Automatically log out after inactivity</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-32 bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button
                  onClick={() => toast.success("Security settings updated!")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Update Security
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
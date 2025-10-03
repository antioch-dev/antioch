"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthHeader } from "@/components/auth-header"
import { ArrowLeft, Save, User, Bell, Shield, Palette } from "lucide-react"
import { useRouter } from "next/navigation"

interface AuthUser {
  id: string
  email: string
  name?: string
  role: string
}

interface UserSettings {
  emailNotifications: boolean
  browserNotifications: boolean
  theme: string
  language: string
  timezone: string
  autoAssign: boolean
  defaultStatus: string
}

// Mock user data matching your login credentials
const mockUsers = {
  "admin@example.com": {
    id: "1",
    email: "admin@example.com",
    name: "System Admin",
    role: "admin",
  },
  "fellowship@example.com": {
    id: "2",
    email: "fellowship@example.com",
    name: "Fellowship Manager",
    role: "fellowship_manager",
  },
  "dev@example.com": {
    id: "3",
    email: "dev@example.com",
    name: "Developer",
    role: "developer",
  },
}

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [settings, setSettings] = useState<UserSettings>({
    emailNotifications: true,
    browserNotifications: false,
    theme: "system",
    language: "en",
    timezone: "UTC",
    autoAssign: false,
    defaultStatus: "new",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    void fetchUserAndSettings()
  }, [])

  const fetchUserAndSettings = async () => {
    try {
      // Get current user from localStorage (set during login)
      const currentUserStr = localStorage.getItem("currentUser")
      if (currentUserStr) {
        try {
          const currentUser = JSON.parse(currentUserStr) as AuthUser
          setUser(currentUser)
        } catch (parseError) {
          console.error("Failed to parse current user:", parseError)
          // Fallback to mock data based on email if parsing fails
          const email = getCurrentUserEmail()
          if (email && email in mockUsers) {
            setUser(mockUsers[email as keyof typeof mockUsers])
          }
        }
      } else {
        // If no user in localStorage, try to get from mock data
        const email = getCurrentUserEmail()
        if (email && email in mockUsers) {
          const currentUser = mockUsers[email as keyof typeof mockUsers]
          setUser(currentUser)
          // Save to localStorage for future use
          localStorage.setItem("currentUser", JSON.stringify(currentUser))
        }
      }

      // Load settings from localStorage
      const savedSettings = localStorage.getItem("userSettings")
      if (savedSettings) {
        try {
          const parsedSettings = JSON.parse(savedSettings) as UserSettings
          setSettings(parsedSettings)
        } catch (parseError) {
          console.error("Failed to parse saved settings:", parseError)
        }
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to get current user email from various sources
  const getCurrentUserEmail = (): string | null => {
    // Try to get from localStorage first
    const currentUserStr = localStorage.getItem("currentUser")
    if (currentUserStr) {
      try {
        const currentUser = JSON.parse(currentUserStr) as AuthUser
        return currentUser.email
      } catch {
        return null
      }
    }
    
    // For demo purposes, you could also check URL params or other sources
    return null
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Save to localStorage
      localStorage.setItem("userSettings", JSON.stringify(settings))

      // Apply theme immediately if changed
      if (settings.theme === "dark") {
        document.documentElement.classList.add("dark")
      } else if (settings.theme === "light") {
        document.documentElement.classList.remove("dark")
      } else {
        // System theme - follow OS preference
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      }

      // Show success message
      alert("Settings saved successfully!")
    } catch (error) {
      console.error("Failed to save settings:", error)
      alert("Failed to save settings. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const updateSetting = (key: keyof UserSettings, value: unknown) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleUpdateProfile = () => {
    // For demo purposes, just show a message
    alert("Profile updated successfully! (Note: This is a demo - changes are saved locally)")
  }

  const handleUpdatePassword = () => {
    // For demo purposes, just show a message
    alert("Password updated successfully! (Note: This is a demo - no actual password change occurred)")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading settings...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground">Manage your account preferences</p>
            </div>
          </div>
          <AuthHeader />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6 max-w-4xl">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input 
                      id="name" 
                      value={user?.name || ""} 
                      placeholder="Enter your display name"
                      onChange={(e) => {
                        if (user) {
                          const updatedUser = { ...user, name: e.target.value }
                          setUser(updatedUser)
                          localStorage.setItem("currentUser", JSON.stringify(updatedUser))
                        }
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" value={user?.email || ""} disabled className="bg-muted" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value={user?.role || ""} disabled className="bg-muted" />
                </div>
                <Button onClick={handleUpdateProfile} variant="outline">
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications for new feedback and updates
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Browser Notifications</Label>
                    <p className="text-sm text-muted-foreground">Show browser notifications for urgent items</p>
                  </div>
                  <Switch
                    checked={settings.browserNotifications}
                    onCheckedChange={(checked) => updateSetting("browserNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-assign New Items</Label>
                    <p className="text-sm text-muted-foreground">Automatically assign new feedback based on category</p>
                  </div>
                  <Switch
                    checked={settings.autoAssign}
                    onCheckedChange={(checked) => updateSetting("autoAssign", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Application Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={settings.theme} onValueChange={(value) => updateSetting("theme", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time</SelectItem>
                        <SelectItem value="PST">Pacific Time</SelectItem>
                        <SelectItem value="GMT">GMT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultStatus">Default Status for New Items</Label>
                    <Select
                      value={settings.defaultStatus}
                      onValueChange={(value) => updateSetting("defaultStatus", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="pending_review">Pending Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                </div>
                <Button variant="outline" className="w-full bg-transparent" onClick={handleUpdatePassword}>
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end pt-6">
          <Button onClick={handleSaveSettings} disabled={isSaving} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    </div>
  )
}
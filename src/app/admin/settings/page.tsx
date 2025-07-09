import { DashboardLayout } from "@/app/_components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Settings, Shield, Bell, Mail, Database, Globe, Save, RefreshCw, Server, Zap } from "lucide-react"

export default function AdminSettings() {
  return (
    <DashboardLayout userRole="admin">
      <div className="p-6 bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
            <p className="text-gray-600">Configure platform-wide settings and preferences</p>
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

        <div className="grid gap-6 md:grid-cols-2">
          {/* General Settings */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription className="text-gray-600">Basic platform configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="platform-name" className="text-gray-900">
                  Platform Name
                </Label>
                <Input
                  id="platform-name"
                  defaultValue="Fellowship Platform"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
              <div>
                <Label htmlFor="platform-description" className="text-gray-900">
                  Description
                </Label>
                <Textarea
                  id="platform-description"
                  defaultValue="Church fellowship management platform"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
              <div>
                <Label htmlFor="support-email" className="text-gray-900">
                  Support Email
                </Label>
                <Input
                  id="support-email"
                  type="email"
                  defaultValue="support@fellowshipplatform.com"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
              <div>
                <Label htmlFor="max-fellowships" className="text-gray-900">
                  Max Fellowships per Admin
                </Label>
                <Input
                  id="max-fellowships"
                  type="number"
                  defaultValue="10"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription className="text-gray-600">Platform security and access control</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-900">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-900">Password Requirements</Label>
                  <p className="text-sm text-gray-600">Enforce strong passwords</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-900">Session Timeout</Label>
                  <p className="text-sm text-gray-600">Auto-logout inactive users</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div>
                <Label htmlFor="session-duration" className="text-gray-900">
                  Session Duration (hours)
                </Label>
                <Input
                  id="session-duration"
                  type="number"
                  defaultValue="24"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription className="text-gray-600">Configure system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-900">Email Notifications</Label>
                  <p className="text-sm text-gray-600">Send email alerts to admins</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-900">Fellowship Alerts</Label>
                  <p className="text-sm text-gray-600">New fellowship registrations</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-900">System Health Alerts</Label>
                  <p className="text-sm text-gray-600">Server and performance issues</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-900">User Activity Alerts</Label>
                  <p className="text-sm text-gray-600">Suspicious user activity</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Email Settings */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Email Configuration
              </CardTitle>
              <CardDescription className="text-gray-600">SMTP and email delivery settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="smtp-host" className="text-gray-900">
                  SMTP Host
                </Label>
                <Input
                  id="smtp-host"
                  defaultValue="smtp.gmail.com"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
              <div>
                <Label htmlFor="smtp-port" className="text-gray-900">
                  SMTP Port
                </Label>
                <Input
                  id="smtp-port"
                  type="number"
                  defaultValue="587"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
              <div>
                <Label htmlFor="smtp-username" className="text-gray-900">
                  SMTP Username
                </Label>
                <Input
                  id="smtp-username"
                  defaultValue="noreply@fellowshipplatform.com"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-900">SSL/TLS Encryption</Label>
                  <p className="text-sm text-gray-600">Secure email transmission</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Database Settings */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Database Settings
              </CardTitle>
              <CardDescription className="text-gray-600">Database configuration and maintenance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-900">Auto Backup</Label>
                  <p className="text-sm text-gray-600">Daily automated backups</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div>
                <Label htmlFor="backup-retention" className="text-gray-900">
                  Backup Retention (days)
                </Label>
                <Input
                  id="backup-retention"
                  type="number"
                  defaultValue="30"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-900">Data Compression</Label>
                  <p className="text-sm text-gray-600">Compress stored data</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <Server className="h-4 w-4 text-green-600 mr-2" />
                  <p className="text-sm text-gray-900">Last backup: 2 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Settings */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                API Configuration
              </CardTitle>
              <CardDescription className="text-gray-600">API access and rate limiting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-900">Public API Access</Label>
                  <p className="text-sm text-gray-600">Allow external API access</p>
                </div>
                <Switch />
              </div>
              <div>
                <Label htmlFor="rate-limit" className="text-gray-900">
                  Rate Limit (requests/hour)
                </Label>
                <Input
                  id="rate-limit"
                  type="number"
                  defaultValue="1000"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-900">API Key Required</Label>
                  <p className="text-sm text-gray-600">Require API keys for access</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-900">Active API Keys</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                    <span className="text-sm text-gray-900">Mobile App</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                    <span className="text-sm text-gray-900">Analytics Service</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="mt-6 bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              System Status
            </CardTitle>
            <CardDescription className="text-gray-600">Current platform health and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Server Status</p>
                    <p className="text-2xl font-bold text-green-600">Online</p>
                  </div>
                  <Server className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Database</p>
                    <p className="text-2xl font-bold text-blue-600">Healthy</p>
                  </div>
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">API Status</p>
                    <p className="text-2xl font-bold text-purple-600">Active</p>
                  </div>
                  <Globe className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Uptime</p>
                    <p className="text-2xl font-bold text-orange-600">99.8%</p>
                  </div>
                  <Zap className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Changes Footer */}
        <Card className="mt-6 bg-white border-gray-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 font-medium">Unsaved Changes</p>
                <p className="text-sm text-gray-600">You have unsaved changes. Make sure to save before leaving.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100">
                  Discard Changes
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Save className="mr-2 h-4 w-4" />
                  Save All Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

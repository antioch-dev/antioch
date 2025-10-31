"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmailStatusBadge } from "@/components/email-status-badge"
import { mockUserEmailRequests, type UserEmailRequest } from "@/lib/mock-data"
import {
  Shield,
  Search,
  Filter,
  Check,
  X,
  RotateCcw,
  Edit,
  Users,
  Mail,
  Clock,
  Plus,
  Settings,
  Server,
} from "lucide-react"
import Link from "next/link"

type AdminAction = "approve" | "reject" | "revoke" | "edit" | "create" | "fellowship-config" | "server-config"

export default function PlatformAdminDashboard() {
  const [requests, setRequests] = useState<UserEmailRequest[]>(mockUserEmailRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [fellowshipFilter, setFellowshipFilter] = useState<string>("all")
  const [selectedRequest, setSelectedRequest] = useState<UserEmailRequest | null>(null)
  const [actionType, setActionType] = useState<AdminAction | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
    serverUrl: "mail.antioch.com",
  })

  const [newEmail, setNewEmail] = useState({
    userName: "",
    fellowshipId: "",
    fellowshipName: "",
    desiredUsername: "",
    reason: "",
    status: "created" as const,
  })

  const [fellowshipConfig, setFellowshipConfig] = useState({
    fellowshipId: "",
    emailPrefix: "",
    officialEmail: "",
    displayName: "",
    description: "",
  })

  const [serverConfig, setServerConfig] = useState({
    smtpHost: "smtp.antioch.com",
    smtpPort: "587",
    smtpSecurity: "STARTTLS",
    imapHost: "imap.antioch.com",
    imapPort: "993",
    imapSecurity: "SSL/TLS",
    domain: "antioch.com",
    mailServerUrl: "mail.antioch.com",
    adminEmail: "admin@antioch.com",
  })

  // Filter requests based on search and filters
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.fellowshipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.desiredUsername.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesFellowship = fellowshipFilter === "all" || request.fellowshipId === fellowshipFilter

    return matchesSearch && matchesStatus && matchesFellowship
  })

  // Get unique fellowships for filter
  const fellowships = Array.from(new Set(requests.map((r) => ({ id: r.fellowshipId, name: r.fellowshipName }))))

  // Statistics
  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    created: requests.filter((r) => r.status === "created").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
    revoked: requests.filter((r) => r.status === "revoked").length,
  }

  const handleAction = (request: UserEmailRequest | null, action: AdminAction) => {
    setSelectedRequest(request)
    setActionType(action)

    if (action === "approve" && request) {
      setLoginDetails({
        username: request.desiredUsername,
        password: "temp123!",
        serverUrl: "mail.antioch.com",
      })
    }

    if (action === "create") {
      setNewEmail({
        userName: "",
        fellowshipId: "",
        fellowshipName: "",
        desiredUsername: "",
        reason: "Manually created by admin",
        status: "created",
      })
    }
  }

  const confirmAction = () => {
    if (actionType === "create") {
      const newRequest: UserEmailRequest = {
        id: `manual-${Date.now()}`,
        userId: `user-${Date.now()}`,
        userName: newEmail.userName,
        fellowshipId: newEmail.fellowshipId,
        fellowshipName: newEmail.fellowshipName,
        desiredUsername: newEmail.desiredUsername,
        reason: newEmail.reason,
        status: newEmail.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      setRequests((prev) => [newRequest, ...prev])
      setNewEmail({
        userName: "",
        fellowshipId: "",
        fellowshipName: "",
        desiredUsername: "",
        reason: "Manually created by admin",
        status: "created",
      })
    } else if (selectedRequest && actionType) {
      setRequests((prev) =>
        prev.map((req) => {
          if (req.id === selectedRequest.id) {
            const updatedRequest = { ...req, updatedAt: new Date() }

            switch (actionType) {
              case "approve":
                return { ...updatedRequest, status: "created" as const }
              case "reject":
                return {
                  ...updatedRequest,
                  status: "rejected" as const,
                  rejectionReason: rejectionReason || "Request denied by platform admin",
                }
              case "revoke":
                return {
                  ...updatedRequest,
                  status: "revoked" as const,
                  rejectionReason: rejectionReason || "Account revoked by platform admin",
                }
              default:
                return updatedRequest
            }
          }
          return req
        }),
      )
    }

    // Reset form
    setSelectedRequest(null)
    setActionType(null)
    setRejectionReason("")
    setLoginDetails({ username: "", password: "", serverUrl: "mail.antioch.com" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">Platform Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction(null, "create")}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Email
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction(null, "fellowship-config")}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Fellowship Config
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction(null, "server-config")}
                className="flex items-center gap-2"
              >
                <Server className="h-4 w-4" />
                Server Config
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold text-muted-foreground">{stats.pending}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-primary">{stats.created}</p>
                  <p className="text-sm text-muted-foreground">Created</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <X className="h-4 w-4 text-destructive" />
                <div>
                  <p className="text-2xl font-bold text-destructive">{stats.rejected}</p>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-orange-600">{stats.revoked}</p>
                  <p className="text-sm text-muted-foreground">Revoked</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, fellowship, or username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="created">Created</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="revoked">Revoked</SelectItem>
                </SelectContent>
              </Select>

              <Select value={fellowshipFilter} onValueChange={setFellowshipFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by fellowship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fellowships</SelectItem>
                  {fellowships.map((fellowship) => (
                    <SelectItem key={fellowship.id} value={fellowship.id}>
                      {fellowship.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Requests ({filteredRequests.length})
            </CardTitle>
            <CardDescription>Manage email account requests from all fellowships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Fellowship</TableHead>
                    <TableHead>Desired Username</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.userName}</TableCell>
                      <TableCell>{request.fellowshipName}</TableCell>
                      <TableCell className="font-mono text-sm">{request.desiredUsername}</TableCell>
                      <TableCell>
                        <EmailStatusBadge status={request.status} />
                      </TableCell>
                      <TableCell className="max-w-xs truncate" title={request.reason}>
                        {request.reason}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {request.createdAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {request.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAction(request, "approve")}
                                className="h-8 px-2"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAction(request, "reject")}
                                className="h-8 px-2"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                          {request.status === "created" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAction(request, "revoke")}
                              className="h-8 px-2"
                            >
                              <RotateCcw className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAction(request, "edit")}
                            className="h-8 px-2"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={!!actionType}
        onOpenChange={() => {
          setSelectedRequest(null)
          setActionType(null)
          setRejectionReason("")
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" && "Approve Email Request"}
              {actionType === "reject" && "Reject Email Request"}
              {actionType === "revoke" && "Revoke Email Account"}
              {actionType === "edit" && "Edit Request Details"}
              {actionType === "create" && "Create New Email Account"}
              {actionType === "fellowship-config" && "Fellowship Email Configuration"}
              {actionType === "server-config" && "Email Server Configuration"}
            </DialogTitle>
            <DialogDescription>
              {selectedRequest && `Action for ${selectedRequest.userName} (${selectedRequest.desiredUsername})`}
              {actionType === "create" && "Manually create a new email account"}
              {actionType === "fellowship-config" && "Configure email settings for fellowships"}
              {actionType === "server-config" && "Configure global email server settings"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {actionType === "approve" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={loginDetails.username}
                    onChange={(e) => setLoginDetails((prev) => ({ ...prev, username: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Temporary Password</Label>
                  <Input
                    id="password"
                    value={loginDetails.password}
                    onChange={(e) => setLoginDetails((prev) => ({ ...prev, password: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="server">Server URL</Label>
                  <Input
                    id="server"
                    value={loginDetails.serverUrl}
                    onChange={(e) => setLoginDetails((prev) => ({ ...prev, serverUrl: e.target.value }))}
                  />
                </div>
              </div>
            )}

            {(actionType === "reject" || actionType === "revoke") && (
              <div>
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="Enter reason for this action..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>
            )}

            {actionType === "create" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="new-user-name">User Name</Label>
                    <Input
                      id="new-user-name"
                      placeholder="John Doe"
                      value={newEmail.userName}
                      onChange={(e) => setNewEmail((prev) => ({ ...prev, userName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-fellowship">Fellowship</Label>
                    <Select
                      value={newEmail.fellowshipId}
                      onValueChange={(value) => {
                        const fellowship = fellowships.find((f) => f.id === value)
                        setNewEmail((prev) => ({
                          ...prev,
                          fellowshipId: value,
                          fellowshipName: fellowship?.name || "",
                        }))
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select fellowship" />
                      </SelectTrigger>
                      <SelectContent>
                        {fellowships.map((fellowship) => (
                          <SelectItem key={fellowship.id} value={fellowship.id}>
                            {fellowship.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="new-username">Desired Username</Label>
                  <Input
                    id="new-username"
                    placeholder="john.doe"
                    value={newEmail.desiredUsername}
                    onChange={(e) => setNewEmail((prev) => ({ ...prev, desiredUsername: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="new-reason">Reason/Notes</Label>
                  <Textarea
                    id="new-reason"
                    placeholder="Reason for creating this email account..."
                    value={newEmail.reason}
                    onChange={(e) => setNewEmail((prev) => ({ ...prev, reason: e.target.value }))}
                  />
                </div>
              </div>
            )}

            {actionType === "fellowship-config" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="config-fellowship">Fellowship</Label>
                  <Select
                    value={fellowshipConfig.fellowshipId}
                    onValueChange={(value) => setFellowshipConfig((prev) => ({ ...prev, fellowshipId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select fellowship to configure" />
                    </SelectTrigger>
                    <SelectContent>
                      {fellowships.map((fellowship) => (
                        <SelectItem key={fellowship.id} value={fellowship.id}>
                          {fellowship.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email-prefix">Email Prefix</Label>
                    <Input
                      id="email-prefix"
                      placeholder="fellowship1"
                      value={fellowshipConfig.emailPrefix}
                      onChange={(e) => setFellowshipConfig((prev) => ({ ...prev, emailPrefix: e.target.value }))}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Users will get: username@{fellowshipConfig.emailPrefix || "prefix"}.antioch.com
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="official-email">Official Email</Label>
                    <Input
                      id="official-email"
                      placeholder="info@fellowship1.antioch.com"
                      value={fellowshipConfig.officialEmail}
                      onChange={(e) => setFellowshipConfig((prev) => ({ ...prev, officialEmail: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="display-name">Display Name</Label>
                  <Input
                    id="display-name"
                    placeholder="Fellowship One Community"
                    value={fellowshipConfig.displayName}
                    onChange={(e) => setFellowshipConfig((prev) => ({ ...prev, displayName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="config-description">Description</Label>
                  <Textarea
                    id="config-description"
                    placeholder="Email configuration notes..."
                    value={fellowshipConfig.description}
                    onChange={(e) => setFellowshipConfig((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>
            )}

            {actionType === "server-config" && (
              <Tabs defaultValue="smtp" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="smtp">SMTP Settings</TabsTrigger>
                  <TabsTrigger value="imap">IMAP Settings</TabsTrigger>
                  <TabsTrigger value="general">General</TabsTrigger>
                </TabsList>

                <TabsContent value="smtp" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtp-host">SMTP Host</Label>
                      <Input
                        id="smtp-host"
                        value={serverConfig.smtpHost}
                        onChange={(e) => setServerConfig((prev) => ({ ...prev, smtpHost: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtp-port">SMTP Port</Label>
                      <Input
                        id="smtp-port"
                        value={serverConfig.smtpPort}
                        onChange={(e) => setServerConfig((prev) => ({ ...prev, smtpPort: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="smtp-security">Security</Label>
                    <Select
                      value={serverConfig.smtpSecurity}
                      onValueChange={(value) => setServerConfig((prev) => ({ ...prev, smtpSecurity: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="STARTTLS">STARTTLS</SelectItem>
                        <SelectItem value="SSL/TLS">SSL/TLS</SelectItem>
                        <SelectItem value="None">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="imap" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="imap-host">IMAP Host</Label>
                      <Input
                        id="imap-host"
                        value={serverConfig.imapHost}
                        onChange={(e) => setServerConfig((prev) => ({ ...prev, imapHost: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="imap-port">IMAP Port</Label>
                      <Input
                        id="imap-port"
                        value={serverConfig.imapPort}
                        onChange={(e) => setServerConfig((prev) => ({ ...prev, imapPort: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="imap-security">Security</Label>
                    <Select
                      value={serverConfig.imapSecurity}
                      onValueChange={(value) => setServerConfig((prev) => ({ ...prev, imapSecurity: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SSL/TLS">SSL/TLS</SelectItem>
                        <SelectItem value="STARTTLS">STARTTLS</SelectItem>
                        <SelectItem value="None">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="general" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="domain">Domain</Label>
                      <Input
                        id="domain"
                        value={serverConfig.domain}
                        onChange={(e) => setServerConfig((prev) => ({ ...prev, domain: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="mail-server-url">Mail Server URL</Label>
                      <Input
                        id="mail-server-url"
                        value={serverConfig.mailServerUrl}
                        onChange={(e) => setServerConfig((prev) => ({ ...prev, mailServerUrl: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      value={serverConfig.adminEmail}
                      onChange={(e) => setServerConfig((prev) => ({ ...prev, adminEmail: e.target.value }))}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            )}

            {actionType === "edit" && selectedRequest && (
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="status">Status & Login</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>User Name</Label>
                      <Input value={selectedRequest.userName} readOnly />
                    </div>
                    <div>
                      <Label>Fellowship</Label>
                      <Input value={selectedRequest.fellowshipName} readOnly />
                    </div>
                  </div>
                  <div>
                    <Label>Desired Username</Label>
                    <Input value={selectedRequest.desiredUsername} />
                  </div>
                  <div>
                    <Label>Reason</Label>
                    <Textarea value={selectedRequest.reason} />
                  </div>
                </TabsContent>

                <TabsContent value="status" className="space-y-4">
                  <div>
                    <Label>Status</Label>
                    <Select value={selectedRequest.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="created">Created</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="revoked">Revoked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedRequest.status === "created" && (
                    <div className="space-y-4">
                      <div>
                        <Label>Login Username</Label>
                        <Input placeholder="actual.username" />
                      </div>
                      <div>
                        <Label>Password</Label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                      <div>
                        <Label>Server URL</Label>
                        <Input value="mail.antioch.com" />
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4">
                  <div>
                    <Label>Email Quota (MB)</Label>
                    <Input type="number" placeholder="1000" />
                  </div>
                  <div>
                    <Label>Forwarding Address</Label>
                    <Input placeholder="forward@example.com" />
                  </div>
                  <div>
                    <Label>Auto-Reply Message</Label>
                    <Textarea placeholder="Auto-reply message..." />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="email-enabled" />
                    <Label htmlFor="email-enabled">Email Account Enabled</Label>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedRequest(null)
                setActionType(null)
                setRejectionReason("")
              }}
            >
              Cancel
            </Button>
            <Button onClick={confirmAction}>
              {actionType === "approve" && "Approve & Create Account"}
              {actionType === "reject" && "Reject Request"}
              {actionType === "revoke" && "Revoke Account"}
              {actionType === "edit" && "Save Changes"}
              {actionType === "create" && "Create Email Account"}
              {actionType === "fellowship-config" && "Save Configuration"}
              {actionType === "server-config" && "Save Server Settings"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

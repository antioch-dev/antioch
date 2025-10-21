"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FellowshipNav } from "@/components/fellowship-nav"
import { EmailStatusBadge } from "@/components/email-status-badge"
import { getRequestsByFellowship, type UserEmailRequest } from "@/lib/mock-data"
import { Settings, Users, Check, X, RotateCcw, Edit, Mail, Shield } from "lucide-react"

export default function ManageEmailPage() {
  const params = useParams()
  let fellowshipId: string | undefined
  if (params && typeof params.fellowship_id === "string") {
    fellowshipId = params.fellowship_id
  } else if (params && Array.isArray(params.fellowship_id) && params.fellowship_id.length > 0) {
    fellowshipId = params.fellowship_id[0]
  }

  const [requests, setRequests] = useState<UserEmailRequest[]>(getRequestsByFellowship(fellowshipId || ""))
  const [selectedRequest, setSelectedRequest] = useState<UserEmailRequest | null>(null)
  const [actionType, setActionType] = useState<"approve" | "reject" | "revoke" | "edit" | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
    serverUrl: "mail.antioch.com",
  })

  const [showConfigureDialog, setShowConfigureDialog] = useState(false)
  const capitalizedFellowship =
    fellowshipId && typeof fellowshipId === "string"
      ? fellowshipId.charAt(0).toUpperCase() + fellowshipId.slice(1)
      : ""
  const [fellowshipEmailConfig, setFellowshipEmailConfig] = useState({
    displayName: `Fellowship ${capitalizedFellowship}`,
    signature: `Best regards,\nFellowship ${capitalizedFellowship} Team\n\nAntioch Platform`,
    autoReply: false,
    autoReplyMessage: "Thank you for your message. We will get back to you soon.",
    forwardingEnabled: false,
    forwardingAddress: "",
    serverSettings: {
      imapServer: "mail.antioch.com",
      imapPort: "993",
      smtpServer: "mail.antioch.com",
      smtpPort: "587",
      encryption: "TLS",
    },
  })

  const [fellowshipEmail] = useState({
    email: `fellowship-${fellowshipId || "unknown"}@mail.antioch.com`,
    status: "active",
    isOfficial: true,
  })

  if (!fellowshipId) {
    return <div>Invalid or missing fellowship ID</div>
  }

  const handleAction = (request: UserEmailRequest, action: "approve" | "reject" | "revoke" | "edit") => {
    setSelectedRequest(request)
    setActionType(action)

    if (action === "approve") {
      setLoginDetails({
        username: request.desiredUsername,
        password: "temp123!",
        serverUrl: "mail.antioch.com",
      })
    }
  }

  const confirmAction = () => {
    if (!selectedRequest || !actionType) return

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
                rejectionReason: rejectionReason || "Request denied by fellowship admin",
              }
            case "revoke":
              return {
                ...updatedRequest,
                status: "revoked" as const,
                rejectionReason: rejectionReason || "Account revoked by fellowship admin",
              }
            default:
              return updatedRequest
          }
        }
        return req
      }),
    )

    setSelectedRequest(null)
    setActionType(null)
    setRejectionReason("")
    setLoginDetails({ username: "", password: "", serverUrl: "mail.antioch.com" })
  }

  const handleConfigureSave = () => {
    console.log("[v0] Saving fellowship email configuration:", fellowshipEmailConfig)
    setShowConfigureDialog(false)
    // In a real app, this would save to the backend
  }

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    created: requests.filter((r) => r.status === "created").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
    revoked: requests.filter((r) => r.status === "revoked").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <FellowshipNav fellowshipId={fellowshipId} userRole="admin" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Manage Email Accounts</h1>
          <p className="text-muted-foreground">Manage email account requests and settings for your fellowship</p>
        </div>

        {/* Fellowship Official Email */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Fellowship Official Email
            </CardTitle>
            <CardDescription>Your fellowship&apos;s main email account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{fellowshipEmail.email}</p>
                  <p className="text-sm text-muted-foreground">Official fellowship account</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <EmailStatusBadge status="created" />
                <Button variant="outline" size="sm" onClick={() => setShowConfigureDialog(true)}>
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
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
                <div className="h-4 w-4 rounded-full bg-muted-foreground" />
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

        {/* Member Email Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Member Email Requests
            </CardTitle>
            <CardDescription>Manage email account requests from fellowship members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Desired Username</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.userName}</TableCell>
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
              {requests.length === 0 && <p className="text-center text-muted-foreground py-8">No email requests yet</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Dialogs */}
      <Dialog
        open={!!selectedRequest && !!actionType}
        onOpenChange={() => {
          setSelectedRequest(null)
          setActionType(null)
          setRejectionReason("")
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" && "Approve Email Request"}
              {actionType === "reject" && "Reject Email Request"}
              {actionType === "revoke" && "Revoke Email Account"}
              {actionType === "edit" && "Edit Request Details"}
            </DialogTitle>
            <DialogDescription>
              {selectedRequest && `Action for ${selectedRequest.userName} (${selectedRequest.desiredUsername})`}
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
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfigureDialog} onOpenChange={setShowConfigureDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Configure Fellowship Email</DialogTitle>
            <DialogDescription>Configure settings for {fellowshipEmail.email}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Settings</h3>

              <div>
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={fellowshipEmailConfig.displayName}
                  onChange={(e) => setFellowshipEmailConfig((prev) => ({ ...prev, displayName: e.target.value }))}
                  placeholder="Fellowship Display Name"
                />
              </div>

              <div>
                <Label htmlFor="signature">Email Signature</Label>
                <Textarea
                  id="signature"
                  value={fellowshipEmailConfig.signature}
                  onChange={(e) => setFellowshipEmailConfig((prev) => ({ ...prev, signature: e.target.value }))}
                  placeholder="Your email signature..."
                  rows={4}
                />
              </div>
            </div>

            {/* Auto Reply Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Auto Reply</h3>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoReply"
                  checked={fellowshipEmailConfig.autoReply}
                  onChange={(e) => setFellowshipEmailConfig((prev) => ({ ...prev, autoReply: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="autoReply">Enable auto-reply</Label>
              </div>

              {fellowshipEmailConfig.autoReply && (
                <div>
                  <Label htmlFor="autoReplyMessage">Auto-reply Message</Label>
                  <Textarea
                    id="autoReplyMessage"
                    value={fellowshipEmailConfig.autoReplyMessage}
                    onChange={(e) =>
                      setFellowshipEmailConfig((prev) => ({ ...prev, autoReplyMessage: e.target.value }))
                    }
                    placeholder="Auto-reply message..."
                    rows={3}
                  />
                </div>
              )}
            </div>

            {/* Forwarding Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Email Forwarding</h3>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="forwardingEnabled"
                  checked={fellowshipEmailConfig.forwardingEnabled}
                  onChange={(e) =>
                    setFellowshipEmailConfig((prev) => ({ ...prev, forwardingEnabled: e.target.checked }))
                  }
                  className="rounded border-gray-300"
                />
                <Label htmlFor="forwardingEnabled">Enable email forwarding</Label>
              </div>

              {fellowshipEmailConfig.forwardingEnabled && (
                <div>
                  <Label htmlFor="forwardingAddress">Forward to Email</Label>
                  <Input
                    id="forwardingAddress"
                    type="email"
                    value={fellowshipEmailConfig.forwardingAddress}
                    onChange={(e) =>
                      setFellowshipEmailConfig((prev) => ({ ...prev, forwardingAddress: e.target.value }))
                    }
                    placeholder="admin@example.com"
                  />
                </div>
              )}
            </div>

            {/* Server Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Server Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="imapServer">IMAP Server</Label>
                  <Input
                    id="imapServer"
                    value={fellowshipEmailConfig.serverSettings.imapServer}
                    onChange={(e) =>
                      setFellowshipEmailConfig((prev) => ({
                        ...prev,
                        serverSettings: { ...prev.serverSettings, imapServer: e.target.value },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="imapPort">IMAP Port</Label>
                  <Input
                    id="imapPort"
                    value={fellowshipEmailConfig.serverSettings.imapPort}
                    onChange={(e) =>
                      setFellowshipEmailConfig((prev) => ({
                        ...prev,
                        serverSettings: { ...prev.serverSettings, imapPort: e.target.value },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input
                    id="smtpServer"
                    value={fellowshipEmailConfig.serverSettings.smtpServer}
                    onChange={(e) =>
                      setFellowshipEmailConfig((prev) => ({
                        ...prev,
                        serverSettings: { ...prev.serverSettings, smtpServer: e.target.value },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={fellowshipEmailConfig.serverSettings.smtpPort}
                    onChange={(e) =>
                      setFellowshipEmailConfig((prev) => ({
                        ...prev,
                        serverSettings: { ...prev.serverSettings, smtpPort: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfigureDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfigureSave}>Save Configuration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
"use client" 

import { useState } from "react"
import { useParams } from "next/navigation" 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FellowshipNav } from "@/components/fellowship-nav"
import { EmailStatusBadge } from "@/components/email-status-badge"
import { mockUserEmailRequests, mockEmailAccounts, type UserEmailRequest } from "@/lib/mock-data" 
import { User, Mail, Key, Server, AlertCircle, CheckCircle, XCircle, Plus, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function MyEmailPage() { 
  const params = useParams()
  const fellowshipId = params.fellowship_id as string 
  const currentUserId = "user-1"
  const currentUserName = "John Smith"

  // Find user's email request
  const [userRequest] = useState<UserEmailRequest | null>(() => {
    return (
      mockUserEmailRequests.find((req) => req.fellowshipId === fellowshipId && req.userName === currentUserName) || null
    )
  })
  const [emailAccount] = useState(() => {
    return mockEmailAccounts.find((acc) => acc.userId === currentUserId && acc.fellowshipId === fellowshipId) || null
  })

  const getStatusMessage = () => {
    if (!userRequest) {
      return {
        type: "info" as const,
        title: "No Email Request",
        message: "You haven't applied for an official email account yet.",
        action: "apply",
      }
    }

    switch (userRequest.status) {
      case "pending":
        return {
          type: "info" as const,
          title: "Request Pending",
          message: "Your email request is being reviewed by the fellowship administrators.",
          action: null,
        }
      case "created":
        return {
          type: "success" as const,
          title: "Account Created",
          message: "Your official email account has been created and is ready to use.",
          action: null,
        }
      case "rejected":
        return {
          type: "error" as const,
          title: "Request Rejected",
          message: userRequest.rejectionReason || "Your email request was not approved.",
          action: "reapply",
        }
      case "revoked":
        return {
          type: "warning" as const,
          title: "Account Revoked",
          message: userRequest.rejectionReason || "Your email account has been revoked.",
          action: "reapply",
        }
      default:
        return {
          type: "info" as const,
          title: "Unknown Status",
          message: "Unable to determine your email account status.",
          action: null,
        }
    }
  }

  const statusInfo = getStatusMessage()

  return (
    <div className="min-h-screen bg-background">
      {/* Use fellowshipId from the hook */}
      <FellowshipNav fellowshipId={fellowshipId} userRole="user" /> 

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Email Account</h1>
          <p className="text-muted-foreground">View your official email account status and details</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Status Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Status
                </CardTitle>
                <CardDescription>Current status of your email account request</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Status Alert */}
                <Alert
                  className={
                    statusInfo.type === "success"
                      ? "border-primary bg-primary/5"
                      : statusInfo.type === "error"
                        ? "border-destructive bg-destructive/5"
                        : statusInfo.type === "warning"
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/10"
                          : "border-muted bg-muted/5"
                  }
                >
                  <div className="flex items-center gap-2">
                    {statusInfo.type === "success" && <CheckCircle className="h-4 w-4 text-primary" />}
                    {statusInfo.type === "error" && <XCircle className="h-4 w-4 text-destructive" />}
                    {statusInfo.type === "warning" && <AlertCircle className="h-4 w-4 text-orange-500" />}
                    {statusInfo.type === "info" && <AlertCircle className="h-4 w-4 text-muted-foreground" />}
                    <h3 className="font-medium">{statusInfo.title}</h3>
                  </div>
                  <AlertDescription className="mt-2">{statusInfo.message}</AlertDescription>
                </Alert>

                {/* Request Details */}
                {userRequest && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Requested Username</label>
                        <p className="font-mono text-sm mt-1">{userRequest.desiredUsername}@mail.antioch.com</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                        <div className="mt-1">
                          <EmailStatusBadge status={userRequest.status} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Request Reason</label>
                      <p className="text-sm mt-1">{userRequest.reason}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Submitted</label>
                        <p className="text-sm mt-1">{userRequest.createdAt.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                        <p className="text-sm mt-1">{userRequest.updatedAt.toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Login Details for Created Accounts */}
                {userRequest?.status === "created" && emailAccount?.loginDetails && (
                  <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Key className="h-4 w-4" />
                        Login Details
                      </CardTitle>
                      <CardDescription>Use these credentials to access your email account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                        <p className="font-mono text-sm mt-1">{emailAccount.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Username</label>
                        <p className="font-mono text-sm mt-1">{emailAccount.loginDetails.username}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Temporary Password</label>
                        <p className="font-mono text-sm mt-1">{emailAccount.loginDetails.password}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Server</label>
                        <p className="font-mono text-sm mt-1">{emailAccount.loginDetails.serverUrl}</p>
                      </div>
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>Please change your password after first login for security.</AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  {statusInfo.action === "apply" && (
                    <Link href={`/${fellowshipId}/email/apply`}>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Apply for Email
                      </Button>
                    </Link>
                  )}

                  {statusInfo.action === "reapply" && (
                    <Link href={`/${fellowshipId}/email/apply`}>
                      <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                        <Plus className="h-4 w-4" />
                        Apply Again
                      </Button>
                    </Link>
                  )}

                  {userRequest?.status === "created" && (
                    <Button
                      onClick={() => window.open("https://mail.antioch.com", "_blank")}
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Access Email
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email System Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Mail Server</p>
                  <p className="text-muted-foreground">mail.antioch.com</p>
                </div>
                <div>
                  <p className="font-medium">Fellowship</p>
                  <p className="text-muted-foreground">
                    {fellowshipId === "fellowship-1" && "Grace Community Fellowship"}
                    {fellowshipId === "fellowship-2" && "Hope Baptist Fellowship"}
                    {fellowshipId === "fellowship-3" && "Faith Community Church"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Support</p>
                  <p className="text-muted-foreground">Contact your fellowship admin</p>
                </div>
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  If you have questions about your email account or need assistance, please contact your fellowship
                  administrators.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Contact Admin
                </Button>
              </CardContent>
            </Card>

            {/* Server Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  Server Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">All systems operational</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
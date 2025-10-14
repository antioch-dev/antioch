"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FellowshipNav } from "@/components/fellowship-nav"
import { EmailStatusBadge } from "@/components/email-status-badge"
import { PageTransition } from "@/components/page-transition"
import {
  getNotificationsByFellowship,
  getRequestsByFellowship,
  getSentEmailsByFellowship,
  type EmailNotification,
} from "@/lib/mock-data"
import { Bell, Mail, Send, Users, Clock, CheckCircle, XCircle } from "lucide-react"

interface NotificationsPageProps {
  params: { fellowship_id: string }
}

export default function NotificationsPage({ params }: NotificationsPageProps) {
  const fellowshipId = params.fellowship_id
  const [notifications] = useState<EmailNotification[]>(getNotificationsByFellowship(fellowshipId))
  const [requests] = useState(getRequestsByFellowship(fellowshipId))
  const [sentEmails] = useState(getSentEmailsByFellowship(fellowshipId))

  // Statistics for this fellowship
  const stats = {
    unreadEmails: notifications.filter((n) => n.type === "received" && n.status === "unread").length,
    pendingRequests: requests.filter((r) => r.status === "pending").length,
    recentApprovals: requests.filter((r) => r.status === "created").length,
    recentDenials: requests.filter((r) => r.status === "rejected").length,
    sentThisWeek: sentEmails.filter((e) => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return e.sentAt > weekAgo
    }).length,
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "received":
        return <Mail className="h-4 w-4 text-blue-500" />
      case "sent":
        return <Send className="h-4 w-4 text-green-500" />
      case "request":
        return <Users className="h-4 w-4 text-orange-500" />
      case "approval":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "denial":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const formatNotificationType = (type: string) => {
    switch (type) {
      case "received":
        return "Email Received"
      case "sent":
        return "Email Sent"
      case "request":
        return "Email Request"
      case "approval":
        return "Request Approved"
      case "denial":
        return "Request Denied"
      default:
        return "Notification"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <FellowshipNav fellowshipId={fellowshipId} userRole="admin" />

      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8" data-aos="fade-up">
            <h1 className="text-3xl font-bold text-foreground mb-2">Email Notifications</h1>
            <p className="text-muted-foreground">Overview of email activity and requests for your fellowship</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { icon: Mail, value: stats.unreadEmails, label: "Unread Emails", color: "text-blue-600" },
              { icon: Clock, value: stats.pendingRequests, label: "Pending Requests", color: "text-orange-600" },
              { icon: CheckCircle, value: stats.recentApprovals, label: "Recent Approvals", color: "text-green-600" },
              { icon: XCircle, value: stats.recentDenials, label: "Recent Denials", color: "text-red-600" },
              { icon: Send, value: stats.sentThisWeek, label: "Sent This Week", color: "text-primary" },
            ].map((stat, index) => (
              <Card key={index} className="card-hover" data-aos="fade-up" data-aos-delay={index * 100}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <stat.icon className={`h-4 w-4 ${stat.color.replace("text-", "text-")}`} />
                    <div>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Recent Notifications
                </CardTitle>
                <CardDescription>Latest email activity and system notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.slice(0, 5).map((notification) => (
                    <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium">{formatNotificationType(notification.type)}</p>
                          {notification.status === "unread" && (
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate" title={notification.subject}>
                          {notification.subject}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          From: {notification.from} • {notification.date.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {notifications.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No notifications yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Email Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recent Email Requests
                </CardTitle>
                <CardDescription>Member requests for official email accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.slice(0, 5).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{request.userName}</p>
                        <p className="text-sm text-muted-foreground truncate" title={request.reason}>
                          {request.desiredUsername}@mail.antioch.com
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{request.createdAt.toLocaleDateString()}</p>
                      </div>
                      <EmailStatusBadge status={request.status} />
                    </div>
                  ))}
                  {requests.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No email requests yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Sent Emails */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Recently Sent Emails
              </CardTitle>
              <CardDescription>Official emails sent from your fellowship account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>CC</TableHead>
                      <TableHead>Sent By</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sentEmails.slice(0, 10).map((email) => (
                      <TableRow key={email.id}>
                        <TableCell className="font-medium">{email.subject}</TableCell>
                        <TableCell>{email.to}</TableCell>
                        <TableCell>{email.cc || "-"}</TableCell>
                        <TableCell>{email.sentBy}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {email.sentAt.toLocaleDateString()} {email.sentAt.toLocaleTimeString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {sentEmails.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No emails sent yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    </div>
  )
}

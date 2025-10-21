"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, Filter, Check, X, MessageSquare, Eye, Download, Mail, Phone } from "lucide-react"
import type { Registration } from "@/lib/mock-data"
import Image from "next/image"

interface RegistrationApprovalProps {
  registrations: Registration[]
  onUpdateStatus: (registrationId: string, status: Registration["approvalStatus"], message?: string) => void
}

export function RegistrationApproval({ registrations, onUpdateStatus }: RegistrationApprovalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null)
  const [actionMessage, setActionMessage] = useState("")
  const [showMessageDialog, setShowMessageDialog] = useState(false)
  const [pendingAction, setPendingAction] = useState<{
    id: string
    status: Registration["approvalStatus"]
  } | null>(null)

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      reg.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || reg.approvalStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    all: registrations.length,
    pending: registrations.filter((r) => r.approvalStatus === "pending").length,
    approved: registrations.filter((r) => r.approvalStatus === "approved").length,
    rejected: registrations.filter((r) => r.approvalStatus === "rejected").length,
    "more-info-needed": registrations.filter((r) => r.approvalStatus === "more-info-needed").length,
  }

  const handleStatusUpdate = (id: string, status: Registration["approvalStatus"]) => {
    if (status === "rejected" || status === "more-info-needed") {
      setPendingAction({ id, status })
      setShowMessageDialog(true)
    } else {
      onUpdateStatus(id, status)
    }
  }

  const handleConfirmAction = () => {
    if (pendingAction) {
      onUpdateStatus(pendingAction.id, pendingAction.status, actionMessage)
      setActionMessage("")
      setPendingAction(null)
      setShowMessageDialog(false)
    }
  }

  const getStatusBadge = (status: Registration["approvalStatus"]) => {
    const statusConfig = {
      pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
      approved: { label: "Approved", className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
      rejected: { label: "Rejected", className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
      "more-info-needed": {
        label: "More Info Needed",
        className: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      },
    }

    const config = statusConfig[status]
    return (
      <Badge variant="secondary" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{statusCounts.all}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Need Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{statusCounts["more-info-needed"]}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white dark:bg-gray-800"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-white dark:bg-gray-800">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ({statusCounts.all})</SelectItem>
            <SelectItem value="pending">Pending ({statusCounts.pending})</SelectItem>
            <SelectItem value="approved">Approved ({statusCounts.approved})</SelectItem>
            <SelectItem value="rejected">Rejected ({statusCounts.rejected})</SelectItem>
            <SelectItem value="more-info-needed">Need Info ({statusCounts["more-info-needed"]})</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Registrations Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Payment Proof</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegistrations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    {searchTerm || statusFilter !== "all"
                      ? "No registrations found matching your criteria."
                      : "No registrations yet."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredRegistrations.map((registration) => (
                  <TableRow key={registration.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{registration.memberName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{registration.fellowship}</div>
                        {registration.notes && (
                          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-1">
                            {registration.notes}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="w-3 h-3 mr-1 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">{registration.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 mr-1 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">{registration.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {formatDate(registration.registrationDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {registration.paymentProofURL ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Eye className="w-3 h-3 mr-1" />
                              View Proof
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Payment Proof</DialogTitle>
                            </DialogHeader>
                            <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-800 rounded">
                              <Image
                                src={registration.paymentProofURL || "/placeholder.svg"}
                                alt="Payment proof"
                                fill
                                className="object-contain rounded"
                              />
                            </div>
                            <div className="flex justify-end">
                              <Button variant="outline" size="sm" className="bg-transparent">
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <span className="text-sm text-gray-400 dark:text-gray-500">No payment required</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(registration.approvalStatus)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {registration.approvalStatus === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusUpdate(registration.id, "approved")}
                              className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                            >
                              <Check className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusUpdate(registration.id, "rejected")}
                              className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusUpdate(registration.id, "more-info-needed")}
                              className="bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:hover:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800"
                            >
                              <MessageSquare className="w-3 h-3" />
                            </Button>
                          </>
                        )}
                        {registration.approvalStatus !== "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusUpdate(registration.id, "pending")}
                            className="bg-transparent"
                          >
                            Reset
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {pendingAction?.status === "rejected" ? "Reject Registration" : "Request More Information"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">
                {pendingAction?.status === "rejected"
                  ? "Reason for rejection (optional)"
                  : "What additional information is needed?"}
              </Label>
              <Textarea
                id="message"
                value={actionMessage}
                onChange={(e) => setActionMessage(e.target.value)}
                placeholder={
                  pendingAction?.status === "rejected"
                    ? "Please provide a reason for rejection..."
                    : "Please specify what information is needed..."
                }
                rows={3}
              />
            </div>
            <div className="flex items-center justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowMessageDialog(false)} className="bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleConfirmAction} className="bg-blue-600 hover:bg-blue-700 text-white">
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

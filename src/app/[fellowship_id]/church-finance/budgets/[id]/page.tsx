"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  User,
  Building,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Edit,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

// Define the props interface
interface BudgetRequestDetailPageProps {
  params: Promise<{
    id: string
  }>
}

// Mock data - in real app this would come from database based on ID
const budgetRequest = {
  id: 1,
  title: "Youth Ministry Summer Camp",
  description:
    "Annual summer camp for 25 youth members including transportation, accommodation, and activities. This camp provides spiritual growth opportunities and builds community among our young people.",
  requestedAmount: 3500.0,
  approvedAmount: 1000.0,
  requestedBy: "Pastor John",
  ministryDepartment: "Youth Ministry",
  purpose:
    "To provide a week-long spiritual retreat for youth ages 13-18, focusing on leadership development, biblical teaching, and community building. The camp will include daily devotions, outdoor activities, team building exercises, and guest speakers.",
  status: "pending",
  createdAt: "2024-01-15",
  timelineStart: "2024-06-15",
  timelineEnd: "2024-06-22",
  justification:
    "Transportation: $800 (bus rental)\nAccommodation: $1,500 (cabin rentals for 25 youth + 5 leaders)\nMeals: $750 (all meals for the week)\nActivities: $300 (materials and equipment)\nSpeaker fees: $150\nTotal: $3,500",
  approvalNotes: null,
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="w-5 h-5 text-yellow-500" />
    case "approved":
      return <CheckCircle className="w-5 h-5 text-green-500" />
    case "denied":
      return <XCircle className="w-5 h-5 text-red-500" />
    case "under_review":
      return <AlertCircle className="w-5 h-5 text-blue-500" />
    default:
      return <Clock className="w-5 h-5 text-gray-500" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "approved":
      return "bg-green-100 text-green-800"
    case "denied":
      return "bg-red-100 text-red-800"
    case "under_review":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function BudgetRequestDetailPage({ params }: BudgetRequestDetailPageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showApprovalForm, setShowApprovalForm] = useState(false)
  const [showDenialForm, setShowDenialForm] = useState(false)
  const [approvalData, setApprovalData] = useState({
    approvedAmount: budgetRequest.requestedAmount.toString(),
    notes: "",
  })
  const [denialReason, setDenialReason] = useState("")

  // Resolve the params promise
  useEffect(() => {
    async function resolveParams() {
      const resolved = await params
      setResolvedParams(resolved)
    }
   void resolveParams()
  }, [params])

  const handleApprove = async () => {
    if (!resolvedParams) return
    
    setIsProcessing(true)
    try {
      const response = await fetch(`/api/budgets/${resolvedParams.id}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          approvedAmount: Number.parseFloat(approvalData.approvedAmount),
          notes: approvalData.notes,
        }),
      })

      if (response.ok) {
        alert("Budget request approved successfully!")
        window.location.reload()
      } else {
        alert("Failed to approve budget request")
      }
    } catch (error) {
      console.error("[v0] Error approving request:", error)
      alert("Error approving budget request")
    } finally {
      setIsProcessing(false)
      setShowApprovalForm(false)
    }
  }

  const handleDeny = async () => {
    if (!resolvedParams) return
    
    setIsProcessing(true)
    try {
      const response = await fetch(`/api/budgets/${resolvedParams.id}/deny`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: denialReason }),
      })

      if (response.ok) {
        alert("Budget request denied")
        window.location.reload()
      } else {
        alert("Failed to deny budget request")
      }
    } catch (error) {
      console.error("[v0] Error denying request:", error)
      alert("Error denying budget request")
    } finally {
      setIsProcessing(false)
      setShowDenialForm(false)
    }
  }

  // Show loading state while params are being resolved
  if (!resolvedParams) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="font-serif font-black text-xl text-gray-900">Church Finance</h1>
              </Link>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/income" className="text-gray-600 hover:text-primary font-medium">
                Income
              </Link>
              <Link href="/expenses" className="text-gray-600 hover:text-primary font-medium">
                Expenses
              </Link>
              <Link href="/budgets" className="text-primary font-medium">
                Budgets
              </Link>
              <Link href="/reports" className="text-gray-600 hover:text-primary font-medium">
                Reports
              </Link>
              <Link href="/assets" className="text-gray-600 hover:text-primary font-medium">
                Assets
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/budgets">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Budgets
              </Link>
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-serif font-black text-3xl text-gray-900">{budgetRequest.title}</h1>
                <Badge className={getStatusColor(budgetRequest.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(budgetRequest.status)}
                    {budgetRequest.status.replace("_", " ")}
                  </div>
                </Badge>
              </div>
              <p className="text-gray-600">Budget Request #{budgetRequest.id}</p>
            </div>
          </div>
          {(budgetRequest.status === "pending" || budgetRequest.status === "under_review") && (
            <Button asChild>
              <Link href={`/budgets/${resolvedParams.id}/edit`}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Request
              </Link>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Request Details */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Request Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{budgetRequest.description}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Purpose & Goals</h3>
                  <p className="text-gray-700">{budgetRequest.purpose}</p>
                </div>
                {budgetRequest.justification && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Budget Breakdown</h3>
                      <pre className="text-gray-700 whitespace-pre-wrap font-sans text-sm bg-gray-50 p-3 rounded-lg">
                        {budgetRequest.justification}
                      </pre>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Admin Actions (only show for admin users) */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Admin Actions</CardTitle>
                <CardDescription>Finance committee review and approval</CardDescription>
              </CardHeader>
              <CardContent>
                {!showApprovalForm && !showDenialForm ? (
                  <div className="flex gap-3">
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => setShowApprovalForm(true)}
                      disabled={isProcessing}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Request
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                      onClick={() => setShowDenialForm(true)}
                      disabled={isProcessing}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Deny Request
                    </Button>
                    <Button variant="outline">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Request More Info
                    </Button>
                  </div>
                ) : showApprovalForm ? (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-green-700">Approve Budget Request</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Approved Amount</label>
                        <input
                          type="number"
                          step="0.01"
                          value={approvalData.approvedAmount}
                          onChange={(e) => setApprovalData({ ...approvalData, approvedAmount: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Approval Notes (Optional)</label>
                        <textarea
                          value={approvalData.notes}
                          onChange={(e) => setApprovalData({ ...approvalData, notes: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          rows={3}
                          placeholder="Any conditions or notes for this approval..."
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleApprove}
                        disabled={isProcessing}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isProcessing ? "Processing..." : "Confirm Approval"}
                      </Button>
                      <Button variant="outline" onClick={() => setShowApprovalForm(false)} disabled={isProcessing}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-red-700">Deny Budget Request</h3>
                    <div>
                      <label className="block text-sm font-medium mb-1">Reason for Denial</label>
                      <textarea
                        value={denialReason}
                        onChange={(e) => setDenialReason(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows={3}
                        placeholder="Please provide a reason for denying this request..."
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleDeny}
                        disabled={isProcessing || !denialReason.trim()}
                        variant="outline"
                        className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                      >
                        {isProcessing ? "Processing..." : "Confirm Denial"}
                      </Button>
                      <Button variant="outline" onClick={() => setShowDenialForm(false)} disabled={isProcessing}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Request Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Request Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Requested Amount</p>
                    <p className="font-semibold text-lg">${budgetRequest.requestedAmount.toLocaleString()}</p>
                  </div>
                </div>
                {budgetRequest.approvedAmount && (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Approved Amount</p>
                      <p className="font-semibold text-lg text-green-600">
                        ${budgetRequest.approvedAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
                <Separator />
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Requested By</p>
                    <p className="font-semibold">{budgetRequest.requestedBy}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Ministry Department</p>
                    <p className="font-semibold">{budgetRequest.ministryDepartment}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Submitted</p>
                    <p className="font-semibold">{new Date(budgetRequest.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            {budgetRequest.timelineStart && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif font-bold">Project Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Start Date</p>
                        <p className="font-semibold">{new Date(budgetRequest.timelineStart).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">End Date</p>
                        <p className="font-semibold">{new Date(budgetRequest.timelineEnd).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
"use client"

import { DashboardLayout } from "@/app/_components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { mockFellowshipApplications, approveFellowshipApplication, rejectFellowshipApplication, type FellowshipApplication } from "@/lib/mock-data" // Corrected import: 'type' keyword is used for type-only import
import { Search, Check, X, Eye, Clock, Mail, Phone, MapPin, Filter, Download, AlertCircle } from "lucide-react"
import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export default function FellowshipApplicationsPage() {
  // State to manage the list of applications, allowing for updates
  const [applications, setApplications] = useState(mockFellowshipApplications);
  const [selectedApplication, setSelectedApplication] = useState<FellowshipApplication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewNotes, setReviewNotes] = useState("");

  // Filter applications based on their status
  const pendingApplications = applications.filter((app) => app.status === "pending");
  const approvedApplications = applications.filter((app) => app.status === "approved");
  const rejectedApplications = applications.filter((app) => app.status === "rejected");

  // Function to determine the badge style based on application status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
    }
  };

  // Handle viewing application details in a modal
  const handleViewDetails = useCallback((application: FellowshipApplication) => {
    setSelectedApplication(application);
    setReviewNotes(application.notes || ""); // Load existing notes
    setIsModalOpen(true);
  }, []);

  // Handle approving an application
  const handleApprove = useCallback((id: string) => {
    approveFellowshipApplication(id, reviewNotes);
    // Update local state to reflect the change
    setApplications([...mockFellowshipApplications]); // Re-fetch or re-filter
    setIsModalOpen(false); // Close modal after action
    setReviewNotes(""); // Clear notes
  }, [reviewNotes]);

  // Handle rejecting an application
  const handleReject = useCallback((id: string) => {
    rejectFellowshipApplication(id, reviewNotes);
    // Update local state to reflect the change
    setApplications([...mockFellowshipApplications]); // Re-fetch or re-filter
    setIsModalOpen(false); // Close modal after action
    setReviewNotes(""); // Clear notes
  }, [reviewNotes]);

  return (
    <DashboardLayout userRole="admin">
      <div className="p-6 bg-gray-50 min-h-screen"> {/* Changed bg-white to bg-gray-50 for consistency */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fellowship Applications</h1>
            <p className="text-gray-600">Review and manage fellowship applications</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100">
              <Download className="mr-2 h-4 w-4" />
              Export Applications
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Total Applications</CardTitle>
              <Clock className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{applications.length}</div>
              <p className="text-xs text-gray-600">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Pending Review</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{pendingApplications.length}</div>
              <p className="text-xs text-gray-600">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Approved</CardTitle>
              <Check className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{approvedApplications.length}</div>
              <p className="text-xs text-gray-600">Successfully approved</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Rejected</CardTitle>
              <X className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{rejectedApplications.length}</div>
              <p className="text-xs text-gray-600">Not approved</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6 bg-white border-gray-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search applications..." className="pl-10 bg-white border-gray-300 text-gray-900" />
              </div>
              <Button variant="outline" className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100">
                <Filter className="mr-2 h-4 w-4" />
                Filter by Status
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pending Applications */}
        {pendingApplications.length > 0 && (
          <Card className="mb-6 bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Pending Applications</CardTitle>
              <CardDescription className="text-gray-600">Applications awaiting your review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApplications.map((application) => (
                  <div key={application.id} className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{application.fellowshipName}</h3>
                        <p className="text-gray-600">{application.description}</p>
                      </div>
                      {getStatusBadge(application.status)}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="mr-2 h-4 w-4" />
                          {application.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="mr-2 h-4 w-4" />
                          {application.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="mr-2 h-4 w-4" />
                          {application.address}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Pastor: {application.pastorName}</p>
                        <p className="text-sm text-gray-600">
                          Submitted: {new Date(application.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Review Notes - now part of the modal for pending applications */}
                    <div className="flex gap-2">
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleApprove(application.id)}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Approve Application
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-white text-red-600 border-red-300 hover:bg-red-50"
                        onClick={() => handleReject(application.id)}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Reject Application
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100"
                        onClick={() => handleViewDetails(application)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Applications */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">All Applications</CardTitle>
            <CardDescription className="text-gray-600">Complete history of fellowship applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((application) => (
                <div key={application.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{application.fellowshipName}</h3>
                      <p className="text-sm text-gray-600">{application.pastorName}</p>
                    </div>
                    {getStatusBadge(application.status)}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      {application.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      {application.phone}
                    </div>
                    <div>Submitted: {new Date(application.submittedDate).toLocaleDateString()}</div>
                  </div>

                  {application.reviewedDate && (
                    <div className="mt-2 p-2 bg-white rounded border border-gray-200">
                      <p className="text-sm text-gray-600">
                        Reviewed on {new Date(application.reviewedDate).toLocaleDateString()}
                        {application.notes && ` - ${application.notes}`}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100"
                      onClick={() => handleViewDetails(application)}
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      View Details
                    </Button>
                    {application.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleApprove(application.id)}
                        >
                          <Check className="mr-1 h-3 w-3" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white text-red-600 border-red-300 hover:bg-red-50"
                          onClick={() => handleReject(application.id)}
                        >
                          <X className="mr-1 h-3 w-3" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Details Modal */}
        {selectedApplication && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-[600px] bg-white p-6 rounded-lg shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900">Application Details</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Review the full details of this fellowship application.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-xl text-gray-900">{selectedApplication.fellowshipName}</h3>
                  {getStatusBadge(selectedApplication.status)}
                </div>
                <p className="text-gray-700">{selectedApplication.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                  <p><span className="font-medium">Applicant Name:</span> {selectedApplication.applicantName}</p>
                  <p><span className="font-medium">Pastor:</span> {selectedApplication.pastorName}</p>
                  <p className="flex items-center"><Mail className="mr-2 h-4 w-4 text-gray-500" /> {selectedApplication.email}</p>
                  <p className="flex items-center"><Phone className="mr-2 h-4 w-4 text-gray-500" /> {selectedApplication.phone}</p>
                  <p className="flex items-center col-span-2"><MapPin className="mr-2 h-4 w-4 text-gray-500" /> {selectedApplication.address}</p>
                  <p><span className="font-medium">Submitted Date:</span> {new Date(selectedApplication.submittedDate).toLocaleDateString()}</p>
                  {selectedApplication.reviewedDate && (
                    <p><span className="font-medium">Reviewed Date:</span> {new Date(selectedApplication.reviewedDate).toLocaleDateString()}</p>
                  )}
                </div>

                <div className="mt-4">
                  <label htmlFor="review-notes" className="block text-sm font-medium text-gray-900 mb-2">Review Notes</label>
                  <Textarea
                    id="review-notes"
                    placeholder="Add your review notes here..."
                    className="bg-gray-50 border-gray-300 text-gray-900"
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    disabled={selectedApplication.status !== "pending"} // Disable if not pending
                  />
                </div>
              </div>
              <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-4">
                {selectedApplication.status === "pending" && (
                  <>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                      onClick={() => handleApprove(selectedApplication.id)}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-white text-red-600 border-red-300 hover:bg-red-50 w-full sm:w-auto"
                      onClick={() => handleReject(selectedApplication.id)}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  className="bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100 w-full sm:w-auto"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
}

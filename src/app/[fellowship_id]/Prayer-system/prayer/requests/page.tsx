"use client"

import type React from "react"
import { useParams } from "next/navigation"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PrayerLayout from "@/components/prayer-layout"
import { mockPrayerRequests, type PrayerRequest } from "@/lib/mock-data"
import { Plus, Filter, Heart, Clock, CheckCircle, Star, EyeOff, Calendar, Mail, FileText, Edit } from "lucide-react"


export default function PrayerRequests() {
  const params = useParams<{
    fellowship_id: string
  }>()



  const { fellowship_id } = params
  const [requests, setRequests] = useState<PrayerRequest[]>(mockPrayerRequests)
  const [filteredRequests, setFilteredRequests] = useState<PrayerRequest[]>(mockPrayerRequests)
  const [showPrivate, setShowPrivate] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<PrayerRequest | null>(null)

  const applyFilters = () => {
    const filtered = requests.filter((request) => {
      if (!showPrivate && request.isPrivate) return false
      if (filterCategory !== "all" && request.category !== filterCategory) return false
      if (filterStatus !== "all" && request.status !== filterStatus) return false
      return true
    })
    setFilteredRequests(filtered)
  }

  useState(() => {
    applyFilters()
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newRequest: PrayerRequest = {
      id: (requests.length + 1).toString(),
      name: formData.name,
      fellowship: fellowship_id,
      contact: formData.contact || undefined,
      category: formData.category as PrayerRequest["category"],
      text: formData.text,
      isPrivate: formData.isPrivate,
      status: "Pending",
      dateSubmitted: new Date().toISOString(),
    }

    setRequests([newRequest, ...requests])
    setFormData({ name: "", contact: "", category: "", text: "", isPrivate: false })
    setIsSubmitDialogOpen(false)
    setIsConfirmationOpen(true)
    applyFilters()
  }

  const handleStatusUpdate = (request: PrayerRequest, newStatus: PrayerRequest["status"]) => {
    const updatedRequests = requests.map((r) => (r.id === request.id ? { ...r, status: newStatus } : r))
    setRequests(updatedRequests)
    applyFilters()

    toast({
      title: "Status Updated",
      description: `Prayer request status updated to ${newStatus}.`,
      duration: 3000,
    })

    setIsStatusDialogOpen(false)
    setSelectedRequest(null)
  }

  const getStatusIcon = (status: PrayerRequest["status"]) => {
    switch (status) {
      case "Pending":
        return <Star className="h-4 w-4 text-blue-500" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  const getStatusColor = (status: PrayerRequest["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-gray-100 text-gray-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
    }
  }

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    category: "",
    text: "",
    isPrivate: false,
  })

  return (
    <PrayerLayout fellowshipName={fellowship_id}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Prayer Requests</h1>
            <p className="text-gray-600 mt-2">Submit and view prayer requests from your community</p>
          </div>

          <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                Submit Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Submit Prayer Request</DialogTitle>
                <DialogDescription>
                  Share your prayer needs with the community. You can choose to make it private for prayer leaders only.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact (Optional)</Label>
                    <Input
                      id="contact"
                      type="email"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Family">Family</SelectItem>
                      <SelectItem value="Work">Work</SelectItem>
                      <SelectItem value="Ministry">Ministry</SelectItem>
                      <SelectItem value="Spiritual Growth">Spiritual Growth</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="text">Prayer Request *</Label>
                  <Textarea
                    id="text"
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    placeholder="Please share your prayer request..."
                    rows={4}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="private"
                    checked={formData.isPrivate}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPrivate: checked as boolean })}
                  />
                  <Label htmlFor="private" className="text-sm">
                    Make this request private (visible only to prayer leaders)
                  </Label>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    Submit Prayer Request
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-private"
                  checked={showPrivate}
                  onCheckedChange={(checked) => {
                    setShowPrivate(checked as boolean)
                    setTimeout(applyFilters, 0)
                  }}
                />
                <Label htmlFor="show-private" className="text-sm">
                  Show private requests
                </Label>
              </div>

              <Select
                value={filterCategory}
                onValueChange={(value) => {
                  setFilterCategory(value)
                  setTimeout(applyFilters, 0)
                }}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Family">Family</SelectItem>
                  <SelectItem value="Work">Work</SelectItem>
                  <SelectItem value="Ministry">Ministry</SelectItem>
                  <SelectItem value="Spiritual Growth">Spiritual Growth</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filterStatus}
                onValueChange={(value) => {
                  setFilterStatus(value)
                  setTimeout(applyFilters, 0)
                }}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Prayer Requests ({filteredRequests.length})</h2>
          </div>

          {filteredRequests.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No prayer requests found</h3>
                <p className="text-gray-600 mb-4">
                  {requests.length === 0
                    ? "Be the first to submit a prayer request for your community."
                    : "Try adjusting your filters to see more requests."}
                </p>
                <Button onClick={() => setIsSubmitDialogOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Submit First Request
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{request.name}</CardTitle>
                          {request.isPrivate && (
                            <Badge variant="secondary" className="gap-1">
                              <EyeOff className="h-3 w-3" />
                              Private
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(request.dateSubmitted).toLocaleDateString()}
                          </div>
                          <Badge variant="outline">{request.category}</Badge>
                          {request.contact && (
                            <div className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              {request.contact}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.status)}
                        <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{request.text}</p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="h-4 w-4" />
                        Request #{request.id}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Pray Now
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(request)
                            setIsStatusDialogOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Update Status
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                Prayer Request Submitted
              </DialogTitle>
              <DialogDescription>
                Thank you for sharing your prayer request with the community. Our prayer team will be notified and will
                lift up your request in prayer.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end">
              <Button onClick={() => setIsConfirmationOpen(false)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Prayer Request Status</DialogTitle>
              <DialogDescription>Update the status of this prayer request to track its progress.</DialogDescription>
            </DialogHeader>

            {selectedRequest && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">{selectedRequest.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{selectedRequest.text.substring(0, 100)}...</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm">Current status:</span>
                    <Badge className={getStatusColor(selectedRequest.status)}>{selectedRequest.status}</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Select new status:</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {(["Pending", "In Progress", "Completed"] as const).map((status) => (
                      <Button
                        key={status}
                        variant={selectedRequest.status === status ? "default" : "outline"}
                        onClick={() => handleStatusUpdate(selectedRequest, status)}
                        className="justify-start gap-2"
                      >
                        {getStatusIcon(status)}
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PrayerLayout>
  )
}

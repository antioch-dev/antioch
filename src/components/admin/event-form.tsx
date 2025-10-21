"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Upload,
  Plus,
  X,
  DollarSign,
  CreditCard,
  Wifi,
  FileText,
  Mail,
  Sparkles,
  MapPin,
  Clock,
} from "lucide-react"
import type { Event, EventMaterial } from "@/lib/mock-data"
import Image from "next/image"

interface EventFormProps {
  event?: Event
  onSave: (eventData: Partial<Event>) => void
  onCancel: () => void
  isLoading?: boolean
}

// Define bank details type
type BankDetails = {
  accountName: string
  accountNumber: string
  bankName: string
  currency: string
}

// Define a type for the formData state for better type safety
type FormDataState = {
  bankDetails: BankDetails
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
  isHybrid: boolean
  onlineLinks: string[]
  paymentRequired: boolean
  price: number
  coverImage: string
  materials: EventMaterial[]
  registrationEnabled: boolean
  status: 'upcoming' | 'live' | 'ended' // Assuming these are the allowed statuses
}

// Type for keys of FormDataState
type FormDataKeys = keyof FormDataState

export function EventForm({ event, onSave, onCancel, isLoading = false }: EventFormProps) {
  const [formData, setFormData] = useState<FormDataState>({
    title: event?.title || "",
    description: event?.description || "",
    startDate: event?.startDate ? new Date(event.startDate).toISOString().slice(0, 16) : "",
    endDate: event?.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : "",
    location: event?.location || "",
    isHybrid: event?.isHybrid || false,
    onlineLinks: event?.onlineLinks || [""],
    paymentRequired: event?.paymentRequired || false,
    price: event?.price || 0,
    bankDetails: event?.bankDetails || {
      accountName: "",
      accountNumber: "",
      bankName: "",
      currency: "CNY",
    },
    coverImage: event?.coverImage || "",
    materials: event?.materials || [],
    registrationEnabled: event?.registrationEnabled ?? true,
    status: event?.status || "upcoming",
  })

  const [newMaterial, setNewMaterial] = useState({ name: "", type: "pdf" as EventMaterial["type"] })
  const [inviteEmails, setInviteEmails] = useState("")
  const [isDragging, setIsDragging] = useState(false)

  // FIX: Replace 'any' with a union of possible value types or use generics/type assertion
  const handleInputChange = (field: FormDataKeys, value: FormDataState[FormDataKeys]) => {
    // You could also use 'unknown' for value and then assert inside, but specifying the 
    // union or using FormDataState[FormDataKeys] for a specific key is safer.
    // Since we're using a single handler for various fields, FormDataState[FormDataKeys] is best.
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleBankDetailsChange = (field: keyof BankDetails, value: string) => {
    setFormData((prev) => ({
      ...prev,
      bankDetails: { ...prev.bankDetails, [field]: value },
    }))
  }

  // ... (rest of the component remains the same)

// ... (rest of the component remains the same)

  const handleAddOnlineLink = () => {
    setFormData((prev) => ({
      ...prev,
      onlineLinks: [...prev.onlineLinks, ""],
    }))
  }

  const handleRemoveOnlineLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      onlineLinks: prev.onlineLinks.filter((_, i) => i !== index),
    }))
  }

  const handleOnlineLinkChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      onlineLinks: prev.onlineLinks.map((link, i) => (i === index ? value : link)),
    }))
  }

  const handleAddMaterial = () => {
    if (newMaterial.name.trim()) {
      const material: EventMaterial = {
        id: Date.now().toString(),
        name: newMaterial.name,
        url: `/mock-${newMaterial.name.toLowerCase().replace(/\s+/g, "-")}.${newMaterial.type}`,
        type: newMaterial.type,
      }
      setFormData((prev) => ({
        ...prev,
        materials: [...prev.materials, material],
      }))
      setNewMaterial({ name: "", type: "pdf" })
    }
  }

  const handleRemoveMaterial = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.filter((m) => m.id !== id),
    }))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    console.log("Files dropped:", files)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      onlineLinks: formData.onlineLinks.filter((link) => link.trim()),
    })
  }

  const handleSendInvites = () => {
    const emails = inviteEmails
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean)
    alert(`Mock: Invitations would be sent to ${emails.length} recipients:\n${emails.join("\n")}`)
    setInviteEmails("")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative mb-8 p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-100 dark:border-gray-700">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
        <div className="relative">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-500 rounded-xl mr-4 shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {event ? "Edit Event" : "Create New Event"}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {event ? "Update event details and settings" : "Set up a new event for your fellowship"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center text-xl">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Event Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter event title"
                  required
                  className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-200"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="status" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Event Status
                </Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value as FormDataState['status'])}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="ended">Ended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe your event"
                rows={4}
                required
                className="border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-200 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label
                  htmlFor="startDate"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center"
                >
                  <Clock className="w-4 h-4 mr-2 text-green-500" />
                  Start Date & Time *
                </Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  required
                  className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-200"
                />
              </div>
              <div className="space-y-3">
                <Label
                  htmlFor="endDate"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center"
                >
                  <Clock className="w-4 h-4 mr-2 text-red-500" />
                  End Date & Time *
                </Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  required
                  className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="location"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center"
              >
                <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                Location *
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Event location or address"
                required
                className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-200"
              />
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <Switch
                id="registrationEnabled"
                checked={formData.registrationEnabled}
                onCheckedChange={(checked) => handleInputChange("registrationEnabled", checked)}
                className="data-[state=checked]:bg-blue-500"
              />
              <Label htmlFor="registrationEnabled" className="font-medium text-gray-700 dark:text-gray-300">
                Enable Registration
              </Label>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center text-xl">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
                <Wifi className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              Hybrid Event Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <Switch
                id="isHybrid"
                checked={formData.isHybrid}
                onCheckedChange={(checked) => handleInputChange("isHybrid", checked)}
                className="data-[state=checked]:bg-purple-500"
              />
              <Label htmlFor="isHybrid" className="font-medium text-gray-700 dark:text-gray-300">
                Enable Hybrid Mode (Online + In-Person)
              </Label>
            </div>

            {formData.isHybrid && (
              <div className="space-y-4 pt-4 border-t border-purple-200 dark:border-purple-700 animate-in slide-in-from-top-2 duration-300">
                <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Online Stream Links</Label>
                {formData.onlineLinks.map((link, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <Input
                      value={link}
                      onChange={(e) => handleOnlineLinkChange(index, e.target.value)}
                      placeholder={`YouTube stream link for day ${index + 1}`}
                      className="flex-1 h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 rounded-xl transition-all duration-200"
                    />
                    {formData.onlineLinks.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveOnlineLink(index)}
                        className="h-12 w-12 rounded-xl border-2 border-red-200 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddOnlineLink}
                  className="h-12 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-200 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Stream Link
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center text-xl">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                <Upload className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              Cover Image
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.coverImage && (
              <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src={formData.coverImage || "/placeholder.svg"}
                  alt="Cover"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => handleInputChange("coverImage", "")}
                    className="bg-white/90 hover:bg-white text-gray-800"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove Image
                  </Button>
                </div>
              </div>
            )}
            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                isDragging
                  ? "border-green-400 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-300 dark:border-gray-600 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Drag and drop your cover image here, or click to browse
              </p>
              <Button
                type="button"
                variant="outline"
                className="bg-transparent border-2 border-green-200 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Cover Image
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Event Materials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.materials.length > 0 && (
              <div className="space-y-2">
                {formData.materials.map((material) => (
                  <div
                    key={material.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{material.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {material.type.toUpperCase()}
                      </Badge>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveMaterial(material.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Input
                value={newMaterial.name}
                onChange={(e) => setNewMaterial((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Material name"
                className="flex-1"
              />
              <Select
                value={newMaterial.type}
                onValueChange={(value: EventMaterial["type"]) => setNewMaterial((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="doc">DOC</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" variant="outline" onClick={handleAddMaterial} className="bg-transparent">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center text-xl">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mr-3">
                <DollarSign className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              Payment Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
              <Switch
                id="paymentRequired"
                checked={formData.paymentRequired}
                onCheckedChange={(checked) => handleInputChange("paymentRequired", checked)}
                className="data-[state=checked]:bg-yellow-500"
              />
              <Label htmlFor="paymentRequired" className="font-medium text-gray-700 dark:text-gray-300">
                Require Payment for Registration
              </Label>
            </div>

            {formData.paymentRequired && (
              <div className="space-y-6 pt-4 border-t border-yellow-200 dark:border-yellow-700 animate-in slide-in-from-top-2 duration-300">
                <div className="space-y-3">
                  <Label htmlFor="price" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Registration Fee (CNY)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    // Handle input change for number type specifically
                    onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    min="0"
                    step="0.01"
                    className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-yellow-500 dark:focus:border-yellow-400 rounded-xl transition-all duration-200"
                  />
                </div>

                <Separator className="bg-yellow-200 dark:bg-yellow-700" />

                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center text-gray-800 dark:text-gray-200">
                    <CreditCard className="w-4 h-4 mr-2 text-blue-500" />
                    Bank Transfer Details
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="accountName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Account Name
                      </Label>
                      <Input
                        id="accountName"
                        value={formData.bankDetails.accountName}
                        onChange={(e) => handleBankDetailsChange("accountName", e.target.value)}
                        placeholder="Account holder name"
                        className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="accountNumber" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Account Number
                      </Label>
                      <Input
                        id="accountNumber"
                        value={formData.bankDetails.accountNumber}
                        onChange={(e) => handleBankDetailsChange("accountNumber", e.target.value)}
                        placeholder="Bank account number"
                        className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="bankName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bank Name
                    </Label>
                    <Input
                      id="bankName"
                      value={formData.bankDetails.bankName}
                      onChange={(e) => handleBankDetailsChange("bankName", e.target.value)}
                      placeholder="Bank name"
                      className="h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-200"
                    />
                  </div>
                </div>

                <Separator className="bg-yellow-200 dark:bg-yellow-700" />

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Payment QR Codes</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">WeChat Pay QR Code</Label>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-12 bg-transparent border-2 border-green-200 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all duration-200"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload WeChat QR
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Alipay QR Code</Label>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-12 bg-transparent border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Alipay QR
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Email Invitations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="inviteEmails">Email Addresses (comma-separated)</Label>
              <Textarea
                id="inviteEmails"
                value={inviteEmails}
                onChange={(e) => setInviteEmails(e.target.value)}
                placeholder="john@example.com, mary@example.com, ..."
                rows={3}
              />
            </div>
            <Button type="button" variant="outline" onClick={handleSendInvites} className="bg-transparent">
              <Mail className="w-4 h-4 mr-2" />
              Send Invitations
            </Button>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="w-full sm:w-auto h-12 px-8 bg-transparent border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Saving...
              </div>
            ) : event ? (
              "Update Event"
            ) : (
              "Create Event"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
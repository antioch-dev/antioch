"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import type { Form, FormField, TypedFormResponses } from "../../types"
import { CheckCircle } from "lucide-react"
import {
  initializeTypedResponses,
  updateFieldValue,
  validateTypedResponses,
  convertToBackendFormat,
  getDisplayValue,
} from "../../utils/form-data-helpers"

// Mock form data
const mockForm: Form = {
  id: "1",
  title: "Customer Feedback Survey",
  description:
    "Please complete the form below to place your order. This will help us process your request quickly and accurately. Be sure to provide detailed information about your order, including any special instructions or requirements.",
  fields: [
    {
      id: "1",
      type: "text",
      title: "What would you like to purchase?",
      description: "",
      required: true,
    },
    {
      id: "2",
      type: "textarea",
      title: "Any special instructions or requirements?",
      description: "",
      required: true,
    },
    {
      id: "3",
      type: "date",
      title: "What is your preferred delivery date?",
      description: "",
      required: true,
    },
    {
      id: "4",
      type: "select",
      title: "Preferred delivery time",
      description: "Choose your preferred delivery time slot",
      required: true,
      options: ["Morning (9-12)", "Afternoon (12-17)", "Evening (17-20)"],
    },
    {
      id: "5",
      type: "multiselect",
      title: "Additional services",
      description: "Select any additional services you need",
      required: false,
      options: ["Gift wrapping", "Express delivery", "Installation", "Extended warranty"],
    },
    {
      id: "6",
      type: "boolean",
      title: "Would you like to receive updates about your order?",
      description: "",
      required: false,
    },
    {
      id: "7",
      type: "file",
      title: "Do you have any relevant examples or additional details?",
      description: "Drop your files here to upload",
      required: false,
    },
  ],
  settings: {
    isPublic: true,
    isOpen: true,
    requireLogin: false,
    successMessage: "Thank you for your submission! We'll get back to you soon.",
    successImage: "/placeholder.svg?height=200&width=300",
    successImageAlt: "Success celebration illustration",
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: "user1",
  coAdmins: [],
  responses: [],
}

export default function FormFiller() {
  const [form] = useState<Form>(mockForm)
  const [responses, setResponses] = useState<TypedFormResponses>(() => initializeTypedResponses(mockForm.fields))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFieldChange = (fieldId: string, value: string | number | Date | boolean | string[] | File | null) => {
    const field = form.fields.find((f) => f.id === fieldId)
    if (!field) return

    setResponses((prev) => updateFieldValue(prev, field, value))
    if (errors[fieldId]) {
      setErrors((prev) => ({ ...prev, [fieldId]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = validateTypedResponses(responses, form.fields)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Convert to backend format
    const backendData = convertToBackendFormat(responses, form.fields)

    // Simulate API call
    console.log("Submitting data:", backendData)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }
  const renderField = (field: FormField) => {
    const value = getDisplayValue(responses, field)
    const error = errors[field.id]

    switch (field.type) {
      case "text":
      case "email":
        return (
          <Input
            type={field.type}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={`Enter ${field.title.toLowerCase()}...`}
            className={error ? "border-destructive" : ""}
          />
        )

      case "number":
        return (
          <Input
            type="number"
            value={typeof value === "number" ? value : ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder="Enter number..."
            className={error ? "border-destructive" : ""}
          />
        )

      case "textarea":
        return (
          <Textarea
            value={typeof value === "string" ? value : ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder="Enter text..."
            className={error ? "border-destructive" : ""}
          />
        )

      case "date":
        return (
          <Input
            type="date"
            value={typeof value === "string" ? value : ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={error ? "border-destructive" : ""}
          />
        )

      case "select":
        return (
          <Select
            value={typeof value === "string" ? value : ""}
            onValueChange={(val) => handleFieldChange(field.id, val)}
          >
            <SelectTrigger className={error ? "border-destructive" : ""}>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "multiselect":
        const multiselectValue = Array.isArray(value) ? value : []
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  checked={multiselectValue.includes(option)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleFieldChange(field.id, [...multiselectValue, option])
                    } else {
                      handleFieldChange(
                        field.id,
                        multiselectValue.filter((v: string) => v !== option),
                      )
                    }
                  }}
                />
                <Label>{option}</Label>
              </div>
            ))}
          </div>
        )

      case "boolean":
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={typeof value === "boolean" ? value : false}
              onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
            />
            <Label>Yes/No</Label>
          </div>
        )

      case "file":
        return (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Input
              type="file"
              onChange={(e) => handleFieldChange(field.id, e.target.files?.[0] || null)}
              className="hidden"
              id={`file-${field.id}`}
            />
            <Label htmlFor={`file-${field.id}`} className="cursor-pointer">
              <div className="space-y-2">
                <div className="text-muted-foreground">{field.description || "Click to upload or drag and drop"}</div>
                <Button variant="outline" type="button">
                  Choose File
                </Button>
              </div>
            </Label>
            {value && typeof value === "object" && value !== null && "name" in value && (
              <p className="mt-2 text-sm text-muted-foreground">Selected: {value.name}</p>
            )}
          </div>
        )

      default:
        return null
    }
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Card>
          <CardContent className="text-center py-12">
            <div className="space-y-6">
              <CheckCircle className="w-16 h-16 mx-auto text-green-500" />

              {form.settings.successImage && (
                <div className="flex justify-center">
                  <img
                    src={form.settings.successImage || "/placeholder.svg"}
                    alt={form.settings.successImageAlt || "Success image"}
                    className="max-w-sm max-h-64 rounded-lg object-cover shadow-lg"
                  />
                </div>
              )}

              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Form Submitted Successfully!</h2>
                <p className="text-muted-foreground text-lg">{form.settings.successMessage}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!form.settings.isOpen) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Form Closed</h2>
            <p className="text-muted-foreground">This form is no longer accepting responses.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{form.title}</CardTitle>
          {form.description && <p className="text-muted-foreground">{form.description}</p>}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {form.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label className="text-base">
                  {field.title}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </Label>
                {field.description && <p className="text-sm text-muted-foreground">{field.description}</p>}
                {renderField(field)}
                {errors[field.id] && <p className="text-sm text-destructive">{errors[field.id]}</p>}
              </div>
            ))}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Form"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

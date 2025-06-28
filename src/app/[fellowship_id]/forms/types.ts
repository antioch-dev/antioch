export interface FormField {
  id: string
  type: "text" | "number" | "select" | "multiselect" | "file" | "boolean" | "email" | "textarea" | "date"
  title: string
  description?: string
  required: boolean
  options?: string[] // for select/multiselect
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
  errorMessage?: string
}

export interface Form {
  id: string
  title: string
  description: string
  fields: FormField[]
  settings: {
    isPublic: boolean
    isOpen: boolean
    requireLogin: boolean
    successMessage: string
    successImage?: string // URL or path to success image
    successImageAlt?: string // Alt text for accessibility
  }
  createdAt: Date
  updatedAt: Date
  createdBy: string
  coAdmins: string[]
  responses: FormResponse[]
}

export interface FormResponse {
  id: string
  formId: string
  responses: Record<string, any>
  submittedAt: Date
  submittedBy?: string
}

export interface User {
  id: string
  name: string
  email: string
}

export interface FormField {
  id: string
  type: 'text' | 'number' | 'select' | 'multiselect' | 'file' | 'boolean' | 'email' | 'textarea' | 'date'
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

// Typed response value based on field type
export type FormFieldValue =
  | { type: 'text' | 'email' | 'textarea'; value: string }
  | { type: 'number'; value: number }
  | { type: 'date'; value: Date }
  | { type: 'boolean'; value: boolean }
  | { type: 'select'; value: string }
  | { type: 'multiselect'; value: string[] }
  | { type: 'file'; value: FileData | null }

export interface FileData {
  name: string
  size: number
  type: string
  url?: string // For storing file URL after upload
  data?: string // Base64 data for client-side handling
}

// Structured response data for backend storage
export interface FormResponseData {
  fieldId: string
  fieldName: string
  fieldType: FormField['type']
  value: string // JSON stringified value
}

export interface FormResponse {
  id: string
  formId: string
  responses: FormResponseData[]
  submittedAt: Date
  submittedBy?: string
}

// Client-side structured response state
export interface TypedFormResponses {
  textFields: Record<string, string>
  numberFields: Record<string, number>
  dateFields: Record<string, Date>
  booleanFields: Record<string, boolean>
  selectFields: Record<string, string>
  multiselectFields: Record<string, string[]>
  fileFields: Record<string, FileData | null>
}

export interface User {
  id: string
  name: string
  email: string
}

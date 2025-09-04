import type { FormField, FormResponseData, TypedFormResponses, FileData } from '../types'


export function initializeTypedResponses(fields: FormField[]): TypedFormResponses {
  const responses: TypedFormResponses = {
    textFields: {},
    numberFields: {},
    dateFields: {},
    booleanFields: {},
    selectFields: {},
    multiselectFields: {},
    fileFields: {},
  }

  fields.forEach((field) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'textarea':
        responses.textFields[field.id] = ''
        break
      case 'number':
        responses.numberFields[field.id] = 0
        break
      case 'date':
        responses.dateFields[field.id] = new Date()
        break
      case 'boolean':
        responses.booleanFields[field.id] = false
        break
      case 'select':
        responses.selectFields[field.id] = ''
        break
      case 'multiselect':
        responses.multiselectFields[field.id] = []
        break
      case 'file':
        responses.fileFields[field.id] = null
        break
    }
  })

  return responses
}

// Get value from typed responses by field
export function getFieldValue(
  responses: TypedFormResponses,
  field: FormField,
): string | number | Date | boolean | string[] | FileData | null {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'textarea':
      return responses.textFields[field.id] || ''
    case 'number':
      return responses.numberFields[field.id] || 0
    case 'date':
      return responses.dateFields[field.id] || new Date()
    case 'boolean':
      return responses.booleanFields[field.id] || false
    case 'select':
      return responses.selectFields[field.id] || ''
    case 'multiselect':
      return responses.multiselectFields[field.id] || []
    case 'file':
      return responses.fileFields[field.id] || null
    default:
      return ''
  }
}

// Update value in typed responses
export function updateFieldValue(
  responses: TypedFormResponses,
  field: FormField,
  value: string | number | Date | boolean | string[] | FileData | File | null,
): TypedFormResponses {
  const newResponses = { ...responses }

  switch (field.type) {
    case 'text':
    case 'email':
    case 'textarea':
      let stringValue = ''
      if (typeof value === 'string') {
        stringValue = value
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        stringValue = String(value)
      }
      newResponses.textFields = {
        ...responses.textFields,
        [field.id]: stringValue,
      }
      break
    case 'number':
      newResponses.numberFields = {
        ...responses.numberFields,
        [field.id]: typeof value === 'number' ? value : Number(value || 0),
      }
      break
    case 'date':
      let dateValue: Date
      if (value instanceof Date) {
        dateValue = value
      } else if (typeof value === 'string') {
        dateValue = new Date(value)
      } else {
        dateValue = new Date()
      }
      newResponses.dateFields = {
        ...responses.dateFields,
        [field.id]: dateValue,
      }
      break
    case 'boolean':
      newResponses.booleanFields = {
        ...responses.booleanFields,
        [field.id]: typeof value === 'boolean' ? value : Boolean(value),
      }
      break
    case 'select':
      let selectValue = ''
      if (typeof value === 'string') {
        selectValue = value
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        selectValue = String(value)
      }
      newResponses.selectFields = {
        ...responses.selectFields,
        [field.id]: selectValue,
      }
      break
    case 'multiselect':
      newResponses.multiselectFields = {
        ...responses.multiselectFields,
        [field.id]: Array.isArray(value) ? value : [],
      }
      break
    case 'file':
      let fileValue: FileData | null = null
      if (value instanceof File) {
        fileValue = fileToFileData(value)
      } else if (value && typeof value === 'object' && 'name' in value) {
        fileValue = value
      }
      newResponses.fileFields = { ...responses.fileFields, [field.id]: fileValue }
      break
  }

  return newResponses
}

// Convert typed responses to backend format (stringified values)
export function convertToBackendFormat(responses: TypedFormResponses, fields: FormField[]): FormResponseData[] {
  const backendData: FormResponseData[] = []

  fields.forEach((field) => {
    let value: string

    switch (field.type) {
      case 'text':
      case 'email':
      case 'textarea':
        value = responses.textFields[field.id] || ''
        break
      case 'number':
        value = String(responses.numberFields[field.id] || 0)
        break
      case 'date':
        value = responses.dateFields[field.id]?.toISOString() || new Date().toISOString()
        break
      case 'boolean':
        value = String(responses.booleanFields[field.id] || false)
        break
      case 'select':
        value = responses.selectFields[field.id] || ''
        break
      case 'multiselect':
        value = JSON.stringify(responses.multiselectFields[field.id] || [])
        break
      case 'file':
        value = JSON.stringify(responses.fileFields[field.id] || null)
        break
      default:
        value = ''
    }

    backendData.push({
      fieldId: field.id,
      fieldName: field.title,
      fieldType: field.type,
      value,
    })
  })

  return backendData
}

// Convert backend format to typed responses
export function convertFromBackendFormat(backendData: FormResponseData[], fields: FormField[]): TypedFormResponses {
  const responses = initializeTypedResponses(fields)

  backendData.forEach((data) => {
    const field = fields.find((f) => f.id === data.fieldId)
    if (!field) return

    try {
      switch (data.fieldType) {
        case 'text':
        case 'email':
        case 'textarea':
          responses.textFields[data.fieldId] = data.value
          break
        case 'number':
          responses.numberFields[data.fieldId] = Number(data.value) || 0
          break
        case 'date':
          responses.dateFields[data.fieldId] = new Date(data.value)
          break
        case 'boolean':
          responses.booleanFields[data.fieldId] = data.value === 'true'
          break
        case 'select':
          responses.selectFields[data.fieldId] = data.value
          break
        case 'multiselect':
          try {
            const parsed: unknown = JSON.parse(data.value || '[]')
            responses.multiselectFields[data.fieldId] =
              Array.isArray(parsed) && parsed.every((item) => typeof item === 'string') ? parsed : []
          } catch {
            responses.multiselectFields[data.fieldId] = []
          }
          break
        case 'file':
          try {
            const parsed: unknown = JSON.parse(data.value || 'null')
            responses.fileFields[data.fieldId] =
              parsed && typeof parsed === 'object' && parsed !== null && 'name' in parsed ? (parsed as FileData) : null
          } catch {
            responses.fileFields[data.fieldId] = null
          }
          break
      }
    } catch (error) {
      console.error(`Error parsing value for field ${data.fieldId}:`, error)
      // Keep default values on parse error
    }
  })

  return responses
}

// Validate typed responses
export function validateTypedResponses(responses: TypedFormResponses, fields: FormField[]): Record<string, string> {
  const errors: Record<string, string> = {}

  fields.forEach((field) => {
    if (!field.required) return

    let isEmpty = false

    switch (field.type) {
      case 'text':
      case 'email':
      case 'textarea':
        const textValue = responses.textFields[field.id]
        isEmpty = !textValue || textValue.trim() === ''
        break
      case 'number':
        const numberValue = responses.numberFields[field.id]
        isEmpty = numberValue === undefined || numberValue === null || isNaN(numberValue)
        break
      case 'date':
        const dateValue = responses.dateFields[field.id]
        isEmpty = !dateValue || isNaN(dateValue.getTime())
        break
      case 'boolean':
        // Boolean fields are never "empty" - they're either true or false
        isEmpty = false
        break
      case 'select':
        const selectValue = responses.selectFields[field.id]
        isEmpty = !selectValue || selectValue === ''
        break
      case 'multiselect':
        const multiselectValue = responses.multiselectFields[field.id]
        isEmpty = !multiselectValue || multiselectValue.length === 0
        break
      case 'file':
        const fileValue = responses.fileFields[field.id]
        isEmpty = !fileValue
        break
    }

    if (isEmpty) {
      errors[field.id] = `${field.title} is required`
    }

    // Additional validation
    if (field.validation && !isEmpty) {
      if (field.type === 'text' || field.type === 'email' || field.type === 'textarea') {
        const textValue = responses.textFields[field.id]
        if (textValue && field.validation.min && textValue.length < field.validation.min) {
          errors[field.id] = `Minimum ${field.validation.min} characters required`
        }
        if (textValue && field.validation.max && textValue.length > field.validation.max) {
          errors[field.id] = `Maximum ${field.validation.max} characters allowed`
        }
        if (textValue && field.validation.pattern) {
          const regex = new RegExp(field.validation.pattern)
          if (!regex.test(textValue)) {
            errors[field.id] = field.errorMessage || 'Invalid format'
          }
        }
      }
    }
  })

  return errors
}

// Format value for display in responses table
export function formatFieldValueForDisplay(data: FormResponseData, maxLength = 50): string {
  if (!data.value) return '-'

  try {
    switch (data.fieldType) {
      case 'text':
      case 'email':
      case 'textarea':
        return data.value.length > maxLength ? `${data.value.substring(0, maxLength)}...` : data.value
      case 'number':
        return data.value
      case 'date':
        return new Date(data.value).toLocaleDateString()
      case 'boolean':
        return data.value === 'true' ? 'Yes' : 'No'
      case 'select':
        return data.value
      case 'multiselect':
        try {
          const parsed: unknown = JSON.parse(data.value || '[]')
          const options = Array.isArray(parsed) ? (parsed as string[]) : []
          return options.join(', ') || '-'
        } catch {
          return '-'
        }
      case 'file':
        try {
          const parsed: unknown = JSON.parse(data.value || 'null')
          const fileData = parsed && typeof parsed === 'object' && 'name' in parsed ? (parsed as FileData) : null
          return fileData ? `📎 ${fileData.name}` : '-'
        } catch {
          return '-'
        }
      default:
        return data.value
    }
  } catch (error) {
    console.error(`Error formatting value for field ${data.fieldId}:`, error)
    return '-'
  }
}

// Convert File object to FileData interface
export function fileToFileData(file: File): FileData {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
   
  }
}

export function getDisplayValue(
  responses: TypedFormResponses,
  field: FormField,
): string | number | boolean | string[] | FileData | null {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'textarea':
      return responses.textFields[field.id] || ''
    case 'number':
      const numberValue = responses.numberFields[field.id]
      return numberValue !== undefined && numberValue !== null ? numberValue : ''
    case 'date':

      const date = responses.dateFields[field.id]
      if (date) {
        const isoString = date.toISOString()
        const datePart = isoString.split('T')[0]
        if (datePart) {
          return datePart
        }
      }
      return ''
    case 'boolean':
      return responses.booleanFields[field.id] || false
    case 'select':
      return responses.selectFields[field.id] || ''
    case 'multiselect':
      return responses.multiselectFields[field.id] || []
    case 'file':
      return responses.fileFields[field.id] || null
    default:
      return ''
  }
}

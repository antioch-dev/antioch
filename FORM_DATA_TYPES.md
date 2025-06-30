# Form Data Types Refactor

This document describes the type-safe form data handling system that replaces the previous `any` type approach.

## Overview

The form system now uses structured data types to handle different field types properly, ensuring type safety throughout the application while maintaining a consistent storage format in the backend.

## Data Flow

```
Client Input → Typed Responses → Backend Format → Database Storage
                     ↓
           Display Format ← Backend Format ← Database Retrieval
```

## Key Types

### TypedFormResponses
Client-side state that organizes responses by data type:

```typescript
interface TypedFormResponses {
  textFields: Record<string, string>
  numberFields: Record<string, number>
  dateFields: Record<string, Date>
  booleanFields: Record<string, boolean>
  selectFields: Record<string, string>
  multiselectFields: Record<string, string[]>
  fileFields: Record<string, FileData | null>
}
```

### FormResponseData
Backend storage format with stringified values:

```typescript
interface FormResponseData {
  fieldId: string
  fieldName: string
  fieldType: FormField["type"]
  value: string // JSON stringified value
}
```

### FormResponse
Updated response structure using the new format:

```typescript
interface FormResponse {
  id: string
  formId: string
  responses: FormResponseData[]
  submittedAt: Date
  submittedBy?: string
}
```

## Helper Functions

### Core Functions

- `initializeTypedResponses(fields)` - Creates empty typed response structure
- `updateFieldValue(responses, field, value)` - Updates a field value with type safety
- `getDisplayValue(responses, field)` - Gets display-ready value for form inputs
- `validateTypedResponses(responses, fields)` - Validates form data

### Conversion Functions

- `convertToBackendFormat(responses, fields)` - Converts typed responses to backend format
- `convertFromBackendFormat(backendData, fields)` - Restores typed responses from backend
- `formatFieldValueForDisplay(data)` - Formats backend data for display in tables

### Utility Functions

- `fileToFileData(file)` - Converts File object to FileData interface

## Usage Examples

### Form Filling Component

```typescript
const [responses, setResponses] = useState<TypedFormResponses>(() => 
  initializeTypedResponses(form.fields)
)

const handleFieldChange = (fieldId: string, value: string | number | Date | boolean | string[] | File | null) => {
  const field = form.fields.find(f => f.id === fieldId)
  if (!field) return
  
  setResponses((prev) => updateFieldValue(prev, field, value))
}

const handleSubmit = async () => {
  const backendData = convertToBackendFormat(responses, form.fields)
  // Send backendData to API
}
```

### Responses Display Component

```typescript
const responses = await fetchFormResponses(formId)

// Display in table
{formFields.map((field) => {
  const responseData = getFieldResponseData(response, field.id)
  const displayValue = responseData ? formatFieldValueForDisplay(responseData) : "-"
  return <TableCell key={field.id}>{displayValue}</TableCell>
})}
```

## Benefits

1. **Type Safety**: No more `any` types - each data type is handled specifically
2. **Predictable State**: Data is organized by type, making it easier to work with
3. **Consistent Storage**: All backend data follows the same stringified format
4. **Easy Conversion**: Helper functions handle all type conversions automatically
5. **Better Validation**: Type-specific validation with proper error messages
6. **Maintainable**: Clear separation between client state and storage format

## Field Type Handling

| Field Type | Client Storage | Backend Storage | Display Format |
|------------|---------------|-----------------|----------------|
| text/email/textarea | `string` | `"string"` | Truncated text |
| number | `number` | `"25"` | Number string |
| date | `Date` | `"2024-01-15T00:00:00.000Z"` | Localized date |
| boolean | `boolean` | `"true"/"false"` | "Yes"/"No" |
| select | `string` | `"option"` | Option text |
| multiselect | `string[]` | `'["opt1","opt2"]'` | Comma-separated |
| file | `FileData \| null` | `'{"name":"file.pdf",...}'` | "📎 filename" |

## Migration Notes

- Old forms using `Record<string, any>` need to be updated to use `TypedFormResponses`
- Backend API should expect `FormResponseData[]` instead of `Record<string, any>`
- Display components should use `formatFieldValueForDisplay()` instead of custom formatting
- Form validation should use `validateTypedResponses()` for consistency

## Demo

Visit `/[fellowship_id]/forms/demo` to see the data transformation in action and understand how the different formats work together.

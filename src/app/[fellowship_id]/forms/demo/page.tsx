"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { FormField, TypedFormResponses, FormResponseData } from "../types"
import {
  initializeTypedResponses,
  updateFieldValue,
  convertToBackendFormat,
  convertFromBackendFormat,
  formatFieldValueForDisplay,
} from "../utils/form-data-helpers"

// Demo form fields
const demoFields: FormField[] = [
  {
    id: "1",
    type: "text",
    title: "Full Name",
    required: true,
  },
  {
    id: "2",
    type: "number",
    title: "Age",
    required: true,
  },
  {
    id: "3",
    type: "date",
    title: "Birth Date",
    required: true,
  },
  {
    id: "4",
    type: "select",
    title: "Favorite Color",
    required: true,
    options: ["Red", "Blue", "Green", "Yellow", "Purple"],
  },
  {
    id: "5",
    type: "multiselect",
    title: "Hobbies",
    required: false,
    options: ["Reading", "Sports", "Music", "Gaming", "Cooking"],
  },
  {
    id: "6",
    type: "boolean",
    title: "Subscribe to newsletter",
    required: false,
  },
]

export default function DataTypesDemo() {
  const [typedResponses, setTypedResponses] = useState<TypedFormResponses>(() => initializeTypedResponses(demoFields))
  const [backendData, setBackendData] = useState<FormResponseData[]>([])
  const [restoredData, setRestoredData] = useState<TypedFormResponses | null>(null)
  const populateSampleData = () => {
    let updatedResponses = typedResponses

    // Add sample data
    updatedResponses = updateFieldValue(updatedResponses, demoFields[0]!, "John Doe")
    updatedResponses = updateFieldValue(updatedResponses, demoFields[1]!, 25)
    updatedResponses = updateFieldValue(updatedResponses, demoFields[2]!, new Date("1999-05-15"))
    updatedResponses = updateFieldValue(updatedResponses, demoFields[3]!, "Blue")
    updatedResponses = updateFieldValue(updatedResponses, demoFields[4]!, ["Reading", "Music"])
    updatedResponses = updateFieldValue(updatedResponses, demoFields[5]!, true)

    setTypedResponses(updatedResponses)
  }

  const convertToBackend = () => {
    const backendFormat = convertToBackendFormat(typedResponses, demoFields)
    setBackendData(backendFormat)
  }

  const restoreFromBackend = () => {
    const restored = convertFromBackendFormat(backendData, demoFields)
    setRestoredData(restored)
  }

  const renderTypedResponsesDebug = (data: TypedFormResponses) => (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-sm">Text Fields:</h4>
        <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">{JSON.stringify(data.textFields, null, 2)}</pre>
      </div>
      <div>
        <h4 className="font-semibold text-sm">Number Fields:</h4>
        <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">{JSON.stringify(data.numberFields, null, 2)}</pre>
      </div>
      <div>
        <h4 className="font-semibold text-sm">Date Fields:</h4>
        <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">{JSON.stringify(data.dateFields, null, 2)}</pre>
      </div>
      <div>
        <h4 className="font-semibold text-sm">Boolean Fields:</h4>
        <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
          {JSON.stringify(data.booleanFields, null, 2)}
        </pre>
      </div>
      <div>
        <h4 className="font-semibold text-sm">Select Fields:</h4>
        <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">{JSON.stringify(data.selectFields, null, 2)}</pre>
      </div>
      <div>
        <h4 className="font-semibold text-sm">Multiselect Fields:</h4>
        <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
          {JSON.stringify(data.multiselectFields, null, 2)}
        </pre>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Form Data Types Demo</h1>
        <p className="text-muted-foreground">
          This page demonstrates how form data is structured, converted to backend format, and restored.
        </p>
      </div>

      <div className="flex gap-4">
        <Button onClick={populateSampleData}>Populate Sample Data</Button>
        <Button onClick={convertToBackend} disabled={!typedResponses}>
          Convert to Backend Format
        </Button>
        <Button onClick={restoreFromBackend} disabled={backendData.length === 0}>
          Restore from Backend
        </Button>
      </div>

      <Tabs defaultValue="typed" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="typed">Typed Responses</TabsTrigger>
          <TabsTrigger value="backend">Backend Format</TabsTrigger>
          <TabsTrigger value="restored">Restored Data</TabsTrigger>
          <TabsTrigger value="display">Display Format</TabsTrigger>
        </TabsList>

        <TabsContent value="typed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Typed Responses (Client-side State)</CardTitle>
              <p className="text-sm text-muted-foreground">
                Data is organized by type in separate objects for type safety
              </p>
            </CardHeader>
            <CardContent>{renderTypedResponsesDebug(typedResponses)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backend" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backend Format (Database Storage)</CardTitle>
              <p className="text-sm text-muted-foreground">
                All values are stringified for database storage with field metadata
              </p>
            </CardHeader>
            <CardContent>
              {backendData.length > 0 ? (
                <div className="space-y-2">
                  {backendData.map((item, index) => (
                    <div key={index} className="border rounded p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold">{item.fieldName}</span>
                        <Badge variant="outline">{item.fieldType}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Field ID: {item.fieldId}</div>
                      <div className="text-sm mt-1">
                        <strong>Value:</strong> {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  {`No backend data generated yet. Click "Convert to Backend Format" first.`}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="restored" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Restored Data (From Backend)</CardTitle>
              <p className="text-sm text-muted-foreground">Data parsed back into typed format from backend storage</p>
            </CardHeader>
            <CardContent>
              {restoredData ? (
                renderTypedResponsesDebug(restoredData)
              ) : (
                <p className="text-muted-foreground">{`No restored data yet. Click "Restore from Backend" first.`}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Display Format (Responses Table)</CardTitle>
              <p className="text-sm text-muted-foreground">How the data would appear in the responses table</p>
            </CardHeader>
            <CardContent>
              {backendData.length > 0 ? (
                <div className="space-y-3">
                  {backendData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded">
                      <span className="font-medium">{item.fieldName}</span>
                      <span className="text-sm bg-muted px-2 py-1 rounded">{formatFieldValueForDisplay(item)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No data to display. Convert to backend format first.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

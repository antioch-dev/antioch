"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Download,
  BarChart3,
  Users,
  MoreHorizontal,
  Eye,
  Trash2,
  Grid,
  List,
  FileSpreadsheet,
  FileText,
  Code,
} from "lucide-react"
import type { FormResponse, FormField } from "../../types"

// Mock form fields for table headers
const mockFormFields: FormField[] = [
  { id: "1", type: "text", title: "What would you like to purchase?", required: true },
  { id: "2", type: "textarea", title: "Any special instructions or requirements?", required: true },
  { id: "3", type: "date", title: "What is your preferred delivery date?", required: true },
  { id: "4", type: "file", title: "Do you have any relevant examples?", required: false },
]

// Mock responses data
const mockResponses: FormResponse[] = Array(45)
  .fill(null)
  .map((_, i) => ({
    id: `response-${i}`,
    formId: "1",
    responses: {
      "1": `Product ${i + 1} - ${["Laptop", "Phone", "Tablet", "Monitor", "Keyboard"][i % 5]}`,
      "2": `Special instructions for order ${i + 1}. ${i % 3 === 0 ? "Please handle with care." : i % 2 === 0 ? "Rush delivery needed." : "Standard delivery is fine."}`,
      "3": new Date(2024, 0, 15 + (i % 10)).toISOString().split("T")[0],
      "4": i % 4 === 0 ? "document.pdf" : null,
    },
    submittedAt: new Date(2024, 0, 15 + (i % 30)),
    submittedBy: i % 3 === 0 ? `user${i}@example.com` : undefined,
  }))

export default function FormResponses({ params }: { params: { id: string } }) {
  const [responses] = useState<FormResponse[]>(mockResponses)
  const [formFields] = useState<FormField[]>(mockFormFields)
  const [activeTab, setActiveTab] = useState("table")
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")

  const totalResponses = responses.length
  const responseRate = "85%" // Mock data
  const avgCompletionTime = "3.2 minutes" // Mock data

  const truncateText = (text: string, maxLength = 50) => {
    if (!text) return "-"
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  const formatCellValue = (value: any, fieldType: string) => {
    if (!value) return "-"

    switch (fieldType) {
      case "date":
        return new Date(value).toLocaleDateString()
      case "file":
        return value ? "📎 " + value : "-"
      case "boolean":
        return value ? "Yes" : "No"
      case "textarea":
        return truncateText(value, 100)
      default:
        return truncateText(value)
    }
  }

  const exportToCSV = () => {
    const headers = ["Response #", "Submitted Date", "Submitted By", ...formFields.map((f) => f.title)]
    const csvContent = [
      headers.join(","),
      ...responses.map((response, index) =>
        [
          `#${index + 1}`,
          response.submittedAt.toLocaleDateString(),
          response.submittedBy || "Anonymous",
          ...formFields.map((field) => {
            const value = response.responses[field.id]
            return `"${formatCellValue(value, field.type).replace(/"/g, '""')}"`
          }),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `form-responses-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const exportToJSON = () => {
    const exportData = {
      formTitle: "Customer Feedback Survey",
      exportDate: new Date().toISOString(),
      totalResponses: responses.length,
      fields: formFields,
      responses: responses.map((response, index) => ({
        responseNumber: index + 1,
        submittedAt: response.submittedAt.toISOString(),
        submittedBy: response.submittedBy,
        responses: response.responses,
      })),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `form-responses-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const exportToExcel = () => {
    // In a real implementation, you'd use a library like xlsx
    alert("Excel export would be implemented with a library like 'xlsx'")
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Form Responses</h1>
          <p className="text-muted-foreground">Customer Feedback Survey</p>
        </div>
        <div className="flex gap-2">
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="rounded-r-none"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "cards" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("cards")}
              className="rounded-l-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={exportToCSV}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToExcel}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToJSON}>
                <Code className="w-4 h-4 mr-2" />
                Export as JSON
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FileText className="w-4 h-4 mr-2" />
                Export Summary Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalResponses}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{responseRate}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion Time</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgCompletionTime}</div>
            <p className="text-xs text-muted-foreground">-0.3 min from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="table">Responses</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-4">
          {viewMode === "table" ? (
            <Card>
              <CardHeader>
                <CardTitle>All Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">#</TableHead>
                        <TableHead className="w-32">Submitted</TableHead>
                        <TableHead className="w-40">User</TableHead>
                        {formFields.map((field) => (
                          <TableHead key={field.id} className="min-w-48">
                            {field.title}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                          </TableHead>
                        ))}
                        <TableHead className="w-16">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {responses.map((response, index) => (
                        <TableRow key={response.id}>
                          <TableCell className="font-medium">#{index + 1}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm">{response.submittedAt.toLocaleDateString()}</div>
                              <div className="text-xs text-muted-foreground">
                                {response.submittedAt.toLocaleTimeString()}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {response.submittedBy ? (
                              <Badge variant="secondary" className="text-xs">
                                {response.submittedBy}
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground text-sm">Anonymous</span>
                            )}
                          </TableCell>
                          {formFields.map((field) => (
                            <TableCell key={field.id} className="max-w-xs">
                              <div className="truncate" title={response.responses[field.id]}>
                                {formatCellValue(response.responses[field.id], field.type)}
                              </div>
                            </TableCell>
                          ))}
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Card view (existing implementation)
            <div className="space-y-4">
              {responses.map((response, index) => (
                <Card key={response.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Response #{index + 1}</CardTitle>
                      <div className="flex gap-2">
                        <Badge variant="outline">{response.submittedAt.toLocaleDateString()}</Badge>
                        {response.submittedBy && <Badge variant="secondary">{response.submittedBy}</Badge>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formFields.map((field) => (
                      <div key={field.id} className="border-l-2 border-muted pl-4">
                        <p className="font-medium text-sm text-muted-foreground mb-1">{field.title}</p>
                        <p className="text-sm">{formatCellValue(response.responses[field.id], field.type)}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Response Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Response Timeline</h3>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Chart visualization would go here</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Field Analysis</h3>
                  <div className="grid gap-4">
                    {formFields.map((field) => (
                      <div key={field.id} className="p-4 border rounded-lg">
                        <h4 className="font-medium">{field.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {responses.length} responses, completion rate: {field.required ? "100%" : "85%"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

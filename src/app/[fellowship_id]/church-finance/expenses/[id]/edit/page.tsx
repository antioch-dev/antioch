"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, ArrowLeft, Save, Upload } from "lucide-react"
import Link from "next/link"

const expenseCategories = [
  "Utilities",
  "Maintenance",
  "Staff Salaries",
  "Ministry Expenses",
  "Office Supplies",
  "Insurance",
  "Missions",
  "Events",
  "Equipment",
  "Transportation",
  "Professional Services",
  "Charity",
  "Other Expenses",
]

interface Expense {
  amount: number
  description: string
  category: string
  date: string
  paymentMethod: string
  vendor?: string
  receiptNumber?: string
  receiptUrl?: string
  notes?: string
}

const paymentMethods = ["Cash", "Check", "Bank Transfer", "Online", "Other"]

// Define the props interface
interface EditExpensePageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditExpensePage({ params }: EditExpensePageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    date: "",
    paymentMethod: "",
    vendor: "",
    receiptNumber: "",
    receiptUrl: "",
    notes: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Resolve the params promise
  useEffect(() => {
    async function resolveParams() {
      const resolved = await params
      setResolvedParams(resolved)
    }
   void resolveParams()
  }, [params])

  useEffect(() => {
    // Load existing expense data only after params are resolved
    const loadExpense = async () => {
      if (!resolvedParams) return

      try {
        const response = await fetch(`/api/expenses/${resolvedParams.id}`)
        if (response.ok) {
          const expense = (await response.json()) as Expense
          setFormData({
            amount: expense.amount.toString(),
            description: expense.description,
            category: expense.category, 
            date: expense.date,
            paymentMethod: expense.paymentMethod,
            vendor: expense.vendor || "",
            receiptNumber: expense.receiptNumber || "",
            receiptUrl: expense.receiptUrl || "",
            notes: expense.notes || "",
          })
        }
      } catch (error) {
        console.error("[v0] Error loading expense:", error)
      } finally {
        setIsLoading(false)
      }
    }

    void loadExpense()
  }, [resolvedParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!resolvedParams) return
    
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/expenses/${resolvedParams.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json() as string
        console.log("[v0] Expense updated:", result)
        alert("Expense updated successfully!")
        window.location.href = `/expenses`
      } else {
        throw new Error("Failed to update expense")
      }
    } catch (error) {
      console.error("[v0] Error updating expense:", error)
      alert("Error updating expense. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading || !resolvedParams) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading expense details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="font-serif font-black text-xl text-gray-900">Church Finance</h1>
              </Link>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/income" className="text-gray-600 hover:text-primary font-medium">
                Income
              </Link>
              <Link href="/expenses" className="text-primary font-medium">
                Expenses
              </Link>
              <Link href="/budgets" className="text-gray-600 hover:text-primary font-medium">
                Budgets
              </Link>
              <Link href="/reports" className="text-gray-600 hover:text-primary font-medium">
                Reports
              </Link>
              <Link href="/assets" className="text-gray-600 hover:text-primary font-medium">
                Assets
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/expenses">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Expenses
            </Link>
          </Button>
          <div>
            <h1 className="font-serif font-black text-3xl text-gray-900">Edit Expense</h1>
            <p className="text-gray-600">Update expense transaction details</p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif font-bold">Expense Details</CardTitle>
            <CardDescription>Update the details of the expense transaction</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Input
                  id="description"
                  placeholder="Brief description of the expense"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Transaction Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method *</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor/Payee</Label>
                  <Input
                    id="vendor"
                    placeholder="Company or person paid"
                    value={formData.vendor}
                    onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receiptNumber">Receipt Number</Label>
                  <Input
                    id="receiptNumber"
                    placeholder="Receipt or invoice number"
                    value={formData.receiptNumber}
                    onChange={(e) => setFormData({ ...formData, receiptNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiptUrl">Receipt Upload</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="receiptUrl"
                    placeholder="Receipt URL or file path"
                    value={formData.receiptUrl}
                    onChange={(e) => setFormData({ ...formData, receiptUrl: e.target.value })}
                  />
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes about this expense"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Updating..." : "Update Expense"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/expenses">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
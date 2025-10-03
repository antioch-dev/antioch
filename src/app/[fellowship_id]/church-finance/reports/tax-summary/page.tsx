"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Download, FileText, ArrowLeft, Calculator } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock tax data - in real app this would come from database
const taxData = {
  2024: {
    totalIncome: 45000,
    taxableIncome: 12000,
    nonTaxableIncome: 33000,
    deductibleExpenses: 28000,
    categories: {
      tithe: { amount: 25000, taxable: false },
      offerings: { amount: 8000, taxable: false },
      donations: { amount: 5000, taxable: true },
      investment: { amount: 2000, taxable: true },
      rental: { amount: 5000, taxable: true },
    },
    deductions: {
      charitable: 15000,
      utilities: 6000,
      maintenance: 4000,
      supplies: 3000,
    },
  },
}

export default function TaxSummaryPage() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const data = taxData[selectedYear as unknown as keyof typeof taxData]

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
              <Link href="/fellowship1/church-finance/income" className="text-gray-600 hover:text-primary font-medium">
                Income
              </Link>
              <Link href="/fellowship1/church-finance/expenses" className="text-gray-600 hover:text-primary font-medium">
                Expenses
              </Link>
              <Link href="/fellowship1/church-finance/budgets" className="text-gray-600 hover:text-primary font-medium">
                Budgets
              </Link>
              <Link href="/fellowship1/church-finance/reports" className="text-primary font-medium">
                Reports
              </Link>
              <Link href="/fellowship1/church-finance/assets" className="text-gray-600 hover:text-primary font-medium">
                Assets
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/fellowship1/church-finance/reports">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Reports
              </Link>
            </Button>
            <div>
              <h1 className="font-serif font-black text-3xl text-gray-900 mb-2">Tax Summary Report</h1>
              <p className="text-gray-600">Annual tax reporting and compliance summary</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export Tax Report
            </Button>
          </div>
        </div>

        {/* Tax Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${data.totalIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All income sources</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxable Income</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${data.taxableIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Subject to taxation</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Non-Taxable</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${data.nonTaxableIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Tax-exempt income</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Deductions</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">${data.deductibleExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Tax deductible</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Income Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold">Income Tax Classification</CardTitle>
              <CardDescription>Breakdown of taxable vs non-taxable income</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(data.categories).map(([category, details]) => (
                  <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-medium capitalize">{category}</span>
                      <Badge variant={details.taxable ? "destructive" : "secondary"}>
                        {details.taxable ? "Taxable" : "Non-Taxable"}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${details.amount.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deductions */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold">Tax Deductions</CardTitle>
              <CardDescription>Allowable business expense deductions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(data.deductions).map(([category, amount]) => (
                  <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-medium capitalize">{category}</span>
                      <Badge variant="outline">Deductible</Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${amount.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tax Compliance Notes */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-serif font-bold">Tax Compliance Notes</CardTitle>
            <CardDescription>Important information for tax filing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-blue-900 mb-2">Religious Organization Tax Status</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Tithes and offerings are generally not taxable income for religious organizations</li>
                <li>• Investment income and rental income may be subject to Unrelated Business Income Tax (UBIT)</li>
                <li>• Maintain detailed records of all income sources and classifications</li>
                <li>• Consult with a tax professional for specific guidance</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-lg font-bold">Form 990</div>
                <div className="text-sm text-gray-600">Annual filing required if gross receipts &gt; $50,000</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-lg font-bold">UBIT Filing</div>
                <div className="text-sm text-gray-600">Required if unrelated business income &gt; $1,000</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

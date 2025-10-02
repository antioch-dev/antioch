"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { DollarSign, Download, ArrowLeft, TrendingUp, TrendingDown, Calendar } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

// Mock yearly data
const yearlyData = {
  2024: {
    summary: {
      totalIncome: 54000,
      totalExpenses: 38400,
      netIncome: 15600,
      budgetUtilization: 85,
    },
    monthlyBreakdown: [
      { month: "Jan", income: 4200, expenses: 2800, net: 1400 },
      { month: "Feb", income: 3800, expenses: 3200, net: 600 },
      { month: "Mar", income: 5200, expenses: 2900, net: 2300 },
      { month: "Apr", income: 4600, expenses: 3100, net: 1500 },
      { month: "May", income: 5800, expenses: 3400, net: 2400 },
      { month: "Jun", income: 5000, expenses: 2750, net: 2250 },
      { month: "Jul", income: 4800, expenses: 3200, net: 1600 },
      { month: "Aug", income: 5200, expenses: 3100, net: 2100 },
      { month: "Sep", income: 4900, expenses: 2900, net: 2000 },
      { month: "Oct", income: 5100, expenses: 3300, net: 1800 },
      { month: "Nov", income: 5200, expenses: 3400, net: 1800 },
      { month: "Dec", income: 6200, expenses: 4350, net: 1850 },
    ],
    quarterlyComparison: [
      { quarter: "Q1", income: 13200, expenses: 8900, net: 4300 },
      { quarter: "Q2", income: 15400, expenses: 9250, net: 6150 },
      { quarter: "Q3", income: 14900, expenses: 9200, net: 5700 },
      { quarter: "Q4", income: 16500, expenses: 11050, net: 5450 },
    ],
    topCategories: {
      income: [
        { name: "Tithe", amount: 30000, percentage: 55.6 },
        { name: "Offerings", amount: 15000, percentage: 27.8 },
        { name: "Special Offerings", amount: 6000, percentage: 11.1 },
        { name: "Other", amount: 3000, percentage: 5.6 },
      ],
      expenses: [
        { name: "Staff Salaries", amount: 18000, percentage: 46.9 },
        { name: "Utilities", amount: 7200, percentage: 18.8 },
        { name: "Ministry Expenses", amount: 8400, percentage: 21.9 },
        { name: "Other", amount: 4800, percentage: 12.5 },
      ],
    },
  },
}

const chartConfig = {
  income: { label: "Income", color: "#15803d" },
  expenses: { label: "Expenses", color: "#dc2626" },
  net: { label: "Net Income", color: "#84cc16" },
} satisfies ChartConfig

// Define the props interface
interface YearlyReportPageProps {
  params: Promise<{
    year: string
  }>
}

export default function YearlyReportPage({ params }: YearlyReportPageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ year: string } | null>(null)
  const [selectedYear, setSelectedYear] = useState("2024")

  // Resolve the params promise
  useEffect(() => {
    async function resolveParams() {
      const resolved = await params
      setResolvedParams(resolved)
      if (resolved.year) {
        setSelectedYear(resolved.year)
      }
    }
   void resolveParams()
  }, [params])

  const data = yearlyData[selectedYear as unknown as keyof typeof yearlyData]

  // Show loading state while params are being resolved
  if (!resolvedParams) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading report...</p>
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
              <Link href="/expenses" className="text-gray-600 hover:text-primary font-medium">
                Expenses
              </Link>
              <Link href="/budgets" className="text-gray-600 hover:text-primary font-medium">
                Budgets
              </Link>
              <Link href="/reports" className="text-primary font-medium">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/reports">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Reports
              </Link>
            </Button>
            <div>
              <h1 className="font-serif font-black text-3xl text-gray-900 mb-2">Annual Report {selectedYear}</h1>
              <p className="text-gray-600">Comprehensive yearly financial analysis</p>
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
              Export Report
            </Button>
          </div>
        </div>

        {/* Annual Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Annual Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${data.summary.totalIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total for {selectedYear}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Annual Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${data.summary.totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total for {selectedYear}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Income</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${data.summary.netIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Annual surplus</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Usage</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{data.summary.budgetUtilization}%</div>
              <p className="text-xs text-muted-foreground">Of annual budget</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold">Monthly Financial Trend</CardTitle>
              <CardDescription>Income, expenses, and net income by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.monthlyBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="income" stroke="var(--color-income)" strokeWidth={2} />
                    <Line type="monotone" dataKey="expenses" stroke="var(--color-expenses)" strokeWidth={2} />
                    <Line type="monotone" dataKey="net" stroke="var(--color-net)" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Quarterly Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold">Quarterly Performance</CardTitle>
              <CardDescription>Financial performance by quarter</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.quarterlyComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="income" fill="var(--color-income)" />
                    <Bar dataKey="expenses" fill="var(--color-expenses)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Income Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold">Income Sources</CardTitle>
              <CardDescription>Top income categories for {selectedYear}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topCategories.income.map((category, index) => (
                  <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">#{index + 1}</Badge>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${category.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{category.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Expense Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold">Expense Categories</CardTitle>
              <CardDescription>Top expense categories for {selectedYear}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topCategories.expenses.map((category, index) => (
                  <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">#{index + 1}</Badge>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${category.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{category.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
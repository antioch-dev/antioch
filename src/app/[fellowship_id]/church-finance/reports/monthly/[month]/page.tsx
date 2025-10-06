"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import {
  DollarSign,
  ArrowLeft,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

// Define the props interface
interface MonthlyReportPageProps {
  params: Promise<{
    month: string
  }>
}

export default function MonthlyReportPage({ params }: MonthlyReportPageProps) {
  const router = useRouter()
  const [resolvedParams, setResolvedParams] = useState<{ month: string } | null>(null)
  const [currentMonth, setCurrentMonth] = useState("2024-01")
  const [currentYear, setCurrentYear] = useState(2024)

  // Resolve the params promise
  useEffect(() => {
    async function resolveParams() {
      const resolved = await params
      setResolvedParams(resolved)
      if (resolved.month) {
        setCurrentMonth(resolved.month)
        setCurrentYear(Number.parseInt(resolved.month.split("-")[0] ?? "2024"))
      }
    }
   void resolveParams()
  }, [params])

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ]

  const navigateToMonth = (monthYear: string) => {
    setCurrentMonth(monthYear)
    setCurrentYear(Number.parseInt(monthYear.split("-")[0] ?? "2024"))
    router.push(`/reports/monthly/${monthYear}`)
  }

  const navigatePrevMonth = () => {
    const [year, month] = currentMonth.split("-")
    const currentDate = new Date(Number.parseInt(year ?? "2024"), Number.parseInt(month ?? "1") - 1)
    currentDate.setMonth(currentDate.getMonth() - 1)
    const newMonthYear = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`
    navigateToMonth(newMonthYear)
  }

  const navigateNextMonth = () => {
    const [year, month] = currentMonth.split("-")
    const currentDate = new Date(Number.parseInt(year ?? "2024"), Number.parseInt(month ?? "1") - 1)
    currentDate.setMonth(currentDate.getMonth() + 1)
    const newMonthYear = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`
    navigateToMonth(newMonthYear)
  }

  const getCurrentMonthLabel = () => {
    const [year, month] = currentMonth.split("-")
    const monthLabel = months.find((m) => m.value === month)?.label || "January"
    return `${monthLabel} ${year}`
  }

  const monthData = {
    month: getCurrentMonthLabel(),
    totalIncome: 8500,
    totalExpenses: 6200,
    netIncome: 2300,
    transactionCount: 47,
    incomeByCategory: [
      { name: "Tithe", value: 4200, color: "#15803d" },
      { name: "Offering", value: 2800, color: "#84cc16" },
      { name: "Special Offering", value: 1000, color: "#22c55e" },
      { name: "Donations", value: 500, color: "#16a34a" },
    ],
    expensesByCategory: [
      { name: "Staff Salaries", value: 3500, color: "#dc2626" },
      { name: "Utilities", value: 1200, color: "#ea580c" },
      { name: "Ministry Expenses", value: 800, color: "#d97706" },
      { name: "Maintenance", value: 700, color: "#ca8a04" },
    ],
    weeklyBreakdown: [
      { week: "Week 1", income: 2100, expenses: 1800 },
      { week: "Week 2", income: 1900, expenses: 1400 },
      { week: "Week 3", income: 2200, expenses: 1600 },
      { week: "Week 4", income: 2300, expenses: 1400 },
    ],
  }

  const chartConfig = {
    income: { label: "Income", color: "#15803d" },
    expenses: { label: "Expenses", color: "#dc2626" },
  } satisfies ChartConfig

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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/fellowship1/church-finance/reports">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Reports
              </Link>
            </Button>
            <div>
              <h1 className="font-serif font-black text-3xl text-gray-900">{monthData.month} Report</h1>
              <p className="text-gray-600">Detailed monthly financial analysis</p>
            </div>
          </div>
          <Button variant="outline" className="bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-serif font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Month Navigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={navigatePrevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button variant="outline" size="sm" onClick={navigateNextMonth}>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Month:</label>
                  <Select
                    value={currentMonth.split("-")[1]}
                    onValueChange={(month) => navigateToMonth(`${currentYear}-${month}`)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month.value} value={month.value}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Year:</label>
                  <Select
                    value={currentYear.toString()}
                    onValueChange={(year) => {
                      const newYear = Number.parseInt(year)
                      setCurrentYear(newYear)
                      navigateToMonth(`${year}-${currentMonth.split("-")[1]}`)
                    }}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${monthData.totalIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${monthData.totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">-5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Income</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${monthData.netIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+45% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthData.transactionCount}</div>
              <p className="text-xs text-muted-foreground">Total transactions</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold">Weekly Breakdown</CardTitle>
              <CardDescription>Income vs expenses by week</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthData.weeklyBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="income" fill="var(--color-income)" />
                    <Bar dataKey="expenses" fill="var(--color-expenses)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Income Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold">Income Sources</CardTitle>
              <CardDescription>Breakdown by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={monthData.incomeByCategory}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {monthData.incomeByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Category Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold">Income Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthData.incomeByCategory.map((category) => (
                  <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${category.value.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">
                        {((category.value / monthData.totalIncome) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold">Expense Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthData.expensesByCategory.map((category) => (
                  <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${category.value.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">
                        {((category.value / monthData.totalExpenses) * 100).toFixed(1)}%
                      </div>
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
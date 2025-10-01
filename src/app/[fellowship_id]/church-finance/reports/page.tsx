"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { DollarSign, Download, Calendar, TrendingUp, TrendingDown, FileText } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock data - in real app this would come from database
const monthlyData = [
  { month: "Jan", income: 4200, expenses: 2800, net: 1400 },
  { month: "Feb", income: 3800, expenses: 3200, net: 600 },
  { month: "Mar", income: 5200, expenses: 2900, net: 2300 },
  { month: "Apr", income: 4600, expenses: 3100, net: 1500 },
  { month: "May", income: 5800, expenses: 3400, net: 2400 },
  { month: "Jun", income: 5000, expenses: 2750, net: 2250 },
]

const incomeByCategory = [
  { name: "Tithe", value: 15000, color: "#15803d" },
  { name: "Offering", value: 8000, color: "#84cc16" },
  { name: "Special Offering", value: 3500, color: "#22c55e" },
  { name: "Donations", value: 2500, color: "#16a34a" },
  { name: "Other", value: 1000, color: "#65a30d" },
]

const expensesByCategory = [
  { name: "Staff Salaries", value: 15000, color: "#dc2626" },
  { name: "Utilities", value: 5400, color: "#ea580c" },
  { name: "Ministry Expenses", value: 7200, color: "#d97706" },
  { name: "Maintenance", value: 2400, color: "#ca8a04" },
  { name: "Other", value: 2000, color: "#eab308" },
]

const chartConfig = {
  income: {
    label: "Income",
    color: "#15803d",
  },
  expenses: {
    label: "Expenses",
    color: "#dc2626",
  },
  net: {
    label: "Net Income",
    color: "#84cc16",
  },
} satisfies ChartConfig

export default function ReportsPage() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedMonth, setSelectedMonth] = useState("January")

  const totalIncome = monthlyData.reduce((sum, month) => sum + month.income, 0)
  const totalExpenses = monthlyData.reduce((sum, month) => sum + month.expenses, 0)
  const totalNet = totalIncome - totalExpenses

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
              <Link href="/admin" className="text-gray-600 hover:text-primary font-medium">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif font-black text-3xl text-gray-900 mb-2">Reports & Analytics</h1>
            <p className="text-gray-600">Financial insights and detailed reporting</p>
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
              Export PDF
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${totalIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Year to date</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Year to date</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Income</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalNet.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Year to date</p>
            </CardContent>
          </Card>
        </div>

        {/* Reports Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="income">Income Analysis</TabsTrigger>
            <TabsTrigger value="expenses">Expense Analysis</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Income vs Expenses */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif font-bold">Monthly Financial Overview</CardTitle>
                  <CardDescription>Income vs expenses by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="income" fill="var(--color-income)" />
                        <Bar dataKey="expenses" fill="var(--color-expenses)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Net Income Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif font-bold">Net Income Trend</CardTitle>
                  <CardDescription>Monthly net income over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="net"
                          stroke="var(--color-net)"
                          strokeWidth={3}
                          dot={{ fill: "var(--color-net)" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Quick Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Quick Reports</CardTitle>
                <CardDescription>Generate common financial reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
                    <Link href="/reports/monthly/january">
                      <FileText className="w-6 h-6" />
                      <span>Monthly Summary</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
                    <Link href="/reports/yearly/2024">
                      <Calendar className="w-6 h-6" />
                      <span>Yearly Report</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
                    <Link href="/reports/tax-summary">
                      <DollarSign className="w-6 h-6" />
                      <span>Tax Summary</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="income" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Income by Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif font-bold">Income by Category</CardTitle>
                  <CardDescription>Breakdown of income sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={incomeByCategory}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {incomeByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Income Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif font-bold">Income Category Details</CardTitle>
                  <CardDescription>Detailed breakdown with amounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {incomeByCategory.map((category) => (
                      <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${category.value.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">
                            {((category.value / totalIncome) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Expenses by Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif font-bold">Expenses by Category</CardTitle>
                  <CardDescription>Breakdown of expense categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expensesByCategory}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {expensesByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Expense Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif font-bold">Expense Category Details</CardTitle>
                  <CardDescription>Detailed breakdown with amounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expensesByCategory.map((category) => (
                      <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${category.value.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">
                            {((category.value / totalExpenses) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Financial Trends Analysis</CardTitle>
                <CardDescription>Key performance indicators and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">+12%</div>
                    <div className="text-sm text-gray-600">Income Growth</div>
                    <Badge variant="secondary" className="mt-1">
                      vs Last Year
                    </Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-red-600">+8%</div>
                    <div className="text-sm text-gray-600">Expense Growth</div>
                    <Badge variant="secondary" className="mt-1">
                      vs Last Year
                    </Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">1.4x</div>
                    <div className="text-sm text-gray-600">Income Ratio</div>
                    <Badge variant="secondary" className="mt-1">
                      Income/Expenses
                    </Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">$1,583</div>
                    <div className="text-sm text-gray-600">Avg Monthly Net</div>
                    <Badge variant="secondary" className="mt-1">
                      6 Month Avg
                    </Badge>
                  </div>
                </div>

                <ChartContainer config={chartConfig} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Line
                        type="monotone"
                        dataKey="income"
                        stroke="var(--color-income)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-income)" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke="var(--color-expenses)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-expenses)" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="net"
                        stroke="var(--color-net)"
                        strokeWidth={3}
                        dot={{ fill: "var(--color-net)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

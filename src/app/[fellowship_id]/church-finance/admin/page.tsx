import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  CheckCircle,
  Users,
  Receipt,
  Building,
  Eye,
} from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from database
const dashboardData = {
  financialSummary: {
    totalIncome: 45000,
    totalExpenses: 32000,
    netIncome: 13000,
    monthlyIncome: 5000,
    monthlyExpenses: 2150,
    monthlyNet: 2850,
  },
  pendingBudgets: [
    {
      id: 1,
      title: "Youth Ministry Summer Camp",
      requestedAmount: 3500,
      requestedBy: "Pastor John",
      department: "Youth Ministry",
      daysWaiting: 5,
    },
    {
      id: 3,
      title: "Children's Ministry Supplies",
      requestedAmount: 1200,
      requestedBy: "Children's Director",
      department: "Children's Ministry",
      daysWaiting: 3,
    },
  ],
  recentTransactions: [
    {
      id: 1,
      type: "income",
      amount: 2500,
      description: "Sunday Service Tithe Collection",
      date: "2024-01-21",
      category: "Tithe",
    },
    {
      id: 2,
      type: "expense",
      amount: 450,
      description: "Monthly Electricity Bill",
      date: "2024-01-20",
      category: "Utilities",
    },
    {
      id: 3,
      type: "income",
      amount: 800,
      description: "General Offering",
      date: "2024-01-21",
      category: "Offering",
    },
    {
      id: 4,
      type: "expense",
      amount: 200,
      description: "Office Supplies Purchase",
      date: "2024-01-19",
      category: "Office Supplies",
    },
  ],
  budgetStatus: {
    totalBudget: 60000,
    usedBudget: 32000,
    remainingBudget: 28000,
    categories: [
      { name: "Staff Salaries", budgeted: 20000, spent: 15000 },
      { name: "Utilities", budgeted: 8000, spent: 5400 },
      { name: "Ministry Expenses", budgeted: 12000, spent: 7200 },
      { name: "Maintenance", budgeted: 6000, spent: 2400 },
      { name: "Other", budgeted: 14000, spent: 2000 },
    ],
  },
}

export default function AdminDashboardPage() {
  const { financialSummary, pendingBudgets, recentTransactions, budgetStatus } = dashboardData

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
              <Link href="/reports" className="text-gray-600 hover:text-primary font-medium">
                Reports
              </Link>
              <Link href="/assets" className="text-gray-600 hover:text-primary font-medium">
                Assets
              </Link>
              <Link href="/admin" className="text-primary font-medium">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif font-black text-3xl text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Financial overview and administrative controls</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${financialSummary.totalIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +${financialSummary.monthlyIncome.toLocaleString()} this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${financialSummary.totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +${financialSummary.monthlyExpenses.toLocaleString()} this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Income</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${financialSummary.netIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +${financialSummary.monthlyNet.toLocaleString()} this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingBudgets.length}</div>
              <p className="text-xs text-muted-foreground">Budget requests waiting</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
            <TabsTrigger value="budget">Budget Status</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Financial Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif font-bold">Financial Health</CardTitle>
                  <CardDescription>Key financial indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Income vs Expenses Ratio</span>
                    <span className="text-sm text-green-600">
                      {((financialSummary.totalIncome / financialSummary.totalExpenses) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress
                    value={
                      (financialSummary.totalIncome / (financialSummary.totalIncome + financialSummary.totalExpenses)) *
                      100
                    }
                    className="h-2"
                  />
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        ${financialSummary.monthlyIncome.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Monthly Income</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        ${financialSummary.monthlyExpenses.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Monthly Expenses</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif font-bold">Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full justify-start">
                    <Link href="/budgets">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Review Budget Requests ({pendingBudgets.length})
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/reports">
                      <Receipt className="w-4 h-4 mr-2" />
                      Generate Monthly Report
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/income/new">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Record Income
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/expenses/new">
                      <Receipt className="w-4 h-4 mr-2" />
                      Record Expense
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Pending Budget Approvals</CardTitle>
                <CardDescription>Budget requests requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingBudgets.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                    <p>No pending budget requests</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingBudgets.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{request.title}</h3>
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              <Clock className="w-3 h-3 mr-1" />
                              {request.daysWaiting} days waiting
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {request.requestedBy}
                            </span>
                            <span className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              {request.department}
                            </span>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-lg font-bold">${request.requestedAmount.toLocaleString()}</div>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/budgets/${request.id}`}>
                                <Eye className="w-3 h-3 mr-1" />
                                Review
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Budget Status</CardTitle>
                <CardDescription>Annual budget utilization by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">Overall Budget Usage</span>
                    <span className="text-lg font-bold">
                      ${budgetStatus.usedBudget.toLocaleString()} / ${budgetStatus.totalBudget.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={(budgetStatus.usedBudget / budgetStatus.totalBudget) * 100} className="h-3" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {budgetStatus.categories.map((category) => (
                      <div key={category.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{category.name}</span>
                          <span className="text-sm text-gray-600">
                            ${category.spent.toLocaleString()} / ${category.budgeted.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={(category.spent / category.budgeted) * 100} className="h-2" />
                        <div className="text-xs text-gray-500">
                          {((category.spent / category.budgeted) * 100).toFixed(1)}% used
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Recent Transactions</CardTitle>
                <CardDescription>Latest financial activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          {transaction.type === "income" ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{transaction.description}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-3 h-3" />
                            {new Date(transaction.date).toLocaleDateString()}
                            <span>• {transaction.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${
                            transaction.type === "income" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

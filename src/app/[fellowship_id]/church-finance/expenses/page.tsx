import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, DollarSign, Calendar, Filter, Receipt } from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from database
const expenseTransactions = [
  {
    id: 1,
    amount: 450.0,
    description: "Monthly Electricity Bill",
    category: "Utilities",
    date: "2024-01-05",
    paymentMethod: "Bank Transfer",
    vendor: "City Electric Company",
    notes: "January utility bill",
  },
  {
    id: 2,
    amount: 200.0,
    description: "Office Supplies Purchase",
    category: "Office Supplies",
    date: "2024-01-10",
    paymentMethod: "Check",
    vendor: "Office Depot",
    notes: "Printer paper, pens, folders",
  },
  {
    id: 3,
    amount: 300.0,
    description: "Sound System Maintenance",
    category: "Maintenance",
    date: "2024-01-12",
    paymentMethod: "Cash",
    vendor: "Audio Tech Services",
    notes: "Quarterly maintenance check",
  },
  {
    id: 4,
    amount: 1200.0,
    description: "Youth Ministry Retreat",
    category: "Ministry Expenses",
    date: "2024-01-15",
    paymentMethod: "Check",
    vendor: "Mountain View Camp",
    notes: "Annual youth retreat expenses",
  },
]

export default function ExpensesPage() {
  const totalExpenses = expenseTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)

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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif font-black text-3xl text-gray-900 mb-2">Expense Tracking</h1>
            <p className="text-gray-600">Monitor and manage all church expenditures</p>
          </div>
          <Button asChild>
            <Link href="/expenses/new">
              <Plus className="w-4 h-4 mr-2" />
              Record Expense
            </Link>
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">January 2024</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{expenseTransactions.length}</div>
              <p className="text-xs text-muted-foreground">Total records</p>
            </CardContent>
          </Card>
        </div>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif font-bold">Recent Expense Transactions</CardTitle>
            <CardDescription>All recorded expense transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenseTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
                      <Badge variant="outline">{transaction.category}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                      <span>{transaction.paymentMethod}</span>
                      {transaction.vendor && <span>• {transaction.vendor}</span>}
                      {transaction.notes && <span>• {transaction.notes}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-600">-${transaction.amount.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

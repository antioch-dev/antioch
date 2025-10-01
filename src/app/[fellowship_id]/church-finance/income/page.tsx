import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, DollarSign, Calendar, Filter } from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from database
const incomeTransactions = [
  {
    id: 1,
    amount: 2500.0,
    description: "Sunday Service Tithe Collection",
    category: "Tithe",
    date: "2024-01-07",
    paymentMethod: "Cash",
    notes: "Regular Sunday collection",
  },
  {
    id: 2,
    amount: 800.0,
    description: "General Offering",
    category: "Offering",
    date: "2024-01-07",
    paymentMethod: "Cash",
    notes: "Sunday service offering",
  },
  {
    id: 3,
    amount: 1200.0,
    description: "Building Fund Special Offering",
    category: "Special Offering",
    date: "2024-01-14",
    paymentMethod: "Check",
    notes: "Special collection for building repairs",
  },
  {
    id: 4,
    amount: 500.0,
    description: "Anonymous Donation",
    category: "Donations",
    date: "2024-01-15",
    paymentMethod: "Bank Transfer",
    notes: "Online donation received",
  },
]

export default function IncomePage() {
  const totalIncome = incomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)

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
              <Link href="/income" className="text-primary font-medium">
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
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif font-black text-3xl text-gray-900 mb-2">Income Management</h1>
            <p className="text-gray-600">Track and manage all incoming funds</p>
          </div>
          <Button asChild>
            <Link href="/income/new">
              <Plus className="w-4 h-4 mr-2" />
              Record Income
            </Link>
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${totalIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">January 2024</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{incomeTransactions.length}</div>
              <p className="text-xs text-muted-foreground">Total records</p>
            </CardContent>
          </Card>
        </div>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif font-bold">Recent Income Transactions</CardTitle>
            <CardDescription>All recorded income transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incomeTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
                      <Badge variant="secondary">{transaction.category}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                      <span>{transaction.paymentMethod}</span>
                      {transaction.notes && <span>• {transaction.notes}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">${transaction.amount.toLocaleString()}</div>
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

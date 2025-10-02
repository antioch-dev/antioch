import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, DollarSign, TrendingUp, Calendar, Receipt, Settings } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="font-serif font-black text-xl text-gray-900">Church Finance</h1>
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
              <Link href="/admin" className="text-gray-600 hover:text-primary font-medium">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-serif font-black text-4xl text-gray-900 mb-4">
            {`Empowering Your Church's Financial Stewardship`}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Manage income, expenses, and budgets with ease. Designed for everyone—no accounting experience required.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/income">Get Started Today</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent">
              <Link href="/admin">
                <Settings className="w-4 h-4 mr-2" />
                Admin Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">$5,000.00</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">$2,150.00</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Budgets</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="font-serif font-bold">Record Income</CardTitle>
              <CardDescription>Add tithe, offerings, and donations</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/income/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Income
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="font-serif font-bold">Track Expenses</CardTitle>
              <CardDescription>Log operational and ministry costs</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/expenses/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Expense
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="font-serif font-bold">Budget Request</CardTitle>
              <CardDescription>Submit ministry budget proposals</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/budgets/new">
                  <Plus className="w-4 h-4 mr-2" />
                  New Request
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="font-serif font-bold">View Reports</CardTitle>
              <CardDescription>Monthly and yearly summaries</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/reports">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Reports
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

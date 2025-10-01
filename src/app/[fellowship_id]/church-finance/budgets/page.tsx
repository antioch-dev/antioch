import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, DollarSign, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from database
const budgetRequests = [
  {
    id: 1,
    title: "Youth Ministry Summer Camp",
    description: "Annual summer camp for 25 youth members including transportation, accommodation, and activities",
    requestedAmount: 3500.0,
    approvedAmount: null,
    requestedBy: "Pastor John",
    ministryDepartment: "Youth Ministry",
    status: "pending",
    createdAt: "2024-01-15",
    timelineStart: "2024-06-15",
    timelineEnd: "2024-06-22",
  },
  {
    id: 2,
    title: "Sound System Upgrade",
    description: "Upgrade main sanctuary sound system with new microphones and mixing board",
    requestedAmount: 8500.0,
    approvedAmount: 7000.0,
    requestedBy: "Worship Leader",
    ministryDepartment: "Worship Ministry",
    status: "approved",
    createdAt: "2024-01-10",
    timelineStart: "2024-03-01",
    timelineEnd: "2024-03-31",
  },
  {
    id: 3,
    title: "Children's Ministry Supplies",
    description: "Craft supplies, books, and educational materials for children's programs",
    requestedAmount: 1200.0,
    approvedAmount: null,
    requestedBy: "Children's Director",
    ministryDepartment: "Children's Ministry",
    status: "under_review",
    createdAt: "2024-01-12",
    timelineStart: "2024-02-01",
    timelineEnd: "2024-12-31",
  },
  {
    id: 4,
    title: "Outreach Event Funding",
    description: "Community outreach event with food, entertainment, and promotional materials",
    requestedAmount: 2000.0,
    approvedAmount: null,
    requestedBy: "Outreach Coordinator",
    ministryDepartment: "Outreach Ministry",
    status: "denied",
    createdAt: "2024-01-08",
    timelineStart: "2024-04-15",
    timelineEnd: "2024-04-15",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="w-4 h-4 text-yellow-500" />
    case "approved":
      return <CheckCircle className="w-4 h-4 text-green-500" />
    case "denied":
      return <XCircle className="w-4 h-4 text-red-500" />
    case "under_review":
      return <AlertCircle className="w-4 h-4 text-blue-500" />
    default:
      return <Clock className="w-4 h-4 text-gray-500" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "approved":
      return "bg-green-100 text-green-800"
    case "denied":
      return "bg-red-100 text-red-800"
    case "under_review":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function BudgetsPage() {
  const totalRequested = budgetRequests.reduce((sum, request) => sum + request.requestedAmount, 0)
  const totalApproved = budgetRequests
    .filter((request) => request.status === "approved")
    .reduce((sum, request) => sum + (request.approvedAmount || request.requestedAmount), 0)
  const pendingCount = budgetRequests.filter((request) => request.status === "pending").length

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
              <Link href="/budgets" className="text-primary font-medium">
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
            <h1 className="font-serif font-black text-3xl text-gray-900 mb-2">Budget Requests</h1>
            <p className="text-gray-600">Submit and track ministry budget proposals</p>
          </div>
          <Button asChild>
            <Link href="/budgets/new">
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Link>
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requested</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRequested.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All requests</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalApproved.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Approved funding</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>
        </div>

        {/* Budget Requests List */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif font-bold">All Budget Requests</CardTitle>
            <CardDescription>Ministry budget proposals and their approval status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{request.title}</h3>
                      <Badge className={getStatusColor(request.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(request.status)}
                          {request.status.replace("_", " ")}
                        </div>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{request.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                      <span>• {request.ministryDepartment}</span>
                      <span>• {request.requestedBy}</span>
                      {request.timelineStart && (
                        <span>
                          • Timeline: {new Date(request.timelineStart).toLocaleDateString()} -{" "}
                          {new Date(request.timelineEnd).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-lg font-bold">${request.requestedAmount.toLocaleString()}</div>
                    {request.approvedAmount && (
                      <div className="text-sm text-green-600">Approved: ${request.approvedAmount.toLocaleString()}</div>
                    )}
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent" asChild>
                      <Link href={`/budgets/${request.id}`}>View Details</Link>
                    </Button>
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

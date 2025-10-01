import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, DollarSign, Search, Filter, Building, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from database
const assets = [
  {
    id: 1,
    name: "Sound System - Main Sanctuary",
    description: "Professional audio system with microphones and speakers",
    category: "Audio Equipment",
    purchaseDate: "2022-03-15",
    purchasePrice: 8500.0,
    currentValue: 7000.0,
    condition: "good",
    location: "Main Sanctuary",
    serialNumber: "AS-2022-001",
    warrantyExpiry: "2025-03-15",
    notes: "Under warranty until March 2025",
  },
  {
    id: 2,
    name: "Church Van",
    description: "15-passenger van for ministry transportation",
    category: "Vehicles",
    purchaseDate: "2021-08-20",
    purchasePrice: 35000.0,
    currentValue: 28000.0,
    condition: "good",
    location: "Church Parking Lot",
    serialNumber: "VAN-2021-001",
    warrantyExpiry: null,
    notes: "Regular maintenance required",
  },
  {
    id: 3,
    name: "Office Computer",
    description: "Desktop computer for church administration",
    category: "Office Equipment",
    purchaseDate: "2023-01-10",
    purchasePrice: 1200.0,
    currentValue: 900.0,
    condition: "excellent",
    location: "Church Office",
    serialNumber: "PC-2023-001",
    warrantyExpiry: "2026-01-10",
    notes: "Windows 11, Office Suite installed",
  },
  {
    id: 4,
    name: "Projector - Fellowship Hall",
    description: "HD projector for presentations and events",
    category: "Audio Visual",
    purchaseDate: "2020-06-12",
    purchasePrice: 2200.0,
    currentValue: 1100.0,
    condition: "fair",
    location: "Fellowship Hall",
    serialNumber: "PROJ-2020-001",
    warrantyExpiry: "2023-06-12",
    notes: "Warranty expired, needs bulb replacement soon",
  },
  {
    id: 5,
    name: "Kitchen Equipment Set",
    description: "Commercial kitchen appliances and equipment",
    category: "Kitchen Equipment",
    purchaseDate: "2019-11-05",
    purchasePrice: 12000.0,
    currentValue: 8000.0,
    condition: "good",
    location: "Church Kitchen",
    serialNumber: "KITCHEN-2019-001",
    warrantyExpiry: null,
    notes: "Includes refrigerator, stove, dishwasher",
  },
  {
    id: 6,
    name: "Piano - Sanctuary",
    description: "Upright piano for worship services",
    category: "Musical Instruments",
    purchaseDate: "2018-04-22",
    purchasePrice: 4500.0,
    currentValue: 3800.0,
    condition: "excellent",
    location: "Main Sanctuary",
    serialNumber: "PIANO-2018-001",
    warrantyExpiry: null,
    notes: "Tuned quarterly, excellent condition",
  },
]

const getConditionColor = (condition: string) => {
  switch (condition) {
    case "excellent":
      return "bg-green-100 text-green-800"
    case "good":
      return "bg-blue-100 text-blue-800"
    case "fair":
      return "bg-yellow-100 text-yellow-800"
    case "poor":
      return "bg-red-100 text-red-800"
    case "needs_repair":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function AssetsPage() {
  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0)
  const totalPurchaseValue = assets.reduce((sum, asset) => sum + asset.purchasePrice, 0)
  const categories = [...new Set(assets.map((asset) => asset.category))]

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
              <Link href="/assets" className="text-primary font-medium">
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
            <h1 className="font-serif font-black text-3xl text-gray-900 mb-2">Asset Management</h1>
            <p className="text-gray-600">Track and manage church property and equipment</p>
          </div>
          <Button asChild>
            <Link href="/assets/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Asset
            </Link>
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assets.length}</div>
              <p className="text-xs text-muted-foreground">Items tracked</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Estimated current value</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Purchase Value</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPurchaseValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Original purchase cost</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
              <p className="text-xs text-muted-foreground">Asset categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search assets..." className="pl-10" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Conditions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conditions</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                  <SelectItem value="needs_repair">Needs Repair</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Assets List */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif font-bold">Church Assets</CardTitle>
            <CardDescription>Complete inventory of church property and equipment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                      <Badge variant="outline">{asset.category}</Badge>
                      <Badge className={getConditionColor(asset.condition)}>{asset.condition}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{asset.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Purchased: {new Date(asset.purchaseDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {asset.location}
                      </span>
                      {asset.serialNumber && <span>• S/N: {asset.serialNumber}</span>}
                      {asset.warrantyExpiry && (
                        <span
                          className={new Date(asset.warrantyExpiry) > new Date() ? "text-green-600" : "text-red-600"}
                        >
                          • Warranty: {new Date(asset.warrantyExpiry).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    {asset.notes && <p className="text-sm text-gray-500 mt-1">Note: {asset.notes}</p>}
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-lg font-bold text-primary">${asset.currentValue.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Purchase: ${asset.purchasePrice.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">
                      {asset.currentValue < asset.purchasePrice ? "Depreciated" : "Appreciated"}:{" "}
                      {(((asset.currentValue - asset.purchasePrice) / asset.purchasePrice) * 100).toFixed(1)}%
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent" asChild>
                      <Link href={`/assets/${asset.id}`}>View Details</Link>
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

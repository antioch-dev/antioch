"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, ArrowLeft, Edit, Calendar, MapPin, Shield, FileText } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

// Define the props interface
interface AssetDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function AssetDetailPage({ params }: AssetDetailPageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)

  // Resolve the params promise
  useEffect(() => {
    async function resolveParams() {
      const resolved = await params
      setResolvedParams(resolved)
    }
    void resolveParams()
  }, [params])

  // Mock asset data - in a real app, you'd fetch this based on the ID
  const asset = {
    id: resolvedParams ? Number.parseInt(resolvedParams.id) : 1,
    name: "Sound System - Main Sanctuary",
    description:
      "Professional audio system with wireless microphones, mixing board, and speaker array for main sanctuary worship services",
    category: "Audio Equipment",
    purchaseDate: "2022-03-15",
    purchasePrice: 8500.0,
    currentValue: 7000.0,
    condition: "good",
    location: "Main Sanctuary",
    serialNumber: "AS-2022-001",
    warrantyExpiry: "2025-03-15",
    notes: "Under warranty until March 2025. Includes 4 wireless mics, 1 mixing board, 6 speakers",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    maintenanceHistory: [
      { date: "2024-01-15", description: "Quarterly maintenance check", cost: 150 },
      { date: "2023-10-20", description: "Replaced microphone batteries", cost: 45 },
      { date: "2023-07-12", description: "Software update for mixing board", cost: 0 },
    ],
  }

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

  const depreciationRate = ((asset.currentValue - asset.purchasePrice) / asset.purchasePrice) * 100

  // Show loading state while params are being resolved
  if (!resolvedParams) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
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
              <Link href="/fellowship1/church-finance/reports" className="text-gray-600 hover:text-primary font-medium">
                Reports
              </Link>
              <Link href="/fellowship1/church-finance/assets" className="text-primary font-medium">
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
              <Link href="/fellowship1/church-finance/assets">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Assets
              </Link>
            </Button>
            <div>
              <h1 className="font-serif font-black text-3xl text-gray-900">{asset.name}</h1>
              <p className="text-gray-600">Asset Details & Information</p>
            </div>
          </div>
          <Button asChild>
            <Link href={`/assets/${resolvedParams.id}/edit`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Asset
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Asset Images */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Asset Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {asset.images.map((image, index) => (
                    <div key={index} className="aspect-square">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${asset.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg border hover:shadow-lg transition-shadow cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description & Details */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Asset Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{asset.description}</p>
                </div>

                {asset.notes && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Additional Notes</h3>
                    <p className="text-gray-700">{asset.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Maintenance History */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Maintenance History</CardTitle>
                <CardDescription>Recent maintenance and service records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {asset.maintenanceHistory.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{record.description}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(record.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${record.cost.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Cost</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Value Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Asset Value</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-primary">${asset.currentValue.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Current Value</p>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-xl font-semibold text-gray-700">${asset.purchasePrice.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Purchase Price</p>
                </div>

                <div className="pt-4 border-t">
                  <div className={`text-lg font-semibold ${depreciationRate >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {depreciationRate >= 0 ? "+" : ""}
                    {depreciationRate.toFixed(1)}%
                  </div>
                  <p className="text-sm text-gray-600">{depreciationRate >= 0 ? "Appreciation" : "Depreciation"}</p>
                </div>
              </CardContent>
            </Card>

            {/* Asset Details */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Asset Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Category:</span>
                  <Badge variant="outline">{asset.category}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Condition:</span>
                  <Badge className={getConditionColor(asset.condition)}>{asset.condition}</Badge>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{asset.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Purchased:</span>
                  <span className="font-medium">{new Date(asset.purchaseDate).toLocaleDateString()}</span>
                </div>

                {asset.serialNumber && (
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Serial #:</span>
                    <span className="font-medium">{asset.serialNumber}</span>
                  </div>
                )}

                {asset.warrantyExpiry && (
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Warranty:</span>
                    <span
                      className={`font-medium ${new Date(asset.warrantyExpiry) > new Date() ? "text-green-600" : "text-red-600"}`}
                    >
                      {new Date(asset.warrantyExpiry).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
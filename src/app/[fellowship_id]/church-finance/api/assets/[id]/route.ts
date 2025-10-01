import { type NextRequest, NextResponse } from "next/server"

// Mock database - in production, replace with actual database calls
const assets = [
  {
    id: "1",
    name: "Sound System - Main Sanctuary",
    description: "Professional audio system with wireless microphones",
    category: "Audio Equipment",
    purchaseDate: "2022-03-15",
    purchasePrice: 8500,
    currentValue: 7000,
    condition: "good",
    location: "Main Sanctuary",
    serialNumber: "AS-2022-001",
    warrantyExpiry: "2025-03-15",
    notes: "Under warranty until March 2025",
    images: [],
  },
]

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    console.log("[v0] Asset update request:", data)

    const assetIndex = assets.findIndex((a) => a.id === params.id)

    if (assetIndex === -1) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 })
    }

    assets[assetIndex] = {
      ...assets[assetIndex],
      ...data,
      purchasePrice: Number.parseFloat(data.purchasePrice),
      currentValue: Number.parseFloat(data.currentValue),
    }

    console.log("[v0] Asset updated:", assets[assetIndex])

    return NextResponse.json(assets[assetIndex])
  } catch (error) {
    console.log("[v0] Asset update error:", error)
    return NextResponse.json({ error: "Failed to update asset" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const asset = assets.find((a) => a.id === params.id)

  if (!asset) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 })
  }

  return NextResponse.json(asset)
}

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

export async function GET() {
  return NextResponse.json(assets)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const newAsset = {
      id: (assets.length + 1).toString(),
      ...data,
      purchasePrice: Number.parseFloat(data.purchasePrice),
      currentValue: Number.parseFloat(data.currentValue),
    }

    assets.push(newAsset)

    return NextResponse.json(newAsset, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create asset" }, { status: 500 })
  }
}

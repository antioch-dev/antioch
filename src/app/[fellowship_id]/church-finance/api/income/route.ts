import { type NextRequest, NextResponse } from "next/server"

// Mock database - in production, replace with actual database calls
const incomeTransactions = [
  {
    id: "1",
    amount: 2500.0,
    source: "Tithes",
    category: "tithe",
    date: "2024-01-07",
    description: "Sunday morning service tithes",
    receivedBy: "Pastor Johnson",
  },
  {
    id: "2",
    amount: 850.0,
    source: "Special Offering",
    category: "offering",
    date: "2024-01-14",
    description: "Building fund special offering",
    receivedBy: "Treasurer Smith",
  },
]

export async function GET() {
  return NextResponse.json(incomeTransactions)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const newIncome = {
      id: (incomeTransactions.length + 1).toString(),
      ...data,
      amount: Number.parseFloat(data.amount),
    }

    incomeTransactions.push(newIncome)

    return NextResponse.json(newIncome, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create income transaction" }, { status: 500 })
  }
}

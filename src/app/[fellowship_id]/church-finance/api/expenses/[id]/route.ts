import { type NextRequest, NextResponse } from "next/server"

// Mock database - in production, replace with actual database calls
const expenseTransactions = [
  {
    id: "1",
    amount: 450.0,
    vendor: "City Electric Company",
    category: "utilities",
    date: "2024-01-05",
    description: "Monthly electricity bill",
    receiptNumber: "CE-2024-001",
    paymentMethod: "check",
  },
]

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const expenseIndex = expenseTransactions.findIndex((e) => e.id === params.id)

    if (expenseIndex === -1) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 })
    }

    expenseTransactions[expenseIndex] = {
      ...expenseTransactions[expenseIndex],
      ...data,
      amount: Number.parseFloat(data.amount),
    }

    return NextResponse.json(expenseTransactions[expenseIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update expense" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const expense = expenseTransactions.find((e) => e.id === params.id)

  if (!expense) {
    return NextResponse.json({ error: "Expense not found" }, { status: 404 })
  }

  return NextResponse.json(expense)
}

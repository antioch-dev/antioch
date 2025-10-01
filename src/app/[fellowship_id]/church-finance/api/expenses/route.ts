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
  {
    id: "2",
    amount: 125.0,
    vendor: "Office Supply Store",
    category: "office_supplies",
    date: "2024-01-10",
    description: "Paper, pens, and office materials",
    receiptNumber: "OS-2024-015",
    paymentMethod: "credit_card",
  },
]

export async function GET() {
  return NextResponse.json(expenseTransactions)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const newExpense = {
      id: (expenseTransactions.length + 1).toString(),
      ...data,
      amount: Number.parseFloat(data.amount),
    }

    expenseTransactions.push(newExpense)

    return NextResponse.json(newExpense, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create expense transaction" }, { status: 500 })
  }
}

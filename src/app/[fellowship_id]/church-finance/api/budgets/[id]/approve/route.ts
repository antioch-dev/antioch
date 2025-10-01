import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { approvedAmount, notes } = await request.json()

    // In a real app, this would update the database
    console.log(`[v0] Approving budget request ${params.id} with amount: ${approvedAmount}`)

    // Mock database update
    const updatedRequest = {
      id: params.id,
      status: "approved",
      approvedAmount: approvedAmount,
      approvalNotes: notes,
      approvedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      message: "Budget request approved successfully",
      data: updatedRequest,
    })
  } catch (error) {
    console.error("[v0] Error approving budget request:", error)
    return NextResponse.json({ success: false, message: "Failed to approve budget request" }, { status: 500 })
  }
}

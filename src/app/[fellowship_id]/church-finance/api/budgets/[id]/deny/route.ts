import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { reason } = await request.json()

    // In a real app, this would update the database
    console.log(`[v0] Denying budget request ${params.id} with reason: ${reason}`)

    // Mock database update
    const updatedRequest = {
      id: params.id,
      status: "denied",
      denialReason: reason,
      deniedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      message: "Budget request denied",
      data: updatedRequest,
    })
  } catch (error) {
    console.error("[v0] Error denying budget request:", error)
    return NextResponse.json({ success: false, message: "Failed to deny budget request" }, { status: 500 })
  }
}

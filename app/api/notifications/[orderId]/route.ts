import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { orderId: string } }) {
  try {
    const supabase = await createClient()

    // Get order status updates
    const { data: updates, error } = await supabase
      .from("order_status_updates")
      .select("*")
      .eq("order_id", params.orderId)
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) throw error

    return NextResponse.json({ updates })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}

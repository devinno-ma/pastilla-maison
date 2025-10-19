import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { orderId: string } }) {
  try {
    const supabase = await createClient()

    // Get order details
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", params.orderId)
      .single()

    if (orderError) throw orderError

    // Get order items
    const { data: orderItems, error: itemsError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", params.orderId)

    if (itemsError) throw itemsError

    // Get status updates
    const { data: updates, error: updatesError } = await supabase
      .from("order_status_updates")
      .select("*")
      .eq("order_id", params.orderId)
      .order("created_at", { ascending: false })

    if (updatesError) throw updatesError

    return NextResponse.json({
      order: { ...order, order_items: orderItems },
      updates,
    })
  } catch (error) {
    console.error("Error fetching order tracking:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

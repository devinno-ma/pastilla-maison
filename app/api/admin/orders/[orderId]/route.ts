import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    const supabase = await createClient()

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", params.orderId)
      .single()

    if (orderError) throw orderError

    const { data: orderItems, error: itemsError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", params.orderId)

    if (itemsError) throw itemsError

    return NextResponse.json({ order: { ...order, order_items: orderItems } })
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    const body = await request.json()
    const { status } = body

    const supabase = await createClient()

    const { data: order, error } = await supabase
      .from("orders")
      .update({ status, updated_at: new Date() })
      .eq("id", params.orderId)
      .select()
      .single()

    if (error) throw error

    // Create status update record
    await supabase.from("order_status_updates").insert({
      order_id: params.orderId,
      status,
      message: `Order status updated to ${status}`,
    })

    return NextResponse.json({ order })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}

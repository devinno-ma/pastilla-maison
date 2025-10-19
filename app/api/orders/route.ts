import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, total, customerName, customerEmail, customerPhone, deliveryAddress, notes } = body

    const supabase = await createClient()

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        total: total,
        status: "pending",
        customer_email: customerEmail,
        customer_name: customerName,
        customer_phone: customerPhone,
        delivery_address: deliveryAddress,
        notes: notes,
      })
      .select()
      .single()

    if (orderError) throw orderError

    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      dish_name: item.name,
      dish_price: item.price,
      quantity: item.quantity,
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) throw itemsError

    // Send confirmation email
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: customerEmail,
        subject: "Order Confirmation - Hanane's Pastilla Maison",
        orderId: order.id,
        customerName,
        items,
        total,
      }),
    })

    return NextResponse.json({ orderId: order.id, success: true })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

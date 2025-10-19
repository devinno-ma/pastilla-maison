import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { reservationDate, reservationTime, numGuests, customerName, customerEmail, customerPhone, notes } = body

    // Validate 48-hour notice
    const reservationDateTime = new Date(`${reservationDate}T${reservationTime}`)
    const now = new Date()
    const hoursUntilReservation = (reservationDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)

    if (hoursUntilReservation < 48) {
      return NextResponse.json({ error: "Reservations require 48 hours notice" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: reservation, error } = await supabase
      .from("reservations")
      .insert({
        reservation_date: reservationDate,
        reservation_time: reservationTime,
        party_size: numGuests,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        special_requests: notes,
        status: "pending",
      })
      .select()
      .single()

    if (error) throw error

    // Send confirmation email
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/send-reservation-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: customerEmail,
        customerName,
        reservationDate,
        reservationTime,
        numGuests,
      }),
    })

    return NextResponse.json({ reservationId: reservation.id, success: true })
  } catch (error) {
    console.error("Reservation creation error:", error)
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 })
  }
}

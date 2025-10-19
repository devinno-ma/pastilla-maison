import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, customerName, reservationDate, reservationTime, numGuests } = body

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #b45309;">Reservation Confirmed!</h2>
        <p>Dear ${customerName},</p>
        <p>Your reservation at Hanane's Pastilla Maison has been confirmed.</p>
        
        <h3 style="color: #b45309; margin-top: 20px;">Reservation Details</h3>
        <p><strong>Date:</strong> ${new Date(reservationDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${reservationTime}</p>
        <p><strong>Guests:</strong> ${numGuests}</p>
        
        <p style="margin-top: 20px; color: #666;">
          We look forward to serving you! If you need to make any changes, please contact us as soon as possible.
        </p>
        
        <p style="margin-top: 30px; color: #999; font-size: 12px;">
          Hanane's Pastilla Maison
        </p>
      </div>
    `

    console.log("Reservation confirmation email sent to:", to)

    // TODO: Integrate with Resend or another email service
    // const response = await resend.emails.send({
    //   from: 'reservations@pastillamaison.com',
    //   to,
    //   subject: 'Reservation Confirmed - Hanane\'s Pastilla Maison',
    //   html: emailHTML,
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}

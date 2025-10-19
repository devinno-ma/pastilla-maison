import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, customerEmail, customerName, message } = body

    // Email template
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #b45309;">Order Update</h2>
        <p>Dear ${customerName},</p>
        <p style="font-size: 16px; line-height: 1.6;">${message}</p>
        <p style="margin-top: 20px; color: #999; font-size: 12px;">
          Order ID: ${orderId}
        </p>
        <p style="margin-top: 20px; color: #999; font-size: 12px;">
          Hanane's Pastilla Maison
        </p>
      </div>
    `

    // Log the notification (in production, use Resend or similar)
    console.log("Notification sent to:", customerEmail)
    console.log("Message:", message)

    // TODO: Integrate with Resend or another email service
    // const response = await resend.emails.send({
    //   from: 'orders@pastillamaison.com',
    //   to: customerEmail,
    //   subject: 'Order Update - Hanane\'s Pastilla Maison',
    //   html: emailHTML,
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending notification:", error)
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, subject, orderId, customerName, items, total } = body

    // Email template
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #b45309;">Thank you for your order!</h2>
        <p>Dear ${customerName},</p>
        <p>Your order has been received and is being prepared.</p>
        
        <h3 style="color: #b45309; margin-top: 20px;">Order Details</h3>
        <p><strong>Order ID:</strong> ${orderId}</p>
        
        <h4>Items:</h4>
        <ul>
          ${items
            .map(
              (item: any) => `
            <li>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>
          `,
            )
            .join("")}
        </ul>
        
        <p style="margin-top: 20px;"><strong>Total: $${total.toFixed(2)}</strong></p>
        
        <p style="margin-top: 30px; color: #666;">
          We will notify you when your order is ready for pickup or delivery.
        </p>
        
        <p style="margin-top: 20px; color: #999; font-size: 12px;">
          Hanane's Pastilla Maison
        </p>
      </div>
    `

    // For now, just log the email (in production, use Resend or similar)
    console.log("Email sent to:", to)
    console.log("Subject:", subject)
    console.log("HTML:", emailHTML)

    // TODO: Integrate with Resend or another email service
    // const response = await resend.emails.send({
    //   from: 'orders@pastillamaison.com',
    //   to,
    //   subject,
    //   html: emailHTML,
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}

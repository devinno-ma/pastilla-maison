"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch order details from the database
    setLoading(false)
  }, [params.orderId])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Thank you for your order. A confirmation email has been sent to your email address.
          </p>
          <p className="text-sm text-muted-foreground">
            Order ID: <span className="font-mono font-semibold">{params.orderId}</span>
          </p>
          <p className="text-sm text-amber-700">We will notify you when your order is ready!</p>
          <div className="flex gap-4 pt-4">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                Back Home
              </Button>
            </Link>
            <Link href="/#menu" className="flex-1">
              <Button className="w-full bg-amber-700 hover:bg-amber-800">Continue Shopping</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Clock, Truck, AlertCircle } from "lucide-react"

interface OrderUpdate {
  id: string
  status: string
  message: string
  created_at: string
}

interface Order {
  id: string
  customer_name: string
  customer_email: string
  total_price: number
  status: string
  created_at: string
  order_items: any[]
}

export default function OrderTrackingPage({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [updates, setUpdates] = useState<OrderUpdate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrderDetails()
    const interval = setInterval(fetchOrderDetails, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [params.orderId])

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/order-tracking/${params.orderId}`)
      if (!response.ok) throw new Error("Failed to fetch order")
      const data = await response.json()
      setOrder(data.order)
      setUpdates(data.updates || [])
    } catch (error) {
      console.error("Error fetching order:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "preparing":
        return <Clock className="w-5 h-5 text-blue-600" />
      case "ready":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "completed":
        return <CheckCircle className="w-5 h-5 text-gray-600" />
      case "cancelled":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "preparing":
        return "bg-blue-100 text-blue-800"
      case "ready":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <p className="text-muted-foreground">Loading order details...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <p className="text-muted-foreground">Order not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Status */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Order #{order.id.slice(0, 8)}</CardTitle>
                    <CardDescription>{new Date(order.created_at).toLocaleString()}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Customer:</strong> {order.customer_name}
                </p>
                <p>
                  <strong>Email:</strong> {order.customer_email}
                </p>
                <p className="mt-4">
                  <strong>Total:</strong>{" "}
                  <span className="text-lg text-amber-700">${order.total_price.toFixed(2)}</span>
                </p>
              </CardContent>
            </Card>

            {/* Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {updates.length === 0 ? (
                    <p className="text-muted-foreground">No updates yet</p>
                  ) : (
                    updates.map((update, index) => (
                      <div key={update.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          {getStatusIcon(update.status)}
                          {index < updates.length - 1 && <div className="w-0.5 h-12 bg-gray-200 mt-2" />}
                        </div>
                        <div className="pb-4">
                          <p className="font-semibold capitalize">{update.status}</p>
                          <p className="text-sm text-muted-foreground">{update.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{new Date(update.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.order_items?.map((item) => (
                    <div key={item.id} className="flex justify-between items-center pb-3 border-b last:border-0">
                      <div>
                        <p className="font-semibold">Dish #{item.dish_id.slice(0, 8)}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status Card */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  Current Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-700 capitalize">{order.status}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {order.status === "pending" && "Your order is being confirmed"}
                    {order.status === "preparing" && "Your order is being prepared"}
                    {order.status === "ready" && "Your order is ready for pickup!"}
                    {order.status === "completed" && "Thank you for your order!"}
                    {order.status === "cancelled" && "Your order has been cancelled"}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-3">
                    We'll notify you via email when your order status changes.
                  </p>
                  <Button className="w-full bg-amber-700 hover:bg-amber-800">
                    <Truck className="w-4 h-4 mr-2" />
                    Track Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

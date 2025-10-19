"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"

interface OrderItem {
  id: string
  dish_id: string
  quantity: number
  price: number
}

interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  delivery_address: string
  total_price: number
  status: string
  notes: string
  created_at: string
  order_items: OrderItem[]
}

export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (!auth) {
      router.push("/admin/login")
      return
    }
    fetchOrder()
  }, [params.orderId, router])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/admin/orders/${params.orderId}`)
      if (!response.ok) throw new Error("Failed to fetch order")
      const data = await response.json()
      setOrder(data.order)
    } catch (error) {
      console.error("Error fetching order:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (newStatus: string) => {
    if (!order) return
    setUpdating(true)

    try {
      const response = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error("Failed to update order")
      const data = await response.json()
      setOrder(data.order)
    } catch (error) {
      console.error("Error updating order:", error)
    } finally {
      setUpdating(false)
    }
  }

  const sendNotification = async () => {
    if (!order || !notificationMessage) return
    setUpdating(true)

    try {
      const response = await fetch(`/api/admin/send-notification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          customerEmail: order.customer_email,
          customerName: order.customer_name,
          message: notificationMessage,
        }),
      })

      if (!response.ok) throw new Error("Failed to send notification")
      setNotificationMessage("")
      alert("Notification sent successfully!")
    } catch (error) {
      console.error("Error sending notification:", error)
      alert("Failed to send notification")
    } finally {
      setUpdating(false)
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
        <p className="text-muted-foreground">Loading order...</p>
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
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
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
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <p>
                    <strong>Name:</strong> {order.customer_name}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.customer_email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.customer_phone}
                  </p>
                  {order.delivery_address && (
                    <p>
                      <strong>Address:</strong> {order.delivery_address}
                    </p>
                  )}
                </div>

                {order.notes && (
                  <div>
                    <h3 className="font-semibold mb-2">Special Notes</h3>
                    <p className="text-muted-foreground">{order.notes}</p>
                  </div>
                )}
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
                  <div className="pt-3 border-t-2 flex justify-between items-center">
                    <p className="font-bold">Total:</p>
                    <p className="font-bold text-lg text-amber-700">${order.total_price.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Send Notification */}
            <Card>
              <CardHeader>
                <CardTitle>Send Notification</CardTitle>
                <CardDescription>Update customer about order status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <textarea
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  placeholder="e.g., Your order is ready for pickup! or We need 30 more minutes..."
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  rows={4}
                />
                <Button
                  onClick={sendNotification}
                  disabled={updating || !notificationMessage}
                  className="w-full bg-amber-700 hover:bg-amber-800 gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Notification
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Status Management */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Update Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {["pending", "preparing", "ready", "completed", "cancelled"].map((status) => (
                  <Button
                    key={status}
                    onClick={() => updateOrderStatus(status)}
                    disabled={updating || order.status === status}
                    variant={order.status === status ? "default" : "outline"}
                    className="w-full capitalize"
                  >
                    {status}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

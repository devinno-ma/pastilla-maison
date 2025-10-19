"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart()
  const router = useRouter()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (items.length === 0) {
      setError("Your cart is empty")
      return
    }

    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in all required fields")
      return
    }

    setIsCheckingOut(true)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          total,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          deliveryAddress: formData.address,
          notes: formData.notes,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      const data = await response.json()
      setSuccess(true)
      clearCart()
      setTimeout(() => {
        router.push(`/order-confirmation/${data.orderId}`)
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-600">Order Confirmed!</CardTitle>
            <CardDescription>Check your email for confirmation details</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">Redirecting to order details...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/#menu" className="flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Menu
        </Link>

        <h1 className="text-4xl font-bold text-amber-900 mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {items.length === 0 ? (
              <Card>
                <CardContent className="pt-8 text-center">
                  <p className="text-muted-foreground mb-4">Your cart is empty</p>
                  <Link href="/#menu">
                    <Button>Continue Shopping</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.dishId}>
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        {item.image_url && (
                          <img
                            src={item.image_url || "/placeholder.svg"}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-amber-700 font-semibold">${item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.dishId, item.quantity - 1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.dishId, item.quantity + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.dishId)}
                              className="ml-auto text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Form */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span className="text-amber-700">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                  </div>

                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleInputChange} />
                  </div>

                  <div>
                    <Label htmlFor="notes">Special Notes</Label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      rows={3}
                      placeholder="Any special requests?"
                    />
                  </div>

                  {error && <p className="text-red-600 text-sm">{error}</p>}

                  <Button
                    type="submit"
                    className="w-full bg-amber-700 hover:bg-amber-800"
                    disabled={isCheckingOut || items.length === 0}
                  >
                    {isCheckingOut ? "Processing..." : "Place Order"}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  We take small orders! For large orders (10+ items), please call us.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

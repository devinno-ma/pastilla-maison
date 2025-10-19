"use client"

import { useEffect, useState } from "react"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  message: string
  type: "info" | "success" | "warning" | "error"
  timestamp: Date
}

export function OrderNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check for new notifications every 30 seconds
    const interval = setInterval(checkForNotifications, 30000)
    checkForNotifications() // Check immediately on mount

    return () => clearInterval(interval)
  }, [])

  const checkForNotifications = async () => {
    try {
      const orderId = localStorage.getItem("lastOrderId")
      if (!orderId) return

      const response = await fetch(`/api/notifications/${orderId}`)
      if (!response.ok) return

      const data = await response.json()
      if (data.updates && data.updates.length > 0) {
        const newNotifications = data.updates.map((update: any) => ({
          id: update.id,
          message: update.message,
          type: getNotificationType(update.status),
          timestamp: new Date(update.created_at),
        }))

        setNotifications((prev) => [...newNotifications, ...prev].slice(0, 10))
      }
    } catch (error) {
      console.error("Error checking notifications:", error)
    }
  }

  const getNotificationType = (status: string) => {
    switch (status) {
      case "ready":
        return "success"
      case "preparing":
        return "info"
      case "cancelled":
        return "error"
      default:
        return "info"
    }
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      default:
        return "bg-blue-50 border-blue-200 text-blue-800"
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Notification Bell */}
      <div className="relative">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative bg-white">
          <Bell className="w-5 h-5" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </Button>
      </div>

      {/* Notifications Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Order Updates</h3>
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No notifications yet</div>
          ) : (
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-4 border-l-4 ${getNotificationColor(notification.type)}`}>
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-sm">{notification.message}</p>
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{notification.timestamp.toLocaleTimeString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"

export default function ReservationCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // Calculate minimum date (48 hours from now)
  const getMinimumDate = () => {
    const now = new Date()
    now.setHours(now.getHours() + 48)
    return now
  }

  const minimumDate = getMinimumDate()

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)
    return checkDate < minimumDate
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleDateClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    if (!isDateDisabled(date)) {
      setSelectedDate(date)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!selectedDate || !selectedTime) {
      setError("Please select a date and time")
      return
    }

    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reservationDate: selectedDate.toISOString().split("T")[0],
          reservationTime: selectedTime,
          numGuests: Number.parseInt(formData.guests),
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          notes: formData.notes,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create reservation")
      }

      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setSelectedDate(null)
        setSelectedTime("")
        setFormData({ name: "", email: "", phone: "", guests: "2", notes: "" })
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = []

  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
          <CardDescription>Minimum 48 hours notice required</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h3 className="font-semibold">{monthName}</h3>
              <Button variant="outline" size="sm" onClick={handleNextMonth}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => {
                const date = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null
                const isDisabled = date ? isDateDisabled(date) : true
                const isSelected = date && selectedDate && date.toDateString() === selectedDate.toDateString()

                return (
                  <button
                    key={index}
                    onClick={() => day && handleDateClick(day)}
                    disabled={isDisabled}
                    className={`
                      aspect-square rounded-lg text-sm font-medium transition-colors
                      ${!day ? "invisible" : ""}
                      ${isDisabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
                      ${isSelected ? "bg-amber-700 text-white" : ""}
                      ${!isDisabled && !isSelected ? "bg-amber-50 text-amber-900 hover:bg-amber-100" : ""}
                    `}
                  >
                    {day}
                  </button>
                )
              })}
            </div>

            {selectedDate && (
              <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                <p className="text-sm font-semibold text-amber-900">
                  Selected:{" "}
                  {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Reservation Form */}
      <Card>
        <CardHeader>
          <CardTitle>Reservation Details</CardTitle>
          <CardDescription>Complete your reservation</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Time Selection */}
            <div>
              <Label htmlFor="time">Time *</Label>
              <select
                id="time"
                name="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm"
                required
              >
                <option value="">Select a time</option>
                {[
                  "11:00",
                  "11:30",
                  "12:00",
                  "12:30",
                  "13:00",
                  "13:30",
                  "14:00",
                  "18:00",
                  "18:30",
                  "19:00",
                  "19:30",
                  "20:00",
                  "20:30",
                  "21:00",
                ].map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Number of Guests */}
            <div>
              <Label htmlFor="guests">Number of Guests *</Label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md text-sm"
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            {/* Email */}
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

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Special Requests</Label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md text-sm"
                rows={3}
                placeholder="Any dietary restrictions or special requests?"
              />
            </div>

            {/* Alert */}
            <div className="flex gap-2 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                For large group reservations (10+ guests), please call us directly for availability.
              </p>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            {success && <p className="text-green-600 text-sm">Reservation confirmed! Check your email for details.</p>}

            <Button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800"
              disabled={isSubmitting || !selectedDate || !selectedTime}
            >
              {isSubmitting ? "Booking..." : "Confirm Reservation"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

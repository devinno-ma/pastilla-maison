import ReservationCalendar from "@/components/reservation-calendar"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ReservationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back Home
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Make a Reservation</h1>
          <p className="text-muted-foreground text-lg">
            Book a table at Hanane's Pastilla Maison. We require a minimum of 48 hours notice for all reservations.
          </p>
        </div>

        <ReservationCalendar />
      </div>
    </div>
  )
}

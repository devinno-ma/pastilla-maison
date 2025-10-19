"use client"

import { useState } from "react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { ShoppingCart } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useCart()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">HP</span>
          </div>
          <h1 className="text-2xl font-bold text-amber-900 font-serif">Hanane's Pastilla</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-amber-900 hover:text-amber-700 font-semibold transition"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-amber-900 hover:text-amber-700 font-semibold transition"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("carousel")}
            className="text-amber-900 hover:text-amber-700 font-semibold transition"
          >
            Specialties
          </button>
          <button
            onClick={() => scrollToSection("menu")}
            className="text-amber-900 hover:text-amber-700 font-semibold transition"
          >
            Menu
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="text-amber-900 hover:text-amber-700 font-semibold transition"
          >
            Reviews
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-amber-900 hover:text-amber-700 font-semibold transition"
          >
            Contact
          </button>
          <Link href="/reservations" className="text-amber-900 hover:text-amber-700 font-semibold transition">
            Reservations
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-amber-900 hover:text-amber-700" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          <Link href="/admin/login" className="text-amber-900 hover:text-amber-700 font-semibold transition text-sm">
            Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        >
          <div className={`w-6 h-0.5 bg-amber-900 transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-amber-900 transition-opacity ${isOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-amber-900 transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-amber-50 border-t border-amber-200">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-amber-900 hover:text-amber-700 font-semibold transition text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-amber-900 hover:text-amber-700 font-semibold transition text-left"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("carousel")}
              className="text-amber-900 hover:text-amber-700 font-semibold transition text-left"
            >
              Specialties
            </button>
            <button
              onClick={() => scrollToSection("menu")}
              className="text-amber-900 hover:text-amber-700 font-semibold transition text-left"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-amber-900 hover:text-amber-700 font-semibold transition text-left"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-amber-900 hover:text-amber-700 font-semibold transition text-left"
            >
              Contact
            </button>
            <Link
              href="/reservations"
              className="text-amber-900 hover:text-amber-700 font-semibold transition text-left"
            >
              Reservations
            </Link>
            <Link href="/cart" className="text-amber-900 hover:text-amber-700 font-semibold transition text-left">
              Cart ({items.length})
            </Link>
            <Link
              href="/admin/login"
              className="text-amber-900 hover:text-amber-700 font-semibold transition text-left"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

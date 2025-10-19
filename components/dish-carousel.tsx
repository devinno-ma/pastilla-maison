"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"

interface Dish {
  id: number
  name: string
  description: string
  price: string
  image: string
}

const dishes: Dish[] = [
  {
    id: 1,
    name: "Pastilla au Poulet",
    description: "Crispy pastry filled with tender chicken, almonds, and warm spices. A classic Moroccan favorite.",
    price: "$12",
    image: "/moroccan-chicken-pastilla-crispy-golden.jpg",
  },
  {
    id: 2,
    name: "Pastilla aux Fruits de Mer",
    description: "Delicate seafood pastilla with shrimp, fish, and aromatic herbs. A taste of the Mediterranean.",
    price: "$15",
    image: "/seafood-pastilla-shrimp-fish-moroccan.jpg",
  },
  {
    id: 3,
    name: "Mini Pastillas",
    description: "Perfect for events and celebrations. Bite-sized pastillas with your choice of filling.",
    price: "$8",
    image: "/mini-pastillas-bite-sized-moroccan-appetizers.jpg",
  },
  {
    id: 4,
    name: "Vegetarian Pastilla",
    description: "A delightful blend of vegetables, herbs, and cheese wrapped in crispy phyllo dough.",
    price: "$10",
    image: "/vegetarian-pastilla-vegetables-herbs-moroccan.jpg",
  },
]

export default function DishCarousel() {
  const [theta, setTheta] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentTheta, setCurrentTheta] = useState(0)
  const [flipped, setFlipped] = useState<{ [key: number]: boolean }>({})
  const carouselRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { addItem } = useCart()

  const totalCards = dishes.length
  const anglePerCard = 360 / totalCards
  const radius = 400

  const currentIndex = Math.round(Math.abs(theta / anglePerCard) % totalCards)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX)
    setCurrentTheta(theta)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const diffX = e.pageX - startX
    const sensitivity = 0.5
    setTheta(currentTheta + diffX * sensitivity)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)

    // Snap to nearest card
    const snapAngle = Math.round(theta / anglePerCard) * anglePerCard
    setTheta(snapAngle)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX)
    setCurrentTheta(theta)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const diffX = e.touches[0].pageX - startX
    const sensitivity = 0.5
    setTheta(currentTheta + diffX * sensitivity)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    const snapAngle = Math.round(theta / anglePerCard) * anglePerCard
    setTheta(snapAngle)
  }

  const nextCard = () => {
    setTheta((prev) => {
      const snapAngle = Math.round(prev / anglePerCard) * anglePerCard
      return snapAngle - anglePerCard
    })
  }

  const prevCard = () => {
    setTheta((prev) => {
      const snapAngle = Math.round(prev / anglePerCard) * anglePerCard
      return snapAngle + anglePerCard
    })
  }

  const toggleFlip = (dishId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setFlipped((prev) => ({
      ...prev,
      [dishId]: !prev[dishId],
    }))
  }

  const handleOrder = (dish: Dish, e: React.MouseEvent) => {
    e.stopPropagation()
    const priceNumber = Number.parseFloat(dish.price.replace("$", ""))
    addItem({
      dishId: dish.id.toString(),
      name: dish.name,
      price: priceNumber,
      quantity: 1,
      image_url: dish.image,
    })
    router.push("/cart")
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove as any)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchmove", handleTouchMove as any)
      document.addEventListener("touchend", handleTouchEnd)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove as any)
        document.removeEventListener("mouseup", handleMouseUp)
        document.removeEventListener("touchmove", handleTouchMove as any)
        document.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [isDragging, theta, startX, currentTheta])

  return (
    <div className="flex flex-col items-center gap-12">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative w-full h-96 carousel-container"
        style={{ perspective: "1000px" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Carousel */}
        <div
          className="relative w-96 h-96 mx-auto"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${isDragging ? theta : theta}deg)`,
            transition: isDragging ? "none" : "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
        >
          {dishes.map((dish, index) => {
            const angle = anglePerCard * index
            const isFlipped = flipped[dish.id]

            return (
              <div
                key={dish.id}
                className="absolute w-72 h-96 left-1/2 top-1/2 -ml-36 -mt-48"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                }}
              >
                <div
                  className="w-full h-full relative cursor-pointer"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition: "transform 0.6s ease-in-out",
                  }}
                  onClick={(e) => toggleFlip(dish.id, e)}
                >
                  {/* Front of card */}
                  <div
                    className="absolute w-full h-full bg-white rounded-2xl border-2 border-amber-200 shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow p-6 flex flex-col"
                    style={{
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {/* Image */}
                    <div className="w-full h-40 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
                      <img
                        src={dish.image || "/placeholder.svg"}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold text-amber-900 mb-2 font-serif">{dish.name}</h3>

                    {/* Description */}
                    <p className="text-amber-800 text-sm leading-relaxed mb-3 flex-grow">{dish.description}</p>

                    {/* Price & Button */}
                    <div className="text-center">
                      <p className="text-2xl font-bold text-amber-700 mb-2">{dish.price}</p>
                      <button
                        onClick={(e) => handleOrder(dish, e)}
                        className="w-full px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition font-semibold text-sm"
                      >
                        Order
                      </button>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className="absolute w-full h-full bg-gradient-to-br from-amber-700 to-orange-700 rounded-2xl border-2 border-amber-800 shadow-2xl overflow-hidden p-6 flex flex-col items-center justify-center text-white"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="text-center">
                      <p className="text-sm mb-2 opacity-90">Click to flip back</p>
                      <p className="text-lg font-semibold mb-4">Ingredients & Details</p>
                      <ul className="text-sm space-y-2 text-left">
                        <li>✓ Authentic Moroccan recipe</li>
                        <li>✓ Fresh ingredients daily</li>
                        <li>✓ Handmade with love</li>
                        <li>✓ No preservatives</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-6 items-center">
        <button
          onClick={prevCard}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 transition flex items-center justify-center shadow-lg font-bold text-lg"
        >
          ←
        </button>
        <div className="flex gap-2">
          {dishes.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-amber-700" : "w-2 bg-amber-300"
              }`}
            />
          ))}
        </div>
        <button
          onClick={nextCard}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 transition flex items-center justify-center shadow-lg font-bold text-lg"
        >
          →
        </button>
      </div>

      {/* Info */}
      <div className="text-center">
        <p className="text-amber-700 font-semibold">
          {currentIndex + 1} of {totalCards}
        </p>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

interface Dish {
  id: number
  name: string
  description: string
  price: string
  image: string
  ingredients: string[]
  servings: string
}

const allDishes: Dish[] = [
  {
    id: 1,
    name: "Pastilla au Poulet",
    description: "Crispy pastry filled with tender chicken, almonds, and warm spices. A classic Moroccan favorite.",
    price: "$12",
    image: "/moroccan-chicken-pastilla-crispy-golden.jpg",
    ingredients: ["Chicken", "Almonds", "Phyllo dough", "Moroccan spices", "Eggs"],
    servings: "1-2 people",
  },
  {
    id: 2,
    name: "Pastilla aux Fruits de Mer",
    description: "Delicate seafood pastilla with shrimp, fish, and aromatic herbs. A taste of the Mediterranean.",
    price: "$15",
    image: "/seafood-pastilla-shrimp-fish-moroccan.jpg",
    ingredients: ["Shrimp", "Fish", "Herbs", "Phyllo dough", "Saffron"],
    servings: "1-2 people",
  },
  {
    id: 3,
    name: "Mini Pastillas",
    description: "Perfect for events and celebrations. Bite-sized pastillas with your choice of filling.",
    price: "$8",
    image: "/mini-pastillas-bite-sized-moroccan-appetizers.jpg",
    ingredients: ["Choice of filling", "Phyllo dough", "Spices"],
    servings: "4-6 pieces",
  },
  {
    id: 4,
    name: "Vegetarian Pastilla",
    description: "A delightful blend of vegetables, herbs, and cheese wrapped in crispy phyllo dough.",
    price: "$10",
    image: "/vegetarian-pastilla-vegetables-herbs-moroccan.jpg",
    ingredients: ["Mixed vegetables", "Cheese", "Herbs", "Phyllo dough"],
    servings: "1-2 people",
  },
]

export default function DishesMenu() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<{ [key: number]: number }>({})

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const addToCart = (id: number) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }))
  }

  const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0)

  return (
    <section id="menu" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-amber-900 mb-4 text-center font-serif">Full Menu</h2>
        <p className="text-center text-amber-700 mb-12 text-lg">Discover all our delicious pastilla creations</p>

        {/* Cart Summary */}
        {totalItems > 0 && (
          <div className="mb-8 p-4 bg-amber-50 rounded-lg border border-amber-200 flex items-center justify-between">
            <p className="text-amber-900 font-semibold">
              {totalItems} item{totalItems !== 1 ? "s" : ""} in cart
            </p>
            <button className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition font-semibold">
              View Cart
            </button>
          </div>
        )}

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-xl border-2 border-amber-100 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
                <img
                  src={dish.image || "/placeholder.svg"}
                  alt={dish.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(dish.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition"
                >
                  <Heart
                    size={20}
                    className={favorites.includes(dish.id) ? "fill-red-500 text-red-500" : "text-gray-400"}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-amber-900 mb-2 font-serif">{dish.name}</h3>
                <p className="text-sm text-amber-700 mb-3 line-clamp-2">{dish.description}</p>

                {/* Ingredients */}
                <div className="mb-3">
                  <p className="text-xs font-semibold text-amber-800 mb-1">Ingredients:</p>
                  <p className="text-xs text-amber-700">{dish.ingredients.join(", ")}</p>
                </div>

                {/* Servings */}
                <p className="text-xs text-amber-700 mb-3">
                  <span className="font-semibold">Servings:</span> {dish.servings}
                </p>

                {/* Price & Actions */}
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-amber-700">{dish.price}</p>
                  <button
                    onClick={() => addToCart(dish.id)}
                    className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition font-semibold text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

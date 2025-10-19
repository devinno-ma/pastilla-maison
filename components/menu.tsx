"use client"

import DishCarousel from "./dish-carousel"

export default function Menu() {
  return (
    <section id="carousel" className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-amber-900 mb-4 text-center font-serif">Our Specialties</h2>
        <p className="text-center text-amber-700 mb-12 text-lg">Explore our signature pastilla creations</p>
        <DishCarousel />
      </div>
    </section>
  )
}

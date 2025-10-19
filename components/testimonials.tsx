export default function Testimonials() {
  const testimonials = [
    {
      name: "Fatima",
      text: "The best pastilla I've ever had — crispy, flavorful, and made with love! Hanane is a true artist.",
      role: "Food Enthusiast",
    },
    {
      name: "Mohammed",
      text: "Authentic Moroccan flavors that transport you straight to Marrakech. Highly recommended!",
      role: "Regular Customer",
    },
    {
      name: "Aisha",
      text: "Perfect for our family gathering. Everyone loved it. We'll definitely order again!",
      role: "Event Organizer",
    },
  ]

  return (
    <section id="testimonials" className="py-20 px-4 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-amber-900 mb-12 text-center font-serif">What Our Customers Say</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl border-2 border-amber-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-amber-900 mb-6 italic leading-relaxed">"{testimonial.text}"</p>

              {/* Author */}
              <div className="border-t border-amber-200 pt-4">
                <p className="font-bold text-amber-900">{testimonial.name}</p>
                <p className="text-sm text-amber-700">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

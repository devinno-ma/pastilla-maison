export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-amber-900 mb-12 text-center font-serif">About Hanane</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img
              src="/moroccan-kitchen-pastilla-preparation-traditional.jpg"
              alt="Hanane preparing pastilla"
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-lg border border-amber-200">
              <p className="text-lg text-amber-900 leading-relaxed mb-6">
                Welcome to Hanane's Pastilla Maison, where tradition meets passion. For years, Hanane has been
                perfecting the art of making authentic Moroccan pastilla—a delicate, crispy pastry filled with savory
                and sweet flavors that tell the story of Morocco.
              </p>
              <p className="text-lg text-amber-900 leading-relaxed mb-6">
                Each pastilla is handcrafted with the finest ingredients and prepared with love for families,
                celebrations, and special moments. Through social media, Hanane shares her culinary passion with the
                world, bringing the warmth of Moroccan hospitality to your table.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="text-center flex-1">
                  <p className="text-3xl font-bold text-amber-700">10+</p>
                  <p className="text-amber-700 text-sm">Years Experience</p>
                </div>
                <div className="text-center flex-1">
                  <p className="text-3xl font-bold text-amber-700">500+</p>
                  <p className="text-amber-700 text-sm">Happy Customers</p>
                </div>
                <div className="text-center flex-1">
                  <p className="text-3xl font-bold text-amber-700">100%</p>
                  <p className="text-amber-700 text-sm">Handmade</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?key=uxrm0')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-orange-900/70 to-amber-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <div className="mb-6 inline-block">
          <span className="text-amber-300 text-lg font-semibold tracking-widest">AUTHENTIC MOROCCAN CUISINE</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 font-serif leading-tight">
          Hanane's Pastilla Maison
        </h1>

        <p className="text-3xl md:text-4xl text-amber-200 mb-6 font-light italic">M9ada b Lhob ❤️</p>

        <p className="text-xl text-amber-100 mb-12 max-w-2xl mx-auto leading-relaxed">
          Handcrafted Moroccan pastilla made fresh daily with the finest ingredients and generations of tradition. Every
          bite tells a story of love and culinary excellence.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => scrollToSection("menu")}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Order Now
          </button>
          <button
            onClick={() => scrollToSection("carousel")}
            className="px-8 py-4 border-2 border-amber-300 text-amber-100 rounded-lg hover:bg-amber-900/50 transition font-bold text-lg backdrop-blur-sm"
          >
            Explore Menu
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

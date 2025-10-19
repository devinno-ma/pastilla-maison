import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-amber-900 mb-2 text-center font-serif">Get in Touch</h2>
        <p className="text-center text-amber-700 mb-12 text-lg">We'd love to hear from you. Reach out to us today.</p>

        <div className="bg-white p-8 rounded-xl border border-amber-200 shadow-lg">
          {/* Contact Information Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Location */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="text-amber-900 font-bold text-lg mb-2">Location</h3>
              <p className="text-amber-700">Marrakech, Morocco</p>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="text-amber-900 font-bold text-lg mb-2">Phone</h3>
              <a href="tel:+212612345678" className="text-amber-600 hover:text-amber-800 font-semibold">
                +212 6 12 34 56 78
              </a>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="text-amber-900 font-bold text-lg mb-2">Email</h3>
              <a href="mailto:info@pastillamaison.com" className="text-amber-600 hover:text-amber-800 font-semibold">
                info@pastillamaison.com
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-amber-200 pt-8">
            <p className="text-center text-amber-900 font-semibold mb-6">Follow Us</p>
            <div className="flex justify-center gap-6">
              <a
                href="https://facebook.com/pastillamaison"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6 text-amber-700" />
              </a>
              <a
                href="https://instagram.com/pastillamaison"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 text-amber-700" />
              </a>
              <a
                href="https://twitter.com/pastillamaison"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6 text-amber-700" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

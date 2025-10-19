export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-amber-900 to-orange-900 text-amber-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-3">Hanane's Pastilla</h3>
            <p className="text-amber-100 text-sm">Authentic Moroccan pastilla made with love and tradition.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="text-amber-100 text-sm space-y-2">
              <li>
                <a href="#" className="hover:text-white transition">
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Hours</h3>
            <p className="text-amber-100 text-sm">Mon - Fri: 10am - 8pm</p>
            <p className="text-amber-100 text-sm">Sat - Sun: 12pm - 9pm</p>
          </div>
        </div>

        <div className="border-t border-amber-800 pt-8 text-center">
          <p className="mb-2">© 2025 Hanane's Pastilla Maison. All rights reserved.</p>
          <p className="text-sm text-amber-200">Made with ❤️ in Marrakech, Morocco</p>
        </div>
      </div>
    </footer>
  )
}

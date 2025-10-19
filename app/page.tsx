import Hero from "@/components/hero"
import About from "@/components/about"
import Menu from "@/components/menu"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Header from "@/components/header"
import DishesMenu from "@/components/dishes-menu"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Menu />
      <DishesMenu />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}


import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import PortfolioSection from './components/PortfolioSection'
import TestimonialsSection from './components/TestimonialsSection'
import TeamSection from './components/TeamSection'
import BookingSection from './components/BookingSection'
import PricingSection from './components/PricingSection'
import ContactSection from './components/ContactSection'
import FloatingCTA from './components/FloatingCTA'

function App() {
  return (
    <div className="bg-ivory overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <TeamSection />
      <PricingSection />
      <BookingSection />
      <ContactSection />
      <FloatingCTA />
    </div>
  )
}

export default App

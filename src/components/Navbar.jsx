import { useState, useEffect } from 'react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    const sections = ['hero', 'about', 'services', 'portfolio', 'team', 'pricing', 'booking-section', 'contact']
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'team', label: 'Team' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact' },
    { id: 'booking-section', label: 'Book Now' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className={`font-playfair text-3xl font-bold transition-colors hover:text-blush ${isScrolled ? 'text-velvet' : 'text-white'
                }`}
            >
              LUXURY STUDIO
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.id
                const isBookNow = item.label === 'Book Now'

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`font-poppins font-medium text-lg transition-all duration-300 relative ${isBookNow
                        ? 'bg-gradient-to-r from-blush to-accent-pink text-white px-4 py-2 rounded-full hover:shadow-lg hover:text-white'
                        : `hover:text-blush ${isActive
                          ? 'text-blush font-semibold'
                          : isScrolled ? 'text-velvet' : 'text-white'
                        }`
                      }`}
                  >
                    {item.label}
                    {/* Active indicator */}
                    {isActive && !isBookNow && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blush to-accent-pink rounded-full"></div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors ${isScrolled ? 'text-velvet' : 'text-white'
                }`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
              {navItems.map((item) => {
                const isActive = activeSection === item.id
                const isBookNow = item.label === 'Book Now'

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md font-poppins font-medium text-lg transition-colors ${isBookNow
                        ? 'bg-gradient-to-r from-blush to-accent-pink text-white hover:text-white'
                        : `text-velvet hover:text-blush hover:bg-blush/10 ${isActive ? 'text-blush bg-blush/10 font-semibold' : ''
                        }`
                      }`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
import { useState, useEffect } from 'react'

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300
      setIsVisible(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section')
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
      {/* Main CTA Button */}
      <div className="relative">
        <button
          onClick={scrollToBooking}
          className="group bg-gradient-to-r from-blush to-champagne text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse hover:animate-none"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className={`font-poppins font-semibold whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0 overflow-hidden'
              }`}>
              Book Now
            </span>
          </div>

          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </button>

        {/* Floating Ring Animation */}
        <div className="absolute inset-0 rounded-full border-2 border-champagne/50 animate-ping"></div>
      </div>

      {/* Quick Contact Options */}
      <div className={`absolute bottom-16 right-0 space-y-3 transition-all duration-500 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
        {/* WhatsApp */}
        <a
          href="https://wa.me/15551234567"
          className="group flex items-center bg-green-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106" />
          </svg>
          <span className="ml-2 font-poppins text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            WhatsApp
          </span>
        </a>

        {/* Call */}
        <a
          href="tel:+15551234567"
          className="group flex items-center bg-blue-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span className="ml-2 font-poppins text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Call Now
          </span>
        </a>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="absolute -top-2 -left-2 w-16 h-16">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-white/20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-champagne"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray={`${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
      </div>
    </div>
  )
}

export default FloatingCTA
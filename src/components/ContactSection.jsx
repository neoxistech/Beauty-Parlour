import { useState, useEffect, useRef } from 'react'

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      ),
      title: "Call Us",
      info: "+1 (555) 123-4567",
      action: "tel:+15551234567",
      description: "Available Mon-Sat, 9AM-7PM"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106" />
        </svg>
      ),
      title: "WhatsApp",
      info: "+1 (555) 123-4567",
      action: "https://wa.me/15551234567",
      description: "Quick responses, 24/7"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      title: "Email",
      info: "hello@luxestudio.com",
      action: "mailto:hello@luxestudio.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      title: "Visit Us",
      info: "123 Beauty Lane, Luxury District",
      action: "https://maps.google.com/?q=123+Beauty+Lane+Luxury+District",
      description: "Open Mon-Sat, 9AM-7PM"
    }
  ]

  const socialLinks = [
    {
      name: "Instagram",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      url: "https://instagram.com/luxestudio",
      handle: "@luxestudio"
    },
    {
      name: "Facebook",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      url: "https://facebook.com/luxestudio",
      handle: "LUXURY STUDIO"
    },
    {
      name: "Pinterest",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
        </svg>
      ),
      url: "https://pinterest.com/luxestudio",
      handle: "LUXURY STUDIO"
    },
    {
      name: "YouTube",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      url: "https://youtube.com/@luxestudio",
      handle: "LUXURY STUDIO"
    }
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-white  via-pink-300 to-pink-400 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, #EFB8C8 2px, transparent 2px),
                           radial-gradient(circle at 80% 20%, #D7B894 2px, transparent 2px),
                           radial-gradient(circle at 40% 40%, #EFB8C8 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 80px 80px, 40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-black">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blush to-champagne">Connect</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blush to-champagne mx-auto mb-6"></div>
          <p className="font-poppins text-xl text-black/80 max-w-2xl mx-auto">
            Ready to begin your beauty journey? Get in touch with us today
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div>
              <h3 className="font-playfair text-3xl font-bold mb-8 text-black ">Get in Touch</h3>
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.action}
                    className="group flex items-start space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blush to-champagne rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {contact.icon}
                    </div>
                    <div>
                      <h4 className="font-poppins font-semibold text-lg mb-1 text-black/80">{contact.title}</h4>
                      <p className="font-poppins text-champagne font-medium mb-1">{contact.info}</p>
                      <p className="font-poppins text-sm text-black/80">{contact.description}</p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-5 h-5 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="font-playfair text-xl font-bold mb-4 text-black/80">Business Hours</h4>
              <div className="space-y-2 font-poppins text-black/80">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-blush">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map & Location */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 h-full">
              <h3 className="font-playfair text-3xl font-bold mb-6 text-black/80">Find Us</h3>

              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-blush/30 to-champagne/40 rounded-2xl h-64 mb-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-velvet/40 to-transparent"></div>
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blush to-champagne rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="font-poppins text-white/90">Interactive Map</p>
                  <p className="font-poppins text-sm text-white/70">Click to open in Google Maps</p>
                </div>
              </div>

              <div className="text-center text-black/80">
                <h4 className="font-playfair text-xl font-bold mb-2">LUXURY STUDIO</h4>
                <p className="font-poppins mb-4">123 Beauty Lane<br />Luxury District, City 12345</p>
                <a
                  href="https://maps.google.com/?q=123+Beauty+Lane+Luxury+District"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blush to-champagne text-white font-poppins font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-20 pt-12 border-t border-black/80 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-3 gap-12 items-center">
            {/* Logo */}
            <div className="text-center md:text-left text-black/80">
              <h3 className="font-playfair text-3xl font-bold mb-2">LUXURY STUDIO</h3>
              <p className="font-signature text-black-30 text-lg">Where Beauty Becomes Power</p>
            </div>

            {/* Social Links */}
            <div className="text-center text-black/80">
              <h4 className="font-poppins text-black/80 font-semibold mb-4">Follow Our Journey</h4>
              <div className="flex justify-center space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="group w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blush hover:to-champagne transition-all duration-300 transform hover:scale-110"
                    title={social.handle}
                  >
                    {social.icon}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 text-velvet px-2 py-1 rounded text-xs font-poppins opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {social.handle}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="text-center md:text-right">
              <h4 className="font-poppins font-semibold mb-4 text-black/80">Stay Updated</h4>
              <div className="flex max-w-xs ml-auto">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-32 sm:w-40 px-3 py-2 bg-white/10 border border-black/30 rounded-l-full font-poppins text-sm placeholder-black/60 text-black/80 focus:outline-none focus:border-champagne"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blush to-champagne rounded-r-full font-poppins font-semibold text-sm hover:shadow-lg transition-shadow duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="font-poppins text-black/80 text-sm">
              © 2024 LUXURY STUDIO. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
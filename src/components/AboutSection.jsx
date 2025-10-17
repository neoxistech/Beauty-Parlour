import { useState, useEffect, useRef } from 'react'

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4 bg-ivory-warm">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative group">
              {/* Founder Image */}
              <div className="w-full h-96 rounded-2xl overflow-hidden relative shadow-2xl">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661339068665-c428c96f21d4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2Fsb24lMjBvd25lcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500"
                  alt="Mira Luxe - Founder of LUXÉ STUDIO"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle overlay for elegance */}
                <div className="absolute inset-0 bg-gradient-to-t from-velvet/30 via-transparent to-transparent"></div>

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>

              {/* Floating signature */}
              <div className="absolute -bottom-4 -right-4 bg-ivory backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-champagne-light">
                <p className="font-signature text-transparent bg-clip-text bg-gradient-to-r from-blush to-accent-pink text-xl">by Mira Luxe</p>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="mb-8">
              <h2 className="font-playfair text-5xl md:text-6xl font-bold text-velvet mb-6">
                Our Story of
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blush to-accent-gold"> Radiance</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blush to-accent-gold mb-8"></div>
            </div>

            <div className="space-y-6 text-velvet/80 font-poppins text-lg leading-relaxed">
              <p className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                At LUXARY STUDIO, we believe that beauty is not just about appearance—it's about the confidence that radiates from within. Founded with a passion for artistry and elegance, we've created a sanctuary where transformation meets luxury.
              </p>

              <p className={`transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                Our journey began with a simple vision: to create experiences that make every woman feel like the masterpiece she truly is. From bridal transformations to everyday glamour, we craft moments of pure magic.
              </p>

              <p className={`transition-all duration-700 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                Every service, every touch, every detail is designed to celebrate your unique beauty while empowering you to embrace your most confident self.
              </p>
            </div>

            {/* Signature Quote */}
            <div className={`mt-12 p-6 bg-gradient-to-r from-blush-light/50  to-accent-light/20 rounded-2xl border-l-4 border-accent-pink transition-all duration-700 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <blockquote className="font-signature text-2xl text-velvet/90 italic">
                "Beauty is an emotion, not a look."
              </blockquote>
              <cite className="font-poppins text-transparent bg-clip-text bg-gradient-to-r from-blush to-accent-pink font-medium mt-2 block">- Mira Luxe, Founder</cite>
            </div>

            {/* Stats */}
            <div className={`mt-12 grid grid-cols-3 gap-8 transition-all duration-700 delay-1300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <div className="text-center">
                <div className="font-playfair text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blush to-accent-pink">500+</div>
                <div className="font-poppins text-velvet/70 text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="font-playfair text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blush to-accent-pink">5+</div>
                <div className="font-poppins text-velvet/70 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="font-playfair text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blush to-accent-pink">100+</div>
                <div className="font-poppins text-velvet/70 text-sm">Bridal Looks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
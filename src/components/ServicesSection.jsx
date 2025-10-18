import { useState, useEffect, useRef } from 'react'

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
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

  const services = [
    {
      id: 1,
      title: "Makeup Artistry",
      description: "Professional makeup for all occasions, from natural everyday looks to glamorous evening styles.",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      gradient: "from-blush to-champagne",
      features: ["Bridal Makeup", "Party Makeup", "Photoshoot Ready", "Airbrush Technique"]
    },
    {
      id: 2,
      title: "Hair Styling",
      description: "Expert hair styling, cuts, and treatments to complement your unique personality.",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      gradient: "from-champagne to-blush",
      features: ["Bridal Hair", "Hair Cuts", "Hair Treatments", "Styling & Curls"]
    },
    {
      id: 3,
      title: "Nail Art",
      description: "Exquisite nail designs and treatments for the perfect finishing touch.",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      gradient: "from-blush/80 to-champagne/80",
      features: ["Gel Manicure", "Nail Art", "French Tips", "Nail Extensions"]
    },
    {
      id: 4,
      title: "Bridal Package",
      description: "Complete bridal transformation package for your special day.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      gradient: "from-champagne to-blush/60",
      features: ["Full Bridal Look", "Trial Session", "Touch-up Kit", "Photography Ready"]
    },
    {
      id: 5,
      title: "Spa Treatments",
      description: "Relaxing spa treatments to rejuvenate your skin and soul.",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      gradient: "from-blush/60 to-champagne",
      features: ["Facial Treatments", "Skin Care", "Relaxation Therapy", "Anti-aging"]
    }
  ]

  return (
    <section id="services" ref={sectionRef} className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-velvet mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blush to-champagne">Transformations</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blush to-champagne mx-auto mb-6"></div>
          <p className="font-poppins text-xl text-velvet/70 max-w-2xl mx-auto">
            Discover our range of luxury beauty services, each crafted to enhance your natural radiance
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2  h-96 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedService(service)}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700"
                style={{ backgroundImage: `url(${service.image})` }}
              ></div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500"></div>

              {/* Gradient Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
                <h3 className="font-playfair text-3xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blush group-hover:to-champagne transition-all duration-300">
                  {service.title}
                </h3>

                <p className="font-poppins text-white/90 mb-4 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-white/80">
                      <div className="w-2 h-2 bg-champagne rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <button className="px-6 py-3 bg-gradient-to-r from-blush to-champagne text-white font-poppins font-medium rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Service Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedService(null)}>
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="w-16 h-16 mb-4 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={selectedService.image}
                      alt={selectedService.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-playfair text-3xl font-bold text-velvet">{selectedService.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-velvet/50 hover:text-velvet transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="font-poppins text-velvet/80 mb-6 text-lg">{selectedService.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {selectedService.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center p-3 bg-blush/10 rounded-lg">
                    <div className="w-3 h-3 bg-champagne rounded-full mr-3"></div>
                    <span className="font-poppins text-velvet/80">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    const bookingSection = document.getElementById('booking-section');
                    if (bookingSection) {
                      bookingSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    setSelectedService(false)
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blush to-champagne text-white font-poppins font-semibold rounded-full hover:shadow-lg transition-shadow"
                >
                  Book Now
                </button>
                <button className="px-6 py-3 border-2 border-velvet text-velvet font-poppins font-semibold rounded-full hover:bg-velvet hover:text-white transition-colors">
                  Call for Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ServicesSection
import { useState, useEffect, useRef } from 'react'

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
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

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Bride",
      text: "LUXURY STUDIO made my wedding day absolutely magical. The attention to detail and artistry was beyond my expectations. I felt like a princess!",
      rating: 5,
      image: "👰🏻"
    },
    {
      id: 2,
      name: "Emily Chen",
      role: "Fashion Model",
      text: "Professional, talented, and so creative! The team at LUXURY STUDIO understands how to enhance natural beauty while creating stunning looks for photoshoots.",
      rating: 5,
      image: "👩🏻"
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Corporate Executive",
      text: "I come here for all my important events. The quality of service and the luxurious experience keeps me coming back. Highly recommend!",
      rating: 5,
      image: "👩🏽"
    },
    {
      id: 4,
      name: "Jessica Williams",
      role: "Influencer",
      text: "The best beauty parlour in the city! Every visit is a pampering experience. The staff is incredibly skilled and the ambiance is so relaxing.",
      rating: 5,
      image: "👩🏼"
    },
    {
      id: 5,
      name: "Aisha Patel",
      role: "Bride-to-be",
      text: "Had my bridal trial here and I'm absolutely in love with the look! Can't wait for my wedding day. The team is so professional and talented.",
      rating: 5,
      image: "👰🏽"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-champagne/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-velvet mb-6">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blush to-champagne">Clients Say</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blush to-champagne mx-auto mb-6"></div>
          <p className="font-poppins text-xl text-velvet/70 max-w-2xl mx-auto">
            Real stories from our beautiful clients who trusted us with their special moments
          </p>
        </div>

        {/* Main Testimonial */}
        <div className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Glass reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-champagne mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-poppins text-xl md:text-2xl text-velvet/90 text-center leading-relaxed mb-8 italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blush/30 to-champagne/40 rounded-full flex items-center justify-center text-2xl mr-4">
                  {testimonials[currentTestimonial].image}
                </div>
                <div className="text-center">
                  <h4 className="font-playfair text-xl font-bold text-velvet">{testimonials[currentTestimonial].name}</h4>
                  <p className="font-poppins text-champagne">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Navigation */}
        <div className={`flex justify-center space-x-3 mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
                  ? 'bg-gradient-to-r from-blush to-champagne scale-125'
                  : 'bg-velvet/30 hover:bg-velvet/50'
                }`}
            />
          ))}
        </div>

        {/* Floating Testimonial Cards */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-float"
              style={{
                animationDelay: `${index * 2}s`,
                animationDuration: `${8 + index}s`
              }}
            >
              {/* Glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-2xl pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blush/30 to-champagne/40 rounded-full flex items-center justify-center text-lg mr-3">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-playfair font-bold text-velvet">{testimonial.name}</h4>
                    <p className="font-poppins text-sm text-champagne">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-champagne" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="font-poppins text-sm text-velvet/80 leading-relaxed">
                  {testimonial.text.length > 100 ? testimonial.text.substring(0, 100) + '...' : testimonial.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-poppins text-lg text-velvet/70 mb-6">Ready to create your own beautiful story?</p>
          <button className="px-8 py-4 bg-gradient-to-r from-blush to-champagne text-white font-poppins font-semibold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            Book Your Transformation
          </button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
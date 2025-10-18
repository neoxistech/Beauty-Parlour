import { useState, useEffect, useRef } from 'react'

const PricingSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState(null)
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    services: [],
    budget: '',
    location: '',
    message: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const sectionRef = useRef(null)

  const [loading, setLoading] = useState(false);
  // const scriptURL = import.meta.env.VITE_GOOGLE_SCRIPT_URL; // Add this line (make sure it's in .env)


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

  const pricingPlans = [
    {
      id: 1,
      name: "Basic Glow",
      price: "$150",
      duration: "2 hours",
      description: "Perfect for everyday elegance and casual events",
      features: [
        "Professional makeup application",
        "Basic hairstyling",
        "Skin prep & primer",
        "Touch-up kit",
        "Consultation included"
      ],
      popular: false,
      gradient: "from-blush/20 to-champagne/20",
      borderGradient: "from-blush to-champagne"
    },
    {
      id: 2,
      name: "Bridal Luxury",
      price: "$450",
      duration: "5 hours",
      description: "Complete bridal transformation for your special day",
      features: [
        "Bridal makeup & hair trial",
        "Wedding day makeup & hair",
        "Premium products used",
        "Touch-up kit & assistant",
        "Photography-ready finish",
        "Complimentary nail art",
        "Bridal party discount"
      ],
      popular: true,
      gradient: "from-champagne/30 to-blush/30",
      borderGradient: "from-champagne via-blush to-champagne"
    },
    {
      id: 3,
      name: "Elite Experience",
      price: "$300",
      duration: "4 hours",
      description: "Premium package for special occasions and photoshoots",
      features: [
        "High-fashion makeup",
        "Editorial hairstyling",
        "Luxury skincare treatment",
        "Professional photography tips",
        "Wardrobe consultation",
        "Social media ready looks"
      ],
      popular: false,
      gradient: "from-blush/25 to-champagne/25",
      borderGradient: "from-blush to-champagne"
    }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleServiceChange = (service, checked) => {
    setFormData(prev => ({
      ...prev,
      services: checked
        ? [...prev.services, service]
        : prev.services.filter(s => s !== service)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formWithType = {
        ...formData,
        formType: "customPricing",
      };

      const response = await fetch("https://script.google.com/macros/s/AKfycbyWX8gsnkO4WSzKa9cS7CCGI4OWYcLFXHHO4oeaLccq71OJGtW9Kf_TTqy7lGSk6vhi/exec", {
        method: "POST",
        body: new URLSearchParams(formWithType),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setShowCustomForm(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            eventType: "",
            eventDate: "",
            guestCount: "",
            services: [],
            budget: "",
            location: "",
            message: "",
          });
        }, 3000);
      } else {
        console.error("Error submitting form");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section')
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const eventTypes = [
    'Wedding',
    'Engagement Party',
    'Birthday Party',
    'Corporate Event',
    'Photoshoot',
    'Fashion Show',
    'Anniversary',
    'Other Special Event'
  ]

  const availableServices = [
    'Bridal Makeup',
    'Bridal Hair',
    'Bridesmaids Makeup',
    'Bridesmaids Hair',
    'Mother of Bride/Groom',
    'Flower Girl',
    'Groom Grooming',
    'Photography Makeup',
    'Touch-up Services',
    'Travel Services'
  ]

  return (
    <section id="pricing" ref={sectionRef} className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-velvet mb-6">
            Luxury That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blush to-champagne">Suits You</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blush to-champagne mx-auto mb-6"></div>
          <p className="font-poppins text-xl text-velvet/70 max-w-2xl mx-auto">
            Choose the perfect package for your beauty transformation journey
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${plan.popular ? 'lg:-translate-y-4' : ''}`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-blush to-champagne text-white px-6 py-2 rounded-full font-poppins font-semibold text-sm shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden ${plan.popular ? 'ring-2 ring-champagne/50' : ''
                }`}>
                {/* Animated Border */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${plan.borderGradient} p-[2px]`}>
                    <div className="w-full h-full bg-white rounded-3xl"></div>
                  </div>
                </div>

                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h3 className="font-playfair text-2xl font-bold text-velvet mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="font-playfair text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blush to-champagne">
                        {plan.price}
                      </span>
                    </div>
                    <p className="font-poppins text-champagne font-medium">{plan.duration}</p>
                    <p className="font-poppins text-sm text-velvet/70 mt-2">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blush to-champagne flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="font-poppins text-velvet/80 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={scrollToBooking}
                    className={`w-full py-4 rounded-full font-poppins font-semibold transition-all duration-300 transform hover:scale-105 ${plan.popular
                        ? 'bg-gradient-to-r from-blush to-champagne text-white shadow-lg hover:shadow-xl'
                        : 'border-2 border-velvet text-velvet hover:bg-velvet hover:text-white'
                      }`}
                  >
                    Book This Plan
                  </button>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none`}></div>
                </div>

                {/* Floating Elements */}
                {hoveredPlan === plan.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-champagne/40 rounded-full animate-float"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${Math.random() * 2}s`,
                          animationDuration: `${3 + Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto shadow-lg">
            <h3 className="font-playfair text-2xl font-bold text-velvet mb-4">What's Included in Every Package</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blush to-champagne rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-poppins font-semibold text-velvet mb-2">Premium Products</h4>
                <p className="font-poppins text-sm text-velvet/70">High-end cosmetics and professional tools</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blush to-champagne rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-poppins font-semibold text-velvet mb-2">Flexible Timing</h4>
                <p className="font-poppins text-sm text-velvet/70">Convenient scheduling to fit your needs</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blush to-champagne rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="font-poppins font-semibold text-velvet mb-2">Personalized Care</h4>
                <p className="font-poppins text-sm text-velvet/70">Customized to your style and preferences</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact for Custom */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-poppins text-lg text-velvet/70 mb-4">Need a custom package?</p>
          <button
            onClick={() => setShowCustomForm(true)}
            className="px-8 py-3 border-2 border-champagne text-champagne font-poppins font-semibold rounded-full hover:bg-champagne hover:text-white transition-all duration-300"
          >
            Contact Us for Custom Pricing
          </button>
        </div>
      </div>

      {/* Custom Pricing Form Modal */}
      {showCustomForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCustomForm(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {!showSuccess ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-playfair text-3xl font-bold text-velvet mb-2">Custom Pricing Inquiry</h3>
                    <p className="font-poppins text-velvet/70">Tell us about your event and we'll create a personalized package</p>
                  </div>
                  <button
                    onClick={() => setShowCustomForm(false)}
                    className="text-velvet/50 hover:text-velvet transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-poppins font-medium text-velvet mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl font-poppins focus:border-champagne focus:outline-none transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block font-poppins font-medium text-velvet mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl font-poppins focus:border-champagne focus:outline-none transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-poppins font-medium text-velvet mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl font-poppins focus:border-champagne focus:outline-none transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block font-poppins font-medium text-velvet mb-2">Event Type *</label>
                      <select
                        required
                        value={formData.eventType}
                        onChange={(e) => handleInputChange('eventType', e.target.value)}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl font-poppins focus:border-champagne focus:outline-none transition-colors"
                      >
                        <option value="">Select event type</option>
                        {eventTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-poppins font-medium text-velvet mb-2">Event Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) => handleInputChange('eventDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl font-poppins focus:border-champagne focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-poppins font-medium text-velvet mb-2">Number of People *</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={formData.guestCount}
                        onChange={(e) => handleInputChange('guestCount', e.target.value)}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl font-poppins focus:border-champagne focus:outline-none transition-colors"
                        placeholder="How many people?"
                      />
                    </div>
                    <div>
                      <label className="block font-poppins font-medium text-velvet mb-2">Budget Range</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl font-poppins focus:border-champagne focus:outline-none transition-colors"
                      >
                        <option value="">Select budget range</option>
                        <option value="500-1000">$500 - $1,000</option>
                        <option value="1000-2500">$1,000 - $2,500</option>
                        <option value="2500-5000">$2,500 - $5,000</option>
                        <option value="5000+">$5,000+</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-poppins font-medium text-velvet mb-3">Services Needed *</label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {availableServices.map((service) => (
                        <label key={service} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blush/10 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.services.includes(service)}
                            onChange={(e) => handleServiceChange(service, e.target.checked)}
                            className="mr-3 w-4 h-4 text-champagne focus:ring-champagne border-gray-300 rounded"
                          />
                          <span className="font-poppins text-sm text-velvet">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-poppins font-medium text-velvet mb-2">Event Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl font-poppins focus:border-champagne focus:outline-none transition-colors"
                      placeholder="Where will the event take place?"
                    />
                  </div>

                  <div>
                    <label className="block font-poppins font-medium text-velvet mb-2">Additional Details *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl font-poppins focus:border-champagne focus:outline-none transition-colors resize-none"
                      placeholder="Tell us more about your event, special requirements, timeline, or any other details that would help us create the perfect package for you..."
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCustomForm(false)}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-600 font-poppins font-semibold rounded-full hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`flex-1 px-6 py-3 rounded-full font-poppins font-semibold transition-all duration-300 ${loading
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-gradient-to-r from-blush to-champagne text-white hover:shadow-lg"
                        }`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <svg
                            className="w-5 h-5 text-white animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                          </svg>
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        "Submit Inquiry"
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blush to-champagne rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-playfair text-3xl font-bold text-velvet mb-4">Inquiry Submitted!</h3>
                <p className="font-poppins text-lg text-velvet/80 mb-2">
                  Thank you for your custom pricing inquiry!
                </p>
                <p className="font-poppins text-velvet/70 mb-4">
                  Our team will review your requirements and get back to you within 24 hours with a personalized quote.
                </p>
                <p className="font-poppins text-sm text-velvet/60">
                  We'll contact you at {formData.email} with your custom package details.
                </p>

                {/* Confetti Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-champagne rounded-full animate-bounce"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${1 + Math.random()}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default PricingSection
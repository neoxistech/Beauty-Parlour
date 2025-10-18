import { useState, useEffect, useRef } from 'react'

const BookingSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  // const [showPaymentModal, setShowPaymentModal] = useState(false);


  const [formData, setFormData] = useState({
    service: [],
    date: '',
    time: '',
    name: '',
    email: '',
    phone: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
    { id: 'makeup', name: 'Makeup Artistry', icon: '💄', price: '$150' },
    { id: 'hair', name: 'Hair Styling', icon: '💇‍♀️', price: '$120' },
    { id: 'nails', name: 'Nail Art', icon: '💅', price: '$80' },
    { id: 'bridal', name: 'Bridal Package', icon: '👰', price: '$450' },
    { id: 'spa', name: 'Spa Treatment', icon: '🧖‍♀️', price: '$200' }
  ]

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  const handleInputChange = (field, value) => {
    if (field === "service") {
      setFormData(prev => {
        const isSelected = prev.service.includes(value);
        return {
          ...prev,
          service: isSelected
            ? prev.service.filter(id => id !== value) // remove if already selected
            : [...prev.service, value], // add if not selected
        };
      });
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setIsLoading(true);



    // Create FormData instead of JSON to avoid CORS issues
    const formDataToSend = new FormData();
    formDataToSend.append('formType', 'Booking'); // ✅ added
    formDataToSend.append('services', formData.service.join(','));
    formDataToSend.append('date', formData.date);
    formDataToSend.append('time', formData.time);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('confirmation', 'Pending');

    // Send data to Google Sheet via Web App using FormData
    fetch("https://script.google.com/macros/s/AKfycby6OvKJ_7Hd9QobgdJRedzUzY99ohx1eBMGdFfd69LilB9cN7PlryMXQUz6px_Eka5U/exec", {
      method: "POST",
      body: formDataToSend
    })
      .then(response => response.json())
      .then(result => {
        console.log("Data successfully sent to Google Sheet:", result);
        setIsLoading(false);
        // Show success and reset form
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setCurrentStep(1);
          setFormData({
            service: [],
            date: '',
            time: '',
            name: '',
            email: '',
            phone: ''
          });
        }, 3000);
        // setShowPaymentModal(true);
      })
      .catch(error => {
        console.error("Error sending data:", error);
        setIsLoading(false);
        alert("There was an error submitting your booking. Please try again.");
      });
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.service.length > 0
      case 2: return formData.date !== '' && formData.time !== ''
      case 3: return formData.name !== '' && formData.email !== '' && formData.phone !== ''
      default: return true
    }
  }

  return (
    <section id="booking-section" ref={sectionRef} className="py-20 px-4 bg-ivory-warm relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-champagne/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-velvet mb-6">
            Reserve Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blush to-champagne">Transformation</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blush to-champagne mx-auto mb-6"></div>
          <p className="font-poppins text-xl text-velvet/70 max-w-2xl mx-auto">
            Book your appointment in just a few simple steps and get ready to shine
          </p>
        </div>

        {/* Progress Bar */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-poppins font-semibold transition-all duration-300 ${step <= currentStep
                  ? 'bg-gradient-to-r from-blush to-champagne text-white'
                  : 'bg-white/80 text-velvet/60'
                  }`}>
                  {step < currentStep ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 transition-all duration-300 ${step < currentStep ? 'bg-gradient-to-r from-blush to-champagne' : 'bg-white/40'
                    }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-8 text-sm font-poppins text-velvet/70">
            <span className={currentStep >= 1 ? 'text-champagne font-medium' : ''}>Service</span>
            <span className={currentStep >= 2 ? 'text-champagne font-medium' : ''}>Date & Time</span>
            <span className={currentStep >= 3 ? 'text-champagne font-medium' : ''}>Details</span>
            <span className={currentStep >= 4 ? 'text-champagne font-medium' : ''}>Confirm</span>
          </div>
        </div>

        {/* Booking Form */}
        <div className={`bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Step 1: Choose Service */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="font-playfair text-2xl font-bold text-velvet text-center mb-8">Choose Your Service</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleInputChange('service', service.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105 ${formData.service.includes(service.id)
                      ? 'border-champagne bg-gradient-to-r from-blush/10 to-champagne/10'
                      : 'border-gray-200 hover:border-champagne/50'
                      }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{service.icon}</span>
                      <div>
                        <h4 className="font-poppins font-semibold text-velvet">{service.name}</h4>
                        <p className="font-poppins text-champagne font-medium">{service.price}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="font-playfair text-2xl font-bold text-velvet text-center mb-8">Pick Date & Time</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block font-poppins font-medium text-velvet mb-3">Select Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl font-poppins focus:border-champagne focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-poppins font-medium text-velvet mb-3">Select Time</label>
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleInputChange('time', time)}
                        className={`p-3 rounded-lg font-poppins text-sm transition-all duration-200 ${formData.time === time
                          ? 'bg-gradient-to-r from-blush to-champagne text-white'
                          : 'bg-gray-100 text-velvet hover:bg-champagne/20'
                          }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Personal Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="font-playfair text-2xl font-bold text-velvet text-center mb-8">Your Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-poppins font-medium text-velvet mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl font-poppins focus:border-champagne focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-poppins font-medium text-velvet mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl font-poppins focus:border-champagne focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-poppins font-medium text-velvet mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl font-poppins focus:border-champagne focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && !showSuccess && !isLoading && (
            <div className="space-y-6">
              <h3 className="font-playfair text-2xl font-bold text-velvet text-center mb-8">Confirm Your Booking</h3>
              <div className="bg-gradient-to-r from-blush/10 to-champagne/10 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-poppins text-velvet/70">Service:</span>
                  <span className="font-poppins font-medium text-velvet">
                    {formData.service.map(id => services.find(s => s.id === id)?.name).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-poppins text-velvet/70">Date:</span>
                  <span className="font-poppins font-medium text-velvet">{formData.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-poppins text-velvet/70">Time:</span>
                  <span className="font-poppins font-medium text-velvet">{formData.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-poppins text-velvet/70">Name:</span>
                  <span className="font-poppins font-medium text-velvet">{formData.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-poppins text-velvet/70">Price:</span>
                  <span className="font-poppins font-bold text-champagne text-xl">
                    {formData.service
                      .map(id => services.find(s => s.id === id)?.price || '$0') // get price of each selected service
                      .map(price => Number(price.replace('$', ''))) // convert to number
                      .reduce((total, price) => total + price, 0) // sum all prices
                      .toLocaleString('en-US', { style: 'currency', currency: 'USD' }) // format as currency
                    }
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blush to-champagne rounded-full flex items-center justify-center mx-auto animate-spin">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blush to-champagne rounded-full animate-pulse"></div>
                </div>
              </div>
              <h3 className="font-playfair text-3xl font-bold text-velvet">Confirming Your Booking...</h3>
              <p className="font-poppins text-lg text-velvet/80">
                Please wait while we process your appointment request.
              </p>
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-champagne rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-champagne rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-champagne rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {showSuccess && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blush to-champagne rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-playfair text-3xl font-bold text-velvet">Booking Confirmed!</h3>
              <p className="font-poppins text-lg text-velvet/80">
                You're all set! We'll see you on {formData.date} at {formData.time}.
              </p>
              <p className="font-poppins text-sm text-velvet/60">
                A confirmation email has been sent to {formData.email}
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

          {/* Navigation Buttons */}
          {!showSuccess && !isLoading && (
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1 || isLoading}
                className={`px-6 py-3 rounded-full font-poppins font-medium transition-all duration-300 ${currentStep === 1 || isLoading
                  ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-500'
                  : 'bg-white border-2 border-velvet text-velvet hover:bg-velvet hover:text-white'
                  }`}
              >
                Previous
              </button>

              <button
                onClick={currentStep === 4 ? handleSubmit : nextStep}
                disabled={!isStepValid() || isLoading}
                className={`px-8 py-3 rounded-full font-poppins font-semibold transition-all duration-300 transform hover:scale-105 ${isStepValid() && !isLoading
                  ? 'bg-gradient-to-r from-blush to-champagne text-white shadow-lg hover:shadow-xl'
                  : 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500'
                  }`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Confirming...
                  </span>
                ) : (
                  currentStep === 4 ? 'Confirm Booking' : 'Next Step'
                )}
              </button>
            </div>
          )}
        </div>

        {/* Contact Options */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-poppins text-velvet/70 mb-4">Prefer to book over the phone?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+1234567890"
              className="inline-flex items-center px-6 py-3 bg-white border-2 border-champagne text-champagne font-poppins font-semibold rounded-full hover:bg-champagne hover:text-white transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Now
            </a>
            <a
              href="https://wa.me/1234567890"
              className="inline-flex items-center px-6 py-3 bg-white border-2 border-blush text-blush font-poppins font-semibold rounded-full hover:bg-blush hover:text-white transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center relative">
            <h3 className="font-playfair text-2xl font-bold text-velvet mb-4">Choose Your Payment Method</h3>
            <p className="font-poppins text-velvet/70 mb-6">
              Please select one of the following options to complete your booking:
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setShowSuccess(true);
                  // Here you can integrate online payment logic
                }}
                className="px-6 py-4 bg-gradient-to-r from-blush to-champagne text-white font-semibold rounded-xl hover:scale-105 transition-transform"
              >
                Pay Online
              </button>

              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setShowSuccess(true);
                  // Here you can mark booking as offline payment
                }}
                className="px-6 py-4 bg-white border-2 border-velvet text-velvet font-semibold rounded-xl hover:bg-velvet hover:text-white transition-colors"
              >
                Pay Offline (At Salon)
              </button>
            </div>

            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-velvet font-bold text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )} */}

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
          {/* Spinner */}
          <div className="w-20 h-20 bg-gradient-to-r from-blush to-champagne rounded-full flex items-center justify-center animate-spin">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blush to-champagne rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Loading Text */}
          <h3 className="mt-6 font-playfair text-2xl md:text-3xl font-bold text-white">
            Confirming Your Booking...
          </h3>
          <p className="mt-2 font-poppins text-white/80 text-center max-w-sm">
            Please wait while we process your appointment request.
          </p>

          {/* Animated Dots */}
          <div className="flex space-x-1 mt-4">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}



    </section>

  )
}

export default BookingSection
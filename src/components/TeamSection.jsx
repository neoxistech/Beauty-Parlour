/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'

const TeamSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredMember, setHoveredMember] = useState(null)
  const [showJoinForm, setShowJoinForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    portfolio: '',
    message: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const sectionRef = useRef(null)

  const [loading, setLoading] = useState(false);
  const scriptURL = import.meta.env.VITE_GOOGLE_SCRIPT_UR;


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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formWithType = {
      ...formData,
      formType: "joinTeam", // or "booking" or "customPricing"
    };

      const response = await fetch(scriptURL, {
        method: 'POST',
        body: new URLSearchParams(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setShowJoinForm(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            position: '',
            experience: '',
            portfolio: '',
            message: ''
          });
        }, 3000);
      } else {
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };


  const positions = [
    'Makeup Artist',
    'Hair Stylist',
    'Nail Technician',
    'Spa Therapist',
    'Receptionist',
    'Beauty Consultant',
    'Other'
  ]

  const teamMembers = [
    {
      id: 1,
      name: "Mira Luxe",
      role: "Founder & Lead Artist",
      specialty: "Bridal Makeup & Hair",
      experience: "8+ Years",
      description: "Master artist specializing in bridal transformations and luxury beauty experiences.",
      social: {
        instagram: "@miraluxe_artist",
        facebook: "MiraLuxeArtist"
      },
      avatar: "👩🏻‍🎨"
    },
    {
      id: 2,
      name: "Sophia Martinez",
      role: "Senior Makeup Artist",
      specialty: "Editorial & Fashion",
      experience: "6+ Years",
      description: "Expert in high-fashion makeup and editorial looks for photoshoots and events.",
      social: {
        instagram: "@sophia_glam",
        facebook: "SophiaGlamArtist"
      },
      avatar: "👩🏽‍🎨"
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Hair Stylist",
      specialty: "Bridal & Event Hair",
      experience: "5+ Years",
      description: "Creative hair stylist known for romantic updos and modern styling techniques.",
      social: {
        instagram: "@emma_hairstyles",
        facebook: "EmmaHairStudio"
      },
      avatar: "👩🏼‍🦱"
    },
    {
      id: 4,
      name: "Aria Singh",
      role: "Nail Artist",
      specialty: "Nail Art & Extensions",
      experience: "4+ Years",
      description: "Talented nail artist creating intricate designs and perfect manicures.",
      social: {
        instagram: "@aria_nails",
        facebook: "AriaNailArt"
      },
      avatar: "👩🏽‍💼"
    },
    {
      id: 5,
      name: "Luna Chen",
      role: "Spa Therapist",
      specialty: "Skincare & Wellness",
      experience: "7+ Years",
      description: "Certified spa therapist focused on skin rejuvenation and relaxation treatments.",
      social: {
        instagram: "@luna_spa",
        facebook: "LunaWellness"
      },
      avatar: "👩🏻‍⚕️"
    }
  ]

  return (
    <section id="team" ref={sectionRef} className="py-20 px-4 bg-ivory-warm relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #EFB8C8 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #D7B894 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-velvet mb-6">
            The Artists Behind the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blush to-champagne">Beauty</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blush to-champagne mx-auto mb-6"></div>
          <p className="font-poppins text-xl text-velvet/70 max-w-2xl mx-auto">
            Meet our talented team of beauty professionals dedicated to making you look and feel extraordinary
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              {/* Card */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 group-hover:scale-105 overflow-hidden">
                {/* Spotlight Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-blush/20 via-champagne/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blush to-champagne rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>

                <div className="relative z-10">
                  {/* Avatar */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blush/30 to-champagne/40 rounded-full flex items-center justify-center text-4xl transform group-hover:scale-110 transition-transform duration-300">
                      {member.avatar}
                    </div>

                    {/* Cursor Follow Glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blush/40 to-champagne/40 opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-300"></div>
                  </div>

                  {/* Name & Role */}
                  <div className="text-center mb-4">
                    <h3 className="font-playfair text-2xl font-bold text-velvet mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blush group-hover:to-champagne transition-all duration-300">
                      {member.name}
                    </h3>
                    <p className="font-poppins text-champagne font-medium">{member.role}</p>
                  </div>

                  {/* Specialty & Experience */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 bg-blush/10 rounded-lg">
                      <span className="font-poppins text-sm text-velvet/70">Specialty:</span>
                      <span className="font-poppins text-sm font-medium text-velvet">{member.specialty}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-champagne/10 rounded-lg">
                      <span className="font-poppins text-sm text-velvet/70">Experience:</span>
                      <span className="font-poppins text-sm font-medium text-velvet">{member.experience}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-poppins text-sm text-velvet/80 text-center mb-6 leading-relaxed">
                    {member.description}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    <a
                      href={`https://instagram.com/${member.social.instagram.replace('@', '')}`}
                      className="w-10 h-10 bg-gradient-to-r from-blush/20 to-champagne/20 rounded-full flex items-center justify-center text-velvet/60 hover:text-white hover:from-blush hover:to-champagne transition-all duration-300 transform hover:scale-110"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a
                      href={`https://facebook.com/${member.social.facebook}`}
                      className="w-10 h-10 bg-gradient-to-r from-blush/20 to-champagne/20 rounded-full flex items-center justify-center text-velvet/60 hover:text-white hover:from-blush hover:to-champagne transition-all duration-300 transform hover:scale-110"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Hover Name Reveal */}
                <div className={`absolute top-4 left-4 right-4 bg-gradient-to-r from-blush to-champagne text-white px-4 py-2 rounded-full text-center font-poppins font-medium transform transition-all duration-300 ${hoveredMember === member.id ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                  }`}>
                  {member.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-poppins text-lg text-velvet/70 mb-6">Want to work with our talented team?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <button className="px-8 py-4 bg-gradient-to-r from-blush to-champagne text-white font-poppins font-semibold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Book Consultation
            </button> */}
            <button
              onClick={() => setShowJoinForm(true)}
              className="px-8 py-4 border-2 border-velvet text-velvet font-poppins font-semibold rounded-full hover:bg-velvet hover:text-white transition-all duration-300"
            >
              Join Our Team
            </button>
          </div>
        </div>
      </div>

      {/* Join Our Team Modal */}
      {showJoinForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowJoinForm(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {!showSuccess ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-playfair text-3xl font-bold text-velvet mb-2">Join Our Team</h3>
                    <p className="font-poppins text-velvet/70">We're always looking for talented beauty professionals</p>
                  </div>
                  <button
                    onClick={() => setShowJoinForm(false)}
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
                      <label className="block font-poppins font-medium text-velvet mb-2">Position Applying For *</label>
                      <select
                        required
                        value={formData.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl font-poppins focus:border-champagne focus:outline-none transition-colors"
                      >
                        <option value="">Select a position</option>
                        {positions.map((position) => (
                          <option key={position} value={position}>{position}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-poppins font-medium text-velvet mb-2">Years of Experience *</label>
                    <select
                      required
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl font-poppins focus:border-champagne focus:outline-none transition-colors"
                    >
                      <option value="">Select experience level</option>
                      <option value="0-1">0-1 years (Entry Level)</option>
                      <option value="2-3">2-3 years</option>
                      <option value="4-5">4-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years (Expert)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-poppins font-medium text-velvet mb-2">Portfolio/Website URL</label>
                    <input
                      type="url"
                      value={formData.portfolio}
                      onChange={(e) => handleInputChange('portfolio', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl font-poppins focus:border-champagne focus:outline-none transition-colors"
                      placeholder="https://your-portfolio.com"
                    />
                  </div>

                  <div>
                    <label className="block font-poppins font-medium text-velvet mb-2">Why do you want to join LUXURY STUDIO? *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl font-poppins focus:border-champagne focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your passion for beauty and why you'd be a great fit for our team..."
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowJoinForm(false)}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-600 font-poppins font-semibold rounded-full hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blush to-champagne text-white font-poppins font-semibold rounded-full hover:shadow-lg transition-shadow flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Submit Application'
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
                <h3 className="font-playfair text-3xl font-bold text-velvet mb-4">Application Submitted!</h3>
                <p className="font-poppins text-lg text-velvet/80 mb-2">
                  Thank you for your interest in joining LUXURY STUDIO!
                </p>
                <p className="font-poppins text-velvet/70">
                  We'll review your application and get back to you within 3-5 business days.
                </p>

                {/* Confetti Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(15)].map((_, i) => (
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

export default TeamSection
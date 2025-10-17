import { useState, useEffect } from 'react'

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Typing state
  const phrases = [
    "Where Beauty Meets Confidence.",
    "Transforming Moments Into Timeless Beauty.",
    "Elegance Crafted for You."
  ];
  const TYPING_SPEED = 80;   // ms per character while typing
  const DELETING_SPEED = 40; // ms per character while deleting
  const DELAY_AFTER = 1500;  // pause after a phrase completes (ms)

  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length];

    let timeout;
    if (!isDeleting && text !== currentPhrase) {
      // typing characters
      timeout = setTimeout(() => {
        setText(currentPhrase.slice(0, text.length + 1));
      }, TYPING_SPEED);
    } else if (isDeleting && text !== "") {
      // deleting characters
      timeout = setTimeout(() => {
        setText(currentPhrase.slice(0, text.length - 1));
      }, DELETING_SPEED);
    } else if (!isDeleting && text === currentPhrase) {
      // once full phrase typed, wait before deleting
      timeout = setTimeout(() => setIsDeleting(true), DELAY_AFTER);
    } else if (isDeleting && text === "") {
      // once deleted, move to next phrase
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);




  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0">

        <div className={`absolute  inset-0 transition-opacity duration-1000`}>
          {/* Background Image */}
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')` }}></div>

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/80"></div>
        </div>


      </div>
      {/*  */}
      {/* Slide Indicators */}
      <div>
        {/* <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
              ? 'bg-accent-gold scale-125'
              : 'bg-white/50 hover:bg-white/70'
              }`}
          />
        ))}
      </div> */}

        {/* Floating Particles */}
        {/* <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-accent-gold/70 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))} 
      </div> */}
      </div>

      {/* Content */}
      <div className="relative z-50 flex items-center justify-center h-full px-4">
        <div className="text-center max-w-4xl">
          {/* Logo */}
          <div className={`mb-8 transition-all duration-2000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="font-playfair text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
              hello STUDIO
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blush to-accent-gold mx-auto"></div>
          </div>

          {/* Tagline */}
          <div className={`mb-6 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="font-signature text-2xl sm:text-3xl md:text-5xl text-champagne mb-2 drop-shadow-xl">Luxury Beauty Redefined</p>
          </div>



          {/* Main Tagline Animation */}
          <div className="mb-12">
            <h2
              className={`font-playfair text-2xl sm:text-3xl md:text-5xl text-white drop-shadow-xl border-r-2 border-white inline-block whitespace-nowrap overflow-hidden animate-typing`}
            >
              <span className="inline-block">{text}</span>
              <span className="typing-cursor ml-1" aria-hidden="true" />
            </h2>
          </div>



          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 transition-all duration-1000 delay-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blush to-accent-pink text-white font-poppins font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl text-sm sm:text-base">
              <span className="relative z-10">Book Appointment</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-gold to-accent-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>

            <button className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-poppins font-semibold rounded-full transition-all duration-300 hover:bg-white hover:text-velvet hover:scale-105 backdrop-blur-sm text-sm sm:text-base">
              <span className="flex items-center gap-2 justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Now
              </span>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-2000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center text-white/80">
              <span className="font-poppins text-sm mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
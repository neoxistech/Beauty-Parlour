import { useState, useEffect, useRef } from 'react'

const PortfolioSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [filter, setFilter] = useState('all')
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

  const portfolioItems = [
    {
      id: 1,
      category: 'bridal',
      title: 'Elegant Bridal Look',
      description: 'Classic bridal makeup with soft glam',
      height: 'h-80',
      image: 'https://images.unsplash.com/photo-1751606615009-30f61ff1a510?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnJpZGFsJTIwbG9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500'
    },
    {
      id: 2,
      category: 'makeup',
      title: 'Evening Glamour',
      description: 'Bold evening makeup for special occasions',
      height: 'h-64',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFrZXVwfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500'
    },
    {
      id: 3,
      category: 'hair',
      title: 'Romantic Updo',
      description: 'Soft romantic hairstyle with loose curls',
      height: 'h-72',
      image: 'https://images.unsplash.com/photo-1560264641-1b5191cc63e2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFpcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500'
    },
    {
      id: 4,
      category: 'bridal',
      title: 'Traditional Bridal',
      description: 'Traditional bridal look with intricate details',
      height: 'h-96',
      image: 'https://images.unsplash.com/photo-1740674570399-6c61bc78d4da?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGluZGlhbiUyMCUyMGJyaWRhbCUyMGxvb2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500'
    },
    {
      id: 5,
      category: 'makeup',
      title: 'Natural Glow',
      description: 'Fresh natural makeup for daytime',
      height: 'h-60',
      image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      category: 'hair',
      title: 'Sleek & Chic',
      description: 'Modern sleek hairstyle',
      height: 'h-68',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 7,
      category: 'nails',
      title: 'French Elegance',
      description: 'Classic French manicure with gold accents',
      height: 'h-56',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 8,
      category: 'makeup',
      title: 'Smokey Eyes',
      description: 'Dramatic smokey eye makeup',
      height: 'h-84',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 9,
      category: 'bridal',
      title: 'Destination Wedding',
      description: 'Beach wedding bridal look',
      height: 'h-76',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'bridal', label: 'Bridal' },
    { id: 'makeup', label: 'Makeup' },
    { id: 'hair', label: 'Hair' },
    { id: 'nails', label: 'Nails' }
  ]

  const filteredItems = filter === 'all' ? portfolioItems : portfolioItems.filter(item => item.category === filter)

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 px-4 bg-ivory-warm">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-velvet mb-6">
            The Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blush to-champagne">Glamour</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blush to-champagne mx-auto mb-6"></div>
          <p className="font-poppins text-xl text-velvet/70 max-w-2xl mx-auto">
            Explore our portfolio of transformations and artistic creations
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-full font-poppins font-medium transition-all duration-300 ${filter === category.id
                ? 'bg-gradient-to-r from-blush to-champagne text-white shadow-lg'
                : 'bg-white/80 text-velvet hover:bg-gradient-to-r hover:from-blush/20 hover:to-champagne/20'
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl break-inside-avoid ${item.height} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedImage(item)}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-velvet/60 via-transparent to-transparent"></div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-velvet/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-playfair text-xl font-bold mb-2">{item.title}</h3>
                <p className="font-poppins text-sm opacity-90">{item.description}</p>
                <div className="mt-3 flex items-center text-champagne">
                  <span className="font-poppins text-xs uppercase tracking-wider">{item.category}</span>
                </div>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-4xl w-full max-h-[90vh]">
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <div className="rounded-2xl overflow-hidden aspect-[4/5] relative">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white rounded-b-2xl">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="font-playfair text-2xl font-bold mb-1">{selectedImage.title}</h3>
                    <p className="font-poppins opacity-90">{selectedImage.description}</p>
                  </div>
                  <span className="font-poppins text-sm uppercase tracking-wider text-champagne">
                    {selectedImage.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button className="px-8 py-4 bg-gradient-to-r from-blush to-champagne text-white font-poppins font-semibold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            View Full Portfolio
          </button>
        </div>
      </div>
    </section>
  )
}

export default PortfolioSection
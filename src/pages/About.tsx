function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-neutral-900">About Us</h1>
      <p className="text-base sm:text-lg text-neutral-700 mb-3 sm:mb-4 leading-relaxed">
        Welcome to Shopify Jeagnz! We are a modern e-commerce platform built with cutting-edge technologies.
      </p>
      <p className="text-sm sm:text-base text-neutral-600 mb-3 sm:mb-4 leading-relaxed">
        Our stack includes React, TypeScript, Vite, and Tailwind CSS, providing a fast and responsive user experience.
      </p>
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 border-l-4 border-primary-600 p-4 sm:p-6 mt-4 sm:mt-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-bold mb-2 text-neutral-900">Our Mission</h2>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
          To provide the best online shopping experience with quality products and exceptional customer service.
        </p>
      </div>
    </div>
  )
}

export default About

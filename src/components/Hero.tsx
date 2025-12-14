import { Link } from 'react-router-dom'

interface HeroProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
}

function Hero({ title, subtitle, ctaText, ctaLink }: HeroProps) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg overflow-hidden mb-6 sm:mb-8 md:mb-12">
      <div className="px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:py-20 text-center">
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
          {title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          {subtitle}
        </p>
        <Link
          to={ctaLink}
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  )
}

export default Hero

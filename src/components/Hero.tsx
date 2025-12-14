import { Link } from 'react-router-dom'

interface HeroProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
}

function Hero({ title, subtitle, ctaText, ctaLink }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white rounded-xl overflow-hidden mb-6 sm:mb-8 md:mb-12 shadow-xl">
      <div className="px-4 py-10 sm:px-6 sm:py-14 md:px-8 md:py-20 lg:py-24 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="relative z-10">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4 text-primary-50 leading-relaxed">
            {subtitle}
          </p>
          <Link
            to={ctaLink}
            className="inline-block bg-secondary-500 hover:bg-secondary-600 text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-lg transition-all text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero

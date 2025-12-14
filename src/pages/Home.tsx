import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import { products } from '../data/products'

function Home() {
  const featuredProducts = products.filter(product => product.featured)

  return (
    <>
      <Hero
        title="Welcome to Shopify Jeagnz"
        subtitle="Discover the perfect jeans for your style. Premium quality, modern designs, and unbeatable comfort."
        ctaText="Shop Now"
        ctaLink="/products"
      />

      <section className="mb-6 sm:mb-8 md:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-neutral-900">Featured Products</h2>
        <ProductGrid products={featuredProducts} />
      </section>

      <section className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-4 sm:p-6 md:p-8 text-center shadow-lg border border-neutral-200">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-neutral-900">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-neutral-200">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🎯</div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-neutral-900">Perfect Fit</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Designed for comfort and style that fits you perfectly
            </p>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-neutral-200">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">💎</div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-neutral-900">Premium Quality</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Made from the finest materials for lasting durability
            </p>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-neutral-200 sm:col-span-2 lg:col-span-1">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🚚</div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-neutral-900">Fast Shipping</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Free shipping on orders over $50 with quick delivery
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home

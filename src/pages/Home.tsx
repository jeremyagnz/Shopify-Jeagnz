import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import { products } from '../data/products'

function Home() {
  return (
    <>
      <Hero
        title="Welcome to Shopify Jeagnz"
        subtitle="Discover the perfect jeans for your style. Premium quality, modern designs, and unbeatable comfort."
        ctaText="Shop Now"
        ctaLink="/products"
      />

      <section className="mb-6 sm:mb-8 md:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Featured Products</h2>
        <ProductGrid products={products} />
      </section>

      <section className="bg-gray-100 rounded-lg p-4 sm:p-6 md:p-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🎯</div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">Perfect Fit</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Designed for comfort and style that fits you perfectly
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">💎</div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">Premium Quality</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Made from the finest materials for lasting durability
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg sm:col-span-2 lg:col-span-1">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🚚</div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">Fast Shipping</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Free shipping on orders over $50 with quick delivery
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home

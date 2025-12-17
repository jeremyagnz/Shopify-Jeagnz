import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import { useProducts } from '../hooks/useProducts'
import LoadingBanner from '../components/LoadingBanner'
import { ProductSkeletonGrid } from '../components/ProductSkeleton'

function Home() {
  const { products, loading, error, retry } = useProducts()
  const featuredProducts = products.filter(product => product.featured)

  return (
    <>
      <div className="animate-fade-in-scale">
        <Hero
          title="Welcome to Shopify Jeagnz"
          subtitle="Discover the perfect jeans for your style. Premium quality, modern designs, and unbeatable comfort."
          ctaText="Shop Now"
          ctaLink="/products"
        />
      </div>

      <section className="mb-6 sm:mb-8 md:mb-12 animate-slide-up">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-neutral-900 dark:text-neutral-100">Featured Products</h2>
        {loading ? (
          <>
            <LoadingBanner message="Loading featured products..." onRetry={retry} />
            <ProductSkeletonGrid count={4} />
          </>
        ) : error ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl p-4 mb-6">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">{error}</p>
          </div>
        ) : null}
        {!loading && <ProductGrid products={featuredProducts} />}
      </section>

      <section className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 rounded-xl p-4 sm:p-6 md:p-8 text-center shadow-lg border border-neutral-200 dark:border-neutral-600 animate-delay-section">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-neutral-900 dark:text-neutral-100">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          <div className="bg-white dark:bg-neutral-800 p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-neutral-200 dark:border-neutral-600">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🎯</div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-neutral-900 dark:text-neutral-100">Perfect Fit</h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Designed for comfort and style that fits you perfectly
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-800 p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-neutral-200 dark:border-neutral-600">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">💎</div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-neutral-900 dark:text-neutral-100">Premium Quality</h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Made from the finest materials for lasting durability
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-800 p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-neutral-200 dark:border-neutral-600 sm:col-span-2 lg:col-span-1">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🚚</div>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-neutral-900 dark:text-neutral-100">Fast Shipping</h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Free shipping on orders over $50 with quick delivery
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home

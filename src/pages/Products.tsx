import { useState, useMemo, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductGrid from '../components/ProductGrid'
import SearchBar from '../components/SearchBar'
import LoadingBanner from '../components/LoadingBanner'
import ErrorBanner from '../components/ErrorBanner'
import { ProductSkeletonGrid } from '../components/ProductSkeleton'

function Products() {
  const [searchQuery, setSearchQuery] = useState('')
  const { products, loading, error, isFromCache, isFromFallback, retry } = useProducts()
  
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products
    }

    const query = searchQuery.toLowerCase()
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  }, [searchQuery, products])

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-neutral-900 dark:text-neutral-100">
        Our Products
      </h1>
      
      {/* Loading state for cold start */}
      {loading && (
        <>
          <LoadingBanner message="Loading products from server... This may take a moment on first load." />
          <ProductSkeletonGrid count={8} />
        </>
      )}
      
      {/* Error state with fallback */}
      {!loading && error && isFromFallback && (
        <ErrorBanner 
          message={error} 
          onRetry={retry}
          type="warning"
        />
      )}
      
      {/* Cache indicator */}
      {!loading && !error && isFromCache && (
        <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-xl p-3 mb-6">
          <p className="text-sm text-green-800 dark:text-green-300">
            ✓ Products loaded from cache for faster experience
          </p>
        </div>
      )}
      
      {/* Main content */}
      {!loading && (
        <>
          <SearchBar onSearch={handleSearch} placeholder="Search by name or description..." />
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-2">No products found</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">Try adjusting your search query</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              <ProductGrid products={filteredProducts} />
            </>
          )}
        </>
      )}
      
      <Outlet />
    </div>
  )
}

export default Products

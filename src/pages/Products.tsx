import { useState, useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { products } from '../data/products'
import ProductGrid from '../components/ProductGrid'
import SearchBar from '../components/SearchBar'

function Products() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products
    }

    const query = searchQuery.toLowerCase()
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  }, [searchQuery])

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-neutral-900 dark:text-neutral-100">
        Our Products
      </h1>
      <SearchBar onSearch={setSearchQuery} placeholder="Search by name or description..." />
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
      <Outlet />
    </div>
  )
}

export default Products

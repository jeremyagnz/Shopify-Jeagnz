import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../contexts/CartContext'
import { useToast } from '../contexts/ToastContext'
import LoadingBanner from '../components/LoadingBanner'

function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const { products, loading, retry } = useProducts()
  const product = products.find(p => p.id === Number(id))
  const [imageError, setImageError] = useState(false)

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-4 sm:mt-6 md:mt-8">
        <Link to="/products" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium mb-4 inline-flex items-center gap-1 text-sm sm:text-base group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Products
        </Link>
        <LoadingBanner message="Loading product details..." onRetry={retry} />
        <div className="p-4 sm:p-6 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-xl animate-pulse">
          <div className="bg-neutral-200 dark:bg-neutral-700 h-48 sm:h-56 md:h-64 rounded-xl mb-4 sm:mb-6" />
          <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded mb-3 w-3/4" />
          <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded mb-3 w-1/3" />
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6" />
          </div>
          <div className="h-12 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto mt-4 sm:mt-6 md:mt-8 p-4 sm:p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-xl shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-red-700 dark:text-red-400 mb-2">Product Not Found</h2>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 mb-4">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <Link to="/products" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm sm:text-base">
          ← Back to Products
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product)
    showToast(`${product.name} added to cart!`, 'success')
  }

  return (
    <div className="max-w-2xl mx-auto mt-4 sm:mt-6 md:mt-8 p-4 sm:p-6 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-xl animate-slide-up">
      <Link to="/products" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium mb-4 inline-flex items-center gap-1 text-sm sm:text-base group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Products
      </Link>
      <div className="h-64 sm:h-80 md:h-96 rounded-xl mb-4 sm:mb-6 overflow-hidden animate-fade-in-scale bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 flex items-center justify-center">
        {!imageError ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-neutral-400 dark:text-neutral-500 text-base sm:text-lg md:text-xl font-medium">Product Image</span>
        )}
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-neutral-900 dark:text-neutral-100">{product.name}</h2>
      <p className="text-xl sm:text-2xl text-primary-600 dark:text-primary-400 font-bold mb-3 sm:mb-4">{product.price}</p>
      <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mb-4 sm:mb-6 leading-relaxed">{product.description}</p>
      <button
        onClick={handleAddToCart}
        className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductDetail

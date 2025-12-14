import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { useCart } from '../contexts/CartContext'
import { useToast } from '../contexts/ToastContext'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    // Prevent navigation to product detail page and stop event bubbling to parent Link
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    showToast(`${product.name} added to cart!`, 'success')
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white border-2 border-neutral-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-primary-400 transition-all duration-300 flex flex-col h-full group hover:-translate-y-1"
    >
      <div className="bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200 aspect-square flex items-center justify-center relative overflow-hidden">
        <span className="text-neutral-400 text-sm sm:text-base font-medium z-10">Product Image</span>
        <div className="absolute inset-0 bg-transparent group-hover:bg-primary-600/10 transition-all duration-300"></div>
        {product.featured && (
          <div 
            className="absolute top-3 right-3 bg-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20"
            role="status"
            aria-label="Featured product"
          >
            Featured
          </div>
        )}
      </div>
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 line-clamp-2 text-neutral-900 group-hover:text-primary-600 transition-colors duration-200">
          {product.name}
        </h3>
        <p className="text-primary-600 font-bold text-xl sm:text-2xl mb-4">
          {product.price}
        </p>
        <button
          onClick={handleAddToCart}
          className="mt-auto w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          aria-label={`Add ${product.name} to cart`}
        >
          <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to Cart
        </button>
      </div>
    </Link>
  )
}

export default ProductCard

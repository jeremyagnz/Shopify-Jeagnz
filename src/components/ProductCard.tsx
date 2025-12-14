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
      className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-primary-300 transition-all duration-300 flex flex-col h-full group"
    >
      <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 aspect-square flex items-center justify-center relative overflow-hidden">
        <span className="text-neutral-400 text-sm sm:text-base font-medium">Product Image</span>
        <div className="absolute inset-0 bg-transparent group-hover:bg-primary-600/5 transition-colors duration-300"></div>
      </div>
      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 line-clamp-2 text-neutral-900 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-primary-600 font-bold text-lg sm:text-xl mb-3">
          {product.price}
        </p>
        <button
          onClick={handleAddToCart}
          className="mt-auto w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  )
}

export default ProductCard

import { Link } from 'react-router-dom'
import type { Product } from '../data/products'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
    >
      <div className="bg-gray-200 aspect-square flex items-center justify-center">
        <span className="text-gray-400 text-sm sm:text-base">Product Image</span>
      </div>
      <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-blue-600 font-bold text-lg sm:text-xl mt-auto">
          {product.price}
        </p>
      </div>
    </Link>
  )
}

export default ProductCard

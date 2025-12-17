import type { Product } from '../data/products'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
}

// Maximum number of stagger animation classes defined in CSS
const MAX_STAGGER_DELAY = 8

function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product, index) => (
        <div 
          key={product.id} 
          className={`animate-slide-in-stagger animate-stagger-${(index % MAX_STAGGER_DELAY) + 1}`}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}

export default ProductGrid

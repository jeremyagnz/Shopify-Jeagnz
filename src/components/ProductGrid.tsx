import type { Product } from '../data/products'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
}

function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product, index) => (
        <div 
          key={product.id} 
          className={`animate-slide-in-stagger animate-stagger-${(index % 8) + 1}`}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}

export default ProductGrid

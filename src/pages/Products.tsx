import { Outlet } from 'react-router-dom'
import { products } from '../data/products'
import ProductGrid from '../components/ProductGrid'

function Products() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-neutral-900">
        Our Products
      </h1>
      <ProductGrid products={products} />
      <Outlet />
    </div>
  )
}

export default Products

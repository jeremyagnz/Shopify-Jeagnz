import { Link, Outlet } from 'react-router-dom'

function Products() {
  const products = [
    { id: 1, name: 'Classic Jeans', price: '$79.99' },
    { id: 2, name: 'Skinny Jeans', price: '$89.99' },
    { id: 3, name: 'Relaxed Fit', price: '$69.99' },
    { id: 4, name: 'Bootcut Jeans', price: '$74.99' },
  ]

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-400">Product Image</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-blue-600 font-bold">{product.price}</p>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  )
}

export default Products

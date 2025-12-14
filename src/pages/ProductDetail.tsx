import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'

function ProductDetail() {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-2xl font-bold text-red-700 mb-2">Product Not Found</h2>
        <p className="text-gray-700 mb-4">Sorry, we couldn't find the product you're looking for.</p>
        <Link to="/products" className="text-blue-600 hover:underline">
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <Link to="/products" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Products
      </Link>
      <div className="bg-gray-200 h-64 rounded-lg mb-6 flex items-center justify-center">
        <span className="text-gray-400 text-xl">Product Image</span>
      </div>
      <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
      <p className="text-2xl text-blue-600 font-bold mb-4">{product.price}</p>
      <p className="text-gray-700 mb-6">{product.description}</p>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
        Add to Cart
      </button>
    </div>
  )
}

export default ProductDetail

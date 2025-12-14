import { useCart } from '../contexts/CartContext'

function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center">
        <p className="text-gray-600 text-sm sm:text-base">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h2 className="text-xl sm:text-2xl font-bold">Shopping Cart</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {cart.map((item) => (
          <div key={item.id} className="p-4 sm:p-6">
            <div className="flex gap-3 sm:gap-4">
              <div className="bg-gray-200 w-16 h-16 sm:w-20 sm:h-20 rounded flex-shrink-0 flex items-center justify-center">
                <span className="text-xs text-gray-400">Image</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm sm:text-base mb-1 truncate">
                  {item.name}
                </h3>
                <p className="text-blue-600 font-bold text-sm sm:text-base mb-2">
                  {item.price}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 hover:bg-gray-300 w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center transition-colors text-sm sm:text-base"
                  >
                    -
                  </button>
                  <span className="w-8 sm:w-12 text-center font-semibold text-sm sm:text-base">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 hover:bg-gray-300 w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center transition-colors text-sm sm:text-base"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-auto text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 sm:p-6 border-t-2 border-gray-300 bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <span className="text-base sm:text-lg font-semibold">Total:</span>
          <span className="text-xl sm:text-2xl font-bold text-blue-600">
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base">
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useToast } from '../contexts/ToastContext'

const CHECKOUT_NAVIGATION_DELAY = 300

interface CartProps {
  onClose?: () => void
}

function Cart({ onClose }: CartProps) {
  const navigate = useNavigate()
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart()
  const { showToast } = useToast()
  const [isNavigating, setIsNavigating] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleCheckout = () => {
    setIsNavigating(true)
    showToast('Proceeding to checkout...', 'info')
    
    // Close the cart if onClose is provided
    if (onClose) {
      onClose()
    }
    
    // Small delay for better UX
    timeoutRef.current = window.setTimeout(() => {
      navigate('/checkout')
      setIsNavigating(false)
      timeoutRef.current = null
    }, CHECKOUT_NAVIGATION_DELAY)
  }

  if (cart.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 sm:p-6 text-center">
        <svg className="w-16 h-16 mx-auto mb-4 text-neutral-300 dark:text-neutral-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base font-medium">Your cart is empty</p>
        <p className="text-neutral-400 dark:text-neutral-500 text-xs sm:text-sm mt-2">Add some items to get started!</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">Shopping Cart</h2>
      </div>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
        {cart.map((item) => (
          <div key={item.id} className="p-4 sm:p-6 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
            <div className="flex gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">Image</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm sm:text-base mb-1 truncate text-neutral-900 dark:text-neutral-100">
                  {item.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-bold text-sm sm:text-base mb-2">
                  {item.price}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-neutral-200 dark:bg-neutral-700 hover:bg-primary-100 dark:hover:bg-primary-900/50 text-neutral-700 dark:text-neutral-300 hover:text-primary-700 dark:hover:text-primary-400 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all text-sm sm:text-base font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 sm:w-12 text-center font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-neutral-200 dark:bg-neutral-700 hover:bg-primary-100 dark:hover:bg-primary-900/50 text-neutral-700 dark:text-neutral-300 hover:text-primary-700 dark:hover:text-primary-400 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all text-sm sm:text-base font-bold"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-auto text-error-600 dark:text-error-400 hover:text-error-700 dark:hover:text-error-300 text-xs sm:text-sm font-bold uppercase tracking-wide transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 sm:p-6 border-t-2 border-neutral-300 dark:border-neutral-700 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
        <div className="flex justify-between items-center mb-4">
          <span className="text-base sm:text-lg font-bold text-neutral-700 dark:text-neutral-300">Total:</span>
          <span className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>
        <button 
          onClick={handleCheckout}
          disabled={isNavigating}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg">
          {isNavigating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
          ) : (
            'Proceed to Checkout'
          )}
        </button>
      </div>
    </div>
  )
}

export default Cart

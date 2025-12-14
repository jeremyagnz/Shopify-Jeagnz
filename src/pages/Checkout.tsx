import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useToast } from '../contexts/ToastContext'

function Checkout() {
  const navigate = useNavigate()
  const { cart, getTotalPrice, clearCart } = useCart()
  const { showToast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
  })

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !isProcessing) {
      navigate('/products')
    }
  }, [cart.length, isProcessing, navigate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form fields
    if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.zipCode || !formData.cardNumber) {
      showToast('Please fill in all fields', 'error')
      return
    }

    setIsProcessing(true)

    try {
      // Simulate checkout processing (network delay)
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulate successful order
      const orderNumber = Math.random().toString(36).substring(2, 11).toUpperCase()
      
      // Clear cart after successful order
      clearCart()
      
      // Show success message
      showToast(`Order #${orderNumber} placed successfully!`, 'success')
      
      // Redirect to products page after a short delay
      setTimeout(() => {
        navigate('/products')
      }, 1500)
    } catch (error) {
      showToast('An error occurred. Please try again.', 'error')
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-neutral-900 dark:text-neutral-100">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 bg-white dark:bg-neutral-800 p-5 sm:p-6 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Shipping Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isProcessing}
                    className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isProcessing}
                    className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={isProcessing}
                    className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="123 Main St"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={isProcessing}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="New York"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      disabled={isProcessing}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="10001"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Payment Information
              </h2>
              
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  disabled={isProcessing}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  This is a demo - no real payment processing
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Order...
                </span>
              ) : (
                'Place Order'
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-neutral-800 p-5 sm:p-6 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 sticky top-4">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Order Summary
            </h2>
            
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="text-neutral-900 dark:text-neutral-100 font-bold">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-base sm:text-lg font-bold text-neutral-700 dark:text-neutral-300">
                  Total:
                </span>
                <span className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

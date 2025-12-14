import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Cart from './Cart'

function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
      <Navbar onCartToggle={toggleCart} />

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" onClick={toggleCart}>
          <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div 
              className="w-screen max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full flex flex-col bg-white dark:bg-neutral-800 shadow-xl">
                <div className="flex items-center justify-between p-4 border-b dark:border-neutral-700">
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Shopping Cart</h2>
                  <button
                    onClick={toggleCart}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                    aria-label="Close cart"
                  >
                    <svg className="w-6 h-6 text-neutral-900 dark:text-neutral-100" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <Cart />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 container mx-auto px-4 py-4 sm:py-6 md:py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout

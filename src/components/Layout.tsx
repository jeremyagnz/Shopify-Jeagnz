import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import Cart from './Cart'

function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { getTotalItems } = useCart()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const totalItems = getTotalItems()

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <header className="bg-primary-600 text-white shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold">Shopify Jeagnz</h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              <Link to="/" className="hover:text-primary-100 transition-colors font-medium">
                Home
              </Link>
              <Link to="/about" className="hover:text-primary-100 transition-colors font-medium">
                About
              </Link>
              <Link to="/products" className="hover:text-primary-100 transition-colors font-medium">
                Products
              </Link>
              <Link to="/contact" className="hover:text-primary-100 transition-colors font-medium">
                Contact
              </Link>
              <button
                onClick={toggleCart}
                className="relative p-2 hover:bg-primary-700 rounded-lg transition-colors"
                aria-label="Shopping cart"
              >
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Cart & Menu Buttons */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleCart}
                className="relative p-2 rounded-lg hover:bg-primary-700 transition-colors"
                aria-label="Shopping cart"
              >
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg hover:bg-primary-700 transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <ul className="md:hidden mt-4 space-y-2 pb-2">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-4 rounded hover:bg-primary-700 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block py-2 px-4 rounded hover:bg-primary-700 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="block py-2 px-4 rounded hover:bg-primary-700 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-4 rounded hover:bg-primary-700 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </header>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" onClick={toggleCart}>
          <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div 
              className="w-screen max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Shopping Cart</h2>
                  <button
                    onClick={toggleCart}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close cart"
                  >
                    <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
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

      <footer className="bg-neutral-900 text-neutral-100 py-6 sm:py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm sm:text-base mb-2">&copy; 2025 Shopify Jeagnz. All rights reserved.</p>
            <p className="text-xs sm:text-sm text-neutral-400">Premium denim for every style</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout

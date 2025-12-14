import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import Logo from './Logo'

interface NavbarProps {
  onCartToggle: () => void
}

const SCROLL_THRESHOLD = 20

function Navbar({ onCartToggle }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { getTotalItems } = useCart()

  useEffect(() => {
    let timeoutId: number | null = null

    const handleScroll = () => {
      if (timeoutId) return
      
      timeoutId = window.setTimeout(() => {
        setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
        timeoutId = null
      }, 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const totalItems = getTotalItems()

  return (
    <header className={`sticky top-0 z-40 bg-primary-600 text-white transition-all duration-300 ${
      isScrolled ? 'shadow-xl' : 'shadow-lg'
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity">
            <Logo className="w-7 h-7 sm:w-8 sm:h-8" />
            <h1 className="text-xl sm:text-2xl font-bold">Shopify Jeagnz</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link to="/" className="text-white hover:text-primary-100 transition-colors font-medium">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-primary-100 transition-colors font-medium">
              About
            </Link>
            <Link to="/products" className="text-white hover:text-primary-100 transition-colors font-medium">
              Products
            </Link>
            <Link to="/contact" className="text-white hover:text-primary-100 transition-colors font-medium">
              Contact
            </Link>
            <button
              onClick={onCartToggle}
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
              onClick={onCartToggle}
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
          <ul className="md:hidden mt-4 space-y-2 pb-2 animate-fade-in">
            <li>
              <Link
                to="/"
                className="block py-2 px-4 rounded text-white hover:bg-primary-700 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-4 rounded text-white hover:bg-primary-700 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="block py-2 px-4 rounded text-white hover:bg-primary-700 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-4 rounded text-white hover:bg-primary-700 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  )
}

export default Navbar

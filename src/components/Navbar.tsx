import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useTheme } from '../contexts/ThemeContext'
import Logo from './Logo'

interface NavbarProps {
  onCartToggle: () => void
}

const SCROLL_THRESHOLD = 20

function Navbar({ onCartToggle }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartPulse, setCartPulse] = useState(false)
  const { getTotalItems } = useCart()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const prevTotalItemsRef = useRef(0)

  const totalItems = getTotalItems()

  useEffect(() => {
    let timeoutId: number | null = null

    const handleScroll = () => {
      if (timeoutId) return
      
      timeoutId = window.setTimeout(() => {
        setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
        timeoutId = null
      }, 16)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [])

  // Pulse animation when cart items increase - this is intentional for visual feedback
  useEffect(() => {
    if (totalItems > prevTotalItemsRef.current && totalItems > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCartPulse(true)
      const timer = setTimeout(() => setCartPulse(false), 600)
      prevTotalItemsRef.current = totalItems
      return () => clearTimeout(timer)
    }
    prevTotalItemsRef.current = totalItems
  }, [totalItems])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/products', label: 'Products' },
    { to: '/contact', label: 'Contact' },
    { to: '/admin', label: 'Admin' },
  ]

  const isActiveRoute = (path: string) => location.pathname === path

  return (
    <header className={`sticky top-0 z-50 text-white transition-all duration-500 ${
      isScrolled 
        ? 'bg-primary-600/95 backdrop-blur-md shadow-2xl' 
        : 'bg-primary-600 shadow-lg'
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group transition-all duration-300 hover:scale-105">
            <Logo className="w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:rotate-3" showText={true} />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3 py-2 font-medium transition-all duration-300 group ${
                  isActiveRoute(link.to) 
                    ? 'text-white' 
                    : 'text-primary-100 hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {/* Hover background effect */}
                <span className="absolute inset-0 bg-primary-700/50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
                {/* Active indicator */}
                {isActiveRoute(link.to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-secondary-400 rounded-full shadow-lg shadow-secondary-400/50" />
                )}
                {/* Hover underline */}
                {!isActiveRoute(link.to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-100 rounded-full group-hover:w-3/4 transition-all duration-300" />
                )}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-2 hover:bg-primary-700/50 rounded-lg transition-all duration-300 group overflow-hidden ml-2"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-secondary-400/0 via-secondary-400/20 to-secondary-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              {theme === 'light' ? (
                <svg className="w-6 h-6 transition-transform duration-500 group-hover:rotate-12" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 transition-transform duration-500 group-hover:rotate-180 group-hover:scale-110" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
            
            {/* Cart Button */}
            <button
              onClick={onCartToggle}
              className={`relative p-2 hover:bg-primary-700/50 rounded-lg transition-all duration-300 group ${
                cartPulse ? 'animate-pulse' : ''
              }`}
              aria-label="Shopping cart"
            >
              <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className={`absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg transition-transform duration-300 ${
                  cartPulse ? 'scale-125' : 'scale-100'
                }`}>
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Cart & Menu Buttons */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-primary-700/50 active:scale-95 transition-all duration-300 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg className="w-6 h-6 transition-transform duration-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 transition-transform duration-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
            <button
              onClick={onCartToggle}
              className={`relative p-2 rounded-lg hover:bg-primary-700/50 active:scale-95 transition-all duration-300 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center ${
                cartPulse ? 'animate-pulse' : ''
              }`}
              aria-label="Shopping cart"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className={`absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg transition-transform duration-300 ${
                  cartPulse ? 'scale-125' : 'scale-100'
                }`}>
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-primary-700/50 active:scale-95 transition-all duration-300 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}
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
          <>
            {/* Backdrop overlay with blur */}
            <div 
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fade-in md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            
            {/* Mobile menu panel */}
            <div className="fixed top-[72px] left-0 right-0 bottom-0 bg-gradient-to-b from-primary-600 to-primary-700 z-50 overflow-y-auto md:hidden animate-slide-down shadow-2xl">
              <ul className="container mx-auto px-4 py-6 space-y-1">
                {navLinks.map((link, index) => (
                  <li 
                    key={link.to}
                    className="animate-slide-in-stagger"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Link
                      to={link.to}
                      className={`block py-4 px-6 rounded-xl font-semibold transition-all duration-300 touch-manipulation min-h-[56px] flex items-center relative overflow-hidden group ${
                        isActiveRoute(link.to)
                          ? 'bg-primary-700/80 text-white shadow-lg scale-[1.02]'
                          : 'text-primary-50 hover:bg-primary-700/50 hover:text-white active:scale-95'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {/* Ripple effect background */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      
                      {/* Active indicator */}
                      {isActiveRoute(link.to) && (
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-secondary-400 rounded-full shadow-lg shadow-secondary-400/50" />
                      )}
                      
                      <span className="relative z-10 ml-2 text-lg">{link.label}</span>
                      
                      {/* Arrow icon for active */}
                      {isActiveRoute(link.to) && (
                        <svg 
                          className="absolute right-4 w-5 h-5 text-secondary-400 animate-pulse" 
                          fill="none" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Decorative bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-800 to-transparent pointer-events-none" />
            </div>
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar

import { Outlet, Link } from 'react-router-dom'

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Shopify Jeagnz</h1>
            <ul className="flex gap-6">
              <li>
                <Link to="/" className="hover:text-blue-200 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-200 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-blue-200 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-200 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Shopify Jeagnz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout

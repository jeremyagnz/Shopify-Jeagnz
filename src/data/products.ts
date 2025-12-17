export interface Product {
  id: number
  name: string
  price: string
  description: string
  image: string
  featured?: boolean
}

// Helper function to generate SVG placeholder images
const generateProductImage = (name: string, color: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
    <defs>
      <linearGradient id="grad-${color.replace('#', '')}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color};stop-opacity:0.7" />
      </linearGradient>
    </defs>
    <rect width="800" height="800" fill="url(#grad-${color.replace('#', '')})"/>
    <text x="50%" y="45%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="48" font-weight="bold">${name}</text>
    <circle cx="400" cy="460" r="40" fill="white" opacity="0.3"/>
    <rect x="380" y="440" width="40" height="60" rx="5" fill="white" opacity="0.9"/>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export const products: Product[] = [
  { id: 1, name: 'Classic Jeans', price: '$79.99', description: 'Timeless style with a perfect fit.', image: generateProductImage('Classic Jeans', '#4f46e5'), featured: true },
  { id: 2, name: 'Skinny Jeans', price: '$89.99', description: 'Modern slim fit for a sleek look.', image: generateProductImage('Skinny Jeans', '#6366f1'), featured: true },
  { id: 3, name: 'Relaxed Fit', price: '$69.99', description: 'Comfortable and casual for everyday wear.', image: generateProductImage('Relaxed Fit', '#818cf8') },
  { id: 4, name: 'Bootcut Jeans', price: '$74.99', description: 'Classic bootcut style for versatile styling.', image: generateProductImage('Bootcut Jeans', '#4338ca'), featured: true },
  { id: 5, name: 'Slim Straight Jeans', price: '$84.99', description: 'Perfect balance between slim and straight fit for all-day comfort.', image: generateProductImage('Slim Straight', '#5b21b6') },
  { id: 6, name: 'Wide Leg Jeans', price: '$94.99', description: 'Trendy wide leg design for a bold fashion statement.', image: generateProductImage('Wide Leg', '#7c3aed'), featured: true },
  { id: 7, name: 'Distressed Denim', price: '$99.99', description: 'Edgy distressed style with authentic vintage look.', image: generateProductImage('Distressed', '#6366f1') },
  { id: 8, name: 'Black Jeans', price: '$79.99', description: 'Versatile black denim perfect for any occasion.', image: generateProductImage('Black Jeans', '#1e293b') },
  { id: 9, name: 'Raw Denim', price: '$119.99', description: 'Premium raw denim that ages beautifully with wear.', image: generateProductImage('Raw Denim', '#475569'), featured: true },
  { id: 10, name: 'Carpenter Jeans', price: '$89.99', description: 'Functional design with utility pockets and durable construction.', image: generateProductImage('Carpenter', '#64748b') },
  { id: 11, name: 'High-Rise Jeans', price: '$92.99', description: 'Flattering high-rise cut with comfortable stretch fabric.', image: generateProductImage('High-Rise', '#4f46e5') },
  { id: 12, name: 'Tapered Fit', price: '$87.99', description: 'Modern tapered leg for a contemporary silhouette.', image: generateProductImage('Tapered Fit', '#6366f1') },
  { id: 13, name: 'Vintage Wash Jeans', price: '$109.99', description: 'Authentic vintage wash with unique fading patterns.', image: generateProductImage('Vintage Wash', '#818cf8'), featured: true },
  { id: 14, name: 'Jogger Jeans', price: '$94.99', description: 'Comfortable jogger style with elastic cuffs for a modern athleisure look.', image: generateProductImage('Jogger Jeans', '#4338ca') },
  { id: 15, name: 'Cropped Jeans', price: '$84.99', description: 'Trendy cropped length perfect for showing off your favorite sneakers.', image: generateProductImage('Cropped', '#5b21b6') },
  { id: 16, name: 'Ripped Jeans', price: '$99.99', description: 'Stylish distressed details with strategic rips and tears.', image: generateProductImage('Ripped Jeans', '#7c3aed') },
  { id: 17, name: 'Dark Wash Jeans', price: '$89.99', description: 'Deep indigo color that works for both casual and formal occasions.', image: generateProductImage('Dark Wash', '#1e40af') },
  { id: 18, name: 'Light Wash Jeans', price: '$79.99', description: 'Bright, summery light wash perfect for warm weather.', image: generateProductImage('Light Wash', '#93c5fd') },
  { id: 19, name: 'Jeggings', price: '$69.99', description: 'Ultimate comfort with stretchy denim that looks like jeans.', image: generateProductImage('Jeggings', '#6366f1') },
  { id: 20, name: 'Boyfriend Jeans', price: '$94.99', description: 'Relaxed, slouchy fit inspired by menswear styles.', image: generateProductImage('Boyfriend', '#818cf8') },
  { id: 21, name: 'Mom Jeans', price: '$89.99', description: 'High-waisted vintage style with a comfortable relaxed fit.', image: generateProductImage('Mom Jeans', '#4f46e5') },
  { id: 22, name: 'Flare Jeans', price: '$99.99', description: 'Retro-inspired flare leg that widens from the knee down.', image: generateProductImage('Flare Jeans', '#4338ca') },
  { id: 23, name: 'Selvedge Denim', price: '$149.99', description: 'Premium Japanese selvedge denim with signature red line detail.', image: generateProductImage('Selvedge', '#475569'), featured: true },
  { id: 24, name: 'Stretch Jeans', price: '$74.99', description: 'Maximum comfort with high-stretch fabric for all-day wear.', image: generateProductImage('Stretch', '#64748b') },
]

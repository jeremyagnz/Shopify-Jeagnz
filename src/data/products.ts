export interface Product {
  id: number
  name: string
  price: string
  description: string
  featured?: boolean
}

export const products: Product[] = [
  { id: 1, name: 'Classic Jeans', price: '$79.99', description: 'Timeless style with a perfect fit.', featured: true },
  { id: 2, name: 'Skinny Jeans', price: '$89.99', description: 'Modern slim fit for a sleek look.', featured: true },
  { id: 3, name: 'Relaxed Fit', price: '$69.99', description: 'Comfortable and casual for everyday wear.' },
  { id: 4, name: 'Bootcut Jeans', price: '$74.99', description: 'Classic bootcut style for versatile styling.', featured: true },
  { id: 5, name: 'Slim Straight Jeans', price: '$84.99', description: 'Perfect balance between slim and straight fit for all-day comfort.' },
  { id: 6, name: 'Wide Leg Jeans', price: '$94.99', description: 'Trendy wide leg design for a bold fashion statement.', featured: true },
  { id: 7, name: 'Distressed Denim', price: '$99.99', description: 'Edgy distressed style with authentic vintage look.' },
  { id: 8, name: 'Black Jeans', price: '$79.99', description: 'Versatile black denim perfect for any occasion.' },
  { id: 9, name: 'Raw Denim', price: '$119.99', description: 'Premium raw denim that ages beautifully with wear.', featured: true },
  { id: 10, name: 'Carpenter Jeans', price: '$89.99', description: 'Functional design with utility pockets and durable construction.' },
  { id: 11, name: 'High-Rise Jeans', price: '$92.99', description: 'Flattering high-rise cut with comfortable stretch fabric.' },
  { id: 12, name: 'Tapered Fit', price: '$87.99', description: 'Modern tapered leg for a contemporary silhouette.' },
]

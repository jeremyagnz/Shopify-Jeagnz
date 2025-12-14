export interface Product {
  id: number
  name: string
  price: string
  description: string
}

export const products: Product[] = [
  { id: 1, name: 'Classic Jeans', price: '$79.99', description: 'Timeless style with a perfect fit.' },
  { id: 2, name: 'Skinny Jeans', price: '$89.99', description: 'Modern slim fit for a sleek look.' },
  { id: 3, name: 'Relaxed Fit', price: '$69.99', description: 'Comfortable and casual for everyday wear.' },
  { id: 4, name: 'Bootcut Jeans', price: '$74.99', description: 'Classic bootcut style for versatile styling.' },
]

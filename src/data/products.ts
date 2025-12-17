export interface Product {
  id: number
  name: string
  price: string
  description: string
  image: string
  featured?: boolean
}

export const products: Product[] = [
  { id: 1, name: 'Classic Jeans', price: '$79.99', description: 'Timeless style with a perfect fit.', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=800&fit=crop', featured: true },
  { id: 2, name: 'Skinny Jeans', price: '$89.99', description: 'Modern slim fit for a sleek look.', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop', featured: true },
  { id: 3, name: 'Relaxed Fit', price: '$69.99', description: 'Comfortable and casual for everyday wear.', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=800&fit=crop' },
  { id: 4, name: 'Bootcut Jeans', price: '$74.99', description: 'Classic bootcut style for versatile styling.', image: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&h=800&fit=crop', featured: true },
  { id: 5, name: 'Slim Straight Jeans', price: '$84.99', description: 'Perfect balance between slim and straight fit for all-day comfort.', image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&h=800&fit=crop' },
  { id: 6, name: 'Wide Leg Jeans', price: '$94.99', description: 'Trendy wide leg design for a bold fashion statement.', image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=800&h=800&fit=crop', featured: true },
  { id: 7, name: 'Distressed Denim', price: '$99.99', description: 'Edgy distressed style with authentic vintage look.', image: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800&h=800&fit=crop' },
  { id: 8, name: 'Black Jeans', price: '$79.99', description: 'Versatile black denim perfect for any occasion.', image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&h=800&fit=crop' },
  { id: 9, name: 'Raw Denim', price: '$119.99', description: 'Premium raw denim that ages beautifully with wear.', image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&h=800&fit=crop', featured: true },
  { id: 10, name: 'Carpenter Jeans', price: '$89.99', description: 'Functional design with utility pockets and durable construction.', image: 'https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=800&h=800&fit=crop' },
  { id: 11, name: 'High-Rise Jeans', price: '$92.99', description: 'Flattering high-rise cut with comfortable stretch fabric.', image: 'https://images.unsplash.com/photo-1578932750355-5eb30ece487a?w=800&h=800&fit=crop' },
  { id: 12, name: 'Tapered Fit', price: '$87.99', description: 'Modern tapered leg for a contemporary silhouette.', image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&h=800&fit=crop' },
  { id: 13, name: 'Vintage Wash Jeans', price: '$109.99', description: 'Authentic vintage wash with unique fading patterns.', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&h=800&fit=crop', featured: true },
  { id: 14, name: 'Jogger Jeans', price: '$94.99', description: 'Comfortable jogger style with elastic cuffs for a modern athleisure look.', image: 'https://images.unsplash.com/photo-1603252110971-b8a57087be18?w=800&h=800&fit=crop' },
  { id: 15, name: 'Cropped Jeans', price: '$84.99', description: 'Trendy cropped length perfect for showing off your favorite sneakers.', image: 'https://images.unsplash.com/photo-1516490701850-8e8c0b48c31c?w=800&h=800&fit=crop' },
  { id: 16, name: 'Ripped Jeans', price: '$99.99', description: 'Stylish distressed details with strategic rips and tears.', image: 'https://images.unsplash.com/photo-1529891693574-c2c5548b6de7?w=800&h=800&fit=crop' },
  { id: 17, name: 'Dark Wash Jeans', price: '$89.99', description: 'Deep indigo color that works for both casual and formal occasions.', image: 'https://images.unsplash.com/photo-1606744888344-493238951221?w=800&h=800&fit=crop' },
  { id: 18, name: 'Light Wash Jeans', price: '$79.99', description: 'Bright, summery light wash perfect for warm weather.', image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&h=800&fit=crop' },
  { id: 19, name: 'Jeggings', price: '$69.99', description: 'Ultimate comfort with stretchy denim that looks like jeans.', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=800&fit=crop' },
  { id: 20, name: 'Boyfriend Jeans', price: '$94.99', description: 'Relaxed, slouchy fit inspired by menswear styles.', image: 'https://images.unsplash.com/photo-1599429310506-967375f620d6?w=800&h=800&fit=crop' },
  { id: 21, name: 'Mom Jeans', price: '$89.99', description: 'High-waisted vintage style with a comfortable relaxed fit.', image: 'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=800&h=800&fit=crop' },
  { id: 22, name: 'Flare Jeans', price: '$99.99', description: 'Retro-inspired flare leg that widens from the knee down.', image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&h=800&fit=crop' },
  { id: 23, name: 'Selvedge Denim', price: '$149.99', description: 'Premium Japanese selvedge denim with signature red line detail.', image: 'https://images.unsplash.com/photo-1542574271-7f3b92e6c821?w=800&h=800&fit=crop', featured: true },
  { id: 24, name: 'Stretch Jeans', price: '$74.99', description: 'Maximum comfort with high-stretch fabric for all-day wear.', image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&h=800&fit=crop' },
]

# 🛒 Carrito de Compras

El carrito de compras es una funcionalidad central de Shopify Jeagnz, proporcionando una experiencia fluida para gestionar productos antes de realizar la compra.

---

## 🎯 Características Principales

### 💾 Persistencia de Datos
- Almacenamiento en `localStorage`
- Carrito persiste entre sesiones
- Se mantiene al recargar la página
- Sincronización automática

### ⚡ Gestión de Productos
- Agregar productos desde cualquier página
- Actualizar cantidades directamente
- Eliminar productos individuales
- Limpiar carrito completo

### 🧮 Cálculos Automáticos
- Subtotal por producto (precio × cantidad)
- Total general del carrito
- Actualización en tiempo real
- Formato de moneda ($XX.XX)

### 🎨 UI Interactiva
- Modal overlay que se abre desde el navbar
- Animaciones de entrada/salida
- Toast notifications para feedback
- Indicador de cantidad en icono del carrito

---

## 🏗️ Arquitectura

### Context Provider

**Archivo:** `src/contexts/CartContext.tsx`

El carrito usa React Context para proporcionar estado global:

```tsx
<CartProvider>
  {/* Toda la app tiene acceso al carrito */}
  <App />
</CartProvider>
```

### Estado del Carrito

```typescript
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  description?: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}
```

---

## 🎨 Componente de Carrito

### Ubicación
**Componente:** `src/components/Cart.tsx`

### Layout del Modal

```
┌────────────────────────────────────┐
│  Shopping Cart              [×]    │
├────────────────────────────────────┤
│                                    │
│  ┌──────┐  Classic Fit Jeans      │
│  │ IMG  │  $89.99                  │
│  └──────┘                          │
│           [-] 2 [+]    Remove      │
│           Subtotal: $179.98        │
│  ──────────────────────────────    │
│  ┌──────┐  Slim Fit Jeans         │
│  │ IMG  │  $79.99                  │
│  └──────┘                          │
│           [-] 1 [+]    Remove      │
│           Subtotal: $79.99         │
│  ──────────────────────────────    │
│                                    │
│  Total Items: 3                    │
│  Total: $259.97                    │
│                                    │
│  ┌────────────────────────────┐   │
│  │   Proceed to Checkout      │   │
│  └────────────────────────────┘   │
│  ┌────────────────────────────┐   │
│  │   Continue Shopping        │   │
│  └────────────────────────────┘   │
│                                    │
└────────────────────────────────────┘
```

### Estados del Carrito

#### Carrito Vacío

```
┌────────────────────────────────────┐
│  Shopping Cart              [×]    │
├────────────────────────────────────┤
│                                    │
│         🛒                         │
│                                    │
│    Your cart is empty!             │
│                                    │
│  ┌────────────────────────────┐   │
│  │   Start Shopping           │   │
│  └────────────────────────────┘   │
│                                    │
└────────────────────────────────────┘
```

#### Carrito con Productos

```
┌────────────────────────────────────┐
│  Shopping Cart (3)          [×]    │
├────────────────────────────────────┤
│  [Scroll Area]                     │
│                                    │
│  • Product 1                       │
│  • Product 2                       │
│  • Product 3                       │
│                                    │
│  ──────────────────────────────    │
│  Total: $259.97                    │
│  [Checkout] [Continue Shopping]   │
└────────────────────────────────────┘
```

### Capturas de Pantalla

> **Prueba el carrito:** [https://shopify-jeagnz.netlify.app/products](https://shopify-jeagnz.netlify.app/products)
> 
> 1. Agrega un producto haciendo clic en "Add to Cart"
> 2. Observa el badge del carrito actualizarse en el navbar
> 3. Haz clic en el icono del carrito para abrir el modal
> 4. Prueba los controles de cantidad (+/-) y el botón "Remove"
> 
> El modal del carrito muestra todos los productos agregados, controles para modificar cantidades, subtotales por producto, total general, y botones para continuar comprando o proceder al checkout.

---

## 📦 Funcionalidades Detalladas

### 1. Agregar al Carrito

**Desde ProductCard o ProductDetail:**

```tsx
const { addToCart } = useCart()

const handleAddToCart = () => {
  addToCart(product)
  // Toast: "Product added to cart!"
}
```

**Comportamiento:**
- Si el producto ya existe, incrementa cantidad
- Si es nuevo, lo agrega con cantidad 1
- Muestra toast de confirmación
- Actualiza contador del icono del carrito

**Lógica Interna:**

```typescript
const addToCart = (product: Product) => {
  setItems(currentItems => {
    const existingItem = currentItems.find(item => item.id === product.id)
    
    if (existingItem) {
      // Incrementar cantidad
      return currentItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      // Agregar nuevo producto
      return [...currentItems, { ...product, quantity: 1 }]
    }
  })
  
  showToast('Product added to cart!', 'success')
}
```

### 2. Actualizar Cantidad

**Controles en el Carrito:**

```
[-] 2 [+]
 ↓   ↓  ↓
Dec Val Inc
```

**Comportamiento:**
- Botón [-]: Decrementa cantidad (mínimo 1)
- Botón [+]: Incrementa cantidad (sin límite)
- Actualización instantánea del subtotal
- Actualización del total general

**Código:**

```typescript
const updateQuantity = (productId: number, quantity: number) => {
  if (quantity < 1) return // No permitir cantidad menor a 1
  
  setItems(currentItems =>
    currentItems.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    )
  )
}
```

### 3. Eliminar Producto

**Botón "Remove":**

```tsx
<button onClick={() => removeFromCart(item.id)}>
  Remove
</button>
```

**Comportamiento:**
- Remueve el producto del carrito
- Muestra toast: "Product removed from cart"
- Actualiza totales automáticamente
- Si era el último producto, muestra estado vacío

**Código:**

```typescript
const removeFromCart = (productId: number) => {
  setItems(currentItems =>
    currentItems.filter(item => item.id !== productId)
  )
  showToast('Product removed from cart', 'info')
}
```

### 4. Limpiar Carrito

**Disponible en:**
- Después de completar una compra
- Opcionalmente como botón manual

```typescript
const clearCart = () => {
  setItems([])
  showToast('Cart cleared', 'info')
}
```

---

## 🔢 Cálculos

### Total de Items

```typescript
const getTotalItems = () => {
  return items.reduce((total, item) => total + item.quantity, 0)
}

// Ejemplo: [{ qty: 2 }, { qty: 1 }, { qty: 3 }]
// Total: 2 + 1 + 3 = 6 items
```

### Precio Total

```typescript
const getTotalPrice = () => {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
}

// Ejemplo:
// Item 1: $89.99 × 2 = $179.98
// Item 2: $79.99 × 1 = $79.99
// Total: $259.97
```

### Formato de Moneda

```typescript
const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`
}

// Ejemplos:
// 89.99 → "$89.99"
// 100   → "$100.00"
// 259.9654 → "$259.97"
```

---

## 🎨 Componentes Visuales

### Icono del Carrito (Navbar)

```tsx
┌──────────┐
│  🛒 (3)  │ ← Número de items
└──────────┘
```

**Características:**
- Icono SVG de carrito de compras
- Badge con número de items totales
- Click abre el modal del carrito
- Badge rojo con texto blanco
- Animación en hover

**Código:**

```tsx
<button onClick={openCart} className="relative">
  <ShoppingCartIcon className="w-6 h-6" />
  {getTotalItems() > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
      {getTotalItems()}
    </span>
  )}
</button>
```

### Modal del Carrito

**Overlay:**
- Fondo semitransparente negro (bg-black/50)
- Cierra al hacer click fuera del modal
- Animación de fade-in/fade-out

**Panel:**
- Desliza desde la derecha
- Ancho fijo en desktop (400px)
- Ancho completo en mobile
- Scroll interno para muchos productos
- Sombra elevada

### Tarjeta de Producto en Carrito

```
┌────────────────────────────────┐
│  ┌────┐  Classic Fit Jeans    │
│  │IMG │  $89.99                │
│  └────┘                        │
│                                │
│  [-] 2 [+]         [Remove]   │
│  Subtotal: $179.98             │
└────────────────────────────────┘
```

**Elementos:**
- Thumbnail de imagen (80x80px)
- Nombre del producto
- Precio unitario
- Controles de cantidad
- Botón eliminar
- Subtotal calculado

---

## 💾 Persistencia en localStorage

### Almacenamiento

```typescript
// Al actualizar el carrito
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(items))
}, [items])
```

### Carga Inicial

```typescript
// Al montar el componente
useEffect(() => {
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    setItems(JSON.parse(savedCart))
  }
}, [])
```

### Estructura en localStorage

```json
{
  "cart": [
    {
      "id": 1,
      "name": "Classic Fit Jeans",
      "price": 89.99,
      "quantity": 2,
      "description": "..."
    },
    {
      "id": 5,
      "name": "Slim Fit Jeans",
      "price": 79.99,
      "quantity": 1,
      "description": "..."
    }
  ]
}
```

---

## 🔔 Notificaciones Toast

### Eventos que Disparan Toasts

| Acción | Mensaje | Tipo |
|--------|---------|------|
| Agregar al carrito | "Product added to cart!" | success ✅ |
| Remover producto | "Product removed from cart" | info ℹ️ |
| Limpiar carrito | "Cart cleared" | info ℹ️ |
| Ir a checkout | "Redirecting to checkout..." | info ℹ️ |

### Configuración

```typescript
showToast(message: string, type: 'success' | 'error' | 'info')
```

**Características:**
- Auto-dismiss en 3 segundos
- Posición fixed top-right
- Animación de slide-in
- Colores según tipo
- Stack múltiples toasts

---

## 🔄 Flujo de Usuario

### Agregar Producto

```mermaid
1. Usuario navega productos
   ↓
2. Click en "Add to Cart"
   ↓
3. Toast: "Product added to cart!"
   ↓
4. Badge del carrito se actualiza: (1) → (2)
   ↓
5. Producto disponible en carrito
```

### Modificar Cantidad

```mermaid
1. Usuario abre carrito
   ↓
2. Click en [+] o [-]
   ↓
3. Cantidad se actualiza instantáneamente
   ↓
4. Subtotal recalcula
   ↓
5. Total general recalcula
   ↓
6. localStorage se actualiza
```

### Proceder al Checkout

```mermaid
1. Usuario revisa carrito
   ↓
2. Click en "Proceed to Checkout"
   ↓
3. Toast: "Redirecting to checkout..."
   ↓
4. Carrito se cierra (onClose)
   ↓
5. Loading spinner aparece
   ↓
6. Navegación a /checkout
```

---

## 📱 Responsive Design

### Desktop (≥768px)

- Modal ancho fijo: 400px
- Desliza desde la derecha
- Overlay cubre toda la pantalla
- Scroll interno si muchos productos

### Mobile (<768px)

- Modal ancho completo
- Desliza desde la derecha
- Overlay cubre toda la pantalla
- Controles más grandes para touch
- Stack vertical de productos

### Tablet (768px - 1024px)

- Modal ancho: 500px
- Similar a desktop
- Optimizado para touch

---

## 🧪 Testing

### Test Cases

1. **Agregar producto**
   - ✅ Producto se agrega con cantidad 1
   - ✅ Si ya existe, incrementa cantidad
   - ✅ Toast de confirmación aparece
   - ✅ Badge del carrito se actualiza

2. **Actualizar cantidad**
   - ✅ Botón [+] incrementa correctamente
   - ✅ Botón [-] decrementa hasta 1 (no 0)
   - ✅ Subtotal recalcula
   - ✅ Total general recalcula

3. **Remover producto**
   - ✅ Producto se elimina del carrito
   - ✅ Toast de confirmación
   - ✅ Totales se actualizan
   - ✅ Si carrito queda vacío, muestra mensaje

4. **Persistencia**
   - ✅ Carrito persiste al recargar página
   - ✅ localStorage se actualiza en cada cambio
   - ✅ Datos se restauran correctamente

5. **Modal**
   - ✅ Abre al click en icono
   - ✅ Cierra al click en overlay
   - ✅ Cierra al click en botón [×]
   - ✅ Cierra al ir a checkout

---

## 💡 Tips para Desarrolladores

### Usar el Hook del Carrito

```tsx
import { useCart } from '../contexts/CartContext'

function MyComponent() {
  const {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice
  } = useCart()
  
  // Usar las funciones...
}
```

### Validaciones Personalizadas

```typescript
// Limitar cantidad máxima
const MAX_QUANTITY = 10

const handleIncrement = (item: CartItem) => {
  if (item.quantity < MAX_QUANTITY) {
    updateQuantity(item.id, item.quantity + 1)
  } else {
    showToast('Maximum quantity reached', 'error')
  }
}
```

### Agregar Descuentos

```typescript
const getTotalPrice = () => {
  const subtotal = items.reduce((total, item) => 
    total + (item.price * item.quantity), 0
  )
  
  // Aplicar descuento del 10% si total > $200
  const discount = subtotal > 200 ? subtotal * 0.1 : 0
  
  return subtotal - discount
}
```

---

## 🔗 Integración con Checkout

El carrito se integra directamente con la página de checkout:

```tsx
// En Checkout.tsx
const { items, clearCart } = useCart()

const handlePlaceOrder = async () => {
  // Procesar orden con items
  const order = {
    items,
    total: getTotalPrice(),
    date: new Date()
  }
  
  // Limpiar carrito después de orden exitosa
  clearCart()
  
  // Navegar a confirmación
  navigate('/order-confirmation')
}
```

---

## ✅ Siguiente Paso

Continúa explorando:

- **[💳 Checkout](Checkout.md)** - Proceso de compra completo
- **[📱 Productos](Products.md)** - Catálogo de productos
- **[🏗️ Arquitectura](Architecture.md)** - Detalles técnicos

---

*Última actualización: Diciembre 2024*

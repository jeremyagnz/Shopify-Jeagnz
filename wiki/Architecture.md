# 🏗️ Arquitectura del Proyecto

Este documento describe la arquitectura técnica de Shopify Jeagnz, los patrones de diseño implementados, y las decisiones arquitectónicas clave para colaboradores y desarrolladores.

---

## 📐 Arquitectura General

### Diagrama de Alto Nivel

```
┌─────────────────────────────────────────────────┐
│                    Cliente                      │
│              (React SPA - Vite)                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Pages   │  │Components│  │ Contexts │    │
│  └─────┬────┘  └─────┬────┘  └─────┬────┘    │
│        │             │              │          │
│        └─────────────┴──────────────┘          │
│                      │                          │
│              ┌───────▼────────┐                │
│              │   Services     │                │
│              │   (API Layer)  │                │
│              └───────┬────────┘                │
└──────────────────────┼─────────────────────────┘
                       │
                       │ HTTP/REST
                       │
┌──────────────────────▼─────────────────────────┐
│            Netlify Functions                    │
│              (Serverless)                       │
├─────────────────────────────────────────────────┤
│  ┌──────────────┐       ┌──────────────┐      │
│  │  /api/...    │       │  /api/docs   │      │
│  │  (CRUD)      │       │  (OpenAPI)   │      │
│  └──────────────┘       └──────────────┘      │
└─────────────────────────────────────────────────┘
                       │
                       │ (Opcional)
                       │
┌──────────────────────▼─────────────────────────┐
│              MongoDB Atlas                      │
│            (Base de Datos)                      │
└─────────────────────────────────────────────────┘
```

---

## 🗂️ Estructura del Proyecto

### Organización de Carpetas

```
Shopify-Jeagnz/
│
├── src/                          # Código fuente del frontend
│   ├── components/               # Componentes reutilizables
│   │   ├── Layout.tsx           # Layout principal con navbar/footer
│   │   ├── Navbar.tsx           # Barra de navegación
│   │   ├── Footer.tsx           # Pie de página
│   │   ├── Cart.tsx             # Modal del carrito
│   │   ├── ProductCard.tsx      # Tarjeta de producto
│   │   ├── ProductGrid.tsx      # Grid responsive de productos
│   │   ├── ProductForm.tsx      # Formulario CRUD de productos
│   │   ├── SearchBar.tsx        # Barra de búsqueda
│   │   ├── Hero.tsx             # Sección hero
│   │   ├── Logo.tsx             # Logo de la marca
│   │   ├── Button.tsx           # Botón reutilizable
│   │   ├── Toast.tsx            # Notificación toast
│   │   ├── ToastContainer.tsx   # Contenedor de toasts
│   │   ├── LoadingBanner.tsx    # Banner de carga
│   │   ├── ErrorBanner.tsx      # Banner de error
│   │   └── ProductSkeleton.tsx  # Skeleton screen
│   │
│   ├── contexts/                # React Context API
│   │   ├── CartContext.tsx      # Estado global del carrito
│   │   ├── ToastContext.tsx     # Sistema de notificaciones
│   │   └── ThemeContext.tsx     # Tema oscuro/claro
│   │
│   ├── pages/                   # Componentes de páginas
│   │   ├── Home.tsx             # Página de inicio
│   │   ├── Products.tsx         # Catálogo de productos
│   │   ├── ProductDetail.tsx    # Detalle de producto
│   │   ├── Checkout.tsx         # Proceso de pago
│   │   ├── Admin.tsx            # Panel administrativo
│   │   ├── About.tsx            # Acerca de
│   │   └── Contact.tsx          # Contacto
│   │
│   ├── hooks/                   # Custom hooks
│   │   └── useProducts.ts       # Hook para gestión de productos
│   │
│   ├── services/                # Servicios y API
│   │   ├── api.ts               # Cliente API genérico
│   │   └── productApi.ts        # API específica de productos
│   │
│   ├── types/                   # Definiciones TypeScript
│   │   └── index.ts             # Interfaces y tipos
│   │
│   ├── data/                    # Datos estáticos
│   │   └── products.ts          # Mock data de productos
│   │
│   ├── utils/                   # Funciones utilitarias
│   │
│   ├── main.tsx                 # Punto de entrada
│   └── index.css                # Estilos globales
│
├── netlify/                     # Funciones serverless
│   └── functions/
│       ├── api.ts              # Endpoints REST API
│       └── docs.ts             # Documentación OpenAPI
│
├── server/                      # Servidor Express standalone (opcional)
│   ├── index.ts                # Entry point del servidor
│   ├── README.md               # Documentación del servidor
│   └── TESTING_GUIDE.md        # Guía de testing
│
├── screenshots/                 # Capturas de pantalla
├── wiki/                        # Documentación del Wiki
├── public/                      # Assets públicos
│
├── package.json                 # Dependencias npm
├── tsconfig.json               # Config TypeScript
├── vite.config.ts              # Config Vite
├── netlify.toml                # Config Netlify
├── tailwind.config.js          # Config Tailwind (si aplica)
└── README.md                    # Documentación principal
```

---

## ⚛️ Capa de Frontend

### React + TypeScript

**Versión:** React 19, TypeScript 5.9

**Características:**
- Componentes funcionales con hooks
- Type-safety completo
- Props tipadas
- Interfaces bien definidas

### Patrón de Componentes

#### 1. Smart Components (Pages)

```typescript
// src/pages/Products.tsx
export default function Products() {
  // Lógica de negocio
  const { products, isLoading, error } = useProducts()
  const [searchQuery, setSearchQuery] = useState('')
  
  // Procesamiento de datos
  const filteredProducts = useMemo(() => {
    return products.filter(/* ... */)
  }, [products, searchQuery])
  
  // Render con presentational components
  return (
    <div>
      <SearchBar onSearchChange={setSearchQuery} />
      <ProductGrid products={filteredProducts} />
    </div>
  )
}
```

**Responsabilidades:**
- Gestión de estado
- Lógica de negocio
- Llamadas a APIs
- Efectos secundarios

#### 2. Dumb Components (Components)

```typescript
// src/components/ProductCard.tsx
interface ProductCardProps {
  id: number
  name: string
  price: number
  description: string
  featured?: boolean
  onAddToCart: () => void
}

export default function ProductCard(props: ProductCardProps) {
  // Solo presentación, sin lógica de negocio
  return (
    <div className="product-card">
      {/* Render */}
    </div>
  )
}
```

**Responsabilidades:**
- Presentación pura
- Recibe datos vía props
- Emite eventos hacia arriba
- Reutilizable

---

## 🔄 Gestión de Estado

### React Context API

#### 1. CartContext

```typescript
// src/contexts/CartContext.tsx
interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export function CartProvider({ children }: Props) {
  const [items, setItems] = useState<CartItem[]>([])
  
  // Persistencia en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])
  
  // Métodos de gestión...
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
```

**Ventajas:**
- Estado global simple
- No requiere Redux
- Fácil de entender
- Perfecto para app de tamaño medio

#### 2. ThemeContext

```typescript
// src/contexts/ThemeContext.tsx
export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  
  useEffect(() => {
    // Aplicar clase al document
    document.documentElement.classList.toggle('dark', theme === 'dark')
    
    // Persistir en localStorage
    localStorage.setItem('theme', theme)
  }, [theme])
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

#### 3. ToastContext

```typescript
// src/contexts/ToastContext.tsx
export function ToastProvider({ children }: Props) {
  const [toasts, setToasts] = useState<Toast[]>([])
  
  const showToast = (message: string, type: ToastType) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    
    // Auto-dismiss en 3 segundos
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }
  
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}
```

---

## 🎣 Custom Hooks

### useProducts Hook

**Archivo:** `src/hooks/useProducts.ts`

```typescript
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const fetchProducts = async () => {
    try {
      // 1. Verificar caché
      const cached = getCachedProducts()
      if (cached) {
        setProducts(cached)
        setIsLoading(false)
        return
      }
      
      // 2. Fetch desde API
      const data = await productApi.getAll()
      setProducts(data)
      
      // 3. Actualizar caché
      setCachedProducts(data)
      
    } catch (err) {
      // 4. Fallback a datos estáticos
      setProducts(staticProducts)
      setError('Using static data')
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    fetchProducts()
  }, [])
  
  return { products, isLoading, error, refetch: fetchProducts }
}
```

**Características:**
- Caché con TTL (5 minutos)
- Retry con exponential backoff
- Fallback a datos estáticos
- Toast notifications

---

## 🌐 Capa de Servicios

### API Client Genérico

**Archivo:** `src/services/api.ts`

```typescript
const API_BASE_URL = '/.netlify/functions'
const TIMEOUT = 10000

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)
    
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      return await response.json()
    } finally {
      clearTimeout(timeoutId)
    }
  }
  
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }
  
  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  
  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }
  
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const api = new ApiClient()
```

### Product API

**Archivo:** `src/services/productApi.ts`

```typescript
export const productApi = {
  async getAll(): Promise<Product[]> {
    const response = await api.get<ApiResponse<Product[]>>('/api/products')
    return response.data
  },
  
  async getById(id: number): Promise<Product> {
    const response = await api.get<ApiResponse<Product>>(`/api/products/${id}`)
    return response.data
  },
  
  async create(product: Partial<Product>): Promise<Product> {
    const response = await api.post<ApiResponse<Product>>('/api/products', product)
    return response.data
  },
  
  async update(id: number, product: Partial<Product>): Promise<Product> {
    const response = await api.put<ApiResponse<Product>>(`/api/products/${id}`, product)
    return response.data
  },
  
  async delete(id: number): Promise<void> {
    await api.delete(`/api/products/${id}`)
  }
}
```

---

## ☁️ Serverless Functions (Netlify)

### API Function

**Archivo:** `netlify/functions/api.ts`

```typescript
import { Handler } from '@netlify/functions'

const products: Product[] = [ /* mock data */ ]

export const handler: Handler = async (event, context) => {
  const path = event.path.replace('/.netlify/functions/api', '')
  const method = event.httpMethod
  
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
  
  try {
    // GET /api/products
    if (method === 'GET' && path === '/products') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: products
        })
      }
    }
    
    // GET /api/products/:id
    if (method === 'GET' && path.match(/^\/products\/\d+$/)) {
      const id = parseInt(path.split('/')[2])
      const product = products.find(p => p.id === id)
      
      if (!product) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Product not found'
          })
        }
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: product
        })
      }
    }
    
    // POST /api/products
    if (method === 'POST' && path === '/products') {
      const newProduct = JSON.parse(event.body || '{}')
      const product = {
        id: products.length + 1,
        ...newProduct
      }
      products.push(product)
      
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          data: product
        })
      }
    }
    
    // PUT /api/products/:id
    if (method === 'PUT' && path.match(/^\/products\/\d+$/)) {
      const id = parseInt(path.split('/')[2])
      const updates = JSON.parse(event.body || '{}')
      const index = products.findIndex(p => p.id === id)
      
      if (index === -1) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Product not found'
          })
        }
      }
      
      products[index] = { ...products[index], ...updates }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: products[index]
        })
      }
    }
    
    // DELETE /api/products/:id
    if (method === 'DELETE' && path.match(/^\/products\/\d+$/)) {
      const id = parseInt(path.split('/')[2])
      const index = products.findIndex(p => p.id === id)
      
      if (index === -1) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Product not found'
          })
        }
      }
      
      products.splice(index, 1)
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Product deleted'
        })
      }
    }
    
    // Route not found
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Not found'
      })
    }
    
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Internal server error'
      })
    }
  }
}
```

---

## 🎨 Diseño y Estilos

### Tailwind CSS

**Configuración:** `src/index.css`

```css
@import "tailwindcss";

@theme {
  /* Breakpoints personalizados */
  --breakpoint-xs: 475px;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
  
  /* Colores personalizados */
  --color-primary: #6366f1;
  --color-secondary: #f59e0b;
  --color-accent: #10b981;
}
```

### Mobile-First Approach

```tsx
// Ejemplo de componente responsive
<div className="
  grid 
  grid-cols-1           {/* Mobile: 1 columna */}
  xs:grid-cols-2        {/* Extra small: 2 columnas */}
  md:grid-cols-3        {/* Medium: 3 columnas */}
  lg:grid-cols-4        {/* Large: 4 columnas */}
  gap-4 
  sm:gap-6
">
  {products.map(product => (
    <ProductCard key={product.id} {...product} />
  ))}
</div>
```

### Dark Mode

```tsx
// Toggle de tema
<button onClick={toggleTheme}>
  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
</button>

// Estilos con soporte dark mode
<div className="
  bg-white 
  dark:bg-slate-800 
  text-slate-900 
  dark:text-white
">
  {/* Content */}
</div>
```

---

## 🔐 Patrones de Seguridad

### Validación de Entrada

```typescript
// Validación de precio
const PRICE_FORMAT_REGEX = /^\$\d+(\.\d{2})?$/

const validatePrice = (price: string): boolean => {
  return PRICE_FORMAT_REGEX.test(price)
}
```

### Sanitización

```typescript
// Sanitizar input del usuario
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Prevenir XSS básico
    .substring(0, 1000) // Limitar longitud
}
```

### CORS

```typescript
// Headers CORS en Netlify Functions
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}
```

---

## ⚡ Optimizaciones de Rendimiento

### 1. Code Splitting

```typescript
// React Router lazy loading
const Admin = lazy(() => import('./pages/Admin'))
const Checkout = lazy(() => import('./pages/Checkout'))

<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/admin" element={<Admin />} />
    <Route path="/checkout" element={<Checkout />} />
  </Routes>
</Suspense>
```

### 2. Memoización

```typescript
// useMemo para cálculos costosos
const filteredProducts = useMemo(() => {
  return products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
}, [products, searchQuery])

// useCallback para funciones
const handleAddToCart = useCallback((product: Product) => {
  addToCart(product)
}, [addToCart])
```

### 3. Debouncing

```typescript
// Debounce en búsqueda
const [searchQuery, setSearchQuery] = useState('')
const [debouncedQuery, setDebouncedQuery] = useState('')

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedQuery(searchQuery)
  }, 300) // 300ms delay
  
  return () => clearTimeout(timer)
}, [searchQuery])
```

### 4. Caché con localStorage

```typescript
const CACHE_KEY = 'products_cache'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutos

const getCachedProducts = (): Product[] | null => {
  const cached = localStorage.getItem(CACHE_KEY)
  if (!cached) return null
  
  const { data, timestamp } = JSON.parse(cached)
  
  // Verificar TTL
  if (Date.now() - timestamp > CACHE_TTL) {
    localStorage.removeItem(CACHE_KEY)
    return null
  }
  
  return data
}

const setCachedProducts = (products: Product[]) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data: products,
    timestamp: Date.now()
  }))
}
```

---

## 🧪 Testing

### Estructura de Tests

```
tests/
├── unit/
│   ├── components/
│   │   ├── ProductCard.test.tsx
│   │   └── Cart.test.tsx
│   ├── hooks/
│   │   └── useProducts.test.ts
│   └── utils/
│       └── validation.test.ts
├── integration/
│   ├── cart-flow.test.tsx
│   └── checkout-flow.test.tsx
└── e2e/
    ├── user-journey.spec.ts
    └── admin-crud.spec.ts
```

### Ejemplo con Playwright

```typescript
// tests/e2e/user-journey.spec.ts
import { test, expect } from '@playwright/test'

test('complete purchase flow', async ({ page }) => {
  // 1. Navegar a productos
  await page.goto('/products')
  
  // 2. Agregar producto al carrito
  await page.click('[data-testid="add-to-cart-1"]')
  await expect(page.locator('[data-testid="cart-badge"]')).toHaveText('1')
  
  // 3. Abrir carrito
  await page.click('[data-testid="cart-icon"]')
  await expect(page.locator('[data-testid="cart-modal"]')).toBeVisible()
  
  // 4. Proceder a checkout
  await page.click('[data-testid="checkout-button"]')
  await expect(page).toHaveURL('/checkout')
  
  // 5. Llenar formulario
  await page.fill('[name="fullName"]', 'John Doe')
  await page.fill('[name="email"]', 'john@example.com')
  // ...más campos
  
  // 6. Enviar orden
  await page.click('[data-testid="place-order"]')
  await expect(page.locator('.toast')).toContainText('Order placed successfully')
})
```

---

## 📦 Deployment

### Netlify

**Configuración:** `netlify.toml`

```toml
[build]
  command = "npm run build"
  functions = "netlify/functions"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[dev]
  command = "npm run dev"
  port = 5173
  targetPort = 5173
```

### Variables de Entorno

```bash
# Netlify Dashboard → Site settings → Environment variables
NODE_VERSION=20
VITE_API_URL=/.netlify/functions
```

### CI/CD Pipeline

```
1. Push to GitHub
   ↓
2. Netlify detecta cambios
   ↓
3. npm install
   ↓
4. npm run build
   ↓
5. Deploy a producción
   ↓
6. Disponible en URL
```

---

## 💡 Decisiones Arquitectónicas

### ¿Por qué React Context en lugar de Redux?

- ✅ App de tamaño medio
- ✅ Estado simple
- ✅ Menos boilerplate
- ✅ Más fácil de mantener
- ✅ Performance adecuada

### ¿Por qué Netlify Functions?

- ✅ Serverless (sin servidor que mantener)
- ✅ Escala automáticamente
- ✅ Deploy integrado con frontend
- ✅ HTTPS gratuito
- ✅ CDN global

### ¿Por qué Tailwind CSS?

- ✅ Utility-first approach
- ✅ No CSS custom innecesario
- ✅ Tree-shaking automático
- ✅ Dark mode integrado
- ✅ Responsive design fácil

### ¿Por qué TypeScript?

- ✅ Type safety
- ✅ Mejor autocompletado
- ✅ Menos bugs en runtime
- ✅ Mejor refactoring
- ✅ Documentación implícita

---

## 🔗 Recursos Adicionales

### Documentación

- [React 19 Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)

### Herramientas

- [React DevTools](https://react.dev/learn/react-developer-tools)
- [VS Code](https://code.visualstudio.com/)
- [Playwright](https://playwright.dev/)

---

## ✅ Siguiente Paso

Continúa explorando:

- **[🤝 Contribuir](Contributing.md)** - Guía para contribuir al proyecto
- **[📦 Instalación](Installation.md)** - Setup del entorno de desarrollo
- **[📱 Productos](Products.md)** - Documentación de productos

---

*Última actualización: Diciembre 2024*

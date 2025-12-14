# 📱 Catálogo de Productos

El módulo de productos es el corazón de Shopify Jeagnz, proporcionando una experiencia de navegación fluida y moderna para explorar el catálogo de jeans premium.

---

## 🎯 Características Principales

### 🔍 Búsqueda Inteligente
- Búsqueda en tiempo real por nombre y descripción
- Debounce de 300ms para optimizar rendimiento
- Resaltado visual de productos coincidentes
- Sin resultados necesita recarga de página

### 📊 Grid Responsivo
- **Mobile (< 475px):** 1 columna
- **Small (475px - 768px):** 2 columnas
- **Medium (768px - 1024px):** 3 columnas
- **Large (1024px+):** 4 columnas

### ⚡ Carga Optimizada
- Skeleton screens durante la carga
- Caché en localStorage (5 minutos TTL)
- Fallback a datos estáticos si API falla
- Manejo de cold-start de funciones serverless

### 🎨 UI/UX
- Tarjetas de producto con hover effects
- Badges para productos destacados
- Imágenes con aspect ratio cuadrado
- Botones de "Agregar al carrito" con iconos

---

## 📄 Página de Productos

### Ubicación
**Ruta:** `/products`  
**Componente:** `src/pages/Products.tsx`

### Estructura Visual

```
┌─────────────────────────────────────────┐
│  Navbar (Logo, Buscar, Carrito, Tema)  │
├─────────────────────────────────────────┤
│                                         │
│  ┌────────────────────────────────┐    │
│  │  🔍 Buscar productos...        │    │
│  └────────────────────────────────┘    │
│                                         │
│  ┌────────┐ ┌────────┐ ┌────────┐     │
│  │ Jeans  │ │ Jeans  │ │ Jeans  │     │
│  │  $89   │ │  $79   │ │  $99   │     │
│  │ [Cart] │ │ [Cart] │ │ [Cart] │     │
│  └────────┘ └────────┘ └────────┘     │
│                                         │
│  ┌────────┐ ┌────────┐ ┌────────┐     │
│  │ Jeans  │ │ Jeans  │ │ Jeans  │     │
│  │  $69   │ │  $109  │ │  $85   │     │
│  │ [Cart] │ │ [Cart] │ │ [Cart] │     │
│  └────────┘ └────────┘ └────────┘     │
│                                         │
├─────────────────────────────────────────┤
│  Footer                                 │
└─────────────────────────────────────────┘
```

### Capturas de Pantalla

![Products Grid](https://via.placeholder.com/800x600/6366f1/ffffff?text=Products+Grid+View)
*Vista del grid de productos con 4 columnas en desktop*

![Products Search](https://via.placeholder.com/800x400/6366f1/ffffff?text=Search+Products)
*Barra de búsqueda con filtrado en tiempo real*

---

## 🛍️ Tarjeta de Producto (ProductCard)

### Componente
**Archivo:** `src/components/ProductCard.tsx`

### Elementos de la Tarjeta

```tsx
┌─────────────────────────┐
│ ⭐ FEATURED            │ ← Badge (si aplica)
│                         │
│   ┌───────────────┐    │
│   │               │    │
│   │    Imagen     │    │ ← Aspect square
│   │               │    │
│   └───────────────┘    │
│                         │
│  Classic Fit Jeans      │ ← Nombre
│  $89.99                 │ ← Precio
│                         │
│  Perfect for everyday   │ ← Descripción
│  wear...                │
│                         │
│  ┌──────────────────┐  │
│  │  🛒 Add to Cart  │  │ ← Botón de acción
│  └──────────────────┘  │
└─────────────────────────┘
```

### Características Visuales

- **Borde redondeado:** `rounded-2xl`
- **Sombra:** Sutil en reposo, elevada en hover
- **Animación:** Escala 1.05 en botón hover
- **Badge destacado:** Fondo dorado con role="status"
- **Icono carrito:** En el botón de acción
- **Colores:** Adaptan a modo oscuro/claro

### Código de Ejemplo

```tsx
<ProductCard
  id={1}
  name="Classic Fit Jeans"
  price={89.99}
  description="Perfect for everyday wear"
  featured={true}
  image="/images/product.jpg"
  onAddToCart={handleAddToCart}
/>
```

---

## 📋 Vista Detallada de Producto

### Ubicación
**Ruta:** `/products/:id`  
**Componente:** `src/pages/ProductDetail.tsx`

### Layout Desktop

```
┌────────────────────────────────────────────┐
│  ← Back to Products                        │
├────────────────────────────────────────────┤
│                                            │
│  ┌──────────────┐  Classic Fit Jeans     │
│  │              │                          │
│  │              │  $89.99                  │
│  │    Imagen    │                          │
│  │   Grande     │  Perfect for everyday   │
│  │              │  wear. These classic    │
│  │              │  fit jeans...           │
│  └──────────────┘                          │
│                   ┌────────────────────┐  │
│                   │ 🛒 Add to Cart     │  │
│                   └────────────────────┘  │
│                                            │
└────────────────────────────────────────────┘
```

### Layout Mobile

```
┌────────────────────┐
│ ← Back to Products │
├────────────────────┤
│                    │
│  ┌──────────────┐ │
│  │              │ │
│  │    Imagen    │ │
│  │              │ │
│  └──────────────┘ │
│                    │
│  Classic Fit Jeans│
│                    │
│  $89.99            │
│                    │
│  Perfect for       │
│  everyday wear...  │
│                    │
│  ┌──────────────┐ │
│  │🛒Add to Cart │ │
│  └──────────────┘ │
│                    │
└────────────────────┘
```

### Características

- **Navegación:** Botón "← Back to Products" con animación
- **Layout flex:** Imagen a la izquierda, detalles a la derecha (desktop)
- **Stack vertical:** En dispositivos móviles
- **Imagen grande:** Hasta 500px de ancho
- **Descripción completa:** Texto sin truncar
- **Botón prominente:** Grande y centrado en mobile

### Capturas de Pantalla

![Product Detail Desktop](https://via.placeholder.com/800x500/6366f1/ffffff?text=Product+Detail+Desktop)
*Vista detallada en desktop con layout horizontal*

![Product Detail Mobile](https://via.placeholder.com/400x700/6366f1/ffffff?text=Product+Detail+Mobile)
*Vista detallada en mobile con layout vertical*

---

## 🔍 Búsqueda de Productos

### Componente SearchBar
**Archivo:** `src/components/SearchBar.tsx`

### Funcionalidades

1. **Input con Debounce**
   - Espera 300ms después de que el usuario deja de escribir
   - Reduce llamadas innecesarias
   - Optimizado con `useCallback` y `useMemo`

2. **Filtrado por:**
   - Nombre del producto
   - Descripción del producto
   - Case-insensitive

3. **Experiencia de Usuario**
   - Placeholder: "Buscar productos..."
   - Icono de búsqueda (🔍)
   - Botón de limpiar (×) cuando hay texto
   - Borde resaltado en focus

### Código de Implementación

```tsx
// Uso básico
<SearchBar
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
  placeholder="Buscar productos..."
/>

// La búsqueda filtra automáticamente
const filteredProducts = useMemo(() => {
  return products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )
}, [products, searchQuery])
```

---

## 📊 Datos de Productos

### Estructura de Datos

```typescript
interface Product {
  id: number
  name: string
  price: number
  description: string
  featured?: boolean
  image?: string
}
```

### Ejemplo de Producto

```json
{
  "id": 1,
  "name": "Classic Fit Jeans",
  "price": 89.99,
  "description": "Perfect for everyday wear. These classic fit jeans feature a timeless design.",
  "featured": true
}
```

### Catálogo Actual

El catálogo incluye **24 productos** de jeans con variedad de estilos:

- Classic Fit
- Slim Fit
- Straight Leg
- Bootcut
- Skinny Fit
- Relaxed Fit
- Y más...

### Productos Destacados

Los productos marcados con `featured: true` aparecen:
- En la página de inicio (Home)
- Con un badge dorado "⭐ FEATURED"
- Destacados visualmente en el grid

---

## 🔄 Carga de Datos

### Flujo de Datos

```
1. useProducts Hook
   ↓
2. Verificar localStorage cache
   ↓
3. Si cache válido (< 5 min) → Usar cache
   ↓
4. Si no → Fetch API /api/products
   ↓
5. API timeout 10s, 2 retries
   ↓
6. Si falla → Fallback a datos estáticos
   ↓
7. Actualizar cache
   ↓
8. Mostrar productos
```

### Estados de Carga

#### 1. Loading State
```tsx
{isLoading && <ProductSkeleton count={8} />}
```
- Muestra skeleton screens
- 8 tarjetas placeholder
- Animación de pulse

#### 2. Error State
```tsx
{error && (
  <ErrorBanner
    message={error}
    onRetry={refetch}
  />
)}
```
- Banner rojo con mensaje
- Botón de "Retry"
- Detalles del error

#### 3. Success State
```tsx
{products.map(product => (
  <ProductCard key={product.id} {...product} />
))}
```
- Grid de productos
- Totalmente interactivo

### Custom Hook: useProducts

**Archivo:** `src/hooks/useProducts.ts`

```typescript
const { products, isLoading, error, refetch } = useProducts()
```

**Características:**
- Caché inteligente con TTL
- Retry automático con backoff exponencial
- Fallback a datos estáticos
- Toast notifications para feedback

---

## 🎨 Estilos y Temas

### Modo Claro

```css
/* Tarjeta de producto */
bg-white
text-slate-900
border-slate-200
hover:shadow-lg

/* Badge destacado */
bg-amber-500
text-white
```

### Modo Oscuro

```css
/* Tarjeta de producto */
dark:bg-slate-800
dark:text-white
dark:border-slate-700
dark:hover:shadow-xl

/* Badge destacado */
dark:bg-amber-600
dark:text-slate-900
```

### Animaciones

```css
/* Hover en tarjeta */
transition-shadow duration-300

/* Hover en botón */
transform scale-105
transition-transform duration-200

/* Skeleton loading */
animate-pulse
```

---

## 📱 Responsive Design

### Breakpoints Utilizados

```css
/* Mobile-first base */
grid-cols-1

/* Extra small: 475px+ */
xs:grid-cols-2

/* Medium: 768px+ */
md:grid-cols-3

/* Large: 1024px+ */
lg:grid-cols-4

/* Gaps responsivos */
gap-4 sm:gap-6
```

### Testing en Dispositivos

| Dispositivo | Resolución | Columnas | Gap |
|-------------|------------|----------|-----|
| iPhone SE | 375x667 | 1 | 4 |
| iPhone 12 | 390x844 | 1 | 4 |
| iPad Mini | 768x1024 | 3 | 6 |
| iPad Pro | 1024x1366 | 4 | 6 |
| Desktop | 1920x1080 | 4 | 6 |

---

## 🧪 Testing

### Test Cases

1. **Carga inicial**
   - ✅ Productos se cargan correctamente
   - ✅ Skeleton aparece durante carga
   - ✅ Grid tiene layout correcto

2. **Búsqueda**
   - ✅ Filtrado funciona en tiempo real
   - ✅ Debounce funciona (300ms)
   - ✅ Búsqueda case-insensitive

3. **Navegación**
   - ✅ Click en tarjeta navega a detalle
   - ✅ Botón "Add to Cart" funciona
   - ✅ Back button regresa correctamente

4. **Responsive**
   - ✅ Mobile muestra 1 columna
   - ✅ Desktop muestra 4 columnas
   - ✅ Transiciones suaves entre breakpoints

---

## 🔗 APIs y Endpoints

### GET /api/products

**Descripción:** Obtiene todos los productos

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Classic Fit Jeans",
      "price": 89.99,
      "description": "...",
      "featured": true
    }
  ]
}
```

### GET /api/products/:id

**Descripción:** Obtiene un producto específico

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Classic Fit Jeans",
    "price": 89.99,
    "description": "...",
    "featured": true
  }
}
```

---

## 💡 Tips para Desarrolladores

### Agregar un Nuevo Producto

1. Edita `src/data/products.ts`:
```typescript
{
  id: 25, // Siguiente ID disponible
  name: "Nuevo Estilo",
  price: 99.99,
  description: "Descripción del producto",
  featured: false
}
```

2. La imagen se generará automáticamente con placeholder

### Modificar el Grid

En `src/components/ProductGrid.tsx`:

```tsx
// Cambiar número de columnas
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                    ↑ Modifica esto
```

### Personalizar Tarjetas

En `src/components/ProductCard.tsx`:

```tsx
// Cambiar sombra en hover
className="hover:shadow-xl" // Más sombra
className="hover:shadow-md" // Menos sombra
```

---

## ✅ Siguiente Paso

Continúa explorando:

- **[🛒 Carrito](Cart.md)** - Gestión del carrito de compras
- **[💳 Checkout](Checkout.md)** - Proceso de compra
- **[🏗️ Arquitectura](Architecture.md)** - Detalles técnicos

---

*Última actualización: Diciembre 2024*

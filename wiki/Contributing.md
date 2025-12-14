# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a Shopify Jeagnz! Esta guía te ayudará a entender el proceso de contribución y las mejores prácticas del proyecto.

---

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Estándares de Código](#estándares-de-código)
- [Guía de Commits](#guía-de-commits)
- [Testing](#testing)
- [Documentación](#documentación)

---

## 📜 Código de Conducta

### Nuestros Valores

- **Respeto**: Trata a todos con respeto y profesionalismo
- **Inclusión**: Bienvenidos todos los niveles de experiencia
- **Colaboración**: Trabajamos juntos para mejorar el proyecto
- **Constructividad**: Feedback constructivo y positivo

### Comportamientos Esperados

✅ Usar lenguaje acogedor e inclusivo  
✅ Respetar diferentes puntos de vista  
✅ Aceptar críticas constructivas con gracia  
✅ Enfocarse en lo mejor para la comunidad  
✅ Mostrar empatía hacia otros miembros

### Comportamientos Inaceptables

❌ Uso de lenguaje sexualizado o inapropiado  
❌ Trolling, comentarios insultantes  
❌ Ataques personales o políticos  
❌ Acoso público o privado  
❌ Publicar información privada de otros

---

## 🚀 Cómo Contribuir

### Tipos de Contribuciones Bienvenidas

#### 🐛 Reportar Bugs

Encontraste un bug? Ayúdanos a mejorarlo:

1. **Verifica** que el bug no esté ya reportado en [Issues](https://github.com/jeremyagnz/Shopify-Jeagnz/issues)
2. **Abre un nuevo issue** con una descripción clara
3. **Incluye**:
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots si aplica
   - Versión del navegador/OS
   - Logs de consola relevantes

**Template de Issue:**

```markdown
## Bug Report

### Descripción
[Descripción clara del bug]

### Pasos para Reproducir
1. Ir a '...'
2. Click en '...'
3. Scroll hasta '...'
4. Ver error

### Comportamiento Esperado
[Lo que esperabas que sucediera]

### Comportamiento Actual
[Lo que realmente sucede]

### Screenshots
[Si aplica]

### Entorno
- Navegador: [e.g. Chrome 120]
- OS: [e.g. Windows 11]
- Versión: [e.g. 1.0.0]

### Logs
```
[Logs de consola relevantes]
```
```

#### ✨ Sugerir Features

Tienes una idea? Compártela:

1. **Revisa** las issues existentes para evitar duplicados
2. **Abre un issue** etiquetado como "enhancement"
3. **Describe**:
   - Problema que resuelve
   - Solución propuesta
   - Alternativas consideradas
   - Mockups/diseños si aplica

**Template de Feature Request:**

```markdown
## Feature Request

### Problema
[Descripción del problema o necesidad]

### Solución Propuesta
[Cómo resolverías esto]

### Alternativas
[Otras soluciones consideradas]

### Información Adicional
[Context, mockups, etc.]
```

#### 📝 Mejorar Documentación

- Corregir typos
- Clarificar explicaciones
- Agregar ejemplos
- Traducir contenido
- Actualizar información desactualizada

#### 🎨 Mejorar UI/UX

- Sugerir mejoras de diseño
- Proponer animaciones
- Optimizar responsive design
- Mejorar accesibilidad

#### ⚡ Optimizar Performance

- Reducir bundle size
- Mejorar tiempo de carga
- Optimizar renders
- Implementar lazy loading

---

## 🔄 Proceso de Pull Request

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub (botón "Fork")

# Clonar tu fork
git clone https://github.com/TU-USUARIO/Shopify-Jeagnz.git
cd Shopify-Jeagnz

# Agregar upstream remote
git remote add upstream https://github.com/jeremyagnz/Shopify-Jeagnz.git
```

### 2. Crear una Branch

```bash
# Asegúrate de estar en main y actualizado
git checkout main
git pull upstream main

# Crear branch descriptiva
git checkout -b feature/agregar-wishlist
# o
git checkout -b fix/corregir-precio-carrito
# o
git checkout -b docs/actualizar-readme
```

**Convención de nombres de branches:**

- `feature/` - Nuevas funcionalidades
- `fix/` - Correcciones de bugs
- `docs/` - Cambios en documentación
- `refactor/` - Refactorización de código
- `test/` - Agregar o actualizar tests
- `style/` - Cambios de estilos (no de formato)
- `perf/` - Mejoras de performance

### 3. Hacer Cambios

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Hacer tus cambios...
# Testear localmente
# Ejecutar linter
npm run lint
```

**Checklist antes de commit:**

- [ ] El código funciona localmente
- [ ] No hay errores en consola
- [ ] El linter pasa sin errores
- [ ] Los tests existentes pasan
- [ ] Agregaste tests para nuevo código
- [ ] La UI se ve bien en mobile y desktop
- [ ] Dark mode funciona correctamente
- [ ] Documentación actualizada si aplica

### 4. Commit

```bash
# Agregar archivos
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar funcionalidad de wishlist"
```

Ver [Guía de Commits](#guía-de-commits) para convenciones.

### 5. Push y Pull Request

```bash
# Push a tu fork
git push origin feature/agregar-wishlist
```

**En GitHub:**

1. Ve a tu fork en GitHub
2. Click en "Compare & pull request"
3. Llena el template de PR
4. Asigna labels apropiados
5. Click "Create pull request"

**Template de Pull Request:**

```markdown
## Descripción
[Descripción clara de los cambios]

## Tipo de Cambio
- [ ] Bug fix (cambio que corrige un issue)
- [ ] Nueva feature (cambio que agrega funcionalidad)
- [ ] Breaking change (fix o feature que causa que funcionalidad existente cambie)
- [ ] Documentación

## ¿Cómo se ha Testeado?
[Describe las pruebas realizadas]

## Checklist
- [ ] Mi código sigue el estilo del proyecto
- [ ] He realizado una auto-revisión de mi código
- [ ] He comentado mi código en áreas difíciles de entender
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan nuevos warnings
- [ ] He agregado tests que prueban que mi fix es efectivo o que mi feature funciona
- [ ] Tests unitarios nuevos y existentes pasan localmente
- [ ] Cualquier cambio dependiente ha sido mergeado

## Screenshots (si aplica)
[Agregar screenshots de cambios visuales]

## Issues Relacionados
Fixes #123
Closes #456
```

### 6. Revisión de Código

El equipo revisará tu PR y podría:

- ✅ **Aprobar** - Listo para merge
- 💬 **Comentar** - Sugerencias o preguntas
- ❌ **Solicitar cambios** - Cambios necesarios

**Respondiendo a feedback:**

```bash
# Hacer cambios solicitados
# Commit y push a la misma branch
git add .
git commit -m "refactor: aplicar feedback de code review"
git push origin feature/agregar-wishlist
```

El PR se actualizará automáticamente.

### 7. Merge

Una vez aprobado:

- Mantenedor hará merge a main
- Tu branch puede ser eliminada
- Cambios estarán en producción en el próximo deploy

---

## 📏 Estándares de Código

### TypeScript

#### Type Safety

```typescript
// ✅ Bueno: Interfaces bien definidas
interface Product {
  id: number
  name: string
  price: number
  description: string
  featured?: boolean
}

// ❌ Malo: Usar 'any'
const products: any[] = []
```

#### Props Typing

```typescript
// ✅ Bueno: Props tipadas
interface ProductCardProps {
  id: number
  name: string
  price: number
  onAddToCart: (id: number) => void
}

export default function ProductCard({
  id,
  name,
  price,
  onAddToCart
}: ProductCardProps) {
  // ...
}

// ❌ Malo: Sin tipos
export default function ProductCard(props) {
  // ...
}
```

### React

#### Componentes Funcionales

```typescript
// ✅ Bueno: Componente funcional con hooks
export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  
  useEffect(() => {
    fetchProducts()
  }, [])
  
  return <ProductGrid products={products} />
}

// ❌ Malo: Componente de clase
class Products extends Component {
  // ...
}
```

#### Hooks Rules

```typescript
// ✅ Bueno: Hooks al inicio del componente
export default function MyComponent() {
  const [state, setState] = useState()
  const { data } = useCustomHook()
  
  useEffect(() => {
    // ...
  }, [])
  
  // Lógica y return...
}

// ❌ Malo: Hooks condicionales
export default function MyComponent() {
  if (condition) {
    const [state, setState] = useState() // ❌
  }
}
```

#### useMemo y useCallback

```typescript
// ✅ Bueno: Memoizar cálculos costosos
const filteredProducts = useMemo(() => {
  return products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase())
  )
}, [products, query])

// ✅ Bueno: useCallback para funciones
const handleClick = useCallback(() => {
  doSomething()
}, [dependency])
```

### Tailwind CSS

#### Mobile-First

```tsx
// ✅ Bueno: Mobile-first approach
<div className="
  text-sm           {/* Base: mobile */}
  sm:text-base      {/* Small screens */}
  md:text-lg        {/* Medium screens */}
  lg:text-xl        {/* Large screens */}
">
  Content
</div>

// ❌ Malo: Desktop-first
<div className="text-xl lg:text-sm">
  Content
</div>
```

#### Dark Mode

```tsx
// ✅ Bueno: Soporte dark mode
<div className="
  bg-white 
  dark:bg-slate-800
  text-slate-900 
  dark:text-white
">
  Content
</div>

// ❌ Malo: Sin dark mode
<div className="bg-white text-black">
  Content
</div>
```

### Naming Conventions

```typescript
// Componentes: PascalCase
ProductCard.tsx
CartContext.tsx

// Funciones/variables: camelCase
const handleAddToCart = () => {}
const isLoading = true

// Constantes: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'
const MAX_ITEMS = 100

// Tipos/Interfaces: PascalCase
interface ProductProps {}
type CartItem = {}

// Archivos: kebab-case o camelCase
product-card.test.tsx
useProducts.ts
```

---

## 💬 Guía de Commits

### Conventional Commits

Usamos el formato de [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formato (no cambios de código)
- `refactor`: Refactorización
- `perf`: Mejoras de performance
- `test`: Agregar/actualizar tests
- `chore`: Cambios en build, tools, etc.

### Ejemplos

```bash
# Feature
git commit -m "feat: agregar búsqueda de productos"
git commit -m "feat(cart): implementar actualización de cantidad"

# Fix
git commit -m "fix: corregir cálculo de precio total"
git commit -m "fix(checkout): validar formato de tarjeta"

# Docs
git commit -m "docs: actualizar README con instrucciones de instalación"
git commit -m "docs(wiki): agregar página de arquitectura"

# Style
git commit -m "style: aplicar formato con Prettier"
git commit -m "style(navbar): mejorar responsive en mobile"

# Refactor
git commit -m "refactor: extraer lógica de carrito a custom hook"

# Performance
git commit -m "perf: implementar lazy loading de imágenes"

# Test
git commit -m "test: agregar tests para ProductCard"

# Chore
git commit -m "chore: actualizar dependencias"
git commit -m "chore: configurar GitHub Actions"
```

### Breaking Changes

```bash
git commit -m "feat!: cambiar estructura de API de productos

BREAKING CHANGE: El endpoint /products ahora retorna un objeto
con paginación en lugar de un array directo."
```

---

## 🧪 Testing

### Escribir Tests

#### Unit Tests

```typescript
// src/components/ProductCard.test.tsx
import { render, screen } from '@testing-library/react'
import ProductCard from './ProductCard'

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Jeans',
    price: 89.99,
    description: 'Test description'
  }
  
  it('renders product name', () => {
    render(<ProductCard {...mockProduct} />)
    expect(screen.getByText('Test Jeans')).toBeInTheDocument()
  })
  
  it('displays formatted price', () => {
    render(<ProductCard {...mockProduct} />)
    expect(screen.getByText('$89.99')).toBeInTheDocument()
  })
  
  it('calls onAddToCart when button clicked', () => {
    const handleAddToCart = jest.fn()
    render(<ProductCard {...mockProduct} onAddToCart={handleAddToCart} />)
    
    screen.getByText('Add to Cart').click()
    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct)
  })
})
```

#### Integration Tests

```typescript
// tests/integration/cart-flow.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Cart Flow', () => {
  it('adds product to cart and updates badge', async () => {
    render(<App />)
    
    // Navigate to products
    await userEvent.click(screen.getByText('Products'))
    
    // Add to cart
    await userEvent.click(screen.getAllByText('Add to Cart')[0])
    
    // Verify badge updated
    expect(screen.getByTestId('cart-badge')).toHaveText('1')
  })
})
```

#### E2E Tests

```typescript
// tests/e2e/checkout.spec.ts
import { test, expect } from '@playwright/test'

test('complete checkout flow', async ({ page }) => {
  await page.goto('/products')
  await page.click('[data-testid="add-to-cart-1"]')
  await page.click('[data-testid="cart-icon"]')
  await page.click('[data-testid="checkout-button"]')
  
  await page.fill('[name="fullName"]', 'John Doe')
  await page.fill('[name="email"]', 'john@example.com')
  // ...fill more fields
  
  await page.click('[data-testid="place-order"]')
  await expect(page.locator('.toast')).toContainText('Order placed')
})
```

### Ejecutar Tests

```bash
# Tests unitarios
npm run test

# Tests con coverage
npm run test:coverage

# Tests E2E
npm run test:e2e

# Watch mode
npm run test:watch
```

---

## 📚 Documentación

### Code Comments

```typescript
// ✅ Bueno: Explicar "por qué", no "qué"
// Usar debounce para evitar múltiples llamadas API durante el tipeo
const debouncedSearch = useMemo(() => 
  debounce(handleSearch, 300),
  [handleSearch]
)

// ❌ Malo: Comentar lo obvio
// Crear variable para productos
const products = []
```

### JSDoc para Funciones Públicas

```typescript
/**
 * Calcula el precio total del carrito incluyendo impuestos
 * @param items - Array de items en el carrito
 * @param taxRate - Tasa de impuesto (default: 0.08)
 * @returns Precio total con impuestos aplicados
 */
export function calculateTotal(
  items: CartItem[], 
  taxRate: number = 0.08
): number {
  const subtotal = items.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  )
  return subtotal * (1 + taxRate)
}
```

### README Updates

Si tu cambio afecta:
- Instalación
- Configuración
- Uso de la aplicación
- APIs públicas

**Actualiza el README.md** en el mismo PR.

---

## 🎯 Áreas que Necesitan Ayuda

### High Priority

- [ ] Agregar tests E2E con Playwright
- [ ] Implementar paginación en productos
- [ ] Mejorar accesibilidad (ARIA labels)
- [ ] Optimizar bundle size

### Medium Priority

- [ ] Agregar filtros de categorías
- [ ] Implementar wishlist
- [ ] Agregar animaciones de transición
- [ ] Mejorar SEO

### Good First Issues

- [ ] Corregir typos en documentación
- [ ] Agregar más ejemplos al README
- [ ] Mejorar mensajes de error
- [ ] Traducir documentación a inglés

---

## 📞 ¿Necesitas Ayuda?

### Recursos

- 📖 **Documentación**: Lee el [Wiki completo](Home.md)
- 🐛 **Issues**: Busca en [GitHub Issues](https://github.com/jeremyagnz/Shopify-Jeagnz/issues)
- 💬 **Discusiones**: Usa [GitHub Discussions](https://github.com/jeremyagnz/Shopify-Jeagnz/discussions)

### Contacto

- Abre un issue con la etiqueta `question`
- Menciona a `@jeremyagnz` en comentarios
- Contacta al equipo a través de la página de contacto

---

## 🎉 Contribuidores

Gracias a todos los que han contribuido:

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- Será actualizado automáticamente -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## 📄 Licencia

Al contribuir, aceptas que tus contribuciones se licencien bajo la misma licencia del proyecto.

---

*Última actualización: Diciembre 2024*

**¡Gracias por contribuir a Shopify Jeagnz! 🎉**

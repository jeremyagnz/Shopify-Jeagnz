# 💳 Proceso de Checkout

El módulo de checkout proporciona una experiencia de compra segura y fluida, permitiendo a los usuarios completar sus pedidos de manera rápida y eficiente.

---

## 🎯 Características Principales

### ✅ Validación de Formulario
- Validación en tiempo real de campos
- Mensajes de error específicos
- Prevención de envíos inválidos
- Formato automático de tarjeta de crédito

### 🔒 Seguridad
- Validación de tarjeta de crédito
- Formato de CVV y fecha de expiración
- Validación de email
- Prevención de doble envío

### 📱 Responsive
- Layout optimizado para mobile
- Formulario fácil de completar en touch
- Resumen de orden visible
- Botones grandes para touch

### ⚡ Experiencia de Usuario
- Loading states durante procesamiento
- Simulación de procesamiento de pago (2s)
- Generación de Order ID único
- Redirección automática después de compra

---

## 🏗️ Ubicación y Estructura

### Ruta
**URL:** `/checkout`  
**Componente:** `src/pages/Checkout.tsx`

### Protección de Ruta

El checkout valida que el carrito no esté vacío:

```typescript
useEffect(() => {
  // Si el carrito está vacío, redirigir a productos
  if (items.length === 0 && !isProcessing) {
    navigate('/products')
  }
}, [items, navigate, isProcessing])
```

**Comportamiento:**
- Si carrito vacío → Redirige a `/products`
- Si `isProcessing` → Permite completar la compra
- Previene acceso directo sin productos

---

## 🎨 Layout del Checkout

### Desktop View

```
┌────────────────────────────────────────────────┐
│  ← Back to Products                            │
├────────────────────────────────────────────────┤
│                                                │
│  ┌─────────────────┐  ┌──────────────────┐   │
│  │ Shipping Info   │  │  Order Summary   │   │
│  │                 │  │                  │   │
│  │ Name            │  │  Classic Jeans   │   │
│  │ [_________]     │  │  Qty: 2          │   │
│  │                 │  │  $179.98         │   │
│  │ Email           │  │                  │   │
│  │ [_________]     │  │  Slim Jeans      │   │
│  │                 │  │  Qty: 1          │   │
│  │ Address         │  │  $79.99          │   │
│  │ [_________]     │  │  ─────────────   │   │
│  │                 │  │  Total: $259.97  │   │
│  │ Payment         │  │                  │   │
│  │ [_________]     │  └──────────────────┘   │
│  │                 │                          │
│  │ [Place Order]   │                          │
│  └─────────────────┘                          │
│                                                │
└────────────────────────────────────────────────┘
```

### Mobile View

```
┌────────────────────┐
│ ← Back to Products │
├────────────────────┤
│                    │
│  Order Summary     │
│  ───────────────   │
│  Classic Jeans     │
│  Qty: 2  $179.98   │
│                    │
│  Slim Jeans        │
│  Qty: 1  $79.99    │
│  ───────────────   │
│  Total: $259.97    │
│                    │
│  Shipping Info     │
│                    │
│  Name              │
│  [____________]    │
│                    │
│  Email             │
│  [____________]    │
│                    │
│  Address           │
│  [____________]    │
│                    │
│  City              │
│  [____________]    │
│                    │
│  ZIP               │
│  [____________]    │
│                    │
│  Payment           │
│                    │
│  Card Number       │
│  [____________]    │
│                    │
│  Expiry  CVV       │
│  [____] [___]      │
│                    │
│ ┌────────────────┐ │
│ │  Place Order   │ │
│ └────────────────┘ │
│                    │
└────────────────────┘
```

---

## 📋 Formulario de Checkout

### Campos del Formulario

#### Información de Envío

```typescript
interface ShippingInfo {
  fullName: string
  email: string
  address: string
  city: string
  zipCode: string
  country: string
}
```

**Validaciones:**
- `fullName`: Requerido, mínimo 3 caracteres
- `email`: Requerido, formato válido
- `address`: Requerido, mínimo 5 caracteres
- `city`: Requerido, mínimo 2 caracteres
- `zipCode`: Requerido, formato válido
- `country`: Requerido

#### Información de Pago

```typescript
interface PaymentInfo {
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
}
```

**Validaciones:**
- `cardNumber`: 16 dígitos, formato XXXX-XXXX-XXXX-XXXX
- `cardName`: Requerido, nombre en la tarjeta
- `expiryDate`: Formato MM/YY, fecha futura
- `cvv`: 3 o 4 dígitos

### Ejemplo de Campos

```tsx
{/* Nombre completo */}
<div className="space-y-2">
  <label htmlFor="fullName" className="block text-sm font-medium">
    Full Name *
  </label>
  <input
    type="text"
    id="fullName"
    name="fullName"
    value={formData.fullName}
    onChange={handleChange}
    className="w-full px-4 py-2 border rounded-lg"
    required
  />
  {errors.fullName && (
    <p className="text-sm text-red-600">{errors.fullName}</p>
  )}
</div>

{/* Email */}
<div className="space-y-2">
  <label htmlFor="email" className="block text-sm font-medium">
    Email Address *
  </label>
  <input
    type="email"
    id="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    className="w-full px-4 py-2 border rounded-lg"
    required
  />
  {errors.email && (
    <p className="text-sm text-red-600">{errors.email}</p>
  )}
</div>
```

---

## 🔐 Validaciones

### Validación de Email

```typescript
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Uso
if (!validateEmail(formData.email)) {
  errors.email = 'Please enter a valid email address'
}
```

### Validación de Tarjeta de Crédito

```typescript
const validateCardNumber = (cardNumber: string): boolean => {
  // Remover espacios y guiones
  const cleaned = cardNumber.replace(/[\s-]/g, '')
  
  // Verificar que solo contenga dígitos y tenga 16 caracteres
  return /^\d{16}$/.test(cleaned)
}

// Algoritmo de Luhn (opcional para validación avanzada)
const luhnCheck = (cardNumber: string): boolean => {
  let sum = 0
  let isEven = false
  
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i])
    
    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    
    sum += digit
    isEven = !isEven
  }
  
  return sum % 10 === 0
}
```

### Validación de Fecha de Expiración

```typescript
const validateExpiryDate = (expiry: string): boolean => {
  // Formato: MM/YY
  const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
  
  if (!regex.test(expiry)) return false
  
  const [month, year] = expiry.split('/')
  const expiryDate = new Date(2000 + parseInt(year), parseInt(month))
  const today = new Date()
  
  return expiryDate > today
}
```

### Validación de CVV

```typescript
const validateCVV = (cvv: string): boolean => {
  // 3 o 4 dígitos
  return /^\d{3,4}$/.test(cvv)
}
```

---

## 📦 Resumen de Orden

### Componente Order Summary

```tsx
<div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
  
  <div className="space-y-3">
    {items.map(item => (
      <div key={item.id} className="flex justify-between">
        <div className="flex-1">
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
        </div>
        <p className="font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    ))}
  </div>
  
  <div className="border-t border-slate-300 dark:border-slate-600 mt-4 pt-4">
    <div className="flex justify-between items-center">
      <span className="text-lg font-bold">Total</span>
      <span className="text-xl font-bold text-indigo-600">
        ${getTotalPrice().toFixed(2)}
      </span>
    </div>
    <p className="text-sm text-slate-600 mt-2">
      {getTotalItems()} item(s) in cart
    </p>
  </div>
</div>
```

### Información Mostrada

- Nombre de cada producto
- Cantidad de cada producto
- Precio unitario
- Subtotal por producto
- Total general destacado
- Número total de items

---

## 💳 Procesamiento de Pago

### Flujo de Procesamiento

```typescript
const handlePlaceOrder = async (e: FormEvent) => {
  e.preventDefault()
  
  // 1. Validar formulario
  if (!validateForm()) {
    showToast('Please fill all required fields correctly', 'error')
    return
  }
  
  // 2. Iniciar procesamiento
  setIsProcessing(true)
  showToast('Processing your order...', 'info')
  
  try {
    // 3. Simular procesamiento de pago (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 4. Generar Order ID único
    const orderId = generateOrderId()
    
    // 5. Guardar orden
    const order = {
      id: orderId,
      items: items,
      total: getTotalPrice(),
      shippingInfo: formData,
      date: new Date().toISOString()
    }
    
    // 6. Limpiar carrito
    clearCart()
    
    // 7. Mostrar éxito
    showToast(`Order #${orderId} placed successfully!`, 'success')
    
    // 8. Redirigir
    setTimeout(() => {
      navigate('/products')
    }, 1500)
    
  } catch (error) {
    showToast('Order processing failed. Please try again.', 'error')
  } finally {
    setIsProcessing(false)
  }
}
```

### Generación de Order ID

```typescript
const generateOrderId = (): string => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000)
  return `ORD-${timestamp}-${random}`
}

// Ejemplos:
// ORD-1702574400000-1234
// ORD-1702574500000-5678
```

---

## 🎨 Estados del UI

### Estado Normal

- Formulario habilitado
- Botón "Place Order" activo
- Sin spinners ni mensajes

### Estado Processing

```tsx
<button
  type="submit"
  disabled={isProcessing}
  className="w-full bg-indigo-600 text-white py-3 rounded-lg"
>
  {isProcessing ? (
    <span className="flex items-center justify-center">
      <LoadingSpinner className="mr-2" />
      Processing...
    </span>
  ) : (
    'Place Order'
  )}
</button>
```

**Características:**
- Botón deshabilitado
- Spinner de carga
- Texto "Processing..."
- No permite múltiples envíos

### Estado de Error

```tsx
{errors.cardNumber && (
  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
    <p className="text-sm text-red-600 dark:text-red-400">
      {errors.cardNumber}
    </p>
  </div>
)}
```

**Características:**
- Fondo rojo claro
- Borde rojo
- Texto de error específico
- Icono de advertencia

---

## 📸 Capturas de Pantalla

### Formulario de Checkout

> **Vista en vivo:** [https://shopify-jeagnz.netlify.app/checkout](https://shopify-jeagnz.netlify.app/checkout)
> 
> *Nota: Necesitas agregar productos al carrito primero para acceder a checkout.*
> 
> En desktop, el formulario ocupa 2/3 del ancho con el resumen de orden en el 1/3 restante. En mobile, el resumen aparece arriba y el formulario abajo en layout vertical.

> **Prueba el flujo completo:**
> 1. Agrega productos en [/products](https://shopify-jeagnz.netlify.app/products)
> 2. Abre el carrito y haz clic en "Proceed to Checkout"
> 3. Llena el formulario (puedes usar datos de prueba)
> 4. Observa la validación en tiempo real
> 5. Haz clic en "Place Order" para simular la compra

### Estados de Procesamiento

> **Estados de procesamiento:**
> 
> Durante el procesamiento (2 segundos simulados), verás:
> - Botón "Place Order" deshabilitado con texto "Processing..."
> - Spinner de carga animado
> - Toast notification azul indicando "Processing your order..."
> 
> Después del éxito:
> - Toast verde con mensaje "Order #XXX placed successfully!"
> - Carrito se limpia automáticamente
> - Redirección a /products después de 1.5 segundos

---

## 🔔 Notificaciones

### Eventos y Mensajes

| Evento | Mensaje | Tipo |
|--------|---------|------|
| Inicio procesamiento | "Processing your order..." | info ℹ️ |
| Orden exitosa | "Order #XXX placed successfully!" | success ✅ |
| Error de validación | "Please fill all required fields correctly" | error ❌ |
| Error de pago | "Order processing failed. Please try again." | error ❌ |
| Carrito vacío | "Your cart is empty" | info ℹ️ |

---

## 🔄 Flujo Completo de Usuario

### Paso a Paso

```mermaid
1. Usuario tiene productos en carrito
   ↓
2. Click en "Proceed to Checkout"
   ↓
3. Carrito se cierra, navega a /checkout
   ↓
4. Ver resumen de orden
   ↓
5. Llenar información de envío
   ↓
6. Llenar información de pago
   ↓
7. Click en "Place Order"
   ↓
8. Validación de campos
   ↓
9. Si válido → Procesar
   Si inválido → Mostrar errores
   ↓
10. Simular pago (2s)
   ↓
11. Generar Order ID
   ↓
12. Limpiar carrito
   ↓
13. Toast: "Order placed successfully!"
   ↓
14. Redirigir a /products
```

### Tiempo Total Aproximado

- Llenar formulario: 1-2 minutos
- Procesamiento: 2 segundos
- Confirmación: 1.5 segundos
- **Total: ~2-3 minutos**

---

## 📱 Responsive Design

### Breakpoints

#### Mobile (< 768px)
- Layout de 1 columna
- Resumen de orden arriba
- Formulario abajo
- Inputs full-width
- Padding reducido

#### Tablet (768px - 1024px)
- Layout de 1 columna (opcional 2)
- Más espaciado
- Inputs más grandes

#### Desktop (≥ 1024px)
- Layout de 2 columnas
- Formulario izquierda (60%)
- Resumen derecha (40%)
- Sticky summary (opcional)

### Código Responsive

```tsx
<div className="container mx-auto px-4 py-8">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Formulario - 2/3 del ancho en desktop */}
    <div className="lg:col-span-2">
      <form onSubmit={handlePlaceOrder}>
        {/* Campos del formulario */}
      </form>
    </div>
    
    {/* Resumen - 1/3 del ancho en desktop */}
    <div className="lg:col-span-1">
      <OrderSummary />
    </div>
  </div>
</div>
```

---

## 🧪 Testing

### Test Cases

1. **Validación de Formulario**
   - ✅ Campos requeridos no pueden estar vacíos
   - ✅ Email debe tener formato válido
   - ✅ Tarjeta debe tener 16 dígitos
   - ✅ Fecha de expiración debe ser futura
   - ✅ CVV debe tener 3-4 dígitos

2. **Procesamiento de Orden**
   - ✅ Botón se deshabilita durante procesamiento
   - ✅ Spinner aparece
   - ✅ No permite doble envío
   - ✅ Order ID se genera correctamente

3. **Limpieza de Carrito**
   - ✅ Carrito se limpia después de orden exitosa
   - ✅ localStorage se actualiza
   - ✅ Badge del carrito muestra 0

4. **Navegación**
   - ✅ Redirige a /products si carrito vacío
   - ✅ Redirige después de orden exitosa
   - ✅ Back button funciona correctamente

5. **Responsive**
   - ✅ Mobile muestra 1 columna
   - ✅ Desktop muestra 2 columnas
   - ✅ Formulario es usable en touch

---

## 💡 Tips para Desarrolladores

### Agregar Métodos de Pago

```typescript
// Agregar campo de selección
<select name="paymentMethod" onChange={handleChange}>
  <option value="credit">Credit Card</option>
  <option value="debit">Debit Card</option>
  <option value="paypal">PayPal</option>
</select>

// Mostrar campos según método
{formData.paymentMethod === 'credit' && (
  <CreditCardFields />
)}
{formData.paymentMethod === 'paypal' && (
  <PayPalButton />
)}
```

### Agregar Cálculo de Envío

```typescript
const calculateShipping = (zipCode: string): number => {
  // Lógica de cálculo
  const zone = getShippingZone(zipCode)
  return zone === 'local' ? 5.00 : 10.00
}

const getTotalWithShipping = () => {
  const subtotal = getTotalPrice()
  const shipping = calculateShipping(formData.zipCode)
  return subtotal + shipping
}
```

### Integrar Pasarela de Pago Real

```typescript
// Ejemplo con Stripe
import { loadStripe } from '@stripe/stripe-js'

const handlePlaceOrder = async () => {
  const stripe = await loadStripe('pk_test_...')
  
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    body: JSON.stringify({
      amount: getTotalPrice() * 100, // En centavos
      items: items
    })
  })
  
  const { clientSecret } = await response.json()
  
  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
      billing_details: {
        name: formData.fullName,
        email: formData.email
      }
    }
  })
  
  if (result.error) {
    showToast(result.error.message, 'error')
  } else {
    showToast('Payment successful!', 'success')
    clearCart()
  }
}
```

---

## 🔗 Integración con Backend

### Endpoint de Orden

```typescript
// POST /api/orders
const createOrder = async (orderData: OrderData) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })
  
  if (!response.ok) {
    throw new Error('Failed to create order')
  }
  
  return response.json()
}
```

### Estructura de Orden

```json
{
  "orderId": "ORD-1702574400000-1234",
  "customerId": "user123",
  "items": [
    {
      "productId": 1,
      "name": "Classic Fit Jeans",
      "quantity": 2,
      "price": 89.99
    }
  ],
  "shippingInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St",
    "city": "New York",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentInfo": {
    "method": "credit_card",
    "last4": "1234"
  },
  "total": 179.98,
  "status": "pending",
  "createdAt": "2024-12-14T20:00:00Z"
}
```

---

## ✅ Siguiente Paso

Continúa explorando:

- **[🏗️ Arquitectura](Architecture.md)** - Detalles técnicos del proyecto
- **[🤝 Contribuir](Contributing.md)** - Guía para contribuir
- **[🛒 Carrito](Cart.md)** - Funcionalidad del carrito

---

*Última actualización: Diciembre 2024*

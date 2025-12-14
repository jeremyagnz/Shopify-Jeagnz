# 📦 Instalación y Configuración

Esta guía te ayudará a configurar Shopify Jeagnz en tu entorno local de desarrollo paso a paso.

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

| Herramienta | Versión Mínima | Recomendada | Verificación |
|-------------|----------------|-------------|--------------|
| **Node.js** | 18.x | 20.x o superior | `node --version` |
| **npm** | 9.x | 10.x o superior | `npm --version` |
| **Git** | 2.x | Última | `git --version` |

### Instalación de Requisitos

#### Node.js y npm

**Windows / macOS:**
1. Descarga el instalador desde [nodejs.org](https://nodejs.org/)
2. Ejecuta el instalador y sigue las instrucciones
3. Verifica la instalación:
```bash
node --version
npm --version
```

**Linux (Ubuntu/Debian):**
```bash
# Usando NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalación
node --version
npm --version
```

#### Git

**Windows:**
- Descarga desde [git-scm.com](https://git-scm.com/)

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

---

## 🚀 Instalación Paso a Paso

### 1. Clonar el Repositorio

Abre tu terminal y ejecuta:

```bash
# Clonar usando HTTPS
git clone https://github.com/jeremyagnz/Shopify-Jeagnz.git

# O clonar usando SSH (si tienes configurada tu clave SSH)
git clone git@github.com:jeremyagnz/Shopify-Jeagnz.git

# Navegar al directorio del proyecto
cd Shopify-Jeagnz
```

### 2. Instalar Dependencias

Una vez dentro del directorio del proyecto:

```bash
npm install
```

Este comando instalará todas las dependencias necesarias definidas en `package.json`. El proceso puede tomar algunos minutos dependiendo de tu conexión a internet.

**Salida esperada:**
```
added 1380 packages, and audited 1382 packages in 26s

291 packages are looking for funding
  run `npm fund` for details
```

### 3. Configuración de Variables de Entorno (Opcional)

Las variables de entorno son **opcionales** para desarrollo local. El proyecto funciona sin configuración adicional.

Si deseas configurar variables personalizadas:

```bash
# Copiar el archivo de ejemplo
cp .env.example .env
```

Edita el archivo `.env` según tus necesidades:

```env
# Puerto para el servidor de desarrollo (opcional)
PORT=5173

# MongoDB (solo si usas el servidor Express standalone)
# MONGODB_URI=mongodb://localhost:27017/shopify-jeagnz

# CORS (solo para servidor Express)
CORS_ORIGIN=http://localhost:5173
```

> **Nota:** MongoDB NO es necesario para el desarrollo local. El proyecto usa Netlify Functions con datos mock por defecto.

### 4. Iniciar el Servidor de Desarrollo

Existen dos opciones para ejecutar el proyecto localmente:

#### Opción 1: Vite Dev Server (Recomendado)

```bash
npm run dev
```

**Características:**
- ⚡ Hot Module Replacement (HMR) ultrarrápido
- 🔄 Recarga automática en cambios
- 🚀 Inicio instantáneo
- 📱 Acceso desde dispositivos móviles en red local

**Salida esperada:**
```
  VITE v7.2.4  ready in 324 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
  ➜  press h + enter to show help
```

#### Opción 2: Netlify Dev (Con Funciones Serverless)

```bash
npm run dev:netlify
```

**Características:**
- 🌐 Simula el entorno de producción de Netlify
- 🔧 Funciones serverless disponibles localmente
- 📡 API endpoints funcionales
- 🔄 Redirecciones y rewrites

**Salida esperada:**
```
◈ Netlify Dev ◈
◈ Starting Netlify Dev with Vite
◈ Functions server is listening on 8888
◈ Server listening on http://localhost:8888
```

### 5. Abrir en el Navegador

Una vez iniciado el servidor, abre tu navegador en:

```
http://localhost:5173
```

Deberías ver la página de inicio de Shopify Jeagnz:

![Local Development](https://via.placeholder.com/800x450/6366f1/ffffff?text=Local+Development+Running)

---

## 🧪 Verificar la Instalación

### Verificar Frontend

1. Abre `http://localhost:5173`
2. La página de inicio debe cargar correctamente
3. Navega a "Productos" - deberías ver 24 productos
4. Prueba agregar un producto al carrito
5. Abre el carrito y verifica que el producto esté allí

### Verificar Funciones Serverless (con Netlify Dev)

```bash
# En otra terminal, prueba los endpoints
curl http://localhost:8888/api/products

# O abre en el navegador
# http://localhost:8888/api/docs
```

### Verificar Panel de Administración

1. Navega a `http://localhost:5173/admin`
2. Deberías ver la tabla de productos
3. Verás un toast "Using demo data - API not available" (normal en dev)
4. Prueba crear, editar o eliminar un producto

---

## 📂 Estructura del Proyecto

Una vez instalado, tu directorio debería verse así:

```
Shopify-Jeagnz/
├── node_modules/          # Dependencias instaladas (ignorado por Git)
├── public/                # Archivos públicos estáticos
├── src/                   # Código fuente de la aplicación
│   ├── components/        # Componentes React reutilizables
│   ├── contexts/          # React Context providers
│   ├── data/              # Datos estáticos y mock
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Componentes de páginas
│   ├── services/          # Servicios de API
│   ├── types/             # Definiciones de TypeScript
│   ├── utils/             # Funciones utilitarias
│   ├── main.tsx           # Punto de entrada
│   └── index.css          # Estilos globales
├── netlify/               # Funciones serverless de Netlify
│   └── functions/
│       ├── api.ts         # API principal
│       └── docs.ts        # Documentación de API
├── screenshots/           # Capturas de pantalla
├── wiki/                  # Documentación del Wiki
├── package.json           # Dependencias y scripts
├── vite.config.ts         # Configuración de Vite
├── tsconfig.json          # Configuración de TypeScript
└── README.md              # Documentación principal
```

---

## 📜 Scripts Disponibles

### Desarrollo

```bash
# Iniciar servidor de desarrollo con Vite
npm run dev

# Iniciar con Netlify Dev (funciones serverless)
npm run dev:netlify

# Linter de código
npm run lint
```

### Construcción

```bash
# Construir para producción
npm run build

# Vista previa del build de producción
npm run preview
```

### Servidor Express Standalone (Opcional)

```bash
# Requiere MongoDB
npm run server              # Con hot reload
npm run server:build        # Construir TypeScript
npm run server:start        # Ejecutar compilado
```

---

## 🔧 Configuración del Editor

### Visual Studio Code (Recomendado)

Extensiones recomendadas:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### Configuración de ESLint

El proyecto incluye configuración de ESLint. Para ejecutarlo:

```bash
npm run lint
```

---

## 🐛 Solución de Problemas

### Error: "Cannot find module"

**Solución:**
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules
npm install
```

### Error: "Port 5173 already in use"

**Solución:**
```bash
# Detener el proceso en ese puerto
# Linux/macOS:
lsof -ti:5173 | xargs kill -9

# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# O cambiar el puerto en vite.config.ts
```

### Error: "EACCES: permission denied"

**Solución (Linux/macOS):**
```bash
# Cambiar permisos del directorio npm global
sudo chown -R $(whoami) ~/.npm
```

### Netlify Dev no inicia

**Solución:**
```bash
# Instalar Netlify CLI globalmente
npm install -g netlify-cli

# Verificar instalación
netlify --version

# Reiniciar
npm run dev:netlify
```

### Build falla

**Solución:**
```bash
# Limpiar caché
rm -rf dist
npm run build

# Si persiste, verificar TypeScript
npx tsc --noEmit
```

---

## 🎨 Personalización Inicial

### Cambiar el Puerto de Desarrollo

Edita `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    port: 3000  // Cambia a tu puerto preferido
  }
})
```

### Modificar Datos de Productos

Los productos mock están en `src/data/products.ts`:

```typescript
export const products: Product[] = [
  {
    id: 1,
    name: "Tus Jeans Personalizados",
    price: 99.99,
    description: "Descripción de tus jeans",
    featured: true
  },
  // Más productos...
]
```

---

## ✅ Siguiente Paso

Una vez instalado exitosamente, continúa con:

- **[📱 Productos](Products.md)** - Aprende sobre el catálogo de productos
- **[🛒 Carrito](Cart.md)** - Funcionalidad del carrito de compras
- **[🏗️ Arquitectura](Architecture.md)** - Detalles técnicos del proyecto
- **[🤝 Contribuir](Contributing.md)** - Guía para contribuir al proyecto

---

## 📞 ¿Necesitas Ayuda?

Si encuentras problemas durante la instalación:

1. 📖 Revisa la sección de **Solución de Problemas** arriba
2. 🔍 Busca en [GitHub Issues](https://github.com/jeremyagnz/Shopify-Jeagnz/issues)
3. 🆕 Crea un nuevo issue con detalles del error
4. 💬 Contacta al equipo de desarrollo

---

*Última actualización: Diciembre 2024*

# Shopify-Jeagnz

A modern e-commerce application built with React, TypeScript, and Vite, featuring a mobile-first responsive design and scalable folder structure.

## 🚀 Tech Stack

- **React 19** - A JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next generation frontend tooling
- **Tailwind CSS 4** - A utility-first CSS framework with custom responsive breakpoints
- **React Router** - Client-side routing
- **ESLint** - Code linting and formatting

## 📱 Mobile-First Responsive Design

This application is built with a **mobile-first approach**, ensuring optimal user experience across all devices:

- **Mobile (320px+)**: Optimized layouts with touch-friendly components
- **Small tablets (475px+)**: Enhanced grid layouts using custom `xs` breakpoint
- **Tablets (768px+)**: Multi-column layouts and expanded navigation
- **Desktop (1024px+)**: Full-featured experience with side-by-side layouts
- **Large screens (1280px+)**: Maximum content width with optimal spacing

All components use responsive Tailwind CSS classes (e.g., `text-sm sm:text-base md:text-lg`) to scale smoothly across devices.

## 📁 Project Structure

```
src/
├── assets/         # Static assets (images, icons, fonts)
├── components/     # Reusable UI components
│   ├── Layout.tsx       # App layout with responsive navigation & cart
│   ├── Hero.tsx         # Responsive hero/banner component
│   ├── ProductCard.tsx  # Mobile-first product card
│   ├── ProductGrid.tsx  # Responsive product grid
│   ├── Cart.tsx         # Shopping cart with mobile optimization
│   └── Button.tsx       # Reusable button component
├── contexts/       # React context providers
│   └── CartContext.tsx  # Shopping cart state management
├── data/          # Static data and mock APIs
├── hooks/         # Custom React hooks
├── pages/         # Page components with mobile-first layouts
├── services/      # API and external service integrations
├── types/         # TypeScript type definitions
├── utils/         # Helper functions and utilities
├── main.tsx       # Application entry point
└── index.css      # Global styles & Tailwind configuration
```

## ✨ Features

- 🛍️ **E-commerce Ready**: Product catalog, cart functionality, and checkout flow
- 📱 **Mobile-First**: Optimized for mobile devices with responsive design
- 🎨 **Modern UI**: Clean, professional design with Tailwind CSS
- 🛒 **Shopping Cart**: Persistent cart with add/remove/update quantity
- 🔄 **State Management**: Context API for global state management
- 🚀 **Fast Performance**: Built with Vite for lightning-fast HMR
- ♿ **Accessible**: ARIA labels and semantic HTML

## 🧩 Component Architecture

### Core Components

- **Layout**: Responsive navigation with mobile hamburger menu and cart sidebar
- **Hero**: Eye-catching hero sections with responsive typography
- **ProductCard**: Mobile-optimized product cards with hover effects
- **ProductGrid**: Responsive grid that adapts from 1 column (mobile) to 4 columns (desktop)
- **Cart**: Full-featured shopping cart with quantity controls and checkout

### Context Providers

- **CartContext**: Global shopping cart state with add/remove/update operations

### Pages

All pages are built with mobile-first responsive design:
- **Home**: Hero section with featured products
- **Products**: Product grid with responsive layout
- **ProductDetail**: Mobile-optimized product details with cart integration
- **About**: Company information with responsive layout
- **Contact**: Mobile-friendly contact form

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jeremyagnz/Shopify-Jeagnz.git
cd Shopify-Jeagnz
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## 🎨 Tailwind CSS Configuration

This project uses **Tailwind CSS v4** with custom responsive breakpoints configured:

- **xs**: 475px (custom - for small phones in landscape)
- **sm**: 640px (default - large phones & small tablets)
- **md**: 768px (default - tablets)
- **lg**: 1024px (default - laptops)
- **xl**: 1280px (default - desktops)
- **2xl**: 1536px (default - large desktops)

The configuration is defined in `src/index.css` using the `@theme` directive.

### Mobile-First Responsive Patterns

All components follow mobile-first design principles using responsive Tailwind classes:

```jsx
// Typography scales from mobile to desktop
<h1 className="text-2xl sm:text-3xl md:text-4xl">
  Responsive Heading
</h1>

// Grids adapt from 1 column (mobile) to 4 columns (desktop)
<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* Grid items */}
</div>

// Spacing and padding increase with screen size
<div className="p-4 sm:p-6 md:p-8">
  {/* Content */}
</div>

// Navigation switches from hamburger menu to horizontal nav
<nav className="hidden md:flex">
  {/* Desktop navigation */}
</nav>
```

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

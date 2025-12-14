import { Handler } from '@netlify/functions';
import express, { Application, Request, Response, NextFunction } from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Application = express();

// Note: MongoDB integration has been removed to allow immediate deployment without configuration.
// The API functions with mock/static data by default.
// To add MongoDB support later, install mongoose and configure MONGODB_URI environment variable.

// Configure CORS middleware
// Allow requests from Netlify domain and localhost for development
const allowedOrigins = [
  process.env.CORS_ORIGIN || 'http://localhost:5173',
  'https://shopify-jeagnz.netlify.app',
  /\.netlify\.app$/
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or matches pattern
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return allowed === origin;
      }
      return allowed.test(origin);
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Configure JSON body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
// Returns server status without database dependency
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Mock product data
const mockProducts = [
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
  { id: 13, name: 'Vintage Wash Jeans', price: '$109.99', description: 'Authentic vintage wash with unique fading patterns.', featured: true },
  { id: 14, name: 'Jogger Jeans', price: '$94.99', description: 'Comfortable jogger style with elastic cuffs for a modern athleisure look.' },
  { id: 15, name: 'Cropped Jeans', price: '$84.99', description: 'Trendy cropped length perfect for showing off your favorite sneakers.' },
  { id: 16, name: 'Ripped Jeans', price: '$99.99', description: 'Stylish distressed details with strategic rips and tears.' },
  { id: 17, name: 'Dark Wash Jeans', price: '$89.99', description: 'Deep indigo color that works for both casual and formal occasions.' },
  { id: 18, name: 'Light Wash Jeans', price: '$79.99', description: 'Bright, summery light wash perfect for warm weather.' },
  { id: 19, name: 'Jeggings', price: '$69.99', description: 'Ultimate comfort with stretchy denim that looks like jeans.' },
  { id: 20, name: 'Boyfriend Jeans', price: '$94.99', description: 'Relaxed, slouchy fit inspired by menswear styles.' },
  { id: 21, name: 'Mom Jeans', price: '$89.99', description: 'High-waisted vintage style with a comfortable relaxed fit.' },
  { id: 22, name: 'Flare Jeans', price: '$99.99', description: 'Retro-inspired flare leg that widens from the knee down.' },
  { id: 23, name: 'Selvedge Denim', price: '$149.99', description: 'Premium Japanese selvedge denim with signature red line detail.', featured: true },
  { id: 24, name: 'Stretch Jeans', price: '$74.99', description: 'Maximum comfort with high-stretch fabric for all-day wear.' },
];

// Products endpoints
// GET all products
app.get('/api/products', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    data: mockProducts,
    count: mockProducts.length,
    timestamp: new Date().toISOString()
  });
});

// GET product by ID
app.get('/api/products/:id', (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const product = mockProducts.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'Product not found',
      timestamp: new Date().toISOString()
    });
  }
  
  res.json({
    status: 'success',
    data: product,
    timestamp: new Date().toISOString()
  });
});

// API documentation endpoint
app.get('/api', (req: Request, res: Response) => {
  res.json({
    message: 'Shopify-Jeagnz API Server',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: {
        path: '/api/health',
        method: 'GET',
        description: 'Health check endpoint - returns server status'
      },
      products: {
        path: '/api/products',
        method: 'GET',
        description: 'Get all products'
      },
      productById: {
        path: '/api/products/:id',
        method: 'GET',
        description: 'Get a specific product by ID'
      },
      docs: {
        path: '/api/docs',
        method: 'GET',
        description: 'Interactive API documentation with testing interface'
      },
      apiInfo: {
        path: '/api',
        method: 'GET',
        description: 'This endpoint - returns API information and available endpoints'
      }
    },
    documentation: 'Visit /api/docs for interactive documentation',
    repository: 'https://github.com/jeremyagnz/Shopify-Jeagnz'
  });
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Shopify-Jeagnz API Server',
    version: '1.0.0',
    documentation: '/api/docs'
  });
});

// Error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Export the serverless function handler
// Type assertion is necessary due to type incompatibility between serverless-http
// and @netlify/functions Handler types. The runtime behavior is correct and compatible.
// serverless-http returns a handler that works with Netlify Functions.
const serverlessHandler = serverless(app);
export const handler: Handler = serverlessHandler as Handler;

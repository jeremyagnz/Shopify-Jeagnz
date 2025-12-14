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

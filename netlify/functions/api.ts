import { Handler } from '@netlify/functions';
import express, { Application, Request, Response } from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Application = express();

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

// MongoDB connection state
let isConnected = false;

// MongoDB connection function optimized for serverless
async function connectToDatabase() {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI environment variable is not set');
    throw new Error('MONGODB_URI is required');
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      retryWrites: true,
      w: 'majority',
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      // Serverless-optimized settings
      maxPoolSize: 10,
      minPoolSize: 1,
    });
    
    isConnected = true;
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

// Health check endpoint
app.get('/api/health', async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    res.json({
      status: 'ok',
      message: 'Server is running',
      mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Health check failed',
      mongodb: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
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
        description: 'Health check endpoint - returns server and database status'
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
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Export the serverless function handler
export const handler: Handler = serverless(app);

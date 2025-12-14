# Server

Express server with TypeScript, CORS, JSON body parsing, and optional MongoDB connection. 

**🚀 Now deployed as Netlify Functions for serverless operation!**

> **⚡ Quick Start:** Netlify Functions work WITHOUT MongoDB by default! Deploy immediately without any database setup.

> 📖 **[Ver Guía de Pruebas (TESTING_GUIDE.md)](./TESTING_GUIDE.md)** - Instrucciones paso a paso para probar el servidor.

> 🌐 **[Ver Guía de Deployment (../DEPLOYMENT.md)](../DEPLOYMENT.md)** - Instrucciones completas para desplegar en Netlify.

## Features

- ✅ **Express Server**: Fast, minimalist web framework for Node.js
- ✅ **TypeScript**: Type-safe server-side code
- ✅ **CORS**: Cross-Origin Resource Sharing middleware configured
- ✅ **JSON Body Parsing**: Automatic JSON request body parsing
- ✅ **Netlify Functions**: Serverless deployment with automatic scaling (NO MongoDB required!)
- ✅ **Serverless-HTTP**: Express wrapper for serverless environments
- ✅ **Optional MongoDB**: Mongoose ODM available for standalone server (not required for Netlify Functions)
- ✅ **Environment Variables**: Dotenv for configuration management

## Setup

1. **Install dependencies** (already done if you ran `npm install` in the root):
   ```bash
   npm install
   ```

2. **Configure environment variables (Optional)**:
   
   **For Netlify Functions:** No configuration needed! Skip this step.
   
   **For Standalone Server:** Create a `.env` file in the root directory (see `.env.example`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/shopify-jeagnz  # Required for standalone server
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Ensure MongoDB is running** (Only needed for standalone server):
   ```bash
   # For local MongoDB
   mongod
   ```

## Running the Server

### 🌐 With Netlify Functions (Recommended for Production-like Testing)

**Local development with Netlify CLI:**
```bash
npm run dev:netlify
```

This will:
- Start Vite dev server on port 5173
- Start Netlify Functions on port 8888
- Provide a unified development experience at `http://localhost:8888`
- Simulate the production Netlify environment locally

**Access your API at:**
- API Info: `http://localhost:8888/api`
- Health Check: `http://localhost:8888/api/health`
- Interactive Docs: `http://localhost:8888/api/docs`

### 🔧 Standalone Express Server (Local Development)

**Development Mode (with hot reload):**
```bash
npm run server
```

**Build for Production:**
```bash
npm run server:build
```

**Start Production Server:**
```bash
npm run server:start
```

## API Endpoints

All endpoints are available both in standalone mode and as Netlify Functions.

### 📋 API Information
- **GET** `/api`
- Returns API information and list of all available endpoints
- **Production URL:** `https://shopify-jeagnz.netlify.app/api`

### 🏥 Health Check
- **GET** `/api/health`
- Returns server and MongoDB connection status
- **Production URL:** `https://shopify-jeagnz.netlify.app/api/health`

### 📖 Interactive Documentation
- **GET** `/api/docs`
- Beautiful, interactive HTML documentation with testing interface
- **Production URL:** `https://shopify-jeagnz.netlify.app/api/docs`

### Root
- **GET** `/`
- Returns basic API information

## Configuration

### Netlify Functions (Production)
- ✅ **No configuration required** - works immediately
- ✅ **No MongoDB needed** - functions work with test data
- ✅ **Optional:** Add `CORS_ORIGIN` environment variable for custom origins
- ✅ **Optional:** Add MongoDB support later by modifying `netlify/functions/api.ts`

### Standalone Server (Development)
- **CORS:** Default accepts requests from `http://localhost:5173`. Change via `.env` file.
- **MongoDB:** Required for standalone server. Default: `mongodb://localhost:27017/shopify-jeagnz`
  - Update `MONGODB_URI` in `.env` for different database or MongoDB Atlas
  - See `server/index.ts` for reference implementation

## Testing the Server

### 🧪 Testing with Netlify Functions (Local)

1. **Start Netlify Dev:**
   ```bash
   npm run dev:netlify
   ```

2. **Test the endpoints:**
   ```bash
   # API Information
   curl http://localhost:8888/api
   
   # Health Check
   curl http://localhost:8888/api/health
   
   # Open interactive docs in browser
   open http://localhost:8888/api/docs
   ```

### 🔧 Testing Standalone Server

1. **Start the server:**
   ```bash
   npm run server
   ```

2. **Test the endpoints:**
   ```bash
   curl http://localhost:5000/
   curl http://localhost:5000/api/health
   ```

3. **Test Script:**
   ```bash
   node server/test-endpoints.js
   ```

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for detailed testing instructions.

## 🌐 Production Deployment

The API is deployed to Netlify Functions and accessible at:

**Base URL:** `https://shopify-jeagnz.netlify.app`

**Endpoints:**
- API Info: `https://shopify-jeagnz.netlify.app/api`
- Health Check: `https://shopify-jeagnz.netlify.app/api/health`
- Interactive Docs: `https://shopify-jeagnz.netlify.app/api/docs`

### Viewing Logs in Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site: `shopify-jeagnz`
3. Navigate to **Functions** tab
4. Click on a function to view its logs
5. Use the **Logs** tab to see real-time function execution

### Monitoring

- **Function Analytics:** Available in Netlify Dashboard
- **Error Tracking:** Check function logs for errors
- **Performance:** Monitor function execution time in the dashboard

## Technology Stack

- **Express** - Web framework
- **TypeScript** - Type safety
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment configuration
- **Nodemon** - Development auto-reload
- **ts-node** - TypeScript execution

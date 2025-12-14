# 🚀 Deployment Guide - Netlify Functions

This guide explains how to deploy the Shopify-Jeagnz application to Netlify with Netlify Functions for the backend API.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Environment Variables Setup](#environment-variables-setup)
- [Deployment Steps](#deployment-steps)
- [Viewing Logs](#viewing-logs)
- [Troubleshooting](#troubleshooting)
- [Local Development with Netlify](#local-development-with-netlify)

## 🌟 Overview

The application is deployed to Netlify with:
- **Frontend**: Vite-built React application served from the `dist` directory
- **Backend**: Express API wrapped as Netlify Functions in `netlify/functions/`
- **Database**: MongoDB (MongoDB Atlas for production)

**Live URL:** [https://shopify-jeagnz.netlify.app](https://shopify-jeagnz.netlify.app)

## ✅ Prerequisites

1. **Netlify Account**: Sign up at [netlify.com](https://www.netlify.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Netlify CLI** (optional, for local testing):
   ```bash
   npm install -g netlify-cli
   # or use the project dependency
   npm run dev:netlify
   ```
4. **MongoDB Atlas Account** (OPTIONAL): Only needed if you want to add database functionality later. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

## 🔐 Environment Variables Setup

### Quick Deploy Without MongoDB

**Good news!** The Netlify Functions work immediately without any environment variables. You can deploy right away and the API endpoints will be accessible with test/mock data.

### Optional Environment Variables

These variables are **OPTIONAL** and can be configured later if needed:

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` | ❌ Optional |
| `CORS_ORIGIN` | Allowed CORS origin | `https://shopify-jeagnz.netlify.app` | ❌ Optional (has defaults) |
| `NODE_ENV` | Node environment | `production` | ❌ Optional (auto-set by Netlify) |

### Setting Environment Variables in Netlify (Optional)

**Note:** You can skip this section entirely for a quick deployment. These variables are only needed if you want to add MongoDB support later.

1. **Go to Netlify Dashboard:**
   - Navigate to [app.netlify.com](https://app.netlify.com)
   - Select your site: `shopify-jeagnz`

2. **Navigate to Site Settings:**
   - Click **Site settings** in the top navigation
   - Scroll down to **Environment variables** section
   - Or go directly: **Site settings → Environment variables**

3. **Add Variables (if needed):**
   - Click **Add a variable** or **Edit variables**
   - Add only the variables you need:

   **MONGODB_URI (Optional - for database support):**
   ```
   Key: MONGODB_URI
   Value: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   ```

   **CORS_ORIGIN (Optional - defaults work for most cases):**
   ```
   Key: CORS_ORIGIN
   Value: https://shopify-jeagnz.netlify.app
   ```

4. **Save Changes:**
   - Click **Save**
   - Trigger a new deploy to apply the variables

### Getting MongoDB Atlas Connection String (Optional - Skip for Quick Deploy)

**Note:** You can skip this entire section if you don't need database functionality. The API works with test data by default.

If you want to add MongoDB support later:

1. **Create MongoDB Atlas Cluster:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster (M0 tier is sufficient for testing)

2. **Configure Network Access:**
   - Go to **Network Access** in Atlas dashboard
   - Add `0.0.0.0/0` to allow connections from anywhere (Netlify Functions have dynamic IPs)
   - ⚠️ **Note:** This is necessary for serverless functions but ensure your database has proper authentication

3. **Create Database User:**
   - Go to **Database Access**
   - Create a new user with a strong password
   - Grant read/write access to your database

4. **Get Connection String:**
   - Click **Connect** on your cluster
   - Choose **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your user password
   - Replace `<database>` with your database name (e.g., `shopify-jeagnz`)

   Example:
   ```
   mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/shopify-jeagnz?retryWrites=true&w=majority
   ```

5. **Add to Netlify:**
   - Follow the "Setting Environment Variables in Netlify" section above
   - Re-implement MongoDB connection in `netlify/functions/api.ts` (see standalone `server/index.ts` for reference)

## 🚀 Deployment Steps

### Quick Deploy (Recommended for First Time)

**Deploy in minutes without any configuration!** The API works immediately with test data.

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Connect Repository:**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click **Add new site → Import an existing project**
   - Choose **GitHub** and authorize Netlify
   - Select repository: `jeremyagnz/Shopify-Jeagnz`

2. **Configure Build Settings:**
   - **Branch to deploy:** `main` (or your preferred branch)
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions` (auto-detected from `netlify.toml`)

3. **Skip Environment Variables:**
   - You can skip adding environment variables for now!
   - The deployment will work without MongoDB
   - Add them later if you need database functionality

4. **Deploy:**
   - Click **Deploy site**
   - Wait for the build to complete (usually 1-3 minutes)
   - Your site will be live at `https://[random-name].netlify.app`
   - ✅ All API endpoints will be immediately accessible!

5. **Verify Deployment:**
   - Test the API: `https://[your-site].netlify.app/api`
   - Check health: `https://[your-site].netlify.app/api/health`
   - View docs: `https://[your-site].netlify.app/api/docs`

6. **Custom Domain (Optional):**
   - Go to **Site settings → Domain management**
   - Update site name to `shopify-jeagnz` or configure a custom domain

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Link to Existing Site (or create new):**
   ```bash
   netlify link
   # or
   netlify init
   ```

4. **Set Environment Variables:**
   ```bash
   netlify env:set MONGODB_URI "mongodb+srv://user:pass@cluster.mongodb.net/dbname"
   netlify env:set CORS_ORIGIN "https://shopify-jeagnz.netlify.app"
   netlify env:set NODE_ENV "production"
   ```

5. **Deploy:**
   ```bash
   # Build and deploy
   npm run build
   netlify deploy --prod
   ```

### Automatic Deployments

Once connected to GitHub, Netlify will automatically:
- Deploy on every push to your main branch
- Create preview deployments for pull requests
- Run the build command and deploy the functions

## 📊 Viewing Logs

### Function Logs

1. **Via Netlify Dashboard:**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Select your site: `shopify-jeagnz`
   - Navigate to **Functions** tab
   - Click on a function (e.g., `api`)
   - View logs in the **Logs** tab

2. **Real-time Logs:**
   - In the function detail view, logs update in real-time
   - Shows function invocations, console outputs, and errors

3. **Via Netlify CLI:**
   ```bash
   netlify functions:logs api
   ```

### Deploy Logs

1. **Via Dashboard:**
   - Go to **Deploys** tab
   - Click on a deploy
   - View build logs and function bundling logs

2. **Via CLI:**
   ```bash
   netlify watch
   ```

### Function Analytics

- **Invocations:** Number of times each function was called
- **Execution Time:** Average and max execution time
- **Error Rate:** Percentage of failed invocations

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. CORS Errors

**Problem:** Browser shows CORS errors when calling API

**Solutions:**
- The API has sensible CORS defaults and should work without configuration
- For custom origins, set `CORS_ORIGIN` environment variable
- For local testing, `http://localhost:5173` is automatically allowed

**Code:** The API automatically allows:
- The value of `CORS_ORIGIN` environment variable (or `http://localhost:5173` if not set)
- `https://shopify-jeagnz.netlify.app`
- Any `.netlify.app` subdomain

#### 2. Function Not Found (404)

**Problem:** API endpoints return 404

**Solutions:**
- Check `netlify.toml` redirects are correctly configured
- Verify functions are in `netlify/functions/` directory
- Ensure functions are named correctly (`api.ts`, `docs.ts`)
- Check deploy logs to see if functions were built successfully

**Verify:**
```bash
curl https://shopify-jeagnz.netlify.app/.netlify/functions/api
```

#### 3. Build Failures

**Problem:** Deployment fails during build

**Solutions:**
- Check deploy logs for specific error messages
- Verify `package.json` dependencies are correct
- Ensure `netlify.toml` build command is correct
- Check Node version compatibility

**Local test:**
```bash
npm run build
```

#### 4. Cold Start Delays

**Problem:** First API request after inactivity is slow

**Explanation:**
- Serverless functions "sleep" after inactivity
- First request wakes them up (cold start)
- Subsequent requests are fast (warm)

**Solutions:**
- This is normal behavior for serverless
- Consider using a ping service to keep functions warm
- Initial request may take 1-3 seconds, subsequent requests are fast

#### 5. MongoDB Connection Issues (Optional - Only if Using MongoDB)

**Problem:** Functions timeout when connecting to MongoDB (only applies if you've added MongoDB)

**Solutions:**
- Verify `MONGODB_URI` is correctly set in Netlify environment variables
- Check MongoDB Atlas Network Access allows `0.0.0.0/0`
- Ensure database user has proper permissions
- Check MongoDB Atlas cluster is running (not paused)
- Re-implement MongoDB connection logic in `netlify/functions/api.ts`

### Debug Mode

To see detailed logs in your functions, add console.log statements:

```typescript
console.log('Environment check:', {
  corsOrigin: process.env.CORS_ORIGIN,
  nodeEnv: process.env.NODE_ENV
});
```

### Testing Endpoints

Use curl or the interactive docs to test:

```bash
# API Info
curl https://shopify-jeagnz.netlify.app/api

# Health Check
curl https://shopify-jeagnz.netlify.app/api/health

# Interactive Docs (open in browser)
open https://shopify-jeagnz.netlify.app/api/docs
```

## 🛠️ Local Development with Netlify

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file (Optional):**
   ```bash
   cp .env.example .env
   ```
   
   **Note:** You can skip creating `.env` entirely! The functions work without it.

3. **Update `.env` with your local values (Optional):**
   ```env
   # All variables are optional
   # CORS_ORIGIN=http://localhost:5173
   # NODE_ENV=development
   
   # Only needed if you want to use MongoDB with standalone server
   # MONGODB_URI=mongodb://localhost:27017/shopify-jeagnz
   ```

### Running with Netlify Dev

**Start Netlify Dev environment:**
```bash
npm run dev:netlify
```

This will:
- Start Vite dev server
- Start Netlify Functions locally
- Provide a unified development server at `http://localhost:8888`
- Apply redirects from `netlify.toml`
- Simulate production environment locally

**Access points:**
- Frontend: `http://localhost:8888`
- API: `http://localhost:8888/api`
- Health: `http://localhost:8888/api/health`
- Docs: `http://localhost:8888/api/docs`

### Running Standalone

**Frontend only:**
```bash
npm run dev
```
Runs on `http://localhost:5173`

**Backend only:**
```bash
npm run server
```
Runs on `http://localhost:5000`

## 📚 Additional Resources

- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Serverless-HTTP Documentation](https://github.com/dougmoscrop/serverless-http)

## 🎯 Quick Reference

**Live URLs:**
- Frontend: `https://shopify-jeagnz.netlify.app`
- API Info: `https://shopify-jeagnz.netlify.app/api`
- Health Check: `https://shopify-jeagnz.netlify.app/api/health`
- Interactive Docs: `https://shopify-jeagnz.netlify.app/api/docs`

**Important Files:**
- `netlify.toml` - Netlify configuration
- `netlify/functions/api.ts` - Main API function
- `netlify/functions/docs.ts` - Documentation function
- `.env.example` - Environment variable template

**Key Commands:**
```bash
npm run dev:netlify    # Local development with Netlify
npm run build         # Build frontend
npm run server        # Standalone server
netlify deploy --prod # Deploy via CLI
```

---

**Need Help?** Check the [GitHub repository](https://github.com/jeremyagnz/Shopify-Jeagnz) or open an issue.

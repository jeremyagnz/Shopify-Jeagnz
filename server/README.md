# Server

Express server with TypeScript, CORS, JSON body parsing, and MongoDB connection.

## Features

- ✅ **Express Server**: Fast, minimalist web framework for Node.js
- ✅ **TypeScript**: Type-safe server-side code
- ✅ **CORS**: Cross-Origin Resource Sharing middleware configured
- ✅ **JSON Body Parsing**: Automatic JSON request body parsing
- ✅ **MongoDB Connection**: Mongoose ODM for MongoDB integration
- ✅ **Environment Variables**: Dotenv for configuration management

## Setup

1. **Install dependencies** (already done if you ran `npm install` in the root):
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root directory (see `.env.example`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/shopify-jeagnz
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Ensure MongoDB is running** (local installation or cloud service like MongoDB Atlas):
   ```bash
   # For local MongoDB
   mongod
   ```

## Running the Server

### Development Mode (with hot reload)
```bash
npm run server
```

### Build for Production
```bash
npm run server:build
```

### Start Production Server
```bash
npm run server:start
```

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns server and MongoDB connection status

### Root
- **GET** `/`
- Returns API information

## Configuration

### CORS
The server is configured to accept requests from the frontend application running on `http://localhost:5173` by default. You can change this in the `.env` file.

### MongoDB
The default MongoDB connection string is `mongodb://localhost:27017/shopify-jeagnz`. Update the `MONGODB_URI` in your `.env` file to use a different database or MongoDB Atlas.

## Technology Stack

- **Express** - Web framework
- **TypeScript** - Type safety
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment configuration
- **Nodemon** - Development auto-reload
- **ts-node** - TypeScript execution

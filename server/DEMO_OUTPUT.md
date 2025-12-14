# Server Demo - Outputs Esperados

Esta guía muestra los outputs que deberías ver cuando pruebes el servidor.

## 1. Iniciar el Servidor

Cuando ejecutas `npm run server`, deberías ver:

```
> shopify-jeagnz@0.0.0 server
> nodemon --exec ts-node --project tsconfig.server.json server/index.ts

[nodemon] starting `ts-node --project tsconfig.server.json server/index.ts`
🚀 Server is running on port 5000
📍 API endpoint: http://localhost:5000
✅ Connected to MongoDB successfully
```

✅ **Si ves esto, el servidor está funcionando correctamente**

---

## 2. Probar GET / (Endpoint Principal)

### En el Navegador

Abre: `http://localhost:5000/`

**Output esperado:**
```json
{
  "message": "Shopify-Jeagnz API Server",
  "version": "1.0.0"
}
```

### Con curl

```bash
curl http://localhost:5000/
```

**Output esperado:**
```json
{"message":"Shopify-Jeagnz API Server","version":"1.0.0"}
```

---

## 3. Probar GET /api/health (Health Check)

### En el Navegador

Abre: `http://localhost:5000/api/health`

**Output esperado (MongoDB conectado):**
```json
{
  "status": "ok",
  "message": "Server is running",
  "mongodb": "connected"
}
```

**Output esperado (MongoDB desconectado):**
```json
{
  "status": "ok",
  "message": "Server is running",
  "mongodb": "disconnected"
}
```

### Con curl

```bash
curl http://localhost:5000/api/health
```

**Output esperado:**
```json
{"status":"ok","message":"Server is running","mongodb":"connected"}
```

---

## 4. Probar con el Script de Test

Ejecuta:
```bash
node server/test-endpoints.js
```

**Output esperado:**

```
═══════════════════════════════════════════════════
   Probando Servidor Express - Shopify-Jeagnz
═══════════════════════════════════════════════════

➤ Probando GET /
✓ Status: 200
✓ Respuesta:
{
  "message": "Shopify-Jeagnz API Server",
  "version": "1.0.0"
}

➤ Probando GET /api/health
✓ Status: 200
✓ Respuesta:
{
  "status": "ok",
  "message": "Server is running",
  "mongodb": "connected"
}

✓ MongoDB está conectado correctamente

═══════════════════════════════════════════════════
   ✓ Pruebas completadas
═══════════════════════════════════════════════════
```

---

## 5. Verificar en Postman / Thunder Client

### Request 1: GET /

- **Method**: GET
- **URL**: `http://localhost:5000/`
- **Expected Status**: 200 OK
- **Expected Body**:
  ```json
  {
    "message": "Shopify-Jeagnz API Server",
    "version": "1.0.0"
  }
  ```

### Request 2: GET /api/health

- **Method**: GET
- **URL**: `http://localhost:5000/api/health`
- **Expected Status**: 200 OK
- **Expected Body**:
  ```json
  {
    "status": "ok",
    "message": "Server is running",
    "mongodb": "connected"
  }
  ```

---

## Errores Comunes

### Error: ECONNREFUSED

```bash
Error: connect ECONNREFUSED 127.0.0.1:5000
```

**Causa**: El servidor no está corriendo  
**Solución**: Ejecuta `npm run server`

---

### Error: MONGODB_URI not set

```
❌ MONGODB_URI environment variable is not set
Please set MONGODB_URI in your .env file
```

**Causa**: No tienes archivo `.env` o falta la variable  
**Solución**: 
1. Crea archivo `.env` en la raíz
2. Agrega: `MONGODB_URI=mongodb://localhost:27017/shopify-jeagnz`

---

### MongoDB connection error

```
❌ MongoDB connection error: MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Causa**: MongoDB no está corriendo  
**Solución**:
1. **Local**: Ejecuta `mongod` en otra terminal
2. **Cloud**: Usa MongoDB Atlas y actualiza `MONGODB_URI`

---

## Visual: Flujo Completo

```
Terminal 1 (Backend)                Terminal 2 (Testing)
┌─────────────────────────┐        ┌─────────────────────────┐
│ $ npm run server        │        │                         │
│                         │        │                         │
│ 🚀 Server running       │        │ $ curl localhost:5000   │
│ ✅ MongoDB connected    │  <───  │                         │
│                         │  ───>  │ {"message":"..."}       │
│                         │        │                         │
│ [nodemon] watching...   │        │ ✓ Success!              │
└─────────────────────────┘        └─────────────────────────┘
```

---

## ¿Todo funciona?

Si ves los outputs esperados arriba, ¡tu servidor está funcionando perfectamente! 🎉

**Checklist:**
- ✅ Servidor inicia sin errores
- ✅ GET / devuelve información del servidor
- ✅ GET /api/health muestra `"mongodb": "connected"`
- ✅ Puedes acceder desde el navegador
- ✅ curl funciona correctamente

**Siguiente paso:** Puedes empezar a crear endpoints adicionales para tu e-commerce.

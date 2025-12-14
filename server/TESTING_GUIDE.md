# Server Testing Guide

Esta guía te muestra cómo probar el servidor Express y verificar que la base de datos MongoDB funciona correctamente.

> 📸 **[Ver DEMO_OUTPUT.md](./DEMO_OUTPUT.md)** - Ejemplos visuales de todos los outputs esperados

## Requisitos Previos

1. **MongoDB**: Necesitas tener MongoDB ejecutándose
   - **Opción 1 - MongoDB Local**: Instala MongoDB localmente
   - **Opción 2 - MongoDB Atlas** (Recomendado): Usa MongoDB Atlas (gratis) en la nube

## Configuración Rápida

### 1. Crear archivo `.env`

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shopify-jeagnz
CORS_ORIGIN=http://localhost:5173
```

**Si usas MongoDB Atlas**, cambia `MONGODB_URI` por tu connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopify-jeagnz
```

### 2. Iniciar el Servidor

Abre una terminal y ejecuta:

```bash
npm run server
```

Deberías ver algo como:
```
🚀 Server is running on port 5000
📍 API endpoint: http://localhost:5000
✅ Connected to MongoDB successfully
```

## Probando los Endpoints

### Opción 1: Usando el Navegador

1. **Endpoint Principal** - Abre en tu navegador:
   ```
   http://localhost:5000/
   ```
   
   Deberías ver:
   ```json
   {
     "message": "Shopify-Jeagnz API Server",
     "version": "1.0.0"
   }
   ```

2. **Health Check** - Abre en tu navegador:
   ```
   http://localhost:5000/api/health
   ```
   
   Deberías ver:
   ```json
   {
     "status": "ok",
     "message": "Server is running",
     "mongodb": "connected"
   }
   ```

### Opción 2: Usando curl (Terminal)

```bash
# Endpoint principal
curl http://localhost:5000/

# Health check
curl http://localhost:5000/api/health
```

### Opción 3: Usando Postman o Thunder Client (VS Code)

1. **GET** `http://localhost:5000/`
2. **GET** `http://localhost:5000/api/health`

## Verificando la Conexión a MongoDB

El endpoint `/api/health` te muestra el estado de MongoDB:

- **`"mongodb": "connected"`** ✅ - MongoDB está conectado correctamente
- **`"mongodb": "disconnected"`** ❌ - Hay un problema con MongoDB

## Solución de Problemas

### Error: "MONGODB_URI environment variable is not set"

**Solución**: Asegúrate de tener el archivo `.env` en la raíz del proyecto con la variable `MONGODB_URI`.

### Error: "MongoDB connection error"

**Soluciones posibles**:

1. **MongoDB no está ejecutándose**:
   ```bash
   # Inicia MongoDB localmente
   mongod
   ```

2. **Connection string incorrecto**:
   - Verifica que `MONGODB_URI` en `.env` sea correcto
   - Para MongoDB Atlas, obtén el connection string desde tu dashboard

3. **Puerto ocupado**:
   - Cambia el puerto en `.env`:
   ```env
   PORT=5001
   ```

## Ejemplo de Uso con Frontend

Una vez que el servidor esté corriendo:

1. En una terminal: `npm run server` (Backend en puerto 5000)
2. En otra terminal: `npm run dev` (Frontend en puerto 5173)
3. El frontend puede hacer requests al backend:
   ```javascript
   fetch('http://localhost:5000/api/health')
     .then(res => res.json())
     .then(data => console.log(data));
   ```

## MongoDB Atlas (Cloud) - Configuración Recomendada

1. Crea una cuenta gratuita en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. Crea un usuario de base de datos
4. Obtén tu connection string
5. Reemplaza `<password>` con tu contraseña
6. Actualiza `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopify-jeagnz?retryWrites=true&w=majority
   ```

## Scripts Disponibles

- `npm run server` - Servidor de desarrollo con hot reload
- `npm run server:build` - Compilar TypeScript a JavaScript
- `npm run server:start` - Iniciar servidor de producción

## Estructura de la Respuesta

### GET /

```json
{
  "message": "Shopify-Jeagnz API Server",
  "version": "1.0.0"
}
```

### GET /api/health

```json
{
  "status": "ok",
  "message": "Server is running",
  "mongodb": "connected"
}
```

## Next Steps

Una vez que el servidor funcione correctamente:

1. ✅ Puedes crear modelos de Mongoose en `server/models/`
2. ✅ Puedes agregar más endpoints en `server/index.ts`
3. ✅ Puedes crear rutas separadas en `server/routes/`
4. ✅ El frontend puede consumir estos endpoints

## Recursos Adicionales

- [Documentación de Express](https://expressjs.com/)
- [Documentación de Mongoose](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

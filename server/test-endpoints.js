/**
 * Script simple para probar los endpoints del servidor
 * 
 * Uso:
 * 1. Asegúrate de que el servidor esté corriendo: npm run server
 * 2. En otra terminal, ejecuta: node server/test-endpoints.js
 */

const http = require('http');
require('dotenv').config();

// Colores para la terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Read port from environment or use default
const PORT = process.env.PORT || 5000;

function makeRequest(path, callback) {
  const options = {
    hostname: 'localhost',
    port: PORT,
    path: path,
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        callback(null, {
          statusCode: res.statusCode,
          data: parsedData
        });
      } catch (error) {
        callback(new Error(`Failed to parse JSON response: ${error.message}. Response: ${data}`));
      }
    });
  });

  req.on('error', (error) => {
    callback(error);
  });

  req.end();
}

console.log(`${colors.cyan}═══════════════════════════════════════════════════${colors.reset}`);
console.log(`${colors.cyan}   Probando Servidor Express - Shopify-Jeagnz${colors.reset}`);
console.log(`${colors.cyan}   Puerto: ${PORT}${colors.reset}`);
console.log(`${colors.cyan}═══════════════════════════════════════════════════${colors.reset}\n`);

// Test 1: Endpoint principal
console.log(`${colors.blue}➤ Probando GET /${colors.reset}`);
makeRequest('/', (error, response) => {
  if (error) {
    console.log(`${colors.red}✗ Error: ${error.message}${colors.reset}`);
    console.log(`${colors.yellow}⚠ Asegúrate de que el servidor esté corriendo: npm run server${colors.reset}\n`);
    return;
  }

  console.log(`${colors.green}✓ Status: ${response.statusCode}${colors.reset}`);
  console.log(`${colors.green}✓ Respuesta:${colors.reset}`);
  console.log(JSON.stringify(response.data, null, 2));
  console.log('');

  // Test 2: Health check
  console.log(`${colors.blue}➤ Probando GET /api/health${colors.reset}`);
  makeRequest('/api/health', (error, response) => {
    if (error) {
      console.log(`${colors.red}✗ Error: ${error.message}${colors.reset}\n`);
      return;
    }

    console.log(`${colors.green}✓ Status: ${response.statusCode}${colors.reset}`);
    console.log(`${colors.green}✓ Respuesta:${colors.reset}`);
    console.log(JSON.stringify(response.data, null, 2));
    console.log('');

    // Verificar estado de MongoDB
    if (response.data.mongodb === 'connected') {
      console.log(`${colors.green}✓ MongoDB está conectado correctamente${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ MongoDB no está conectado${colors.reset}`);
      console.log(`${colors.yellow}⚠ Verifica tu archivo .env y que MongoDB esté corriendo${colors.reset}`);
    }

    console.log(`\n${colors.cyan}═══════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.green}   ✓ Pruebas completadas${colors.reset}`);
    console.log(`${colors.cyan}═══════════════════════════════════════════════════${colors.reset}\n`);
  });
});

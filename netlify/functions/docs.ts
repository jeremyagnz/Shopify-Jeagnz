import { Handler } from '@netlify/functions';

export const handler: Handler = async () => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shopify-Jeagnz API Documentation</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      overflow: hidden;
    }
    
    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }
    
    header h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
      font-weight: 700;
    }
    
    header p {
      font-size: 1.2em;
      opacity: 0.9;
    }
    
    .content {
      padding: 40px;
    }
    
    .endpoint-section {
      margin-bottom: 40px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .endpoint-header {
      background: #f5f5f5;
      padding: 20px;
      border-bottom: 2px solid #e0e0e0;
    }
    
    .endpoint-title {
      display: flex;
      align-items: center;
      gap: 15px;
      flex-wrap: wrap;
    }
    
    .method {
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 0.9em;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .method.get {
      background: #4caf50;
      color: white;
    }
    
    .method.post {
      background: #2196f3;
      color: white;
    }
    
    .path {
      font-family: 'Courier New', monospace;
      font-size: 1.2em;
      font-weight: 600;
      color: #667eea;
    }
    
    .endpoint-body {
      padding: 20px;
    }
    
    .endpoint-description {
      margin-bottom: 20px;
      font-size: 1.05em;
      color: #555;
    }
    
    .example-section {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 6px;
      margin-top: 15px;
    }
    
    .example-title {
      font-weight: 600;
      margin-bottom: 10px;
      color: #667eea;
    }
    
    .code-block {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 15px;
      border-radius: 6px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
      line-height: 1.5;
    }
    
    .try-button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1em;
      font-weight: 600;
      margin-top: 15px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .try-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    
    .try-button:active {
      transform: translateY(0);
    }
    
    .response-container {
      margin-top: 15px;
      display: none;
    }
    
    .response-container.visible {
      display: block;
    }
    
    .response-title {
      font-weight: 600;
      margin-bottom: 10px;
      color: #667eea;
    }
    
    .loading {
      color: #667eea;
      font-style: italic;
    }
    
    .error {
      color: #f44336;
      font-weight: 600;
    }
    
    .info-box {
      background: #e3f2fd;
      border-left: 4px solid #2196f3;
      padding: 20px;
      margin-top: 30px;
      border-radius: 6px;
    }
    
    .info-box h3 {
      color: #1976d2;
      margin-bottom: 10px;
    }
    
    .info-box ul {
      margin-left: 20px;
    }
    
    .info-box li {
      margin: 8px 0;
    }
    
    footer {
      background: #f5f5f5;
      padding: 20px;
      text-align: center;
      color: #666;
      border-top: 1px solid #e0e0e0;
    }
    
    footer a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }
    
    footer a:hover {
      text-decoration: underline;
    }
    
    @media (max-width: 768px) {
      body {
        padding: 10px;
      }
      
      header {
        padding: 30px 20px;
      }
      
      header h1 {
        font-size: 1.8em;
      }
      
      .content {
        padding: 20px;
      }
      
      .endpoint-title {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🛍️ Shopify-Jeagnz API</h1>
      <p>Interactive API Documentation</p>
    </header>
    
    <div class="content">
      <div class="info-box">
        <h3>📖 About This API</h3>
        <p>This API powers the Shopify-Jeagnz e-commerce platform. All endpoints are deployed as Netlify Functions for optimal serverless performance.</p>
        <ul>
          <li><strong>Base URL:</strong> <code>/api</code></li>
          <li><strong>Response Format:</strong> JSON</li>
          <li><strong>Authentication:</strong> Not required for public endpoints</li>
        </ul>
      </div>

      <!-- API Info Endpoint -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <div class="endpoint-title">
            <span class="method get">GET</span>
            <span class="path">/api</span>
          </div>
        </div>
        <div class="endpoint-body">
          <div class="endpoint-description">
            Returns API information and a list of all available endpoints with their descriptions.
          </div>
          
          <div class="example-section">
            <div class="example-title">Example Response:</div>
            <div class="code-block">{
  "message": "Shopify-Jeagnz API Server",
  "version": "1.0.0",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "endpoints": {
    "health": {
      "path": "/api/health",
      "method": "GET",
      "description": "Health check endpoint"
    },
    "docs": {
      "path": "/api/docs",
      "method": "GET",
      "description": "API documentation"
    }
  }
}</div>
          </div>
          
          <button class="try-button" onclick="testEndpoint('/api', 'api-response')">
            🚀 Try It Now
          </button>
          <div id="api-response" class="response-container"></div>
        </div>
      </div>

      <!-- Health Check Endpoint -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <div class="endpoint-title">
            <span class="method get">GET</span>
            <span class="path">/api/health</span>
          </div>
        </div>
        <div class="endpoint-body">
          <div class="endpoint-description">
            Health check endpoint that returns the status of the server and MongoDB connection. Useful for monitoring and debugging.
          </div>
          
          <div class="example-section">
            <div class="example-title">Example Response:</div>
            <div class="code-block">{
  "status": "ok",
  "message": "Server is running",
  "mongodb": "connected",
  "timestamp": "2024-01-01T00:00:00.000Z"
}</div>
          </div>
          
          <button class="try-button" onclick="testEndpoint('/api/health', 'health-response')">
            🚀 Try It Now
          </button>
          <div id="health-response" class="response-container"></div>
        </div>
      </div>

      <!-- Get All Products Endpoint -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <div class="endpoint-title">
            <span class="method get">GET</span>
            <span class="path">/api/products</span>
          </div>
        </div>
        <div class="endpoint-body">
          <div class="endpoint-description">
            Returns a list of all available products in the catalog with their details including id, name, price, description, and featured status.
          </div>
          
          <div class="example-section">
            <div class="example-title">Example Response:</div>
            <div class="code-block">{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Classic Jeans",
      "price": "$79.99",
      "description": "Timeless style with a perfect fit.",
      "featured": true
    },
    {
      "id": 2,
      "name": "Skinny Jeans",
      "price": "$89.99",
      "description": "Modern slim fit for a sleek look.",
      "featured": true
    }
    // ... more products
  ],
  "count": 24,
  "timestamp": "2024-01-01T00:00:00.000Z"
}</div>
          </div>
          
          <button class="try-button" onclick="testEndpoint('/api/products', 'products-response')">
            🚀 Try It Now
          </button>
          <div id="products-response" class="response-container"></div>
        </div>
      </div>

      <!-- Get Product by ID Endpoint -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <div class="endpoint-title">
            <span class="method get">GET</span>
            <span class="path">/api/products/:id</span>
          </div>
        </div>
        <div class="endpoint-body">
          <div class="endpoint-description">
            Returns detailed information about a specific product by its ID. Returns a 404 error if the product is not found.
          </div>
          
          <div class="example-section">
            <div class="example-title">Example Response (Success):</div>
            <div class="code-block">{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Classic Jeans",
    "price": "$79.99",
    "description": "Timeless style with a perfect fit.",
    "featured": true
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}</div>
          </div>
          
          <div class="example-section">
            <div class="example-title">Example Response (Not Found):</div>
            <div class="code-block">{
  "status": "error",
  "message": "Product not found",
  "timestamp": "2024-01-01T00:00:00.000Z"
}</div>
          </div>
          
          <button class="try-button" onclick="testEndpoint('/api/products/1', 'product-response')">
            🚀 Try It Now (Product ID: 1)
          </button>
          <div id="product-response" class="response-container"></div>
        </div>
      </div>

      <!-- Documentation Endpoint -->
      <div class="endpoint-section">
        <div class="endpoint-header">
          <div class="endpoint-title">
            <span class="method get">GET</span>
            <span class="path">/api/docs</span>
          </div>
        </div>
        <div class="endpoint-body">
          <div class="endpoint-description">
            Returns this interactive HTML documentation page. You're currently viewing it!
          </div>
          
          <div class="example-section">
            <div class="example-title">Usage:</div>
            <div class="code-block"># Via curl
curl https://shopify-jeagnz.netlify.app/api/docs

# Via browser
# Navigate to https://shopify-jeagnz.netlify.app/api/docs</div>
          </div>
        </div>
      </div>

      <div class="info-box" style="background: #fff3e0; border-color: #ff9800;">
        <h3>🚀 Quick Start</h3>
        <p>To get started with the API:</p>
        <ul>
          <li>Click the "Try It Now" buttons to test endpoints directly from this page</li>
          <li>Use the example code snippets with curl or your favorite HTTP client</li>
          <li>Check the <a href="https://github.com/jeremyagnz/Shopify-Jeagnz">GitHub repository</a> for more information</li>
        </ul>
      </div>
    </div>
    
    <footer>
      <p>Built with ❤️ for Shopify-Jeagnz | <a href="https://github.com/jeremyagnz/Shopify-Jeagnz" target="_blank">View on GitHub</a></p>
    </footer>
  </div>

  <script>
    async function testEndpoint(endpoint, responseId) {
      const responseContainer = document.getElementById(responseId);
      responseContainer.className = 'response-container visible';
      responseContainer.innerHTML = '<div class="response-title">Response:</div><div class="loading">Loading...</div>';
      
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        
        responseContainer.innerHTML = 
          '<div class="response-title">Response:</div>' +
          '<div class="code-block">' + JSON.stringify(data, null, 2) + '</div>';
      } catch (error) {
        responseContainer.innerHTML = 
          '<div class="response-title">Response:</div>' +
          '<div class="error">Error: ' + error.message + '</div>';
      }
    }
  </script>
</body>
</html>
  `;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: html,
  };
};

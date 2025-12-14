import type { ApiResponse } from '../types';
import type { Product } from '../data/products';

// API service for making HTTP requests
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Helper function to get the full API URL
const getApiUrl = (endpoint: string): string => {
  // For production (Netlify), use relative URLs
  // For development, BASE_URL should be set to the dev server
  if (BASE_URL) {
    return `${BASE_URL}${endpoint}`;
  }
  // Default to relative path which works with Netlify Functions
  return endpoint;
};

export const api = {
  get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    const response = await fetch(getApiUrl(endpoint));
    const data = await response.json();
    return {
      data,
      status: response.status,
    };
  },

  post: async <T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> => {
    const response = await fetch(getApiUrl(endpoint), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return {
      data,
      status: response.status,
      message: data.message,
    };
  },

  put: async <T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> => {
    const response = await fetch(getApiUrl(endpoint), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return {
      data,
      status: response.status,
      message: data.message,
    };
  },

  delete: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    const response = await fetch(getApiUrl(endpoint), {
      method: 'DELETE',
    });
    const data = await response.json();
    return {
      data,
      status: response.status,
      message: data.message,
    };
  },
};

// Product-specific API methods
export const productApi = {
  getAll: async () => {
    const response = await fetch(getApiUrl('/api/products'));
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(getApiUrl(`/api/products/${id}`));
    return response.json();
  },

  create: async (product: Omit<Product, 'id'>) => {
    const response = await fetch(getApiUrl('/api/products'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return response.json();
  },

  update: async (id: number, product: Omit<Product, 'id'>) => {
    const response = await fetch(getApiUrl(`/api/products/${id}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(getApiUrl(`/api/products/${id}`), {
      method: 'DELETE',
    });
    return response.json();
  },
};

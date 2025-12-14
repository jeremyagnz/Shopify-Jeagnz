import { useState, useEffect, useCallback } from 'react'
import type { Product } from '../data/products'
import { products as fallbackProducts } from '../data/products'

interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
  isFromCache: boolean
  isFromFallback: boolean
}

const CACHE_KEY = 'products_cache'
const CACHE_TIMESTAMP_KEY = 'products_cache_timestamp'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const API_TIMEOUT = 10000 // 10 seconds timeout for cold start
const MAX_RETRIES = 2

// Get API base URL from environment or use default
const getApiBaseUrl = (): string => {
  // In production on Netlify, use relative URLs
  if (window.location.hostname.includes('netlify.app')) {
    return ''
  }
  // For local development with Netlify Dev
  return import.meta.env.VITE_API_BASE_URL || ''
}

// Fetch products from cache
const getCachedProducts = (): Product[] | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY)
    
    if (!cached || !timestamp) return null
    
    const age = Date.now() - parseInt(timestamp, 10)
    if (age > CACHE_DURATION) {
      // Cache expired
      localStorage.removeItem(CACHE_KEY)
      localStorage.removeItem(CACHE_TIMESTAMP_KEY)
      return null
    }
    
    return JSON.parse(cached) as Product[]
  } catch {
    return null
  }
}

// Save products to cache
const setCachedProducts = (products: Product[]): void => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(products))
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString())
  } catch {
    // Ignore cache errors
  }
}

// Fetch products from API with timeout
const fetchProductsFromApi = async (retryCount = 0): Promise<Product[]> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)
  
  try {
    const baseUrl = getApiBaseUrl()
    const response = await fetch(`${baseUrl}/api/products`, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`)
    }
    
    const data = await response.json()
    
    // Handle different API response formats
    if (data.data && Array.isArray(data.data)) {
      return data.data
    } else if (Array.isArray(data)) {
      return data
    }
    
    throw new Error('Invalid API response format')
  } catch (error) {
    clearTimeout(timeoutId)
    
    // Retry logic with exponential backoff
    if (retryCount < MAX_RETRIES) {
      const delay = Math.pow(2, retryCount) * 1000 // 1s, 2s, 4s
      await new Promise(resolve => setTimeout(resolve, delay))
      return fetchProductsFromApi(retryCount + 1)
    }
    
    throw error
  }
}

export const useProducts = () => {
  const [state, setState] = useState<ProductsState>({
    products: [],
    loading: true,
    error: null,
    isFromCache: false,
    isFromFallback: false,
  })

  const loadProducts = useCallback(async () => {
    // First, check cache
    const cachedProducts = getCachedProducts()
    if (cachedProducts && cachedProducts.length > 0) {
      setState({
        products: cachedProducts,
        loading: false,
        error: null,
        isFromCache: true,
        isFromFallback: false,
      })
      return
    }

    // If no cache, show loading and try API
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const products = await fetchProductsFromApi()
      
      if (products && products.length > 0) {
        setCachedProducts(products)
        setState({
          products,
          loading: false,
          error: null,
          isFromCache: false,
          isFromFallback: false,
        })
      } else {
        throw new Error('No products returned from API')
      }
    } catch (error) {
      console.error('Failed to fetch products from API:', error)
      
      // Fall back to static data
      setState({
        products: fallbackProducts,
        loading: false,
        error: 'Unable to load products from server. Showing cached catalog.',
        isFromCache: false,
        isFromFallback: true,
      })
    }
  }, [])

  const retry = useCallback(() => {
    loadProducts()
  }, [loadProducts])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  return {
    ...state,
    retry,
  }
}

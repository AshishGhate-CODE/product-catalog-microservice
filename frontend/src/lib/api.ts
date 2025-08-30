import axios from 'axios';
import { Product, CreateProductRequest, UpdateProductRequest } from '@/types/product';
import { LoginRequest, RegisterRequest, AuthResponse } from '@/types/auth';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || 
                  localStorage.getItem('accessToken') || 
                  localStorage.getItem('jwt');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data on unauthorized response
      localStorage.removeItem('token');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Product API calls
export const productAPI = {
  getProducts: async (params?: {
    page?: number;
    size?: number;
    search?: string;
    category?: string;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
  }): Promise<{ content: Product[]; totalElements: number; totalPages: number }> => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (product: CreateProductRequest): Promise<Product> => {
    const response = await api.post('/products', product);
    return response.data;
  },

  updateProduct: async (product: UpdateProductRequest): Promise<Product> => {
    const response = await api.put(`/products/${product.id}`, product);
    return response.data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  getCategories: async (): Promise<string[]> => {
    try {
      const response = await api.get('/products/categories');
      return response.data;
    } catch (error) {
      // Fallback categories if endpoint doesn't exist
      return ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Health & Beauty'];
    }
  },
};

export default api;
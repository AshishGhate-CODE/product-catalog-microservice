import axios from 'axios';
import { Product, CreateProductRequest, UpdateProductRequest } from '@/types/product';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': import.meta.env.VITE_API_KEY || 'PASS_WORD',
  },
});

// Request interceptor (no JWT, only API key)
api.interceptors.request.use(
  (config) => {    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data on unauthorized response
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/* // Auth API calls (disabled - backend has no auth)
export const authAPI = {
  login: async () => {
    throw new Error("Auth not implemented in backend");
  },
  register: async () => {
    throw new Error("Auth not implemented in backend");
  },
  getCurrentUser: async () => {
    throw new Error("Auth not implemented in backend");
  },
}; */

// Fake Auth API calls (frontend-only demo)
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    // Pretend login always succeeds
    const fakeUser = { id: 1, email: credentials.email, name: "Demo User" };
    localStorage.setItem("user", JSON.stringify(fakeUser));
    localStorage.setItem("token", "fake-jwt-token");
    return { user: fakeUser, token: "fake-jwt-token" };
  },

  register: async (userData: { email: string; password: string; name: string }) => {
    // Pretend register always succeeds
    const fakeUser = { id: Date.now(), email: userData.email, name: userData.name };
    localStorage.setItem("user", JSON.stringify(fakeUser));
    localStorage.setItem("token", "fake-jwt-token");
    return { user: fakeUser, token: "fake-jwt-token" };
  },

  getCurrentUser: async () => {
    const user = localStorage.getItem("user");
    if (user) return JSON.parse(user);
    throw new Error("No user logged in");
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
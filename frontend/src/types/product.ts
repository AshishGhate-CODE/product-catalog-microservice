export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  brand?: string;
  stock: number;
  rating?: number;
  reviews?: Review[];
  attributes?: ProductAttribute[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  id: number;
  productId: number;
  rating: number;
  comment: string;
  author: string;
  createdAt: string;
}

export interface ProductAttribute {
  name: string;
  value: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  brand?: string;
  stock: number;
  imageUrl?: string;
}

export interface UpdateProductRequest extends CreateProductRequest {
  id: number;
}
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  image_url: string;
}

export interface CartItem {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

export interface Order {
  id: number;
  user_id?: number;
  user?: string;
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  product_id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => void;
  total: number;
  fetchCart: () => Promise<void>;
}
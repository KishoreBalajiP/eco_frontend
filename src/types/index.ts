export interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  // shipping info from DB
  shipping_name?: string;
  shipping_mobile?: string;
  shipping_line1?: string;
  shipping_line2?: string;
  shipping_city?: string;
  shipping_state?: string;
  shipping_postal_code?: string;
  shipping_country?: string;
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
  status: "pending" | "shipped" | "delivered" | "cancelled";
  created_at: string;
  items?: OrderItem[];
  shipping?: Shipping; // snapshot of shipping at order time
  payment_method?: string; // e.g., 'COD' or 'Razorpay'
  payment_status?: 'paid' | 'pending';
  cancelled_by?: 'user' | 'admin' | null; // NEW: who cancelled the order
}

export interface OrderItem {
  product_id: number;
  name: string;
  quantity: number;
  price: number;
}

// src/types/index.ts

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>; // updated to match new register
  completeRegistration: () => Promise<{ success: boolean; user: User }>; // <-- add this
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

// Updated to match DB
export interface Shipping {
  shipping_name: string;
  shipping_mobile: string;
  shipping_line1: string;
  shipping_line2?: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  shipping_country: string;
}
// OTP Response Interface
export interface OtpResponse {
  success: boolean;
  message: string;
}

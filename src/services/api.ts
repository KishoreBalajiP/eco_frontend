// src/services/api.ts
import axios from "axios";
import { User, Product, Order, Shipping } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// -------------------- Auth APIs --------------------
export const authAPI = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  register: async (name: string, email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await api.post("/auth/register", { name, email, password });
    return response.data;
  },

  sendOtp: async (email: string) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  verifyOtp: async (email: string, otp: string) => {
    const response = await api.post("/auth/verify-otp", { email, otp });
    return response.data;
  },

  resetPassword: async (email: string, newPassword: string) => {
    const response = await api.post("/auth/reset-password", { email, newPassword });
    return response.data;
  },

  // NEW: OTP-based registration flow
  initiateRegistrationOtp: async (email: string) => {
    const response = await api.post("/auth/register/initiate", { email });
    return response.data; // { success: true, message: "OTP sent" }
  },

  verifyRegistrationOtp: async (email: string, otp: string) => {
    const response = await api.post("/auth/register/verify", { email, otp });
    return response.data; // { success: true, message: "OTP verified" }
  },

  completeRegistration: async (name: string, email: string, password: string) => {
    const response = await api.post("/auth/register/complete", { name, email, password });
    return response.data; // { user, token }
  },
};

// -------------------- Products APIs --------------------
export const productsAPI = {
  getProducts: async (query?: string, page = 1, limit = 20) => {
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    const response = await api.get(`/products?${params.toString()}`);
    return response.data;
  },

  getProduct: async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
};

// -------------------- Cart APIs --------------------
export const cartAPI = {
  getCart: async () => {
    const response = await api.get("/cart");
    return response.data;
  },

  addToCart: async (product_id: number, quantity: number) => {
    const response = await api.post("/cart/add", { product_id, quantity });
    return response.data;
  },

  removeFromCart: async (product_id: number) => {
    const response = await api.post("/cart/remove", { product_id });
    return response.data;
  },
};

// -------------------- Orders APIs --------------------
export const ordersAPI = {
  createOrder: async (shipping: Shipping, paymentMethod: 'cod' | 'upi', currency = "INR") => {
    // Flatten shipping fields for backend
    const payload = {
      shipping_name: shipping.shipping_name,
      shipping_mobile: shipping.shipping_mobile,
      shipping_line1: shipping.shipping_line1,
      shipping_line2: shipping.shipping_line2,
      shipping_city: shipping.shipping_city,
      shipping_state: shipping.shipping_state,
      shipping_postal_code: shipping.shipping_postal_code,
      shipping_country: shipping.shipping_country,
      currency,
      paymentMethod,
    };

    const response = await api.post("/orders", payload);
    return response.data;
  },

  getOrders: async () => {
    const response = await api.get("/orders");
    return response.data;
  },

  getOrder: async (id: number) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  cancelOrder: async (id: number) => {
    const response = await api.patch(`/orders/${id}/cancel`);
    return response.data;
  },
};

// -------------------- Payments APIs --------------------
export const paymentsAPI = {
  // Generic create order (optional)
  createOrder: async (amount: number, currency = "INR", receipt: string) => {
    const response = await api.post("/payments/create-order", { amount, currency, receipt });
    return response.data;
  },

  // PhonePe / UPI payment
  createPhonePeOrder: async (orderId: number, amount: number) => {
    const response = await api.post("/payments/create-phonepe-order", { orderId, amount });
    return response.data; // HTML form string
  },
};

// -------------------- Chatbot APIs --------------------
export const chatbotAPI = {
  sendMessage: async (message: string) => {
    const response = await api.post("/chatbot/message", { message });
    return response.data;
  },
};

// -------------------- Admin APIs --------------------
export const adminAPI = {
  createProduct: async (product: FormData) => {
    const response = await api.post("/admin/products", product, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateProduct: async (id: number, product: FormData) => {
    const response = await api.put(`/admin/products/${id}`, product, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteProduct: async (id: number) => {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
  },

  getOrders: async (): Promise<{ orders: Order[] }> => {
    const response = await api.get("/admin/orders");
    return response.data;
  },

  updateOrderStatus: async (
    id: number,
    status: "pending" | "shipped" | "delivered" | "cancelled"
  ): Promise<{ order: Order }> => {
    const response = await api.patch(`/admin/orders/${id}/status`, { status });
    return response.data;
  },

  getUsers: async (): Promise<{ users: User[] }> => {
    const response = await api.get("/admin/users");
    return response.data;
  },

  updateUserRole: async (id: number, role: string): Promise<User> => {
    const response = await api.patch(`/admin/users/${id}/role`, { role });
    return response.data;
  },

  // ---------------- actions in admin panel ----------------
  getOrderById: async (id: number): Promise<{ order: Order }> => {
    const response = await api.get(`/admin/orders/${id}`);
    return response.data; // { order }
  },
};

export default api;

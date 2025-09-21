# Jaya Stores Frontend

This is a modern e-commerce frontend built with React, TypeScript, Vite, and Tailwind CSS. It supports user and admin roles, authentication, product browsing, cart management, order processing, and admin dashboards. Below is a detailed overview of the project structure and workflow.

## Project Structure

```
├── public/
├── src/
│   ├── App.tsx                # Main app component, sets up routing and context providers
│   ├── main.tsx               # Entry point, renders App
│   ├── index.css              # Tailwind CSS imports
│   ├── vite-env.d.ts          # Vite type definitions
│   ├── components/
│   │   ├── Cart/              # Cart item UI
│   │   ├── Chatbot/           # Chatbot UI
│   │   ├── Common/            # ProtectedRoute for auth
│   │   ├── Layout/            # Navbar and AdminSidebar
│   │   └── Products/          # ProductCard and ProductGrid
│   ├── context/
│   │   ├── AuthContext.tsx    # Auth state and logic
│   │   └── CartContext.tsx    # Cart state and logic
│   ├── pages/
│   │   ├── Admin/             # Dashboard, Products, Orders, Users management
│   │   ├── Auth/              # Login and Register
│   │   └── User/              # Home, Cart, Checkout, Orders, ProductDetails
│   ├── services/
│   │   └── api.ts             # API calls (auth, products, cart, orders)
│   └── types/
│       └── index.ts           # TypeScript interfaces for data models
├── package.json               # Project dependencies and scripts
├── tailwind.config.js         # Tailwind CSS config
├── postcss.config.js          # PostCSS config
├── vite.config.ts             # Vite config
├── tsconfig*.json             # TypeScript configs
└── eslint.config.js           # ESLint config
```

## Main Features & Workflow


## Main Features & Workflow

### 1. Authentication & Security
- User login, registration, and session state managed by `AuthContext.tsx`.
- Password reset flow with email OTP verification (`ForgotPassword.tsx`, `VerifyOtp.tsx`, `ResetPassword.tsx`).
- Protected routes restrict access to pages based on user role (admin/user).

### 2. Product Browsing & Search
- Browse products on `Home.tsx` with search functionality in navbar and home page.
- View product details and add to cart (`ProductDetails.tsx`).

### 3. Cart Management
- Add, update, and remove items from cart (`CartContext.tsx`, `Cart.tsx`).
- Responsive cart UI with quantity controls and total calculation.

### 4. Checkout & Payments
- Checkout supports multiple payment methods: Cash on Delivery, UPI (with transaction ID), and Razorpay/Card (`Checkout.tsx`).
- Order confirmation page displays order and payment details (`OrderConfirmation.tsx`).

### 5. Orders & History
- Users can view their order history (`Orders.tsx`).
- Admins manage all orders and update order status (pending, shipped, delivered, cancelled) (`OrdersManagement.tsx`).

### 6. Admin Dashboard & Management
- Dashboard shows stats: products, orders, users, revenue (`Dashboard.tsx`).
- Admins can add, edit, and delete products with image upload (`ProductsManagement.tsx`).
- User management with role assignment (user/admin) (`UsersManagement.tsx`).

### 7. Chatbot Support
- Floating chatbot for customer support on user pages (`Chatbot.tsx`).

### 8. API Integration
- All data is fetched and updated via REST APIs defined in `api.ts`.
- Axios is used for HTTP requests, with interceptors for auth and error handling.

### 9. UI & Styling
- Tailwind CSS for fast, responsive UI development.
- Lucide icons for visual elements.
- Modern, responsive layouts for all pages, with loading spinners and empty state messages.

### 10. Role-based Routing
- Protected routes for admin and user pages (`ProtectedRoute.tsx`).

### 11. Search Functionality
- Product and user search in admin panels and public pages.

---

## How It Works

1. **App Initialization**: `main.tsx` renders `App.tsx`, which sets up React Router and context providers for authentication and cart.
2. **Routing**: Pages are routed based on user role and authentication status. Protected routes ensure only authorized users can access admin/user pages.
3. **State Management**: Context providers (`AuthContext`, `CartContext`) manage global state for user and cart.
4. **API Communication**: All CRUD operations (login, register, product fetch, cart actions, order management) are performed via the API service.
5. **Admin Features**: Admins have access to dashboards and management pages for products, orders, and users.
6. **User Features**: Users can browse products, manage their cart, checkout, and view order history.
7. **Chatbot**: Users can interact with a chatbot for support.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run the development server**:
   ```bash
   npm run dev
   ```
3. **Build for production**:
   ```bash
   npm run build
   ```
4. **Lint the code**:
   ```bash
   npm run lint
   ```

## Environment
- Requires Node.js and npm.
- Backend API should be running at `http://localhost:5000/api`.

## License
MIT

---
This README provides a complete overview of the codebase, its structure, and workflow. For more details, refer to the comments in each file and explore the codebase.

# Jaya Stores Frontend

This is a modern e-commerce frontend built with React, TypeScript, Vite, and Tailwind CSS. It supports user and admin roles, authentication, product browsing, cart management, order processing, and admin dashboards. Below is a detailed overview of the project structure and workflow.


## Project Structure

```
├── public/                         # Static assets (images, favicon, etc.)
├── src/
│   ├── App.tsx                     # Main app component. Sets up all routes and context providers.
│   ├── main.tsx                    # Entry point. Renders the App into the DOM.
│   ├── index.css                   # Tailwind CSS imports and global styles.
│   ├── vite-env.d.ts               # Vite type definitions for TypeScript.
│   ├── components/                 # Reusable UI components
│   │   ├── Cart/
│   │   │   └── CartItem.tsx        # UI and logic for a single cart item (quantity, remove, etc.)
│   │   ├── Chatbot/
│   │   │   └── Chatbot.tsx         # Floating chatbot for customer support, API integration.
│   │   ├── Common/
│   │   │   └── ProtectedRoute.tsx  # Wrapper for protecting routes by auth/role.
│   │   ├── Layout/
│   │   │   ├── AdminSidebar.tsx    # Sidebar navigation for admin dashboard.
│   │   │   └── Navbar.tsx          # Top navigation bar with search, cart, user menu.
│   │   └── Products/
│   │       ├── ProductCard.tsx     # Card UI for a single product (image, price, add to cart).
│   │       └── ProductGrid.tsx     # Grid layout for displaying multiple products.
│   ├── context/                    # React context providers for global state
│   │   ├── AuthContext.tsx         # Authentication state, login/register/logout logic.
│   │   └── CartContext.tsx         # Cart state, add/remove/update/clear cart logic.
│   ├── pages/                      # All main pages (routed views)
│   │   ├── Admin/
│   │   │   ├── Dashboard.tsx           # Admin dashboard: stats for products, orders, users, revenue.
│   │   │   ├── OrdersManagement.tsx    # Admin: view and update all orders, change status.
│   │   │   ├── ProductsManagement.tsx  # Admin: add/edit/delete products, image upload.
│   │   │   └── UsersManagement.tsx     # Admin: view users, assign roles.
│   │   ├── Auth/
│   │   │   ├── ForgotPassword.tsx      # Start password reset, send OTP to email.
│   │   │   ├── Login.tsx               # User login form.
│   │   │   ├── Register.tsx            # User registration form.
│   │   │   ├── ResetPassword.tsx       # Set new password after OTP verification.
│   │   │   └── VerifyOtp.tsx           # Enter OTP sent to email for password reset.
│   │   └── User/
│   │       ├── Cart.tsx                # User's shopping cart page.
│   │       ├── Checkout.tsx            # Checkout form, payment method selection.
│   │       ├── Home.tsx                # Home page, product listing and search.
│   │       ├── OrderConfirmation.tsx   # Order confirmation and summary after checkout.
│   │       ├── Orders.tsx              # User's order history and status.
│   │       ├── ProductDetails.tsx      # Detailed view of a single product.
│   │       └── Profile.tsx             # User profile, view and edit shipping address.
│   ├── services/
│   │   └── api.ts                  # All API calls (auth, products, cart, orders, admin, chatbot). Uses Axios.
│   └── types/
│       └── index.ts                # TypeScript interfaces for all data models (User, Product, Order, etc.)
├── package.json                    # Project dependencies, scripts, and metadata.
├── tailwind.config.js              # Tailwind CSS configuration.
├── postcss.config.js               # PostCSS configuration for Tailwind and autoprefixer.
├── vite.config.ts                  # Vite build and dev server configuration.
├── tsconfig.json                   # Base TypeScript configuration.
├── tsconfig.app.json               # TypeScript config for app source files.
├── tsconfig.node.json              # TypeScript config for node scripts/configs.
├── eslint.config.js                # ESLint configuration for linting code.
├── index.html                      # Main HTML entry point for the app.
└── .gitignore                      # Files and folders to ignore in git.
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


## API Requests & Responses

All data is fetched and updated via REST APIs defined in `src/services/api.ts`. Axios is used for HTTP requests, with interceptors for authentication and error handling.

**Base URL:** `http://localhost:5000/api`

### Authentication
- **Login**
   - Request: `POST /auth/login` `{ email, password }`
   - Response: `{ user: { ...userFields }, token: "..." }`
- **Register**
   - Request: `POST /auth/register` `{ name, email, password }`
   - Response: `{ user: { ...userFields }, token: "..." }`
- **Forgot Password**
   - Request: `POST /auth/forgot-password` `{ email }`
   - Response: `{ message: "OTP sent" }`
- **Verify OTP**
   - Request: `POST /auth/verify-otp` `{ email, otp }`
   - Response: `{ message: "OTP verified" }`
- **Reset Password**
   - Request: `POST /auth/reset-password` `{ email, newPassword }`
   - Response: `{ message: "Password reset successful" }`

### Products
- **Get Products**
   - Request: `GET /products?q=search&page=1&limit=20`
   - Response: `{ products: [ { id, name, price, ... } ] }`
- **Get Product Details**
   - Request: `GET /products/:id`
   - Response: `{ product: { id, name, price, ... } }`

### Cart
- **Get Cart**
   - Request: `GET /cart`
   - Response: `{ cart: [ { product_id, name, price, quantity, ... } ] }`
- **Add to Cart**
   - Request: `POST /cart/add` `{ product_id, quantity }`
   - Response: `{ cart: [ ... ] }`
- **Remove from Cart**
   - Request: `POST /cart/remove` `{ product_id }`
   - Response: `{ cart: [ ... ] }`

### Orders
- **Create Order**
   - Request: `POST /orders` `{ shipping_name, shipping_mobile, ... }`
   - Response: `{ order: { id, ... }, items: [ ... ] }`
- **Get Orders**
   - Request: `GET /orders`
   - Response: `{ orders: [ { id, total, status, ... } ] }`
- **Get Order Details**
   - Request: `GET /orders/:id`
   - Response: `{ order: { ... }, items: [ ... ] }`
- **Cancel Order**
   - Request: `PATCH /orders/:id/cancel`
   - Response: `{ order: { ... } }`

### Admin APIs
- **Create Product**
   - Request: `POST /admin/products` (multipart/form-data)
   - Response: `{ product: { ... } }`
- **Update Product**
   - Request: `PUT /admin/products/:id` (multipart/form-data)
   - Response: `{ product: { ... } }`
- **Delete Product**
   - Request: `DELETE /admin/products/:id`
   - Response: `{ message: "Product deleted" }`
- **Get All Orders**
   - Request: `GET /admin/orders`
   - Response: `{ orders: [ ... ] }`
- **Update Order Status**
   - Request: `PATCH /admin/orders/:id/status` `{ status }`
   - Response: `{ order: { ... } }`
- **Get Users**
   - Request: `GET /admin/users`
   - Response: `{ users: [ ... ] }`
- **Update User Role**
   - Request: `PATCH /admin/users/:id/role` `{ role }`
   - Response: `{ user: { ... } }`

### Chatbot
- **Send Message**
   - Request: `POST /chatbot/message` `{ message }`
   - Response: `{ reply: "..." }`

---

## Environment
- Requires Node.js and npm.
- Backend API should be running at `http://localhost:5000/api`.

## License
MIT

---
This README provides a complete overview of the codebase, its structure, workflow, and API contracts. For more details, refer to the comments in each file and explore the codebase.

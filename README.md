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

### 1. Authentication
- `AuthContext.tsx` manages user login, registration, and session state.
- Auth pages (`Login.tsx`, `Register.tsx`) allow users to sign in or create accounts.
- Protected routes restrict access to certain pages based on user role (admin/user).

### 2. Product Browsing
- `Home.tsx` displays products using `ProductGrid` and supports search queries.
- `ProductDetails.tsx` shows detailed info and allows adding to cart.

### 3. Cart Management
- `CartContext.tsx` manages cart state and actions (add, update, remove).
- `Cart.tsx` displays cart items using `CartItem` component.
- `Checkout.tsx` handles order creation and payment method selection.

### 4. Orders
- Users can view their orders in `Orders.tsx` and see confirmation in `OrderConfirmation.tsx`.
- Admins manage all orders in `OrdersManagement.tsx`.

### 5. Admin Dashboard
- `Dashboard.tsx` shows stats (products, orders, users, revenue).
- `ProductsManagement.tsx` allows CRUD operations on products.
- `UsersManagement.tsx` manages user roles.

### 6. Chatbot
- `Chatbot.tsx` provides a simple chatbot interface for user support.

### 7. API Integration
- All data is fetched and updated via REST APIs defined in `api.ts`.
- Axios is used for HTTP requests, with interceptors for auth and error handling.

### 8. UI & Styling
- Tailwind CSS is used for fast, responsive UI development.
- Lucide icons are used for visual elements.

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

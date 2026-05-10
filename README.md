# 🏛️ Masion - High-End E-Commerce Experience

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/stripe-%23008CDD.svg?style=for-the-badge&logo=stripe&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## ✨ Description

**Masion** is a premium, full-stack e-commerce application designed with a minimalist, high-end fashion brand aesthetic. It delivers a seamless and luxurious shopping experience from product discovery to secure checkout. Built on the modern MERN stack, Masion prioritizes fast performance, robust state management, and reliable serverless deployments to ensure a flawless user journey and efficient store administration.

## 🚀 Key Features

### 👤 User Features
*   **Authentication & Authorization:** Secure user registration, login, and password recovery using JWT.
*   **Profile Management:** Users can view and update personal information, manage shipping details, and track order history.
*   **Wishlist:** Save favorite items for later viewing and quick purchasing.
*   **Reviews & Ratings:** Authenticated users can leave product reviews and rate their purchases.

### 🛍️ Product Features
*   **Comprehensive Catalog:** Browse detailed product pages featuring high-quality image galleries, rich descriptions, pricing, and stock status.
*   **Advanced Filtering & Search:** Easily discover products using category filters, price ranges, brand selections, and a responsive search bar.
*   **Dynamic Pagination & Loading:** Smooth navigation through large inventories with skeleton loaders for an elevated UX.

### 🛒 Cart & Checkout Features
*   **Dynamic Cart Management:** Add, remove, or adjust product quantities seamlessly with real-time subtotal calculations.
*   **Coupon System:** Apply promotional codes at checkout for instant discounts.
*   **Secure Checkout (Stripe):** Frictionless redirection to Stripe's highly secure, PCI-compliant Checkout portal.
*   **Automated Webhooks:** Instant synchronization between Stripe and the backend to reliably confirm payments and trigger order fulfillment.

### 🛡️ Admin Features
*   **Centralized Dashboard:** A comprehensive overview of store performance, revenue analytics, and recent activity.
*   **Product & Inventory Management:** Create new products, edit details, upload images, update stock levels, and manage categories/brands.
*   **Order Fulfillment:** Monitor all customer orders, update delivery statuses, and manage payment states through a dynamic modal interface.
*   **Customer Oversight:** View registered users and monitor customer metrics.
*   **Discount Management:** Create, edit, and track the performance of promotional coupons.

## 🛠️ Tech Stack

### Frontend
*   **Framework:** React
*   **Build Tool:** Vite
*   **Data Fetching & State:** React Query (TanStack Query)
*   **Styling:** Modern, minimalist CSS for high-end branding

### Backend
*   **Runtime:** Node.js
*   **Framework:** Express.js (RESTful API)
*   **Database:** MongoDB (Atlas) with Mongoose ORM
*   **Deployment:** Vercel (Serverless Functions)

### Integrations
*   **Payment Gateway:** Stripe Checkout & Stripe Webhooks

## 🔐 Environment Variables

To run this project locally, you will need to add the following environment variables to your `.env` files.

**Backend (`.env`):**
```env
PORT=8000
MONGO_URL=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
FRONTEND_URL=http://localhost:5173
```

**Frontend (`.env`):**
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## 💻 Local Installation & Setup

Follow these steps to get the project running locally.

### 1. Clone the repository
```bash
git clone https://github.com/ahmed441abdallah/Masion.git
cd Masion
```

### 2. Setup Backend
```bash
# Navigate to your backend directory
npm install

# Create your .env file and add the required variables
# cp .env.example .env

# Start the development server
npm run dev
```

### 3. Setup Frontend
```bash
# Navigate to your frontend directory
npm install

# Create your .env file and add the required variables
# cp .env.example .env

# Start the Vite development server
npm run dev
```

## 🔌 API Reference

The backend provides a robust RESTful API. Here are some of the primary endpoints:

*   **`GET /api/products`** - Fetch all products (supports filtering and pagination).
*   **`GET /api/products/:id`** - Fetch a single product by ID.
*   **`POST /api/orders`** - Create a new order (requires authentication).
*   **`GET /api/orders`** - Retrieve user orders or all orders (Admin).
*   **`POST /api/create-checkout-session`** - Initialize a Stripe Checkout session for cart items.
*   **`POST /webhook-checkout`** - Stripe Webhook endpoint to securely confirm payments and finalize order creation via serverless functions.
<img width="1920" height="1196" alt="admin" src="https://github.com/user-attachments/assets/e3721c93-98eb-4afe-9ca8-b4d170e0a580" />


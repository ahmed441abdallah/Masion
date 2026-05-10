import MainLayout from "@/layouts/MainLayout";
import { ShopPage } from "@/pages/Shop";
import { ProductDeatails } from "@/pages/Shop/ProductDeatails";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";

const LandingPage = lazy(() => import("../pages/Landing"));
const AboutPage = lazy(() => import("../pages/About"));
const ContactPage = lazy(() => import("../pages/Contact"));
const ChatPage = lazy(() => import("../pages/Chat"));
const BrandsPage = lazy(() => import("../pages/Brands"));
const CategoriesPage = lazy(() => import("../pages/Categories"));
const ProfilePage = lazy(() => import("../pages/Profile"));
const CartPage = lazy(() => import("../pages/Cart"));
const CheckoutPage = lazy(() => import("../pages/Checkout"));
const OrderSuccessPage = lazy(() => import("../pages/OrderSuccess"));

export const publicRoutes = {
  element: <MainLayout />,
  children: [
    { path: "/", element: <LandingPage /> },
    { path: "/about", element: <AboutPage /> },
    { path: "/contact", element: <ContactPage /> },
    { path: "/shop", element: <ShopPage /> },
    { path: "/shop/:id", element: <ProductDeatails /> },
    { path: "/chat", element: <ChatPage /> },
    { path: "/brands", element: <BrandsPage /> },
    { path: "/categories", element: <CategoriesPage /> },
    { path: "/cart", element: <CartPage /> },
    {
      element: <ProtectedRoute />,
      children: [
        { path: "/profile", element: <ProfilePage /> },
        { path: "/checkout", element: <CheckoutPage /> },
        { path: "/order-success", element: <OrderSuccessPage /> },
      ],
    },
  ],
};

import { lazy } from "react";
import AdminLayout from "@/layouts/AdminLayout";

const Analytics   = lazy(() => import("@/pages/Admin/Analytics"));
const Customers   = lazy(() => import("@/pages/Admin/Customers"));
const Dashboard   = lazy(() => import("@/pages/Admin/Dashboard"));
const Orders      = lazy(() => import("@/pages/Admin/Orders"));
const Products    = lazy(() => import("@/pages/Admin/Products"));
const AddProduct  = lazy(() => import("@/pages/Admin/AddProduct"));
const EditProduct = lazy(() => import("@/pages/Admin/EditProduct"));
const Categories  = lazy(() => import("@/pages/Admin/Categories").then(m => ({ default: m.Categories })));
const Brands      = lazy(() => import("@/pages/Admin/Brands").then(m => ({ default: m.Brands })));
const Cupons      = lazy(() => import("@/pages/Admin/Cupons"));

export const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { path: "/admin/dashboard",             element: <Dashboard /> },
    { path: "/admin/products",              element: <Products /> },
    { path: "/admin/products/add",          element: <AddProduct /> },
    { path: "/admin/products/edit/:id",     element: <EditProduct /> },
    { path: "/admin/orders",                element: <Orders /> },
    { path: "/admin/customers",             element: <Customers /> },
    { path: "/admin/analytics",             element: <Analytics /> },
    { path: "/admin/categories",            element: <Categories /> },
    { path: "/admin/brands",                element: <Brands /> },
    { path: "/admin/cupons",                element: <Cupons /> },
  ],
};

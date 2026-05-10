import AuthLayout from "@/layouts/AuthLayout.jsx";
import AdminLogin from "@/pages/Admin/Login";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import { ForgetPasswordPage } from "@/pages/ForgetPassword";
import { VerifyCodePage } from "@/pages/ForgetPassword/VerifyCodePage";
import { ResetPasswordPage } from "@/pages/ForgetPassword/ResetPasswordPage";

export const authRoutes = {
  element: <AuthLayout />,
  children: [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/admin/login", element: <AdminLogin /> },
    { path: "/forgot-password", element: <ForgetPasswordPage /> },
    { path: "/verify-code", element: <VerifyCodePage /> },
    { path: "/reset-password", element: <ResetPasswordPage /> },
  ],
};

import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./public.routes";
import { authRoutes } from "./auth.routes";
import { adminRoutes } from "./admin.routes";

export const router = createBrowserRouter([
  publicRoutes,
  authRoutes,
  adminRoutes,
  {
    path: "*",
    lazy: () =>
      import("../pages/NotFound").then((m) => ({ Component: m.default })),
  },
]);

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout.jsx.jsx";

// Pages
import Login from "./pages/Auth/Login";
import LandingPage from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES: Get the Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          {/* Nested routes work perfectly here too */}
          {/* <Route path="/shop/:productId" element={<ProductDetails />} /> */}
        </Route>

        {/* AUTH ROUTES: Clean page, no Navbar or Footer */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// layouts/AuthLayout.jsx
import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8">
        {/* Optional: A simple "Back to Home" link at the top */}
        <div className="mb-6">
          <Link
            to="/"
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            &larr; Back to Home
          </Link>
        </div>

        {/* The active auth page (Login.jsx or Register.jsx) is injected here */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

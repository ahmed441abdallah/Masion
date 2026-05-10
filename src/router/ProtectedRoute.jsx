import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const { user, token } = useSelector((state) => state.auth);
    const location = useLocation();

    const hasToken = localStorage.getItem("token") || token;

    if (!user && !hasToken) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!user && hasToken) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#fafafa]">
                <div className="w-6 h-6 border-2 border-neutral-200 border-t-neutral-800 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <Outlet /> 
    );
};

export default ProtectedRoute;
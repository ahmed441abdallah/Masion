import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  return (
    // A flex container to push the footer to the bottom of the screen
    <div className="flex flex-col min-h-screen">
      {/* 1. This Navbar will appear on every page that uses this layout */}
      <header>
        <Navbar />
      </header>

      {/* 2. The Outlet injects the active route's content here */}
      <main className="flex-grow bg-gray-50">
        <Outlet />
      </main>

      {/* 3. This Footer will appear at the bottom of every page */}
      <Footer />
    </div>
  );
};

export default MainLayout;

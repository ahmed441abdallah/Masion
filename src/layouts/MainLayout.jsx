import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "@/components/common/Header/index";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        © {new Date().getFullYear()} Job Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default AppLayout;

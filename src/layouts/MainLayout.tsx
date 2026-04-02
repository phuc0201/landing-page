import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Topbar from "../components/Topbar";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <Header />
      <main className="h-250">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

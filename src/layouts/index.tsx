import "./index.css";
import { Header } from "../components/header";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer";

export const PublicLayout = () => {
  return (
    <div className="publiclayout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

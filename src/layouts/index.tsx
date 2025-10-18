import "./index.css";
import { Box } from "@mui/material";
import { Header } from "../components/header";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer";

export const PublicLayout = () => {
  return (
    <Box className="publiclayout" sx={{paddingTop: "25rem !important"}}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

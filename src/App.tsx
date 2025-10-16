import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRouteLayout } from "./layouts/ProtectedRouteLayout"; 
import { Home } from "./pages/home";
import { Login } from "./components/login";
import { AuthProvider } from "./context/authContext";
import React from "react";


function AppRoutes() {
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRouteLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
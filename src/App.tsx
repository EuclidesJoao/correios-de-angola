import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRouteLayout } from "./layouts/ProtectedRouteLayout"; 
import { Home } from "./pages/home";
import { Login } from "./components/login";
import { AuthProvider } from "./context/authContext";
import { CalcularTarifas } from "./pages/calcular-tarifas";

function AppRoutes() {
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRouteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/calculo-tarifas" element={<CalcularTarifas/>} />
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
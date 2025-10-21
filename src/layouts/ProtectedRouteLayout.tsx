import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

const FullPageLoader = () => {
  return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h1>Carregando</h1>
  </div>;
};

export const ProtectedRouteLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="publiclayout" style={{ position: 'relative', minHeight: '100vh' }}>
      <Header />
      <main style={{ marginTop: '0px' }}> {/* Add margin to prevent content overlap */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
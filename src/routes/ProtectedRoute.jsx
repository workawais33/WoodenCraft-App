import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <section className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-stone-50 px-5">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-amber-700" />
          <p className="mt-4 text-sm font-semibold text-stone-600">
            Checking authentication...
          </p>
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default ProtectedRoute;
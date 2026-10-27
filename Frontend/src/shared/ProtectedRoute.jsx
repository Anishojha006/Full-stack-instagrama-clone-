import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../features/auth/hooks/useAuth.js';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main className="page-loading">
        <span className="loading-spinner" aria-hidden="true" />
        <p>Getting things ready...</p>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;

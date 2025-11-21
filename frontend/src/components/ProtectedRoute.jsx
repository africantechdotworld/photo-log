import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-deep-green">
        <div className="text-center">
          <div className="inline-block w-8 h-8 rounded-full border-4 border-solid animate-spin border-cream border-r-transparent"></div>
          <p className="mt-4 text-cream">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to signin page, saving the location they tried to access
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}


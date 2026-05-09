import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../application/context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

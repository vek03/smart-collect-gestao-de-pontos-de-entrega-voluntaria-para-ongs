import { Navigate } from 'react-router';
import { isAuthenticatedQuick } from '../utils/auth';

export default function ProtectedRoute({ children }) {
  if (!isAuthenticatedQuick()) {
    return <Navigate to="/login" replace />;
  }
  return children;
} 
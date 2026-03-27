import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RegistrationPage from './RegistrationPage';

export default function RegistrationWrapper() {
  const { token } = useAuth();

  if (token) {
    return <Navigate to='/dashboard' replace />;
  }

  return <RegistrationPage />;
}

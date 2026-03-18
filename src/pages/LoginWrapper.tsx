import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginPage from './LoginPage';

function LoginWrapper() {
  const { token } = useAuth();

  if (token) {
    return <Navigate to='/dashboard' replace />;
  }

  return <LoginPage />;
}

export default LoginWrapper;

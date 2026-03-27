import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginWrapper from './pages/LoginWrapper';
import DashboardPage from './pages/DashboardPage';
import ClientsPage from './pages/ClientsPage';
import ClientDetailPage from './pages/ClientDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout';
import RegistrationWrapper from './pages/RegistrationWrapper';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path='/' element={<Navigate to='/login' replace />} />

        <Route element={<AuthLayout />}>
          <Route path='/login' element={<LoginWrapper />} />
          <Route path='/register' element={<RegistrationWrapper />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/clients' element={<ClientsPage />} />
            <Route path='/clients/:id' element={<ClientDetailPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginWrapper from './pages/LoginWrapper';
import DashboardPage from './pages/DashboardPage';
import ClientsPage from './pages/ClientsPage';
import ClientDetailPage from './pages/ClientDetailPage';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path='/' element={<LoginWrapper />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/clients' element={<ClientsPage />} />
          <Route path='/clients/:id' element={<ClientDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

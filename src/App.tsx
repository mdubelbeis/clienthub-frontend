import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ClientsPage from './pages/ClientsPage';
import ClientDetailPage from './pages/ClientDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/clients' element={<ClientsPage />} />
        <Route path='/clients/:id' element={<ClientDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

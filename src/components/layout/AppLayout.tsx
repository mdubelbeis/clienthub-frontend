import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AppLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className='flex'>
      <aside className='w-64 h-screen bg-gray-900 text-white p-4'>
        <h2 className='text-xl font-bold mb-4'>ClientHub</h2>

        <nav className='space-y-2'>
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='/clients'>Clients</Link>
        </nav>

        <button
          onClick={handleLogout}
          className='mt-6 bg-red-500 px-3 py-2 rounded'
        >
          Logout
        </button>
      </aside>

      <main className='flex-1 p-6 bg-gray-100'>
        <Outlet /> {/* 🔥 THIS IS KEY */}
      </main>
    </div>
  );
}

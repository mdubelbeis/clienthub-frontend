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

        <nav className='space-y-2 space-x-2 text-blue-400'>
          <Link className='hover:text-blue-600 block' to='/dashboard'>
            Dashboard
          </Link>
          <Link className='hover:text-blue-600 block' to='/clients'>
            Clients
          </Link>
          <Link className='hover:text-blue-600 block' to='/reports'>
            Reports
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className='mt-6 bg-blue-600 px-3 py-2 rounded hover:bg-blue-800'
        >
          Logout
        </button>
      </aside>

      <main className='flex-1 p-6 bg-gray-100'>
        <Outlet />
      </main>
    </div>
  );
}
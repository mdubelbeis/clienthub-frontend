import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AppLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const navLinks = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Clients', to: '/clients' },
    { label: 'Reports', to: '/reports' },
  ];

  return (
    <div className='min-h-screen bg-gray-100 lg:flex'>
      {/* Mobile top bar */}
      <header className='sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm lg:hidden'>
        <Link to='/dashboard' className='text-lg font-bold text-slate-900'>
          ClientHub
        </Link>

        <button
          type='button'
          onClick={() => setSidebarOpen((prev) => !prev)}
          className='inline-flex items-center justify-center rounded-lg border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-100'
          aria-label='Toggle navigation menu'
          aria-expanded={sidebarOpen}
        >
          <span className='sr-only'>Open navigation menu</span>
          <div className='space-y-1.5'>
            <span className='block h-0.5 w-5 bg-current'></span>
            <span className='block h-0.5 w-5 bg-current'></span>
            <span className='block h-0.5 w-5 bg-current'></span>
          </div>
        </button>
      </header>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type='button'
          aria-label='Close navigation menu'
          onClick={closeSidebar}
          className='fixed inset-0 z-40 bg-black/40 lg:hidden'
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-900 p-4 text-white shadow-xl transition-transform duration-200 ease-in-out lg:static lg:z-auto lg:min-h-full lg:translate-x-0 lg:shadow-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='mb-6 flex items-center justify-between'>
          <Link
            to='/dashboard'
            onClick={closeSidebar}
            className='text-xl font-bold'
          >
            ClientHub
          </Link>

          <button
            type='button'
            onClick={closeSidebar}
            className='rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-white lg:hidden'
            aria-label='Close navigation menu'
          >
            ✕
          </button>
        </div>

        <nav className='space-y-2'>
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.to);

            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeSidebar}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className='mt-8 w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700'
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className='min-h-screen flex-1 p-4 sm:p-6 lg:p-8'>
        <Outlet />
      </main>
    </div>
  );
}

import { useAuth } from '../../hooks/useAuth';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  return (
    <div className='flex'>
      <aside className='w-64 h-screen bg-gray-900 text-white'>Sidebar</aside>
      <main className='flex-1 p-6'>{children}</main>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className='min-h-screen bg-slate-950 text-white'>
      <div className='grid min-h-screen lg:grid-cols-2'>
        <div className='hidden lg:flex flex-col justify-between border-r border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-12'>
          <div>
            <div className='inline-flex items-center rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-1 text-sm font-medium text-sky-300'>
              ClientHub CRM
            </div>

            <div className='mt-10 max-w-md'>
              <h1 className='text-4xl font-bold tracking-tight text-white'>
                Build stronger client relationships with less chaos.
              </h1>
              <p className='mt-4 text-lg leading-8 text-slate-300'>
                Manage clients, track touchpoints, and stay organized with a
                cleaner workflow built for focus.
              </p>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 backdrop-blur'>
              Centralized client records
            </div>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 backdrop-blur'>
              Secure authentication and protected routes
            </div>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 backdrop-blur'>
              Activity tracking built for real workflows
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center px-6 py-10 sm:px-8 lg:px-12'>
          <div className='w-full max-w-xl'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

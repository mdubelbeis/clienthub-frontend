export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-slate-800'>Dashboard</h1>
        <p className='mt-2 text-slate-400'>
          Welcome back. Here is a quick view of your client workspace.
        </p>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <div className='rounded-2xl border border-slate-800 bg-slate-900 p-5'>
          <p className='text-sm text-slate-400'>Total Clients</p>
          <p className='mt-2 text-3xl font-semibold text-white'>0</p>
        </div>

        <div className='rounded-2xl border border-slate-800 bg-slate-900 p-5'>
          <p className='text-sm text-slate-400'>Recent Activity</p>
          <p className='mt-2 text-3xl font-semibold text-white'>0</p>
        </div>

        <div className='rounded-2xl border border-slate-800 bg-slate-900 p-5'>
          <p className='text-sm text-slate-400'>Open Follow-ups</p>
          <p className='mt-2 text-3xl font-semibold text-white'>0</p>
        </div>

        <div className='rounded-2xl border border-slate-800 bg-slate-900 p-5'>
          <p className='text-sm text-slate-400'>Pipeline Value</p>
          <p className='mt-2 text-3xl font-semibold text-white'>$0</p>
        </div>
      </div>

      <div className='rounded-2xl border border-slate-800 bg-slate-900 p-6'>
        <h2 className='text-lg font-semibold text-white'>Recent Activity</h2>
        <p className='mt-2 text-sm text-slate-400'>
          No activity yet. Start by adding your first client.
        </p>
      </div>
    </div>
  );
}

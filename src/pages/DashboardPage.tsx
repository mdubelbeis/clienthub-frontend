import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardSummary } from '../api/dashboard.api';
import type {
  DashboardSummary,
  RecentActivity,
} from '../types/dashboard.types';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function formatLabel(value: string) {
  return value
    .toLowerCase()
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className='rounded-2xl bg-slate-950 p-6 shadow-sm'>
      <p className='text-sm font-medium text-slate-400'>{label}</p>
      <p className='mt-3 text-4xl font-bold tracking-tight text-white'>
        {value}
      </p>
    </div>
  );
}

function RecentActivityItem({ activity }: { activity: RecentActivity }) {
  return (
    <li className='rounded-xl border border-slate-800 bg-slate-950/70 p-4'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
        <div>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='rounded-full bg-sky-500/10 px-2.5 py-1 text-xs font-semibold text-sky-300'>
              {formatLabel(activity.type)}
            </span>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                activity.status === 'COMPLETED'
                  ? 'bg-emerald-500/10 text-emerald-300'
                  : 'bg-amber-500/10 text-amber-300'
              }`}
            >
              {formatLabel(activity.status)}
            </span>
          </div>

          <Link
            to={`/clients/${activity.clientId}`}
            className='mt-3 inline-block text-base font-semibold text-white transition hover:text-sky-300'
          >
            {activity.clientName}
          </Link>

          <p className='mt-2 line-clamp-2 text-sm leading-6 text-slate-400'>
            {activity.notes || 'No notes provided.'}
          </p>
        </div>

        <p className='text-sm text-slate-500'>
          {formatDate(activity.createdAt)}
        </p>
      </div>
    </li>
  );
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        setError('');
        const data = await getDashboardSummary();
        setSummary(data);
      } catch {
        setError('Unable to load dashboard summary.');
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
          Dashboard
        </h1>
        <p className='mt-3 text-slate-500'>Loading dashboard...</p>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
          Dashboard
        </h1>
        <div className='mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
          {error || 'Dashboard data unavailable.'}
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
            Dashboard
          </h1>
          <p className='mt-2 text-slate-500'>
            A quick view of your client workspace and recent CRM activity.
          </p>
        </div>

        <div className='flex gap-3'>
          <Link
            to='/clients'
            className='rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800'
          >
            View Clients
          </Link>
          <Link
            to='/reports'
            className='rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-400'
          >
            View Reports
          </Link>
        </div>
      </div>

      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <StatCard label='Total Clients' value={summary.totalClients} />
        <StatCard label='Total Activities' value={summary.totalActivities} />
        <StatCard label='Open Activities' value={summary.openActivities} />
        <StatCard
          label='Completed Activities'
          value={summary.completedActivities}
        />
      </section>

      <section className='rounded-2xl bg-slate-900 p-6 shadow-sm'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-xl font-bold text-white'>Recent Activity</h2>
            <p className='mt-1 text-sm text-slate-400'>
              Latest client interactions across your workspace.
            </p>
          </div>

          <Link
            to='/clients'
            className='text-sm font-semibold text-sky-300 transition hover:text-sky-200'
          >
            Manage clients
          </Link>
        </div>

        {summary.recentActivities.length === 0 ? (
          <div className='mt-6 rounded-xl border border-slate-800 bg-slate-950/70 p-5 text-sm text-slate-400'>
            No activity yet. Create a client and add your first activity.
          </div>
        ) : (
          <ul className='mt-6 space-y-3'>
            {summary.recentActivities.map((activity) => (
              <RecentActivityItem key={activity.id} activity={activity} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

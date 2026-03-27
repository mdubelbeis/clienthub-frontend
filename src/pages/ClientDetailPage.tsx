import { useParams } from 'react-router-dom';
import { useActivities } from '../features/activities/hooks/useActivities';
import CreateActivityForm from '../components/forms/CreateActivityForm';
import { useClient } from '../hooks/useClient';

export default function ClientDetailPage() {
  const { id } = useParams();

  const clientId = id ?? '';

  const {
    data: client,
    isLoading: isClientLoading,
    isError: isClientError,
  } = useClient(clientId);

  const {
    data: activities,
    isLoading: isActivitiesLoading,
    isError: isActivitiesError,
  } = useActivities(clientId);

  if (!clientId) {
    return <div className='text-red-400'>Client ID is missing.</div>;
  }

  if (isClientLoading || isActivitiesLoading) {
    return <div className='text-slate-300'>Loading...</div>;
  }

  if (isClientError) {
    return <div className='text-red-400'>Error loading client details.</div>;
  }

  if (isActivitiesError) {
    return <div className='text-red-400'>Error loading activities.</div>;
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Client Activities</h1>
          <p className='mt-2 text-sm text-slate-400'>
            Track interactions, log notes, and maintain a timeline for this
            client relationship.
          </p>
        </div>

        <div className='w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-5'>
          <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-400'>
            Client Details
          </h2>

          <div className='mt-4 space-y-4'>
            <div>
              <p className='text-xs text-slate-500'>Name</p>
              <p className='text-sm font-medium text-white'>{client?.name}</p>
            </div>

            <div>
              <p className='text-xs text-slate-500'>Email</p>
              <p className='text-sm font-medium text-white'>
                {client?.email || '—'}
              </p>
            </div>

            <div>
              <p className='text-xs text-slate-500'>Phone</p>
              <p className='text-sm font-medium text-white'>
                {client?.phone || '—'}
              </p>
            </div>

            <div>
              <p className='text-xs text-slate-500'>Created</p>
              <p className='text-sm font-medium text-white'>
                {client?.createdAt
                  ? new Date(client.createdAt).toLocaleString()
                  : '—'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <CreateActivityForm clientId={clientId} />

      <section className='rounded-2xl border border-slate-800 bg-slate-900 p-5'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-white'>
            Activity Timeline
          </h2>
          <span className='text-sm text-slate-400'>
            {activities?.length ?? 0} total
          </span>
        </div>

        {!activities || activities.length === 0 ? (
          <div className='rounded-xl border border-dashed border-slate-700 bg-slate-950 px-4 py-8 text-center text-sm text-slate-400'>
            No activities yet. Add the first interaction for this client.
          </div>
        ) : (
          <ul className='space-y-3'>
            {activities.map((activity) => (
              <li
                key={activity.id}
                className='rounded-xl border border-slate-800 bg-slate-950 p-4'
              >
                <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
                  <div>
                    <div className='inline-flex rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-300'>
                      {activity.type}
                    </div>

                    <p className='mt-3 text-sm leading-6 text-slate-200'>
                      {activity.notes}
                    </p>
                  </div>

                  <div className='text-xs text-slate-500 sm:text-right'>
                    {new Date(activity.createdAt).toLocaleString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateActivityForm from '../components/forms/CreateActivityForm';
import EditActivityModal from '../components/modals/EditActivityModal';
import { useActivities } from '../features/activities/hooks/useActivities';
import { useUpdateActivityStatus } from '../features/activities/hooks/useUpdateActivityStatus';
import { useClient } from '../hooks/useClient';
import type { Activity } from '../types/activity.types';
import { getActivityTypeClasses } from '../utils/activityTypeStyles';

export default function ClientDetailPage() {
  const { id } = useParams();
  const clientId = id ?? '';
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const {
    data: client,
    isLoading: isClientLoading,
    isError: isClientError,
  } = useClient(clientId);

  const {
    data: activities = [],
    isLoading: isActivitiesLoading,
    isError: isActivitiesError,
  } = useActivities(clientId);

  const updateActivityStatusMutation = useUpdateActivityStatus(clientId);

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
  };

  const handleCloseEditModal = () => {
    setEditingActivity(null);
  };

  const handleCompleteActivity = (activityId: string) => {
    updateActivityStatusMutation.mutate({
      activityId,
      status: 'COMPLETED',
    });
  };

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
    <>
      <div className='space-y-6'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>Client Activities</h1>
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
              {activities.length} total
            </span>
          </div>

          {activities.length === 0 ? (
            <div className='rounded-xl border border-dashed border-slate-700 bg-slate-950 px-4 py-8 text-center text-sm text-slate-400'>
              No activities yet. Add the first interaction for this client.
            </div>
          ) : (
            <ul className='space-y-3'>
              {activities.map((activity) => {
                const isCompleted = activity.status === 'COMPLETED';
                const isUpdatingStatus =
                  updateActivityStatusMutation.isPending &&
                  updateActivityStatusMutation.variables?.activityId ===
                    activity.id;

                return (
                  <li
                    key={activity.id}
                    className='rounded-xl border border-slate-800 bg-slate-950 p-4'
                  >
                    <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
                      <div className='flex-1'>
                        <div className='flex flex-wrap items-center gap-2'>
                          <div
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getActivityTypeClasses(
                              activity.type,
                            )}`}
                          >
                            {activity.type}
                          </div>

                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                              isCompleted
                                ? 'border-emerald-700 bg-emerald-950 text-emerald-300'
                                : 'border-amber-700 bg-amber-950 text-amber-300'
                            }`}
                          >
                            {activity.status}
                          </span>
                        </div>

                        <p className='mt-3 text-sm leading-6 text-slate-200'>
                          {activity.notes}
                        </p>

                        {activity.completedAt && (
                          <p className='mt-2 text-xs text-slate-500'>
                            Completed{' '}
                            {new Date(activity.completedAt).toLocaleString()}
                          </p>
                        )}
                      </div>

                      <div className='flex flex-col gap-3 sm:items-end'>
                        <div className='text-xs text-slate-500'>
                          {new Date(activity.createdAt).toLocaleString()}
                        </div>

                        <div className='flex gap-2'>
                          <button
                            type='button'
                            onClick={() => handleEditActivity(activity)}
                            className='rounded-md border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800'
                          >
                            Edit
                          </button>

                          <button
                            type='button'
                            onClick={() => handleCompleteActivity(activity.id)}
                            disabled={isCompleted || isUpdatingStatus}
                            className='rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400'
                          >
                            {isUpdatingStatus
                              ? 'Updating...'
                              : isCompleted
                                ? 'Completed'
                                : 'Complete'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      {editingActivity && (
        <EditActivityModal
          key={editingActivity.id}
          activity={editingActivity}
          clientId={clientId}
          onClose={handleCloseEditModal}
        />
      )}
    </>
  );
}

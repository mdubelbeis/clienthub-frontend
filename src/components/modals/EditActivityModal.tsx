import { useState } from 'react';
import { useUpdateActivity } from '../../features/activities/hooks/useUpdateActivity';
import type { Activity, ActivityType } from '../../types/activity.types';

interface EditActivityModalProps {
  activity: Activity;
  clientId: string;
  onClose: () => void;
}

const ACTIVITY_TYPE_OPTIONS: ActivityType[] = [
  'CALL',
  'EMAIL',
  'MEETING',
  'TASK',
];

export default function EditActivityModal({
  activity,
  clientId,
  onClose,
}: EditActivityModalProps) {
  const [type, setType] = useState<ActivityType>(activity.type);
  const [notes, setNotes] = useState(activity.notes);
  const [error, setError] = useState('');

  const updateActivityMutation = useUpdateActivity(clientId);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedNotes = notes.trim();

    if (!trimmedNotes) {
      setError('Notes are required.');
      return;
    }

    setError('');

    updateActivityMutation.mutate(
      {
        activityId: activity.id,
        data: {
          type,
          notes: trimmedNotes,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4'>
      <div className='w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl'>
        <div className='mb-4 flex items-center justify-between'>
          <div>
            <h2 className='text-lg font-semibold text-white'>Edit Activity</h2>
            <p className='mt-1 text-sm text-slate-400'>
              Update the activity type and notes.
            </p>
          </div>

          <button
            type='button'
            onClick={onClose}
            className='text-sm text-slate-400 transition hover:text-white'
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='activity-type'
              className='mb-1 block text-sm font-medium text-slate-200'
            >
              Type
            </label>

            <select
              id='activity-type'
              value={type}
              onChange={(e) => setType(e.target.value as ActivityType)}
              className='w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-slate-500'
            >
              {ACTIVITY_TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor='activity-notes'
              className='mb-1 block text-sm font-medium text-slate-200'
            >
              Notes
            </label>

            <textarea
              id='activity-notes'
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              className='w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-slate-500'
              placeholder='Enter activity notes'
            />
          </div>

          {(error || updateActivityMutation.isError) && (
            <div className='rounded-lg border border-red-900 bg-red-950/40 px-3 py-2 text-sm text-red-300'>
              {error || 'Failed to update activity. Please try again.'}
            </div>
          )}

          <div className='flex justify-end gap-3 pt-2'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800'
            >
              Cancel
            </button>

            <button
              type='submit'
              disabled={updateActivityMutation.isPending}
              className='rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700'
            >
              {updateActivityMutation.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

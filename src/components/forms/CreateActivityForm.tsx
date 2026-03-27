import { useState } from 'react';
import { useCreateActivity } from '../../features/activities/hooks/useCreateActivity';

const ACTIVITY_TYPES = ['NOTE', 'MEETING', 'EMAIL', 'TASK', 'CALL'] as const;

type ActivityType = (typeof ACTIVITY_TYPES)[number];

export default function CreateActivityForm({ clientId }: { clientId: string }) {
  const { mutate, isPending } = useCreateActivity(clientId);

  const [type, setType] = useState<ActivityType>('NOTE');
  const [notes, setNotes] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!notes.trim()) return;

    mutate(
      {
        type,
        notes: notes.trim(),
      },
      {
        onSuccess: () => {
          setType('NOTE');
          setNotes('');
        },
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5'
    >
      <div>
        <h2 className='text-lg font-semibold text-white'>Add Activity</h2>
        <p className='mt-1 text-sm text-slate-400'>
          Log a new interaction for this client.
        </p>
      </div>

      <div className='space-y-2'>
        <label
          htmlFor='activityType'
          className='text-sm font-medium text-slate-200'
        >
          Activity Type
        </label>
        <select
          id='activityType'
          value={type}
          onChange={(e) => setType(e.target.value as ActivityType)}
          className='w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-400/10'
        >
          {ACTIVITY_TYPES.map((activityType) => (
            <option key={activityType} value={activityType}>
              {activityType}
            </option>
          ))}
        </select>
      </div>

      <div className='space-y-2'>
        <label
          htmlFor='activityNotes'
          className='text-sm font-medium text-slate-200'
        >
          Notes
        </label>
        <textarea
          id='activityNotes'
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder='Add context, follow-up details, or outcome...'
          className='w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-400/10'
        />
      </div>

      <button
        type='submit'
        disabled={isPending || !notes.trim()}
        className='inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60'
      >
        {isPending ? 'Adding...' : 'Add Activity'}
      </button>
    </form>
  );
}
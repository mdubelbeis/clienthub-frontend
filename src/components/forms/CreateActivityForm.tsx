import { useState } from 'react';
import { useCreateActivity } from '../../features/activities/hooks/useCreateActivity';

export default function CreateActivityForm({ clientId }: { clientId: string }) {
  const { mutate, isPending } = useCreateActivity(clientId);

  const [type, setType] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!type || !notes) return;

    mutate({ type, notes });

    setType('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-2'>
      <input
        className='border p-2 w-full'
        placeholder='Activity Type'
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <textarea
        className='border p-2 w-full'
        placeholder='Notes'
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button className='bg-blue-500 text-white px-4 py-2' disabled={isPending}>
        {isPending ? 'Adding...' : 'Add Activity'}
      </button>
    </form>
  );
}

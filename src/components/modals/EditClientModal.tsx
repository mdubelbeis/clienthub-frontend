import { useState } from 'react';
import axios from 'axios';
import { useUpdateClient } from '../../features/clients/hooks/useUpdateClient';
import type { Client } from '../../types/client.types';

interface EditClientModalProps {
  client: Client;
  onClose: () => void;
}

export default function EditClientModal({
  client,
  onClose,
}: EditClientModalProps) {
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email ?? '');
  const [phone, setPhone] = useState(client.phone ?? '');

  const updateClientMutation = useUpdateClient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateClientMutation.mutate(
      {
        clientId: client.id,
        data: {
          name,
          email,
          phone,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  const errorMessage = (() => {
    if (!updateClientMutation.isError) return '';

    const error = updateClientMutation.error;

    if (axios.isAxiosError(error)) {
      return (
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Failed to update client.'
      );
    }

    return 'Failed to update client.';
  })();

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-xl'>
        <h2 className='mb-4 text-xl font-bold'>Edit Client</h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='mb-1 block text-sm font-medium'>Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full rounded border px-3 py-2'
              required
            />
          </div>

          <div>
            <label className='mb-1 block text-sm font-medium'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full rounded border px-3 py-2'
            />
          </div>

          <div>
            <label className='mb-1 block text-sm font-medium'>Phone</label>
            <input
              type='text'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='w-full rounded border px-3 py-2'
            />
          </div>

          {errorMessage && (
            <div className='rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700'>
              {errorMessage}
            </div>
          )}

          <div className='flex justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              disabled={updateClientMutation.isPending}
              className='rounded border px-4 py-2 text-sm'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={updateClientMutation.isPending}
              className='rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500 disabled:opacity-60'
            >
              {updateClientMutation.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

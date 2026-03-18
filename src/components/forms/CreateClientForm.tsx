import { useState } from 'react';
import { useCreateClient } from '../../features/clients/hooks/useCreateClient';

export default function CreateClientForm() {
  const { mutate, isPending } = useCreateClient();
  const [errorMessage, setErrorMessage] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    setErrorMessage('');

    mutate(
      { name, email, phone },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any) => {
          const message = err.response?.data?.message || 'Something went wrong';
          setErrorMessage(message);
        },
      },
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='space-y-2 mb-4'>
        <input
          className='border p-2 w-full'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='border p-2 w-full'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='border p-2 w-full'
          placeholder='Phone Number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          className='bg-blue-500 text-white px-4 py-2'
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create Client'}
        </button>
      </form>
      {errorMessage && <p className='text-red-500 text-sm'>{errorMessage}</p>}
    </>
  );
}

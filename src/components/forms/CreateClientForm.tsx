import axios from 'axios';
import { useState } from 'react';
import { useCreateClient } from '../../features/clients/hooks/useCreateClient';

function getClientCreateErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return 'Something went wrong.';
  }

  const errors = error.response?.data?.errors;
  const message = error.response?.data?.message;

  if (errors?.email) return errors.email;
  if (errors?.name) return errors.name;
  if (errors?.phone) return errors.phone;

  if (typeof message === 'string' && message.trim()) {
    return message;
  }

  return 'Something went wrong.';
}

export default function CreateClientForm() {
  const { mutate, isPending } = useCreateClient();
  const [errorMessage, setErrorMessage] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    mutate(
      { name, email, phone },
      {
        onSuccess: () => {
          setName('');
          setEmail('');
          setPhone('');
        },
        onError: (error) => {
          setErrorMessage(getClientCreateErrorMessage(error));
        },
      },
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='mb-4 space-y-2'>
        <input
          className='w-full border p-2'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='w-full border p-2'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='w-full border p-2'
          placeholder='Phone Number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          type='submit'
          className='bg-blue-500 px-4 py-2 text-white'
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create Client'}
        </button>
      </form>

      {errorMessage && <p className='text-sm text-red-500'>{errorMessage}</p>}
    </>
  );
}

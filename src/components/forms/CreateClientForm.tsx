import { useState } from 'react';
import { useCreateClient } from '../../features/clients/hooks/useCreateClient';

export default function CreateClientForm() {
  const { mutate, isPending } = useCreateClient();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    mutate({ name, email, phone });

    setName('');
    setEmail('');
    setPhone('');
  };

  return (
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

      <button className='bg-blue-500 text-white px-4 py-2' disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Client'}
      </button>
    </form>
  );
}

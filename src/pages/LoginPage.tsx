import { useState } from 'react';
import { login } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });
      setAuth(res.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid credentials');
      console.error(err);
    }
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          className='border p-2'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='border p-2'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='bg-blue-500 text-white px-4 py-2'>Login</button>
      </form>
    </div>
  );
}

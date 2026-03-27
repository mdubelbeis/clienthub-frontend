import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginUser } from '../api/auth.api';
import { useAuth } from '../hooks/useAuth';
import type { LoginRequest } from '../types/auth.types';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(formData);
      login(data.token);
      navigate('/dashboard');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Login failed.');
      } else {
        setError('Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur sm:p-10'>
      <div className='mb-8'>
        <div className='mb-4 inline-flex items-center rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300'>
          Welcome back
        </div>

        <h2 className='text-3xl font-bold tracking-tight text-white'>
          Sign in to ClientHub
        </h2>
        <p className='mt-2 text-sm leading-6 text-slate-400'>
          Access your dashboard and continue managing your client relationships.
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='space-y-2'>
          <label htmlFor='email' className='text-sm font-medium text-slate-200'>
            Email address
          </label>
          <input
            id='email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            required
            placeholder='admin@clienthub.com'
            className='w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-400/10'
          />
        </div>

        <div className='space-y-2'>
          <label
            htmlFor='password'
            className='text-sm font-medium text-slate-200'
          >
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            required
            placeholder='admin'
            className='w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-400/10'
          />
        </div>

        {error && (
          <div className='rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300'>
            {error}
          </div>
        )}

        <button
          type='submit'
          disabled={loading}
          className='inline-flex w-full items-center justify-center rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60'
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <div className='mt-8 border-t border-slate-800 pt-6 text-center text-sm text-slate-400'>
        Don&apos;t have an account?{' '}
        <Link
          to='/register'
          className='font-semibold text-sky-400 transition hover:text-sky-300'
        >
          Create one
        </Link>
      </div>
    </div>
  );
}
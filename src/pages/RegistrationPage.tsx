import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { RegistrationRequest } from '../types/auth.types';
import { registerUser } from '../api/auth.api';

const initialFormData: RegistrationRequest = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export default function RegistrationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<RegistrationRequest>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name as keyof RegistrationRequest]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const data = await registerUser(formData);

      setSuccess(data.message);
      setFormData(initialFormData);

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message ??
          err.response?.data?.error ??
          'Registration failed.';

        setError(message);
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
          Create account
        </div>

        <h2 className='text-3xl font-bold tracking-tight text-white'>
          Get started with ClientHub
        </h2>
        <p className='mt-2 text-sm leading-6 text-slate-400'>
          Create your account to access the dashboard and start managing
          clients.
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
          <div className='space-y-2'>
            <label
              htmlFor='firstName'
              className='text-sm font-medium text-slate-200'
            >
              First name
            </label>
            <input
              id='firstName'
              name='firstName'
              type='text'
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder='Mason'
              autoComplete='given-name'
              className='w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-400/10'
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='lastName'
              className='text-sm font-medium text-slate-200'
            >
              Last name
            </label>
            <input
              id='lastName'
              name='lastName'
              type='text'
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder='Dubelbeis'
              autoComplete='family-name'
              className='w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-400/10'
            />
          </div>
        </div>

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
            placeholder='you@example.com'
            autoComplete='email'
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
            placeholder='Create a strong password'
            autoComplete='new-password'
            className='w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-400/10'
          />
        </div>

        {error && (
          <div className='rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300'>
            {error}
          </div>
        )}

        {success && (
          <div className='rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300'>
            {success}
          </div>
        )}

        <button
          type='submit'
          disabled={loading}
          className='inline-flex w-full items-center justify-center rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60'
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <div className='mt-8 border-t border-slate-800 pt-6 text-center text-sm text-slate-400'>
        Already have an account?{' '}
        <Link
          to='/login'
          className='font-semibold text-sky-400 transition hover:text-sky-300'
        >
          Log in
        </Link>
      </div>
    </div>
  );
}

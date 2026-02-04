'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from '@/i18n/navigation';
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
};

const AuthForm = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || 'Login failed');
        return;
      }

      toast.success('Logged in successfully!');
      reset();
      router.push('/dashboard');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        id="login-email"
        placeholder="Email Address"
        type="email"
        {...register("email")}
        required
      />
      <input
        id="login-password"
        placeholder="Password"
        type="password"
        {...register("password")}
        required
      />
      <button
        type="submit"
        className="rv-1-banner-btn single-form-btn"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  );
};

export default AuthForm;

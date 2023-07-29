'use client';
import { FormEvent, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useSearchParams, redirect } from 'next/navigation';

export default function SignIn() {
  const emailRef = useRef<string | null>(null);
  const passwordRef = useRef<string | null>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) redirect(callbackUrl);
  }, [session]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signIn('credentials', {
      email: emailRef.current,
      password: passwordRef.current,
      redirect: true,
      callbackUrl,
    });
  };
  return (session && status === 'authenticated') || status === 'loading' ? (
    <></>
  ) : (
    <form
      method="post"
      action="/api/auth/callback/credentials"
      onSubmit={handleSubmit}
    >
      <label>
        Email
        <input
          name="email"
          type="email"
          onChange={(e) => (emailRef.current = e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          onChange={(e) => (passwordRef.current = e.target.value)}
        />
      </label>
      <button type="submit">Sign in</button>
    </form>
  );
}

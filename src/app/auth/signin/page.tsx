'use client';
import '@/assets/styles/auth.scss';
import { FormEvent, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useSearchParams, redirect } from 'next/navigation';
import { FormControl, TextField, Button, Typography } from '@mui/material';
import { useMutation } from 'react-query/react';
import NextLink from 'next/link';

export default function SignIn() {
  const emailRef = useRef<string | null>(null);
  const passwordRef = useRef<string | null>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const { data: session, status } = useSession();
  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      signIn('credentials', {
        email: emailRef.current,
        password: passwordRef.current,
        redirect: true,
        callbackUrl,
      }),
  });

  useEffect(() => {
    if (session) redirect(callbackUrl);
  }, [session]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    mutate();
  };
  return (session && status === 'authenticated') || status === 'loading' ? (
    <></>
  ) : (
    <section className="auth">
      <form
        method="post"
        action="/api/auth/callback/credentials"
        onSubmit={handleSubmit}
      >
        <FormControl className="form-control">
          <TextField
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            size="small"
            onChange={(e) => (emailRef.current = e.target.value)}
            required
          />
        </FormControl>
        <FormControl className="form-control">
          <TextField
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            size="small"
            onChange={(e) => (passwordRef.current = e.target.value)}
            required
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          role="sign-in"
          disabled={isLoading}
        >
          Sign In
        </Button>
        <FormControl>
          <Typography>
            No account yet?{' '}
            <NextLink href="/auth/signup">Sign up here</NextLink>
          </Typography>
        </FormControl>
      </form>
    </section>
  );
}

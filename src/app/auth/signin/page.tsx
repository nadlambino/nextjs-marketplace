'use client';
import '@/assets/styles/auth.scss';
import { FormEvent, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useSearchParams, redirect } from 'next/navigation';
import {
  FormControl,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import { useMutation } from 'react-query/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const emailRef = useRef<string | null>(null);
  const passwordRef = useRef<string | null>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const { data: session, status } = useSession();
  const {
    mutate,
    isLoading,
    data: signInResponse,
  } = useMutation({
    mutationFn: () =>
      signIn('credentials', {
        email: emailRef.current,
        password: passwordRef.current,
        redirect: false,
        callbackUrl,
      }),
  });
  const error: boolean = signInResponse && signInResponse.error ? true : false;

  useEffect(() => {
    if (session) {
      router.refresh();
      redirect(callbackUrl);
    }
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
        {error && (
          <Alert
            className="w-full"
            severity="error"
          >
            Failed to sign in. Please check your credentials.
          </Alert>
        )}
        <FormControl className="form-control">
          <TextField
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            size="small"
            onChange={(e) => (emailRef.current = e.target.value)}
            required
            error={error}
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
            error={error}
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
            No account yet? &nbsp;
            <NextLink href="/auth/signup">Sign up here</NextLink>
          </Typography>
        </FormControl>
      </form>
    </section>
  );
}

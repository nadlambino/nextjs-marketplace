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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
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
            name="firstName"
            type="text"
            label="First name"
            variant="outlined"
            size="small"
            onChange={(e) => (emailRef.current = e.target.value)}
            required
          />
        </FormControl>
        <FormControl className="form-control">
          <TextField
            name="lastName"
            type="text"
            label="Last name"
            variant="outlined"
            size="small"
            onChange={(e) => (emailRef.current = e.target.value)}
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Male"
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="Other"
            />
          </RadioGroup>
        </FormControl>
        <FormControl className="form-control">
          <TextField
            name="birthdate"
            type="date"
            label="Birthday"
            variant="outlined"
            size="small"
            onChange={(e) => (emailRef.current = e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
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
        <FormControl className="form-control">
          <TextField
            name="confirm"
            type="password"
            label="Confirm Password"
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
            Already have an account?{' '}
            <NextLink href="/auth/signin">Sign in here</NextLink>
          </Typography>
        </FormControl>
      </form>
    </section>
  );
}

'use client';
import '@/assets/styles/auth.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
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
  Alert,
} from '@mui/material';
import { useMutation } from 'react-query/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const firstNameRef = useRef<string | null>(null);
  const lastNameRef = useRef<string | null>(null);
  const genderRef = useRef<string | null>(null);
  const birthDateRef = useRef<string | null>(null);
  const emailRef = useRef<string | null>(null);
  const passwordRef = useRef<string | null>(null);
  const confirmRef = useRef<string | null>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const { data: session, status } = useSession();
  const {
    mutate,
    isLoading,
    data: signUpResponse,
  } = useMutation({
    mutationFn: () =>
      signIn('credentials', {
        firstName: firstNameRef.current,
        lastName: lastNameRef.current,
        gender: genderRef.current,
        birthdate: birthDateRef.current,
        email: emailRef.current,
        password: passwordRef.current,
        redirect: false,
        callbackUrl,
      }),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      router.refresh();
      redirect(callbackUrl);
    }

    if (!session && signUpResponse && signUpResponse.error) {
      setErrorMessage('Failed to sign up. Please try again later.');
    }
  }, [session, signUpResponse]);

  useEffect(() => {
    if (session) redirect(callbackUrl);
  }, [session]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (passwordRef.current !== confirmRef.current) {
      setErrorMessage('Password do not match');
      return;
    }
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
          {errorMessage && (
            <Alert
              className="w-full mb-5"
              severity="error"
            >
              {errorMessage}
            </Alert>
          )}
          <TextField
            name="firstName"
            type="text"
            label="First name"
            variant="outlined"
            size="small"
            onChange={(e) => (firstNameRef.current = e.target.value)}
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
            onChange={(e) => (lastNameRef.current = e.target.value)}
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
            onChange={(e) => (genderRef.current = e.target.value)}
          >
            <FormControlLabel
              value="m"
              control={<Radio />}
              label="Male"
            />
            <FormControlLabel
              value="f"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel
              value="o"
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
            onChange={(e) => (birthDateRef.current = e.target.value)}
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
            onChange={(e) => (confirmRef.current = e.target.value)}
            required
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          role="sign-up"
          disabled={isLoading}
        >
          Sign Up
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

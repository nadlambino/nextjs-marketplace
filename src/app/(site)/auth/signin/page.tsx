'use client';
import './../../../assets/styles/auth.scss';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
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
import { useForm } from 'react-hook-form';
import { Credentials, CredentialsSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignIn() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') || '/';
	const { data: session, status } = useSession();
	const {
		mutate,
		isLoading,
		data: signInResponse,
	} = useMutation({
		mutationFn: (credentials: Credentials) =>
			signIn('credentials', {
				...credentials,
				redirect: false,
				callbackUrl,
			}),
	});
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<Credentials>({
		resolver: zodResolver(CredentialsSchema),
	});

	useEffect(() => {
		if (session) {
			reset();
			router.refresh();
			router.replace(callbackUrl);
		}
	}, [session]);

	const onSubmit = (credentials: Credentials) => {
		if (Object.keys(errors).length > 0) return;

		mutate(credentials);
	};

	return (session && status === 'authenticated') || status === 'loading' ? (
		<></>
	) : (
		<section className="auth">
			<form
				method="post"
				action="/api/auth/callback/credentials"
				onSubmit={handleSubmit(onSubmit)}
			>
				{signInResponse?.error && (
					<Alert
						className="w-full"
						severity="error"
					>
						Failed to sign in. Please check your credentials.
					</Alert>
				)}
				<FormControl className="form-control">
					<TextField
						type="email"
						label="Email"
						variant="outlined"
						size="small"
						{...register('email')}
					/>
					{errors.email && (
						<Alert
							className="w-full mt-2"
							severity="error"
						>
							{errors.email.message}
						</Alert>
					)}
				</FormControl>
				<FormControl className="form-control">
					<TextField
						type="password"
						label="Password"
						variant="outlined"
						size="small"
						{...register('password')}
					/>
					{errors.password && (
						<Alert
							className="w-full mt-2"
							severity="error"
						>
							{errors.password.message}
						</Alert>
					)}
				</FormControl>
				<Button
					type="submit"
					variant="contained"
					role="sign-in"
					disabled={isLoading || isSubmitting}
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

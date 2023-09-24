'use client';
import './../../../assets/styles/auth.scss';
import { useEffect } from 'react';
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
import { useForm } from 'react-hook-form';
import { User, UserSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignIn() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<User>({
		resolver: zodResolver(UserSchema),
	});
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') || '/';
	const { data: session, status } = useSession();
	const {
		mutate,
		isLoading,
		data: signUpResponse,
	} = useMutation({
		mutationFn: (data: User) =>
			signIn('credentials', {
				...data,
				redirect: false,
				callbackUrl,
			}),
	});

	useEffect(() => {
		if (session) {
			reset();
			router.refresh();
			redirect(callbackUrl);
		}
	}, [session]);

	const onSubmit = (data: User) => {
		if (isLoading) return;

		mutate(data);
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
				{signUpResponse?.error && (
					<Alert
						className="w-full mb-5"
						severity="error"
					>
						Failed to sign up. Please try again later.
					</Alert>
				)}
				<FormControl className="form-control">
					<TextField
						{...register('firstName')}
						type="text"
						label="First name"
						variant="outlined"
						size="small"
					/>
					{errors?.firstName && (
						<Alert
							className="w-full mt-2"
							severity="error"
						>
							{errors.firstName.message}
						</Alert>
					)}
				</FormControl>
				<FormControl className="form-control">
					<TextField
						{...register('lastName')}
						type="text"
						label="Last name"
						variant="outlined"
						size="small"
					/>
					{errors?.lastName && (
						<Alert
							className="w-full mt-2"
							severity="error"
						>
							{errors.lastName.message}
						</Alert>
					)}
				</FormControl>
				<FormControl fullWidth>
					<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
					<RadioGroup
						row
						defaultValue="female"
					>
						<FormControlLabel
							{...register('gender')}
							value="m"
							control={<Radio />}
							label="Male"
						/>
						<FormControlLabel
							{...register('gender')}
							value="f"
							control={<Radio />}
							label="Female"
						/>
						<FormControlLabel
							{...register('gender')}
							value="o"
							control={<Radio />}
							label="Other"
						/>
					</RadioGroup>
					{errors?.gender && (
						<Alert
							className="w-full mt-2"
							severity="error"
						>
							{errors.gender.message}
						</Alert>
					)}
				</FormControl>
				<FormControl className="form-control">
					<TextField
						{...register('birthdate')}
						type="date"
						label="Birthday"
						variant="outlined"
						size="small"
						InputLabelProps={{ shrink: true }}
					/>
					{errors?.birthdate && (
						<Alert
							className="w-full mt-2"
							severity="error"
						>
							{errors.birthdate.message}
						</Alert>
					)}
				</FormControl>
				<FormControl className="form-control">
					<TextField
						{...register('email')}
						type="email"
						label="Email"
						variant="outlined"
						size="small"
					/>
					{errors?.email && (
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
						{...register('password')}
						type="password"
						label="Password"
						variant="outlined"
						size="small"
					/>
					{errors?.password && (
						<Alert
							className="w-full mt-2"
							severity="error"
						>
							{errors.password.message}
						</Alert>
					)}
				</FormControl>
				<FormControl className="form-control">
					<TextField
						{...register('confirm')}
						type="password"
						label="Confirm Password"
						variant="outlined"
						size="small"
					/>
					{errors?.confirm && (
						<Alert
							className="w-full mt-2"
							severity="error"
						>
							{errors.confirm.message}
						</Alert>
					)}
				</FormControl>
				<Button
					type="submit"
					variant="contained"
					role="sign-up"
					disabled={isLoading || isSubmitting}
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

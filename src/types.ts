import { z } from 'zod';

export const UserBasicInfoSchema = z.object({
	_id: z.string().optional(),
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	gender: z.string(),
	birthdate: z.string(),
	avatar: z.string().optional(),
	address: z
		.object({
			city: z.string(),
			street: z.string(),
			postalCode: z.string(),
		})
		.optional(),
	seller: z
		.object({
			isBanned: z.boolean(),
			bannedReason: z.string(),
			bannedUntil: z.string(),
		})
		.optional(),
	buyer: z
		.object({
			isBanned: z.boolean(),
			bannedReason: z.string(),
			bannedUntil: z.string(),
		})
		.optional(),
});

export type UserBasicInfo = z.infer<typeof UserBasicInfoSchema>;

export const CredentialsSchema = z
	.object({
		email: z.string().email('Email should be a valid email address'),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.max(16, 'Password must be at maximum of 16 characters')
			.optional(),
		confirm: z.string().optional(),
	})
	.refine(
		({ password, confirm }) => confirm === undefined || password === confirm,
		{
			message: 'Password did not matched',
			path: ['confirm'],
		}
	);

export type Credentials = z.infer<typeof CredentialsSchema>;

export const UserSchema = UserBasicInfoSchema.and(CredentialsSchema);

export type User = UserBasicInfo & Credentials;

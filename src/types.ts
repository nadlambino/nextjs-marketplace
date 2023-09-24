import { z } from 'zod';

export const UserBasicInfoSchema = z.object({
	_id: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	gender: z.string(),
	birthdate: z.string(),
	avatar: z.string(),
	address: z.object({
		city: z.string(),
		street: z.string(),
		postalCode: z.string(),
	}),
	seller: z.object({
		isBanned: z.boolean(),
		bannedReason: z.string(),
		bannedUntil: z.string(),
	}),
	buyer: z.object({
		isBanned: z.boolean(),
		bannedReason: z.string(),
		bannedUntil: z.string(),
	}),
});

export type UserBasicInfo = z.infer<typeof UserBasicInfoSchema>;

export const CredentialsSchema = z.object({
	email: z.string().email('Email should be a valid email address'),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.max(16, 'Password must be at maximum of 16 characters'),
});

export type Credentials = z.infer<typeof CredentialsSchema>;

export interface User extends UserBasicInfo, Credentials {}

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

export const ProductSchema = z.object({
	_id: z.string().optional(),
	name: z.string().min(1, 'Name is required'),
	sku: z.string().optional(),
	description: z.string().optional(),
	brand: z.string().optional(),
	model: z.string().optional(),
	manufacturer: z.string().optional(),
	condition: z.enum(['new', 'used', 'old']),
	categories: z.array(z.string()),
	weight: z.string().optional(),
	dimension: z.string().optional(),
	color: z.string().optional(),
	material: z.string().optional(),
	specs: z.string().optional(),
	price: z.number({ required_error: 'Price is required' }),
	quantity: z.number({ required_error: 'Price is required' }),
	sellerId: z.string().optional().nullable(),
	delivery: z.object({
		available: z.boolean().or(z.literal('true')).default(false),
		fee: z.number().optional().nullable(),
	}),
	pickup: z.object({
		available: z.boolean().or(z.literal('true')).default(false),
		establishment: z.string().optional().nullable(),
		building: z.string().optional().nullable(),
		address: z.string().optional().nullable(),
	}),
})
.refine(({ delivery: { available, fee } }) => {
		return available === false || fee
	}, {
		message: 'Shipping fee is required when delivery option is available.',
		path: ['delivery'],
	}
)
.refine(
	({ pickup: { available, establishment, building, address } }) => {
		return (available === false) || address && establishment && building
	},
	{
		message: 'Pickup location is required when pickup option is available.',
		path: ['pickup'],
	}
);

export type Product = z.infer<typeof ProductSchema>;

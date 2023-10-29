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
	deliverable: z.boolean().default(false),
	pickupable: z.boolean().or(z.literal('true')).default(false),
	pickupLocation: z.object({
		establishment: z.string(),
		building: z.string(),
		address: z.string(),
	}).optional(),
}).superRefine(({ pickupable, pickupLocation }, refinementContext) => {
	if (pickupable === false) return true;

	if (!pickupLocation?.establishment || !pickupLocation?.building || !pickupLocation?.address) {
		return refinementContext.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Pickup location is required when pickup option is available.',
			path: ['pickupable'],
		});
	}
});

export type Product = z.infer<typeof ProductSchema>;

import { z } from 'zod';

export const loginSchema = z
	.object({
		email: z.string().email().optional(),
		username: z.string().min(3, 'Username must be at least 3 characters long').optional(),
		password: z.string({ message: 'Password must be provided' }),
	})
	.refine((data) => data.email || data.username, {
		message: 'Either email or username must be provided',
	});

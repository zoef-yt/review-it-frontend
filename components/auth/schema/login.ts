import * as z from 'zod';

export const LoginSchema = z.object({
	usernameOrEmail: z.string().min(1, { message: 'Username or Email is required' }),
	password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

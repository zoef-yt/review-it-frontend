import * as z from 'zod';

export const LoginSchema = z.object({
	usernameOrEmail: z
		.string()
		.min(1, { message: 'Username or Email is required' })
		.refine(
			(value) => {
				const isUsername = /^[a-zA-Z0-9_]{3,}$/.test(value);
				const isEmail = !isUsername && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
				return isEmail || isUsername;
			},
			{
				message: 'Invalid Username or Email',
			},
		),
	password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

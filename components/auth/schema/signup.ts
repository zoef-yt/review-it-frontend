import * as z from 'zod';
export const SignupSchema = z
	.object({
		username: z
			.string()
			.min(3, 'Username must be at least 3 characters')
			.refine((value) => !value.includes('@'), {
				message: 'Username should not contain "@"',
			}),
		email: z.string().email('Invalid email address').optional(),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
			.optional(),
		confirmPassword: z.string().optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

import * as z from 'zod';

export const ResetPasswordSchema = z
	.object({
		newPassword: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters long' })
			.regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

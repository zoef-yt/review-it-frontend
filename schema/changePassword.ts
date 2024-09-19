import * as z from 'zod';

export const ChangePasswordSchema = z
	.object({
		currentPassword: z.string().min(1, { message: 'Current password is required' }),
		newPassword: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters long' })
			.regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' }),
		confirmPassword: z.string().min(1, { message: 'Please confirm your new password' }),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})
	.refine((data) => data.currentPassword !== data.newPassword, {
		message: 'New password must be different from the current password',
		path: ['newPassword'],
	});

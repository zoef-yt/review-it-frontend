import * as z from 'zod';

const signUpUsernameSchema = z.object({
	username: z
		.string()
		.min(3, { message: 'Username must be at least 3 characters.' })
		.refine((value) => !value.includes('@'), { message: 'Username cannot contain the @ symbol.' }),
});

const signUpFormSchema = signUpUsernameSchema
	.extend({
		email: z.string().email({
			message: 'Please enter a valid email address.',
		}),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters.' })
			.refine((value) => /[A-Z]/.test(value) && /[0-9]/.test(value), {
				message: 'Password must contain at least one capital letter and one number.',
			}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export { signUpUsernameSchema, signUpFormSchema };

import * as z from 'zod';

export const LoginSchema = z.object({
	usernameOrEmail: z.string(),
	password: z.string(),
});

'use server';

import { cookies } from 'next/headers';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import { convertZodErrors } from '@/utils/zod-error';
import { StringMap } from '@/commonTypes';
import { loginSchema } from '../schema/login';

type LoginFormHandlerResult = { success: false; error: string | StringMap } | { success: true };

export const loginFormHandler = async (formData: FormData): Promise<LoginFormHandlerResult> => {
	const unvalidatedFormData = {
		usernameOrEmail: formData.get('usernameOrEmail') as string,
		password: formData.get('password') as string,
	};
	const isEmail = unvalidatedFormData.usernameOrEmail.includes('@');
	const validatedData = {
		email: isEmail ? unvalidatedFormData.usernameOrEmail : undefined,
		username: !isEmail ? unvalidatedFormData.usernameOrEmail : undefined,
		password: unvalidatedFormData.password,
	};
	const result = loginSchema.safeParse(validatedData);
	if (!result.success) {
		const error = convertZodErrors(result.error);
		return { error, success: false };
	}

	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}auth/login`, result.data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.data?.accessToken) {
			const decodedToken = jwt.decode(response.data.accessToken) as jwt.JwtPayload;
			if (decodedToken && decodedToken.exp) {
				const expiryDate = new Date(decodedToken.exp * 1000);
				cookies().set({
					name: 'accessToken',
					value: response.data.accessToken,
					httpOnly: true,
					sameSite: 'strict',
					secure: true,
					expires: expiryDate,
				});
			}
		}
		return { success: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				error: error.response?.data?.message || 'An unexpected error occurred',
				success: false,
			};
		} else {
			console.error('Unknown error:', error);
			return {
				error: 'An unexpected error occurred',
				success: false,
			};
		}
	}
};

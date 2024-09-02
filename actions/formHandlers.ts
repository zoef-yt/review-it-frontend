'use server';

import axios, { AxiosError } from 'axios';
import jwt from 'jsonwebtoken';

import { convertZodErrors } from '@/utils/zod-error';
import { StringMap } from '@/commonTypes';
import { addCookie, getSession, removeCookie } from '@/libs';
import { loginSchema } from '../schema/login';
import { getClientInfo } from './getClientInfo';

type LoginFormHandlerResult = { success: false; error: string | StringMap } | { success: true };

export const loginFormHandler = async (formData: FormData, navigator: string): Promise<LoginFormHandlerResult> => {
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
		const userInfo = await getClientInfo(navigator);
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_BACKEND}auth/login`,
			{ ...result.data, userInfo },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (response.data?.accessToken) {
			const decodedToken = jwt.decode(response.data.accessToken) as jwt.JwtPayload;
			if (decodedToken && decodedToken.exp) {
				const expiryDate = new Date(decodedToken.exp * 1000);
				addCookie('accessToken', response.data.accessToken, {
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

type ValidateUsernameResult = { valid: true } | { error: string; valid: false };
export const validateUsername = async (username: string): Promise<ValidateUsernameResult> => {
	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}auth/validate-username`, { username });
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			return { error: error.response.data.message, valid: false };
		} else {
			return { error: 'An unknown error occurred', valid: false };
		}
	}
};

interface SignupInput {
	username: string;
	email: string;
	password: string;
}
export const signupFormHandler = async (data: SignupInput): Promise<any> => {
	const { username, email, password } = data;
	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}auth/signup`, {
			username,
			email,
			password,
		});
		if (response.data?.accessToken) {
			const decodedToken = jwt.decode(response.data.accessToken) as jwt.JwtPayload;
			if (decodedToken && decodedToken.exp) {
				const expiryDate = new Date(decodedToken.exp * 1000);
				addCookie('accessToken', response.data.accessToken, {
					httpOnly: true,
					sameSite: 'strict',
					secure: true,
					expires: expiryDate,
				});
			}
		}
		return { success: true, data: response.data };
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return { error: error.response.data.message, success: false };
		} else {
			return { error: 'An unknown error occurred', success: false };
		}
	}
};

interface ChangePasswordFormInputs {
	currentPassword: string;
	newPassword: string;
}
export const changePassworHandler = async (userInfo: ChangePasswordFormInputs): Promise<any> => {
	const { currentPassword, newPassword } = userInfo;
	const token = await getSession('accessToken');
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_BACKEND}auth/change-password`,
			{
				currentPassword,
				newPassword,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		await removeCookie('accessToken');
		const accessToken = await getSession('accessToken');
		if (accessToken) {
			return { error: 'Failed to log out', success: false };
		}
		return { success: true, message: response.data.message };
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			return { error: error.response.data.message, success: false };
		} else {
			return { error: 'An unknown error occurred', success: false };
		}
	}
};

interface ForgotPasswordInput {
	email: string;
}
export const forgotPasswordHandler = async (data: ForgotPasswordInput): Promise<any> => {
	const { email } = data;
	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}auth/request-password-reset`, { email });
		return { success: true, message: response.data.message };
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			return { error: error.response.data.message, success: false };
		} else {
			return { error: 'An unknown error occurred', success: false };
		}
	}
};

interface ResetPasswordInput {
	newPassword: string;
	confirmPassword: string;
	email: string;
	token: string;
}
export async function resetPasswordHandler(data: ResetPasswordInput): Promise<any> {
	const { newPassword, email, token } = data;
	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}auth/reset-password`, {
			newPassword,
			email,
			token,
		});
		return { success: true, message: response.data.message };
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return { error: error.response.data.message, success: false };
		} else {
			return { error: 'An unknown error occurred', success: false };
		}
	}
}

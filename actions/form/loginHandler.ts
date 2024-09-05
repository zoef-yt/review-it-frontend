'use server';

import axios from 'axios';
import jwt from 'jsonwebtoken';

import { addCookie } from '@/libs';
import { getClientInfo } from '../getClientInfo';

export interface LoginFormHandlerResult {
	success: boolean;
	error?: string;
}

interface LoginFormHandler {
	usernameOrEmail: string;
	password: string;
	navigator: string;
	date: Date;
}
export const loginFormHandler = async (props: LoginFormHandler): Promise<LoginFormHandlerResult> => {
	const { usernameOrEmail, password, navigator, date } = props;
	try {
		const userInfo = await getClientInfo(navigator, date);
		const data = {
			userInfo,
			password: password,
			username: usernameOrEmail.includes('@') ? undefined : usernameOrEmail,
			email: usernameOrEmail.includes('@') ? usernameOrEmail : undefined,
		};
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_BACKEND}auth/login`,
			{ ...data },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		if (response.data?.accessToken) {
			const decodedToken = jwt.decode(response.data.accessToken) as jwt.JwtPayload;

			if (decodedToken?.exp) {
				const expiryDate = new Date(decodedToken.exp * 1000);
				addCookie('accessToken', response.data.accessToken, {
					httpOnly: true,
					sameSite: 'strict',
					secure: true,
					expires: expiryDate,
				});
			} else {
				console.warn('Access token does not have an expiration date.');
			}

			return { success: true };
		}

		return {
			success: false,
			error: 'Failed to retrieve access token',
		};
	} catch (error) {
		// console.error('Login failed:', error);
		return {
			success: false,
			error: axios.isAxiosError(error) ? error.response?.data?.message || 'An unexpected error occurred' : 'An unexpected error occurred',
		};
	}
};

'use server';

import { addCookie } from '@/libs';
import axios from 'axios';
import jwt from 'jsonwebtoken';

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

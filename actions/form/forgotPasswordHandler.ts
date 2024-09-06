'use server';

import axios, { AxiosError } from 'axios';

import { ClientInfo } from '@/commonTypes';

interface ForgotPasswordInput {
	email: string;
	userInfo: ClientInfo;
}
export const forgotPasswordHandler = async (data: ForgotPasswordInput): Promise<any> => {
	const { email, userInfo } = data;
	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}auth/request-password-reset`, {
			email,
			userInfo,
		});
		return { success: true, message: response.data.message };
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			return { error: error.response.data.message, success: false };
		} else {
			return { error: 'An unknown error occurred', success: false };
		}
	}
};

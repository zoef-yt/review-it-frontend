'use server';

import axios from 'axios';

import { ClientInfo } from '@/commonTypes';

interface ResetPasswordInput {
	newPassword: string;
	email: string;
	token: string;
	userInfo: ClientInfo;
}

export async function resetPasswordHandler(data: ResetPasswordInput): Promise<any> {
	const { newPassword, email, token, userInfo } = data;
	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}auth/reset-password`, {
			newPassword,
			email,
			token,
			userInfo,
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

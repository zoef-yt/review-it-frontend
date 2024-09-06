'use server';

import axios from 'axios';
import { getClientInfo } from '../getClientInfo';

interface ResetPasswordInput {
	newPassword: string;
	email: string;
	token: string;
	navigator: string;
	date: Date;
}

export async function resetPasswordHandler(data: ResetPasswordInput): Promise<any> {
	const { newPassword, email, token, date, navigator } = data;

	const userInfo = await getClientInfo(navigator, date);
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

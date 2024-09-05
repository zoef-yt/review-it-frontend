'use server';

import axios, { AxiosError } from 'axios';
import { getClientInfo } from '../getClientInfo';

interface ForgotPasswordInput {
	email: string;
	navigator: string;
	date: Date;
}
export const forgotPasswordHandler = async (data: ForgotPasswordInput): Promise<any> => {
	const { email, navigator, date } = data;
	const userInfo = await getClientInfo(navigator, date);
	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}auth/request-password-reset`, {
			email,
			userInfo: {
				...userInfo,
				time: userInfo.loginTime,
			},
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

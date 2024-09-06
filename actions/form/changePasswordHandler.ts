'use server';

import axios, { AxiosError } from 'axios';

import { getSession, removeCookie } from '@/libs';
import { ClientInfo } from '@/commonTypes';

interface ChangePasswordFormInputs {
	currentPassword: string;
	newPassword: string;
	userInfo: ClientInfo;
}
export const changePassworHandler = async (data: ChangePasswordFormInputs): Promise<any> => {
	const { currentPassword, newPassword, userInfo } = data;
	const token = await getSession('accessToken');
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_BACKEND}auth/change-password`,
			{
				currentPassword,
				newPassword,
				userInfo,
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

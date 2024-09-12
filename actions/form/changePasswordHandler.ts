'use server';

import { getSession, removeCookie } from '@/libs';
import { ClientInfo } from '@/commonTypes';
import { makeRequest } from '../makeRequest';

interface ChangePasswordFormInputs {
	currentPassword: string;
	newPassword: string;
	userInfo: ClientInfo;
}

interface ChangePasswordApiResponse {
	message: string;
}

type ChangePasswordResponse =
	| {
			success: true;
			message: string;
	  }
	| {
			success: false;
			error: string;
	  };

export const changePassworHandler = async (data: ChangePasswordFormInputs): Promise<ChangePasswordResponse> => {
	const { currentPassword, newPassword, userInfo } = data;
	const response = await makeRequest<ChangePasswordApiResponse, ChangePasswordFormInputs>({
		method: 'post',
		endpoint: 'auth/change-password',
		auth: 'bearer',
		data: {
			currentPassword,
			newPassword,
			userInfo,
		},
	});

	if (response.success) {
		await removeCookie('accessToken');
		const accessToken = await getSession('accessToken');
		if (accessToken) {
			return { error: 'Failed to log out', success: false };
		}
		return { success: true, message: response.data.message };
	} else {
		return { error: response.error, success: false };
	}
};

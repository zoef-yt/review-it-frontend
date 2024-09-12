'use server';

import { ClientInfo } from '@/commonTypes';
import { makeRequest } from '../makeRequest';

interface ResetPasswordInput {
	newPassword: string;
	email: string;
	token: string;
	userInfo: ClientInfo;
}

interface ResetPasswordApiResponse {
	message: string;
}

type ResetPasswordResponse =
	| {
			success: true;
			message: string;
	  }
	| {
			success: false;
			error: string;
	  };

export async function resetPasswordHandler(data: ResetPasswordInput): Promise<ResetPasswordResponse> {
	const { newPassword, email, token, userInfo } = data;
	const response = await makeRequest<ResetPasswordApiResponse, ResetPasswordInput>({
		method: 'post',
		endpoint: 'auth/reset-password',
		auth: 'none',
		data: {
			newPassword,
			email,
			token,
			userInfo,
		},
	});
	if (response.success) {
		return { success: true, message: response.data.message };
	} else {
		return { success: false, error: response.error };
	}
}

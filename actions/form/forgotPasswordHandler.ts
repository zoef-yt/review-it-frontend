'use server';

import { ClientInfo } from '@/commonTypes';
import { makeRequest } from '../makeRequest';

interface ForgotPasswordInput {
	email: string;
	userInfo: ClientInfo;
}

interface ForgotPasswordApiResponse {
	message: string;
}

type ForgotPasswordResponse =
	| {
			success: true;
			message: string;
	  }
	| {
			success: false;
			error: string;
	  };

export const forgotPasswordHandler = async (data: ForgotPasswordInput): Promise<ForgotPasswordResponse> => {
	const { email, userInfo } = data;
	const response = await makeRequest<ForgotPasswordApiResponse, ForgotPasswordInput>({
		method: 'post',
		endpoint: 'auth/request-password-reset',
		auth: 'none',
		data: {
			email,
			userInfo,
		},
	});

	if (response.success) {
		return { success: true, message: response.data.message };
	} else {
		return { success: false, error: response.error };
	}
};

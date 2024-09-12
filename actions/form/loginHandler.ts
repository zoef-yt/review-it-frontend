'use server';

import jwt from 'jsonwebtoken';

import { addCookie } from '@/libs';
import { ClientInfo } from '@/commonTypes';
import { makeRequest } from '../makeRequest';

type LoginFormResponse =
	| {
			success: true;
	  }
	| {
			success: false;
			error: string;
	  };
interface LoginFormHandler {
	usernameOrEmail: string;
	password: string;
	userInfo: ClientInfo;
}

interface LoginApiResponse {
	accessToken: string;
}

export const loginFormHandler = async (props: LoginFormHandler): Promise<LoginFormResponse> => {
	const { usernameOrEmail, password, userInfo } = props;
	const data = {
		userInfo: {
			...userInfo,
			loginTime: userInfo.time,
		},
		password: password,
		username: usernameOrEmail.includes('@') ? undefined : usernameOrEmail,
		email: usernameOrEmail.includes('@') ? usernameOrEmail : undefined,
	};
	const response = await makeRequest<LoginApiResponse, typeof data>({
		method: 'post',
		endpoint: 'auth/login',
		auth: 'none',
		data,
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (response.success) {
		if (response.data.accessToken) {
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
		} else {
			return { success: false, error: 'Failed to retrieve access token' };
		}
	} else {
		return { success: false, error: response.error };
	}
};

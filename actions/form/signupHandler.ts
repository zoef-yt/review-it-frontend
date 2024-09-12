'use server';

import jwt from 'jsonwebtoken';

import { addCookie } from '@/libs';
import { makeRequest } from '../makeRequest';

interface SignupInput {
	username: string;
	email: string;
	password: string;
}
interface SignupApiResponse {
	accessToken: string;
	email: string;
	id: string;
	username: string;
}

type SignupResponse =
	| {
			success: true;
	  }
	| {
			success: false;
			error: string;
	  };

export const signupFormHandler = async (data: SignupInput): Promise<SignupResponse> => {
	const response = await makeRequest<SignupApiResponse, SignupInput>({
		method: 'post',
		endpoint: 'auth/signup',
		auth: 'none',
		data,
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

				return { success: true };
			} else {
				console.warn('Access token does not have an expiration date.');
				return { success: false, error: 'Failed to retrieve access token' };
			}
		} else {
			return { success: false, error: 'Failed to retrieve access token' };
		}
	} else {
		return { success: false, error: response.error };
	}
};

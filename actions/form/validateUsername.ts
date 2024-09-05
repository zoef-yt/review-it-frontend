'use server';

import axios, { AxiosError } from 'axios';

type ValidateUsernameResult = { valid: true } | { error: string; valid: false };

export const validateUsername = async (username: string): Promise<ValidateUsernameResult> => {
	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}auth/validate-username`, { username });
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			return { error: error.response.data.message, valid: false };
		} else {
			return { error: 'An unknown error occurred', valid: false };
		}
	}
};

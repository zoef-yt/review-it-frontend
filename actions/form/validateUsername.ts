'use server';

import { makeRequest } from '../makeRequest';

type ValidateUsernameResult = { valid: true } | { error: string; valid: false };

interface ValidateUsernameInput {
	username: string;
}

type ValidateUsernameApiResponse =
	| {
			valid: true;
	  }
	| {
			valid: false;
			error: string;
	  };

export const validateUsername = async (prop: ValidateUsernameInput): Promise<ValidateUsernameResult> => {
	const response = await makeRequest<ValidateUsernameApiResponse, ValidateUsernameInput>({
		method: 'post',
		endpoint: 'auth/validate-username',
		auth: 'none',
		data: prop,
	});
	if (response.success) {
		return { valid: true };
	} else {
		return { valid: false, error: response.error };
	}
};

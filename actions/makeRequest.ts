'use server';

import { getSession } from '@/libs';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

type AuthType = 'none' | 'bearer';
type HttpMethod = 'get' | 'post' | 'patch';

type BaseRequestType<M extends HttpMethod> = {
	method: M;
	endpoint: string;
	auth: AuthType;
	params?: Record<string, string | number | boolean>;
	headers?: Record<string, string>;
	timeout?: number;
};

type GetRequestType = BaseRequestType<'get'>;

type PostPatchRequestType<T> = BaseRequestType<'post' | 'patch'> & {
	data: T;
};

type RequestType<T = never> = GetRequestType | PostPatchRequestType<T>;

type RequestResponse<ResponseType> =
	| {
			data: ResponseType;
			success: true;
			statusCode: number;
	  }
	| {
			success: false;
			error: string;
			statusCode: number;
	  };

export async function makeRequest<ResponseType, RequestDataType = never>(
	config: RequestType<RequestDataType>,
): Promise<RequestResponse<ResponseType>> {
	const baseUrl = process.env.NEXT_PUBLIC_API_BACKEND;
	if (!baseUrl) {
		throw new Error('API_BACKEND environment variable is not set');
	}

	let authHeader = {};
	if (config.auth === 'bearer') {
		const token = await getSession('accessToken');
		if (!token) {
			return {
				success: false,
				error: 'Authentication token not found',
				statusCode: 401,
			};
		}
		authHeader = { Authorization: `Bearer ${token}` };
	}

	const axiosConfig: AxiosRequestConfig = {
		method: config.method,
		url: `${baseUrl}${config.endpoint}`,
		headers: {
			'Content-Type': 'application/json',
			...authHeader,
			...config.headers,
		},
		params: config.params,
		timeout: config.timeout ?? 10000,
	};

	if (config.method !== 'get' && 'data' in config) {
		axiosConfig.data = config.data;
	}

	try {
		const response: AxiosResponse<ResponseType> = await axios(axiosConfig);
		return {
			data: response.data,
			success: true,
			statusCode: response.status,
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<{ message: string }>;
			return {
				success: false,
				error: axiosError.response?.data?.message || axiosError.message,
				statusCode: axiosError.response?.status || 500,
			};
		} else {
			return {
				error: 'An unknown error occurred',
				success: false,
				statusCode: 500,
			};
		}
	}
}

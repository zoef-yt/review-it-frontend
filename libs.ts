'use server';

import { cookies } from 'next/headers';

export async function getSession(key: string): Promise<string | null> {
	const session = cookies().get(key)?.value;
	if (!session) return null;
	return session;
}

export async function addCookie(key: string, value: string, options?: Record<string, any>): Promise<void> {
	try {
		cookies().set({
			name: key,
			value,
			httpOnly: true,
			...options,
		});
	} catch (error) {
		console.error('Failed to set cookie', error);
	}
}

export async function removeCookie(key: string): Promise<void> {
	try {
		cookies().set(key, '', {
			httpOnly: true,
			expires: new Date(0),
		});
	} catch (error) {
		console.error('Failed to remove cookie', error);
	}
}

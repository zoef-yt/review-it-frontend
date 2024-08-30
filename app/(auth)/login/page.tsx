'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';
import { LoginForm } from '@/components/(auth)/login/form';
import LoadingIndicator from '@/components/loadingIndicator';

export default function LoginPage() {
	const { isAuthorized, loading, recheckSession } = useAuth();
	const router = useRouter();

	useEffect(() => {
		recheckSession();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isAuthorized && !loading) {
			router.replace('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthorized, loading, router]);

	if (loading) {
		return (
			<main className='flex justify-center items-center'>
				<LoadingIndicator size={100} />
			</main>
		);
	}
	if (isAuthorized) {
		return null;
	}

	return <LoginForm />;
}

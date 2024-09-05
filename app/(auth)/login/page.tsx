'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';
import { LoginForm } from '@/components/auth/login/form';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoginPage() {
	const { isAuthorized, loading, recheckSession } = useAuth();
	const router = useRouter();

	const checkSession = async () => {
		try {
			await recheckSession();
		} catch (error) {
			console.error('Error rechecking session:', error);
		} finally {
		}
	};

	useEffect(() => {
		checkSession();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isAuthorized && !loading) {
			router.push('/');
		}
	}, [isAuthorized, loading, router]);

	if (loading || isAuthorized) {
		return (
			<main className='flex flex-col items-center justify-center'>
				<div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
					<Skeleton className='h-10 rounded mb-8' />
					<div className='flex flex-col space-y-6'>
						<div>
							<Skeleton className='h-4 rounded w-1/3 mb-2' />
							<Skeleton className='h-10 rounded w-full' />
						</div>
						<div>
							<Skeleton className='h-4 rounded w-1/3 mb-2' />
							<Skeleton className='h-10 rounded w-full' />
						</div>
						<Skeleton className='h-12 rounded w-full' />
					</div>
				</div>
			</main>
		);
	}

	return <LoginForm />;
}

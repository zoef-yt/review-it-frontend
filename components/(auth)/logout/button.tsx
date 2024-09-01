'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { removeCookie } from '@/libs';

interface LogoutProps {
	redirectUrl?: string;
}
export function Logout(props: LogoutProps) {
	const router = useRouter();
	const { redirectUrl } = props;
	const { recheckSession } = useAuth();
	const handleLogout = async () => {
		try {
			await removeCookie('accessToken');
			await recheckSession();
			router.push(`/${redirectUrl || ''}`);
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};
	return (
		<Button onClick={handleLogout} className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200 ease-in-out'>
			Logout
		</Button>
	);
}

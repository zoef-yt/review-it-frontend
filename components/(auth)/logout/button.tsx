'use client';

import { useAuth } from '@/context/AuthContext';
import { removeCookie } from '@/libs';
import { useRouter } from 'next/navigation';

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
		<button
			onClick={handleLogout}
			className={`bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150 hover:bg-blue-600`}
		>
			Logout
		</button>
	);
}

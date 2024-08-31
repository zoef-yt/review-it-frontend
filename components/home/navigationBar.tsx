'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Logout } from '../(auth)/logout/button';

export function NavigationBarHome() {
	const { isAuthorized } = useAuth();

	return (
		<nav className='w-full max-w-screen-xl mx-auto px-4 py-2 bg-gray-900 text-white flex justify-between items-center shadow-md'>
			<Link href='/'>
				<h1 className='text-3xl font-bold tracking-tight cursor-pointer'>Review It</h1>
			</Link>
			<div className='flex space-x-6'>
				{!isAuthorized ? (
					<>
						<Link href='/login' className='text-blue-400 hover:text-blue-300 transition'>
							Login
						</Link>
						<Link href='/signup' className='text-blue-400 hover:text-blue-300 transition'>
							Signup
						</Link>
					</>
				) : (
					<>
						<Link href='/me' className='text-blue-400 hover:text-blue-300 transition'>
							Profile
						</Link>
						<Logout redirectUrl='/' />
					</>
				)}
			</div>
		</nav>
	);
}

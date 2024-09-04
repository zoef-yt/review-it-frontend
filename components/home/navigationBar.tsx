'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Logout } from '../auth/logout/button';

export function NavigationBarHome() {
	const { isAuthorized } = useAuth();

	return (
		<nav className='w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-lg'>
			<div className='max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center'>
				<Link href='/'>
					<h1 className='text-3xl font-bold tracking-tight cursor-pointer hover:text-blue-400 transition-colors duration-200'>Review It</h1>
				</Link>
				<div className='flex items-center space-x-6'>
					{isAuthorized ? (
						<>
							<Link href='/me'>
								<span className='border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-200'>
									Profile
								</span>
							</Link>
							<Logout />
						</>
					) : (
						<>
							<Link href='/login'>
								<span className='border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-200'>
									Login
								</span>
							</Link>
							<Link href='/signup'>
								<span className='border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-200'>
									Signup
								</span>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}

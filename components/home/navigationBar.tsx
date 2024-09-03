'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Logout } from '../auth/logout/button';

export function NavigationBarHome() {
	const { isAuthorized } = useAuth();

	return (
		<nav className='w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-lg'>
			<div className='max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center'>
				<div className='flex items-center space-x-4'>
					<Link href='/'>
						<h1 className='text-3xl font-bold tracking-tight cursor-pointer hover:text-blue-400 transition-colors duration-200'>
							Review It
						</h1>
					</Link>
				</div>
				<div className='flex items-center space-x-6'>
					{!isAuthorized ? (
						<>
							<Link
								href='/login'
								className='text-white border border-blue-500 hover:bg-blue-500 px-4 py-2 rounded transition-colors duration-200'
							>
								Login
							</Link>
							<Link
								href='/signup'
								className='text-white border border-blue-500 hover:bg-blue-500 px-4 py-2 rounded transition-colors duration-200'
							>
								Signup
							</Link>
						</>
					) : (
						<>
							<Link
								href='/me'
								className='text-white border border-blue-500 hover:bg-blue-500 px-4 py-2 rounded transition-colors duration-200'
							>
								Profile
							</Link>
							<Logout />
						</>
					)}
				</div>
			</div>
		</nav>
	);
}

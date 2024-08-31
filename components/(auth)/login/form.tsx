'use client';

import Link from 'next/link';
import { useState } from 'react';
import { loginFormHandler } from '@/actions/formHandlers';
import { useAuth } from '@/context/AuthContext';

export function LoginForm() {
	const { recheckSession } = useAuth();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setPasswordVisible(false);
		setIsLoading(true);
		setErrorMessage(null);
		const formData = new FormData(event.currentTarget);
		const result = await loginFormHandler(formData);
		setIsLoading(false);
		if (!result.success) {
			setErrorMessage(typeof result.error === 'string' ? result.error : Object.values(result.error).join(', '));
		}
		if (result.success) {
			recheckSession();
		}
	};

	return (
		<main className='flex flex-col items-center justify-center'>
			<div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
				<h1 className='text-4xl font-bold mb-8 text-center text-gray-800'>Login</h1>
				<form className='flex flex-col space-y-6' onSubmit={handleSubmit}>
					<div>
						<label className='block text-sm font-medium text-gray-700' htmlFor='usernameOrEmail'>
							Username or Email
						</label>
						<input
							className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
							id='usernameOrEmail'
							name='usernameOrEmail'
							placeholder='Enter your username or email'
							type='text'
							required
							minLength={3}
							onChange={() => setErrorMessage(null)}
							autoFocus
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700' htmlFor='password'>
							Password
						</label>
						<div className='w-full flex gap-2'>
							<input
								className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 flex-[5]'
								id='password'
								name='password'
								placeholder='Enter your password'
								type={passwordVisible ? 'text' : 'password'}
								required
								minLength={3}
								onChange={() => setErrorMessage(null)}
							/>
							<button
								type='button'
								className='text-gray-600 hover:text-gray-800 flex-1 text-center'
								onClick={() => setPasswordVisible(!passwordVisible)}
								tabIndex={-1}
							>
								{passwordVisible ? 'Hide' : 'Show'}
							</button>
						</div>
					</div>
					<div>
						<button
							type='submit'
							className={`bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150 ${
								isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
							} disabled:bg-slate-300 ${errorMessage ? '!mt-2 mb-1' : 'mt-3 mb-3'} transition-all block w-full`}
							disabled={isLoading || errorMessage !== null}
						>
							{isLoading ? 'Logging in...' : 'Login'}
						</button>
						<div className={`${errorMessage ? 'h-2' : 'h-0 m-0'} transition-all`}>
							{errorMessage && <div className='text-red-500 text-sm text-center'>{errorMessage}</div>}
						</div>
					</div>
					<div className='flex justify-center mt-4'>
						<Link href='/forgot-password' className='text-blue-500 hover:underline'>
							Forgot Password?
						</Link>
					</div>
				</form>
			</div>
		</main>
	);
}

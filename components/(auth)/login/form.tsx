'use client';

import { useState } from 'react';
import Link from 'next/link';

import { loginFormHandler } from '@/actions/formHandlers';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
		const navigator = window.navigator.userAgent;
		const result = await loginFormHandler(formData, navigator);
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
						<Input
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
						<div className='w-full flex gap-2 items-center'>
							<Input
								id='password'
								name='password'
								placeholder='Enter your password'
								type={passwordVisible ? 'text' : 'password'}
								required
								minLength={3}
								onChange={() => setErrorMessage(null)}
								className='flex-1'
							/>
							<Button
								type='button'
								variant='link'
								size='sm'
								onClick={() => setPasswordVisible(!passwordVisible)}
								tabIndex={-1}
								className='text-gray-600 hover:text-gray-800'
							>
								{passwordVisible ? 'Hide' : 'Show'}
							</Button>
						</div>
					</div>
					<div>
						<Button
							type='submit'
							variant='default'
							size='lg'
							className={`w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
							disabled={isLoading || errorMessage !== null}
						>
							{isLoading ? 'Logging in...' : 'Login'}
						</Button>
						{errorMessage && <div className='text-red-500 text-sm text-center mt-2'>{errorMessage}</div>}
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

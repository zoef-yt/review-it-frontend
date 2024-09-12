'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoginSchema } from '../schema/login';
import { loginFormHandler } from '@/actions/form/loginHandler';
import { getClientInfo } from '@/actions/getClientInfo';

interface LoginFormFields {
	usernameOrEmail: string;
	password: string;
}

export function LoginForm() {
	const { recheckSession } = useAuth();
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormFields>({
		resolver: zodResolver(LoginSchema),
	});

	const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
		const navigator = window.navigator.userAgent;
		const userInfo = await getClientInfo(navigator, new Date());
		const result = await loginFormHandler({ ...data, userInfo });
		if (result.success == false) {
			setError('usernameOrEmail', {
				type: 'manual',
				message: result.error,
			});
		} else {
			recheckSession();
		}
	};

	return (
		<main className='flex flex-col items-center justify-center'>
			<div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
				<h1 className='text-4xl font-bold mb-8 text-center text-gray-800'>Login</h1>
				<form className='flex flex-col space-y-6' onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label className='block text-sm font-medium text-gray-700' htmlFor='usernameOrEmail'>
							Username or Email
						</label>
						<Input
							id='usernameOrEmail'
							{...register('usernameOrEmail', { required: 'Username or email is required' })}
							placeholder='Enter your username or email'
							type='text'
							autoFocus
							autoCapitalize='off'
							inputMode='email'
							autoComplete='email'
							onChange={(e) => {
								clearErrors('usernameOrEmail');
								setValue('usernameOrEmail', e.target.value);
							}}
						/>
						{errors.usernameOrEmail && <p className='text-red-500 text-sm'>{errors.usernameOrEmail.message}</p>}
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700' htmlFor='password'>
							Password
						</label>
						<div className='w-full flex gap-2 items-center'>
							<Input
								id='password'
								{...register('password', { required: 'Password is required' })}
								placeholder='Enter your password'
								type={passwordVisible ? 'text' : 'password'}
								className='flex-1'
								onChange={(e) => {
									clearErrors('password');
									setValue('password', e.target.value);
								}}
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
						{errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
					</div>
					<div>
						<Button
							type='submit'
							variant='default'
							size='lg'
							className={`w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Logging in...' : 'Login'}
						</Button>
					</div>
					<div className='flex justify-center mt-4'>
						<Link href='/forgot-password' className='text-blue-500 hover:underline'>
							Forgot Password?
						</Link>
					</div>
					<div className='flex justify-center mt-4'>
						<Link href='/signup' className='text-blue-500 hover:underline'>
							Don&apos;t have an account? Sign up
						</Link>
					</div>
				</form>
			</div>
		</main>
	);
}

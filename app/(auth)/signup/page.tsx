'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { validateUsername, signupFormHandler } from '@/actions/formHandlers';
import { useAuth } from '@/context/AuthContext';
import { SignupSchema } from '@/schema/signup';

interface UsernameForm {
	username: string;
}

interface SignupFormFields extends UsernameForm {
	email: string;
	password: string;
	confirmPassword: string;
}

export default function SignupForm() {
	const { recheckSession } = useAuth();
	const router = useRouter();
	const [isUsernameValid, setIsUsernameValid] = useState(false);

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<SignupFormFields>({
		resolver: zodResolver(SignupSchema),
	});

	const handleUsernameSubmit: SubmitHandler<UsernameForm> = async (data: { username: string }) => {
		const result = await validateUsername(data.username);
		if (result.valid) {
			setIsUsernameValid(true);
			clearErrors('username');
		} else if (!result.valid) {
			setIsUsernameValid(false);
			setError('username', { type: 'manual', message: result.error });
		}
	};

	const handleSignupSubmit: SubmitHandler<SignupFormFields> = async (data) => {
		const result = await signupFormHandler(data);
		if (result.success) {
			recheckSession();
			router.push('/');
		} else {
			if (result.error.includes('email')) {
				setError('email', { type: 'manual', message: result.error });
			} else if (result.error.includes('username')) {
				setError('username', { type: 'manual', message: result.error });
			} else {
				console.error(result.error);
			}
		}
	};

	const handleEditUsername = () => {
		setIsUsernameValid(false);
		clearErrors();
		reset({ username: '' });
	};

	return (
		<main className='flex flex-col items-center justify-center'>
			<div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
				<h1 className='text-4xl font-bold mb-8 text-center text-gray-800'>Sign Up</h1>
				{!isUsernameValid ? (
					<form onSubmit={handleSubmit(handleUsernameSubmit)} className='flex flex-col space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700' htmlFor='username'>
								Username
							</label>
							<input
								{...register('username')}
								className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
								id='username'
								placeholder='Enter your username'
								type='text'
								autoFocus
							/>
							{errors.username && <p className='text-red-500 text-sm'>{errors.username.message}</p>}
						</div>
						<button
							type='submit'
							className={`bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
								isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
							} transition ease-in-out duration-150 block w-full`}
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Validating...' : 'Check Username'}
						</button>
					</form>
				) : (
					<form onSubmit={handleSubmit(handleSignupSubmit)} className='flex flex-col space-y-6'>
						<div>
							<div className='flex gap-2'>
								<label className='block text-sm font-medium text-gray-700' htmlFor='username'>
									Username
								</label>
								<button type='button' className='text-blue-500 hover:underline text-sm' onClick={handleEditUsername}>
									Edit
								</button>
							</div>
							<input
								{...register('username')}
								className='border border-green-500 rounded-lg p-3 w-full bg-gray-200'
								id='username'
								readOnly
								disabled
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700' htmlFor='email'>
								Email
							</label>
							<input
								{...register('email')}
								className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
								id='email'
								placeholder='Enter your email'
								type='email'
								autoFocus
							/>
							{errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700' htmlFor='password'>
								Password
							</label>
							<input
								{...register('password')}
								className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
								id='password'
								placeholder='Enter your password'
								type='password'
							/>
							{errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700' htmlFor='confirmPassword'>
								Confirm Password
							</label>
							<input
								{...register('confirmPassword')}
								className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
								id='confirmPassword'
								placeholder='Confirm your password'
								type='password'
							/>
							{errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
						</div>
						<button
							type='submit'
							className={`bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
								isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
							} transition ease-in-out duration-150 block w-full`}
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Signing Up...' : 'Sign Up'}
						</button>
					</form>
				)}
			</div>
		</main>
	);
}

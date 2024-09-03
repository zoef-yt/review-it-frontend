'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { validateUsername, signupFormHandler } from '@/actions/formHandlers';
import { useAuth } from '@/context/AuthContext';
import { SignupSchema } from '@/components/auth/schema/signup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
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
							<Input {...register('username')} id='username' placeholder='Enter your username' type='text' autoFocus />
							{errors.username && <p className='text-red-500 text-sm'>{errors.username.message}</p>}
						</div>
						<Button
							type='submit'
							variant='default'
							size='lg'
							className={isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Validating...' : 'Check Username'}
						</Button>
					</form>
				) : (
					<form onSubmit={handleSubmit(handleSignupSubmit)} className='flex flex-col space-y-6'>
						<div>
							<div className='flex justify-between items-center '>
								<label className='block text-sm font-medium text-gray-700' htmlFor='username'>
									Username
								</label>
								<Button type='button' variant='link' size='sm' onClick={handleEditUsername}>
									Edit
								</Button>
							</div>
							<Input {...register('username')} id='username' readOnly disabled className='bg-gray-200 border-green-500' />
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700' htmlFor='email'>
								Email
							</label>
							<Input {...register('email')} id='email' placeholder='Enter your email' type='email' autoFocus />
							{errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700' htmlFor='password'>
								Password
							</label>
							<div className='w-full flex gap-2 items-center'>
								<Input
									{...register('password')}
									id='password'
									placeholder='Enter your password'
									type={passwordVisible ? 'text' : 'password'}
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
							<label className='block text-sm font-medium text-gray-700' htmlFor='confirmPassword'>
								Confirm Password
							</label>
							<Input
								{...register('confirmPassword')}
								id='confirmPassword'
								placeholder='Confirm your password'
								type={passwordVisible ? 'text' : 'password'}
							/>
							{errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
						</div>
						<Button
							type='submit'
							variant='default'
							size='lg'
							className={isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Signing Up...' : 'Sign Up'}
						</Button>
					</form>
				)}
			</div>
		</main>
	);
}

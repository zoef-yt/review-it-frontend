'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ResetPasswordSchema } from '@/schema/reset-password';
import { resetPasswordHandler } from '@/actions/formHandlers';
import LoadingIndicator from '@/components/loadingIndicator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ResetPasswordFormInputs {
	newPassword: string;
	confirmPassword: string;
}

function ResetPasswordComponent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const email = searchParams.get('email');
	const token = searchParams.get('temp_token');

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm<ResetPasswordFormInputs>({
		resolver: zodResolver(ResetPasswordSchema),
	});

	if (!email || !token) {
		router.push('/forgot-password');
		return null;
	}

	const onSubmit: SubmitHandler<ResetPasswordFormInputs> = async (data) => {
		if (email && token) {
			const result = await resetPasswordHandler({ ...data, email, token });
			if (!result.success) {
				setError('newPassword', {
					type: 'manual',
					message: result.error,
				});
			}
		}
	};

	return (
		<main className='flex flex-col items-center justify-center'>
			<div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-sm'>
				<h1 className='text-2xl font-bold mb-4 text-center'>Reset Password</h1>
				{isSubmitSuccessful ? (
					<p className='text-green-500 text-center'>Password reset successful. You can now log in with your new password.</p>
				) : (
					<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700' htmlFor='newPassword'>
								New Password
							</label>
							<div className='w-full flex gap-2 items-center'>
								<Input
									id='newPassword'
									{...register('newPassword')}
									className='mt-1'
									type={passwordVisible ? 'text' : 'password'}
									placeholder='Enter your new password'
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
							{errors.newPassword && <p className='text-red-500 text-sm mt-1'>{errors.newPassword.message}</p>}
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700' htmlFor='confirmPassword'>
								Confirm Password
							</label>
							<Input
								type={passwordVisible ? 'text' : 'password'}
								id='confirmPassword'
								{...register('confirmPassword')}
								className='mt-1'
								placeholder='Confirm your new password'
							/>
							{errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>}
						</div>
						<Button
							type='submit'
							variant='default'
							size='lg'
							className={`w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Resetting...' : 'Reset Password'}
						</Button>
					</form>
				)}
			</div>
		</main>
	);
}

export default function ResetPasswordPage() {
	return (
		<Suspense fallback={<LoadingIndicator />}>
			<ResetPasswordComponent />
		</Suspense>
	);
}

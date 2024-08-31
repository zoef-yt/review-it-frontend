'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ResetPasswordSchema } from '@/schema/reset-password';
import { resetPasswordHandler } from '@/actions/formHandlers';
import LoadingIndicator from '@/components/loadingIndicator';

interface ResetPasswordFormInputs {
	newPassword: string;
	confirmPassword: string;
}

function ResetPasswordComponent() {
	const router = useRouter();
	const searchParams = useSearchParams();
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
							<input
								type='password'
								id='newPassword'
								{...register('newPassword')}
								className='mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
								placeholder='Enter your new password'
							/>
							{errors.newPassword && <p className='text-red-500 text-sm mt-1'>{errors.newPassword.message}</p>}
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700' htmlFor='confirmPassword'>
								Confirm Password
							</label>
							<input
								type='password'
								id='confirmPassword'
								{...register('confirmPassword')}
								className='mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
								placeholder='Confirm your new password'
							/>
							{errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>}
						</div>
						<button
							type='submit'
							className={`bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 ${
								isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
							}`}
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Resetting...' : 'Reset Password'}
						</button>
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

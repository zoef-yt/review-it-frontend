'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import LoadingIndicator from '@/components/loadingIndicator';
import { useAuth } from '@/context/AuthContext';
import { ChangePasswordSchema } from '@/components/auth/schema/changePassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { changePassworHandler } from '@/actions/form/changePasswordHandler';

interface ChangePasswordFormInputs {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export default function ChangePassword() {
	const { user, loading, recheckSession } = useAuth();
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<ChangePasswordFormInputs>({
		resolver: zodResolver(ChangePasswordSchema),
	});

	if (loading) {
		return (
			<main>
				<LoadingIndicator size={100} />
			</main>
		);
	}

	if (!user) {
		router.push('/login');
		return null;
	}
	const onSubmit = async (data: ChangePasswordFormInputs) => {
		const { currentPassword, newPassword } = data;
		const navigator = window.navigator.userAgent;
		const date = new Date();
		const result = await changePassworHandler({ currentPassword, newPassword, navigator, date });
		if (result && result.success) {
			await recheckSession();
			router.push('/login');
		} else {
			if (result?.error) {
				setError('currentPassword', { type: 'manual', message: result.error });
			} else {
				console.error('Failed to change password:', result?.error);
			}
		}
	};
	return (
		<main className='flex flex-col items-center justify-center'>
			<div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-sm'>
				<h1 className='text-2xl font-bold mb-4 text-center'>Change Password</h1>
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700' htmlFor='currentPassword'>
							Current Password
						</label>
						<div className='w-full flex gap-2 items-center'>
							<Input
								type={passwordVisible ? 'text' : 'password'}
								id='currentPassword'
								{...register('currentPassword')}
								className='mt-1'
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
						{errors.currentPassword && <p className='text-red-500 text-sm mt-1'>{errors.currentPassword.message}</p>}
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700' htmlFor='newPassword'>
							New Password
						</label>
						<Input type={passwordVisible ? 'text' : 'password'} id='newPassword' {...register('newPassword')} className='mt-1' />
						{errors.newPassword && <p className='text-red-500 text-sm mt-1'>{errors.newPassword.message}</p>}
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700' htmlFor='confirmPassword'>
							Confirm New Password
						</label>
						<Input type={passwordVisible ? 'text' : 'password'} id='confirmPassword' {...register('confirmPassword')} className='mt-1' />
						{errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>}
					</div>
					<Button
						type='submit'
						variant='default'
						size='lg'
						className={`w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Changing...' : 'Change Password'}
					</Button>
				</form>
			</div>
		</main>
	);
}

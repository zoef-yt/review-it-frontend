'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';

import LoadingIndicator from '@/components/loadingIndicator';
import { useAuth } from '@/context/AuthContext';
import { ChangePasswordSchema } from '@/schema/changePassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePassworHandler } from '@/actions/formHandlers';
import { useRouter } from 'next/navigation';

interface ChangePasswordFormInputs {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export default function ChangePassword() {
	const { user, loading, recheckSession } = useAuth();
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
		const result = await changePassworHandler(data);
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
		<main className='flex flex-col items-center justify-center '>
			<div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-sm'>
				<h1 className='text-2xl font-bold mb-4 text-center'>Change Password</h1>
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700' htmlFor='currentPassword'>
							Current Password
						</label>
						<input
							type='password'
							id='currentPassword'
							{...register('currentPassword')}
							className='mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						{errors.currentPassword && <p className='text-red-500 text-sm mt-1'>{errors.currentPassword.message}</p>}
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700' htmlFor='newPassword'>
							New Password
						</label>
						<input
							type='password'
							id='newPassword'
							{...register('newPassword')}
							className='mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						{errors.newPassword && <p className='text-red-500 text-sm mt-1'>{errors.newPassword.message}</p>}
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700' htmlFor='confirmPassword'>
							Confirm New Password
						</label>
						<input
							type='password'
							id='confirmPassword'
							{...register('confirmPassword')}
							className='mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
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
						{isSubmitting ? 'Changing...' : 'Change Password'}
					</button>
				</form>
			</div>
		</main>
	);
}

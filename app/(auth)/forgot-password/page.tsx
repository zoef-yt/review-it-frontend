'use client';

import { forgotPasswordHandler } from '@/actions/formHandlers';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ForgotPasswordFormInputs {
	email: string;
}

export default function ForgotPassword() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm<ForgotPasswordFormInputs>();

	const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async (data: ForgotPasswordFormInputs) => {
		const result = await forgotPasswordHandler(data);
		if (!result.success) {
			setError('email', {
				type: 'manual',
				message: result.error,
			});
		}
	};

	return (
		<main className='flex flex-col items-center justify-center'>
			<div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-sm'>
				<h1 className='text-2xl font-bold mb-4 text-center'>Forgot Password</h1>
				{isSubmitSuccessful ? (
					<p className='text-green-500 text-center'>If the email exists, a password reset link has been sent.</p>
				) : (
					<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700' htmlFor='email'>
								Email Address
							</label>
							<input
								type='email'
								id='email'
								{...register('email')}
								className='mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
								placeholder='Enter your email'
							/>
							{errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
						</div>
						<button
							type='submit'
							className={`bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 ${
								isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
							}`}
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Sending...' : 'Send Reset Link'}
						</button>
					</form>
				)}
			</div>
		</main>
	);
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signupFormHandler } from '@/actions/form/signupHandler';
import { validateUsername } from '@/actions/form/validateUsername';
import { cn } from '@/lib/utils';
import { signUpFormSchema, signUpUsernameSchema } from '@/schema/signup';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export default function SignupPage() {
	const { toast } = useToast();
	const { recheckSession, loading } = useAuth();
	const router = useRouter();
	const [formParent] = useAutoAnimate();
	const [isUsernameValid, setIsUsernameValid] = useState(false);
	const [passwordVisible, setPasswordVisible] = useState(false);

	const form = useForm<z.infer<typeof signUpFormSchema>>({
		resolver: zodResolver(isUsernameValid ? signUpFormSchema : signUpUsernameSchema),
	});

	const onUsernameSubmit = async (values: z.infer<typeof signUpUsernameSchema>) => {
		const result = await validateUsername({ username: values.username });
		if (result.valid) {
			setIsUsernameValid(true);
			toast({ description: 'Username is available', duration: 1000, className: 'bg-green-500 text-white' });
		} else {
			form.setError('username', { message: result.error });
			toast({ description: result.error, duration: 2000, variant: 'destructive' });
		}
	};

	const onFullFormSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
		const result = await signupFormHandler(values);
		if (result.success) {
			router.push('/');
			await recheckSession();
			toast({ description: 'Signup successful', duration: 3000, className: 'bg-green-500 text-white' });
		} else {
			if (result.error.includes('email')) {
				form.setError('email', { message: result.error });
			} else if (result.error.includes('username')) {
				form.setError('username', { message: result.error });
			} else {
				form.setError('root', { message: result.error });
				toast({ description: result.error, duration: 2000, variant: 'destructive' });
			}
		}
	};

	const handleEditUsername = () => {
		setIsUsernameValid(false);
	};

	if (loading) {
		return (
			<main className='flex flex-col items-center justify-center'>
				<div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
					<Skeleton className='h-10 rounded mb-8' />
					<div className='flex flex-col space-y-6'>
						<div>
							<Skeleton className='h-4 rounded w-1/3 mb-2' />
							<Skeleton className='h-10 rounded w-full' />
						</div>
						<div>
							<Skeleton className='h-4 rounded w-1/3 mb-2' />
							<Skeleton className='h-10 rounded w-full' />
						</div>
						<Skeleton className='h-12 rounded w-full' />
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className='flex flex-col items-center justify-center bg-gray-100'>
			<div className='w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg'>
				<h2 className='text-3xl font-bold text-center text-gray-900'>Sign Up</h2>
				<Form {...form}>
					<form ref={formParent} onSubmit={form.handleSubmit(isUsernameValid ? onFullFormSubmit : onUsernameSubmit)} className='space-y-6'>
						{form.formState.errors.root && <div className='text-red-500 text-sm font-medium'>{form.formState.errors.root.message}</div>}
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<div className='flex items-center space-x-2'>
										<FormControl>
											<Input
												placeholder='Enter your username'
												{...field}
												disabled={isUsernameValid}
												className={cn(
													'flex-1',
													isUsernameValid && 'border-green-600 focus-visible:ring-green-600 bg-green-100',
												)}
												autoFocus
											/>
										</FormControl>
										{isUsernameValid && (
											<Button type='button' variant='outline' size='sm' onClick={handleEditUsername}>
												Edit
											</Button>
										)}
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						{isUsernameValid && (
							<>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input placeholder='Enter your email' {...field} autoFocus />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<div className='flex items-center space-x-2'>
												<FormControl>
													<Input
														type={passwordVisible ? 'text' : 'password'}
														placeholder='Enter your password'
														{...field}
													/>
												</FormControl>
												<Button
													type='button'
													variant='outline'
													size='sm'
													onClick={() => setPasswordVisible(!passwordVisible)}
												>
													{passwordVisible ? 'Hide' : 'Show'}
												</Button>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='confirmPassword'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Confirm Password</FormLabel>
											<FormControl>
												<Input type={passwordVisible ? 'text' : 'password'} placeholder='Confirm your password' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
						<Button type='submit' className='w-full'>
							{isUsernameValid ? 'Sign Up' : 'Check Username'}
						</Button>
					</form>
				</Form>
				<div className='text-center'>
					<Link href='/login' className='text-sm text-blue-600 hover:underline'>
						Already have an account? Login
					</Link>
				</div>
			</div>
		</main>
	);
}

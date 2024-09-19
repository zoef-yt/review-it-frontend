'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { loginFormHandler } from '@/actions/form/loginHandler';
import { getClientInfo } from '@/actions/getClientInfo';
import { loginFormSchema } from '@/schema/login';

export function LoginForm() {
	const router = useRouter();
	const { toast } = useToast();
	const { recheckSession } = useAuth();
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const [formParent] = useAutoAnimate();

	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			usernameOrEmail: '',
			password: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
		const navigator = window.navigator.userAgent;
		toast({ title: 'Logging in...', description: 'Please wait while we log you in.', duration: 1000 });
		const userInfo = await getClientInfo(navigator, new Date());
		const result = await loginFormHandler({ ...data, userInfo });
		if (result.success == false) {
			form.setError('root', {
				type: 'manual',
				message: result.error,
			});
			toast({ title: 'Login failed', description: result.error, duration: 1000, variant: 'destructive' });
		} else {
			router.push('/');
			toast({ title: 'Login successful', description: 'You are now logged in.', duration: 3000, className: 'bg-green-500 text-white' });
			await recheckSession();
		}
	};

	return (
		<main className='flex flex-col items-center justify-center'>
			<div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
				<h1 className='text-4xl font-bold mb-8 text-center text-gray-800'>Login</h1>
				<Form {...form}>
					<form ref={formParent} onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
						{form.formState.errors.root && <div className='text-red-500 text-sm font-medium'>{form.formState.errors.root.message}</div>}
						<FormField
							control={form.control}
							name='usernameOrEmail'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username or Email</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter your username or email'
											{...field}
											autoFocus
											autoCapitalize='off'
											inputMode='email'
											autoComplete='email'
										/>
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
											<Input type={passwordVisible ? 'text' : 'password'} placeholder='Enter your password' {...field} />
										</FormControl>
										<Button type='button' variant='outline' size='sm' onClick={() => setPasswordVisible(!passwordVisible)}>
											{passwordVisible ? 'Hide' : 'Show'}
										</Button>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='w-full' disabled={form.formState.isSubmitting}>
							{form.formState.isSubmitting ? 'Logging in...' : 'Login'}
						</Button>
					</form>
				</Form>
				<div className='flex flex-col items-center space-y-4 mt-6'>
					<Link href='/forgot-password' className='text-blue-500 hover:underline'>
						Forgot Password?
					</Link>
					<Link href='/signup' className='text-blue-500 hover:underline'>
						Don&rsquo;t have an account? Sign up
					</Link>
				</div>
			</div>
		</main>
	);
}

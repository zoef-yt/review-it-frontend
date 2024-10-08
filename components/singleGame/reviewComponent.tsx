'use client';

import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { getSession } from '@/libs';
import { Form, FormField, FormMessage } from '../ui/form';
import { makeRequest } from '@/actions/makeRequest';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { SingleReview } from './gameReviews/singleReview';
import { Review } from '@/types/gameReviews';

interface ReviewComponentProps {
	game: {
		gameID: number;
		gameName: string;
		gameImage: string;
		gameSlug: string;
		description?: string;
		genre: {
			id: number;
			name: string;
		}[];
	};
	review: Review | null;
}

interface ReviewFormValues {
	rating: number;
	comment?: string;
	gameSlug?: string;
	userID: string;
	game: ReviewComponentProps['game'];
}

const formSchema = z.object({
	rating: z.number().min(0).max(5),
	comment: z.string(),
});

export function ReviewComponent({ game, review: propReview }: ReviewComponentProps) {
	const { user } = useAuth();
	const [review, setReview] = useState<Review | null>(propReview ?? null);
	const [parent] = useAutoAnimate();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			rating: 0,
			comment: '',
		},
	});
	const { isSubmitting } = form.formState;

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const token = await getSession('accessToken');
		if (!token || !user?.userID) return;
		const postData = {
			rating: values.rating,
			comment: values.comment,
			gameSlug: game.gameSlug,
			userID: user?.userID,
			game,
		};
		form.clearErrors();
		const response = await makeRequest<Review, ReviewFormValues>({
			method: 'post',
			endpoint: 'games-review/create',
			auth: 'bearer',
			data: postData,
			headers: {
				Accept: 'application/json',
			},
		});

		if (response.success) {
			setReview(response.data);
		} else {
			form.setError('comment', {
				type: 'manual',
				message: response.error || 'An error occurred while submitting your review. Please try again.',
			});
		}
	}

	return (
		<div ref={parent} className='w-full px-4 py-6 relative bg-white shadow-lg rounded-lg'>
			{!user && (
				<div className='absolute inset-0 backdrop-blur-[2px] bg-black/5 flex items-center justify-center z-10 rounded-lg'>
					<Link
						href='/login'
						className='bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg'
					>
						Login to Submit Review
					</Link>
				</div>
			)}
			{review ? (
				<>
					<h2 className='text-2xl font-bold mb-4'>Your Review:</h2>
					<SingleReview review={review} gameSlug={game.gameSlug} key={review._id} />
				</>
			) : (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
						<FormField
							control={form.control}
							name='rating'
							render={({ field }) => (
								<div className='mb-6 flex flex-col items-center'>
									<h3 className='text-lg font-medium mb-2'>Rate this Game</h3>
									<div className='flex space-x-1 items-center'>
										<Rating
											name='game-rating'
											value={field.value}
											onChange={(event, newValue) => {
												field.onChange(newValue);
												form.clearErrors();
											}}
											precision={0.5}
											size='large'
											disabled={isSubmitting}
										/>
										<div className='text-lg font-medium'>{field.value}</div>
									</div>
								</div>
							)}
						/>
						<FormField
							control={form.control}
							name='comment'
							render={({ field }) => (
								<div className='mb-6'>
									<h3 className='text-lg font-medium mb-2'>Comment</h3>
									<Textarea
										className='mb-2 w-full p-2 border rounded-md focus:ring-2 focus:border-transparent'
										placeholder='Write your review here...'
										{...field}
										rows={4}
										disabled={isSubmitting}
									/>
									<FormMessage />
								</div>
							)}
						/>
						<div className='flex justify-center'>
							<Button
								type='submit'
								disabled={isSubmitting}
								className='px-6 py-2 text-white bg-black rounded-lg font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
							>
								{isSubmitting ? 'Submitting...' : 'Submit Review'}
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	);
}

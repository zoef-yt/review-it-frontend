'use client';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import Rating from '@mui/material/Rating';
import { Button } from '@/components/ui/button';

export default function ReviewSection() {
	const [comment, setComment] = React.useState('');
	const [rating, setRating] = React.useState<number | null>(0);

	const handleSubmit = () => {
		// Handle the form submission here (e.g., send data to the backend)
		console.log('Rating:', rating);
		console.log('Comment:', comment);
	};

	return null;
	return (
		<div className='container mx-auto px-4 py-6'>
			<div className='mb-4 flex flex-col items-center'>
				<h3 className='text-lg font-medium mb-2'>Rate the Game</h3>
				<Rating
					name='game-rating'
					value={rating}
					onChange={(event, newValue) => {
						setRating(newValue);
					}}
					precision={0.5}
				/>
			</div>
			<div className='mb-4'>
				<h3 className='text-lg font-medium mb-2'>Leave a Review</h3>
				<Textarea className='mb-2' placeholder='Write your review here...' value={comment} onChange={(e) => setComment(e.target.value)} />
			</div>
			<div className='flex justify-center'>
				<Button onClick={handleSubmit}>Submit Review</Button>
			</div>
		</div>
	);
}

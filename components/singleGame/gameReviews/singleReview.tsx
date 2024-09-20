import { Rating } from '@mui/material';

import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Review } from '@/types/gameReviews';
// import { DeleteReviewButton } from './deleteReviewButton';

export function SingleReview({ review, gameSlug }: { review: Review; gameSlug: string }) {
	const { rating, comment, userID, createdAt } = review;
	const initials = userID?.username?.charAt(0)?.toUpperCase();
	const randomColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
	return (
		<Card className='overflow-hidden'>
			<CardContent className='p-0'>
				<div className='bg-gray-50 p-4 flex items-center justify-between'>
					<div className='flex items-center'>
						<Avatar className='h-12 w-12 mr-4 flex justify-center items-center text-gray-800' style={{ backgroundColor: randomColor }}>
							<span className='text-lg font-semibold'>{initials}</span>
						</Avatar>
						<div>
							<h3 className='text-lg font-semibold'>{userID.username}</h3>
							<p className='text-sm text-gray-500'>
								{new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
							</p>
						</div>
					</div>
					<div className='flex items-center'>
						<Rating value={rating} precision={0.5} readOnly size='small' />
						<span className='ml-2 text-sm text-gray-600'>({rating.toFixed(1)})</span>
						{/* <DeleteReviewButton review={review} gameSlug={gameSlug} /> */}
					</div>
				</div>
				<Separator />
				<div className='p-4'>
					<p className='text-gray-700'>{comment}</p>
				</div>
			</CardContent>
		</Card>
	);
}

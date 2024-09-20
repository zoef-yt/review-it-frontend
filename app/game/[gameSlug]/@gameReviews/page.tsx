import { Rating } from '@mui/material';

import { makeRequest } from '@/actions/makeRequest';
import { Card, CardContent } from '@/components/ui/card';
import { SingleReview } from '@/components/singleGame/gameReviews/singleReview';
import type { ReviewApiResponse, ReviewSectionProps } from '@/types/gameReviews';
import { getUserId } from '@/libs';

export default async function ReviewSection({ params }: ReviewSectionProps) {
	const { gameSlug } = params;
	const userId = await getUserId();
	const response = await makeRequest<ReviewApiResponse>({
		endpoint: `games-review/${gameSlug}?excludeUserId=${userId}`,
		method: 'get',
		auth: 'none',
	});

	if (!response.success) {
		return null;
	}

	const { averageRating, reviewsCount, reviews } = response.data;
	return (
		<div className='space-y-8 w-full'>
			<Card className='bg-gradient-to-r from-purple-500 to-indigo-600 text-white'>
				<CardContent className='pt-6'>
					<h2 className='text-3xl font-bold mb-6'>Game Reviews</h2>
					<div className='flex items-center justify-between'>
						<div>
							<p className='text-5xl font-bold mb-2'>
								{averageRating.toFixed(1)}
								<span className='ml-2 text-sm'>(average)</span>
							</p>
							<div className='flex items-center'>
								<Rating value={averageRating} precision={0.5} readOnly sx={{ color: 'yellow' }} />
							</div>
						</div>
						<div className='text-right'>
							<p className='text-4xl font-bold'>{reviewsCount}</p>
							<p className='text-xl'>{reviewsCount === 1 ? 'Review' : 'Total Reviews'}</p>
						</div>
					</div>
				</CardContent>
			</Card>
			{reviews.length > 0 ? (
				<div className='space-y-6'>
					{reviews.map((review) => (
						<SingleReview key={review._id} review={review} gameSlug={gameSlug} />
					))}
				</div>
			) : (
				<Card>
					<CardContent className='py-8 text-center'>
						<p className='text-xl text-gray-600'>No reviews yet. Be the first to review!</p>
					</CardContent>
				</Card>
			)}
		</div>
	);
}

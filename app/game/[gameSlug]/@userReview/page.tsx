import { makeRequest } from '@/actions/makeRequest';
import { Game } from '@/types/game';
import { ReviewComponent } from '@/components/singleGame/reviewComponent';
import type { Review } from '@/types/gameReviews';

export default async function UserReview({ params }: { params: { gameSlug: string } }) {
	const reviewResponse = await makeRequest<Review>({
		method: 'get',
		endpoint: `games-review/game/${params.gameSlug}`,
		auth: 'bearer',
	});

	const gameResponse = await makeRequest<Game>({
		method: 'get',
		endpoint: `api/games/${params.gameSlug}`,
		auth: 'none',
	});
	if (!gameResponse.success) {
		return (
			<div className='w-full'>
				Error fetching game
				<p>{JSON.stringify(gameResponse)}</p>
				<p>{JSON.stringify(reviewResponse)}</p>
			</div>
		);
	}

	const game = gameResponse.data;
	return (
		<div className='w-full'>
			<p>game: {JSON.stringify(gameResponse)}</p>
			<p>Review: {JSON.stringify(reviewResponse)}</p>
			<ReviewComponent
				game={{
					gameID: game.id,
					gameName: game.name,
					gameImage: game.backgroundImage,
					gameSlug: game.slug,
					description: game.description,
					genre: game.genres.map((genre) => ({
						id: genre.id,
						name: genre.name,
					})),
				}}
				review={reviewResponse.success ? reviewResponse.data : null}
			/>
		</div>
	);
}

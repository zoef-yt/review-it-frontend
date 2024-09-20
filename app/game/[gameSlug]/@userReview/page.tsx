import { makeRequest } from '@/actions/makeRequest';
import { Game } from '@/types/game';
import { ReviewComponent } from '@/components/singleGame/reviewComponent';

export default async function UserReview({ params }: { params: { gameSlug: string } }) {
	const [gameResponse, reviewResponse] = await Promise.all([
		makeRequest<Game>({
			method: 'get',
			endpoint: `api/games/${params.gameSlug}`,
			auth: 'none',
		}),
		makeRequest<any>({
			method: 'get',
			endpoint: `games-review/game/${params.gameSlug}`,
			auth: 'bearer',
		}),
	]);

	if (!gameResponse.success) {
		return null;
	}

	const game = gameResponse.data;

	return (
		<div className='w-full'>
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

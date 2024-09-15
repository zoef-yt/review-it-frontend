import { makeRequest } from '@/actions/makeRequest';
import { GameTile } from '@/components/home/gameTile';
import type { GameList } from '@/types/gameList';

interface GameSearchPageProps {
	searchParams: {
		search: string;
	};
}

interface GamesApiResponse {
	results: GameList[];
}
export default async function GameSearchPage(props: GameSearchPageProps) {
	const { search: term } = props.searchParams;
	const param = {
		page: 1,
		page_size: 50,
		ordering: '-released',
		search: term,
	};

	const response = await makeRequest<GamesApiResponse>({
		method: 'get',
		endpoint: 'api/games',
		auth: 'none',
		params: param,
	});

	if (!response.success || response.data.results.length === 0) {
		return null;
	}
	const games = response.data.results;
	return (
		<main className='px-4 space-y-4'>
			<h1 className='text-2xl font-bold mt-4'>Game results for: &quot;{term}&quot;</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{games.map((game) => (
					<GameTile key={game.id} game={game} shouldLazyLoad={false} />
				))}
			</div>
		</main>
	);
}

import { GameTile } from './gameTile';
import { makeRequest } from '@/actions/makeRequest';
import type { GameList } from '@/types/gameList';

interface HomeScreenGamesListProps {
	dateRange: [number, number];
	titleText: string;
	skipFilter: boolean;
	shouldLazyLoad?: boolean;
}

interface GamesApiResponse {
	results: GameList[];
}

export async function HomeScreenGamesList({ dateRange, titleText, skipFilter = false, shouldLazyLoad = true }: HomeScreenGamesListProps) {
	const param = {
		page: 1,
		ordering: '-released',
		dateRange: getDateRange(dateRange[0], dateRange[1]),
		skipFilter: skipFilter,
		search: null,
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
		<div>
			{/* <p className='text-sm text-gray-500 mb-4  -[50%]'>{JSON.stringify(response.data.results[0], null, 1)}</p> */}
			<h2 className='text-2xl font-semibold mb-4 sticky top-0 py-2 bg-gray-100 line-clamp-1 z-50'>{titleText}</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{games.map((game) => (
					<GameTile key={game.id} game={game} shouldLazyLoad={shouldLazyLoad} />
				))}
			</div>
		</div>
	);
}

function getDateRange(offsetStart: number, offsetEnd: number): string {
	const startDate = new Date();
	startDate.setDate(startDate.getDate() + offsetStart);
	const endDate = new Date();
	endDate.setDate(endDate.getDate() + offsetEnd);
	return `${formatDate(startDate)},${formatDate(endDate)}`;
}

function formatDate(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

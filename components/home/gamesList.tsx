import { getAllGames } from '@/actions/getAllGames';
import { GameTile } from './gameTile';

interface HomeScreenGamesListProps {
	dateRange: [number, number];
	titleText: string;
	skipFilter?: boolean;
	shouldLazyLoad?: boolean;
}

export async function HomeScreenGamesList({ dateRange, titleText, skipFilter, shouldLazyLoad = true }: HomeScreenGamesListProps) {
	const games = await getAllGames({
		page: 1,
		params: {
			search: null,
			ordering: '-released',
			dateRange: getDateRange(dateRange[0], dateRange[1]),
			skipFilter,
		},
	});

	if (games?.length === 0) {
		return null;
	}
	return (
		<div>
			<h2 className='text-2xl font-semibold mb-4 sticky top-0 py-2 z-10 bg-gray-100'>{titleText}</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{games?.map((game) => (
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

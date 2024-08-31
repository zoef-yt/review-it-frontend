import { getAllGames } from '@/actions/getAllGames';
import Image from 'next/image';
import Link from 'next/link';

interface HomeScreenGamesListProps {
	dateRange: [number, number];
	titleText: string;
	skipFilter?: boolean;
}

export async function HomeScreenGamesList({ dateRange, titleText, skipFilter }: HomeScreenGamesListProps) {
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
					<Link href={game.slug} key={game.id} className='bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col'>
						<div className='h-48 w-full relative mb-4'>
							{game.backgroundImage ? (
								<Image src={game.backgroundImage} alt={game.name} className='rounded-lg object-cover' fill />
							) : (
								<div className='h-full w-full flex items-center justify-center bg-gray-200 rounded-lg'>No Image</div>
							)}
						</div>
						<div className='flex-1'>
							<h3 className='text-lg font-medium mb-2'>{game.name}</h3>
							<p className='text-sm text-gray-500'>Released: {game.released}</p>
							<p className='text-sm text-gray-500'>Rating: {game.rating}</p>
							<p className='text-sm text-gray-500'>Playtime: {game.playtime} hrs</p>
						</div>
					</Link>
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

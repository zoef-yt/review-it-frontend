import Image from 'next/image';
import Link from 'next/link';

import { getAllGames } from '@/actions/getAllGames';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

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
					<Link href={game.slug} key={game.id} className='hover:no-underline'>
						<Card className='overflow-hidden transition-shadow hover:shadow-2xl'>
							<CardHeader className='p-0'>
								<div className='relative h-48 w-full'>
									{game.backgroundImage ? (
										<Image
											src={game.backgroundImage}
											alt={game.name}
											className='object-cover'
											fill
											style={{ borderTopLeftRadius: 'var(--radius)', borderTopRightRadius: 'var(--radius)' }}
										/>
									) : (
										<div className='h-full w-full flex items-center justify-center bg-gray-200'>No Image</div>
									)}
								</div>
							</CardHeader>
							<CardContent className='p-4'>
								<CardTitle className='text-lg font-medium'>{game.name}</CardTitle>
								<CardDescription className='mt-2 text-sm text-muted-foreground'>Released: {game.released}</CardDescription>
								<CardDescription className='text-sm text-muted-foreground'>Rating: {game.rating}</CardDescription>
								<CardDescription className='text-sm text-muted-foreground'>Playtime: {game.playtime} hrs</CardDescription>
							</CardContent>
							<CardFooter className='p-4'>{/* Additional footer content like buttons or links can be added here */}</CardFooter>
						</Card>
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

import Link from 'next/link';
import Image from 'next/image';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface GameTileProps {
	game: Game;
	shouldLazyLoad: boolean;
}

export function GameTile(props: GameTileProps) {
	const { game, shouldLazyLoad } = props;
	return (
		<Link href={`/game/${game.slug}`} key={game.id} className='hover:no-underline'>
			<Card className='overflow-hidden transition-shadow hover:shadow-2xl'>
				<CardHeader className='p-0'>
					<div className='relative h-48 w-full'>
						{game.backgroundImage ? (
							<Image
								src={game.backgroundImage}
								alt={game.name}
								className='object-cover w-full h-full'
								height={300}
								width={300}
								loading={shouldLazyLoad ? 'lazy' : 'eager'}
								priority={!shouldLazyLoad}
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
			</Card>
		</Link>
	);
}

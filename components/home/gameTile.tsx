import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Calendar } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { GameList } from '@/types/gameList';

interface GameTileProps {
	game: GameList;
	shouldLazyLoad: boolean;
}

export function GameTile({ game, shouldLazyLoad }: GameTileProps) {
	return (
		<Link href={`/game/${game.slug}`} key={game.id} className='hover:no-underline group'>
			<Card className='overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-card'>
				<CardHeader className='p-0'>
					<div className='relative h-56 w-full overflow-hidden'>
						{game.backgroundImage ? (
							<Image
								src={game.backgroundImage}
								alt={game.name}
								className={`object-cover w-full h-full transition-opacity duration-700`}
								height={400}
								width={400}
								loading={shouldLazyLoad ? 'lazy' : 'eager'}
								priority={!shouldLazyLoad}
							/>
						) : (
							<div className='h-full w-full flex items-center justify-center bg-accent text-accent-foreground'>No Image Available</div>
						)}
					</div>
				</CardHeader>
				<CardContent className='p-4 relative'>
					<CardTitle className='text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors duration-300' title={game.name}>
						{game.name}
					</CardTitle>
					<div className='mt-2 space-y-1'>
						<CardDescription className='flex items-center text-sm'>
							<Calendar className='w-4 h-4 mr-2' />
							Released: {game.released}
						</CardDescription>
						<CardDescription className='flex items-center text-sm'>
							<Star className='w-4 h-4 mr-2' />
							Rating: {game.rating}
						</CardDescription>
						<CardDescription className='flex items-center text-sm'>
							<Clock className='w-4 h-4 mr-2' />
							Playtime: {game.playtime} hrs
						</CardDescription>
					</div>
					{game.genres.length > 0 ? (
						<div className='mt-3'>
							<Badge variant='secondary' className='mr-1'>
								{game.genres[0].name}
							</Badge>
							{game.genres[1] && <Badge variant='outline'>+{game.genres.length - 1}</Badge>}
						</div>
					) : null}
				</CardContent>
			</Card>
		</Link>
	);
}

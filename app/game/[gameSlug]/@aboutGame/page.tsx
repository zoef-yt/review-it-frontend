import Image from 'next/image';

import { Card } from '@/components/ui/card';
import { SingleGameToast } from '@/components/singleGame/toast';
import { DescriptionDrawer } from '@/components/singleGame/description';
import { CustomRatingCard } from '@/components/singleGame/ratingCard';
import { ReviewComponent } from '@/components/singleGame/reviewComponent';
import { makeRequest } from '@/actions/makeRequest';

interface SingleGamePageProps {
	params: {
		gameSlug: string;
	};
}

export default async function SingleGamePage({ params }: SingleGamePageProps) {
	const response = await makeRequest<Game>({
		method: 'get',
		endpoint: `api/games/${params.gameSlug}`,
		auth: 'none',
	});
	if (response.success == false) {
		return <SingleGameToast />;
	}
	const game = response.data;
	const { backgroundImage, genres, name, platforms, rating, released, playtime, description } = game;

	return (
		<div className='mx-auto px-4 w-full'>
			<header className='relative w-full h-64 md:h-80 mb-6 overflow-hidden'>
				<Image
					src={backgroundImage}
					alt={name}
					fill
					className='rounded-lg shadow-lg bg-top object-cover'
					priority
					fetchPriority='high'
					loading='eager'
				/>
				<div className='absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg text-center p-4'>
					<h1 className='text-white text-xl md:text-4xl font-bold'>{name}</h1>
				</div>
				<div className='absolute bottom-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-lg text-white animate-slideInFromLeft delay-100 -translate-x-[120%]'>
					<div className='flex flex-wrap gap-2'>
						{genres.map((genre) => (
							<span key={genre.id} className='text-sm'>
								{genre.name}
							</span>
						))}
					</div>
				</div>
				<div className='absolute bottom-4 right-4 bg-black bg-opacity-50 px-3 py-1 rounded-lg text-white animate-slideInFromRight delay-100 translate-x-[120%]'>
					<div className='flex flex-wrap gap-2'>
						{platforms.map((platform) => (
							<span key={platform.id} className='text-sm'>
								{platform.name}
							</span>
						))}
					</div>
				</div>
			</header>
			<section className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-8'>
				<Card className='p-4 text-center hover:shadow-2xl transition-all'>
					<h2 className='text-2xl font-semibold mb-2'>Release Date</h2>
					{released ? (
						<div className='text-center'>
							<p className='text-4xl font-bold'>
								{new Date(released).getDate()} {new Date(released).toLocaleString('default', { month: 'short' })}
							</p>
							<p className='text-sm'>{new Date(released).getFullYear()}</p>
						</div>
					) : (
						<p className='text-gray-700'>TBA</p>
					)}
				</Card>
				<Card className='p-4 text-center hover:shadow-2xl transition-all'>
					<h2 className='text-2xl font-semibold mb-2'>Description</h2>
					<DescriptionDrawer description={description} />
				</Card>
				<Card className='p-4 text-center hover:shadow-2xl transition-all'>
					<h2 className='text-2xl font-semibold mb-2'>Playtime</h2>
					<p className='text-4xl font-bold'>{playtime && playtime > 0 ? `${playtime} hrs` : 'NA'}</p>
				</Card>
				<CustomRatingCard rating={rating} />
			</section>
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
			/>
		</div>
	);
}

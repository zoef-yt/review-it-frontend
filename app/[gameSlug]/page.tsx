import axios from 'axios';
import Image from 'next/image';

interface SingleGamePageProps {
	params: {
		gameSlug: string;
	};
}
export default async function SingleGamePage({ params }: SingleGamePageProps) {
	let game: any = null;
	try {
		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}api/games/${params.gameSlug}`);
		if (response.status === 200) {
			game = response.data;
		}
		if (!game) {
			return <main>Game not found</main>;
		}
	} catch (error) {
		return <main>Error fetching game data</main>;
	}
	return (
		<main className='mx-auto px-4 py-6'>
			<header className='relative w-full h-64 mb-8'>
				<Image src={game.backgroundImage} alt={game.name} layout='fill' objectFit='cover' className='rounded-lg shadow-lg' />
				<div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg'>
					<h1 className='text-white text-4xl font-bold'>{game.name}</h1>
				</div>
			</header>
			<section className='mb-8'>
				<h2 className='text-2xl font-semibold mb-4'>Details</h2>
				<p className='text-gray-700 mb-2'>
					<strong>Released:</strong> {game.released}
				</p>
				<p className='text-gray-700 mb-2'>
					<strong>Rating:</strong> {game.rating} / {game.ratingTop}
				</p>
				{game.esrbRating && (
					<p className='text-gray-700 mb-2'>
						<strong>ESRB Rating:</strong> {game.esrbRating.name}
					</p>
				)}
				<p className='text-gray-700 mb-2'>
					<strong>Playtime:</strong> {game.playtime} hours
				</p>
				<p className='text-gray-700 mb-2'>
					<strong>Genres:</strong> {game?.genres?.map((genre: any) => genre.name).join(', ')}
				</p>
				{game.website && (
					<p className='text-blue-600 mb-2'>
						<strong>Website:</strong>{' '}
						<a href={game.website} target='_blank' rel='noopener noreferrer'>
							{game.website}
						</a>
					</p>
				)}
			</section>
			<section className='mb-8'>
				<h2 className='text-2xl font-semibold mb-4'>Description</h2>
				<p className='text-gray-700'>{game.description}</p>
			</section>

			<section className='mb-8'>
				<h2 className='text-2xl font-semibold mb-4'>Screenshots</h2>
				<div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
					{game?.shortScreenshots?.map((screenshot: any) => (
						<div key={screenshot.id} className='w-full h-48 relative'>
							<Image
								src={screenshot.image}
								alt={`Screenshot ${screenshot.id}`}
								layout='fill'
								objectFit='cover'
								className='rounded-lg shadow-lg'
							/>
						</div>
					))}
				</div>
			</section>
			{game.alternativeNames.length > 0 && (
				<section className='mb-8'>
					<h2 className='text-2xl font-semibold mb-4'>Alternative Names</h2>
					<ul className='list-disc list-inside'>
						{game.alternativeNames.map((name: any, index: number) => (
							<li key={index} className='text-gray-700'>
								{name}
							</li>
						))}
					</ul>
				</section>
			)}
			<section>
				<h2 className='text-2xl font-semibold mb-4'>Available on:</h2>
				<ul className='list-disc list-inside'>
					{game.stores.map((store: any) => (
						<li key={store.id} className='text-gray-700'>
							{store.name}
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}

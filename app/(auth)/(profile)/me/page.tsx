import Link from 'next/link';
import axios from 'axios';
import { getSession } from '@/libs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Star, User, Mail, Gamepad2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Game {
	_id: string;
	gameID: string;
	gameName: string;
	gameImage: string;
	gameSlug: string;
	description: string;
	reviews: string[];
}

interface Review {
	_id: string;
	rating: number;
	comment: string;
	gameID: Game;
	userID: string;
	createdAt: string;
}

interface UserProfileProps {
	username: string;
	email: string;
	lastLogin: Date;
	createdAt: Date;
	likedGamesGenres?: { name: string }[];
	playedGames: string[];
	currentGame: string[];
	gamesReviews: Review[];
}

export default async function UserProfile() {
	const token = await getSession('accessToken');
	const url = `${process.env.NEXT_PUBLIC_API_BACKEND}auth/me`;
	let user: UserProfileProps | null = null;

	try {
		const data = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		user = data.data;
	} catch (error) {}

	if (!user) {
		return (
			<main className='flex justify-center items-center h-screen'>
				<div className='text-center'>
					<p className='text-xl font-semibold text-gray-600'>No user data available.</p>
					<Link href='/login' className='mt-4 inline-block underline text-blue-500 hover:text-blue-400 transition-colors duration-200'>
						Go to the login page
					</Link>
				</div>
			</main>
		);
	}

	return (
		<main className='p-6 space-y-12'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-4xl font-bold text-gray-800'>User Profile</h1>
				<Link href='/change-password' className='underline text-blue-500 hover:text-blue-400 transition-colors duration-200'>
					Change Password
				</Link>
			</div>
			<div className='bg-gray-50 p-6 rounded-lg shadow-md'>
				<h2 className='text-2xl font-semibold text-gray-700 mb-4'>Personal Information</h2>
				<div className='space-y-2'>
					<p className='flex items-center text-lg'>
						<User className='w-5 h-5 mr-2 text-gray-500' />
						<strong className='mr-2'>Username:</strong> {user.username}
					</p>
					<p className='flex items-center text-lg'>
						<Mail className='w-5 h-5 mr-2 text-gray-500' />
						<strong className='mr-2'>Email:</strong> {user.email}
					</p>
				</div>
			</div>

			<div className='bg-gray-50 p-6 rounded-lg shadow-md'>
				<h2 className='text-2xl font-semibold text-gray-700 mb-4'>Game Reviews</h2>
				{user.gamesReviews.length ? (
					<div className='space-y-6'>
						{user.gamesReviews.map((review, index) => (
							<Card key={index} className='w-full transition-transform hover:shadow-lg'>
								<CardHeader className='flex flex-row items-center gap-4'>
									<Avatar className='w-24 h-24'>
										<AvatarImage src={review.gameID.gameImage} alt={review.gameID.gameName} className='object-cover' />
										<AvatarFallback>{review.gameID.gameName.slice(0, 2)}</AvatarFallback>
									</Avatar>
									<div>
										<CardTitle className='text-lg'>{review.gameID.gameName}</CardTitle>
									</div>
								</CardHeader>
								<CardContent>
									<div className='flex items-center space-x-2 mb-2'>
										<Star className='w-5 h-5 text-yellow-500' />
										<span className='font-semibold'>{review.rating.toFixed(1)}</span>
									</div>
									<p className='text-gray-700'>{review.comment}</p>
								</CardContent>
								<CardFooter className='flex justify-between items-center'>
									<div className='flex items-center space-x-2 text-sm text-gray-500'>
										<Calendar className='w-4 h-4' />
										<span>{new Date(review.createdAt).toLocaleDateString()}</span>
									</div>
									<Badge variant='secondary'>{review.gameID.gameID}</Badge>
								</CardFooter>
							</Card>
						))}
					</div>
				) : (
					<p className='text-lg text-gray-600'>No reviews available.</p>
				)}
			</div>
			<div className='bg-gray-50 p-6 rounded-lg shadow-md'>
				<h2 className='text-2xl font-semibold text-gray-700 mb-4'>Liked Game Genres</h2>
				{user.likedGamesGenres?.length ? (
					<ul className='flex flex-wrap gap-4'>
						{user.likedGamesGenres.map((genre, index) => (
							<li key={index} className='px-4 py-2 bg-blue-100 rounded-lg text-lg text-blue-700'>
								{genre.name}
							</li>
						))}
					</ul>
				) : (
					<p className='text-lg text-gray-600'>No liked genres.</p>
				)}
			</div>
			<div className='bg-gray-50 p-6 rounded-lg shadow-md'>
				<h2 className='text-2xl font-semibold text-gray-700 mb-4'>Played Games</h2>
				{user.playedGames.length ? (
					<div className='grid grid-cols-2 gap-4'>
						{user.playedGames.map((gameId) => (
							<div key={gameId} className='p-4 bg-white rounded-lg shadow-sm flex items-center justify-center text-lg text-gray-600'>
								<Gamepad2 className='mr-2 w-6 h-6' />
								{gameId}
							</div>
						))}
					</div>
				) : (
					<p className='text-lg text-gray-600'>No games played.</p>
				)}
			</div>
			<div className='bg-gray-50 p-6 rounded-lg shadow-md'>
				<h2 className='text-2xl font-semibold text-gray-700 mb-4'>Current Games</h2>
				{user.currentGame.length ? (
					<div className='grid grid-cols-2 gap-4'>
						{user.currentGame.map((gameId) => (
							<div key={gameId} className='p-4 bg-white rounded-lg shadow-sm flex items-center justify-center text-lg text-gray-600'>
								<Gamepad2 className='mr-2 w-6 h-6' />
								{gameId}
							</div>
						))}
					</div>
				) : (
					<p className='text-lg text-gray-600'>No current games.</p>
				)}
			</div>
		</main>
	);
}

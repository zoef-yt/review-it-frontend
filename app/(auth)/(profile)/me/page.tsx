import Link from 'next/link';
import axios from 'axios';

import { getSession } from '@/libs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Star } from 'lucide-react';
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
			<main className='flex justify-center items-center'>
				No user data available.
				<Link href='/login' className='underline text-blue-500 hover:text-blue-400 transition-colors duration-200'>
					Go to the login page
				</Link>
			</main>
		);
	}

	return (
		<main className='p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold text-gray-800'>User Profile</h1>
				<Link href='/change-password' className='underline text-blue-500 hover:text-blue-400 transition-colors duration-200'>
					Change Password
				</Link>
			</div>

			<div className='mb-8'>
				<p className='text-lg mb-2'>
					<strong>Username:</strong> {user.username}
				</p>
				<p className='text-lg mb-2'>
					<strong>Email:</strong> {user.email}
				</p>
				<p className='text-lg mb-2'>
					<strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleString()}
				</p>
				<p className='text-lg mb-2'>
					<strong>Account Created:</strong> {new Date(user.createdAt).toLocaleString()}
				</p>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-semibold mb-4 text-gray-700'>Liked Game Genres</h2>
				{user.likedGamesGenres?.length ? (
					<ul className='list-disc list-inside space-y-2'>
						{user.likedGamesGenres.map((genre, index) => (
							<li key={index} className='text-lg text-gray-600'>
								{genre.name}
							</li>
						))}
					</ul>
				) : (
					<p className='text-lg text-gray-600'>No liked genres.</p>
				)}
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-semibold mb-4 text-gray-700'>Played Games</h2>
				{user.playedGames.length ? (
					<ul className='list-disc list-inside space-y-2'>
						{user.playedGames.map((gameId) => (
							<li key={gameId} className='text-lg text-gray-600'>
								{gameId}
							</li>
						))}
					</ul>
				) : (
					<p className='text-lg text-gray-600'>No games played.</p>
				)}
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-semibold mb-4 text-gray-700'>Current Games</h2>
				{user.currentGame.length ? (
					<ul className='list-disc list-inside space-y-2'>
						{user.currentGame.map((gameId) => (
							<li key={gameId} className='text-lg text-gray-600'>
								{gameId}
							</li>
						))}
					</ul>
				) : (
					<p className='text-lg text-gray-600'>No current games.</p>
				)}
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-semibold mb-4 text-gray-700'>Game Reviews</h2>
				{user.gamesReviews.length ? (
					<ul className='list-disc list-inside space-y-2'>
						{user.gamesReviews.map((review, index) => (
							<Card key={index} className='w-full'>
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
					</ul>
				) : (
					<p className='text-lg text-gray-600'>No reviews available.</p>
				)}
			</div>
		</main>
	);
}

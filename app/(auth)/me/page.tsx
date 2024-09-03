import Link from 'next/link';
import axios from 'axios';

import { getSession } from '@/libs';

interface UserProfileProps {
	username: string;
	email: string;
	lastLogin: Date;
	createdAt: Date;
	likedGamesGenres?: { name: string }[];
	playedGames: string[];
	currentGame: string[];
	gamesReviews: string[];
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
				<Link href='/login'> Go to the login page</Link>
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
						{user.gamesReviews.map((reviewId) => (
							<li key={reviewId} className='text-lg text-gray-600'>
								{reviewId}
							</li>
						))}
					</ul>
				) : (
					<p className='text-lg text-gray-600'>No reviews available.</p>
				)}
			</div>
		</main>
	);
}

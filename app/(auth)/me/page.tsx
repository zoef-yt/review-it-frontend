import { Logout } from '@/components/(auth)/logout/button';
import { getSession } from '@/libs';
import axios from 'axios';
import Link from 'next/link';

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
		<main className='user-profile'>
			<h1>User Profile</h1>
			<p>
				<strong>Username:</strong> {user.username}
			</p>
			<p>
				<strong>Email:</strong> {user.email}
			</p>
			<p>
				<strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleString()}
			</p>
			<p>
				<strong>Account Created:</strong> {new Date(user.createdAt).toLocaleString()}
			</p>
			<h2>Liked Game Genres</h2>
			<ul>{user.likedGamesGenres?.map((genre, index) => <li key={index}>{genre.name}</li>) || <p>No liked genres.</p>}</ul>
			<h2>Played Games</h2>
			<ul>{user.playedGames.length ? user.playedGames.map((gameId) => <li key={gameId}>{gameId}</li>) : <p>No games played.</p>}</ul>
			<h2>Current Games</h2>
			<ul>{user.currentGame.length ? user.currentGame.map((gameId) => <li key={gameId}>{gameId}</li>) : <p>No current games.</p>}</ul>
			<h2>Game Reviews</h2>
			<ul>
				{user.gamesReviews.length ? user.gamesReviews.map((reviewId) => <li key={reviewId}>{reviewId}</li>) : <p>No reviews available.</p>}
			</ul>
			<Logout redirectUrl='login' />
			<Link href='/change-password' className='block underline text-blue-400'>
				Change Password
			</Link>
		</main>
	);
}

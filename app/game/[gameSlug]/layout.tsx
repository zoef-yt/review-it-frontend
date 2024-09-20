interface LayoutProps {
	aboutGame: React.ReactNode;
	userReview: React.ReactNode;
	gameReviews: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
	const { aboutGame, userReview, gameReviews } = props;
	return (
		<main className='flex flex-col mx-auto px-4 py-6 w-full'>
			{aboutGame}
			{userReview}
			{gameReviews}
		</main>
	);
}

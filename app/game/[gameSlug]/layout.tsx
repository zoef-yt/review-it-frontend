interface LayoutProps {
	aboutGame: React.ReactNode;
	gameReviews: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
	const { aboutGame, gameReviews } = props;
	return (
		<main className='flex flex-col mx-auto px-4 py-6'>
			{aboutGame}
			{gameReviews}
		</main>
	);
}

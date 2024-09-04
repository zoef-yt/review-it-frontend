interface LayoutProps {
	aboutGame: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
	const { aboutGame } = props;
	return <main className='mx-auto px-4 py-6'>{aboutGame}</main>;
}

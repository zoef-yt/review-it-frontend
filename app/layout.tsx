import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Review It',
	description:
		'Review it - Your ultimate platform for discovering and reviewing movies and games. Explore new titles, share your thoughts, and see what others have to say. Whether you are a movie buff or a gaming enthusiast, Review it provides comprehensive reviews and ratings to help you make informed choices.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	);
}

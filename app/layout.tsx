import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from '@/providers/providers';
import { NavigationBarHome } from '@/components/home/navigationBar';
import { Toaster } from '@/components/ui/toaster';
import { SearchBar } from '@/components/searchBar';

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
			<Providers>
				<body className={`${inter.className} bg-gray-100 flex flex-col min-h-screen`}>
					<NavigationBarHome />
					<div className='flex flex-col max-w-screen-xl mx-auto [&_main]:flex-grow flex-grow w-full'>
						<SearchBar />
						{children}
					</div>
					<Toaster />
				</body>
			</Providers>
		</html>
	);
}

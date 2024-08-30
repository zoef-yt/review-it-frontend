import Link from 'next/link';

export default async function Home() {
	return (
		<main className='flex flex-col min-h-screen items-center justify-center p-24 bg-gray-100'>
			<h1 className='text-3xl font-bold mb-8 text-center'>Welcome to the Review It app!</h1>
			<Link href='/login'>Login</Link>
		</main>
	);
}

export default function Loading() {
	return (
		<main className='flex flex-col items-center justify-center'>
			<div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
				<div className='h-10 bg-gray-300 animate-pulse rounded mb-8'></div>
				<div className='flex flex-col space-y-6'>
					<div>
						<div className='h-4 bg-gray-300 animate-pulse rounded w-1/3 mb-2'></div>
						<div className='h-10 bg-gray-300 animate-pulse rounded w-full'></div>
					</div>
					<div>
						<div className='h-4 bg-gray-300 animate-pulse rounded w-1/3 mb-2'></div>
						<div className='h-10 bg-gray-300 animate-pulse rounded w-full'></div>
					</div>
					<div className='h-12 bg-gray-300 animate-pulse rounded w-full'></div>
				</div>
			</div>
		</main>
	);
}

export default function Loading() {
	return (
		<div className='container mx-auto px-4 py-6'>
			<div className='relative w-full h-64 mb-8 bg-gray-300 animate-pulse rounded-lg'></div>
			<section className='mb-8'>
				<div className='h-6 bg-gray-300 animate-pulse rounded w-1/3 mb-4'></div>
				<div className='h-4 bg-gray-300 animate-pulse rounded w-1/2 mb-2'></div>
				<div className='h-4 bg-gray-300 animate-pulse rounded w-1/4 mb-2'></div>
				<div className='h-4 bg-gray-300 animate-pulse rounded w-3/4 mb-2'></div>
				<div className='h-4 bg-gray-300 animate-pulse rounded w-1/2 mb-2'></div>
			</section>
			<section className='mb-8'>
				<div className='h-6 bg-gray-300 animate-pulse rounded w-1/4 mb-4'></div>
				<div className='h-4 bg-gray-300 animate-pulse rounded w-full mb-2'></div>
				<div className='h-4 bg-gray-300 animate-pulse rounded w-full mb-2'></div>
				<div className='h-4 bg-gray-300 animate-pulse rounded w-full mb-2'></div>
			</section>
			<section className='mb-8'>
				<div className='h-6 bg-gray-300 animate-pulse rounded w-1/3 mb-4'></div>
				<div className='h-4 bg-gray-300 animate-pulse rounded w-1/2 mb-2'></div>
				<div className='h-4 bg-gray-300 animate-pulse rounded w-full mb-2'></div>
			</section>
			<section className='mb-8'>
				<div className='h-6 bg-gray-300 animate-pulse rounded w-1/4 mb-4'></div>
				<div className='h-4 bg-gray-300 animate-pulse rounded w-1/2 mb-2'></div>
			</section>
		</div>
	);
}

export default function Loading() {
	return (
		<main className='space-y-12 p-6'>
			{[...Array(4)].map((_, outerIndex) => (
				<div key={outerIndex}>
					<div className='h-8 bg-gray-300 animate-pulse rounded w-1/3 mb-6'></div>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{[...Array(4)].map((_, innerIndex) => (
							<div key={`${outerIndex}-${innerIndex}`} className='bg-white rounded-lg shadow p-4 flex flex-col'>
								<div className='h-48 w-full relative mb-4 bg-gray-300 animate-pulse rounded-lg'></div>
								<div className='flex-1'>
									<div className='h-4 bg-gray-300 animate-pulse rounded w-3/4 mb-2'></div>
									<div className='h-4 bg-gray-300 animate-pulse rounded w-1/2 mb-2'></div>
									<div className='h-4 bg-gray-300 animate-pulse rounded w-1/4 mb-2'></div>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</main>
	);
}

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<>
			{[...Array(4)].map((_, outerIndex) => (
				<div key={outerIndex}>
					<Skeleton className='h-8 w-1/3 mb-6' />
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{[...Array(4)].map((_, innerIndex) => (
							<div key={`${outerIndex}-${innerIndex}`} className='bg-white rounded-lg shadow flex flex-col'>
								<Skeleton className='h-48 w-full mb-4 rounded-tr-lg rounded-tl-lg' />
								<div className='flex-1 p-4'>
									<Skeleton className='h-4 w-3/4 mb-2' />
									<Skeleton className='h-4 w-1/2 mb-2' />
									<Skeleton className='h-4 w-1/4 mb-2' />
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</>
	);
}

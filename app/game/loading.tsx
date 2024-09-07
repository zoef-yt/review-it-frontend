import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<main className='px-6 py-6'>
			<Skeleton className='relative w-full h-64 md:h-80 mb-8 rounded-lg' />
			<div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
				<div className='flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm'>
					<Skeleton className='h-6 w-24 mb-2' />
					<Skeleton className='h-8 w-20 mb-2' />
					<Skeleton className='h-3 w-24' />
				</div>
				<div className='flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm'>
					<Skeleton className='h-6 w-32 mb-2' />
					<Skeleton className='h-3 w-40 mb-2' />
					<Skeleton className='h-3 w-36 mb-2' />
					<Skeleton className='h-3 w-36' />
				</div>
				<div className='flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm'>
					<Skeleton className='h-6 w-24 mb-2' />
					<Skeleton className='h-8 w-16' />
				</div>
				<div className='flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm'>
					<Skeleton className='h-6 w-24 mb-2' />
					<Skeleton className='h-8 w-16' />
				</div>
			</div>
			<div className='mx-auto px-4 py-6 relative bg-white shadow-lg rounded-lg'>
				<div className='mb-6 flex flex-col items-center'>
					<Skeleton className='h-6 w-32 mb-2' />
					<div className='flex space-x-1'>
						{[...Array(5)].map((_, i) => (
							<Skeleton key={i} className='h-8 w-8 rounded-full' />
						))}
					</div>
				</div>
				<div className='mb-6'>
					<Skeleton className='h-6 w-24 mb-2' />
					<Skeleton className='h-32 w-full rounded-md' />
				</div>
				<div className='flex justify-center'>
					<Skeleton className='h-10 w-32 rounded-lg' />
				</div>
			</div>
		</main>
	);
}

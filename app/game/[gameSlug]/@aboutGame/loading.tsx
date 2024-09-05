import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='px-4'>
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
		</div>
	);
}

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='container mx-auto px-4 py-6'>
			<Skeleton className='relative w-full h-64 mb-8 rounded-lg' />
			<section className='mb-8'>
				<Skeleton className='h-6 w-1/3 mb-4' />
				<Skeleton className='h-4 w-1/2 mb-2' />
				<Skeleton className='h-4 w-1/4 mb-2' />
				<Skeleton className='h-4 w-3/4 mb-2' />
				<Skeleton className='h-4 w-1/2 mb-2' />
			</section>
			<section className='mb-8'>
				<Skeleton className='h-6 w-1/4 mb-4' />
				<Skeleton className='h-4 w-full mb-2' />
				<Skeleton className='h-4 w-full mb-2' />
				<Skeleton className='h-4 w-full mb-2' />
			</section>
			<section className='mb-8'>
				<Skeleton className='h-6 w-1/3 mb-4' />
				<Skeleton className='h-4 w-1/2 mb-2' />
				<Skeleton className='h-4 w-full mb-2' />
			</section>
			<section className='mb-8'>
				<Skeleton className='h-6 w-1/4 mb-4' />
				<Skeleton className='h-4 w-1/2 mb-2' />
			</section>
		</div>
	);
}

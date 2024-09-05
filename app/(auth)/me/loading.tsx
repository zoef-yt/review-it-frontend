import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<main className='flex flex-col items-center justify-center'>
			<div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
				<Skeleton className='h-10 rounded mb-8' />
				<div className='flex flex-col space-y-6'>
					<div>
						<Skeleton className='h-4 rounded w-1/3 mb-2' />
						<Skeleton className='h-10 rounded w-full' />
					</div>
					<div>
						<Skeleton className='h-4 rounded w-1/3 mb-2' />
						<Skeleton className='h-10 rounded w-full' />
					</div>
					<Skeleton className='h-12 rounded w-full' />
				</div>
			</div>
		</main>
	);
}

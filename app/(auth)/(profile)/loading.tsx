import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<main className='p-6 space-y-12'>
			<div className='flex justify-between items-center mb-6'>
				<Skeleton className='h-10 w-1/3 rounded' />
				<Skeleton className='h-6 w-1/4 rounded' />
			</div>
			<div className='bg-gray-50 p-6 rounded-lg shadow-md'>
				<Skeleton className='h-8 w-1/4 mb-4 rounded' />
				<div className='space-y-2'>
					<Skeleton className='h-6 w-1/2 rounded' />
					<Skeleton className='h-6 w-1/3 rounded' />
				</div>
			</div>

			<div className='bg-gray-50 p-6 rounded-lg shadow-md'>
				<Skeleton className='h-8 w-1/4 mb-4 rounded' />
				<div className='space-y-6'>
					{[...Array(1)].map((_, index) => (
						<div key={index} className='w-full transition-transform'>
							<div className='flex flex-row items-center gap-4 mb-4'>
								<Skeleton className='h-24 w-24 rounded-full' />
								<Skeleton className='h-6 w-1/3 rounded' />
							</div>
							<Skeleton className='h-4 w-1/5 rounded mb-2' />
							<Skeleton className='h-6 w-full rounded' />
							<div className='flex justify-between items-center mt-4'>
								<Skeleton className='h-4 w-1/4 rounded' />
								<Skeleton className='h-6 w-1/6 rounded' />
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='bg-gray-50 p-6 rounded-lg shadow-md'>
				<Skeleton className='h-8 w-1/4 mb-4 rounded' />
				<div className='flex flex-wrap gap-4'>
					{[...Array(3)].map((_, index) => (
						<Skeleton key={index} className='h-8 w-20 rounded-lg' />
					))}
				</div>
			</div>
			<div className='bg-gray-50 p-6 rounded-lg shadow-md'>
				<Skeleton className='h-8 w-1/4 mb-4 rounded' />
				<div className='grid grid-cols-2 gap-4'>
					{[...Array(2)].map((_, index) => (
						<Skeleton key={index} className='h-10 w-full rounded-lg' />
					))}
				</div>
			</div>
			<div className='bg-gray-50 p-6 rounded-lg shadow-md'>
				<Skeleton className='h-8 w-1/4 mb-4 rounded' />
				<div className='grid grid-cols-2 gap-4'>
					{[...Array(2)].map((_, index) => (
						<Skeleton key={index} className='h-10 w-full rounded-lg' />
					))}
				</div>
			</div>
		</main>
	);
}

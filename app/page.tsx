import { Suspense } from 'react';

import { HomeScreenGamesList } from '@/components/home/gamesList';
import { Skeleton } from '@/components/ui/skeleton';

export const dynamic = 'force-dynamic';

export default async function Home() {
	return (
		<main className='flex flex-col items-center py-4 px-4'>
			<div className='space-y-12'>
				<HomeScreenGamesList dateRange={[0, 7]} titleText='Next Week Releases' skipFilter={true} shouldLazyLoad={false} />
				<HomeScreenGamesList dateRange={[0, 0]} titleText='Today' shouldLazyLoad={false} />
				<Suspense
					fallback={
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
					}
				>
					<HomeScreenGamesList dateRange={[-7, -1]} titleText='Last Week Releases' shouldLazyLoad />
					<HomeScreenGamesList dateRange={[-31, -7]} titleText='Last Month Releases' shouldLazyLoad />
				</Suspense>
				{/* <HomeScreenGamesList dateRange={[-365, -31]} titleText='Last Year Releases' />
					<HomeScreenGamesList dateRange={[7, 31]} titleText='Next Month Releases' skipFilter={true} />
					<HomeScreenGamesList dateRange={[31, 365]} titleText='Next Year Releases' skipFilter={true} /> */}
			</div>
		</main>
	);
}

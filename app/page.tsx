import { HomeScreenGamesList } from '@/components/home/gamesList';

export const dynamic = 'force-dynamic';

interface HomeProps {
	searchParams: {
		removeExtras?: string;
	};
}
export default async function Home({ searchParams }: HomeProps) {
	const removeExtras: boolean = searchParams.removeExtras === 'true';

	const skipFilter = !removeExtras;
	return (
		<main className='flex flex-col items-center py-4 px-4'>
			<div className='space-y-12'>
				<HomeScreenGamesList dateRange={[0, 7]} titleText='Next Week Releases' shouldLazyLoad={false} skipFilter={skipFilter} />
				<HomeScreenGamesList dateRange={[0, 0]} titleText='Today' shouldLazyLoad={false} skipFilter={skipFilter} />
				<HomeScreenGamesList dateRange={[-7, -1]} titleText='Last Week Releases' shouldLazyLoad skipFilter={skipFilter} />
				<HomeScreenGamesList dateRange={[-31, -7]} titleText='Last Month Releases' shouldLazyLoad skipFilter={skipFilter} />
				{/* <HomeScreenGamesList dateRange={[-365, -31]} titleText='Last Year Releases' skipFilter={skipFilter} /> */}
				{/* <HomeScreenGamesList dateRange={[7, 31]} titleText='Next Month Releases' skipFilter={skipFilter} />
				<HomeScreenGamesList dateRange={[31, 365]} titleText='Next Year Releases' skipFilter={skipFilter} /> */}
			</div>
		</main>
	);
}

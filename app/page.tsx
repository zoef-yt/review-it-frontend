import { HomeScreenGamesList } from '@/components/home/gamesList';

export const dynamic = 'force-dynamic';

export default async function Home() {
	return (
		<main className='flex flex-col items-center py-4 px-4'>
			<div className='space-y-12'>
				<HomeScreenGamesList dateRange={[0, 7]} titleText='Next Week Releases' skipFilter={true} />
				<HomeScreenGamesList dateRange={[0, 0]} titleText='Today' />
				<HomeScreenGamesList dateRange={[-7, -1]} titleText='Last Week Releases' />
				<HomeScreenGamesList dateRange={[-31, -7]} titleText='Last Month Releases' />
				{/* <HomeScreenGamesList dateRange={[-365, -31]} titleText='Last Year Releases' />
				<HomeScreenGamesList dateRange={[7, 31]} titleText='Next Month Releases' skipFilter={true} />
				<HomeScreenGamesList dateRange={[31, 365]} titleText='Next Year Releases' skipFilter={true} /> */}
			</div>
		</main>
	);
}

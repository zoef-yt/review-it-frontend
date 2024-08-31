'use server';

import axios from 'axios';

interface GetGameProps {
	size?: number;
	page?: number;
	params?: {
		search: string | null;
		ordering: string | null;
		dateRange?: string | null;
		skipFilter?: boolean;
	} | null;
}

export const getAllGames = async (props: GetGameProps): Promise<Game[] | undefined> => {
	const { size, page, params } = props;
	const { search, ordering, dateRange, skipFilter } = params || {};
	try {
		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}api/games`, {
			params: {
				page_size: size,
				page,
				search,
				ordering,
				dateRange: dateRange ?? null,
				skipFilter,
			},
		});
		return response.data.results;
	} catch (error) {
		console.error(error);
	}
};

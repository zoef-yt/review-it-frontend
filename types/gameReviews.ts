export interface ReviewSectionProps {
	params: {
		gameSlug: string;
	};
}

export interface Review {
	_id: string;
	rating: number;
	comment: string;
	userID: {
		_id: string;
		username: string;
	};
	createdAt: string;
}

export interface ReviewApiResponse {
	averageRating: number;
	reviewsCount: number;
	reviews: Review[];
}

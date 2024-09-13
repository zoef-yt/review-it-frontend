export interface Game {
	id: number;
	slug: string;
	name: string;
	released: string;
	tba: boolean;
	backgroundImage: string;
	rating: number;
	ratingTop: number;
	playtime: number;
	platforms: Platform[];
	stores: Store[];
	genres: Genre[];
	esrbRating: EsrbRating | null;
	description: string;
	alternativeNames: string[];
	website: string;
	nameOriginal: string;
	shortScreenshots?: string[];
	parentPlatforms: ParentPlatform[];
}

interface Platform {
	id: number;
	name: string;
	slug: string;
}

interface Store {
	id: number;
	name: string;
	slug: string;
}

interface Genre {
	id: number;
	name: string;
	slug: string;
}

interface EsrbRating {
	id: number;
	name: string;
	slug: string;
}

interface ParentPlatform {
	platform: {
		id: number;
		name: string;
		slug: string;
	};
}

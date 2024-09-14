interface RawgGenre {
	id: number;
	name: string;
	slug: string;
}

export interface GameList {
	id: number;
	slug: string;
	name: string;
	released: string;
	tba: boolean;
	backgroundImage: string;
	rating: number;
	playtime: number;
	genres: RawgGenre[];
	alternativeNames: string[];
}

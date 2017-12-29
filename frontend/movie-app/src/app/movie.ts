export class Movie {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    vote_average: number;
    recommended: boolean;

    constructor(id: number, title: string, overview: string, backdrop_path: string, vote_average: number, recommended: boolean) {
        this.id = id;
        this.title = title;
        this.overview = overview;
        this.backdrop_path = backdrop_path;
        this.vote_average = vote_average;
        this.recommended = recommended;
    }
}

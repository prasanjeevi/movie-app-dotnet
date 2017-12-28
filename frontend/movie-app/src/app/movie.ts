export class Movie {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    recommended: boolean;

    constructor(id: number, title: string, overview: string, backdrop_path: string, recommended: boolean) {
        this.id = id;
        this.title = title;
        this.overview = overview;
        this.backdrop_path = backdrop_path;
        this.recommended = recommended;
    }
}

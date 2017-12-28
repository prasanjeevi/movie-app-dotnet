export class Movie {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    isRecommended: boolean;

    constructor(id: number, title: string, overview: string, backdrop_path: string, isRecommended: boolean){
        this.id = id;
        this.title = title;
        this.overview = overview;
        this.backdrop_path = backdrop_path;
        this.isRecommended = isRecommended;
    }
}
export class Movie {
    id: number;
    title: string;
    overview: string;

    constructor(id: number, title: string, overview: string){
        this.id = id;
        this.title = title;
        this.overview = overview;
    }
}
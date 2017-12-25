import { Movie } from "app/movie";

export interface MovieApiResponse {
    page: number;
    total_results: number;
    total_pages: number;
    results: Movie[];
}
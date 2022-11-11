import { IUserMovieDetails } from "./IUserMovieDetails";

export interface IUserMovies
{
    userid: string | null |undefined;
    movies: IUserMovieDetails[] | null;
}
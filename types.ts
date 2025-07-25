export type MOVIE = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title?: string;
    video: boolean
    vote_average: number;
    vote_count: number;
    name?: string;
    origin_country: string[];
    original_name: string;
    first_air_date: string;
};

export const getDisplayTitle = (movie: MOVIE): string => {
    return movie.title || movie.name || 'Untitled';
};

export const getShortTitle = (movie: MOVIE, maxLength = 16): string => {
    const title = getDisplayTitle(movie);
    return title.length <= maxLength ? title : `${title.slice(0, 12)}...`;
};

export const getDisplayDate = (movie: MOVIE): string => {
    return movie.release_date || movie.first_air_date || 'Invalid Date';
};

export const getMediaHref = (movie: MOVIE): string => {
    return movie.media_type === "movie"
        ? `/movies/${movie.media_type}/${movie.id}`
        : `/tv/${movie.media_type}/${movie.id}`;
};

export type Params = {
    slug: string;
}
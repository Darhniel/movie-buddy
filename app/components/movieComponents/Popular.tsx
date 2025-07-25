'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { unavailable } from '@/app/config/config';
import Image from 'next/image';
import { MOVIE, getDisplayDate, getDisplayTitle, getShortTitle } from '@/types';
import { Loading } from '../Loading';

export default function Popular() {
    const [movies, setMovies] = useState<MOVIE[]>([]);
    const [tv, setTv] = useState<MOVIE[]>([]);
    const [loading, setLoading] = useState(true)
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    const popularTab = [
        {
            name: "Movies",
            api: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        },
        {
            name: "Tv Shows",
            api: `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
        }
    ]

    async function handleMovies() {
        const { api } = popularTab[0]

        try {
            const response = await fetch(api);
            const data = await response.json();
            setTv([])
            setMovies(data.results)
        } catch (error) {
            console.error('Error fetching TV Shows: ', error)
        }
    }

    async function handleTv() {
        const { api } = popularTab[1];

        try {
            const response = await fetch(api);
            const data = await response.json();
            setMovies([])
            console.log(data.results)
            setTv(data.results)
        } catch (error) {
            console.error('Error fetching TV Shows: ', error)
        }
    }

    useEffect(() => {
        const fetchMedia = async () => {
            setLoading(true)
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
                const data = await response.json();

                setMovies(data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies and TV shows:', error);
            }
        };

        fetchMedia();
    },
        // eslint-disable-next-line
        []);

    return (
        <>
            <div className="container flex gap-8 items-center">
                <h2 className="font-bold text-2xl py-4 text-white capitalize">popular</h2>
                <div className="flex border border-[grey] border-solid rounded-full">
                    <button onClick={handleMovies} className={`px-3.5 text-white rounded-full min-h-[28px] font-medium ${movies.length > 0 ? "bg-gray-500" : ""}`}>
                        Movies
                    </button>
                    <button onClick={handleTv} className={`px-3.5 text-white rounded-full min-h-[28px] font-medium ${tv.length > 0 ? "bg-gray-500" : ""}`}>
                        Tv Shows
                    </button>
                </div>
            </div>

            <div className="w-11/12 mx-auto bg-mb-black overflow-auto container scrollbar md:h-80">
                <div className="grid grid-cols-20 gap-8 w-full mb-2">
                    {loading ? (
                        <Loading />
                    ) : (
                        movies.map((movie) => {
                            const { id, poster_path, vote_average } = movie;
                            const displayTitle = getDisplayTitle(movie);
                            const shortTitle = getShortTitle(movie);
                            const displayDate = getDisplayDate(movie);
                            return (
                                <div key={id} className='relative'>
                                    <div key={id} className='cursor-pointer grid row'>
                                        <Link href={`/movies/movie/${id}`} >
                                            <Image
                                                src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : unavailable}
                                                alt={displayTitle}
                                                title={displayTitle}
                                                loading='lazy'
                                                width={100}
                                                height={100}
                                                className='w-full h-full'
                                            />
                                        </Link>
                                        <Link href={`/movies/movie/${id}`} className="bg-mb-grey pl-4" >
                                            <h2
                                                className='uppercase mt-4 font-bold text-sm text-white' title={displayTitle}
                                            >
                                                {shortTitle}
                                            </h2>
                                            <h2 className='text-white text-sm'>
                                                {displayDate}
                                            </h2>
                                        </Link>
                                    </div>
                                    <div
                                        className={`absolute text-center w-12 p-2 rounded-lg top-3 left-2 ${vote_average <= 7 ? "bg-white text-black" : "bg-[#c2410c] text-white"}`}
                                    >
                                        <Link href={`/movies/movie/${id}`} >
                                            {vote_average.toFixed(1)}
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    )
                    }
                    {loading ? (
                        <Loading />
                    ) : (
                        tv.map((movie) => {
                            const { id, poster_path, vote_average } = movie;
                            const displayTitle = getDisplayTitle(movie);
                            const shortTitle = getShortTitle(movie);
                            const displayDate = getDisplayDate(movie);
                            return (
                                <div key={id} className='relative'>
                                    <div key={id} className='cursor-pointer grid row'>
                                        <Link href={`/tv/tv/${id}`} >
                                            <Image
                                                src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : unavailable}
                                                alt={displayTitle}
                                                title={displayTitle}
                                                loading='lazy'
                                                width={100}
                                                height={100}
                                                className='w-full h-full'
                                            />
                                        </Link>
                                        <Link href={`/tv/tv/${id}`} className="bg-mb-grey pl-4" >
                                            <h2
                                                className='uppercase mt-4 font-bold tex-sm text-white' title={displayTitle}
                                            >
                                                {shortTitle}
                                            </h2>
                                            <h2 className='text-sm text-white'>
                                                {displayDate}
                                            </h2>
                                        </Link>
                                    </div>
                                    <div
                                        className={`absolute text-center w-12 p-2 rounded-lg top-3 left-2 ${vote_average <= 7 ? "bg-white text-black" : "bg-[#c2410c] text-white"}`}
                                    >
                                        <Link href={`/tv/tv/${id}`} >
                                            {vote_average.toFixed(1)}
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    )
                    }
                </div>
            </div>
        </>
    )
}
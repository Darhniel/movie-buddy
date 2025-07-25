'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { unavailable } from '@/app/config/config';
import Image from 'next/image';
import { MOVIE, getDisplayDate, getDisplayTitle, getMediaHref, getShortTitle } from '@/types';
import { Loading } from '../Loading';

export default function TrendingMovies() {
    const [day, setDay] = useState<MOVIE[]>([]);
    const [loading, setLoading] = useState(true);
    const [week, setWeek] = useState<MOVIE[]>([]);
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    const trendingTab = [
        {
            name: "Today",
            api: `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=en-US&page=1`
        },
        {
            name: "This Week",
            api: `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US&page=1`
        }
    ]

    async function handleDay() {
        const { api } = trendingTab[0]

        try {
            const response = await fetch(api);
            const data = await response.json();
            setWeek([])
            setDay(data.results)
        } catch (error) {
            console.error(`Error fetching Today's Trending Movies and Tv Shows: `, error)
        }
    }

    async function handleWeek() {
        const { api } = trendingTab[1]

        try {
            const response = await fetch(api);
            const data = await response.json();
            setDay([])
            setWeek(data.results)
        } catch (error) {
            console.error(`Error fetching this week's Movies and TV Shows: `, error)
        }
    }

    useEffect(() => {
        const fetchMedia = async () => {
            setLoading(true)
            try {
                const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=en-US&page=1`);
                const data = await response.json();
                setDay(data.results);
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
                <h2 className="font-bold text-2xl py-4  text-white capitalize">trending</h2>
                <div className="flex border border-[grey] border-solid rounded-full">
                    <button onClick={handleDay} className={`px-3.5 text-white rounded-full min-h-[28px] font-medium ${day.length > 0 ? "bg-gray-500" : ""}`} >
                        Today
                    </button>
                    <button onClick={handleWeek} className={`px-3.5 text-white rounded-full min-h-[28px] font-medium ${week.length > 0 ? 'bg-gray-500' : ""}`}>
                        This Week
                    </button>
                </div>
            </div>

            <div className="w-11/12 mx-auto  bg-mb-black overflow-auto container scrollbar md:h-80">
                <div className="grid grid-cols-20 gap-8 w-full mb-2">
                    {loading ? (
                        <Loading />
                    ) : (
                        day.map((movie) => {
                            const { id, poster_path, vote_average } = movie;
                            const href = getMediaHref(movie);
                            const displayTitle = getDisplayTitle(movie);
                            const shortTitle = getShortTitle(movie);
                            const displayDate = getDisplayDate(movie);

                            return (
                                <div key={id} className='relative'>
                                    <div key={id} className='cursor-pointer grid row'>
                                        <Link href={href} >
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
                                        <Link href={href} className="bg-mb-grey pl-4" >
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
                                        <Link href={href} >
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
                        week.map((movie) => {
                            const { id, poster_path, vote_average } = movie;
                            const href = getMediaHref(movie);
                            const displayTitle = getDisplayTitle(movie);
                            const shortTitle = getShortTitle(movie);
                            const displayDate = getDisplayDate(movie);
                            return (
                                <div key={id} className='relative'>
                                    <div key={id} className='cursor-pointer grid row'>
                                        <Link href={href} >
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
                                        <Link href={href} className="bg-mb-grey px-4" >
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
                                        <Link href={href} >
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
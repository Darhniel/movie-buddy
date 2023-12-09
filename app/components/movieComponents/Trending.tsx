'use client'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import { unavailable } from '@/app/config/config';
import Image from 'next/image';

export default function TrendingMovies() {
    const [day, setDay] = useState([]);
    const [week, setWeek] = useState([]);

    const trendingTab = [
        {
          name: "Today",
          api: "https://api.themoviedb.org/3/trending/all/day?api_key=1f222b58196e6037966d3d9e8dd3521b&language=en-US&page=1"
        },
        {
          name: "This Week",
          api: "https://api.themoviedb.org/3/trending/all/week?api_key=1f222b58196e6037966d3d9e8dd3521b&language=en-US&page=1"
        }
    ]

    async function handleDay() {
        const {api} = trendingTab[0]
    
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
        const {api} = trendingTab[1]
    
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
          try {
            const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=1f222b58196e6037966d3d9e8dd3521b&language=en-US&page=1`);
            const data = await response.json();
            setDay(data.results);
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
                    <button onClick={handleDay} className="px-3.5 text-white rounded-full min-h-[28px] font-medium" style={{backgroundColor: `${day.length > 0 ? 'grey':""}`}}>
                        Today
                    </button>
                    <button onClick={handleWeek} className="px-3.5 text-white rounded-full min-h-[28px] font-medium" style={{backgroundColor: `${week.length > 0 ? 'grey':""}`}}>
                        This Week
                    </button>
                </div>
            </div>
            {/* {
                !day &&
                <div className='text-center flex items-center flex-col gap-4 my-2'>
                    <p className='text-red-600'>
                        Error getting Trending Movies.
                        <br />
                        Please check your internet connection and try again
                    </p>        
                </div>
            } */}
            <div className="w-11/12 mx-auto  bg-mb-black overflow-auto container scrollbar">                    
                <div className="grid grid-cols-20 gap-8 w-full mb-2">
                    {   day.length > 0 &&
                        day.map((movie: {id: number, media_type: string, title: string, name: string, poster_path: string, release_date: string, first_air_date: string, vote_average: number}) => {
                            const {id, media_type, title, name, poster_path, release_date, first_air_date, vote_average} = movie;
                            return (
                                <div key={id} className='relative'>                            
                                    <div key={id} className='cursor-pointer grid row'>
                                        <Link href={media_type === "movie" ? `/movies/${media_type}/${id}` : `/tv/${media_type}/${id}`} target='_blank'>
                                            <Image 
                                                src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : unavailable}
                                                alt={title || name}
                                                title={title || name}
                                                loading='lazy'
                                                width={100}
                                                height={100}
                                                className='w-full h-full'
                                            />
                                        </Link>
                                        <Link href={media_type === "movie" ? `/movies/${media_type}/${id}` : `/tv/${media_type}/${id}`} className="bg-mb-grey pl-4"  target='_blank'>
                                            <h2 
                                                className='uppercase mt-4 font-bold text-sm text-white'title={title || name}
                                            >{
                                                title ? title.length <= 16 ? title : `${title.slice(0, 12)}...` :
                                                name.length <= 16 ? name : `${name.slice(0, 12)}...`
                                                }
                                            </h2>
                                            <h2 className='text-white text-sm'>{release_date || first_air_date || 'Invalid Date'}</h2>
                                        </Link>
                                    </div>
                                    <div className='absolute text-center w-12 p-2 rounded-lg top-3 left-2' style={vote_average<=7 ? {backgroundColor: 'white', color: 'black'} : {backgroundColor: '#c2410c', color: 'white'}}>
                                        <Link href={media_type === "movie" ? `/movies/${media_type}/${id}` : `/tv/${media_type}/${id}`} target='_blank'>{vote_average.toFixed(1)}</Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {   week.length > 0 &&
                        week.map((movie: {id: number, title: string, name: string, media_type: string, poster_path: string, release_date: string, first_air_date: string, vote_average: number}) => {
                            const {id, title, name, media_type, poster_path, release_date, first_air_date, vote_average} = movie;
                            return (
                                <div key={id} className='relative'>                            
                                    <div key={id} className='cursor-pointer grid row'>
                                        <Link href={media_type === "movie" ? `/movies/${media_type}/${id}` : `/tv/${media_type}/${id}`} target='_blank'>
                                            <Image 
                                                src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : unavailable}
                                                alt={title || name}
                                                title={title || name}
                                                loading='lazy'
                                                width={100}
                                                height={100}
                                                className='w-full h-full'
                                            />
                                        </Link>
                                        <Link href={media_type === "movie" ? `/movies/${media_type}/${id}` : `/tv/${media_type}/${id}`} className="bg-mb-grey px-4"  target='_blank'>
                                            <h2 
                                                className='uppercase mt-4 font-bold text-sm text-white'title={title || name}
                                            >{
                                                title ? title.length <= 16 ? title : `${title.slice(0, 12)}...` :
                                                name.length <= 14 ? name : `${name.slice(0, 12)}...`
                                                }
                                            </h2>
                                            <h2 className='text-white text-sm'>{release_date || first_air_date}</h2>
                                        </Link>
                                    </div>
                                    <div className='absolute text-center w-12 p-2 rounded-lg top-3 left-2' style={vote_average<=7 ? {backgroundColor: 'white', color: 'black'} : {backgroundColor: '#c2410c', color: 'white'}}>
                                        <Link href={media_type === "movie" ? `/movies/${media_type}/${id}` : `/tv/${media_type}/${id}`} target='_blank'>{vote_average.toFixed(1)}</Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
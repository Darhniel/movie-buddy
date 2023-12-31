'use client'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import { unavailable } from '@/app/config/config';
import Image from 'next/image';

export default function Popular() {
    const [movies, setMovies] = useState([]);
    const [tv, setTv] = useState([]);

    const popularTab = [
        {
          name: "Movies",
          api: "https://api.themoviedb.org/3/movie/popular?api_key=1f222b58196e6037966d3d9e8dd3521b&language=en-US&page=1"
        },
        {
          name: "Tv Shows",
          api: "https://api.themoviedb.org/3/tv/popular?api_key=1f222b58196e6037966d3d9e8dd3521b&language=en-US&page=1"
        }
    ]

    async function handleMovies() {
        const {api} = popularTab[0]
    
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
        const {api} = popularTab[1];
        
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
          try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1f222b58196e6037966d3d9e8dd3521b&language=en-US&page=1`);
            const data = await response.json();

            setMovies(data.results);
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
                    <button onClick={handleMovies} className="px-3.5 text-white rounded-full min-h-[28px] font-medium" style={{backgroundColor: `${movies.length > 0 ? 'grey':""}`}}>
                        Movies
                    </button>
                    <button onClick={handleTv} className="px-3.5 text-white rounded-full min-h-[28px] font-medium" style={{backgroundColor: `${tv.length > 0 ? 'grey':""}`}}>
                        Tv Shows
                    </button>
                </div>
            </div>

            {/* {
                !movies &&
                <div className='text-center flex items-center flex-col gap-4 my-2'>
                    <p className='text-red-600'>
                        Error getting Popular Movies.
                        <br />
                        Please check your internet connection and try again
                    </p>        
                </div>
            } */}
            
            <div className="w-11/12 mx-auto bg-mb-black overflow-auto container scrollbar md:h-80">                
                <div className="grid grid-cols-20 gap-8 w-full mb-2">
                    { movies.length > 0 &&
                        movies.map((movie: {id: number, title: string, poster_path: string, release_date: string, vote_average: number}) => {
                            const {id, title, poster_path, release_date, vote_average} = movie;
                            return (
                                <div key={id} className='relative'>                            
                                    <div key={id} className='cursor-pointer grid row'>
                                        <Link href={`/movies/movie/${id}`} target='_blank'>
                                            <Image 
                                                src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : unavailable}
                                                alt={title}
                                                title={title}
                                                loading='lazy'
                                                width={100}
                                                height={100}
                                                className='w-full h-full'
                                            />
                                        </Link>
                                        <Link href={`/movies/movie/${id}`} className="bg-mb-grey pl-4" target='_blank'>
                                            <h2 
                                                className='uppercase mt-4 font-bold text-sm text-white'title={title}
                                            >{
                                                title.length <= 12 ? title : `${title.slice(0,12)}...`
                                             }
                                            </h2>
                                            <h2 className='text-white text-sm'>{release_date}</h2>
                                        </Link>
                                    </div>
                                    <div className='absolute text-center w-12 p-2 rounded-lg top-3 left-2' style={vote_average<=7 ? {backgroundColor: 'white', color: 'black'} : {backgroundColor:  '#c2410c', color: 'white'}}>
                                        <Link href={`/movies/${id}`} target='_blank'>{vote_average.toFixed(1)}</Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {   tv.length > 0 &&
                        tv.map((movie: {id: number, name: string, poster_path: string, first_air_date: string, vote_average: number}) => {
                            const {id, name, poster_path, first_air_date, vote_average} = movie;
                            return (
                                <div key={id} className='relative'>                            
                                    <div key={id} className='cursor-pointer grid row'>
                                        <Link href={`/tv/tv/${id}`} target='_blank'>
                                            <Image 
                                                src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : unavailable}
                                                alt={name}
                                                title={name}
                                                loading='lazy'
                                                width={100}
                                                height={100}
                                                className='w-full h-full'
                                            />
                                        </Link>
                                        <Link href={`/tv/tv/${id}`} className="bg-mb-grey pl-4" target='_blank'>
                                            <h2 
                                                className='uppercase mt-4 font-bold tex-sm text-white'title={name}
                                            >{
                                                name.length <= 12 ? name : `${name.slice(0,12)}...`
                                             }
                                            </h2>
                                            <h2 className='text-sm text-white'>{first_air_date}</h2>
                                        </Link>
                                    </div>
                                    <div className='absolute text-center w-12 p-2 rounded-lg top-3 left-2' style={vote_average<=7 ? {backgroundColor: 'white', color: 'black'} : {backgroundColor:  '#c2410c', color: 'white'}}>
                                        <Link href={`/tv/tv/${id}`} target='_blank'>{vote_average.toFixed(1)}</Link>
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
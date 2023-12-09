'use client'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import Header from '@/app/components/Header'
import { useRouter } from 'next/navigation'
import Genre from "../components/Genre";
import useGenre from "../components/useGenre";
import { unavailable } from '../config/config';
import Image from 'next/image';

export default function Tv() {
    const [tv, setTv] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [genre, setGenre] = useState([]); //used to store the origional genre values
    const [value, setValue] = useState([]); //used to store the selected genre values
    const genreURL = useGenre(value);
    const router = useRouter();

    useEffect(() => {
        const fetchMedia = async () => {
            try {
              const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=1f222b58196e6037966d3d9e8dd3521b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&with_genres=${genreURL}`);
              const data = await response.json();
              setTotalPages(data.total_pages)
              setTv(data.results);
              console.log(data.results)
            } catch (error) {
            //   console.error('Error fetching movies and TV shows:', error);
            }
          };
      
          fetchMedia();
    }, [currentPage, genreURL])

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    

    return (
        <>
            <Header />
            <Genre
                genre={genre}
                setGenre={setGenre}
                setPage={setCurrentPage}
                type="tv"
                value={value}
                setValue={setValue}
            />
            <div className="container">
                <h1 className="font-bold text-2xl py-4  text-white capitalize">tv shows</h1>
                {
                    tv.length <= 0 && 
                    <div className='text-center flex items-center flex-col gap-4 mt-8'>
                        <p className='text-red-600'>
                            Error getting Tv Shows.
                            <br />
                            Please check your internet connection and try again
                        </p>
                        <button onClick={() => router.refresh()} className='bg-red-600 p-2 text-white rounded'>Try Again</button>
                    </div>                                  
                }
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full">
                    {tv.length > 0 &&
                        tv.map((movie: {id: string, title: string, name: string, poster_path: string, release_date: string, first_air_date: string, vote_average: number}) => {
                            const {id, title, name, poster_path, release_date, first_air_date, vote_average} = movie;
                            return (
                                <div key={id} className='relative'>                            
                                    <div key={id} className='cursor-pointer grid row'>
                                        <Link href={`/tv/tv/${id}`} target='_blank'>
                                            <Image 
                                                src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : unavailable} 
                                                alt={title || name}
                                                loading='lazy'
                                                width={100}
                                                height={276}
                                                className='w-full h-[231px]'
                                            />
                                        </Link>
                                        <Link href={`/tv/tv/${id}`} target='_blank' className="bg-mb-grey pl-4 pb-4">
                                            <h2 
                                                className='uppercase mt-4 font-bold text-sm text-white'title={title || name}
                                            >{
                                                title ? title.length <= 16 ? title : `${title.slice(0, 12)}...` :
                                                name.length <= 12 ? name : `${name.slice(0, 12)}...`
                                                }
                                            </h2>
                                            <h2 className='text-white text-sm'>{release_date || first_air_date || 'Invalid Date'}</h2>
                                        </Link>
                                    </div>
                                    <div className='absolute text-center w-12 p-2 rounded-lg top-3 left-2' style={vote_average<=7 ? {backgroundColor: 'white', color: 'black'} : {backgroundColor: '#c2410c', color: 'white'}}>{vote_average.toFixed(1)}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {tv.length > 0 &&
                <div className="flex gap-4 justify-center my-4">
                    <button 
                        disabled={currentPage === 1} 
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="p-2 rounded-lg text-white bg-mb-grey"
                    >
                        Previous
                    </button>
                    <button 
                        disabled={currentPage === totalPages} 
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="bg-zinc-500 p-2 rounded-lg text-white w-20"
                    >
                        Next
                    </button>
                </div>
            }       
        </>
    )
}
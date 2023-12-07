'use client'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import Header from '@/app/components/Header'
import { useRouter } from 'next/navigation'
import Genre from "../components/Genre";
import useGenre from "../components/useGenre";
import { unavailable } from '../config/config'
import Image from 'next/image'

export default function Movies() {
    const [movies, setMovies] = useState();
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [genre, setGenre] = useState([]); //used to store the origional genre values
    const [value, setValue] = useState([]); //used to store the selected genre values
    const genreURL = useGenre(value);
    const router = useRouter();
    

    useEffect(() => {
        const fetchMedia = async () => {
            try {
              const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=3d820eab8fd533d2fd7e1514e86292ea&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&with_genres=${genreURL}`);
              const data = await response.json();
              setTotalPages(data.total_pages)
              setMovies(data.results);
            //   console.log(data.results)
            } catch (error) {
                console.error('Error fetching movies and TV shows:', error);
                
            }
          };
      
          fetchMedia();
    }, [currentPage, genreURL])

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    
    const text = setTimeout(() => {
        return (
            <div className='text-center flex items-center flex-col gap-4 mt-8'>
                <p className='text-red-600'>
                    Error getting Movies.
                    <br />
                    Please check your internet connection and try again
                </p>
                <button onClick={() => router.refresh()} className='bg-red-600 p-2 text-white rounded'>Try Again</button>
            </div>
        )
    }, 1000);

    return (
        <>
            <Header />
            <Genre
                genre={genre}
                setGenre={setGenre}
                setPage={setCurrentPage}
                type="movie"
                value={value}
                setValue={setValue}
            />
            <div className="container">
                <h1 className="font-bold text-2xl py-4  text-white capitalize">Movies</h1>
                {
                    !movies && 
                    <p>Loading.....</p>
                    // <div className='text-center flex items-center flex-col gap-4 mt-8'>
                    //     <p className='text-red-600'>
                    //         Error getting Movies.
                    //         <br />
                    //         Please check your internet connection and try again
                    //     </p>
                    //     <button onClick={() => router.refresh()} className='bg-red-600 p-2 text-white rounded'>Try Again</button>
                    // </div>                                  
                }
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full">
                    {   movies &&
                        movies.map((movie: any) => {
                            console.log(movie)
                            const {id, title, name, poster_path, release_date, first_air_date, vote_average} = movie;
                            return (
                                <div key={id} className='relative'>                            
                                    <div key={id} className='cursor-pointer grid row'>
                                        <Link href={`/movies/movie/${id}`} className="">
                                            {/* <img className='h-full w-full' loading='lazy' src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : unavailable} alt={title || name} title={title || name} /> */}
                                            <Image 
                                                src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : unavailable}
                                                alt={title || name}
                                                title={title || name}
                                                loading='lazy'
                                                height={100}
                                                width={100}
                                                className='h-full w-full'
                                            />
                                        </Link>
                                        <div className="bg-mb-grey pl-4 pb-4">
                                            <h2 
                                                className='uppercase mt-4 font-bold text-sm text-white'title={title || name}
                                            >{
                                                title ? title.length <= 16 ? title : `${title.slice(0, 12)}...` :
                                                name.length <= 16 ? name : `${name.slice(0, 12)}...`
                                                }
                                            </h2>
                                            <h2 className='text-white text-sm'>{release_date || first_air_date || 'Invalid Date'}</h2>
                                        </div>
                                    </div>
                                    <div className='absolute text-center w-12 p-2 rounded-lg top-3 left-2' style={vote_average<=7 ? {backgroundColor: 'white', color: 'black'} : {backgroundColor: '#c2410c', color: 'white'}}>{vote_average.toFixed(1)}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {movies &&
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
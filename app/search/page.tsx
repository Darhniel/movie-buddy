'use client'
import Header from "../components/Header";
import { HiOutlineSearch } from "react-icons/hi";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import { unavailable } from "../config/config";
import { useRouter } from "next/navigation";

export default function Page() {
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const fetchSearch = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=1f222b58196e6037966d3d9e8dd3521b&language=en-US&query=${searchText}&page=${currentPage}&include_adult=false`);
            const data = await response.json()
            // console.log(data)
            setContent(data.results);
            setTotalPages(data.total_pages);
            // setSearchText("")
        } catch (error) {

        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
    }, [type, currentPage])


    return (
        <>
            <Header />
            <h1 className="text-white container font-bold text-5xl mb-8">Search</h1>
            <div className="container flex gap-2">
                <input 
                    type="text" 
                    placeholder="Search for a movie or tv show" 
                    className="p-4 w-full rounded-md outline-none text-black"
                    onChange={(e) => {setSearchText(e.target.value)}}
                />
                <button type="button" className="text-white w-16 h-16 bg-mb-grey text-center flex items-center justify-center rounded-md hover:scale-110" onClick={fetchSearch}>
                    <HiOutlineSearch />
                </button>
            </div>
            <div className="md:mt-4">
                <div className="flex container">
                    <button className={`w-full p-4 ${type ? 'border-0' : 'text-mb-gray border-b-4'} transition-all duration-300 hover:scale-110`} onClick={() => setType(0)}>
                        Search Movies
                    </button>
                    <button className={`w-full p-4 ${type ? 'text-mb-gray border-b-4' : 'border-0'} transition-all duration-300 hover:scale-110`} onClick={() => setType(1)}>
                        Search Tv Shows
                    </button>
                </div>
            </div>
            {/* {
                content.length <= 0 && 
                <div className='text-center flex items-center flex-col gap-4 mt-8'>
                    <p className='text-red-600'>
                        Error getting Movies.
                        <br />
                        Please check your internet connection and try again
                    </p>
                    <button onClick={() => router.refresh()} className='bg-red-600 p-2 text-white rounded'>
                        Try Again
                    </button>
                </div>                                  
            } */}
            <div className="container mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full">
                {   content.length > 0 &&
                    content.map((movie: any) => {
                        // console.log(movie)
                        const {id, title, name, poster_path, release_date, first_air_date, vote_average} = movie;
                        return (
                            <div key={id} className='relative'>                            
                                <div key={id} className='cursor-pointer grid row'>
                                    <Link href={`/${type ? 'tv/tv' : 'movies/movie'}/${id}`} target="_blank">
                                        <Image 
                                            src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : unavailable}
                                            alt={title || name}
                                            title={title || name}
                                            loading='lazy'
                                            height={100}
                                            width={100}
                                            className='h-[231px] w-full'
                                        />
                                    </Link>
                                    <Link href={`/${type ? 'tv/tv' : 'movies/movie'}/${id}`} target="_blank" className="bg-mb-grey pl-4 pb-4">
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
                                    <Link href={`/${type ? 'tv/tv' : 'movies/movie'}/${id}`} target="_blank">
                                        {vote_average.toFixed(1)}
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {content.length > 0 &&
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
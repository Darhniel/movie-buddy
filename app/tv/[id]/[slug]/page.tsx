'use client'
// import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import {useState, useEffect} from 'react'
import Header from '@/app/components/Header';
import { unavailable, img_500, img_backdrop } from '@/app/config/config';
import { FaStar } from "react-icons/fa6";

export default function Page({params}) {
    const media_type = params.id;
    const id = params.slug;
    const [movie, setMovie] = useState<{original_name: string, budget: number, overview: string, poster_path: string, release_date: string, revenue: number, runtime: number, genres: {id: number, name: string}[], production_companies: {id: number, logo_path: string, name: string}[]}>({});

    useEffect(() => {
        const fetchMedia = async () => {

            try {
              const response = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=1f222b58196e6037966d3d9e8dd3521b&language=en-US`);
              const data = await response.json();
              console.log(data)
              setMovie(data)
            } catch (error) {
              console.error('Error fetching movies and TV shows:', error);
            }
          };
      
          fetchMedia();
    },[])

    const {original_name, budget, overview, poster_path, release_date, revenue, runtime, vote_average, genres, production_companies} = movie;
    const date = new Date(release_date);
    const year = date.getFullYear();
    const vote_count = Number(vote_average);
    let box_office = Number(revenue).toLocaleString('en-US')

    function toHoursAndMinutes(totalMinutes: number) {
      const minutes = totalMinutes % 60;
      const hours = Math.floor(totalMinutes / 60);
    
      return `${hours}h ${minutes}m`;
    }

    return (
      <>
        <Header />

        <h1 className='container text-3xl text-white mb-6 font-medium'>{original_name ? `${original_name}` : ""}</h1>
        <div className="container flex gap-4 h-3/5">
          <div className='w-1/2'>
            <img src="" alt="" className='hidden' />
            <img className='h-5/6' src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : unavailable} alt="" />
            <div>
              {media_type}
            </div>
          </div>
          <div>
            <h2 className='text-3xl text-white mb-4 font-medium'>
              {original_name}
              <span className='text-mb-gray'>{year ? ` (${year})` : ""}</span>
            </h2>
            <div className='mb-6 text-mb-gray flex gap-4'>
              <span className='border rounded px-2 capitalize'>{media_type}</span>
              <div className='flex gap-2'>
                {
                  genres &&
                  genres.map((genre) => {
                    return(
                      <span>{`${genre.name} `}</span>
                    )
                  })
                }
              </div>
              <span>{runtime ? toHoursAndMinutes(runtime) : ""}</span>
            </div>

            <div className='flex gap-2 items-center'>
              <span className='text-lg text-mb-yellow'>
                <FaStar />
              </span>
              
              <div className="">
                <span className='text-3xl text-mb-yellow font-medium'>{vote_average ? vote_count.toFixed(1) : ""}</span>
                <span className='text-lg font-medium text-mb-dark-yellow'>/10</span>
              </div>
              <span className='text-mb-gray'>(TMDb rating)</span>
            </div>
            <div className='my-8'>
              <h2 className='text-white text-lg font-medium mb-2'>{overview ? "Overview" : ""}</h2>
              <p className='text-mb-gray w-3/4 font-medium'>{overview}</p>
            </div>
            {/* <p className="text-white font-medium">
              Budget: 
              <span className="text-mb-gray font-medium">{budget ? ` ${budget.toLocaleString('en-US')}` : ""}</span>
            </p>
            <p className='text-white font-medium'>
              Revenue: 
              <span className='text-mb-gray font-medium'>{box_office ? ` ${box_office}` : ""}</span>
            </p> */}
            <h2 className='text-white text-lg mt-5'>Production Companies:</h2>
            <div className="flex gap-4 mt-4 items-center overflow-auto scrollbar">
              {
                production_companies &&
                production_companies.map((company) => {
                  const {id, logo_path, name} = company
                  return(
                    <div key={id} className='grid items-center justify-items-center rows '>
                      <img className=' h-full' src={logo_path ? `https://image.tmdb.org/t/p/w500${logo_path}` : unavailable} alt={name} />
                      <h4 className='text-mb-gray font-medium'>{name}</h4>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </>
    )
}
'use client'
import {useState, useEffect} from 'react'
import Header from '@/app/components/Header';
import { unavailable, img_500, img_backdrop } from '@/app/config/config';
import { FaStar } from "react-icons/fa6";
import Image from 'next/image';

export default function Page({params}: any) {
    const media_type = 'tv';
    const id = params.slug;
    const [movie, setMovie] = useState<{
      original_name: string, overview: string, poster_path: string, first_air_date: string, episode_run_time: number[], genres: {id: number, name: string}[], networks: {id: number, logo_path: string, name: string}[], vote_average: number
    }>({
      original_name: "", overview: "", poster_path: "", first_air_date: "", episode_run_time: [], genres: [{id: 0, name: ""}], networks: [{id: 0, logo_path: "", name: ""}], vote_average: 0
    });

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
    },
    // eslint-disable-next-line
    [])

    const {original_name, overview, poster_path, first_air_date, episode_run_time, vote_average, genres, networks} = movie;
    const date = new Date(first_air_date);
    const year = date.getFullYear();

    function toHoursAndMinutes(totalMinutes: number) {
      const minutes = totalMinutes % 60;
      const hours = Math.floor(totalMinutes / 60);
    
      return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
    }

    return (
      <>
        <Header />

        <h1 className='container text-3xl text-white mb-6 font-medium text-center md:text-start'>{original_name ? `${original_name}` : ""}</h1>
        <div className="container flex flex-col items-center gap-8 text-center md:flex md:flex-row md:text-start md:gap-16">
          <div className='w-11/12'>
            <Image 
              src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : unavailable}
              alt={original_name}
              width={100}
              height={100}
              loading='lazy'
              className='h-full w-full'
            />
            {/* <div>
              {media_type}
            </div> */}
          </div>
          <div>
            <h2 className='text-3xl text-white mb-4 font-medium'>
              {original_name}
              <span className='text-mb-gray'>{year ? ` (${year})` : ""}</span>
            </h2>
            <div className='mb-6 text-mb-gray flex gap-4 items-center justify-center md:justify-start'>
              <span className='border rounded px-2 capitalize'>{media_type}</span>
              <div className='flex gap-1 w-48 flex-wrap items-center text-xs md:text-base md:gap-2 md:w-auto md:flex-nowrap'>
                {
                  genres &&
                  genres.map((genre) => {
                    return(
                      <span key={genre.id}>{`${genre.name} `}</span>
                    )
                  })
                }
              </div>
              <span>{episode_run_time.length > 0 ? toHoursAndMinutes(episode_run_time[0]) : ""}</span>
            </div>

            <div className='flex gap-2 items-center justify-center md:justify-start'>
              <span className='text-lg text-mb-yellow'>
                <FaStar />
              </span>
              
              <div className="">
                <span className='text-3xl text-mb-yellow font-medium'>{vote_average > 0 ? vote_average.toFixed(1) : ""}</span>
                <span className='text-lg font-medium text-mb-dark-yellow'>/10</span>
              </div>
              <span className='text-mb-gray'>(TMDb rating)</span>
            </div>
            <div className='my-8'>
              <h2 className='text-white text-lg font-medium mb-2'>{overview ? "Overview" : ""}</h2>
              <p className='text-mb-gray w-4/5 mx-auto font-medium text-center md:w-3/4 md:mx-0 md:text-left'>{overview}</p>
            </div>
            {/* <p className="text-white font-medium">
              Budget: 
              <span className="text-mb-gray font-medium">{budget ? ` ${budget.toLocaleString('en-US')}` : ""}</span>
            </p>
            <p className='text-white font-medium'>
              Revenue: 
              <span className='text-mb-gray font-medium'>{box_office ? ` ${box_office}` : ""}</span>
            </p> */}
            <h2 className='text-white text-lg mt-5 font-medium'>Streaming Networks:</h2>
            <div className="flex gap-4 mt-4 items-center overflow-auto scrollbar flex-wrap justify-center md:flex-nowrap md:justify-normal">
              {
                networks &&
                networks.map((company) => {
                  const {id, logo_path, name} = company
                  return(
                    <div key={id} className='grid items-center justify-items-center rows '>
                      {/* <img className=' h-full' src={logo_path ? `https://image.tmdb.org/t/p/w500${logo_path}` : unavailable} alt={name} /> */}
                      <Image 
                        src={logo_path ? `https://image.tmdb.org/t/p/w500${logo_path}` : unavailable}
                        alt={name}
                        width={100}
                        height={100}
                        className='h-full w-auto'
                      />
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
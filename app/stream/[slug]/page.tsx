"use client"
import React, { useEffect, useState } from 'react'
import Header from '@/app/components/Header';
import { useTv } from '@/context/TvContext';



export default function Page({ params }: { params: { slug: string } }) {
  const { tvShow, setTvShow } = useTv();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const storageKey = `tv-${params.slug}`;

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${params.slug}?api_key=${apiKey}&language=en-US`);
        if (!response.ok) throw new Error("Failed to fetch movie");
        const data = await response.json();
        console.log("Tv Show Data: ", data)
        setTvShow(data);
        localStorage.setItem(storageKey, JSON.stringify(data));
      } catch (err) {
        console.error('Error fetching tv show:', err);
        setError('Could not load tv show data.');
      } finally {
        setLoading(false);
      }
    };

    const loadFromStorageOrFetch = () => {
      if (!tvShow) {
        setLoading(true);
        const storedMovie = localStorage.getItem(storageKey);
        if (storedMovie) {
          try {
            const parsedMovie = JSON.parse(storedMovie);
            setTvShow(parsedMovie);
            setLoading(false);
          } catch (e) {
            console.warn("Invalid tv show data in localStorage, fetching from API");
            fetchMedia();
          }
        } else {
          fetchMedia();
        }
      }
    };

    loadFromStorageOrFetch();
  }, [tvShow, params.slug, setTvShow, apiKey, storageKey])


  return (
    <>
      <Header />
      {(loading || !tvShow) ? (
        <div className='text-white text-center'>Loading movie...</div>
      ) : (
        error ? (
          <div className='text-white text-center'>
            {error || 'No tv show data found'}
          </div>
        ) : (
          <>
            <h1 className='container text-3xl text-white mb-6 font-medium text-center md:text-start'>
              {tvShow.original_name}
            </h1>
            <iframe
              src={`https://vidsrc.cc/v2/embed/tv/${params.slug}/1`}
              width={400}
              height={200}
              className='border-white border container w-[400px] md:w-full md:h-[500px] px-0'
              allowFullScreen
            ></iframe>

            <div className='my-8'>
              <h2 className='text-white text-lg font-medium mb-2 text-center'>{"Overview"}</h2>
              <p className='text-mb-gray w-4/5 mx-auto font-medium text-center md:w-3/4'>{tvShow.overview}</p>
            </div>
          </>
        )
      )
      }
    </>
  )
}

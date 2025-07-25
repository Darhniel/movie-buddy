"use client"
import React, { useEffect, useState } from 'react'
import Header from '@/app/components/Header';
import { useMovie } from '@/context/MovieContext';



export default function Page({ params }: { params: { slug: string } }) {
  const { movie, setMovie } = useMovie();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const storageKey = `movie-${params.slug}`;

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${params.slug}?api_key=${apiKey}&language=en-US`);
        if (!response.ok) throw new Error("Failed to fetch movie");
        const data = await response.json();

        setMovie(data);
        localStorage.setItem(storageKey, JSON.stringify(data)); // Save to localStorage
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError('Could not load movie data.');
      } finally {
        setLoading(false);
      }
    };

    const loadFromStorageOrFetch = () => {
      if (!movie) {
        setLoading(true);
        const storedMovie = localStorage.getItem(storageKey);
        if (storedMovie) {
          try {
            const parsedMovie = JSON.parse(storedMovie);
            setMovie(parsedMovie);
            setLoading(false);
          } catch (e) {
            console.warn("Invalid movie data in localStorage, fetching from API");
            fetchMedia();
          }
        } else {
          fetchMedia();
        }
      }
    };

    loadFromStorageOrFetch();
  }, [movie, params.slug, setMovie, apiKey, storageKey])


  return (
    <>
      <Header />
      {(loading || !movie) ? (
        <div className='text-white text-center'>Loading movie...</div>
      ) : (
        error ? (
          <div className='text-white text-center'>
            {error || 'No movie data found'}
          </div>
        ) : (
          <>
            <h1 className='container text-3xl text-white mb-6 font-medium text-center md:text-start'>
              {movie.original_title}
            </h1>
            <iframe
              src={`https://vidsrc.cc/v2/embed/movie/${params.slug}?autoPlay=false`}
              width={400}
              height={200}
              className='border-white border container w-[400px] md:w-full md:h-[500px] px-0'
              allowFullScreen
            ></iframe>

            <div className='my-8'>
              <h2 className='text-white text-lg font-medium mb-2 text-center'>{"Overview"}</h2>
              <p className='text-mb-gray w-4/5 mx-auto font-medium text-center md:w-3/4'>{movie.overview}</p>
            </div>
          </>
        )
      )
      }
    </>
  )
}

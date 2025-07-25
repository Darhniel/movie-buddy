'use client'
import { createContext, useState, useContext, ReactNode } from 'react'

export type MovieType = {
  original_title: string;
  budget: number;
  overview: string;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  genres: { id: number; name: string }[];
  production_companies: { id: number; logo_path: string; name: string }[];
  vote_average: number;
}

type MovieContextType = {
  movie: MovieType | null;
  setMovie: (movie: MovieType) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined)

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movie, setMovie] = useState<MovieType | null>(null)

  return (
    <MovieContext.Provider value={{ movie, setMovie }}>
      {children}
    </MovieContext.Provider>
  )
}

export const useMovie = (): MovieContextType => {
  const context = useContext(MovieContext)
  if (!context) throw new Error('useMovie must be used within a MovieProvider')
  return context
}

'use client'
import { createContext, useState, useContext, ReactNode } from 'react'

export type TvType = {
    original_name: string;
    overview: string;
    poster_path: string;
    first_air_date: string;
    episode_run_time: number[];
    genres: { id: number, name: string }[];
    networks: { id: number, logo_path: string, name: string }[];
    vote_average: number
}

type TvContextType = {
    tvShow: TvType | null;
    setTvShow: (tvShow: TvType) => void;
}

const TvContext = createContext<TvContextType | undefined>(undefined)

export const TvProvider = ({ children }: { children: ReactNode }) => {
    const [tvShow, setTvShow] = useState<TvType | null>(null)

    return (
        <TvContext.Provider value={{ tvShow, setTvShow }}>
            {children}
        </TvContext.Provider>
    )
}

export const useTv = (): TvContextType => {
    const context = useContext(TvContext)
    if (!context) throw new Error('useTv must be used within a MovieProvider')
    return context
}
// import { getTrendingMovies } from '@/app/api/api-util'
import TrendingMovies from './movieComponents/Trending';
import UpcomingMovies from './movieComponents/TopRated';
import LatestMovies from './movieComponents/Popular';
import Loading from '../Loading';
import { Suspense } from 'react';

export default async function Main() {
    
    return (
        <section className="bg-mb-grey py-20">
            {/*Trending Movies*/}
            <Suspense fallback={<Loading />}>
                <TrendingMovies />
            </Suspense>
            

            {/*Latest Movies*/}
            <LatestMovies />

            {/*Upcoming Movies*/}
            <UpcomingMovies />
        </section>
    )
}
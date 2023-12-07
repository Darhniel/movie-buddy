import Header from './components/Header';
import Trending from './components/movieComponents/Trending';
import Popular from './components/movieComponents/Popular';
import TopRated from './components/movieComponents/TopRated';

export default async function Home() {

  return (
    <>
      <Header />
      
      <Trending />

      <Popular />

      <TopRated />

    </>
  )
}

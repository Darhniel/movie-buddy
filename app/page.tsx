// import Carousel from '@/app/components/Carousel'
import Header from './components/Header'
import Trending from './components/movieComponents/Trending'
import Popular from './components/movieComponents/Popular'
import TopRated from './components/movieComponents/TopRated'
// import SLider from './components/Slider'

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

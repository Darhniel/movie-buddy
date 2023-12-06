
// export default function Search() {
//   return (
//     <div className="relative overflow-hidden">
//         <div className="relative w-full h-96 ">

//         </div>
//         <div></div>
//         <div></div>
//     </div>
//   )
// }
'use client'
import {useState, useEffect} from 'react';
import { img_300, avatar } from '../config/config';

const Carousel = ({media_type, id}) => {
  const [credits, setCredits] = useState();
  const fetchCredits = async () => {
    // const response = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`);
    const response = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=1f222b58196e6037966d3d9e8dd3521b&language=en-US`) 
    const data =  await response.json();
    console.log(media_type, id)
    setCredits(data.cast);
  }
  useEffect(()=>{
    fetchCredits();
    // eslint-disable-next-line
  }, [])

  const items = credits?.map((c)=> (
      <div key={c.cast_id} className='carousel-item' title={c?.name} style={{backgroundImage:`url(${c.profile_path ? `${img_300}/${c.profile_path}` : avatar})`}}>
      <div className="carousel-item__cover">
        <p className="carousel-item__name" >
        {c?.name}
        </p>
        <p className="carousel-item__char">
        {c?.character}
        </p>
      </div>
    </div>
    ));
  return (
    <div className='flex container flex-wrap'>
      {items}
    </div>
  );
}
export default Carousel;

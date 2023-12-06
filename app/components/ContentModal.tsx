import {useState, forwardRef, useEffect} from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
// import Slide from '@mui/material/Slide';
// import axios from 'axios';
// import GoogleIcon from '@mui/icons-material/Google';
// import StarIcon from '@mui/icons-material/Star';
import { img_500, unavailable, unavailableLandscape } from '../config/config';
// import VideoModal from './VideoModal';
import Carousel from './Carousel';
import Link from 'next/link';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    const data = await response.json();
    setContent(data);
  }
  const fetchVideo = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    const data = await response.json();
    const officialTrailers = data.results.filter(video => video.official===true && video.type==='Trailer');
    setVideo(officialTrailers[officialTrailers.length - 1]?.key);
  }
  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);
  let title, year, genres, runtime, seasons, vote;
  if (content) {
    title = content.title || content.name;
    year = (
      content.first_air_date ||
      content.release_date ||
      "----"
    ).substring(0, 4);
    runtime = content.episode_run_time || content.runtime;
    let minutes = runtime % 60;
    let hours = (runtime - minutes) / 60;
    runtime = hours && minutes ? hours + 'h ' + minutes + 'm' : hours ? hours + 'h' : minutes ? minutes + 'm' : "";
    vote = (content.vote_average).toFixed(1) > 0 ? (content.vote_average).toFixed(1) : 'NR';
    genres = content.genres.length > 0 && content.genres.map(g => g.name).reduce((acc, curr) => acc + ', ' + curr);
    seasons = content.number_of_seasons && content.number_of_seasons + ' season' + (content.number_of_seasons > 1 ? 's' : '') + (runtime ? (' (' + runtime + '/ep)') : '')

  }
  return (
    <div className='parent-modal'>
      <div onClick={handleClickOpen}>
        {children}
      </div>
      <button
        onClick={handleClose}
      >
        <div className='relative'>
            <h6 className='flex-1 ml-2'>
              {content && (content.title || content.name)}
            </h6>
            {/* <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar> */}
        </div>

        {content &&
          <div className='modal'>
            <div className='modal-left'>
              <img src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} alt={content.name || content.title} className='modal-portret-img' />
              <img src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape} alt={content.name || content.title} className='modal-landscape-img' />
            </div>

            <div className='modal-right'>
              <div className='media-type-box-mobile'>
                {media_type === 'tv' ? 'TV Show' : 'Movie '}
              </div>

              <div className='title'>
                <h4>
                  <span>{title}</span>
                  <span className='op8'>&nbsp;({year})</span>
                </h4>
              </div>

              <div className='subtitle'>
                <div className='media-type-box'>
                  {media_type === 'tv' ? 'TV Show' : 'Movie '}
                </div>
                <span className="leading-loose">
                  <span style={{ display: "inline-block" }}>{genres}</span>
                  &nbsp;&bull;&nbsp;
                  <span style={{ display: "inline-block" }}>{media_type === 'tv' ? seasons : runtime}</span>
                </span>
              </div>
              <div className='rating-video'>
                <div className='rating'>
                  <h4 style={{ color: '#faaf00' }}>
                    {/* <StarIcon />&nbsp;{vote} */}
                    {vote !== 'NR' && <span className="op8" style={{ fontSize: '18px' }}>/10</span>}
                  </h4>
                  <span className='op8 ml-4' >
                    ({vote === 'NR' ? 'Not Rated' : <span title='www.themoviedb.org'>TMDb rating</span>})
                  </span>
                </div>
                {/* <VideoModal title={title} path={video} /> */}
              </div>

              <div className='overview'>
                <h6 className='mt-4'>
                  Overview
                </h6>
                <div style={{ maxWidth: '66ch' }} className='op8'>
                  {content.overview ? content.overview :
                    <div>
                      Sorry! We don't have an overview translated in English.<br></br>
                      <Link target="_blank" href={`https://www.google.com/search?q=${title} ${year}`} className='mt-8'>search on google</Link>
                    </div>
                  }
                </div>
              </div>

              <div className='cast'>
                <h6 className='mb-8'>
                  Cast
                </h6>
                <Carousel media_type={media_type} id={id} />
              </div>

            </div>

          </div>
        }
      </button>
    </div>
  );
}
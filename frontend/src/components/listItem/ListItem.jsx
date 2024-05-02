import React, { useEffect, useState } from 'react';
import "./listItem.scss";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { Link, Router } from 'react-router-dom';
import { useSelector } from 'react-redux';


// Object.entries(localStorage).forEach(([key, value]) => console.log(`${key}: ${value}`));



const ListItem = ({index, item}) => {
  const [isHovered, setisHovered] = useState(false);
  const [movie, setMovie] = useState({})
  const token = useSelector(state => state.user.currentUser?.accessToken);
  useEffect(()=>{
    const getMovie = async ()=>{
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:"Bearer "+ token,
          },
        });
        setMovie(res.data)
      } catch (err) {
      }
    }; 
    getMovie()
  }, [item]); 
  return (
    <Link to={{pathname:`/watch/${movie._id}`}}>
      <div className='listItem' 
            onMouseEnter={()=>setisHovered(true)} 
            onMouseLeave={()=>setisHovered(false)}
            style ={{left:isHovered && index*225 -50 + index*2.5}} 
        >
          <img src={movie.img} />
          {isHovered && (
          <>
              <video src={movie.trailer} autoPlay={true} loop ></video>
              <div className='itemInfo'>
                  <div className='icons'>
                    <PlayArrowIcon className='icon'/>
                    <AddIcon className='icon'/>
                    <ThumbUpIcon className='icon'/>
                    <ThumbDownIcon className='icon'/>
                  </div>
                  <div className='itemInfoTop'>
                      <span>{movie.duration}</span>
                      <span></span>
                      <span>{movie.year}</span>
                  </div>
                  <div className='desc'>
                      <span>{movie.desc}</span>
                  </div>
              </div>
              
            </>
          )}
      </div>
    </Link>
  )
}

export default ListItem
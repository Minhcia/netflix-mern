import React, { useEffect, useState } from 'react';
import "./featured.scss";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Featured = ({type}) => {
  const [content, setContent] = useState({});
  const token = useSelector(state => state.user.currentUser?.accessToken);
  useEffect(()=>{
    const getRandomContent = async ()=>{
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:"Bearer "+ token,
          },
        });
        setContent(res.data[0])
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
    getRandomContent();
  },[type]);
  return (
    <div className='featured'>
       <img
        src={content.img}
        alt=""
      />
      <div className="info">
        {/* <img
          src={content.imgTitle}
          alt=""
        /> */}
        <span className="desc">
          {content.desc}
        </span>
        <div className="buttons">
          <Link to={{pathname:`/watch/${content._id}`}} style={{ textDecoration: 'none' }}> <button className="play" >
            <PlayArrowIcon />
            <span >Play</span>
          </button> </Link>
          <button className="more">
            <InfoIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Featured
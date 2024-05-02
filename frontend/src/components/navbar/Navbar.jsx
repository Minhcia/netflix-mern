import React, { useEffect, useState } from 'react';
import "./navbar.scss";
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link} from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/userRedux';




const Navbar = () => {
  const [getPic, setgetPic] = useState({});
  const token = useSelector(state => state.user.currentUser?.accessToken);
  const id = useSelector(state => state.user.currentUser?._id);
  const dispatch = useDispatch();



  useEffect(()=>{
    const userPic = async ()=>{
      try {
        const res = await axios.get("http://localhost:5000/api/users/find/" + id, {
          headers: {
            token:"Bearer "+token   
          },
        });
        setgetPic(res.data)
        // console.log(res)
      } catch (err) {
        console.error(err);
      }
    }; 
    userPic()
  },[]); 
  console.log(getPic)
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div className='navbar'>
      <div className='container'>
          <div className="left">
            <Link to={'/'} className="link"><img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            /></Link>
            
            <Link to={'/'} className="link"><span className='navbarmainLinks'>Homepage</span></Link>
            <Link to={'/series'} className="link"><span className='navbarmainLinks'>Series</span></Link>
            <Link to={'/movies'} className="link"><span className='navbarmainLinks'>Movies</span></Link>
            <span>New and Popular</span>
            <span>My List</span>
          </div>
          <div className="right">
            <SearchIcon className="icon" />
            <span>{getPic.username}</span>
            <NotificationsIcon className="icon" />
            <Link to={`/${getPic._id}` } className="link">
              <img
                src= {getPic.profilepic}
                alt=""
              />
            </Link>
            <div className="profile">
              <ArrowDropDownIcon className="icon" />
              <div className="options">
                <span>Settings</span>
                <span onClick={handleLogout}>Logout</span>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Navbar
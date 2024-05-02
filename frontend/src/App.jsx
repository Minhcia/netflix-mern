import React from 'react';
import "./app.scss"
import Home from './page/home/Home'
import Login from './page/login/Login';
import Register from './page/register/Register';
import Watch from './page/watch/Watch';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { loginSucess, logOut } from './redux/userRedux';
import Profile from './page/profile/Profile';





const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user.currentUser);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(loginSucess(JSON.parse(storedUser)));
    } else {
      dispatch(logOut());
    }
  }, [dispatch]);
  


  // const user = true;
  return (
    <Router>
       <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to="/register" />} />
        <Route path='/' element={<Home/>}/>
          <Route path="/login" element={!user ?<Login/> : <Navigate to={'/'}/>}/>
          <Route path='/register' element={!user ? <Register/> : <Navigate to={'/'}/>} />
          {user &&(<>
          <Route path='/series'element={<Home type ='serie'/>} />
          <Route path='/movies' element={<Home type ='movie'/>} />
          <Route path='/watch' element={<Watch/>} />
          <Route path='/:id' element={<Profile/>} />       
          </>
          )}
      </Routes>
    </Router>
  )
}

export default App
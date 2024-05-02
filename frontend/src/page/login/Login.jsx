import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./login.scss";
import { login } from '../../redux/apiCall';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isFetching, error} = useSelector((state)=> state.user)
  const handleLogin = (e)=>{
      e.preventDefault();
      login(dispatch, {email, password});
    }
 


  return (
    <div className='login'>
          <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input type="text" placeholder="Email or phone number" onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />


          <button className="loginButton" onClick={handleLogin} disabled={isFetching}>Sign In</button>
          <span>
            New to Netflix? <b style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>Sign up now.</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  )
}

export default Login
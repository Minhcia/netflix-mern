import {React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./profile.scss";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/userRedux';

const Profile = () => {
  const [getProfile, setgetProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('******');
  const [username, setUsername] = useState('');
  const [telephone, setTelephone] = useState('+123456789');
  const [subscriptionPlan, setSubscriptionPlan] = useState('Premium');
  const id = useSelector(state => state.user.currentUser?._id);
  const token = useSelector(state => state.user.currentUser?.accessToken);
  const dispatch = useDispatch();

  useEffect(()=>{
    const userPic = async ()=>{
      try {
        const res = await axios.get("http://localhost:5000/api/users/find/" + id, {
          headers: {
            token:"Bearer "+token           
          },
        });
        setgetProfile(res.data);
        console.log(res)
      } catch (err) {
      }
    }; 
    userPic()
  },[]);


  // EVENT
  const [originalProfile, setOriginalProfile] = useState({});

  useEffect(() => {
    setOriginalProfile(getProfile);
  }, [getProfile]);

  const handleEditProfile = async () => {
    if (!isEditing) {
      setIsEditing(true);
      setEmail(originalProfile.email ); 
      setPassword(originalProfile.password );
      setUsername(originalProfile.username);
      setTelephone(originalProfile.telephone );
      setSubscriptionPlan(originalProfile.subscriptionPlan || 'Premium');
    } else {
          try {
            const updatedProfile = {
              email: email,
              password: password,
              username: username,
              telephone: telephone,
              subscriptionPlan: subscriptionPlan
            };
        
            const response = await axios.put(`http://localhost:5000/api/users/${id}`, updatedProfile, {
              headers: {
                token:"Bearer "+token           
              },
            });
        
            console.log('Profile updated:', response.data);
        
            setIsEditing(!isEditing);
          } catch (error) {
            console.error('Error updating profile:', error);
          }
        };
  }

  const handleLogout = () => {
    dispatch(logOut());
  };


  return (
    <div className="profile-page">
      <header>
      <Link to={'/'} className="link"><img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            /></Link>
      </header>
      <main>
        <section className="profile-info">
          <div className="profile-details">
            <div className="avatar">
              <img src= {getProfile.profilepic} alt="Profile Picture" />
            </div>
            <div className="user-details">
            <h3>{username}</h3>
            <p>Email: {isEditing ? <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /> : (getProfile.email)}</p>
            <p>Password: {isEditing ? <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> : (getProfile.password || password)}</p>
            <p>Username: {isEditing ? <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /> : (getProfile.username)}</p>
            <p>Telephone: {isEditing ? <input type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} /> : (getProfile.telephone || telephone)}</p>
            <p>Subscription Plan: {isEditing ? <input type="text" value={subscriptionPlan} onChange={(e) => setSubscriptionPlan(e.target.value)} /> : (getProfile.subscriptionPlan || subscriptionPlan)}</p>
            </div>
          </div>
          <button onClick={handleEditProfile}>{isEditing ? 'Save' : 'Edit Profile'}</button>
        </section>
        <section className="profile-settings">
          <div className="settings-list">
            <ul>
              <li><a href="#">Account Settings</a></li>
              <li><a href="#"onClick={handleLogout}>Sign Out</a></li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile